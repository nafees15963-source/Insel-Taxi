import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export default function NotFound() { return <section className="section"><div className="container prose"><p className="eyebrow">404 · HIER GEHT’S NICHT WEITER</p><h1>Diese Seite ist<br/>nicht mehr hier.</h1><p>Auf unserer Startseite finden Sie Ihre nächste Verbindung.</p><Link className="button button-primary" href="/">Zur Startseite<ArrowRight size={18}/></Link></div></section>; }
