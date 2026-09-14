"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LEFT, NAV_RIGHT, SITE } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    const onScroll = () => setFixed(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  const all = [{ href: "/", label: "Home" }, ...NAV_LEFT, ...NAV_RIGHT];

  return (
    <header className={`nav ${fixed ? "fixed" : ""}`}>
      <div className="container nav-row">
        <nav className="desktop-nav" aria-label="Primary navigation">
          <ul className="nav-links left">
            {NAV_LEFT.map((item) => (
              <li key={item.href}>
                <Link
                  className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="site-logo" href="/">
          {SITE.name}
          <span>.</span>
        </Link>

        <nav className="desktop-nav" aria-label="Secondary navigation">
          <ul className="nav-links right">
            {NAV_RIGHT.map((item) => (
              <li key={item.href}>
                <Link
                  className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-nav">
          <button
            className="mobile-menu-btn"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <ul>
          {all.map((item) => (
            <li key={item.href}>
              <Link
                className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}