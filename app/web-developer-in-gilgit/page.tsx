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
  GILGIT_FAQ,
  SKILL_SUMMARY,
  faqJsonLd,
  personJsonLd,
  businessJsonLd,
  webPageJsonLd,
  pageAlternates,
} from "@/lib/site";

const PATH = "/web-developer-in-gilgit";

export const metadata: Metadata = {
  title: "Web Developer in Gilgit",
  description:
    "Tashfeen Riaz is a web developer in Gilgit building fast, SEO-ready websites for local businesses and tourism operators. Free quote, fixed price.",
  alternates: pageAlternates(PATH),
  openGraph: {
    url: `${SITE.url}${PATH}`,
    type: "website",
    title: "Web Developer in Gilgit | Tashfeen Riaz",
    description:
      "Hire a web developer in Gilgit for business sites, e-commerce, and custom web apps. Local developer with 50+ projects delivered, based in Gilgit-Baltistan.",
    images: [OG_IMAGE],
  },
};

const DISTRICTS = [
  { name: "Gilgit", note: "Regional capital and the tech hub of the north" },
  { name: "Skardu", note: "Gateway to Baltoro Glacier, K2 base camp, and Upper Kachura" },
  { name: "Hunza", note: "Tourism, high-altitude agriculture, and handicraft exports" },
  { name: "Nagar", note: "Heritage, agriculture, and growing private enterprise" },
  { name: "Diamer", note: "Bambur, Diamer Valley, and road-side tourism" },
  { name: "Ghizer", note: "Gupis-Yasin area, Punial Valley, and river tourism" },
  { name: "Astore", note: "Deosai, Astore Valley, and high-altitude tourism" },
  { name: "Gupis-Yasin", note: "Yasin Valley trekking and mountain culture" },
];

const LOCAL_BUSINESSES = [
  {
    title: "Tourism & trekking operators",
    desc: "Itinerary pages, expedition and peak detail pages, photo and video galleries, booking enquiries, and structured data so you surface for trekking, hiking, and expedition searches — not just your brand name.",
  },
  {
    title: "Hotels, guesthouses & restaurants",
    desc: "Mobile-first sites that load fast on the limited connectivity common in the region, with room or menu pages, a WhatsApp booking path, and Google Maps integration.",
  },
  {
    title: "Handicraft & dry food producers",
    desc: "Product catalogues and e-commerce stores built to sell Gilgit handicrafts, Gilgit-developed items, dried food, and regional products to customers in Pakistan and overseas.",
  },
  {
    title: "Outdoor & adventure gear sellers",
    desc: "Inventory-aware stores with variant handling for gear lines, plus honest shipping and returns information for cross-border orders out of Pakistan.",
  },
  {
    title: "Construction, engineering & contractors",
    desc: "Clear presentation of services, projects, and credibility — the kind of site that wins corporate and tender work, which is what Maqsood Ahmed & Sons needed.",
  },
  {
    title: "Schools, NGOs & local organisations",
    desc: "Admission or enquiry forms, galleries, notices, and content structured so students and parents in the region can find you.",
  },
];

const LOCAL_PROOF = [
  {
    title: "Gilgit Adventure Treks",
    href: "https://gilgitadventuretreks.com/",
    note: "A trekking and adventure operator in Gilgit. Founder Nasir Ahmed credits the work with representing the business far better online, and specifically with the attention to SEO, performance, mobile responsiveness, and user experience.",
  },
  {
    title: "Maqsood Ahmed & Sons",
    href: "https://mascorporates.com/",
    note: "A construction, engineering, and IT solutions company. Founder Maqsood Ahmed Dar describes the site as a clear digital presence reflecting the company's real experience, responsive, easy to navigate, and search-optimised.",
  },
  {
    title: "Terra Pakistan",
    href: "https://www.instagram.com/travel_with_arrehman/",
    note: "Founder Abdul Rehman describes the delivery as professional, responsive, and exactly on time.",
  },
];

