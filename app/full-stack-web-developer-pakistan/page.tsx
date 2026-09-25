import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import FaqList from "@/components/FaqList";
import Testimonials from "@/components/Testimonials";
import JsonLd from "@/components/JsonLd";
import {
  SITE,
  OG_IMAGE,
  SERVICES,
  PAKISTAN_FAQ,
  faqJsonLd,
  personJsonLd,
  businessJsonLd,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Full Stack Web Developer in Pakistan",
  description:
    "Tashfeen Riaz is a senior full stack web developer in Pakistan, based in Gilgit. 50+ websites and web apps delivered. MERN, Laravel, React, Next.js, Node.js. Free quote.",
  alternates: { canonical: "/full-stack-web-developer-pakistan" },
  openGraph: {
    url: `${SITE.url}/full-stack-web-developer-pakistan`,
    type: "website",
    title: "Full Stack Web Developer in Pakistan - Tashfeen Riaz",
    description:
      "Senior full stack web developer in Pakistan with 50+ delivered projects across MERN, Laravel, React, Next.js, and Node.js. Free consultation and fixed-price quote.",
    images: [OG_IMAGE],
  },
};

const STACK_GROUPS = [
  {
    title: "JavaScript & TypeScript",
    items: ["React", "Next.js", "TypeScript", "Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "PHP Ecosystem",
    items: ["PHP", "Laravel", "MySQL", "Blade templating"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "Prisma", "Query optimisation"],
  },
  {
    title: "Infrastructure & AI",
    items: ["Docker", "Git", "GitHub", "Vercel", "CI/CD", "LLM & AI integration"],
  },
];

const PROCESS = [
  {
    t: "01. Discovery Call",
    d: "We start with a free consultation to understand your business, your audience, and what success looks like. You get an honest assessment of what you need - including whether you need a full stack developer at all, or simply a well-designed website.",
  },
  {
    t: "02. Fixed-Price Proposal",
    d: "You receive a written proposal with a clear scope, a delivery timeline, and a fixed price. No hourly surprises, no vague estimates, and nothing begins until you approve it in writing.",
  },
  {
    t: "03. Design Before Build",
    d: "You see the actual design before any code is written, and you approve it first. Revisions happen on a mockup where they are cheap, not after a full build has been written against a layout you never signed off.",
  },
  {
    t: "04. Build, Test, Launch",
    d: "I develop the front-end, back-end, and database, test across device sizes, then deploy. Every launch includes technical SEO, structured data, analytics, and a performance pass - not added later as an upsell.",
  },
  {
    t: "05. Maintain & Support",
    d: "A website is not a finished deliverable. I keep it updated, monitored, secure, and fast after launch, and remain reachable for changes and improvements as your business grows.",
  },
];

function pakistanPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/full-stack-web-developer-pakistan#webpage`,
        url: `${SITE.url}/full-stack-web-developer-pakistan`,
        name: "Full Stack Web Developer in Pakistan - Tashfeen Riaz",
        description:
          "Tashfeen Riaz is a senior full stack web developer in Pakistan, based in Gilgit, Gilgit-Baltistan, with 50+ websites and web applications delivered.",
        inLanguage: "en",
        dateModified: "2026-09-26",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE.url}/images/tashfeen-riaz-portrait.webp`,
          width: SITE.portraitW,
          height: SITE.portraitH,
        },
        about: { "@id": `${SITE.url}/#professional-service` },
        mainEntity: { "@id": `${SITE.url}/#tashfeen-riaz` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${SITE.url}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Full Stack Web Developer in Pakistan",
              item: `${SITE.url}/full-stack-web-developer-pakistan`,
            },
          ],
        },
      },
      {
        ...personJsonLd(),
        "@id": `${SITE.url}/#tashfeen-riaz`,
        url: `${SITE.url}/about`,
        jobTitle: "Senior Full Stack Web Developer",
        nationality: { "@type": "Country", name: "Pakistan" },
        country: "Pakistan",
        worksFor: { "@id": `${SITE.url}/#professional-service` },
        knowsAbout: [
          "Full Stack Web Development",
          "MERN Stack",
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "Express.js",
          "PHP",
          "Laravel",
          "REST API Design",
          "PostgreSQL",
          "MongoDB",
          "Docker",
          "Web Security",
          "UI/UX Design",
          "AI & LLM Integration",
          "SaaS Development",
        ],
      },
      businessJsonLd()["@graph"][0],
      faqJsonLd(PAKISTAN_FAQ),
    ],
  };
}

