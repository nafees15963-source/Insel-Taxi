import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'nodejs';
const budget = { start: 0, count: 0 };
function response(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
}
export async function POST(req: NextRequest) {
  const key = process.env.GOOGLE_ROUTES_API_KEY;
  if (!key)
    return response(
      {
        error:
          'Die automatische Routenberechnung ist derzeit nicht eingerichtet. Bitte fragen Sie die Fahrt direkt an.',
      },
      503,
    );
  const origin = req.headers.get('origin');
  const expected = new URL(process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin).origin;
  if (origin !== expected) return response({ error: 'Anfrage nicht zulässig.' }, 403);
  if (!req.headers.get('content-type')?.startsWith('application/json'))
    return response({ error: 'Ungültiges Datenformat.' }, 415);
  const now = Date.now();
  if (now - budget.start > 60000) {
    budget.start = now;
    budget.count = 0;
  }
  if (++budget.count > 30)
    return response(
      { error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut oder rufen Sie uns an.' },
      429,
    );
  try {
    const reader = req.body?.getReader();
    if (!reader) return response({ error: 'Angaben fehlen.' }, 400);
    let size = 0,
      raw = '';
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 4096) {
        await reader.cancel();
        return response({ error: 'Anfrage zu groß.' }, 413);
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    const body = JSON.parse(raw);
    const { pickup, destination, consent } = body;
    if (
      consent !== true ||
      typeof pickup !== 'string' ||
      typeof destination !== 'string' ||
      pickup.trim().length < 3 ||
      destination.trim().length < 3 ||
      pickup.length > 240 ||
      destination.length > 240
    )
      return response(
        { error: 'Bitte geben Sie Start und Ziel ein und erlauben Sie Google-Dienste.' },
        400,
      );
    const upstream = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method: 'POST',
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration',
      },
      body: JSON.stringify({
        origin: { address: pickup.trim() },
        destination: { address: destination.trim() },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_UNAWARE',
        computeAlternativeRoutes: false,
        languageCode: 'de-DE',
        units: 'METRIC',
      }),
    });
    if (!upstream.ok)
      return response(
        {
          error:
            'Google konnte die Route nicht berechnen. Prüfen Sie die Adressen oder fragen Sie direkt bei uns an.',
        },
        502,
      );
    const data = await upstream.json();
    const route = data.routes?.[0];
    const meters = route?.distanceMeters;
    const seconds = Number.parseFloat(route?.duration || '');
    if (!Number.isFinite(meters) || meters <= 0 || !Number.isFinite(seconds) || seconds <= 0)
      return response({ error: 'Für diese Adressen wurde keine Route gefunden.' }, 422);
    return response({
      distanceKm: Math.round(meters / 100) / 10,
      durationMinutes: Math.ceil(seconds / 60),
    });
  } catch {
    return response(
      {
        error:
          'Die Routenberechnung ist gerade nicht verfügbar. Bitte geben Sie die Entfernung selbst an oder kontaktieren Sie uns.',
      },
      502,
    );
  }
}
