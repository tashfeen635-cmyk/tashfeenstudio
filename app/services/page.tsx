import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import {
  SITE,
  OG_IMAGE,
  SERVICES,
  SERVICES_FAQ,
  faqJsonLd,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Web Design & Development Services in Gilgit, Pakistan",
  description:
    "Web design, UI/UX, full stack development, custom web apps, e-commerce, and SaaS services by Tashfeen Riaz, a web developer in Gilgit, Pakistan. Free quote.",
  alternates: { canonical: "/services" },
  openGraph: {
    url: `${SITE.url}/services`,
    type: "website",
    title: "Web Design & Development Services in Gilgit, Pakistan",
    description:
      "Web design, UI/UX, full stack development, custom web apps, e-commerce, and SaaS services by Tashfeen Riaz in Gilgit, Pakistan.",
    images: [OG_IMAGE],
  },
};

function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.studio,
    url: `${SITE.url}/services`,
    founder: { "@type": "Person", name: SITE.name, url: `${SITE.url}/about` },
    areaServed: { "@type": "Country", name: "Pakistan" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.desc },
      })),
    },
  };
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesJsonLd()} />

      <PageHeader
        title="Services"
        lead="Professional web design, development, and digital services for businesses in Gilgit, across Pakistan, and worldwide."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <SectionHeading tag="Services" title="What I Can Build For You" />
          <p className="section-lead">
            I design and build websites end to end, from the first wireframe to
            the deployed application. Whether you need a{" "}
            <Link href="/work">portfolio or business site</Link>, a full{" "}
            <Link href="/skills">front-end and back-end build</Link>, or a
            multi-tenant SaaS platform, the process is the same: understand the
            goal, design it properly, then engineer it to last. I work with
            businesses in Gilgit, across Pakistan, and with clients overseas.
          </p>
          <div className="features-grid">
            {SERVICES.map((s) => (
              <div className="feature-card" key={s.title}>
                <img src={s.icon} alt="" width={45} height={45} loading="lazy" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Process" title="How I Work" />
          <div className="stories-grid">
            {[
              {
                t: "01. Understand",
                d: "We discuss your business, goals, and audience so the website is built around what actually matters.",
              },
              {
                t: "02. Design",
                d: "I design a clean, modern UI with your brand at the center - pages, components, and user flows.",
              },
              {
                t: "03. Build & Launch",
                d: "I develop, test, and launch a fast, secure, SEO-ready website - then keep it maintained and updated.",
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
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="FAQ" title="Service Questions" />
          <FaqList items={SERVICES_FAQ} />
          <JsonLd data={faqJsonLd(SERVICES_FAQ)} />
          <p className="section-lead">
            Still not sure which service fits? Have a look at the{" "}
            <Link href="/work">projects I have delivered</Link> or read more
            about <Link href="/about">me and my process</Link> - then ask me
            directly, the first conversation is free.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/contact">
              Get a Free Quote
            </Link>
            <Link className="btn" href="/work">
              See My Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}