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
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  lang = "en",
  meta = [],
  image,
  pathname = "",
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
    />
  );
};

export default SEO;
