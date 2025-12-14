import React from "react";
import { Helmet } from "react-helmet-async";
import metadata from "../../data/json/metadata.json";

export interface SEOProps {
  title: string;
  description?: string;
  lang?: string;
  meta?: HTMLMetaElement[];
  image?: string;
  pathname?: string;
  type?: "website" | "profile" | "article";
}

// JSON-LD Structured Data for Person
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ghazanfar Shahbaz",
  url: metadata.homepage,
  image: metadata.image,
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Technology Industry",
  },
  sameAs: [
    "https://github.com/GhazanfarShahbaz",
    "https://linkedin.com/in/GhazanfarShahbaz",
  ],
  knowsAbout: [
    "Software Engineering",
    "Full Stack Development",
    "Machine Learning",
    "React",
    "TypeScript",
    "Python",
    "AWS",
  ],
};

// JSON-LD for WebSite
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: metadata.title,
  url: metadata.homepage,
  description: metadata.description,
  author: {
    "@type": "Person",
    name: "Ghazanfar Shahbaz",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${metadata.homepage}?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  lang = "en",
  meta = [],
  image,
  pathname = "",
  type = "website",
}) => {
  const metaDescription = description || metadata.description;
  const metaImage = image || metadata.image;
  const canonicalUrl = `${metadata.homepage}${pathname}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s • ${metadata.title}`}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          name: "keywords",
          content: metadata.keywords,
        },
        {
          name: "theme-color",
          content: metadata.themeColor,
        },
        // Open Graph / Facebook
        {
          property: "og:site_name",
          content: metadata.title,
        },
        {
          property: "og:title",
          content: `${title} • ${metadata.title}`,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: canonicalUrl,
        },
        {
          property: "og:image",
          content: metaImage,
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
        {
          property: "og:image:alt",
          content: `${metadata.title} - Software Engineer Portfolio`,
        },
        {
          property: "og:locale",
          content: "en_US",
        },
        // Twitter Card
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:site",
          content: metadata.twitterHandle || "",
        },
        {
          name: "twitter:creator",
          content: metadata.twitterHandle || "",
        },
        {
          name: "twitter:title",
          content: `${title} • ${metadata.title}`,
        },
        {
          name: "twitter:description",
          content: metaDescription,
        },
        {
          name: "twitter:image",
          content: metaImage,
        },
        {
          name: "twitter:image:alt",
          content: `${metadata.title} - Software Engineer Portfolio`,
        },
        // LinkedIn specific
        {
          property: "linkedin:owner",
          content: metadata.title,
        },
        // Verification
        {
          name: "google-site-verification",
          content: metadata.verification.google,
        },
        {
          name: "google-adsense-account",
          content: "ca-pub-9099543298236984",
        },
      ].concat(meta)}
      link={[
        {
          rel: "canonical",
          href: canonicalUrl,
        },
      ]}
    >
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
