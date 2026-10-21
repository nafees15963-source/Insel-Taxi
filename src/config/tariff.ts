export type Tariff = {
  roundingIncrement?: number;
  verified: boolean;
  validFrom: string | null;
  sourceUrl: string;
  checkedAt: string;
  base: number | null;
  bands: { upToKm: number | null; perKm: number }[];
  waitingPerHour: number | null;
  surcharge: number | null;
};
/** Vom Betreiber bereitgestellte Kreisverordnung vom 25.09.2026, §§ 1–2, gültig ab 01.10.2026. */
export const tariff: Tariff = {
  verified: true,
  validFrom: '2026-10-01',
  sourceUrl: '/tarife/kreisverordnung-2026-10-01.pdf',
  checkedAt: '2026-10-21',
  base: 5.5,
  bands: [
    { upToKm: 3, perKm: 2.9 },
    { upToKm: null, perKm: 2.7 },
  ],
  waitingPerHour: 50,
  surcharge: 0,
  roundingIncrement: 0.1,
};
export const nightTariff: Tariff = {
  ...tariff,
  bands: [
    { upToKm: 3, perKm: 3.2 },
    { upToKm: null, perKm: 2.9 },
  ],
};
export const tariffExtras = { largeVehicleMoreThanFourPassengers: 12 };
