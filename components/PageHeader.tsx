export default function PageHeader({
  title,
  lead,
}: {
  title: string;
  lead?: string;
}) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {lead && <p>{lead}</p>}
    </div>
  );
}