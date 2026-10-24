import type { Tariff } from '@/config/tariff';
/** Stetige Schätzung. Taxameter-Schalteinheiten und reale Wartezeiten können abweichen. */
export function estimateFare(km: number, waitingMinutes: number, t: Tariff): number | null {
  if (
    !Number.isFinite(km) ||
    km <= 0 ||
    km > 2000 ||
    !Number.isFinite(waitingMinutes) ||
    waitingMinutes < 0 ||
    waitingMinutes > 1440
  )
    throw new Error('Ungültige Strecke oder Wartezeit.');
  if (
    !t.verified ||
    t.base === null ||
    t.waitingPerHour === null ||
    t.surcharge === null ||
    !t.validFrom ||
    !t.bands.length
  )
    return null;
  let total = t.base,
    previous = 0,
    remaining = km;
  for (const band of t.bands) {
    if (!Number.isFinite(band.perKm) || band.perKm < 0) throw new Error('Ungültiger Tarif.');
    const distance = band.upToKm === null ? remaining : Math.min(remaining, band.upToKm - previous);
    if (distance < 0) throw new Error('Ungültige Tarifstufen.');
    total += distance * band.perKm;
    remaining -= distance;
    previous = band.upToKm ?? previous;
    if (remaining <= 0) break;
  }
  if (remaining > 0) throw new Error('Tarif deckt die Strecke nicht ab.');
  const amount = total + (waitingMinutes / 60) * t.waitingPerHour + t.surcharge;
  const increment = t.roundingIncrement ?? 0.01;
  return Math.round(Math.round(amount / increment + 1e-9) * increment * 100) / 100;
}
