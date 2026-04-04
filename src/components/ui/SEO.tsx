import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({ 
  title = "STUDIO CURSOR | Premium Digital Agency", 
  description = "A premium, immersive digital agency specializing in luxury digital experiences and modern brutalist design.", 
  keywords = "digital agency, luxury design, immersive experiences, modern brutalist, studio cursor",
  image = "https://ais-dev-b5nfdyeexex5vecagivugg-293044114194.asia-east1.run.app/og-image.png",
  url = "https://ais-dev-b5nfdyeexex5vecagivugg-293044114194.asia-east1.run.app/",
  type = "website"
}: SEOProps) => {
  const siteTitle = title.includes("STUDIO CURSOR") ? title : `${title} | STUDIO CURSOR`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name='author' content="STUDIO CURSOR" />
      
      {/* Open Graph / Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content="STUDIO CURSOR" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical link */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
