import { redirect } from 'next/navigation';
import { generateUid } from '../common/helper';

export default function Page() {
  redirect(`/user/${generateUid()}/1`);
}
