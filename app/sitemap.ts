import type { MetadataRoute } from "next";
import { LAST_MODIFIED, ROUTES, SITE } from "@/lib/site";

const PRIORITY: Record<string, { priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" }> = {
  "": { priority: 1.0, changeFrequency: "weekly" },
  "web-developer-in-gilgit": { priority: 0.9, changeFrequency: "monthly" },
  "full-stack-web-developer-pakistan": { priority: 0.9, changeFrequency: "monthly" },
  "most-expensive-web-developer-in-pakistan": { priority: 0.8, changeFrequency: "monthly" },
  services: { priority: 0.8, changeFrequency: "monthly" },
  work: { priority: 0.8, changeFrequency: "monthly" },
  about: { priority: 0.7, changeFrequency: "monthly" },
  contact: { priority: 0.7, changeFrequency: "yearly" },
  skills: { priority: 0.6, changeFrequency: "monthly" },
  stories: { priority: 0.4, changeFrequency: "monthly" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_MODIFIED);
  return ROUTES.map((route) => {
    const url = route ? `${SITE.url}/${route}` : `${SITE.url}/`;
    const meta = PRIORITY[route] ?? { priority: 0.5, changeFrequency: "monthly" as const };
    return {
      url,
      lastModified,
      changeFrequency: meta.changeFrequency,
      priority: meta.priority,
      alternates: { languages: { en: url, "x-default": url } },
    };
  });
}
