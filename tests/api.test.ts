import test from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { POST } from '../src/app/api/route/route';

const endpoint = 'https://example.test/api/route';
function request(data: unknown, origin: string | null = 'https://example.test') {
  return new NextRequest(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(origin ? { origin } : {}) },
    body: JSON.stringify(data),
  });
}

test('route API rejects missing setup, foreign origin, absent consent and excessive input', async () => {
  const key = process.env.GOOGLE_ROUTES_API_KEY;
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  delete process.env.GOOGLE_ROUTES_API_KEY;
  process.env.NEXT_PUBLIC_SITE_URL = 'https://example.test';
  try {
    assert.equal((await POST(request({}))).status, 503);
    process.env.GOOGLE_ROUTES_API_KEY = 'synthetic-test-key';
    assert.equal((await POST(request({}, 'https://foreign.test'))).status, 403);
    assert.equal((await POST(request({}, null))).status, 403);
    assert.equal(
      (await POST(request({ pickup: 'Ratzeburg', destination: 'Mölln', consent: false }))).status,
      400,
    );
    assert.equal((await POST(request({ pickup: 'x'.repeat(5000) }))).status, 413);
  } finally {
    if (key === undefined) delete process.env.GOOGLE_ROUTES_API_KEY;
    else process.env.GOOGLE_ROUTES_API_KEY = key;
    if (origin === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = origin;
  }
});

test('route proxy sends only addresses, returns limited data and handles upstream failures', async () => {
  const key = process.env.GOOGLE_ROUTES_API_KEY;
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  const originalFetch = globalThis.fetch;
  process.env.GOOGLE_ROUTES_API_KEY = 'synthetic-test-key';
  process.env.NEXT_PUBLIC_SITE_URL = 'https://example.test';
  let forwarded: Record<string, unknown> = {};
  const data = {
    pickup: 'Ratzeburg Bahnhof',
    destination: 'Mölln Bahnhof',
    consent: true,
    name: 'Must not forward',
    wishes: 'Must not forward',
  };
  try {
    globalThis.fetch = async (_url, options) => {
      forwarded = JSON.parse(String(options?.body));
      return Response.json({ routes: [{ distanceMeters: 12500, duration: '930s' }] });
    };
    const result = await POST(request(data));
    assert.equal(result.status, 200);
    assert.equal(result.headers.get('Cache-Control'), 'no-store');
    assert.deepEqual(await result.json(), { distanceKm: 12.5, durationMinutes: 16 });
    assert.deepEqual(forwarded.origin, { address: data.pickup });
    assert.deepEqual(forwarded.destination, { address: data.destination });
    assert.ok(!JSON.stringify(forwarded).includes('Must not forward'));
    globalThis.fetch = async () => Response.json({ error: 'provider detail' }, { status: 403 });
    assert.equal((await POST(request(data))).status, 502);
    globalThis.fetch = async () => Response.json({ routes: [] });
    assert.equal((await POST(request(data))).status, 422);
    globalThis.fetch = async () => {
      throw new Error('Synthetic timeout');
    };
    assert.equal((await POST(request(data))).status, 502);
  } finally {
    globalThis.fetch = originalFetch;
    if (key === undefined) delete process.env.GOOGLE_ROUTES_API_KEY;
    else process.env.GOOGLE_ROUTES_API_KEY = key;
    if (origin === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = origin;
  }
});
