'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, MessageCircle, Phone } from 'lucide-react';
import { airports, company } from '@/config/company';
import { whatsappUrl } from '@/lib/contact';
import { berlinClock, buildRideMessage, emptyRide, rideSummary, validateRide, type RideData, type RideErrors, type RideMode } from '@/lib/booking';
import { AddressInput } from './address-input';

type Props = { mode?: RideMode; compact?: boolean };

function FieldError({ id, error }: { id: string; error?: string }) {
  return error ? <p id={`${id}-error`} className="form-error">{error}</p> : null;
}

function CompactRideForm() {
  const router = useRouter();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  function continueRide(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // A URL fragment is not transmitted to the web server.
    const fragment = new URLSearchParams({ pickup: pickup.trim(), destination: destination.trim() });
    router.push(`/fahrt-anfragen/#${fragment.toString()}`);
  }
  return <form className="ride-form ride-form-compact" action="/fahrt-anfragen/" onSubmit={continueRide}>
    <div className="field">
      <label htmlFor="quick-pickup">Wo dürfen wir Sie abholen?</label>
      <input id="quick-pickup" value={pickup} onChange={event => setPickup(event.target.value)}
        placeholder="Straße, Hausnummer und Ort" autoComplete="off" maxLength={180} required />
    </div>
    <div className="field">
      <label htmlFor="quick-destination">Wohin möchten Sie?</label>
      <input id="quick-destination" value={destination} onChange={event => setDestination(event.target.value)}
        placeholder="Zieladresse oder Wunschziel" autoComplete="off" maxLength={180} required />
    </div>
    <button type="submit" className="button button-primary">Fahrt vorbereiten <ArrowRight size={19} aria-hidden="true" /></button>
    <p className="form-note">Ohne Registrierung. Bestätigung persönlich durch uns.</p>
  </form>;
}

