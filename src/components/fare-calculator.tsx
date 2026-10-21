'use client';
import { useId, useState } from 'react';
import { Calculator, Route, Clock3, ArrowRight, Info } from 'lucide-react';
import { AddressField, MapsOption, useMaps } from './maps';
import { tariff } from '@/config/tariff';
import { estimateFare } from '@/lib/fare';
import { CallButton, WhatsAppButton } from './ui';
const disclaimer =
  'Unverbindliche Schätzung. Der tatsächliche Fahrpreis kann je nach Fahrtverlauf und geltendem Taxitarif abweichen.';
export function FareCalculator({ compact = false }: { compact?: boolean }) {
  const id = useId(),
    maps = useMaps();
  const [pickup, setPickup] = useState(''),
    [destination, setDestination] = useState(''),
    [manual, setManual] = useState(''),
    [waiting, setWaiting] = useState('0'),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [result, setResult] = useState<{
      km: number | null;
      minutes: number | null;
      fare: number | null;
    } | null>(null);
  const change = (fn: (v: string) => void) => (v: string) => {
    fn(v);
    setResult(null);
    setError('');
  };
  async function calculate(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setResult(null);
    if (pickup.trim().length < 3 || destination.trim().length < 3) {
      setError('Bitte geben Sie eine Abholadresse und eine Zieladresse ein.');
      return;
    }
    setBusy(true);
    try {
      let km = manual ? Number(manual.replace(',', '.')) : null,
        minutes: number | null = null;
      if (km !== null && (!Number.isFinite(km) || km <= 0 || km > 2000))
        throw new Error('Bitte geben Sie eine Entfernung zwischen 0,1 und 2.000 km ein.');
      const wait = Number(waiting);
      if (!Number.isFinite(wait) || wait < 0 || wait > 1440)
        throw new Error('Bitte geben Sie 0 bis 1.440 Minuten Wartezeit an.');
      if (km === null && maps.enabled) {
        const r = await fetch('/api/route', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pickup, destination, consent: true }),
        });
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || 'Route nicht verfügbar.');
        km = data.distanceKm;
        minutes = data.durationMinutes;
      }
      setResult({ km, minutes, fare: km !== null ? estimateFare(km, wait, tariff) : null });
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Bitte fragen Sie uns direkt nach Ihrem Fahrpreis.',
      );
    } finally {
      setBusy(false);
    }
  }
  const message = `Hallo Insel Taxi, ich möchte den Fahrpreis für diese Fahrt anfragen.\n\nAbholort: ${pickup}\nZielort: ${destination}${result?.km ? `\nEntfernung (${manual ? 'eigene Angabe' : 'Routenschätzung'}): ${result.km} km` : ''}\n\nBitte nennen Sie mir den voraussichtlichen Fahrpreis und bestätigen Sie die Verfügbarkeit.`;
  return (
    <form className={`fare-calculator ${compact ? 'fare-compact' : ''}`} onSubmit={calculate}>
      <MapsOption />
      <AddressField
        id={`${id}-start`}
        label="Startadresse"
        value={pickup}
        onChange={change(setPickup)}
        placeholder="Wo geht es los?"
      />
      <AddressField
        id={`${id}-end`}
        label="Zieladresse"
        value={destination}
        onChange={change(setDestination)}
        placeholder="Wohin geht die Fahrt?"
      />
      <details className="manual-distance">
        <summary>Entfernung selbst angeben & Wartezeit</summary>
        <div className="form-grid">
          <div className="field">
            <label htmlFor={`${id}-km`}>
              Entfernung in km <span className="optional">optional</span>
            </label>
            <input
              id={`${id}-km`}
              inputMode="decimal"
              value={manual}
              onChange={(e) => change(setManual)(e.target.value)}
              placeholder="z. B. 12,5"
              maxLength={8}
            />
          </div>
          <div className="field">
            <label htmlFor={`${id}-waiting`}>Wartezeit in Minuten</label>
            <input
              id={`${id}-waiting`}
              type="number"
              min="0"
              max="1440"
              value={waiting}
              onChange={(e) => change(setWaiting)(e.target.value)}
            />
          </div>
        </div>
        <p className="field-note">
          Bei selbst eingegebener Entfernung wird keine Fahrtdauer geschätzt.
        </p>
      </details>
      <button type="submit" className="button button-navy submit-button" disabled={busy}>
        <Calculator size={19} />
        {busy ? 'Route wird ermittelt …' : 'Fahrpreis prüfen'}
        <ArrowRight size={17} className="button-end" />
      </button>
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
      {result && (
        <div className="fare-result" role="status">
          <div className="route-results">
            <span>
              <Route size={17} />
              {result.km !== null ? `${result.km.toLocaleString('de-DE')} km` : 'Entfernung offen'}
            </span>
            <span>
              <Clock3 size={17} />
              {result.minutes !== null ? `ca. ${result.minutes} Min.` : 'Dauer offen'}
            </span>
          </div>
          {result.minutes !== null && (
            <p className="places-attribution">Routendaten: Google Maps</p>
          )}
          <p className="fare-value">
            {result.fare !== null
              ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
                  result.fare,
                )
              : 'Preis persönlich erfragen'}
          </p>
          {!tariff.verified && (
            <p>
              Die aktuellen Tarifwerte sind noch nicht vollständig geprüft. Deshalb zeigen wir
              keinen berechneten Eurobetrag.
            </p>
          )}
          {result.km === null && (
            <p>
              Ohne Google-Routenberechnung können Sie die Entfernung selbst eintragen oder uns
              direkt nach der Strecke fragen.
            </p>
          )}
          <div className="fare-result-actions">
            <WhatsAppButton message={message}>Fahrpreis per WhatsApp anfragen</WhatsAppButton>
            <CallButton>Taxi telefonisch bestellen</CallButton>
          </div>
        </div>
      )}
      <p className="calculator-disclaimer">
        <Info size={16} aria-hidden="true" />
        {disclaimer}
      </p>
    </form>
  );
}
