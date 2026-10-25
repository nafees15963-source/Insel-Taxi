import test from 'node:test';
import assert from 'node:assert/strict';
import {
  bookingMessage,
  emptyBooking,
  validateBooking,
  emailLink,
  whatsappLink,
} from '../src/lib/booking';
import { estimateFare } from '../src/lib/fare';
import { tariff, nightTariff, type Tariff } from '../src/config/tariff';
const booking = {
  ...emptyBooking,
  name: 'Jörg Weiß',
  pickup: 'Am Markt 4, Ratzeburg',
  destination: 'Hamburg Airport & Terminal 1',
  date: '2099-06-20',
  time: '12:30',
  wishes: 'Rollator & Hilfe beim Einsteigen 🚕\nRückfahrt später',
};
test('WhatsApp preserves all fields and Unicode without confirming a booking', () => {
  const message = bookingMessage(booking);
  const url = new URL(whatsappLink(message));
  assert.equal(url.searchParams.get('text'), message);
  assert.equal(url.pathname, '/491739189239');
  for (const expected of [
    'Name: Jörg Weiß',
    'Fahrttyp: Taxifahrt',
    booking.pickup,
    booking.destination,
    '20.06.2099',
    '12:30',
    'Personen: 1',
    booking.wishes,
  ]) {
    assert.ok(message.includes(expected));
  }
  assert.match(message, /Bitte bestätigen Sie mir/);
  assert.doesNotMatch(message, /Fahrt ist bestätigt/);
});
test('requires name, supported ride type, route, date and time; allows 1–8 passengers', () => {
  const errors = validateBooking({ ...emptyBooking, rideType: '' });
  for (const key of ['name', 'rideType', 'pickup', 'destination', 'date', 'time'] as const)
    assert.ok(errors[key]);
  for (let passengers = 1; passengers <= 8; passengers++)
    assert.deepEqual(validateBooking({ ...booking, passengers: String(passengers) }), {});
  for (const passengers of ['0', '9', '1.5', '-1', '01', ''])
    assert.ok(validateBooking({ ...booking, passengers }).passengers);
  assert.ok(validateBooking({ ...booking, rideType: 'invalid' }).rideType);
});
test('requires and validates a phone only for email, and excludes it from WhatsApp', () => {
  assert.deepEqual(validateBooking(booking), {});
  assert.ok(validateBooking(booking, 'email').phone);
  for (const phone of ['abc', '123', '+1234567890123456'])
    assert.ok(validateBooking({ ...booking, phone }, 'email').phone);
  const emailBooking = { ...booking, phone: '+49 (4541) 802080' };
  assert.deepEqual(validateBooking(emailBooking, 'email'), {});
  assert.match(bookingMessage(emailBooking, 'ride', 'email'), /Telefon: \+49 \(4541\) 802080/);
  assert.doesNotMatch(bookingMessage(emailBooking), /Telefon:/);
});
test('rejects excessive lengths and invalid calendar dates or times', () => {
  assert.ok(validateBooking({ ...booking, name: 'x'.repeat(101) }).name);
  assert.ok(validateBooking({ ...booking, pickup: 'x'.repeat(241) }).pickup);
  assert.ok(validateBooking({ ...booking, destination: 'x'.repeat(241) }).destination);
  assert.ok(validateBooking({ ...booking, wishes: 'x'.repeat(801) }).wishes);
  for (const date of ['2099-02-29', '2099-04-31', '2099-13-01', '2099-00-01', 'not-a-date'])
    assert.ok(validateBooking({ ...booking, date }).date);
  for (const time of ['24:00', '12:60', '1:30', 'not-a-time'])
    assert.ok(validateBooking({ ...booking, time }).time);
});
test('validates future times in Berlin regardless of browser time zone', () => {
  const now = new Date('2026-07-01T10:00:00Z');
  assert.ok(
    validateBooking({ ...booking, date: '2026-07-01', time: '11:59' }, 'whatsapp', now).date,
  );
  assert.ok(
    validateBooking({ ...booking, date: '2026-07-01', time: '12:00' }, 'whatsapp', now).date,
  );
  assert.deepEqual(
    validateBooking({ ...booking, date: '2026-07-01', time: '12:01' }, 'whatsapp', now),
    {},
  );
  assert.deepEqual(
    validateBooking(
      { ...booking, date: '2026-12-01', time: '11:01' },
      'whatsapp',
      new Date('2026-12-01T10:00:00Z'),
    ),
    {},
  );
});
test('rejects nonexistent spring clock-change times and accepts a future autumn occurrence', () => {
  assert.ok(
    validateBooking(
      { ...booking, date: '2027-03-28', time: '02:30' },
      'whatsapp',
      new Date('2027-03-01T00:00:00Z'),
    ).date,
  );
  assert.deepEqual(
    validateBooking(
      { ...booking, date: '2026-10-25', time: '02:30' },
      'whatsapp',
      new Date('2026-10-25T01:00:00Z'),
    ),
    {},
  );
  assert.ok(
    validateBooking(
      { ...booking, date: '2026-10-25', time: '02:30' },
      'whatsapp',
      new Date('2026-10-25T01:31:00Z'),
    ).date,
  );
});
test('all ride types appear in the request even when changed from a page preset', () => {
  for (const rideType of [
    'Taxifahrt',
    'Krankenfahrt',
    'Flughafentransfer',
    'Geschäftsfahrt',
    'Kinderfahrt',
    'Kurierfahrt',
    'Sonstige Fahrt',
  ]) {
    const changed = { ...booking, rideType };
    assert.deepEqual(validateBooking(changed), {});
    assert.ok(bookingMessage(changed, 'medical').includes(`Fahrttyp: ${rideType}`));
  }
});
test('unverified tariff never produces a fare', () => {
  assert.equal(estimateFare(10, 0, { ...tariff, verified: false }), null);
});
// Synthetic fixture only; these are deliberately NOT actual Ratzeburg tariff values.
const fixture: Tariff = {
  verified: true,
  validFrom: '2099-01-01',
  sourceUrl: 'https://example.test',
  checkedAt: '2099-01-01',
  base: 2,
  bands: [
    { upToKm: 3, perKm: 4 },
    { upToKm: null, perKm: 2 },
  ],
  waitingPerHour: 12,
  surcharge: 1,
};
test('price structure accounts for tier boundaries, waiting and surcharge', () => {
  assert.equal(estimateFare(3, 0, fixture), 15);
  assert.equal(estimateFare(5, 10, fixture), 21);
  assert.throws(() => estimateFare(-1, 0, fixture));
  assert.throws(() => estimateFare(NaN, 0, fixture));
});

