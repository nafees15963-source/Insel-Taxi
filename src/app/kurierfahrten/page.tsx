import { ServicePage } from '@/components/service-page';
import { servicePages } from '@/config/service-pages';

const content = servicePages.kurierfahrten;
export const metadata = {
  title: content.title,
  description: content.description,
  alternates: { canonical: '/kurierfahrten' },
};
export default function Page() {
  return <ServicePage content={content} />;
}
