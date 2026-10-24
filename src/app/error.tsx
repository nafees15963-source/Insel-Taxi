'use client';
import { CallButton } from '@/components/ui';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="not-found">
      <div className="container">
        <h1>Ein kurzer Zwischenstopp.</h1>
        <p>
          Diese Seite konnte nicht geladen werden. Versuchen Sie es erneut oder rufen Sie uns direkt
          an.
        </p>
        <button className="button button-navy" onClick={reset}>
          Erneut versuchen
        </button>
        <CallButton />
      </div>
    </div>
  );
}
