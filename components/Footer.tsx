import Link from "next/link";
import { SITE } from "@/lib/site";

const PAGE_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/web-developer-in-gilgit", label: "Web Developer in Gilgit" },
  { href: "/full-stack-web-developer-pakistan", label: "Full Stack Developer in Pakistan" },
  { href: "/work", label: "Portfolio" },
  { href: "/skills", label: "Skills & Stack" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const PROFILE_LINKS_FOOTER = [
  { href: SITE.github, label: "GitHub" },
  { href: SITE.linkedin, label: "LinkedIn" },
  { href: SITE.instagram, label: "Instagram" },
  { href: SITE.maps, label: "Google Maps" },
  { href: SITE.whatsapp, label: "WhatsApp" },
  { href: `mailto:${SITE.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-logo">
          {SITE.name}
          <span>.</span>
        </p>
        <p className="footer-tagline">
          {SITE.role} in {SITE.location}
        </p>
        <ul className="footer-social">
          {PAGE_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <ul className="footer-social">
          {PROFILE_LINKS_FOOTER.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="footer-copy">
          © {new Date().getFullYear()} {SITE.name} — {SITE.role} in{" "}
          {SITE.location}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
