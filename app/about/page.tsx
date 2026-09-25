import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import Testimonials from "@/components/Testimonials";
import { SITE, OG_IMAGE, personJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Me - Full Stack Web Developer in Gilgit, Pakistan",
  description:
    "Meet Tashfeen Riaz, a senior full stack web developer and UI/UX designer from Gilgit, Pakistan, and founder of Tashu's Studio. 50+ websites and applications delivered.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: `${SITE.url}/about`,
    type: "profile",
    title: "About Tashfeen Riaz - Full Stack Web Developer in Gilgit, Pakistan",
    description:
      "Tashfeen Riaz is a senior full stack web developer and UI/UX designer from Gilgit, Pakistan, and founder of Tashu's Studio.",
    images: [OG_IMAGE],
  },
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

function aboutPageJsonLd() {
  return {
    ...personJsonLd(),
    "@type": "AboutPage",
    url: `${SITE.url}/about`,
    mainEntity: {
      "@type": "Person",
      name: SITE.name,
      alternateName: SITE.names,
      jobTitle: SITE.role,
      url: `${SITE.url}/about`,
      email: SITE.email,
      telephone: SITE.phoneRaw,
      worksFor: { "@type": "Organization", name: SITE.studio },
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.locality,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
      knowsAbout: [
        "Full Stack Web Development",
        "Web Design",
        "UI/UX Design",
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "PHP",
        "Laravel",
        "Django",
        "REST API Design",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "Web Security",
        "AI & LLM Integration",
        "SaaS Development",
      ],
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageJsonLd()} />

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
            <SectionHeading title="Who I Am" />

            <p>
              I&apos;m {SITE.name} — better known online as{" "}
              <strong>{SITE.names[2]}</strong> — a senior full stack web
              developer and digital designer from {SITE.location}. I founded{" "}
              {SITE.studio} to bring professional web design and development
              services to businesses in Gilgit-Baltistan, Pakistan and beyond.
            </p>
            <p>
              I&apos;ve designed and delivered 50+ websites and web applications
              for startups, tourism companies, and businesses — covering
              everything from branding and UI/UX to custom web design and full
              stack development. My clients have ranged from{" "}
              <Link href="/work">tourism operators and local brands</Link> to
              construction companies and corporate groups, each with a different
              audience and a different idea of what a website needed to achieve.
            </p>
            <p>
              My approach is professional and process-driven: understand the
              business, design with the user in mind, and engineer products that
              are fast, secure, scalable, and easy to maintain. Performance and
              search visibility are not afterthoughts — every project I deliver
              ships with technical SEO, structured data, and analytics already
              built in. When I&apos;m not coding, you&apos;ll find me exploring
              the mountains, drawing, or capturing the landscapes of
              Gilgit-Baltistan in my{" "}
              <Link href="/stories">stories and photographs</Link>.
            </p>

            <SectionHeading title="Personal Details" />
            <ul className="about-facts">
              {FACTS.map((f) => (
                <li key={f.k}>
                  <b>{f.k}</b> <span>{f.v}</span>
                </li>
              ))}
            </ul>

            <SectionHeading title="Interests" />
            <div className="tech-grid">
              {INTERESTS.map((i) => (
                <div className="tech-card" key={i}>
                  <span className="tech-mono" aria-hidden="true">
                    •
                  </span>
                  <div className="tech-copy">
                    <h4>{i}</h4>
                  </div>
                </div>
              ))}
            </div>

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

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Experience" title="How I Work With Clients" />
          <div className="stories-grid">
            {[
              {
                t: "Understand the business first",
                d: "Before any design or code, I ask what the business actually needs from a website. Leads, bookings, sales, credibility - the goal determines everything else, including which pages you need and which you should delete.",
              },
              {
                t: "Design to be approved, not assumed",
                d: "You see the design before it is built. Revisions happen at the cheap stage, on a mockup, rather than after a full build has already been written against a layout you never signed off.",
              },
              {
                t: "Build it properly the first time",
                d: "Clean, documented, production-grade code with semantic markup, responsive layouts, and security best practices. No page builders left patched together, no plugin bloat, and nothing held together by hope.",
              },
              {
                t: "Launch, then keep improving",
                d: "Deployment, analytics, search console setup, and post-launch maintenance. A website is not a one-off deliverable - it needs upkeep to stay fast, secure, and relevant.",
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

      <section className="section">
        <div className="container">
          <SectionHeading tag="Testimonials" title="What Clients Say" />
          <Testimonials />
          <p className="section-lead">
            Curious what the work actually involves? Read through my{" "}
            <Link href="/services">services and pricing</Link>, the{" "}
            <Link href="/skills">technologies I build with</Link>, or browse the{" "}
            <Link href="/work">portfolio</Link> before you decide.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/contact">
              Start a Project
            </Link>
            <Link className="btn" href="/services">
              View My Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
