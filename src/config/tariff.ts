/** Quelle: bereitgestellte Kreisverordnung vom 25.09.2026, §§ 1–5; gültig ab 01.10.2026. */
export const tariff = {
  effectiveFrom: '2026-10-01',
  source: '/tarife/kreisverordnung-2026-10-01.pdf',
  base: 5.5,
  boundaryKm: 3,
  day: { firstKm: 2.9, followingKm: 2.7 },
  night: { firstKm: 3.2, followingKm: 2.9 },
  waitingPerHour: 50,
  largeVehicleSurcharge: 12,
  meterStep: 0.1,
} as const;
export function euros(value: number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
}