const PRICING = [
  {
    title: "PKR 150,000 – 400,000",
    desc: "Business, portfolio, or company website. Responsive design, CMS, contact and WhatsApp enquiry, technical SEO, and launch. Usually 2 to 3 weeks.",
  },
  {
    title: "PKR 350,000 – 900,000",
    desc: "E-commerce store with catalogue, secure checkout, payment gateway, and order management. Usually 4 to 6 weeks depending on catalogue size.",
  },
  {
    title: "PKR 600,000+",
    desc: "Custom web application or SaaS platform with authentication, roles, dashboards, and third-party integrations. Usually 6 to 12 weeks.",
  },
  {
    title: "Ongoing Retainer",
    desc: "Monthly maintenance, updates, backups, security patches, uptime monitoring, and priority support after launch.",
  },
];

const PROCESS = [
  {
    t: "01. Free consultation, in person if you prefer",
    d: "We meet in Gilgit, at your office, or over video. You describe the business and what you want the website to actually do — bring calls, bookings, sales, or credibility. You get an honest assessment, including if the answer is that you do not need a new site yet.",
  },
  {
    t: "02. Fixed-price proposal",
    d: "A written proposal with a clear scope, a delivery timeline, and a fixed price. No hourly surprises and no vague estimates. Nothing starts until you approve it in writing.",
  },
  {
    t: "03. Design approved before build",
    d: "You see the actual design before any code is written. Revisions happen at the cheap stage on a mockup, rather than after a full build has been written against a layout you never signed off.",
  },
  {
    t: "04. Build, test, launch",
    d: "Front-end, back-end, and database. Tested across device sizes and on the mobile connections your real customers use. Every launch includes technical SEO, structured data, analytics, and a performance pass as standard — not sold as an add-on later.",
  },
  {
    t: "05. Local support after launch",
    d: "I stay reachable. Maintenance, updates, and changes are handled directly by the person who built the site, and you can always come back for improvements as the business grows.",
  },
];

function gilgitPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...webPageJsonLd({
        path: PATH,
        name: "Web Developer in Gilgit | Tashfeen Riaz",
        description:
          "Tashfeen Riaz is a web developer in Gilgit, Gilgit-Baltistan, building fast, SEO-ready websites, e-commerce stores, and custom web applications for local businesses and tourism operators.",
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Web developer in Gilgit", path: PATH },
        ],
      })["@graph"],
      { ...personJsonLd(), url: `${SITE.url}/about` },
      businessJsonLd()["@graph"][0],
      {
        "@type": "Service",
        "@id": `${SITE.url}${PATH}#service`,
        name: "Web Development in Gilgit",
        serviceType: SERVICES.map((s) => s.title),
        description: `Web design, full stack development, e-commerce, and SaaS development in ${SITE.location} by ${SITE.name}.`,
        url: `${SITE.url}${PATH}`,
        provider: { "@id": `${SITE.url}/#professional-service` },
        areaServed: [
          { "@type": "City", name: SITE.locality },
          { "@type": "AdministrativeArea", name: SITE.region },
          { "@type": "Country", name: SITE.countryName },
        ],
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${SITE.url}/contact`,
          servicePhone: SITE.phoneRaw,
        },
      },
      {
        "@type": "OfferCatalog",
        "@id": `${SITE.url}${PATH}#offers`,
        name: "Web development pricing in Gilgit, Pakistan",
        itemListElement: PRICING.map((p) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: p.title, description: p.desc },
          priceCurrency: "PKR",
          areaServed: { "@type": "AdministrativeArea", name: SITE.region },
        })),
      },
      faqJsonLd(GILGIT_FAQ),
    ],
  };
}

