import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const SEARCH_BOTS = [
  "Googlebot",
  "Googlebot-Image",
  "Googlebot-News",
  "Googlebot-Video",
  "Bingbot",
  "DuckDuckBot",
  "Slurp",
  "Baiduspider",
  "YandexBot",
  "Applebot",
];

const SOCIAL_BOTS = [
  "Twitterbot",
  "facebookexternalhit",
  "facebookcatalog",
  "LinkedInBot",
  "Slackbot",
  "Discordbot",
  "WhatsApp",
  "TelegramBot",
  "Pinterestbot",
];

const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "Google-CloudVertexBot",
  "Google-CloudVertexBot-User",
  "CCBot",
  "Bytespider",
  "cohere-ai",
  "meta-externalagent",
  "Amazonbot",
  "Diffbot",
  "MistralAI-User",
  "Timpibot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: SEARCH_BOTS, allow: "/" },
      { userAgent: SOCIAL_BOTS, allow: "/" },
      { userAgent: AI_BOTS, allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
