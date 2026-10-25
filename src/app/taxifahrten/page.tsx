import { ServicePage } from '@/components/service-page';
import { servicePages } from '@/config/service-pages';

const content = servicePages.taxifahrten;
export const metadata = {
  title: content.title,
  description: content.description,
  alternates: { canonical: '/taxifahrten' },
};
export default function Page() {
  return <ServicePage content={content} />;
}