test('provided 2026 ordinance: day/night bands, 10-cent rounding and waiting', () => {
  assert.equal(estimateFare(3, 0, tariff), 14.2);
  assert.equal(estimateFare(10, 0, tariff), 33.1);
  assert.equal(estimateFare(10, 0, nightTariff), 35.4);
  assert.equal(estimateFare(12.5, 0, tariff), 39.9);
  assert.equal(estimateFare(10, 60, tariff), 83.1);
});
test('email draft preserves complete booking data without sending', () => {
  const message = bookingMessage(
    { ...booking, rideType: 'Flughafentransfer', phone: '04541 802080' },
    'airport',
    'email',
  );
  const url = new URL(emailLink(message));
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'info@inseltaxi-ratzeburg.de');
  assert.equal(url.searchParams.get('body'), message);
  assert.equal(url.searchParams.get('subject'), 'Fahrtanfrage – Insel Taxi');
});

test('courier requests omit passengers while keeping route, shipment notes and email contact', () => {
  const courier = {
    ...booking,
    rideType: 'Kurierfahrt',
    passengers: '',
    wishes: '2 Pakete, je 30 x 20 x 15 cm, 4 kg',
    phone: '+49 173 1234567',
  };
  assert.deepEqual(validateBooking(courier), {});
  assert.deepEqual(validateBooking(courier, 'email'), {});
  const message = bookingMessage(courier, 'ride', 'email');
  assert.match(message, /Fahrttyp: Kurierfahrt/);
  assert.ok(message.includes(courier.wishes));
  assert.ok(message.includes(courier.phone));
  assert.doesNotMatch(message, /Personen:/);
  assert.ok(validateBooking({ ...courier, rideType: 'Taxifahrt' }).passengers);
});
