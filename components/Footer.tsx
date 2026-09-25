import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-logo">
          {SITE.studio}
          <span>.</span>
        </p>
        <ul className="footer-social">
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/full-stack-web-developer-pakistan">
              Full Stack Developer in Pakistan
            </Link>
          </li>
        </ul>
        <ul className="footer-social">
          <li>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={SITE.maps} target="_blank" rel="noopener noreferrer">
              Google Maps
            </a>
          </li>
          <li>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </li>
        </ul>
        <p className="footer-copy">
          © {new Date().getFullYear()} {SITE.studio} — {SITE.role} in{" "}
          {SITE.location}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}