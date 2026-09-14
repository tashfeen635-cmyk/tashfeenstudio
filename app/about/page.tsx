import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { SITE, personJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Tashfeen Riaz - Web Designer & Developer from Gilgit, Pakistan",
  description:
    "Learn about Tashfeen Riaz, a full stack web developer and digital designer from Gilgit, Pakistan and founder of Tashu's Studio.",
  alternates: { canonical: "/about" },
  openGraph: { url: `${SITE.url}/about`, type: "profile" },
};

const FACTS = [
  { k: "Name", v: SITE.name },
  { k: "A.K.A", v: SITE.names.join(" · ") },
  { k: "Role", v: "Full Stack Web Developer / Designer" },
  { k: "Studio", v: SITE.studio },
  { k: "Location", v: SITE.location },
  { k: "Languages", v: "English · Urdu · Shina" },
  { k: "Experience", v: "50+ Websites and Applications" },
  { k: "Email", v: SITE.email },
  { k: "Phone", v: SITE.phone },
];

const INTERESTS = [
  "Web Development",
  "UI/UX Design",
  "WordPress",
  "Shopify",
  "SaaS Products",
  "Branding",
  "Photography",
  "Travel & Mountains",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />

      <PageHeader
        title="About Tashfeen Riaz"
        lead="Full Stack Web Developer & Designer from Gilgit, Pakistan. I help businesses grow with fast, modern, beautifully designed websites."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container about-grid">
          <div>
            <Image
              className="about-portrait"
              src={SITE.portrait}
              alt="Tashfeen Riaz - Full Stack Web Developer in Gilgit, Pakistan"
              width={SITE.portraitW}
              height={SITE.portraitH}
              sizes="(max-width: 991px) 100vw, 42vw"
              loading="lazy"
            />
          </div>
          <div className="about-bio">
            <h2>Who I Am</h2>
            <div className="divider-line" aria-hidden="true" />
            <p>
              I&apos;m {SITE.name} — better known online as{" "}
              <strong>{SITE.names[2]}</strong> — a self-taught full stack web
              developer and digital designer from {SITE.location}. I started{" "}
              {SITE.studio} to bring modern web design and development services
              to businesses in Gilgit-Baltistan, Pakistan and beyond.
            </p>
            <p>
              Over the years I&apos;ve designed and developed websites for
              startups, tourism companies, and businesses — covering everything
              from branding and UI/UX to WordPress, Shopify, and custom web
              applications.
            </p>
            <p>
              My approach is simple: understand the business, design with the
              user in mind, and build products that are fast, responsive, and
              easy to maintain. When I&apos;m not coding, you&apos;ll find me
              exploring the mountains, drawing, or capturing the landscapes of
              Gilgit-Baltistan.
            </p>

            <h2 style={{ marginTop: 34 }}>Personal Details</h2>
            <div className="divider-line" aria-hidden="true" />
            <ul className="about-facts">
              {FACTS.map((f) => (
                <li key={f.k}>
                  <b>{f.k}</b> <span>{f.v}</span>
                </li>
              ))}
            </ul>

            <h2 style={{ marginTop: 34 }}>Interests</h2>
            <div className="divider-line" aria-hidden="true" />
            <p style={{ color: "#ccc" }}>
              {INTERESTS.map((i) => `• ${i}`).join("  ")}
            </p>

            <div className="cta-row">
              <Link className="btn" href="/services">
                View My Services
              </Link>
              <Link className="btn" href="/contact">
                Work With Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}