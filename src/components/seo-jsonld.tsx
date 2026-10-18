import { personJsonLd, websiteJsonLd } from '@/lib/seo';

/** Invisible JSON-LD for Google (Person + WebSite). */
export function SeoJsonLd() {
  const data = [personJsonLd(), websiteJsonLd()];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
