'use client';
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import { MapPin, X, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MapsContext = createContext({
  enabled: false,
  configured: !!key,
  enable: () => {},
  loading: false,
});
let mapsPromise: Promise<void> | null = null;
function loadMaps() {
  if (!mapsPromise)
    mapsPromise = new Promise<void>((resolve, reject) => {
      if (
        typeof window.google !== 'undefined' &&
        typeof window.google.maps?.importLibrary === 'function'
      ) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key || '')}&loading=async&libraries=places&v=weekly&language=de&region=DE`;
      script.async = true;
      const timeout = setTimeout(() => {
        mapsPromise = null;
        script.remove();
        reject(new Error('Zeitüberschreitung'));
      }, 12000);
      script.onload = () => {
        clearTimeout(timeout);
        if (
          typeof window.google !== 'undefined' &&
          typeof window.google.maps?.importLibrary === 'function'
        )
          resolve();
        else {
          mapsPromise = null;
          reject(new Error('Google nicht verfügbar'));
        }
      };
      script.onerror = () => {
        clearTimeout(timeout);
        script.remove();
        mapsPromise = null;
        reject(new Error('Google nicht erreichbar'));
      };
      document.head.appendChild(script);
    });
  return mapsPromise;
}
export function MapsProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false),
    [loading, setLoading] = useState(false),
    [dialog, setDialog] = useState(false),
    [error, setError] = useState('');
  const modal = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const enable = useCallback(() => setDialog(true), []);
  useEffect(() => {
    const show = () => setDialog(true);
    window.addEventListener('maps-settings', show);
    return () => window.removeEventListener('maps-settings', show);
  }, []);
  useEffect(() => {
    if (dialog) {
      previousFocus.current = document.activeElement as HTMLElement;
      modal.current?.showModal();
    } else {
      modal.current?.close();
      previousFocus.current?.focus();
    }
  }, [dialog]);
  async function consent() {
    setLoading(true);
    setError('');
    try {
      await loadMaps();
      setEnabled(true);
      setDialog(false);
    } catch {
      setError(
        'Adressvorschläge sind gerade nicht verfügbar. Sie können alle Adressen weiterhin selbst eingeben.',
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <MapsContext.Provider value={{ enabled, configured: !!key, enable, loading }}>
      {children}
      <dialog
        ref={modal}
        className="consent-dialog"
        onCancel={() => setDialog(false)}
        aria-labelledby="maps-title"
      >
        <button
          className="dialog-close"
          onClick={() => setDialog(false)}
          aria-label="Datenschutzeinstellungen schließen"
        >
          <X />
        </button>
        <ShieldCheck size={32} />
        <h2 id="maps-title">Google-Dienste freigeben?</h2>
        <p>
          Adressvorschläge und Routenberechnung sind freiwillig. Bei der Nutzung werden Ihre
          IP-Adresse und eingegebene Adressen an Google übermittelt. Dabei kann eine Verarbeitung
          außerhalb der EU stattfinden.
        </p>
        <p>
          Ohne Freigabe können Sie Ihre Fahrt genauso per WhatsApp, E-Mail oder Telefon anfragen.
          Die Freigabe gilt nur für diesen Seitenbesuch.
        </p>
        <Link href="/datenschutz" onClick={() => setDialog(false)}>
          Mehr zum Datenschutz
        </Link>
        {error && (
          <p role="alert" className="field-error">
            {error}
          </p>
        )}
        <div className="dialog-actions">
          {enabled ? (
            <button
              className="button button-outline"
              onClick={() => {
                setEnabled(false);
                setDialog(false);
                window.location.reload();
              }}
            >
              Freigabe widerrufen & neu laden
            </button>
          ) : key ? (
            <button className="button button-primary" onClick={consent} disabled={loading}>
              {loading ? 'Wird geladen …' : 'Google-Dienste erlauben'}
            </button>
          ) : (
            <p>
              Google-Dienste sind derzeit nicht eingerichtet. Es werden keine Google-Inhalte
              geladen.
            </p>
          )}
          <button className="button button-outline" onClick={() => setDialog(false)}>
            Ohne Google fortfahren
          </button>
        </div>
      </dialog>
    </MapsContext.Provider>
  );
}
export function useMaps() {
  return useContext(MapsContext);
}
export function MapsOption() {
  const m = useMaps();
  return m.configured && !m.enabled ? (
    <p className="maps-option">
      <ShieldCheck size={15} />
      <button type="button" onClick={m.enable}>
        Adressvorschläge freiwillig aktivieren
      </button>
    </p>
  ) : m.enabled ? (
    <p className="maps-option">
      <ShieldCheck size={15} />
      Google-Adressvorschläge aktiv ·{' '}
      <button type="button" onClick={m.enable}>
        Einstellungen
      </button>
    </p>
  ) : null;
}
export function AddressField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder = 'Straße, Hausnummer, Ort',
  required = true,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const m = useMaps();
  const listId = useId();
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompleteSuggestion[]>([]),
    [suggestionQuery, setSuggestionQuery] = useState(''),
    [active, setActive] = useState(-1),
    [focused, setFocused] = useState(false),
    [failed, setFailed] = useState(false);
  const session = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const seq = useRef(0);
  const skip = useRef(false);
  useEffect(() => {
    if (!m.enabled || !focused || value.trim().length < 3) return;
    if (skip.current) {
      skip.current = false;
      return;
    }
    const current = ++seq.current;
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        await google.maps.importLibrary('places');
        session.current ??= new google.maps.places.AutocompleteSessionToken();
        const r = await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: value,

          language: 'de',
          sessionToken: session.current,
        });
        if (!cancelled && current === seq.current) {
          setSuggestionQuery(value);
          setSuggestions(r.suggestions.slice(0, 5));
          setActive(-1);
          setFailed(false);
        }
      } catch {
        if (!cancelled && current === seq.current) {
          setFailed(true);
          setSuggestions([]);
        }
      }
    }, 350);
    return () => {
      clearTimeout(timer);
      cancelled = true;
    };
  }, [value, m.enabled, focused]);
  async function select(s: google.maps.places.AutocompleteSuggestion) {
    const p = s.placePrediction;
    if (!p) return;
    skip.current = true;
    seq.current++;
    setSuggestions([]);
    onChange(p.text.toString());
    try {
      const place = p.toPlace();
      await place.fetchFields({ fields: ['formattedAddress'] });
      if (place.formattedAddress) {
        skip.current = true;
        onChange(place.formattedAddress);
      }
    } catch {
      /* Texteingabe bleibt nutzbar. */
    }
    session.current = null;
  }
  const show =
    focused &&
    m.enabled &&
    value.trim().length >= 3 &&
    suggestionQuery === value &&
    suggestions.length > 0;
  return (
    <div className="field address-field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <div className="input-with-icon">
        <MapPin size={17} aria-hidden="true" />
        <input
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={240}
          required={required}
          autoComplete="off"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : failed ? `${id}-notice` : undefined}
          role={m.enabled ? 'combobox' : undefined}
          aria-autocomplete={m.enabled ? 'list' : undefined}
          aria-expanded={m.enabled ? show : undefined}
          aria-controls={show ? listId : undefined}
          aria-activedescendant={show && active >= 0 ? `${listId}-${active}` : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            seq.current++;
            setFocused(false);
          }}
          onKeyDown={(e) => {
            if (!show) return;
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((active + 1) % suggestions.length);
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((active - 1 + suggestions.length) % suggestions.length);
            }
            if (e.key === 'Escape') {
              e.preventDefault();
              setSuggestions([]);
            }
            if (e.key === 'Enter' && active >= 0) {
              e.preventDefault();
              void select(suggestions[active]);
            }
          }}
        />
      </div>
      {show && (
        <ul
          id={listId}
          role="listbox"
          className="address-suggestions"
          aria-label="Adressvorschläge"
        >
          {suggestions.map((s, i) => (
            <li
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              key={s.placePrediction?.placeId || i}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => void select(s)}
              className={i === active ? 'selected' : ''}
            >
              {s.placePrediction?.text.toString()}
            </li>
          ))}
          <li role="presentation" className="places-attribution">
            Google Maps
          </li>
        </ul>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
      {failed && !error && (
        <p id={`${id}-notice`} className="field-note">
          Keine Vorschläge verfügbar. Bitte Adresse selbst eingeben.
        </p>
      )}
    </div>
  );
}
