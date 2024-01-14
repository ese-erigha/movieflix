import { redirect } from 'next/navigation';
import { routeFilters } from './common/helper';

export default function Home() {
  redirect(`/movies/${routeFilters[0].key}/1`);
}
