import Image from "next/image";
import Link from "next/link";
import { STORIES } from "@/lib/site";

export default function StoriesGrid({ limit }: { limit?: number }) {
  const items = limit ? STORIES.slice(0, limit) : STORIES;
  return (
    <div className="stories-grid">
      {items.map((s) => (
        <article className="story-card" key={s.title}>
          <Image
            src={s.image}
            alt={s.alt}
            width={s.width}
            height={s.height}
            sizes="(max-width: 991px) 100vw, 50vw"
            loading="lazy"
          />
          <div className="story-body">
            <h3>{s.title}</h3>
            <p>{s.content}</p>
          </div>
        </article>
      ))}
      {limit && (
        <div className="cta-row">
          <Link className="btn" href="/stories">
            Read All Stories
          </Link>
        </div>
      )}
    </div>
  );
}