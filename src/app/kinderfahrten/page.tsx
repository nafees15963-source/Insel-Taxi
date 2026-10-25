import { ServicePage } from '@/components/service-page';
import { servicePages } from '@/config/service-pages';

const content = servicePages.kinderfahrten;
export const metadata = {
  title: content.title,
  description: content.description,
  alternates: { canonical: '/kinderfahrten' },
};
export default function Page() {
  return <ServicePage content={content} />;
}
