import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";

export default function PageHeader({
  title,
  lead,
  crumbs,
}: {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
}) {
  return (
    <div className="page-header">
      {crumbs && <Breadcrumbs items={crumbs} />}
      <h1>{title}</h1>
      {lead && <p>{lead}</p>}
    </div>
  );
}
