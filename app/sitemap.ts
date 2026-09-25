import type { MetadataRoute } from "next";
import { LAST_MODIFIED, ROUTES, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_MODIFIED);
  return ROUTES.map((route) => ({
    url: `${SITE.url}/${route}`,
    lastModified,
  }));
}
