import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import StoriesGrid from "@/components/StoriesGrid";
import JsonLd from "@/components/JsonLd";
import { SITE, OG_IMAGE, articlesJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stories From Gilgit-Baltistan - Photos & Writing",
  description:
    "Photography and short essays on the peaks, glaciers, lakes, and mountain people of Gilgit-Baltistan, Pakistan, by Tashfeen Riaz, a developer and designer from Gilgit.",
  alternates: { canonical: "/stories" },
  openGraph: {
    url: `${SITE.url}/stories`,
    type: "website",
    title: "Stories From Gilgit-Baltistan - Photos & Writing",
    description:
      "Photography and short essays on the peaks, glaciers, lakes, and mountain people of Gilgit-Baltistan, Pakistan.",
    images: [OG_IMAGE],
  },
};

function storiesPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${SITE.url}/stories`,
    name: "Stories From Gilgit-Baltistan",
    description:
      "Photography and short essays about the mountains, glaciers, lakes, and people of Gilgit-Baltistan, Pakistan.",
    author: { "@type": "Person", name: SITE.name, url: `${SITE.url}/about` },
    hasPart: articlesJsonLd()["@graph"],
  };
}

export default function StoriesPage() {
  return (
    <>
      <JsonLd data={storiesPageJsonLd()} />

      <PageHeader
        title="Stories From Gilgit"
        lead="A visual and written journey through the mountains, people, and landscapes that inspire my work."
      />

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <p className="section-lead">
            Gilgit-Baltistan is where I live, and it is the reason I care about
            performance, clarity, and craft. These stories are the personal side
            of my work - a record of the peaks, glaciers, lakes, and mountain
            communities I grew up around. Photography and writing are how I keep
            that sense of scale alive while I spend most of my days building{" "}
            <Link href="/work">websites and web applications</Link> for clients.
          </p>
          <StoriesGrid />
        </div>
      </section>

      <section className="section" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Region" title="About Gilgit-Baltistan" />
          <p className="section-lead">
            Gilgit-Baltistan is Pakistan&apos;s northernmost territory, bordered
            by China to the east, Afghanistan to the west, and the wider Kashmir
            region to the south. It holds K2, the world&apos;s second-highest
            mountain, together with more than 7,000 glaciers and some of the
            longest ice systems on the planet outside the polar regions.
          </p>
          <p className="section-lead">
            The five mountain communities of the region - Gilgit, Hunza,
            Skardu, Chitral, and Astore - each speak their own language and carry
            distinct traditions of dress, music, and hospitality. It is a place
            where languages such as Shina, Balti, and Burushaski are spoken
            alongside Urdu and English, and where livelihoods still depend heavily
            on agriculture, tourism, and trade along the Karakoram Highway.
          </p>
          <p className="section-lead">
            Growing up here shaped how I work. I have built{" "}
            <Link href="/services">websites for tourism operators and local
            businesses</Link> across the region, and I care about the same things
            a traveller does: that a site loads quickly on a patchy mobile
            connection, that a booking flow works on a phone, and that the
            photographs of a place actually do it justice.
          </p>
        </div>
      </section>

      <section className="section cta-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHeading
            tag="Inspired?"
            title="Let's Build Something Together"
          />
          <p className="section-lead">
            If you run a business in Gilgit, Gilgit-Baltistan, or anywhere
            else and need a website that presents your work properly, I would
            be glad to hear from you.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/contact">
              Contact Me
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
