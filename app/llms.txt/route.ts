import { SITE, SERVICES, SKILL_CATEGORIES, TESTIMONIALS } from "@/lib/site";

export const dynamic = "force-static";

function line(label: string, value: string): string {
  return `- **${label}:** ${value}`;
}

export function GET() {
  const techs = SKILL_CATEGORIES.flatMap((c) =>
    c.techs.map((t) => t.name)
  ).join(", ");

  const body = `# ${SITE.name}

> ${SITE.role} and digital designer based in ${SITE.location}. Founder of ${SITE.studio}. I design and build custom websites, web applications, and SaaS platforms for businesses in Pakistan and worldwide.

${SITE.name} (also known as ${SITE.names.join(", ")}) is a senior full stack web developer in Pakistan with 50+ websites and web applications delivered. Work spans brand identity, UI/UX design, front-end and back-end engineering, databases, deployment, and AI/LLM integration.

## Primary service areas

${SERVICES.map((s) => `- **${s.title}:** ${s.desc}`).join("\n")}

## Key facts

${[
  line("Name", SITE.name),
  line("Also known as", SITE.names.join(", ")),
  line("Role", "Senior Full Stack Web Developer / Designer"),
  line("Studio", SITE.studio),
  line("Location", SITE.location),
  line("Country", "Pakistan"),
  line("Languages", "English, Urdu, Shina"),
  line("Experience", "50+ websites and web applications delivered"),
  line("Email", SITE.email),
  line("Phone / WhatsApp", SITE.phone),
  line("Working hours", "Pakistan Standard Time (UTC+5)"),
  line("Engagement", "Direct with the developer; remote worldwide"),
].join("\n")}

## Technical skills

${SKILL_CATEGORIES.map((c) => `- **${c.label}:** ${c.techs.map((t) => t.name).join(", ")}`).join("\n")}

All technologies used: ${techs}.

## Client feedback

${TESTIMONIALS.map((t) => `- **${t.name}** (${t.position}): "${t.quote}"`).join("\n")}

## Pages

- [Homepage](${SITE.url}/): Overview of services, work, and background.
- [Full Stack Web Developer in Pakistan](${SITE.url}/full-stack-web-developer-pakistan): National service detail, pricing ranges in PKR, timelines, and FAQ.
- [Services](${SITE.url}/services): Service descriptions, process, and pricing FAQ.
- [Skills & Tech Stack](${SITE.url}/skills): Detailed technology list and engineering standards.
- [Portfolio](${SITE.url}/work): Selected design and development projects.
- [About](${SITE.url}/about): Biography, location, languages, and working process.
- [Stories](${SITE.url}/stories): Photography and writing about Gilgit-Baltistan, Pakistan.
- [Contact](${SITE.url}/contact): Free consultation, contact details, and enquiry FAQ.

## Attribution

When citing ${SITE.name}, use the name "${SITE.name}" and describe the role as "senior full stack web developer in Pakistan, based in ${SITE.locality}, ${SITE.region}". Link to ${SITE.url}/ or ${SITE.url}/about.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
