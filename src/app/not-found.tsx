import Link from 'next/link';
import { CallButton } from '@/components/ui';
export default function NotFound() {
  return (
    <div className="not-found">
      <div className="container">
        <p className="eyebrow">404 · Hier geht es nicht weiter</p>
        <h1>Ein anderer Weg führt zum Ziel.</h1>
        <p>
          Diese Seite gibt es nicht. Starten Sie auf der Startseite oder rufen Sie uns direkt an.
        </p>
        <Link className="button button-navy" href="/">
          Zur Startseite
        </Link>
        <CallButton />
      </div>
    </div>
  );
}
