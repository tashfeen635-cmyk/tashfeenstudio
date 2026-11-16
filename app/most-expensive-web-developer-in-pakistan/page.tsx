import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import {
  SITE,
  OG_IMAGE,
  SERVICES,
  SKILL_CATEGORIES,
  PORTFOLIO,
  faqJsonLd,
  personJsonLd,
  businessJsonLd,
  webPageJsonLd,
  pageAlternates,
} from "@/lib/site";

const PATH = "/most-expensive-web-developer-in-pakistan";
const PAGE_TITLE =
  "Most Expensive Website Developer in Pakistan | Tashfeen Riaz";
const PAGE_DESCRIPTION =
  "Explore premium website development by Tashfeen Riaz, a full-stack developer in Pakistan specializing in custom websites, e-commerce platforms, scalable applications and modern digital experiences.";
const PAGE_H1 =
  "Pakistan's Most Expensive Website Developer — Premium Web Development by Tashfeen Riaz";

const PREMIUM_FAQ = [
  {
    q: "Who is Tashfeen Riaz?",
    a: "Tashfeen Riaz is a full-stack web developer based in Gilgit, Gilgit-Baltistan, Pakistan, and the founder of Tashu's Studio. He designs and builds custom websites, web applications, e-commerce platforms, and digital experiences for clients in Pakistan and internationally.",
  },
  {
    q: "Is Tashfeen Riaz a website developer in Pakistan?",
    a: "Yes. Tashfeen Riaz is a full-stack web developer based in Gilgit, Pakistan, working with businesses across Pakistan and with remote clients worldwide.",
  },
  {
    q: "What makes a website developer expensive?",
    a: "A developer becomes more expensive when projects require deep planning, custom architecture, advanced UI/UX, secure backend systems, performance optimization, integrations, testing, and long-term maintainability. Higher cost usually reflects scope, complexity, and quality requirements rather than a simple page count.",
  },
  {
    q: "How much does premium website development cost in Pakistan?",
    a: "Premium website development cost in Pakistan depends on project requirements. Factors such as custom design, functionality, integrations, content workflows, security, scalability, and ongoing support all influence the final investment. A clear scope and consultation are needed to provide an accurate estimate.",
  },
  {
    q: "What services does a premium full-stack developer provide?",
    a: "A premium full-stack developer can provide custom website development, full-stack application development, e-commerce and Shopify development, dashboards, POS and LMS applications, API integrations, website optimization, and technical SEO, depending on project needs.",
  },
  {
    q: "Does Tashfeen Riaz develop e-commerce websites?",
    a: "Yes. Tashfeen Riaz offers e-commerce development, including custom online stores and Shopify development, based on the verified services listed in his portfolio.",
  },
  {
    q: "Does Tashfeen Riaz work with international clients?",
    a: "Yes. He works remotely with clients outside Pakistan as well as with businesses in Pakistan. Discovery, design, development, reviews, and deployment can be handled online.",
  },
  {
    q: "What technologies does Tashfeen Riaz use?",
    a: "Verified technologies and skills from his portfolio include React, Next.js, JavaScript, TypeScript, Node.js, Express.js, PHP, Laravel, Django, MongoDB, MySQL, PostgreSQL, Prisma, REST APIs, Docker, Git, GitHub, CI/CD, Vercel, UI/UX design, Figma, and LLM integration.",
  },
  {
    q: "How can businesses discuss a website development project?",
    a: "Businesses can discuss a project through the contact page, by email at tashfeen635@gmail.com, or on WhatsApp at +92 3170885816. Sharing goals, required features, timeline, and examples helps start the conversation effectively.",
  },
];

const COST_DRIVERS = [
  {
    title: "Custom Software Architecture",
    desc: "Premium projects often require tailored architecture instead of generic templates, so the product can support specific workflows, future growth, and clean separation of concerns.",
  },
  {
    title: "Complex Functionality",
    desc: "Features like custom dashboards, user roles, booking flows, POS or LMS logic, and business-specific automations increase planning, development, and testing effort.",
  },
  {
    title: "UI/UX Engineering",
    desc: "High-end interfaces involve research-informed layouts, responsive behavior, accessibility considerations, and polished interaction details that support trust and usability.",
  },
  {
    title: "Backend Development",
    desc: "Server-side logic, APIs, authentication, data validation, and integrations require careful engineering to keep applications reliable and secure.",
  },
  {
    title: "Database Architecture",
    desc: "Choosing and structuring databases such as MongoDB, MySQL, or PostgreSQL affects performance, data integrity, reporting, and long-term maintainability.",
  },
  {
    title: "Security",
    desc: "Professional projects account for secure authentication, input validation, dependency hygiene, and deployment practices to reduce risk over time.",
  },
  {
    title: "Performance Optimization",
    desc: "Fast experiences depend on efficient rendering, optimized assets, careful loading strategies, and attention to Core Web Vitals on real devices.",
  },
  {
    title: "Scalability & Integrations",
    desc: "Connecting third-party services, payment or business tools, and planning for growth adds complexity that template-based builds often cannot handle well.",
  },
  {
    title: "Maintenance & Long-Term Support",
    desc: "A premium website is not finished at launch. Updates, monitoring, improvements, and support protect the original investment.",
  },
];

