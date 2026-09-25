import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import FaqList from "@/components/FaqList";
import ContactSection from "@/components/ContactSection";
import JsonLd from "@/components/JsonLd";
import { SITE, OG_IMAGE, CONTACT_FAQ, faqJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact - Hire a Web Developer in Gilgit, Pakistan",
  description:
    "Hire a web developer in Gilgit, Pakistan. Contact Tashfeen Riaz for web design, full stack development, custom web apps, e-commerce, and SaaS. Free consultation and quote.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: `${SITE.url}/contact`,
    type: "website",
    title: "Contact - Hire a Web Developer in Gilgit, Pakistan",
    description:
      "Contact Tashfeen Riaz for web design, full stack development, custom web apps, e-commerce, and SaaS. Free consultation and quote.",
    images: [OG_IMAGE],
  },
};

const BRIEF_POINTS = [
  {
    title: "What you need built",
    desc: "A business website, an online store, a booking system, a custom dashboard, or a SaaS platform. A sentence is enough to start.",
  },
  {
    title: "Goals and audience",
    desc: "Who you are trying to reach and what you want them to do - call you, buy from you, book with you, or simply trust you.",
  },
  {
    title: "Budget and timeline",
    desc: "An honest range helps me propose the right solution rather than overselling. Tell me your target launch date too.",
  },
  {
    title: "Examples you like",
    desc: "Links to sites whose layout, speed, or style you admire say more than any written brief, even if they are not in your industry.",
  },
];

function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Tashfeen Riaz",
    url: `${SITE.url}/contact`,
    description:
      "Contact page for Tashfeen Riaz, senior full stack web developer and designer in Gilgit, Pakistan.",
    mainEntity: {
      "@type": "Person",
      name: SITE.name,
      email: SITE.email,
      telephone: SITE.phoneRaw,
      jobTitle: SITE.role,
      url: `${SITE.url}/about`,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.locality,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: SITE.email,
          telephone: SITE.phoneRaw,
          availableLanguage: ["English", "Urdu"],
          areaServed: ["PK", "GB", "US", "AE", "CA", "AU"],
        },
      ],
    },
  };
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageJsonLd()} />
      <JsonLd data={faqJsonLd(CONTACT_FAQ)} />

      <PageHeader
        title="Contact Me"
        lead="Hiring a web developer in Gilgit, Pakistan? Tell me about your project and I will reply with a free, no-obligation proposal."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <SectionHeading tag="Contact" title="Get In Touch" />
          <p className="section-lead">
            I am {SITE.name}, a senior full stack web developer and designer based in{" "}
            {SITE.location}, founder of {SITE.studio}. Whether you need a{" "}
            <Link href="/services">professional business website</Link>, a{" "}
            <Link href="/work">custom web application</Link>, or a complete brand
            and UI/UX redesign, the fastest way to start is a short message. Fill
            in the form, email me directly, or reach me on WhatsApp - whichever is
            easiest for you.
          </p>
          <ContactSection />
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Brief" title="What To Include In Your Message" />
          <p className="section-lead">
            You do not need a technical document or a finished brief. These four
            details are enough for me to reply with an accurate scope, timeline,
            and price.
          </p>
          <div className="features-grid">
            {BRIEF_POINTS.map((b) => (
              <div className="feature-card" key={b.title}>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading tag="FAQ" title="Before You Get In Touch" />
          <FaqList items={CONTACT_FAQ} />
          <div className="cta-row">
            <Link className="btn" href="/services">
              See Services &amp; Pricing
            </Link>
            <Link className="btn" href="/work">
              View My Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
