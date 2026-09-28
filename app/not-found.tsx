import type { Metadata } from "next";
import Link from "next/link";
import { SITE, pageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
  alternates: pageAlternates("/"),
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 44 }}>404</h1>
        <p style={{ color: "#ddd", marginBottom: 30 }}>
          That page doesn&apos;t exist. Try the homepage, my{" "}
          <Link href="/web-developer-in-gilgit">Gilgit services page</Link>, or{" "}
          <Link href="/contact">get in touch</Link>.
        </p>
        <Link className="btn" href="/">
          Back to Homepage
        </Link>
        <p style={{ color: "#888", fontSize: 13, marginTop: 30 }}>
          {SITE.role} in {SITE.location} — {SITE.email}
        </p>
      </div>
    </section>
  );
}