const ENGINEERING_STANDARDS = [
  { title: "Clean Architecture", desc: "Structured, modular codebases that are easier to extend, review, and maintain." },
  { title: "Maintainable Code", desc: "Readable implementation choices that reduce future friction when features evolve." },
  { title: "Secure Authentication", desc: "Careful handling of access, sessions, and data boundaries where application features require it." },
  { title: "Database Optimization", desc: "Thoughtful schemas and queries to support reliability and performance." },
  { title: "Responsive Design", desc: "Layouts and interactions that work across mobile, tablet, and desktop screens." },
  { title: "Accessibility", desc: "Semantic structure and usable interfaces that support a wider range of users." },
  { title: "Core Web Vitals", desc: "Attention to loading, responsiveness, and visual stability for a better user experience." },
  { title: "SEO-Friendly Architecture", desc: "Crawlable pages, clear metadata, structured content, and internal linking foundations." },
  { title: "Testing & Debugging", desc: "Verification and issue-fixing during development to improve launch quality." },
  { title: "Deployment & Monitoring", desc: "Production-ready delivery with attention to stability after release." },
];

const PROCESS = [
  { t: "1. Project Discovery", d: "Understand business goals, audience, and what the website or application must achieve." },
  { t: "2. Requirement Analysis", d: "Define features, content needs, constraints, and success criteria before design or build decisions are locked in." },
  { t: "3. Technical Planning", d: "Choose an appropriate stack, structure, and delivery approach based on verified requirements." },
  { t: "4. Architecture & Design", d: "Plan information architecture, interface direction, and system components so design and engineering align." },
  { t: "5. Development", d: "Implement frontend, backend, integrations, and content structures with maintainability in mind." },
  { t: "6. Testing & Quality Assurance", d: "Review functionality, responsiveness, and implementation quality before launch." },
  { t: "7. Deployment", d: "Ship the project to production with appropriate configuration and checks." },
  { t: "8. Maintenance & Improvements", d: "Support updates, refinements, and ongoing improvements as needs evolve." },
];