function FullRideForm({ mode }: { mode: RideMode }) {
  const prefix = useId().replaceAll(':', '');
  const [data, setData] = useState<RideData>({ ...emptyRide });
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errors, setErrors] = useState<RideErrors>({});
  const [today, setToday] = useState('');
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const [opened, setOpened] = useState(false);
  const [staleError, setStaleError] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const mapsConfigured = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY);
  const fieldId = (field: keyof RideData) => `${prefix}-${field}`;
  const currentTitle = step === 1 ? 'Wohin geht Ihre Fahrt?' : step === 2 ? 'Wann dürfen wir Sie abholen?' : 'Ist alles richtig?';

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const pickup = (params.get('pickup') || '').slice(0, 180);
    const destination = (params.get('destination') || '').slice(0, 180);
    queueMicrotask(() => {
      setToday(berlinClock().date);
      if (mode === 'taxi' && (pickup || destination)) setData(previous => ({ ...previous, pickup, destination }));
    });
    if (params.has('pickup') || params.has('destination')) {
      window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#anfrage`);
    }
  }, [mode]);

  function change<K extends keyof RideData>(field: K, value: RideData[K]) {
    setData(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
    setStaleError('');
    setOpened(false);
  }

  function changeAirport(value: string) {
    setData(previous => {
      const airportAddress = value.startsWith('Anderer') ? '' : value.replace(' – auf Anfrage', '');
      return { ...previous, airport: value, [previous.direction === 'to' ? 'destination' : 'pickup']: airportAddress };
    });
    setErrors(previous => ({ ...previous, airport: undefined, pickup: undefined, destination: undefined }));
  }

  function changeDirection(value: 'to' | 'from') {
    if (value === data.direction) return;
    setData(previous => ({ ...previous, direction: value, pickup: previous.destination, destination: previous.pickup }));
    setErrors({});
  }

  function focusErrors(nextErrors: RideErrors) {
    const first = Object.keys(nextErrors)[0] as keyof RideData | undefined;
    window.requestAnimationFrame(() => { if (first) document.getElementById(fieldId(first))?.focus(); });
  }

  function goToStep(next: 1 | 2 | 3) {
    setStep(next);
    setErrors({});
    window.requestAnimationFrame(() => heading.current?.focus({ preventScroll: false }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 3) return;
    const nextErrors = validateRide(data, mode, step);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { focusErrors(nextErrors); return; }
    goToStep(step === 1 ? 2 : 3);
  }

  function verifyBeforeWhatsApp(event: React.MouseEvent<HTMLAnchorElement>) {
    const nextErrors = validateRide(data, mode);
    if (Object.keys(nextErrors).length) {
      event.preventDefault();
      const firstStep = nextErrors.pickup || nextErrors.destination || nextErrors.airport || nextErrors.medicalType;
      setStep(firstStep ? 1 : 2);
      setErrors(nextErrors);
      setStaleError('Bitte prüfen Sie die markierten Angaben, bevor Sie WhatsApp öffnen.');
      focusErrors(nextErrors);
      return;
    }
    setOpened(true);
  }

  function errorProps(field: keyof RideData) {
    return { 'aria-invalid': Boolean(errors[field]), 'aria-describedby': errors[field] ? `${fieldId(field)}-error` : undefined };
  }

  return <form ref={form} id="anfrage" className="ride-form ride-form-full" noValidate onSubmit={submit}>
    <ol className="form-progress" aria-label="Schritte der Fahrtanfrage">
      {['Fahrt', 'Details', 'Prüfen'].map((label, index) => <li key={label} className={step === index + 1 ? 'is-current' : step > index + 1 ? 'is-complete' : ''}
        aria-current={step === index + 1 ? 'step' : undefined}>
        <span className="step-number" aria-hidden="true">{step > index + 1 ? <Check size={15} /> : index + 1}</span>{label}
      </li>)}
    </ol>
    <div className="form-step">
      <p className="eyebrow">Schritt {step} von 3</p>
      <h2 ref={heading} tabIndex={-1} className="form-title">{currentTitle}</h2>
      {step < 3 && <p className="form-note">Felder mit * sind erforderlich.</p>}
      {staleError && <p className="form-error" role="alert">{staleError}</p>}
      {Object.keys(errors).some(key => Boolean(errors[key as keyof RideData])) && <p className="form-error" role="alert">Bitte prüfen Sie die markierten Felder.</p>}

      {step === 1 && <>
        {mode === 'medical' && <div className="field">
          <label htmlFor={fieldId('medicalType')}>Art der Fahrt *</label>
          <select id={fieldId('medicalType')} value={data.medicalType} onChange={event => change('medicalType', event.target.value)} required {...errorProps('medicalType')}>
            <option value="">Bitte auswählen</option>
            <option>Arzt- oder Behandlungstermin</option>
            <option>Klinik – Aufnahme oder Entlassung</option>
            <option>Regelmäßige Fahrten</option>
            <option>Andere Fahrt – bitte persönlich abstimmen</option>
          </select>
          <FieldError id={fieldId('medicalType')} error={errors.medicalType} />
          <p className="form-note">Bitte nennen Sie keine Diagnose und senden Sie keine medizinischen Unterlagen über dieses Formular.</p>
        </div>}

        {mode === 'airport' && <div className="field-grid">
          <div className="field">
            <label htmlFor={fieldId('airport')}>Flughafen *</label>
            <select id={fieldId('airport')} value={data.airport} onChange={event => changeAirport(event.target.value)} required {...errorProps('airport')}>
              <option value="">Bitte auswählen</option>
              {airports.map(airport => <option key={airport}>{airport}</option>)}
            </select>
            <FieldError id={fieldId('airport')} error={errors.airport} />
          </div>
          <div className="field">
            <label htmlFor={fieldId('direction')}>Richtung *</label>
            <select id={fieldId('direction')} value={data.direction} onChange={event => changeDirection(event.target.value as 'to' | 'from')}>
              <option value="to">Zum Flughafen</option><option value="from">Vom Flughafen</option>
            </select>
          </div>
        </div>}

        {mapsConfigured && <div className="maps-consent">
          <label className="checkbox-label">
            <input type="checkbox" checked={googleEnabled} onChange={event => setGoogleEnabled(event.target.checked)} />
            <span>Google-Adressvorschläge für diese Anfrage einschalten</span>
          </label>
          <p className="form-note">Optional: Mit dem Einschalten stimmen Sie zu, dass Ihre eingegebenen Adressen und Ihre IP-Adresse an Google übermittelt werden. Die Eingabe von Hand funktioniert immer. Das Ausschalten beendet weitere Vorschläge; bereits übermittelte Daten bleiben bei Google. <a href="/datenschutz/#google">Datenschutzhinweise</a></p>
        </div>}

        <AddressInput id={fieldId('pickup')} label="Abholort" value={data.pickup} onChange={value => change('pickup', value)}
          error={errors.pickup} placeholder="Straße, Hausnummer und Ort" suggestionsEnabled={googleEnabled} />
        <AddressInput id={fieldId('destination')} label="Zielort" value={data.destination} onChange={value => change('destination', value)}
          error={errors.destination} placeholder="Adresse, Bahnhof, Praxis oder Flughafen" suggestionsEnabled={googleEnabled} />
        <p className="form-note">Bitte geben Sie auch den Ort an, damit wir die richtige Adresse finden.</p>
      </>}

      {step === 2 && <>
        <div className="field-grid">
          <div className="field">
            <label htmlFor={fieldId('date')}>Datum *</label>
            <input id={fieldId('date')} type="date" value={data.date} min={today || undefined} onChange={event => change('date', event.target.value)} required {...errorProps('date')} />
            <FieldError id={fieldId('date')} error={errors.date} />
          </div>
          <div className="field">
            <label htmlFor={fieldId('time')}>Abholzeit *</label>
            <input id={fieldId('time')} type="time" value={data.time} onChange={event => change('time', event.target.value)} required {...errorProps('time')} />
            <FieldError id={fieldId('time')} error={errors.time} />
          </div>
        </div>
        <p className="form-note">Alle Zeiten sind Ortszeit in Ratzeburg. Sie brauchen sofort ein Taxi? <a href={`tel:${company.phone}`}>Bitte rufen Sie an.</a></p>
        <div className="field-grid">
          <div className="field">
            <label htmlFor={fieldId('passengers')}>Fahrgäste *</label>
            <select id={fieldId('passengers')} value={data.passengers} onChange={event => change('passengers', event.target.value)} required {...errorProps('passengers')}>
              {Array.from({ length: 9 }, (_, i) => i + 1).map(count => <option key={count} value={count}>{count === 1 ? '1 Person' : count === 9 ? '9 Personen – Gruppenanfrage' : `${count} Personen`}</option>)}
            </select>
            <FieldError id={fieldId('passengers')} error={errors.passengers} />
          </div>
          <div className="field">
            <label htmlFor={fieldId('luggage')}>Gepäckstücke <span>(optional)</span></label>
            <input id={fieldId('luggage')} type="number" min="0" max="20" inputMode="numeric" value={data.luggage} placeholder="z. B. 2" onChange={event => change('luggage', event.target.value)} {...errorProps('luggage')} />
            <FieldError id={fieldId('luggage')} error={errors.luggage} />
          </div>
        </div>
        {Number(data.passengers) > 4 && <p className="form-info">{data.passengers === '9' ? '9 Fahrgäste: Wir stimmen die Aufteilung auf passende Fahrzeuge mit Ihnen ab.' : 'Für Ihre Gruppe fragen wir ein passendes Großraumtaxi an.'} Unsere 9-Sitzer bieten bis zu 8 Fahrgastplätze plus Fahrer. Verfügbarkeit und Gepäck stimmen wir persönlich ab.</p>}

        {mode === 'airport' && <div className="field">
          <label htmlFor={fieldId('flightNumber')}>Flugnummer <span>(optional)</span></label>
          <input id={fieldId('flightNumber')} value={data.flightNumber} maxLength={20} placeholder="z. B. LH 123" onChange={event => change('flightNumber', event.target.value)} {...errorProps('flightNumber')} />
          <FieldError id={fieldId('flightNumber')} error={errors.flightNumber} />
          <p className="form-note">Die Flugnummer hilft bei der Abstimmung. Bitte melden Sie Änderungen Ihrer Abholzeit direkt bei uns.</p>
        </div>}

        <div className="return-option">
          <label className="checkbox-label" htmlFor={fieldId('returnRequested')}>
            <input id={fieldId('returnRequested')} type="checkbox" checked={data.returnRequested} onChange={event => change('returnRequested', event.target.checked)} />
            <span>Ich möchte auch eine Rückfahrt anfragen.</span>
          </label>
          {data.returnRequested && <div className="return-details">
            <p className="form-note">Rückfahrtzeit noch unklar? Lassen Sie Datum und Uhrzeit frei. Wir stimmen sie persönlich mit Ihnen ab.</p>
            <div className="field-grid">
              <div className="field">
                <label htmlFor={fieldId('returnDate')}>Rückfahrtdatum <span>(optional)</span></label>
                <input id={fieldId('returnDate')} type="date" min={data.date || today || undefined} value={data.returnDate} onChange={event => change('returnDate', event.target.value)} {...errorProps('returnDate')} />
                <FieldError id={fieldId('returnDate')} error={errors.returnDate} />
              </div>
              <div className="field">
                <label htmlFor={fieldId('returnTime')}>Rückfahrtzeit <span>(optional)</span></label>
                <input id={fieldId('returnTime')} type="time" value={data.returnTime} onChange={event => change('returnTime', event.target.value)} {...errorProps('returnTime')} />
                <FieldError id={fieldId('returnTime')} error={errors.returnTime} />
              </div>
            </div>
            <div className="field">
              <label htmlFor={fieldId('returnDetails')}>Hinweise zur Rückfahrt <span>(optional)</span></label>
              <input id={fieldId('returnDetails')} value={data.returnDetails} maxLength={300} placeholder="z. B. anderer Abholort" onChange={event => change('returnDetails', event.target.value)} {...errorProps('returnDetails')} />
              <FieldError id={fieldId('returnDetails')} error={errors.returnDetails} />
            </div>
          </div>}
        </div>

        <div className="field">
          <label htmlFor={fieldId('name')}>Ihr Name <span>(optional)</span></label>
          <input id={fieldId('name')} autoComplete="name" value={data.name} maxLength={80} onChange={event => change('name', event.target.value)} {...errorProps('name')} />
          <FieldError id={fieldId('name')} error={errors.name} />
        </div>
        <div className="field">
          <label htmlFor={fieldId('wishes')}>Besondere Wünsche <span>(optional)</span></label>
          <textarea id={fieldId('wishes')} rows={3} value={data.wishes} maxLength={500}
            placeholder="Zum Beispiel Kindersitz oder Platz für einen Rollator. Bitte keine Diagnosen oder medizinischen Unterlagen."
            onChange={event => change('wishes', event.target.value)} {...errorProps('wishes')} />
          <FieldError id={fieldId('wishes')} error={errors.wishes} />
        </div>
      </>}

      {step === 3 && <>
        <p>Bitte prüfen Sie Ihre Angaben. Danach können Sie die vorbereitete Nachricht in WhatsApp öffnen und dort absenden.</p>
        <dl className="ride-summary">
          {rideSummary(data, mode).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        {mode === 'medical' && <p className="form-info">Eine Kostenübernahme durch die Krankenkasse ist damit nicht bestätigt. Verordnung und gegebenenfalls Genehmigung klären Sie bitte vor der Fahrt.</p>}
        <p className="form-note">Mit „In WhatsApp öffnen“ werden diese Angaben an WhatsApp übergeben. Alternativ können Sie uns anrufen. <a href="/datenschutz/#whatsapp">Mehr zum Datenschutz</a>.</p>
        <a className="button button-whatsapp" href={whatsappUrl(buildRideMessage(data, mode))} target="_blank" rel="noopener noreferrer" onClick={verifyBeforeWhatsApp}>
          <MessageCircle size={20} aria-hidden="true" /> In WhatsApp öffnen
        </a>
        <p className="form-note"><strong>Dies ist eine Anfrage.</strong> Ihre Fahrt ist erst nach unserer persönlichen Bestätigung vereinbart.</p>
        {opened && <p className="form-info" role="status">Der WhatsApp-Link wurde geöffnet. Bitte senden Sie die Nachricht dort ab und warten Sie auf unsere Bestätigung. Falls WhatsApp nicht startet, rufen Sie uns bitte an.</p>}
      </>}

      <div className="form-actions">
        {step > 1 && <button type="button" className="button button-secondary" onClick={() => goToStep(step === 3 ? 2 : 1)}><ArrowLeft size={18} aria-hidden="true" /> Zurück</button>}
        {step < 3 && <button type="submit" className="button button-primary">{step === 1 ? 'Weiter zu den Details' : 'Anfrage prüfen'} <ArrowRight size={18} aria-hidden="true" /></button>}
      </div>
      <div className="form-phone">
        <span>Lieber persönlich?</span>
        <a className="button button-secondary" href={`tel:${company.phone}`}><Phone size={18} aria-hidden="true" /> {company.phoneDisplay}</a>
      </div>
    </div>
  </form>;
}

export function RideForm({ mode = 'taxi', compact = false }: Props) {
  return compact ? <CompactRideForm /> : <FullRideForm mode={mode} />;
}
