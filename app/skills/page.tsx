import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import SkillsShowcase from "@/components/SkillsShowcase";
import JsonLd from "@/components/JsonLd";
import { SITE, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Web Developer Skills & Tech Stack in Gilgit, Pakistan",
  description:
    "Technical skills of full stack web developer Tashfeen Riaz: React, Next.js, TypeScript, Node.js, Laravel, Django, PostgreSQL, MongoDB, Docker, and AI integration.",
  alternates: { canonical: "/skills" },
  openGraph: {
    url: `${SITE.url}/skills`,
    type: "website",
    title: "Web Developer Skills & Tech Stack in Gilgit, Pakistan",
    description:
      "React, Next.js, TypeScript, Node.js, Laravel, Django, PostgreSQL, MongoDB, Docker, and AI integration skills behind every full stack project.",
    images: [OG_IMAGE],
  },
};

function skillsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE.url}/skills`,
    name: "Technical Skills of Tashfeen Riaz",
    mainEntity: {
      "@type": "Person",
      name: SITE.name,
      jobTitle: SITE.role,
      url: `${SITE.url}/about`,
      knowsAbout: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Bootstrap",
        "Node.js",
        "Express.js",
        "PHP",
        "Laravel",
        "Django",
        "REST API Design",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "Prisma",
        "Docker",
        "Git",
        "GitHub",
        "Vercel",
        "Web Security",
        "API Security",
        "Figma",
        "UI/UX Design",
        "Design Systems",
        "AI & LLM Integration",
        "AI Chatbots",
        "SaaS Development",
      ],
    },
  };
}

export default function SkillsPage() {
  return (
    <>
      <JsonLd data={skillsJsonLd()} />

      <PageHeader
        title="Skills &amp; Technologies"
        lead="The technical skills behind every project - front-end, back-end, databases, design, DevOps, and AI integration."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <p className="section-lead">
            I am a full stack web developer, which means I can take a project
            from the first wireframe all the way to a deployed, secure,
            production database. Most of my{" "}
            <Link href="/work">client work</Link> uses the stack below, and I
            adapt the choice to the problem rather than the other way round - a
            brochure site does not need a microservices architecture, and a SaaS
            dashboard certainly does. See how each of these fits into a{" "}
            <Link href="/services">concrete deliverable</Link>.
          </p>
          <SkillsShowcase />
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Approach" title="How I Work" />
          <div className="features-grid">
            {[
              {
                icon: "/images/svg/001-options.svg",
                title: "Build",
                desc: "I write production-grade, maintainable code - components, APIs, and data models engineered to work together as one product.",
              },
              {
                icon: "/images/svg/006-goal.svg",
                title: "Integrate & Secure",
                desc: "Authentication, payments, LLM/AI services, and third-party tools are wired in with security best practices and input validation throughout.",
              },
              {
                icon: "/images/svg/005-line-chart.svg",
                title: "Ship & Maintain",
                desc: "Deployment, CI/CD, performance monitoring, and ongoing support so your product stays fast, secure, and up to date after launch.",
              },
            ].map((s) => (
              <div className="feature-card" key={s.title}>
                <img src={s.icon} alt="" width={45} height={45} loading="lazy" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading tag="Standards" title="Non-Negotiables" />
          <div className="stories-grid">
            {[
              {
                t: "Performance First",
                d: "Server-rendered pages, optimised images, and minimal client JavaScript. I target 90+ on Google Lighthouse and a Largest Contentful Paint under 2.5 seconds, because speed is a ranking factor and a conversion factor.",
              },
              {
                t: "Search Engine Ready",
                d: "Every project ships with clean semantic markup, XML sitemaps, robots configuration, canonical URLs, Open Graph tags, and structured data - not bolted on afterwards, but built in from the start.",
              },
              {
                t: "Mobile & Accessible",
                d: "Mobile-first layouts designed and tested across real device widths, with semantic HTML, keyboard navigation, and sufficient colour contrast so the site works for everyone.",
              },
              {
                t: "Secure by Default",
                d: "Input validation on every input, parameterised queries against SQL injection, hashed credentials, environment-based secrets, and dependency audits - reviewed against OWASP guidance.",
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
            Questions about whether a specific technology fits your project? Ask
            me directly, or read more about{" "}
            <Link href="/about">how I work with clients</Link> before we start.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/contact">
              Discuss Your Project
            </Link>
            <Link className="btn" href="/work">
              See The Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
