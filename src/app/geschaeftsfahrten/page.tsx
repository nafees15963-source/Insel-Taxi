import { ServicePage } from '@/components/service-page';
import { servicePages } from '@/config/service-pages';

const content = servicePages.geschaeftsfahrten;
export const metadata = {
  title: content.title,
  description: content.description,
  alternates: { canonical: '/geschaeftsfahrten' },
};
export default function Page() {
  return <ServicePage content={content} />;
}
