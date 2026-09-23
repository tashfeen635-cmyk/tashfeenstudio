import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import WorkGallery from "@/components/WorkGallery";
import JsonLd from "@/components/JsonLd";
import { SITE, PORTFOLIO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio - Tashfeen Riaz, Senior Full Stack Web Developer in Gilgit",
  description:
    "Selected works by Tashfeen Riaz: brand identity, web design, UI/UX, digital art, packaging, and web development projects.",
  alternates: { canonical: "/work" },
  openGraph: { url: `${SITE.url}/work`, type: "website" },
};

function worksJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Portfolio of Tashfeen Riaz",
    itemListElement: PORTFOLIO.map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: w.title,
        description: w.category,
        image: `${SITE.url}${w.src}`,
        author: { "@type": "Person", name: SITE.name },
      },
    })),
  };
}

export default function WorkPage() {
  return (
    <>
      <JsonLd data={worksJsonLd()} />

      <PageHeader
        title="My Portfolio"
        lead="Selected design and development works by Tashfeen Riaz — brand identity, web design, UI/UX, and digital art."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <WorkGallery />
          <div className="cta-row">
            <Link className="btn" href="/contact">
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}