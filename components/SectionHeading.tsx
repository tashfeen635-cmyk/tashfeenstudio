export default function SectionHeading({
  tag,
  title,
}: {
  tag?: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      {tag && <span className="badge">{tag}</span>}
      <h2>{title}</h2>
      <div className="divider-line" aria-hidden="true" />
    </div>
  );
}