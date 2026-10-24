export type RideMode = 'taxi' | 'medical' | 'airport';
export type RideData = {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: string;
  luggage: string;
  wishes: string;
  name: string;
  medicalType: string;
  airport: string;
  direction: 'to' | 'from';
  flightNumber: string;
  returnRequested: boolean;
  returnDate: string;
  returnTime: string;
  returnDetails: string;
};
export type RideErrors = Partial<Record<keyof RideData, string>>;
export const emptyRide: RideData = {
  pickup: '', destination: '', date: '', time: '', passengers: '1', luggage: '',
  wishes: '', name: '', medicalType: '', airport: '', direction: 'to', flightNumber: '',
  returnRequested: false, returnDate: '', returnTime: '', returnDetails: '',
};

/** All appointment times are local to Ratzeburg, independent of the visitor's timezone. */
export function berlinClock(now = new Date()) {
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now);
  const get = (part: Intl.DateTimeFormatPartTypes) => parts.find(p => p.type === part)?.value || '';
  return { date: `${get('year')}-${get('month')}-${get('day')}`, time: `${get('hour')}:${get('minute')}` };
}

/** A repeated autumn time has two matches; a skipped spring time has none. */
export function berlinInstants(date: string, time: string): number[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return [];
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  if (year < 2020 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) return [];
  const wall = Date.UTC(year, month - 1, day, hour, minute);
  return [1, 2].map(offset => wall - offset * 3_600_000).filter(instant => {
    const local = berlinClock(new Date(instant));
    return local.date === date && local.time === time;
  }).sort((a, b) => a - b);
}

export function validateRide(data: RideData, mode: RideMode, step: 1 | 2 | 3 = 3, now = new Date()): RideErrors {
  const errors: RideErrors = {};
  if (step === 1 || step === 3) {
    if (!data.pickup.trim()) errors.pickup = 'Bitte geben Sie den Abholort an.';
    if (!data.destination.trim()) errors.destination = 'Bitte geben Sie das Ziel an.';
    if (data.pickup.length > 180) errors.pickup = 'Bitte kürzen Sie den Abholort auf höchstens 180 Zeichen.';
    if (data.destination.length > 180) errors.destination = 'Bitte kürzen Sie das Ziel auf höchstens 180 Zeichen.';
    if (mode === 'medical' && !data.medicalType) errors.medicalType = 'Bitte wählen Sie die Art der Fahrt aus.';
    if (mode === 'airport' && !data.airport) errors.airport = 'Bitte wählen Sie einen Flughafen aus.';
  }
  if (step === 2 || step === 3) {
    if (!data.date) errors.date = 'Bitte wählen Sie das Datum aus.';
    if (!data.time) errors.time = 'Bitte wählen Sie die Abholzeit aus.';
    const departure = berlinInstants(data.date, data.time);
    if (data.date && data.time && departure.length === 0) errors.time = 'Dieses Datum oder diese Uhrzeit ist ungültig. Bitte prüfen Sie die Eingabe (Ortszeit Ratzeburg).';
    if (departure.length && !departure.some(instant => instant >= now.getTime())) errors.date = 'Bitte wählen Sie einen Zeitpunkt in der Zukunft. Für eine sofortige Fahrt rufen Sie uns bitte an.';
    if (!/^[1-9]$/.test(data.passengers)) errors.passengers = 'Bitte wählen Sie 1 bis 9 Fahrgäste aus.';
    if (data.luggage && (!/^\d{1,2}$/.test(data.luggage) || Number(data.luggage) > 20)) errors.luggage = 'Bitte geben Sie 0 bis 20 Gepäckstücke an. Mehr Gepäck stimmen Sie bitte telefonisch ab.';
    if (data.name.length > 80) errors.name = 'Bitte verwenden Sie höchstens 80 Zeichen.';
    if (data.wishes.length > 500) errors.wishes = 'Bitte verwenden Sie höchstens 500 Zeichen.';
    if (data.flightNumber.length > 20) errors.flightNumber = 'Bitte verwenden Sie höchstens 20 Zeichen.';
    if (data.returnDetails.length > 300) errors.returnDetails = 'Bitte verwenden Sie höchstens 300 Zeichen.';
    if (data.returnRequested && (data.returnDate || data.returnTime)) {
      if (!data.returnDate) errors.returnDate = 'Bitte ergänzen Sie das Rückfahrtdatum oder lassen Sie beide Angaben offen.';
      if (!data.returnTime) errors.returnTime = 'Bitte ergänzen Sie die Rückfahrtzeit oder lassen Sie beide Angaben offen.';
      if (data.returnDate && data.returnTime) {
        const returning = berlinInstants(data.returnDate, data.returnTime);
        if (!returning.length) errors.returnTime = 'Bitte prüfen Sie Datum und Uhrzeit der Rückfahrt.';
        else if (departure.length && Math.max(...returning) <= Math.min(...departure)) errors.returnDate = 'Die Rückfahrt muss nach der Hinfahrt liegen.';
      }
    }
  }
  return errors;
}

export function displayDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value.split('-').reverse().join('.') : value;
}

export function rideSummary(data: RideData, mode: RideMode): [string, string][] {
  const lines: [string, string][] = [
    ['Fahrt', mode === 'medical' ? 'Krankenfahrt' : mode === 'airport' ? 'Flughafentransfer' : 'Taxifahrt'],
  ];
  if (mode === 'medical') lines.push(['Anlass', data.medicalType]);
  if (mode === 'airport') {
    lines.push(['Flughafen', data.airport], ['Richtung', data.direction === 'to' ? 'Zum Flughafen' : 'Vom Flughafen']);
  }
  lines.push(['Abholort', data.pickup.trim()], ['Zielort', data.destination.trim()],
    ['Datum', displayDate(data.date)], ['Abholzeit', `${data.time} Uhr (Ortszeit Ratzeburg)`], ['Fahrgäste', data.passengers]);
  if (berlinInstants(data.date, data.time).length > 1 || (data.returnRequested && berlinInstants(data.returnDate, data.returnTime).length > 1)) {
    lines.push(['Zeitumstellung', 'Eine angegebene Uhrzeit kommt an diesem Tag zweimal vor. Bitte die genaue Abholzeit persönlich abstimmen.']);
  }
  if (data.passengers === '9') lines.push(['Gruppenanfrage', '9 Personen – bitte passende Fahrzeugaufteilung bestätigen.']);
  if (data.luggage) lines.push(['Gepäckstücke', data.luggage]);
  if (mode === 'airport' && data.flightNumber.trim()) lines.push(['Flugnummer', data.flightNumber.trim()]);
  if (data.returnRequested) {
    lines.push(['Rückfahrt', data.returnDate && data.returnTime ? `${displayDate(data.returnDate)}, ${data.returnTime} Uhr (Ortszeit Ratzeburg)` : 'Gewünscht – Zeitpunkt bitte abstimmen']);
    if (data.returnDetails.trim()) lines.push(['Hinweise zur Rückfahrt', data.returnDetails.trim()]);
  }
  if (data.name.trim()) lines.push(['Name', data.name.trim()]);
  if (data.wishes.trim()) lines.push(['Besondere Wünsche', data.wishes.trim()]);
  return lines;
}

export function buildRideMessage(data: RideData, mode: RideMode) {
  return ['Hallo Insel Taxi, ich möchte folgende Fahrt unverbindlich anfragen:', '',
    ...rideSummary(data, mode).map(([label, value]) => `${label}: ${value}`), '',
    'Bitte bestätigen Sie die Verfügbarkeit und die Fahrtdetails. Vielen Dank!'].join('\n');
}
