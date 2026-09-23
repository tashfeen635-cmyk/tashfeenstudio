import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import SkillsShowcase from "@/components/SkillsShowcase";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Skills - Tashfeen Riaz, Senior Full Stack Web Developer in Gilgit",
  description:
    "Technologies Tashfeen Riaz uses to build real products: React, Next.js, TypeScript, Node.js, PHP, Laravel, Django, PostgreSQL, MongoDB, Docker, web security, and AI & LLM integration.",
  alternates: { canonical: "/skills" },
  openGraph: { url: `${SITE.url}/skills`, type: "website" },
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        title="What I Build With"
        lead="Technologies I use to design, build, integrate, secure, and ship modern web applications."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
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
    </>
  );
}