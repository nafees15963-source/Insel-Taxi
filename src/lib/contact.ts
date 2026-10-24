import { company } from '@/config/company';
export const defaultMessage = 'Hallo Insel Taxi, ich möchte eine Fahrt anfragen.\n\nAbholort:\nZielort:\nDatum:\nUhrzeit:\nPersonen:\nBesondere Wünsche:';
export function whatsappUrl(message = defaultMessage) { return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`; }
