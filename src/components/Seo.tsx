import Head from "next/head";

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  url: string;
}

const Seo = ({ title, description, image, url }: SeoProps) => {
  const ogImage = image || "https://default-image-url.com";
  const twitterImage = image || "https://default-image-url.com";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            headline: title,
            description,
            image: ogImage,
            url,
          }),
        }}
      />
    </Head>
  );
};

export default Seo;
