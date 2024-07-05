import { redirect } from 'next/navigation';
import { generateUid } from './common/helper';

export default function Home() {
  redirect(`/user/${generateUid()}/1`);
}
