import type { MetadataRoute } from "next";
import { site } from "@/data/portfolio";

/** Preview branches are not public releases. Match the noindex metadata. */
export default function robots(): MetadataRoute.Robots {
  const production = process.env.VERCEL_ENV === "production";
  if (!production) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