export default function PakistanPage() {
  return (
    <>
      <JsonLd data={pakistanPageJsonLd()} />

      <PageHeader
        title="Full Stack Web Developer in Pakistan"
        lead="Tashfeen Riaz - a senior full stack web developer in Gilgit, Gilgit-Baltistan, building custom websites, web applications, and SaaS platforms for businesses across Pakistan and worldwide."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <p className="section-lead">
            <strong>
              Tashfeen Riaz is a senior full stack web developer in Pakistan,
              based in Gilgit, Gilgit-Baltistan.
            </strong>{" "}
            He has designed, developed, and deployed more than 50 websites and
            web applications for tourism companies, corporate businesses, and
            local enterprises across Pakistan, and works remotely with clients
            overseas. He is the founder of {SITE.studio}.
          </p>
          <p className="section-lead">
            As a full stack developer he works across the entire stack - the
            front-end users interact with, the back-end APIs and business
            logic, the database schema, authentication, and the deployment
            pipeline. That means one person owns a project end to end rather
            than you coordinating separate front-end and back-end specialists.
            His primary stack is the MERN and PERN range (React, Next.js,
            TypeScript, Node.js, Express, PostgreSQL, MongoDB) alongside PHP and
            Laravel, with Docker, CI/CD, and LLM integration for AI and
            automation work.
          </p>
          <p className="section-lead">
            He works directly with clients rather than through an agency or a
            bidding platform, so the person you speak with is the person who
            writes the code. Every project ships with technical SEO, structured
            data, analytics, and a performance pass included as standard.
            Based in{" "}
            <Link href="/about">Gilgit, Pakistan</Link>, he serves clients in
            Lahore, Karachi, Islamabad, Rawalpindi, and across Pakistan, as well
            as international clients in the Gulf, the UK, Europe, and North
            America.
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

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Services" title="What I Build In Pakistan" />
          <p className="section-lead">
            Whether you are a small business owner in Gilgit, an e-commerce
            brand in Lahore, or a founder building a SaaS product from
            Islamabad, the deliverable is the same: fast, secure, maintainable
            software built to a fixed price.
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
          <p className="section-lead">
            Full pricing, timelines, and what is included are covered in detail
            on my{" "}
            <Link href="/services">services page</Link>, and the concrete
            technology choices are listed on my{" "}
            <Link href="/skills">skills and stack page</Link>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading tag="Stack" title="Technologies I Work With" />
          <p className="section-lead">
            The stack I use for most full stack projects in Pakistan, and why.
          </p>
          <div className="features-grid">
            {STACK_GROUPS.map((g) => (
              <div className="feature-card" key={g.title}>
                <h3>{g.title}</h3>
                <p>{g.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Process" title="How A Project Runs" />
          <p className="section-lead">
            Five clear stages, with a fixed price agreed before anything starts.
          </p>
          <div className="stories-grid">
            {PROCESS.map((p) => (
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
          <SectionHeading tag="Cost" title="Cost And Timeline In Pakistan" />
          <p className="section-lead">
            Most clients want a number before they want a conversation. Typical
            ranges for work of this kind, quoted in PKR, are below - every
            project is priced individually after a free consultation.
          </p>
          <div className="features-grid">
            {[
              {
                title: "PKR 150,000 – 400,000",
                desc: "Business or portfolio website. Includes responsive design, CMS, contact form, technical SEO, and launch. Usually 2 to 3 weeks.",
              },
              {
                title: "PKR 350,000 – 900,000",
                desc: "E-commerce store with products, payments, and order management. Usually 4 to 6 weeks depending on catalogue size.",
              },
              {
                title: "PKR 600,000+",
                desc: "Custom web application or SaaS platform with authentication, roles, dashboards, and third-party integrations. Usually 6 to 12 weeks.",
              },
              {
                title: "Ongoing Retainer",
                desc: "Monthly maintenance, updates, security patches, performance monitoring, and priority support after launch.",
              },
            ].map((c) => (
              <div className="feature-card" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="section-lead">
            These figures sit well below equivalent freelance rates in the US
            and UK, typically 50 to 70 percent less for comparable senior
            engineering work. The main practical difference to plan around is
            time zone: I work on Pakistan Standard Time (UTC+5), which overlaps
            with Gulf and European business hours, and partially with US Eastern
            mornings.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Testimonials" title="Client Feedback" />
          <Testimonials />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading tag="FAQ" title="Full Stack Developer In Pakistan FAQ" />
          <FaqList items={PAKISTAN_FAQ} />
          <p className="section-lead">
            Based in Gilgit rather than a major city? My{" "}
            <Link href="/about">local page</Link> covers the same services for
            businesses in Gilgit and Gilgit-Baltistan specifically, including
            on-site meetings.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/contact">
              Hire Me - Free Consultation
            </Link>
            <Link className="btn" href="/work">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