export default function WebDeveloperInGilgitPage() {
  return (
    <>
      <JsonLd data={gilgitPageJsonLd()} />

      <PageHeader
        title="Web Developer in Gilgit"
        lead={`${SITE.name} is a full stack web developer in Gilgit, ${SITE.region} — building fast, secure, search-ready websites, e-commerce stores, and custom web applications for local businesses, tourism operators, and clients worldwide.`}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Web Developer in Gilgit", path: PATH },
        ]}
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <p className="section-lead">
            <strong>
              {SITE.name} is a web developer in Gilgit, {SITE.region}, Pakistan.
            </strong>{" "}
            He has designed, developed, and deployed more than 50 websites and
            web applications, and because he works from Gilgit he can meet local
            clients in person for the consultation, the design review, and the
            launch. There is no agency layer and no account manager — you speak to
            the person who writes the code.
          </p>
          <p className="section-lead">
            Working as a web developer in Gilgit means building for conditions
            that a generic agency template ignores: mobile networks that are not
            always fast, visitors browsing in English and Urdu, audiences spread
            across a difficult terrain, and businesses that depend on being found
            by people already planning a trip. That means performance and search
            visibility are part of the build rather than an upsell, and it means
            local knowledge of who you are and who your customers are.
          </p>
          <p className="section-lead">
            The work spans business websites, online stores, custom web
            applications, and SaaS platforms, using{" "}
            <Link href="/skills">React, Next.js, TypeScript, Node.js, PHP, Laravel, and Django</Link>{" "}
            with PostgreSQL, MongoDB, and Docker. If you are not sure which of
            those you need, that is what the free consultation is for.
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
          <SectionHeading tag="Local" title="Businesses I Build For In Gilgit-Baltistan" />
          <p className="section-lead">
            Across the eight districts of {SITE.region} — {DISTRICTS.map((d) => d.name).join(", ")} — I
            build sites tuned to what each sector actually needs.
          </p>
          <div className="features-grid">
            {LOCAL_BUSINESSES.map((b) => (
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
          <SectionHeading tag="Regions" title="Where I Work" />
          <p className="section-lead">
            Based in Gilgit city and working across all of {SITE.region},
            remotely or in person.
          </p>
          <div className="features-grid">
            {DISTRICTS.map((d) => (
              <div className="feature-card" key={d.name}>
                <h3>{d.name}</h3>
                <p>{d.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Proof" title="Local Clients I Have Built For" />
          <p className="section-lead">
            These are real {SITE.region} businesses whose websites I designed and
            developed, with the founders describing the work publicly.
          </p>
          <div className="stories-grid">
            {LOCAL_PROOF.map((c) => (
              <div className="story-card" key={c.title}>
                <div className="story-body">
                  <h3>
                    <a href={c.href} target="_blank" rel="noopener noreferrer">
                      {c.title}
                    </a>
                  </h3>
                  <p>{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading tag="Services" title="What I Build In Gilgit" />
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
            Full service detail, process, and pricing are on my{" "}
            <Link href="/services">services page</Link>. Every project ships with
            technical SEO, structured data, analytics, and a performance pass
            included: {SKILL_SUMMARY}.
          </p>
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
          <SectionHeading tag="Cost" title="Website Cost In Gilgit" />
          <p className="section-lead">
            Most clients want a number before they want a conversation. Typical
            ranges for work of this kind in {SITE.region}, quoted in PKR, are
            below — every project is priced individually after a free
            consultation.
          </p>
          <div className="features-grid">
            {PRICING.map((c) => (
              <div className="feature-card" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="section-lead">
            These figures sit well below equivalent freelance rates in the US and
            UK, typically 50 to 70 percent less for comparable senior engineering
            work. If you are outside Pakistan, the practical thing to plan around
            is the time zone: I work on {SITE.timeZone}, which overlaps with Gulf
            and European business hours and partially with US Eastern mornings.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Testimonials" title="What Clients Say" />
          <Testimonials />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading tag="FAQ" title="Web Developer In Gilgit FAQ" />
          <FaqList items={GILGIT_FAQ} />
          <p className="section-lead">
            Outside {SITE.region}? My{" "}
            <Link href="/full-stack-web-developer-pakistan">Pakistan page</Link>{" "}
            covers the same services nationally with wider PKR pricing ranges, and
            <Link href="/about">about me</Link> covers background and working
            process.
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
