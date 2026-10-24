import assert from 'node:assert/strict';
import test from 'node:test';
import { berlinClock, berlinInstants, buildRideMessage, emptyRide, rideSummary, validateRide, type RideData } from '../src/lib/booking';
import { whatsappUrl } from '../src/lib/contact';

const now = new Date('2026-10-23T12:00:00Z');
const valid: RideData = {
  ...emptyRide, pickup: 'Möllner Straße 1, Ratzeburg', destination: 'Bahnhof Ratzeburg',
  date: '2026-10-24', time: '14:30', passengers: '2',
};

test('appointment validation uses Ratzeburg local time rather than the host timezone', () => {
  assert.deepEqual(berlinClock(now), { date: '2026-10-23', time: '14:00' });
  assert.deepEqual(validateRide(valid, 'taxi', 3, now), {});
  assert.ok(validateRide({ ...valid, date: '2026-10-23', time: '13:59' }, 'taxi', 3, now).date);
  assert.deepEqual(validateRide({ ...valid, date: '2026-10-23', time: '14:01' }, 'taxi', 3, now), {});
});

test('invalid calendar dates and the skipped spring clock hour are rejected', () => {
  assert.deepEqual(berlinInstants('2027-02-30', '12:00'), []);
  assert.deepEqual(berlinInstants('2027-03-28', '02:30'), []);
  assert.deepEqual(berlinInstants('2027-03-28', '25:30'), []);
  assert.ok(validateRide({ ...valid, date: '2027-03-28', time: '02:30' }, 'taxi', 3, now).time);
});

test('both occurrences of the repeated autumn hour are represented', () => {
  assert.deepEqual(berlinInstants('2026-10-25', '02:30'), [Date.parse('2026-10-25T00:30Z'), Date.parse('2026-10-25T01:30Z')]);
  // The second occurrence is still in the future at 00:45 UTC.
  assert.equal(validateRide({ ...valid, date: '2026-10-25', time: '02:30' }, 'taxi', 3, new Date('2026-10-25T00:45Z')).date, undefined);
});

test('each required field is checked at its relevant step', () => {
  const first = validateRide({ ...emptyRide }, 'medical', 1, now);
  assert.ok(first.pickup && first.destination && first.medicalType);
  assert.equal(first.date, undefined);
  assert.ok(validateRide({ ...valid }, 'airport', 1, now).airport);
  assert.ok(validateRide({ ...valid, date: '', time: '' }, 'taxi', 2, now).date);
});

test('nine passengers remain a group request, not a nine-passenger vehicle claim', () => {
  const data = { ...valid, passengers: '9' };
  assert.deepEqual(validateRide(data, 'taxi', 3, now), {});
  assert.match(buildRideMessage(data, 'taxi'), /9 Personen – bitte passende Fahrzeugaufteilung bestätigen/);
  assert.ok(validateRide({ ...valid, passengers: '10' }, 'taxi', 3, now).passengers);
  assert.ok(validateRide({ ...valid, passengers: '0' }, 'taxi', 3, now).passengers);
  assert.ok(validateRide({ ...valid, passengers: '2.5' }, 'taxi', 3, now).passengers);
});

test('the optional return accepts an open time, but rejects incomplete or earlier appointments', () => {
  assert.deepEqual(validateRide({ ...valid, returnRequested: true }, 'taxi', 3, now), {});
  assert.ok(validateRide({ ...valid, returnRequested: true, returnDate: '2026-10-25' }, 'taxi', 3, now).returnTime);
  assert.ok(validateRide({ ...valid, returnRequested: true, returnDate: '2026-10-24', returnTime: '13:00' }, 'taxi', 3, now).returnDate);
  assert.deepEqual(validateRide({ ...valid, returnRequested: true, returnDate: '2026-10-24', returnTime: '15:00' }, 'taxi', 3, now), {});
});

test('WhatsApp link round-trips German text, line breaks, ampersands and optional flight/return details', () => {
  const data: RideData = { ...valid, airport: 'Hamburg (HAM)', direction: 'from', pickup: 'Hamburg (HAM)',
    destination: 'Bäckerstraße 2 & Hintereingang, Ratzeburg', flightNumber: 'LH 123', luggage: '3', name: 'Müller',
    wishes: 'Kindersitz bitte\nAbholung am Eingang + Rückruf', returnRequested: true, returnDate: '2026-10-26', returnTime: '08:00', returnDetails: 'Anderer Abholort: Bahnhof' };
  const message = buildRideMessage(data, 'airport');
  const url = new URL(whatsappUrl(message));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/491739189239');
  assert.equal(url.searchParams.get('text'), message);
  for (const expected of ['Müller', 'Bäckerstraße 2 & Hintereingang', 'Flugnummer: LH 123', 'Gepäckstücke: 3', '26.10.2026, 08:00', 'Anderer Abholort: Bahnhof']) assert.ok(message.includes(expected));
  assert.match(message, /unverbindlich anfragen/);
  assert.match(message, /Bitte bestätigen Sie die Verfügbarkeit/);
});

test('unchecked return data is omitted and optional input bounds are enforced', () => {
  const data = { ...valid, returnRequested: false, returnDate: '2026-10-26', returnTime: '08:00', returnDetails: 'unused' };
  assert.ok(!rideSummary(data, 'taxi').some(([label]) => label.startsWith('Rück') || label.includes('Rückfahrt')));
  const invalid = validateRide({ ...valid, name: 'a'.repeat(81), pickup: 'b'.repeat(181), wishes: 'c'.repeat(501), luggage: '21' }, 'taxi', 3, now);
  assert.ok(invalid.name && invalid.pickup && invalid.wishes && invalid.luggage);
});
