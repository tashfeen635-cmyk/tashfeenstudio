import type { MetadataRoute } from "next";
import { LAST_MODIFIED, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_MODIFIED);
  const routes = ["", "about", "services", "skills", "stories", "work", "contact"];
  return routes.map((route) => ({
    url: `${SITE.url}/${route}`,
    lastModified,
  }));
}
