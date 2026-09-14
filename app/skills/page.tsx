import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { SITE, SKILLS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Skills - Tashfeen Riaz, Full Stack Web Developer in Gilgit",
  description:
    "Web development and design skills of Tashfeen Riaz: HTML/CSS, WordPress, Shopify, UI/UX, JavaScript, responsive design, Figma, Bootstrap.",
  alternates: { canonical: "/skills" },
  openGraph: { url: `${SITE.url}/skills`, type: "website" },
};

const TOOLKIT = [
  { group: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "React", "Responsive Design"] },
  { group: "Backend & Platforms", items: ["WordPress", "Shopify / Liquid", "SaaS Platforms", "Node.js"] },
  { group: "Design", items: ["Figma", "Adobe Photoshop", "Illustrator", "UI/UX Design", "Wireframing", "Prototyping"] },
  { group: "Engineering", items: ["SEO", "Website Speed Optimization", "Clean Code", "Cross-Browser Testing"] },
];

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        title="My Skills"
        lead="The tools and technologies I use to design, build, and ship modern websites and web applications."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="skills-grid">
            {SKILLS.map((skill) => (
              <div key={skill.label}>
                <span className="skill-number">{skill.value}%</span>
                <span className="skill-label">{skill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Toolkit" title="What I Use" />
          <div className="features-grid">
            {TOOLKIT.map((g) => (
              <div className="feature-card" key={g.group}>
                <h3>{g.group}</h3>
                <p>
                  {g.items.map((i) => `• ${i}`).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}