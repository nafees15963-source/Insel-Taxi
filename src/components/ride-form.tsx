'use client';
import { useId, useRef, useState } from 'react';
import { MessageCircle, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { company } from '@/config/company';
import {
  type Booking,
  type Errors,
  type RequestChannel,
  type RideMode,
  type RideType,
  bookingMessage,
  emptyBooking,
  initialRideType,
  localDate,
  rideTypes,
  validateBooking,
  whatsappLink,
  emailLink,
} from '@/lib/booking';
import { AddressField, MapsOption } from './maps';

export function RideForm({
  mode = 'ride',
  compact = false,
  initialType,
}: {
  mode?: RideMode;
  compact?: boolean;
  initialType?: RideType;
}) {
  const prefix = useId();
  const form = useRef<HTMLFormElement>(null);
  const [booking, setBooking] = useState<Booking>({
    ...emptyBooking,
    rideType: initialType ?? initialRideType(mode),
  });
  const [errors, setErrors] = useState<Errors>({});
  const [channel, setChannel] = useState<RequestChannel>('whatsapp');
  const [ready, setReady] = useState(false);
  const id = (key: string) => `${prefix}-${key}`;

  function update(key: keyof Booking, value: string) {
    setBooking((old) => ({ ...old, [key]: value }));
    // Date and time are validated together, so editing either clears that shared error.
    setErrors((old) => ({
      ...old,
      [key]: undefined,
      ...(key === 'date' || key === 'time' ? { date: undefined, time: undefined } : {}),
    }));
    setReady(false);
  }
  const message = bookingMessage(booking, mode, channel);
  const href = channel === 'email' ? emailLink(message) : whatsappLink(message);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateBooking(booking, channel);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() =>
        form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      setReady(false);
      return;
    }
    setReady(true);
    // Keep the form and copy fallback available when no external app is configured.
    window.open(href, '_blank', 'noopener,noreferrer');
  }
  function error(key: keyof Booking) {
    return errors[key] ? (
      <p id={id(`${key}-error`)} className="field-error">
        {errors[key]}
      </p>
    ) : null;
  }
  function field(key: 'name' | 'date' | 'time' | 'phone', label: string, type = 'text') {
    return (
      <div className="field">
        <label htmlFor={id(key)}>
          {label} <span aria-hidden="true">*</span>
        </label>
        <input
          id={id(key)}
          name={key}
          type={type}
          value={booking[key]}
          onChange={(event) => update(key, event.target.value)}
          autoComplete={key === 'name' ? 'name' : key === 'phone' ? 'tel' : undefined}
          min={key === 'date' ? localDate() : undefined}
          max={key === 'date' ? '9999-12-31' : undefined}
          maxLength={key === 'name' ? 100 : key === 'phone' ? 40 : undefined}
          required
          aria-invalid={!!errors[key]}
          aria-describedby={
            errors[key] ? id(`${key}-error`) : key === 'phone' ? id('phone-note') : undefined
          }
        />
        {error(key)}
      </div>
    );
  }
  return (
    <form
      ref={form}
      className={`ride-form ${compact ? 'compact-form' : ''}`}
      onSubmit={submit}
      noValidate
    >
      <p className="field-note">Alle Felder mit * sind Pflichtfelder.</p>
      <div className="form-grid">
        {field('name', 'Name')}
        <div className="field">
          <label htmlFor={id('rideType')}>
            Fahrttyp <span aria-hidden="true">*</span>
          </label>
          <select
            id={id('rideType')}
            name="rideType"
            value={booking.rideType}
            onChange={(event) => update('rideType', event.target.value)}
            required
            aria-invalid={!!errors.rideType}
            aria-describedby={errors.rideType ? id('rideType-error') : undefined}
          >
            {rideTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          {error('rideType')}
        </div>
      </div>
      <div className="form-grid">
        <AddressField
          id={id('pickup')}
          label="Start"
          value={booking.pickup}
          onChange={(value) => update('pickup', value)}
          error={errors.pickup}
        />
        <AddressField
          id={id('destination')}
          label="Ziel"
          value={booking.destination}
          onChange={(value) => update('destination', value)}
          error={errors.destination}
        />
      </div>
      <MapsOption />
      <div className="form-grid">
        {field('date', 'Datum', 'date')}
        {field('time', 'Uhrzeit', 'time')}
      </div>
      <p className="field-note">Datum und Uhrzeit gelten für Deutschland.</p>
      {booking.rideType !== 'Kurierfahrt' && (
        <div className="field">
          <label htmlFor={id('passengers')}>
            Personen <span aria-hidden="true">*</span>
          </label>
          <select
            id={id('passengers')}
            name="passengers"
            value={booking.passengers}
            onChange={(event) => update('passengers', event.target.value)}
            required
            aria-invalid={!!errors.passengers}
            aria-describedby={errors.passengers ? id('passengers-error') : undefined}
          >
            {Array.from({ length: 8 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? 'Person' : 'Personen'}
              </option>
            ))}
          </select>
          {error('passengers')}
        </div>
      )}
      <div className="field">
        <label htmlFor={id('wishes')}>
          Anmerkung <span className="optional">optional</span>
        </label>
        <textarea
          id={id('wishes')}
          name="wishes"
          value={booking.wishes}
          onChange={(event) => update('wishes', event.target.value)}
          rows={3}
          maxLength={800}
          placeholder={
            booking.rideType === 'Kurierfahrt'
              ? 'Art, Anzahl, ungefähre Maße und Gewicht der Sendung'
              : 'Zum Beispiel Gepäck, Kindersitz oder eine Rückfahrt'
          }
          aria-invalid={!!errors.wishes}
          aria-describedby={errors.wishes ? id('wishes-error') : undefined}
        />
        {error('wishes')}
        {booking.rideType === 'Krankenfahrt' && (
          <p className="field-note">
            Bitte keine Diagnosen angeben. Eine Kostenübernahme klären Sie vorab mit Ihrer
            Krankenkasse.
          </p>
        )}
      </div>
      <fieldset className="request-channel">
        <legend>Anfrage senden über</legend>
        {(['whatsapp', 'email'] as const).map((value) => (
          <label key={value}>
            <input
              type="radio"
              name={id('channel')}
              value={value}
              checked={channel === value}
              onChange={() => {
                setChannel(value);
                setReady(false);
                setErrors((old) => ({ ...old, phone: undefined }));
              }}
            />
            {value === 'whatsapp' ? (
              <MessageCircle size={18} aria-hidden="true" />
            ) : (
              <Mail size={18} aria-hidden="true" />
            )}
            <span>{value === 'whatsapp' ? 'WhatsApp' : 'E-Mail'}</span>
          </label>
        ))}
      </fieldset>
      {channel === 'email' && (
        <div>
          {field('phone', 'Telefonnummer', 'tel')}
          <p id={id('phone-note')} className="field-note">
            Für Rückfragen zu Ihrer E-Mail-Anfrage.
          </p>
        </div>
      )}
      {Object.values(errors).some(Boolean) && (
        <p role="alert" className="form-error">
          Bitte prüfen Sie die markierten Angaben.
        </p>
      )}
      <button className="button button-primary submit-button" type="submit">
        {channel === 'whatsapp' ? (
          <MessageCircle size={20} aria-hidden="true" />
        ) : (
          <Mail size={20} aria-hidden="true" />
        )}
        {channel === 'whatsapp' ? 'Per WhatsApp anfragen' : 'Per E-Mail anfragen'}
        <ArrowRight size={18} className="button-end" aria-hidden="true" />
      </button>
      {ready && (
        <div className="notice" role="status">
          <p>
            Ihre Nachricht ist vorbereitet. Bitte senden Sie sie in{' '}
            {channel === 'email' ? 'Ihrem E-Mail-Programm' : 'WhatsApp'} selbst ab. Die Fahrt ist
            erst nach unserer Bestätigung gebucht.
          </p>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {channel === 'email' ? 'E-Mail-Entwurf erneut öffnen' : 'WhatsApp erneut öffnen'}
          </a>
          {channel === 'email' && (
            <div className="email-draft">
              <p>Empfänger: {company.email}</p>
              <label htmlFor={id('email-draft')}>Nachricht zum Kopieren</label>
              <textarea id={id('email-draft')} readOnly rows={8} value={message} />
            </div>
          )}
        </div>
      )}
      <p className="form-disclaimer">
        <span>
          Unverbindliche Anfrage. Buchung erst nach Bestätigung.{' '}
          <Link href="/datenschutz">Datenschutzhinweise</Link>
        </span>
      </p>
    </form>
  );
}
