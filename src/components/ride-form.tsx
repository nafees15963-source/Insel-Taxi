'use client';
import { useId, useRef, useState } from 'react';
import {
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  Phone,
  Users,
  CalendarDays,
  Clock3,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { company, airports } from '@/config/company';
import {
  Booking,
  bookingMessage,
  emptyBooking,
  Errors,
  formatDate,
  localDate,
  RideMode,
  validateBooking,
  whatsappLink,
} from '@/lib/booking';
import { AddressField, MapsOption } from './maps';
import Link from 'next/link';
const medicalSteps = [
  'Art der Fahrt',
  'Ihre Strecke',
  'Datum & Uhrzeit',
  'Rückfahrt',
  'Zusammenfassung',
  'Anfrage senden',
];
export function RideForm({
  mode = 'ride',
  compact = false,
}: {
  mode?: RideMode;
  compact?: boolean;
}) {
  const prefix = useId();
  const [b, setB] = useState<Booking>({
    ...emptyBooking,
    destination: mode === 'airport' ? 'Flughafen Hamburg (HAM)' : '',
  });
  const [errors, setErrors] = useState<Errors>({}),
    [step, setStep] = useState(0),
    [extra, setExtra] = useState(false),
    [ready, setReady] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  function update<K extends keyof Booking>(k: K, v: Booking[K]) {
    setB((old) => ({ ...old, [k]: v }));
    setErrors((old) => ({ ...old, [k]: undefined }));
    setReady(false);
  }
  const id = (key: string) => `${prefix}-${key}`;
  function focusFirst(e: Errors) {
    setTimeout(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
    setErrors(e);
  }
  function changeStep(next: number) {
    setStep(next);
    setErrors({});
    setTimeout(() => stepHeading.current?.focus(), 0);
  }
  function next() {
    const all = validateBooking(b, mode);
    const keys: (keyof Booking)[] =
      step === 1
        ? ['pickup', 'destination']
        : step === 2
          ? ['date', 'time', 'passengers']
          : step === 3
            ? ['returnDate', 'returnTime']
            : [];
    const local: Errors = {};
    keys.forEach((k) => {
      if (all[k]) local[k] = all[k];
    });
    if (Object.keys(local).length) {
      focusFirst(local);
      return;
    }
    changeStep(step + 1);
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const all = validateBooking(b, mode);
    if (Object.keys(all).length) {
      if (mode === 'medical') {
        changeStep(all.pickup || all.destination ? 1 : all.date || all.time ? 2 : 3);
      }
      focusFirst(all);
      return;
    }
    setReady(true);
    window.open(whatsappLink(bookingMessage(b, mode)), '_blank', 'noopener,noreferrer');
  }
  function field(
    key: keyof Booking,
    label: string,
    type = 'text',
    optional = false,
    icon?: React.ReactNode,
  ) {
    return (
      <div className="field">
        <label htmlFor={id(key)}>
          {label}
          {optional ? (
            <span className="optional"> optional</span>
          ) : (
            <span aria-hidden="true"> *</span>
          )}
        </label>
        <div className={icon ? 'input-with-icon' : ''}>
          {icon}
          <input
            id={id(key)}
            name={key}
            type={type}
            value={b[key]}
            onChange={(e) => update(key, e.target.value)}
            min={type === 'date' ? localDate() : type === 'number' ? 0 : undefined}
            max={type === 'number' ? 20 : undefined}
            maxLength={type === 'text' ? 100 : undefined}
            required={!optional}
            aria-invalid={!!errors[key]}
            aria-describedby={errors[key] ? id(`${key}-error`) : undefined}
          />
        </div>
        {errors[key] && (
          <p id={id(`${key}-error`)} className="field-error">
            {errors[key]}
          </p>
        )}
      </div>
    );
  }
  const addresses = (
    <>
      <AddressField
        id={id('pickup')}
        label="Wo dürfen wir Sie abholen?"
        value={b.pickup}
        onChange={(v) => update('pickup', v)}
        error={errors.pickup}
        placeholder="Abholadresse eingeben"
      />
      <AddressField
        id={id('destination')}
        label="Wohin möchten Sie fahren?"
        value={b.destination}
        onChange={(v) => update('destination', v)}
        error={errors.destination}
        placeholder="Zieladresse eingeben"
      />
    </>
  );
  const schedule = (
    <div className="form-grid">
      {field('date', 'Datum', 'date', false, <CalendarDays size={17} aria-hidden="true" />)}
      {field('time', 'Uhrzeit', 'time', false, <Clock3 size={17} aria-hidden="true" />)}
    </div>
  );
  const passengers = (
    <div className="field">
      <label htmlFor={id('passengers')}>
        Fahrgäste <span aria-hidden="true">*</span>
      </label>
      <div className="input-with-icon">
        <Users size={17} aria-hidden="true" />
        <select
          id={id('passengers')}
          value={b.passengers}
          onChange={(e) => update('passengers', e.target.value)}
          aria-invalid={!!errors.passengers}
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? 'Person' : 'Personen'}
            </option>
          ))}
        </select>
      </div>
      {errors.passengers && <p className="field-error">{errors.passengers}</p>}
    </div>
  );
  const returns = (
    <>
      <div className="field">
        <label htmlFor={id('returnTrip')}>Möchten Sie auch eine Rückfahrt anfragen?</label>
        <select
          id={id('returnTrip')}
          value={b.returnTrip}
          onChange={(e) => update('returnTrip', e.target.value)}
        >
          <option>Nein</option>
          <option>Ja</option>
        </select>
      </div>
      {b.returnTrip === 'Ja' && (
        <>
          <div className="form-grid">
            {field('returnDate', 'Datum der Rückfahrt', 'date')}
            {field('returnTime', 'Uhrzeit der Rückfahrt', 'time', true)}
          </div>
          <p className="field-note">
            Ist die Uhrzeit noch offen? Wir stimmen sie persönlich mit Ihnen ab.
          </p>
        </>
      )}
    </>
  );
  const extras = (
    <>
      <div className="form-grid">
        {field('luggage', 'Gepäckstücke', 'number', true)}
        {field('name', 'Ihr Name', 'text', true)}
      </div>
      <div className="field">
        <label htmlFor={id('wishes')}>
          Besondere Wünsche <span className="optional">optional</span>
        </label>
        <textarea
          id={id('wishes')}
          value={b.wishes}
          onChange={(e) => update('wishes', e.target.value)}
          maxLength={800}
          rows={3}
          placeholder={
            mode === 'medical'
              ? 'Zum Beispiel: Rollator oder Hilfe beim Einsteigen. Bitte keine Diagnosen angeben.'
              : 'Zum Beispiel: Kindersitz oder Rollator'
          }
        />
      </div>
    </>
  );
  const summary = (
    <div className="booking-summary">
      <h3>Ihre Fahrt auf einen Blick</h3>
      <dl>
        {Object.entries({
          Abholort: b.pickup,
          Zielort: b.destination,
          Datum: formatDate(b.date),
          Uhrzeit: b.time,
          Fahrgäste: b.passengers,
          ...(mode === 'medical' ? { 'Art der Fahrt': b.rideType } : {}),
          ...(b.returnTrip === 'Ja'
            ? {
                Rückfahrt: `${formatDate(b.returnDate)} ${b.returnTime || 'Uhrzeit nach Absprache'}`,
              }
            : {}),
        }).map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
  return (
    <form
      ref={form}
      className={`ride-form ${compact ? 'compact-form' : ''}`}
      onSubmit={submit}
      noValidate
    >
      {mode === 'medical' && (
        <>
          <ol className="step-indicator" aria-label="Fortschritt">
            {medicalSteps.map((s, i) => (
              <li
                key={s}
                aria-current={step === i ? 'step' : undefined}
                className={step >= i ? 'reached' : ''}
              >
                <span>{step > i ? <Check size={14} /> : i + 1}</span>
                <small>{s}</small>
              </li>
            ))}
          </ol>
          <p className="step-count">Schritt {step + 1} von 6</p>
          <h3 className="step-title" tabIndex={-1} ref={stepHeading}>
            {medicalSteps[step]}
          </h3>
        </>
      )}
      {mode === 'medical' && step === 0 && (
        <>
          <p>
            Wählen Sie, was am besten zu Ihrer Fahrt passt. Medizinische Angaben benötigen wir
            nicht.
          </p>
          <div className="radio-cards">
            {[
              'Arzt- oder Kliniktermin',
              'Regelmäßige Behandlungsfahrt',
              'Reha oder Entlassung',
              'Andere Fahrt / Rückfrage',
            ].map((v) => (
              <label key={v}>
                <input
                  type="radio"
                  name={id('rideType')}
                  value={v}
                  checked={b.rideType === v}
                  onChange={() => update('rideType', v)}
                />
                <span>{v}</span>
              </label>
            ))}
          </div>
        </>
      )}
      {mode === 'airport' && (
        <>
          <div className="form-grid">
            <div className="field">
              <label htmlFor={id('airport')}>Flughafen *</label>
              <select
                id={id('airport')}
                value={b.airport}
                onChange={(e) => {
                  update('airport', e.target.value);
                  update(
                    b.direction === 'Zum Flughafen' ? 'destination' : 'pickup',
                    e.target.value,
                  );
                }}
              >
                {airports.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor={id('direction')}>Richtung *</label>
              <select
                id={id('direction')}
                value={b.direction}
                onChange={(e) => {
                  const direction = e.target.value;
                  setB((old) => ({
                    ...old,
                    direction,
                    pickup: direction === 'Vom Flughafen' ? old.airport : '',
                    destination: direction === 'Zum Flughafen' ? old.airport : '',
                  }));
                  setReady(false);
                }}
              >
                <option>Zum Flughafen</option>
                <option>Vom Flughafen</option>
              </select>
            </div>
          </div>
        </>
      )}
      {(mode !== 'medical' || step === 1) && (
        <>
          <MapsOption />
          {addresses}
        </>
      )}
      {(mode !== 'medical' || step === 2) && (
        <>
          {schedule}
          {compact ? (
            <button
              type="button"
              className="form-expand"
              aria-expanded={extra}
              onClick={() => setExtra(!extra)}
            >
              <Users size={15} /> {b.passengers} {b.passengers === '1' ? 'Person' : 'Personen'} ·
              Gepäck & weitere Angaben
              <ChevronDown size={15} />
            </button>
          ) : (
            passengers
          )}
        </>
      )}
      {mode === 'medical' && step === 3 && returns}
      {mode === 'medical' && step === 4 && (
        <>
          {summary}
          {extras}
        </>
      )}
      {mode === 'medical' && step === 5 && (
        <>
          {summary}
          <p className="notice">
            Wir prüfen Ihre Anfrage persönlich. Eine Kostenübernahme muss mit Ihrer Krankenkasse
            geklärt sein.
          </p>
        </>
      )}
      {mode === 'ride' && (!compact || extra) && (
        <>
          {compact && passengers}
          {extras}
        </>
      )}
      {mode === 'airport' && (
        <>
          <div className="form-grid">
            {field('luggage', 'Gepäckstücke', 'number', true)}
            {field('flight', 'Flugnummer', 'text', true)}
          </div>
          {returns}
          {field('name', 'Ihr Name', 'text', true)}
          <div className="field">
            <label htmlFor={id('wishes')}>
              Besondere Wünsche <span className="optional">optional</span>
            </label>
            <textarea
              id={id('wishes')}
              value={b.wishes}
              onChange={(e) => update('wishes', e.target.value)}
              maxLength={800}
              rows={3}
            />
          </div>
        </>
      )}
      {Object.values(errors).filter(Boolean).length > 0 && (
        <p role="alert" className="form-error">
          Bitte prüfen Sie die markierten Angaben.
        </p>
      )}
      {mode === 'medical' && step < 5 ? (
        <div className="step-buttons">
          {step > 0 && (
            <button
              type="button"
              className="button button-outline"
              onClick={() => changeStep(step - 1)}
            >
              <ArrowLeft size={17} />
              Zurück
            </button>
          )}
          <button type="button" className="button button-primary" onClick={next}>
            Weiter
            <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <>
          <button className="button button-primary submit-button" type="submit">
            <MessageCircle size={20} />
            Per WhatsApp anfragen
            <ArrowRight size={18} className="button-end" />
          </button>
          {ready && (
            <p className="notice" role="status">
              Ihre Nachricht wurde vorbereitet. Bitte senden Sie sie in WhatsApp ab. Ihre Fahrt ist
              noch nicht bestätigt.{' '}
              <a
                href={whatsappLink(bookingMessage(b, mode))}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp erneut öffnen
              </a>
            </p>
          )}
          <p className="form-disclaimer">
            <ShieldCheck size={14} aria-hidden="true" />
            <span>
              Unverbindliche Anfrage. Buchung erst nach Bestätigung.
              <br />
              {!compact && <>Ihre Daten bleiben bis zum Öffnen von WhatsApp im Browser. </>}
              <Link href="/datenschutz">Datenschutzhinweise</Link>
            </span>
          </p>
          {!compact && (
            <a className="button button-outline submit-button" href={`tel:${company.phone}`}>
              <Phone size={18} />
              Lieber telefonisch: {company.phoneDisplay}
            </a>
          )}
          {mode === 'medical' && (
            <button type="button" className="text-button" onClick={() => changeStep(4)}>
              Angaben bearbeiten
            </button>
          )}
        </>
      )}
    </form>
  );
}
