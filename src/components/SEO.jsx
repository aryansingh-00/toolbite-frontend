import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = '/logo.png', 
  url,
  type = 'website' 
}) => {
  const location = useLocation();
  const domain = 'https://www.toolbite.in';
  const canonicalUrl = url || `${domain}${location.pathname}${location.search}`;
  
  const siteName = 'ToolBite';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Premium Web Design Agency`;
  const metaDescription = description || 'ToolBite is a premium web design agency providing high-performance website templates and custom development services for modern brands.';

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph (Facebook/WhatsApp/LinkedIn) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      {/* <meta name="twitter:site" content="@toolbite" /> */}

      {/* Theme Color for Browsers */}
      <meta name="theme-color" content="#0d9488" />

      {/* JSON-LD Schema for Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": siteName,
          "description": metaDescription,
          "url": canonicalUrl,
          "logo": "https://www.toolbite.in/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91 9598037255",
            "contactType": "Customer Support"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
