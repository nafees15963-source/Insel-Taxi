'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { company, navigation } from '@/config/company';
import { whatsappUrl } from '@/lib/contact';

export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link href="/" className={`brand${footer ? ' brand-footer' : ''}`}><Image src="/logo.webp" width={76} height={76} alt="" priority={!footer}/><span><strong>INSEL TAXI</strong><span>RATZEBURG</span></span><span className="sr-only"> – Startseite</span></Link>;
}
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1051px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (event.key === 'Tab') {
        const items = [toggle.current, ...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>('a') || [])].filter(Boolean) as HTMLElement[];
        if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1)?.focus(); }
        else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0]?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  return <header className="site-header"><div className="container header-inner"><Brand/><nav className="desktop-nav" aria-label="Hauptnavigation">{navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href || `${pathname}/` === item.href ? 'page' : undefined}>{item.label}</Link>)}</nav><a href={`tel:${company.phone}`} className="header-call" aria-label={`${company.phoneDisplay} – Insel Taxi anrufen`}><Phone size={18} aria-hidden="true"/><span>{company.phoneDisplay}</span></a><button ref={toggle} className="menu-toggle" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div>{open && <div id="mobile-menu" className="mobile-menu" ref={menu}><nav aria-label="Mobile Hauptnavigation"><Link href="/" onClick={() => setOpen(false)}>Startseite</Link>{navigation.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={18} aria-hidden="true"/></Link>)}</nav><Link className="button button-primary" href="/fahrt-anfragen/" onClick={() => setOpen(false)}>Fahrt anfragen<ArrowUpRight size={18}/></Link></div>}</header>;
}
export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-main"><div><Brand footer/><p>Hier zu Hause.<br/>Für Sie unterwegs.</p><p className="footer-small">Ihr Taxi in Ratzeburg und Umgebung.</p></div><div><h2>Unterwegs mit uns</h2><Link href="/leistungen/">Unsere Leistungen</Link><Link href="/krankenfahrten/">Krankenfahrten</Link><Link href="/flughafentransfer/">Flughafentransfer</Link><Link href="/leistungen/#flotte">Unsere Flotte</Link><Link href="/fahrpreis/">Tarife & Fahrpreise</Link></div><div><h2>Direkt verbunden</h2><a href={`tel:${company.phone}`}>{company.phoneDisplay}</a><a href={whatsappUrl()}>WhatsApp schreiben <ArrowUpRight size={15} aria-hidden="true"/></a><a href={`mailto:${company.email}`}>{company.email}</a><p>{company.street}<br/>{company.postalCode} {company.city}</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Insel Taxi Ratzeburg</span><div><Link href="/impressum/">Impressum</Link><Link href="/datenschutz/">Datenschutz</Link><Link href="/kontakt/">Kontakt</Link></div><span>Mitten in Ratzeburg. Nah bei Ihnen.</span></div></div></footer>;
}
export function ContactDock() {
  return <aside className="contact-dock" aria-label="Taxi direkt anfragen"><a href={whatsappUrl()} className="dock-whatsapp"><MessageCircle size={20} aria-hidden="true"/><span>WhatsApp</span></a><a href={`tel:${company.phone}`} className="dock-phone"><Phone size={19} aria-hidden="true"/><span>Anrufen</span></a></aside>;
}
