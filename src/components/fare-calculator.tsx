'use client';
import { useId, useState } from 'react';
import { Calculator, Info } from 'lucide-react';
import { AddressField, MapsOption, useMaps } from './maps';
import { tariff, nightTariff } from '@/config/tariff';
import { estimateFare } from '@/lib/fare';
import { CallButton, WhatsAppButton, EmailButton } from './ui';
export const fareDisclaimer =
  'Unverbindliche Streckenschätzung, kein Angebot und kein Höchstpreis. Der tatsächliche Gesamtpreis kann durch Anfahrt, Wartezeiten, Umwege, Verkehrsverhältnisse, besondere Ausstattung und zulässige Zuschläge deutlich höher sein. Für Fahrten mit Ziel außerhalb des Kreises Herzogtum Lauenburg vereinbaren wir den Fahrpreis vor Fahrtbeginn persönlich.';
export function FareCalculator() {
  const id = useId(),
    maps = useMaps();
  const [pickup, setPickup] = useState(''),
    [destination, setDestination] = useState(''),
    [manual, setManual] = useState(''),
    [scope, setScope] = useState('unsure'),
    [period, setPeriod] = useState('day'),
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
      setError('Bitte geben Sie Start und Ziel ein.');
      return;
    }
    if (scope !== 'inside') {
      setResult({ km: null, minutes: null, fare: null });
      return;
    }
    setBusy(true);
    try {
      let km = manual ? Number(manual.replace(',', '.')) : null,
        minutes: number | null = null;
      if (km !== null && (!Number.isFinite(km) || km <= 0 || km > 2000))
        throw new Error('Bitte geben Sie eine Entfernung von 0,1 bis 2.000 km ein.');
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
      setResult({
        km,
        minutes,
        fare: km !== null ? estimateFare(km, 0, period === 'day' ? tariff : nightTariff) : null,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Bitte fragen Sie uns direkt.');
    } finally {
      setBusy(false);
    }
  }
  const message = `Hallo Insel Taxi, ich möchte eine Fahrt und den voraussichtlichen Gesamtpreis anfragen.\n\nAbholort: ${pickup}\nZielort: ${destination}${result?.km ? `\nStrecke (unverbindlich): ${result.km} km` : ''}\n\nBitte berücksichtigen Sie auch eine mögliche Anfahrt und weitere Kosten. Bitte bestätigen Sie die Verfügbarkeit.`;
  return (
    <form className="fare-calculator" onSubmit={calculate} noValidate>
      <p className="notice">{fareDisclaimer}</p>
      <MapsOption />
      <AddressField
        id={`${id}-start`}
        label="Startadresse"
        value={pickup}
        onChange={change(setPickup)}
        placeholder="Wo beginnt die Fahrt?"
      />
      <AddressField
        id={`${id}-end`}
        label="Zieladresse"
        value={destination}
        onChange={change(setDestination)}
        placeholder="Wohin möchten Sie fahren?"
      />
      <div className="field">
        <label htmlFor={`${id}-scope`}>Wo verläuft Ihre Fahrt?</label>
        <select id={`${id}-scope`} value={scope} onChange={(e) => change(setScope)(e.target.value)}>
          <option value="unsure">Bitte auswählen / noch unsicher</option>
          <option value="inside">Komplett im Kreis Herzogtum Lauenburg</option>
          <option value="outside">Ganz oder teilweise außerhalb / Ausland</option>
        </select>
        <p className="field-note">
          Der Kreistarif gilt nicht pauschal für ganz Deutschland. Liegen Start, Ziel oder Teile der
          Strecke außerhalb des Kreises, stimmen wir den Preis persönlich mit Ihnen ab.
        </p>
      </div>
      {scope === 'inside' && (
        <>
          <div className="field">
            <label htmlFor={`${id}-period`}>Tarifzeit für bis zu 4 Fahrgäste</label>
            <select
              id={`${id}-period`}
              value={period}
              onChange={(e) => change(setPeriod)(e.target.value)}
            >
              <option value="day">Werktags 06–22 Uhr, kein Feiertag</option>
              <option value="night">22–06 Uhr oder sonn- und feiertags</option>
            </select>
            <p className="field-note">
              Bitte die zur Fahrt passende Tarifzeit auswählen. Ein Tarifwechsel während der Fahrt
              ist hier nicht abgebildet.
            </p>
          </div>
          <div className="field">
            <label htmlFor={`${id}-km`}>
              Entfernung in km <span className="optional">optional, falls bekannt</span>
            </label>
            <input
              id={`${id}-km`}
              inputMode="decimal"
              value={manual}
              onChange={(e) => change(setManual)(e.target.value)}
              maxLength={8}
              placeholder="z. B. 12,5"
            />
          </div>
        </>
      )}
      <button className="button button-outline submit-button" disabled={busy}>
        <Calculator size={18} />
        {busy ? 'Route wird ermittelt …' : 'Unverbindliche Strecke einschätzen'}
      </button>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {result && (
        <div className="fare-result" role="status">
          {result.fare !== null ? (
            <>
              <p className="small-label">NUR GRUNDPREIS UND ANGEGEBENE FAHRTSTRECKE</p>
              <p className="fare-value">
                ca. {result.fare.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
              <p>
                {result.km?.toLocaleString('de-DE')} km
                {result.minutes !== null
                  ? ` · ca. ${result.minutes} Minuten · Routendaten: Google Maps`
                  : ' · selbst angegebene Entfernung, keine Dauer ermittelt'}
              </p>
              <p>
                <strong>
                  Kein Gesamtpreis. Anfahrt, Wartezeiten, besondere Ausstattung und zulässige
                  Zuschläge sind nicht enthalten. Der tatsächliche Preis kann deutlich höher sein.
                </strong>
              </p>
            </>
          ) : (
            <>
              <h3>Gesamtpreis persönlich anfragen</h3>
              <p>
                {scope === 'inside'
                  ? 'Bitte geben Sie eine bekannte Entfernung ein oder aktivieren Sie freiwillig Google-Dienste.'
                  : 'Für Ziele außerhalb des Tarifgebiets und bei unklarer Zuordnung nennen wir hier keinen pauschalen Kilometerpreis. Wir vereinbaren den Fahrpreis vor Fahrtbeginn persönlich.'}
              </p>
            </>
          )}
          <div className="fare-result-actions">
            <WhatsAppButton message={message}>Gesamtpreis per WhatsApp anfragen</WhatsAppButton>
            <EmailButton message={message}>Gesamtpreis per E-Mail anfragen</EmailButton>
            <CallButton />
          </div>
        </div>
      )}
      <p className="calculator-disclaimer">
        <Info size={16} />
        {fareDisclaimer}
      </p>
    </form>
  );
}
