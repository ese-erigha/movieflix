import { redirect } from 'next/navigation';

export default function Home() {
  const min = Math.ceil(1);
  const max = Math.floor(611);
  const uid =  Math.floor(Math.random() * (max - min + 1)) + min;
  redirect(`/user/${uid}/1`);
}
