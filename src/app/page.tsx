// import { redirect } from 'next/navigation';
// import { generateUid } from './common/helper';
import Redirect from './components/redirect';

export default function Home() {
  // redirect(`/user/${generateUid()}/1`);
  return <Redirect/>
}
