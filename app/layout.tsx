import type { Metadata } from "next";
import { Arimo, Raleway } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE, OG_IMAGE, PROFILE_LINKS, websiteJsonLd } from "@/lib/site";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-arimo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  authors: [{ name: SITE.name, url: `${SITE.url}/about` }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: SITE.businessName,
  category: "Web Development",
  alternates: {
    canonical: "/",
    types: { "text/plain": "/llms.txt" },
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.businessName,
    title: SITE.title,
    description: SITE.description,
    locale: "en_PK",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [OG_IMAGE],
  },
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": SITE.geoRegion,
    "geo.placename": SITE.geoPlace,
    "geo.position": `${SITE.coordinates.lat};${SITE.coordinates.lng}`,
    ICBM: `${SITE.coordinates.lat}, ${SITE.coordinates.lng}`,
    language: "English",
    "revisit-after": "3 days",
    "geo.country": SITE.country,
  },
  icons: {
    icon: "/faviconn.webp",
    apple: "/faviconn.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${arimo.variable}`}>
        {PROFILE_LINKS.map((p) => (
          <link key={p.href} rel="me" href={p.href} />
        ))}
        <JsonLd data={websiteJsonLd()} />
        <Script id="vercel-insights-init" strategy="afterInteractive">
          {`window.va = window.va || function(){ (window.vaq = window.vaq || []).push(arguments); };`}
        </Script>
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
