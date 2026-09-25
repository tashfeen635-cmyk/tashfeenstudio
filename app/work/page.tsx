import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import WorkGallery from "@/components/WorkGallery";
import JsonLd from "@/components/JsonLd";
import { SITE, OG_IMAGE, PORTFOLIO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web Design & Development Portfolio - Gilgit, Pakistan",
  description:
    "Selected web design, UI/UX, brand identity, and full stack development work by Tashfeen Riaz, a senior web developer in Gilgit, Pakistan.",
  alternates: { canonical: "/work" },
  openGraph: {
    url: `${SITE.url}/work`,
    type: "website",
    title: "Web Design & Development Portfolio - Gilgit, Pakistan",
    description:
      "Selected web design, UI/UX, brand identity, packaging, and full stack development work by Tashfeen Riaz, a senior web developer in Gilgit, Pakistan.",
    images: [OG_IMAGE],
  },
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
        description: w.blurb,
        genre: w.category,
        image: `${SITE.url}${w.src}`,
        creator: { "@type": "Person", name: SITE.name, url: `${SITE.url}/about` },
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
        lead="Selected design and development work by Tashfeen Riaz - brand identity, web design, UI/UX, packaging, and full stack web development."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <p className="section-lead">
            A selection of projects spanning brand identity, print and packaging
            design, UI/UX, and production front-end engineering. Every project
            below was designed and built from scratch rather than adapted from a
            template. Click any item to view it full size, or read the breakdown
            further down the page.
          </p>
          <WorkGallery />
          <div className="cta-row">
            <Link className="btn" href="/contact">
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Work" title="Project Breakdowns" />
          <p className="section-lead">
            Here is what each piece of work involved, from the design thinking
            through to what shipped.
          </p>
          <div className="features-grid">
            {PORTFOLIO.map((w) => (
              <div className="feature-card" key={w.src}>
                <span className="badge">{w.category}</span>
                <h3>{w.title}</h3>
                <p>{w.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading tag="Process" title="What Every Project Includes" />
          <div className="stories-grid">
            {[
              {
                t: "Discovery & Strategy",
                d: "We start by defining who the site is for, what it must achieve, and what success looks like. Content structure and page hierarchy are agreed before any design work begins.",
              },
              {
                t: "Design & Build",
                d: "Interfaces are designed in Figma for desktop and mobile, then built with React, Next.js, and TypeScript. Clean, well-documented code that another developer could pick up and maintain.",
              },
              {
                t: "Launch & Growth",
                d: "Every site ships with technical SEO, structured data, analytics, and performance tuning, then stays monitored and maintained after launch so it keeps earning its keep.",
              },
            ].map((p) => (
              <div className="story-card" key={p.t}>
                <div className="story-body">
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="section-lead">
            Want the full breakdown of what I can build, or a look at the{" "}
            <Link href="/skills">technologies I work with</Link>? You can also
            read more about{" "}
            <Link href="/about">my background and process</Link> before getting
            in touch.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/services">
              See What I Offer
            </Link>
            <Link className="btn" href="/contact">
              Hire Me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
