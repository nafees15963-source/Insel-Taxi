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
  pickup: 'Am Markt 4, Ratzeburg',
  destination: 'Hamburg Airport & Terminal 1',
  date: '2099-06-20',
  time: '12:30',
  wishes: 'Rollator & Hilfe beim Einsteigen',
};
test('WhatsApp round trip preserves umlauts, ampersands, line breaks and does not confirm a booking', () => {
  const text = bookingMessage(booking);
  const url = new URL(whatsappLink(text));
  assert.equal(url.searchParams.get('text'), text);
  assert.equal(url.pathname, '/491739189239');
  assert.match(text, /Bitte bestätigen Sie mir/);
  assert.doesNotMatch(text, /Fahrt ist bestätigt/);
});
test('rejects empty, past, impossible passenger counts and reverse return trip', () => {
  assert.ok(validateBooking(emptyBooking).pickup);
  assert.ok(validateBooking({ ...booking, date: '2020-01-01' }).date);
  assert.ok(validateBooking({ ...booking, passengers: '10' }).passengers);
  assert.ok(
    validateBooking(
      { ...booking, returnTrip: 'Ja', returnDate: '2099-06-20', returnTime: '11:00' },
      'airport',
    ).returnTime,
  );
});
test('medical and airport messages retain required information', () => {
  assert.match(
    bookingMessage(
      {
        ...booking,
        rideType: 'Arzttermin',
        returnTrip: 'Ja',
        returnDate: '2099-06-20',
        returnTime: '17:00',
      },
      'medical',
    ),
    /Rückfahrt: 20.06.2099 um 17:00/,
  );
  assert.match(bookingMessage({ ...booking, flight: 'LH123' }, 'airport'), /LH123/);
  assert.deepEqual(validateBooking(booking), {});
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
  const message = bookingMessage(booking, 'airport');
  const url = new URL(emailLink(message));
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'info@inseltaxi-ratzeburg.de');
  assert.equal(url.searchParams.get('body'), message);
  assert.equal(url.searchParams.get('subject'), 'Fahrtanfrage – Insel Taxi');
});
