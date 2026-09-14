"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { PORTFOLIO } from "@/lib/site";

export default function WorkGallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? null : (i + PORTFOLIO.length - 1) % PORTFOLIO.length
      ),
    []
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % PORTFOLIO.length)),
    []
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, prev, next]);

  return (
    <>
      <div className="portfolio-grid">
        {PORTFOLIO.map((item, i) => (
          <div
            key={item.src}
            className="portfolio-item-frame"
            role="button"
            tabIndex={0}
            onClick={() => setIndex(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setIndex(i);
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 33vw"
              loading={i < 3 ? "eager" : "lazy"}
            />
            <div className="portfolio-overlay">
              <div>
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {index !== null && (
        <div className="viewer-modal open" onClick={close}>
          <div
            className="viewer-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={PORTFOLIO[index].title}
          >
            <button className="viewer-close" onClick={close}>
              Close
            </button>
            <button
              className="viewer-nav viewer-prev"
              onClick={prev}
              aria-label="Previous work"
            >
              ‹
            </button>
            <Image
              src={PORTFOLIO[index].src}
              alt={PORTFOLIO[index].alt}
              width={PORTFOLIO[index].width}
              height={PORTFOLIO[index].height}
              sizes="(max-width: 1100px) 90vw, 1100px"
            />
            <button
              className="viewer-nav viewer-next"
              onClick={next}
              aria-label="Next work"
            >
              ›
            </button>
            <div className="viewer-caption">
              <h3>{PORTFOLIO[index].title}</h3>
              <p>
                {PORTFOLIO[index].category} — Work by{" "}
                <span className="viewer-credit">{`Tashfeen Riaz`}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}