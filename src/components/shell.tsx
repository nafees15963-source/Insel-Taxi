'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, ArrowUpRight, Clock3, MapPin } from 'lucide-react';
import { company, nav } from '@/config/company';
import { defaultMessage, whatsappLink } from '@/lib/booking';
import { CallButton, WhatsAppButton } from './ui';
function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link href="/" className={`brand ${footer ? 'brand-footer' : ''}`}>
      {company.logoReady ? (
        <Image
          src="/logo-original.png"
          alt=""
          width={60}
          height={60}
          className="original-logo"
          unoptimized
        />
      ) : (
        <span className="logo-placeholder" aria-hidden="true">
          Logo
        </span>
      )}
      <span className="brand-type">
        INSEL TAXI <small>RATZEBURG</small>
      </span>
    </Link>
  );
}
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === 'Tab' && menu.current) {
        const links = Array.from(menu.current.querySelectorAll<HTMLElement>('a,button'));
        const last = links.at(-1);
        if (e.shiftKey && document.activeElement === toggle.current) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          toggle.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return (
    <>
      <div className="utility">
        <div className="container utility-inner">
          <span>
            <MapPin size={13} aria-hidden="true" />
            Ratzeburg & Umgebung
          </span>
          <span>
            <Clock3 size={13} aria-hidden="true" />
            Täglich 24 Stunden für Sie erreichbar
            <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Hauptnavigation">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={pathname === n.href ? 'page' : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <WhatsAppButton>WhatsApp</WhatsAppButton>
            <CallButton />
          </div>
          <button
            className="menu-toggle"
            ref={toggle}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            className="mobile-nav"
            ref={menu}
            id="mobile-navigation"
            aria-label="Mobile Hauptnavigation"
          >
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={pathname === n.href ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {n.label}
                <ArrowUpRight size={17} />
              </Link>
            ))}
            <Link href="/fahrt-anfragen" onClick={() => setOpen(false)}>
              Fahrt anfragen
              <ArrowUpRight size={17} />
            </Link>
            <WhatsAppButton />
            <CallButton>{company.phoneDisplay}</CallButton>
          </nav>
        )}
      </header>
    </>
  );
}
export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Brand footer />
              <p>
                Von hier. Für Ihre Wege.
                <br />
                Ihr Taxiservice in Ratzeburg und im
                <br />
                Kreis Herzogtum Lauenburg.
              </p>
            </div>
            <div>
              <h2>Unterwegs mit uns</h2>
              <Link href="/leistungen">Unsere Leistungen</Link>
              <Link href="/krankenfahrten">Krankenfahrten</Link>
              <Link href="/flughafentransfer">Flughafentransfer</Link>
              <Link href="/fahrpreis">Fahrpreis</Link>
            </div>
            <div>
              <h2>Direkter Kontakt</h2>
              <a href={`tel:${company.phone}`}>{company.phoneDisplay}</a>
              <a href={whatsappLink(defaultMessage)} target="_blank" rel="noopener noreferrer">
                WhatsApp: {company.whatsappDisplay}
              </a>
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <span>
                {company.street}
                <br />
                {company.postalCode} {company.city}
              </span>
            </div>
            <div>
              <h2>Gut zu wissen</h2>
              <Link href="/fahrt-anfragen">Fahrt anfragen</Link>
              <Link href="/kontakt">Kontakt & Erreichbarkeit</Link>
              <Link href="/datenschutz">Datenschutz</Link>
              <Link href="/impressum">Impressum</Link>
              <button
                className="footer-text-button"
                onClick={() => window.dispatchEvent(new Event('maps-settings'))}
              >
                Datenschutzeinstellungen
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Insel Taxi Ratzeburg</span>
            <span>Eine Anfrage wird erst mit unserer Bestätigung zur Buchung.</span>
          </div>
        </div>
      </footer>
      <div className="floating-contact" aria-label="Schneller Kontakt">
        <a
          className="float-whatsapp"
          href={whatsappLink(defaultMessage)}
          aria-label="Fahrt per WhatsApp anfragen"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={23} />
        </a>
        <a href={`tel:${company.phone}`} aria-label={`Insel Taxi anrufen: ${company.phoneDisplay}`}>
          <Phone size={21} />
        </a>
      </div>
      <div className="mobile-actions">
        <a href={whatsappLink(defaultMessage)} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={21} />
          WhatsApp
        </a>
        <a href={`tel:${company.phone}`}>
          <Phone size={20} />
          Anrufen
        </a>
      </div>
    </>
  );
}
