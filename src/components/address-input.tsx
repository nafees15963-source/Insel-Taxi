'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

declare global { interface Window { inselTaxiMapsReady?: () => void } }

let placesPromise: Promise<google.maps.PlacesLibrary> | null = null;
function loadPlaces(): Promise<google.maps.PlacesLibrary> {
  if (placesPromise) return placesPromise;
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  if (!key) return Promise.reject(new Error('Adressvorschläge sind nicht eingerichtet.'));
  placesPromise = new Promise<void>((resolve, reject) => {
    if (typeof window.google?.maps?.importLibrary === 'function') { resolve(); return; }
    const script = document.createElement('script');
    const timer = window.setTimeout(() => {
      script.remove();
      reject(new Error('Google antwortet nicht. Bitte geben Sie die Adresse selbst ein.'));
    }, 12_000);
    window.inselTaxiMapsReady = () => { window.clearTimeout(timer); resolve(); };
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&loading=async&v=weekly&callback=inselTaxiMapsReady`;
    script.onerror = () => { window.clearTimeout(timer); script.remove(); reject(new Error('Adressvorschläge sind gerade nicht verfügbar.')); };
    document.head.appendChild(script);
  }).then(() => window.google.maps.importLibrary('places') as Promise<google.maps.PlacesLibrary>).catch(error => {
    placesPromise = null;
    throw error;
  });
  return placesPromise;
}

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  suggestionsEnabled?: boolean;
};

export function AddressInput({ id, label, value, onChange, error, placeholder, suggestionsEnabled = false }: Props) {
  const uid = useId().replaceAll(':', '');
  const listId = `${uid}-suggestions`;
  const [options, setOptions] = useState<google.maps.places.AutocompleteSuggestion[]>([]);
  const [active, setActive] = useState(-1);
  const [notice, setNotice] = useState('');
  const [focused, setFocused] = useState(false);
  const request = useRef(0);
  const token = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const selectedValue = useRef('');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!suggestionsEnabled || !focused || value.trim().length < 3 || value === selectedValue.current) return;
    let cancelled = false;
    const sequence = ++request.current;
    const timer = window.setTimeout(async () => {
      try {
        const places = await loadPlaces();
        if (cancelled) return;
        token.current ||= new places.AutocompleteSessionToken();
        const result = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: value, sessionToken: token.current, language: 'de', region: 'de',
        });
        if (!cancelled && sequence === request.current) {
          setOptions(result.suggestions.filter(item => item.placePrediction).slice(0, 5));
          setActive(-1);
          setNotice(result.suggestions.length ? '' : 'Keine Vorschläge. Sie können die Adresse direkt eingeben.');
        }
      } catch {
        if (!cancelled) {
          setOptions([]);
          setNotice('Adressvorschläge sind nicht verfügbar. Bitte geben Sie die Adresse selbst ein.');
        }
      }
    }, 300);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [value, suggestionsEnabled, focused]);

  async function choose(option: google.maps.places.AutocompleteSuggestion) {
    const prediction = option.placePrediction;
    if (!prediction) return;
    const fallback = prediction.text.toString();
    selectedValue.current = fallback;
    onChange(fallback);
    setOptions([]);
    setActive(-1);
    request.current++;
    input.current?.focus();
    try {
      const place = prediction.toPlace();
      await place.fetchFields({ fields: ['formattedAddress'] });
      if (place.formattedAddress && input.current?.value === fallback) {
        selectedValue.current = place.formattedAddress;
        onChange(place.formattedAddress);
      }
    } catch {
      setNotice('Bitte prüfen Sie die übernommene Adresse.');
    }
    token.current = null;
  }

  const expanded = suggestionsEnabled && focused && options.length > 0;
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!expanded) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const increment = event.key === 'ArrowDown' ? 1 : -1;
      setActive(current => current === -1 ? (increment === 1 ? 0 : options.length - 1) : (current + increment + options.length) % options.length);
    } else if (event.key === 'Enter' && active >= 0) {
      event.preventDefault();
      void choose(options[active]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOptions([]);
    }
  }

  return <div className="field address-field">
    <label htmlFor={id}>{label} <span aria-hidden="true">*</span></label>
    <div className="input-wrap">
      <input ref={input} id={id} value={value} required maxLength={180}
        placeholder={placeholder} autoComplete="off" spellCheck={false}
        onChange={event => { setOptions([]); setActive(-1); onChange(event.target.value); }}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        onKeyDown={onKeyDown} aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : notice ? `${id}-notice` : undefined}
        {...(suggestionsEnabled ? { role: 'combobox', 'aria-autocomplete': 'list' as const, 'aria-expanded': expanded,
          'aria-controls': listId, 'aria-activedescendant': expanded && active >= 0 ? `${uid}-${active}` : undefined } : {})} />
      {expanded && <ul id={listId} className="address-options" role="listbox" aria-label="Adressvorschläge von Google">
        {options.map((option, index) => <li key={option.placePrediction?.placeId || index}
          id={`${uid}-${index}`} role="option" aria-selected={active === index}
          className={active === index ? 'is-active' : ''}
          onMouseDown={event => { event.preventDefault(); void choose(option); }}>
          {option.placePrediction?.text.toString()}
        </li>)}
        <li role="presentation" className="google-attribution">Google Maps</li>
      </ul>}
    </div>
    {error && <p className="form-error" id={`${id}-error`}>{error}</p>}
    {notice && !error && <p className="form-note" id={`${id}-notice`} role="status">{notice}</p>}
  </div>;
}
