import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import WorkGallery from "@/components/WorkGallery";
import Testimonials from "@/components/Testimonials";
import StoriesGrid from "@/components/StoriesGrid";
import FaqList from "@/components/FaqList";
import ContactSection from "@/components/ContactSection";
import SkillsShowcase from "@/components/SkillsShowcase";
import JsonLd from "@/components/JsonLd";
import {
  SITE,
  HOME_SERVICES,
  HOME_FAQ,
  faqJsonLd,
  personJsonLd,
  reviewsJsonLd,
} from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={reviewsJsonLd()} />

      {/* ===== Hero ===== */}
      <section
        className="hero"
        style={{
          backgroundImage: "url('/images/cover_bg_2.webp')",
        }}
      >
        <div className="hero-inner">
          <h1 className="hero-title">
            {SITE.name}
            <span className="hero-kw">Full Stack Web Developer in Gilgit, Pakistan</span>
          </h1>
          <p className="hero-sub">Senior Full Stack Web Developer &amp; Designer — Founder of {SITE.studio}</p>
          <p className="hero-tags">
            Custom Development · SaaS · UI/UX Design
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#portfolio">
              View Portfolio
            </a>
            <a className="btn" href="#contact">
              Contact Me
            </a>
          </div>
        </div>
        <a className="hero-scroll" href="#about" aria-label="Scroll down to the About section">
          <span>Scroll Down</span>
          <span className="mouse" aria-hidden="true" />
        </a>
      </section>

      {/* ===== Portfolio ===== */}
      <section className="section" id="portfolio">
        <div className="container">
          <SectionHeading
            tag="Portfolio"
            title="My Selected Works"
          />
          <WorkGallery />
          <div className="cta-row">
            <Link className="btn" href="/work">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section className="section" id="about" style={{ background: "#0a0a0a" }}>
        <div className="container about-grid">
          <div>
            <Image
              className="about-portrait"
              src={SITE.portrait}
              alt="Tashfeen Riaz - Senior Full Stack Web Developer, Gilgit Pakistan"
              width={SITE.portraitW}
              height={SITE.portraitH}
              sizes="(max-width: 991px) 100vw, 42vw"
              priority={false}
              loading="lazy"
            />
          </div>
          <div className="about-bio">
            <h2>About Me</h2>
            <div className="divider-line" aria-hidden="true" />
            <p>
              Hello! I&apos;m {SITE.name}, a senior full stack web developer
              and digital designer based in {SITE.location}. As the founder of{" "}
              {SITE.studio}, I help businesses build fast, modern, and
              conversion-focused digital products — from landing pages to
              full-scale web applications and SaaS platforms.
            </p>
            <p>
              I engineer custom web development, SaaS platforms, and UI/UX design end to end. My goal is simple: ship production-grade experiences that look great, load fast, and help your business grow.
            </p>
            <ul className="about-facts">
              <li>
                <b>Name</b> <span>{SITE.name}</span>
              </li>
              <li>
                <b>Role</b> <span>Senior Full Stack Web Developer / Designer</span>
              </li>
              <li>
                <b>Based in</b> <span>{SITE.location}</span>
              </li>
              <li>
                <b>Email</b>{" "}
                <span>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </span>
              </li>
              <li>
                <b>Phone</b>{" "}
                <span>
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">
                    {SITE.phone}
                  </a>
                </span>
              </li>
            </ul>
            <div className="cta-row">
              <Link className="btn" href="/about">
                More About Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="section" id="services">
        <div className="container">
          <SectionHeading tag="Services" title="What I Do" />
          <div className="features-grid">
            {HOME_SERVICES.map((s) => (
              <div className="feature-card" key={s.title}>
                <img src={s.icon} alt="" width={45} height={45} loading="lazy" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="cta-row">
            <Link className="btn" href="/services">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Skills ===== */}
      <section className="section" id="skills" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Skills" title="What I Build With" />
          <p className="section-lead">
            Technologies I use to design, build, integrate, secure, and ship
            modern web applications.
          </p>
          <SkillsShowcase />
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="section" id="testimonials">
        <div className="container">
          <SectionHeading tag="Testimonials" title="What Clients Say" />
          <Testimonials />
        </div>
      </section>

      {/* ===== Stories ===== */}
      <section className="section" id="stories" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Stories" title="Stories From Gilgit" />
          <StoriesGrid limit={4} />
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section" id="faq">
        <div className="container">
          <SectionHeading tag="FAQ" title="Frequently Asked Questions" />
          <FaqList items={HOME_FAQ} />
          <JsonLd data={faqJsonLd(HOME_FAQ)} />
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section className="section" id="contact" style={{ background: "#0a0a0a" }}>
        <div className="container">
          <SectionHeading tag="Contact" title="Let's Work Together" />
          <ContactSection />
        </div>
      </section>
    </>
  );
}