import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, name = "Capital Area Tibetan Association", type = "website" }) {
  const pageTitle = title ? `${title} | ${name}` : name;
  const defaultDescription = "Connecting the Tibetan Community in the Capital Area through culture, service, and unity.";
  const metaDescription = description || defaultDescription;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{pageTitle}</title>
      <meta name='description' content={metaDescription} />
      
      {/* Open Graph tags for social sharing */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={name} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  );
}
