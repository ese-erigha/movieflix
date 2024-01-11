export default function Page({ params }: { params: { type: string } }) {
  return <div>Movies: {params.type}</div>;
}
