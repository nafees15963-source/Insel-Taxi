import { ArrowUpRight } from 'lucide-react';

/** Brand illustration, not a photograph or representation of a particular vehicle. */
export function RideVisual({ van = false }: { van?: boolean }) {
  return (
    <svg className="ride-visual" viewBox="0 0 600 260" fill="none" aria-hidden="true">
      <ellipse cx="303" cy="218" rx="230" ry="15" fill="currentColor" opacity=".07" />
      <path d="M34 219H566" stroke="currentColor" strokeWidth="2" opacity=".16" />
      <path
        d="M39 198H87M484 198H557"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="12 8"
        opacity=".25"
      />
      <g className="illustrated-car">
        <path
          d={
            van
              ? 'M90 175L102 92Q106 67 133 67H382Q406 67 423 89L469 145L498 157Q512 164 512 181V202H87V184Z'
              : 'M86 173L113 150L156 91Q168 74 192 74H345Q370 74 389 93L441 143L499 158Q515 162 515 182V203H86Z'
          }
          fill="#ffce32"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d={
            van
              ? 'M132 83H233V140H119ZM246 83H330V140H246ZM343 83H382Q393 83 404 98L438 140H343Z'
              : 'M178 90H253V140H143ZM266 90H344Q359 90 373 104L412 140H266Z'
          }
          fill="#fffdf5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M255 149V191M352 150V191M272 154H287M367 154H382"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M94 178H112M492 173H509" stroke="#fffdf5" strokeWidth="9" strokeLinecap="round" />
        <path d="M216 166h9v9h-9zm9 9h9v9h-9zm9-9h9v9h-9z" fill="currentColor" />
        <path d="M286 73L291 54H327L332 73" fill="#fffdf5" stroke="currentColor" strokeWidth="3" />
        <path d="M299 61h6v6h-6zm6 6h6v6h-6zm6-6h6v6h-6z" fill="currentColor" />
        <path d="M96 202H507" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        {[163, 431].map((x) => (
          <g key={x}>
            <circle cx={x} cy="201" r="31" fill="currentColor" />
            <circle cx={x} cy="201" r="16" fill="#fffdf5" />
            <circle cx={x} cy="201" r="6" fill="currentColor" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function JourneyScene() {
  return (
    <div className="journey-scene">
      <div className="journey-scene-top">
        <span>Von hier. Für Ihre Wege.</span>
        <span className="journey-compass" aria-hidden="true">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="journey-sun" aria-hidden="true" />
      <div className="journey-contours" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <RideVisual />
      <div className="journey-stops">
        <span>
          <i aria-hidden="true" />
          Ratzeburg
        </span>
        <span className="journey-stop-line" aria-hidden="true" />
        <span>
          Ihr Ziel <i aria-hidden="true" />
        </span>
      </div>
      <p>Regional. Bundesweit. Persönlich.</p>
    </div>
  );
}
