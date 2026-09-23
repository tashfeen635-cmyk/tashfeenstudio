import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { SITE, personJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Tashfeen Riaz - Senior Full Stack Web Developer from Gilgit, Pakistan",
  description:
    "Learn about Tashfeen Riaz, a senior full stack web developer and digital designer from Gilgit, Pakistan and founder of Tashu's Studio.",
  alternates: { canonical: "/about" },
  openGraph: { url: `${SITE.url}/about`, type: "profile" },
};

const FACTS = [
  { k: "Name", v: SITE.name },
  { k: "A.K.A", v: SITE.names.join(" · ") },
  { k: "Role", v: "Senior Full Stack Web Developer / Designer" },
  { k: "Studio", v: SITE.studio },
  { k: "Location", v: SITE.location },
  { k: "Languages", v: "English · Urdu · Shina" },
  { k: "Experience", v: "50+ Websites & Applications Delivered" },
  { k: "Email", v: SITE.email },
  { k: "Phone", v: SITE.phone },
];

const INTERESTS = [
  "Web Development",
  "UI/UX Design",
  "Custom Applications",
  "Full Stack",
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
        lead="Senior Full Stack Web Developer & Designer from Gilgit, Pakistan. I help businesses grow with fast, secure, professionally engineered websites."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container about-grid">
          <div>
            <Image
              className="about-portrait"
              src={SITE.portrait}
              alt="Tashfeen Riaz - Senior Full Stack Web Developer in Gilgit, Pakistan"
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
              <strong>{SITE.names[2]}</strong> — a senior full stack web
              developer and digital designer from {SITE.location}. I founded{" "}
              {SITE.studio} to bring professional web design and development
              services to businesses in Gilgit-Baltistan, Pakistan and beyond.
            </p>
            <p>
              I&apos;ve designed and delivered 50+ websites and web
              applications for startups, tourism companies, and businesses —
              covering everything from branding and UI/UX to custom web design
              and full stack development.
            </p>
            <p>
              My approach is professional and process-driven: understand the
              business, design with the user in mind, and engineer products
              that are fast, secure, scalable, and easy to maintain. When
              I&apos;m not coding, you&apos;ll find me exploring the
              mountains, drawing, or capturing the landscapes of
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