import { SITE } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

export default function ContactSection() {
  return (
    <div className="contact-grid">
      <div>
        <ContactForm />
      </div>
      <aside>
        <div className="contact-info-item">
          <span className="contact-info-label">Email</span>
          <a className="contact-info-val" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </div>
        <div className="contact-info-item">
          <span className="contact-info-label">Phone / WhatsApp</span>
          <a className="contact-info-val" href={SITE.whatsapp}>
            {SITE.phone}
          </a>
        </div>
        <div className="contact-info-item">
          <span className="contact-info-label">Location</span>
          <span className="contact-info-val">{SITE.location}</span>
        </div>
        <div className="contact-info-item">
          <span className="contact-info-label">Social</span>
          <p className="contact-info-val">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            {" · "}
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
      </aside>
    </div>
  );
}