import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Phone, type LucideIcon } from 'lucide-react';
import { company } from '@/config/company';
import { whatsappUrl } from '@/lib/contact';
import type { ReactNode } from 'react';

export function ContactActions({ message, className = '' }: { message?: string; className?: string }) {
  return <div className={`contact-actions ${className}`}><a className="button button-primary" href={whatsappUrl(message)}><MessageCircle size={20} aria-hidden="true"/>Per WhatsApp anfragen<ArrowUpRight size={18} aria-hidden="true"/></a><a className="button button-secondary" href={`tel:${company.phone}`}><Phone size={19} aria-hidden="true"/>Jetzt anrufen</a></div>;
}
export function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <section className="page-intro"><div className="container"><Link className="breadcrumb" href="/">Startseite <span aria-hidden="true">/</span></Link><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="intro-copy">{description}</p>{children}</div></section>;
}
export function SectionHeading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return <div className="section-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{children && <div className="section-description">{children}</div>}</div>;
}
export function IconCard({ icon: Icon, title, description, href, linkLabel = 'Mehr erfahren' }: { icon: LucideIcon; title: string; description: string; href?: string; linkLabel?: string }) {
  return <article className="card icon-card"><span className="icon-box"><Icon size={26} strokeWidth={1.6} aria-hidden="true"/></span><h3>{title}</h3><p>{description}</p>{href && <Link className="text-link" href={href}>{linkLabel}<ArrowUpRight size={18} aria-hidden="true"/></Link>}</article>;
}
export function ContactBand() {
  return <section className="contact-band"><div className="container contact-band-inner"><div><p className="eyebrow">WIR SIND FÜR SIE DA</p><h2>Ihr nächster Weg?<br/>Ein Anruf genügt.</h2><a className="contact-number" href={`tel:${company.phone}`}>{company.phoneDisplay}<ArrowUpRight aria-hidden="true"/></a><p>Täglich rund um die Uhr · Ratzeburg & Umgebung</p></div><div className="contact-band-action"><span className="contact-or">Lieber schreiben?</span><a className="button button-primary" href={whatsappUrl()}><MessageCircle aria-hidden="true" size={20}/>WhatsApp öffnen<ArrowUpRight aria-hidden="true" size={18}/></a><p>Ihre Fahrt ist erst nach unserer<br/>persönlichen Bestätigung gebucht.</p></div></div></section>;
}
