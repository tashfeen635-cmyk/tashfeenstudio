import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ContactSection from "@/components/ContactSection";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Tashfeen Riaz - Web Developer in Gilgit, Pakistan",
  description:
    "Contact Tashfeen Riaz, a full stack web developer in Gilgit, Pakistan. Email, WhatsApp, and a contact form - let's build your website.",
  alternates: { canonical: "/contact" },
  openGraph: { url: `${SITE.url}/contact`, type: "website" },
};

function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Tashfeen Riaz",
    url: `${SITE.url}/contact`,
    mainEntity: {
      "@type": "Person",
      name: SITE.name,
      email: SITE.email,
      telephone: SITE.phoneRaw,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.locality,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
    },
  };
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageJsonLd()} />

      <PageHeader
        title="Contact Me"
        lead="Have a project in mind? Let's talk about your website, brand, or web application."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <SectionHeading tag="Contact" title="Get In Touch" />
          <ContactSection />
        </div>
      </section>
    </>
  );
}