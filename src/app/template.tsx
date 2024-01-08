import Loading from './loading';
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>
    <Loading/>
    <div>{children}</div>
  </div>
}