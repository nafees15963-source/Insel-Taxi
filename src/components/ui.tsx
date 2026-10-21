import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Phone, Mail, ArrowRight, Check } from 'lucide-react';
import { company } from '@/config/company';
import { defaultMessage, whatsappLink, emailLink } from '@/lib/booking';
import type { ReactNode } from 'react';
export function WhatsAppButton({
  children = 'WhatsApp-Anfrage starten',
  message = defaultMessage,
  className = '',
}: {
  children?: ReactNode;
  message?: string;
  className?: string;
}) {
  return (
    <a
      className={`button button-primary ${className}`}
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={20} aria-hidden="true" />
      {children}
      <ArrowUpRight size={17} className="button-end" aria-hidden="true" />
    </a>
  );
}
export function EmailButton({
  children = 'Per E-Mail anfragen',
  message = defaultMessage,
  className = '',
}: {
  children?: ReactNode;
  message?: string;
  className?: string;
}) {
  return (
    <a className={`button button-outline ${className}`} href={emailLink(message)}>
      <Mail size={19} aria-hidden="true" />
      {children}
    </a>
  );
}
export function CallButton({
  children = 'Jetzt anrufen',
  className = '',
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a className={`button button-outline ${className}`} href={`tel:${company.phone}`}>
      <Phone size={19} aria-hidden="true" />
      {children}
    </a>
  );
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>
      <span />
      {children}
    </p>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="page-intro">
      <div className="container">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <div className="intro-copy">{children}</div>
      </div>
    </div>
  );
}
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((x) => (
        <li key={x}>
          <Check size={18} aria-hidden="true" />
          {x}
        </li>
      ))}
    </ul>
  );
}
export function ContactStrip() {
  return (
    <section className="contact-strip">
      <div className="container contact-strip-inner">
        <div>
          <Eyebrow light>Persönlich für Sie da</Eyebrow>
          <h2>
            Ihre nächste Fahrt?
            <br />
            Einfach kurz melden.
          </h2>
          <p>Per WhatsApp oder E-Mail anfragen – oder direkt mit uns sprechen.</p>
        </div>
        <div className="contact-strip-actions">
          <WhatsAppButton />
          <EmailButton />
          <a className="contact-big-phone" href={`tel:${company.phone}`}>
            <Phone size={24} aria-hidden="true" />
            {company.phoneDisplay}
          </a>
          <span>Täglich, rund um die Uhr erreichbar</span>
        </div>
      </div>
    </section>
  );
}
