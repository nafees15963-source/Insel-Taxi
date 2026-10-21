export type Tariff = {
  verified: boolean;
  validFrom: string | null;
  sourceUrl: string;
  checkedAt: string;
  base: number | null;
  bands: { upToKm: number | null; perKm: number }[];
  waitingPerHour: number | null;
  surcharge: number | null;
};
/** Keine 2024-Werte aktivieren: aktuelle Verordnung ab 01.10.2026 gefunden, PDF nicht abrufbar. */
export const tariff: Tariff = {
  verified: false,
  validFrom: null,
  sourceUrl: 'https://www.kreis-rz.de/bekanntmachungen',
  checkedAt: '2026-10-21',
  base: null,
  bands: [],
  waitingPerHour: null,
  surcharge: null,
};
