import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "ToolBite — Premium Web Design Agency & Website Templates",
  description = "ToolBite is an elite web design agency and digital engineering firm. We build high-performance website templates, custom React applications, and premium mobile apps.",
  keywords = "web design agency, website templates, react templates, toolbite",
  image = "https://www.toolbite.in/logo.png",
  url = null,
  type = "website",
  toolData = null,
  serviceData = null,
  faqData = null,
  breadcrumbs = []
}) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const canonicalUrl = url || `https://www.toolbite.in${currentPath === '/' ? '' : currentPath}`;
  const siteTitle = title.includes('ToolBite') ? title : `${title} | ToolBite`;

  // JSON-LD for SoftwareApplication (Tools)
  const toolSchema = toolData ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": toolData.name,
    "description": description,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "ToolBite",
      "url": "https://www.toolbite.in"
    }
  } : null;

  // JSON-LD for Service
  const serviceSchema = serviceData ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceData.name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "ToolBite",
      "url": "https://www.toolbite.in"
    },
    "areaServed": "Worldwide",
    "serviceType": serviceData.category || "Digital Engineering"
  } : null;

  // JSON-LD for FAQ
  const faqSchema = faqData ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // JSON-LD for Breadcrumbs
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url.startsWith('http') ? crumb.url : `https://www.toolbite.in${crumb.url}`
    }))
  } : null;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Structured Data */}
      {toolSchema && (
        <script type="application/ld+json">
          {JSON.stringify(toolSchema)}
        </script>
      )}
      {serviceSchema && (
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