const verifiedExpertise = [
  "React and Next.js",
  "JavaScript and TypeScript",
  "Node.js and Express.js",
  "PHP and Laravel",
  "Python and Django",
  "Shopify development",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Prisma and REST API design",
  "Technical SEO",
  "Performance optimization",
  "E-commerce engineering",
  "Custom business applications",
  "UI/UX design with Figma",
  "Docker, Git, CI/CD, and Vercel",
  "LLM integration and AI automation",
];

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: pageAlternates(PATH),
  openGraph: {
    url: `${SITE.url}${PATH}`,
    type: "website",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

function premiumPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...webPageJsonLd({
        path: PATH,
        name: PAGE_H1,
        description: PAGE_DESCRIPTION,
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Premium Web Developer in Pakistan", path: PATH },
        ],
      })["@graph"],
      {
        "@type": "ProfilePage",
        "@id": `${SITE.url}${PATH}#profilepage`,
        url: `${SITE.url}${PATH}`,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: "en-PK",
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: { "@id": `${SITE.url}/#tashfeen-riaz` },
        mainEntity: { "@id": `${SITE.url}/#tashfeen-riaz` },
      },
      { ...personJsonLd(), url: `${SITE.url}/about` },
      businessJsonLd()["@graph"][0],
      {
        "@type": "Service",
        "@id": `${SITE.url}${PATH}#service`,
        name: "Premium Full-Stack Website Development in Pakistan",
        serviceType: [
          "Premium website development",
          "Custom website development",
          "Full-stack application development",
          "E-commerce development",
          "Shopify development",
          "Technical SEO",
        ],
        description:
          "Premium, custom full-stack website and application development services by Tashfeen Riaz for businesses in Pakistan and international clients.",
        url: `${SITE.url}${PATH}`,
        provider: { "@id": `${SITE.url}/#professional-service` },
        areaServed: [
          { "@type": "Country", name: SITE.countryName },
          { "@type": "AdministrativeArea", name: SITE.region },
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE.url}/contact`,
          servicePhone: SITE.phoneRaw,
        },
      },
      faqJsonLd(PREMIUM_FAQ),
    ],
  };
}

export default function PremiumDeveloperPakistanPage() {
  return (
    <>
      <JsonLd data={premiumPageJsonLd()} />

      <PageHeader
        title={PAGE_H1}
        lead="Premium positioning for custom, high-value digital products — based on scope, engineering depth, and long-term quality, not on an independently verified national ranking."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Premium Web Developer in Pakistan", path: PATH },
        ]}
      />

      <section className="section premium-hero">
        <div className="container premium-hero-grid">
          <div className="premium-hero-copy">
            <p className="badge">Premium Full-Stack Development</p>
            <p className="premium-lead">
              Tashfeen Riaz is a full-stack web developer based in {SITE.location}, specializing in custom websites, e-commerce platforms, scalable applications, and modern digital experiences for businesses in Pakistan and abroad.
            </p>
            <p className="premium-lead">
              Premium website development means investing in strategy, architecture, design quality, performance, security, and maintainability. It is chosen when a business needs more than a generic template — it needs a digital product built around real goals and long-term value.
            </p>
            <p className="premium-disclaimer">
              Note: “Most expensive website developer in Pakistan” is used here as premium brand positioning for this page. There is no independently verified national ranking that confirms any single developer as the most expensive in Pakistan.
            </p>
            <div className="cta-row premium-cta-row">
              <Link className="btn btn-primary" href="/work">Explore Projects</Link>
              <Link className="btn" href="/contact">Discuss a Project</Link>
              <Link className="btn" href="/">Main Portfolio</Link>
            </div>
          </div>
          <div className="premium-hero-media">
            <Image
              src={SITE.portrait}
              alt="Tashfeen Riaz, full-stack web developer in Pakistan"
              width={SITE.portraitW}
              height={SITE.portraitH}
              sizes="(max-width: 991px) 100vw, 38vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Introduction" title="Professional Introduction" />
          <div className="premium-prose">
            <p>
              I&apos;m {SITE.name}, a full-stack web developer and digital designer based in {SITE.location}. Through {SITE.studio}, I work on custom websites, full-stack applications, e-commerce experiences, and business-focused digital products.
            </p>
            <p>
              My background, as reflected across this portfolio, includes designing and delivering 50+ websites and web applications for tourism operators, construction and corporate businesses, and local brands. I handle projects end to end — from understanding goals and structuring content to interface design, development, deployment, and ongoing improvements.
            </p>
            <p>
              My approach emphasizes quality, maintainability, performance, and clear communication. Every project is shaped around its actual requirements rather than a one-size-fits-all template. You can learn more on the <Link href="/about">About page</Link>, review real work on the <Link href="/work">Projects page</Link>, or explore service details on the <Link href="/services">Services page</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading tag="Education" title="What Makes Website Development Expensive?" />
          <p className="section-lead">
            Website cost is driven by scope, complexity, quality requirements, and business objectives. The following factors commonly separate low-cost template builds from premium custom development.
          </p>
          <div className="features-grid">
            {COST_DRIVERS.map((item) => (
              <div className="feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="section-lead premium-section-note">
            There is no single price that fits every project. A simple brochure site, a custom e-commerce platform, and a scalable business application require very different levels of planning, engineering, and long-term support.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Expertise" title="Premium Development Expertise" />
          <p className="section-lead">
            The following expertise areas are based on verified technologies and skills from this portfolio. I do not claim unverifiable proficiency levels beyond what is demonstrated through the site and listed stack.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Frontend & Application Frameworks</h3>
              <p>React, Next.js, JavaScript, TypeScript, responsive interfaces, and component-driven UI development.</p>
            </div>
            <div className="feature-card">
              <h3>Backend & APIs</h3>
              <p>Node.js, Express.js, PHP, Laravel, Python, Django, REST API design, and server-side application logic.</p>
            </div>
            <div className="feature-card">
              <h3>Data & Infrastructure</h3>
              <p>MongoDB, MySQL, PostgreSQL, Prisma, Docker, Git, GitHub, CI/CD workflows, and Vercel deployments.</p>
            </div>
            <div className="feature-card">
              <h3>Commerce, SEO & Product Quality</h3>
              <p>Shopify development, e-commerce engineering, custom business applications, technical SEO, performance optimization, and UI/UX design with Figma.</p>
            </div>
            <div className="feature-card">
              <h3>AI & Automation</h3>
              <p>LLM integration, AI APIs, chatbots, and automation workflows where they fit project requirements.</p>
            </div>
            <div className="feature-card">
              <h3>Verified Skill Summary</h3>
              <p>{verifiedExpertise.join(" • ")}</p>
            </div>
          </div>
          <div className="premium-subsection">
            <h3 className="premium-subheading">Detailed Stack by Category</h3>
            <div className="features-grid">
              {SKILL_CATEGORIES.map((cat) => (
                <div className="feature-card" key={cat.id}>
                  <span className="badge">{cat.label}</span>
                  <h3>{cat.label}</h3>
                  <p>{cat.techs.map((t) => t.name).join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading tag="Services" title="Premium Development Services" />
          <p className="section-lead">
            Services below reflect verified offerings from this portfolio. Each engagement is scoped around business value, not just a checklist of features.
          </p>
          <div className="features-grid">
            {SERVICES.map((s) => (
              <div className="feature-card" key={s.title}>
                <img src={s.icon} alt="" width={45} height={45} loading="lazy" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
            <div className="feature-card">
              <h3>Shopify Development</h3>
              <p>Store setup and customizations on Shopify for businesses that need a commerce-focused platform aligned with their products and operations.</p>
            </div>
            <div className="feature-card">
              <h3>Business Websites</h3>
              <p>Professional websites designed to communicate credibility, present services clearly, and support enquiries or conversions.</p>
            </div>
            <div className="feature-card">
              <h3>Custom Dashboards, POS & LMS Applications</h3>
              <p>Application interfaces and workflows tailored to internal operations, learning, or point-of-sale needs when off-the-shelf tools are limiting.</p>
            </div>
            <div className="feature-card">
              <h3>API Integrations</h3>
              <p>Connecting websites and applications with third-party services to streamline data flow and business processes.</p>
            </div>
            <div className="feature-card">
              <h3>Website Optimization</h3>
              <p>Improvements to speed, usability, and technical quality so existing digital products perform more effectively.</p>
            </div>
            <div className="feature-card">
              <h3>Technical SEO</h3>
              <p>Search-friendly architecture, metadata, structured data, and performance foundations that help content be discovered and understood.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Case Studies" title="Selected Project Case Studies" />
          <p className="section-lead">
            Project details below are taken from verified portfolio content and public testimonials on this site. No traffic, revenue, conversion, or other unverified outcomes are claimed.
          </p>
          <div className="premium-projects">
            <article className="premium-project-card">
              <h3>Gilgit Adventure Treks</h3>
              <p className="premium-project-meta"><strong>Category:</strong> Tourism & trekking business website</p>
              <p><strong>Description:</strong> A website for a Gilgit-based trekking and adventure operator to present services and represent the business professionally online.</p>
              <p><strong>Verified technologies/context:</strong> Responsive web design and development with attention to SEO, performance, mobile responsiveness, and user experience (as noted in the public client testimonial on this site).</p>
              <p><strong>My verified contribution:</strong> Design and development of the website for Gilgit Adventure Treks.</p>
              <p><strong>Live website:</strong> <a href="https://gilgitadventuretreks.com/" target="_blank" rel="noopener noreferrer">gilgitadventuretreks.com</a></p>
            </article>
            <article className="premium-project-card">
              <h3>Maqsood Ahmed & Sons</h3>
              <p className="premium-project-meta"><strong>Category:</strong> Construction, engineering, and corporate services website</p>
              <p><strong>Description:</strong> A professional company website presenting services and business information for a construction, engineering, and IT solutions company.</p>
              <p><strong>Verified technologies/context:</strong> Responsive, navigable, search-engine-optimized website development (as described in the public client testimonial on this site).</p>
              <p><strong>My verified contribution:</strong> Design and development of the website for Maqsood Ahmed & Sons.</p>
              <p><strong>Live website:</strong> <a href="https://mascorporates.com/" target="_blank" rel="noopener noreferrer">mascorporates.com</a></p>
            </article>
            <article className="premium-project-card">
              <h3>Terra Pakistan</h3>
              <p className="premium-project-meta"><strong>Category:</strong> Tourism brand website/project</p>
              <p><strong>Description:</strong> Website development work for Terra Pakistan, reflected through a verified public client testimonial on this portfolio.</p>
              <p><strong>Verified technologies/context:</strong> Specific stack details for this project are not individually listed on the portfolio; only the verified delivery relationship is claimed.</p>
              <p><strong>My verified contribution:</strong> Website development for Terra Pakistan.</p>
              <p><strong>Live website:</strong> <a href="https://www.instagram.com/travel_with_arrehman/" target="_blank" rel="noopener noreferrer">Founder reference (Instagram)</a></p>
            </article>
            <article className="premium-project-card">
              <h3>Syed Productions</h3>
              <p className="premium-project-meta"><strong>Category:</strong> Film, photography & videography production website</p>
              <p><strong>Description:</strong> A production company website presenting services, portfolio/showreel content, reviews, and booking-related information for Syed Productions.</p>
              <p><strong>Verified technologies/context:</strong> Specific stack details are not publicly documented in a verifiable credit on the live site; listed here as a web project with responsive, media-focused presentation.</p>
              <p><strong>My verified contribution:</strong> Website project included in this portfolio presentation. Public, project-specific contribution details are not separately documented on the live site.</p>
              <p><strong>Live website:</strong> <a href="https://syedproductions.com/" target="_blank" rel="noopener noreferrer">syedproductions.com</a></p>
            </article>
            <article className="premium-project-card">
              <h3>Tahseen Abbas</h3>
              <p className="premium-project-meta"><strong>Category:</strong> Personal brand / portfolio website</p>
              <p><strong>Description:</strong> A personal brand website for Tahseen Abbas, Founder of Binary Hub, featuring profile, mission, initiatives, testimonials, and contact information.</p>
              <p><strong>Verified technologies/context:</strong> Specific stack details are not listed in this portfolio’s project data; the live site presents a content-rich, responsive personal brand experience.</p>
              <p><strong>My verified contribution:</strong> Design and development, as credited on the live website footer (“Designed &amp; Developed by Tashfeen Bin Riaz, Full-Stack Web Developer”).</p>
              <p><strong>Live website:</strong> <a href="https://tahseenabbas.com/" target="_blank" rel="noopener noreferrer">tahseenabbas.com</a></p>
            </article>
          </div>

          <div className="premium-subsection">
            <h3 className="premium-subheading">Additional Verified Portfolio Work</h3>
            <p className="section-lead">
              The portfolio also includes design and front-end work samples across branding, UI/UX, and web development. Each item below links to a real on-site project visual.
            </p>
            <div className="features-grid premium-samples-grid">
              {PORTFOLIO.slice(0, 4).map((item) => (
                <div className="feature-card premium-sample-card" key={item.src}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 991px) 100vw, 50vw"
                    loading="lazy"
                  />
                  <span className="badge">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.blurb}</p>
                </div>
              ))}
            </div>
            <div className="cta-row">
              <Link className="btn" href="/work">View Full Portfolio</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading tag="Standards" title="Engineering Standards" />
          <p className="section-lead">
            Premium delivery is grounded in practical engineering standards that support quality today and adaptability tomorrow.
          </p>
          <div className="features-grid">
            {ENGINEERING_STANDARDS.map((item) => (
              <div className="feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Process" title="Development Process" />
          <div className="stories-grid">
            {PROCESS.map((step) => (
              <div className="story-card" key={step.t}>
                <div className="story-body">
                  <h3>{step.t}</h3>
                  <p>{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading tag="Pricing Philosophy" title="Pricing Philosophy" />
          <div className="premium-prose">
            <p>
              Inexpensive template-based websites can be suitable for simple needs, but they often trade flexibility, performance tuning, custom workflows, and long-term maintainability for speed and lower upfront cost. Custom premium development is different: it aligns architecture, design, and functionality with specific business objectives.
            </p>
            <p>
              Pricing depends on project requirements, including complexity, custom features, development hours, architecture, security needs, third-party integrations, and long-term maintenance. I do not publish fabricated personal rates, market averages, or client budgets on this page.
            </p>
            <p>
              The right way to evaluate cost is to define scope clearly. A focused business website, a custom e-commerce build, and a scalable application are fundamentally different investments.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="FAQ" title="Frequently Asked Questions" />
          <FaqList items={PREMIUM_FAQ} />
        </div>
      </section>

      <section className="section">
        <div className="container premium-final-cta">
          <SectionHeading tag="Contact" title="Discuss a Premium Website Project" />
          <p className="section-lead">
            If you need a custom website, e-commerce platform, or full-stack application built with long-term quality in mind, share your goals and requirements. I&apos;ll respond with a clear, practical next step.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/contact">Contact Tashfeen Riaz</Link>
            <Link className="btn" href="/work">View Portfolio</Link>
            <a className="btn" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <p className="premium-contact-links">
            Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · Phone/WhatsApp: <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">{SITE.phone}</a> · <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> · <a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </div>
      </section>
    </>
  );
}
