import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import StoriesGrid from "@/components/StoriesGrid";
import JsonLd from "@/components/JsonLd";
import { SITE, articlesJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stories From Gilgit-Baltistan - Tashfeen Riaz, Web Developer",
  description:
    "A visual journey through the mountains, glaciers, lakes, and people of Gilgit-Baltistan, Pakistan.",
  alternates: { canonical: "/stories" },
  openGraph: { url: `${SITE.url}/stories`, type: "website" },
};

export default function StoriesPage() {
  return (
    <>
      <JsonLd data={articlesJsonLd()} />

      <PageHeader
        title="Stories From Gilgit"
        lead="A visual journey through the mountains, people, and landscapes that inspire my work."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <StoriesGrid />
        </div>
      </section>

      <section className="section cta-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHeading
            tag="Inspired?"
            title="Let's Build Something Together"
          />
          <div className="cta-row">
            <a className="btn" href="/contact">
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </>
  );
}