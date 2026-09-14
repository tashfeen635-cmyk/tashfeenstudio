import { TESTIMONIALS } from "@/lib/site";

export default function Testimonials() {
  return (
    <div className="testimonials-list">
      {TESTIMONIALS.map((t) => (
        <div className="testimonial-card" key={t.name}>
          <span className="quote-mark">"</span>
          <blockquote>{t.quote}</blockquote>
          <div className="testimonial-author">
            <h3>
              <a href={t.href} target="_blank" rel="noopener noreferrer">
                {t.name}
              </a>
            </h3>
            <p className="position">
              {t.positionHref ? (
                <a href={t.positionHref} target="_blank" rel="noopener noreferrer">
                  {t.position}
                </a>
              ) : (
                t.position
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}