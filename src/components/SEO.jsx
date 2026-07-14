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
  articleData = null,
  breadcrumbs = []
}) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const canonicalUrl = url || `https://www.toolbite.in${currentPath === '/' ? '' : currentPath}`;
  const siteTitle = title.includes('ToolBite') ? title : `${title} | ToolBite`;

  // Base Organization Schema for the Homepage
  const isHomepage = currentPath === '/';
  const organizationSchema = isHomepage ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ToolBite",
    "url": "https://www.toolbite.in",
    "logo": "https://www.toolbite.in/logo.png",
    "sameAs": [
      "https://www.twitter.com/hello.toolbite",
      "https://www.instagram.com/hello.toolbite",
      "https://www.linkedin.com/in/tool-bite-16ab8b3ba"
    ],
    "description": "ToolBite is an elite web design agency and digital engineering firm specializing in high-performance SaaS platforms, mobile applications, and premium website templates.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New Delhi",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9598037255",
      "contactType": "customer service",
      "email": "hello.toolbite@gmail.com"
    }
  } : null;

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

  // JSON-LD for Article (Blog Posts)
  const articleSchema = articleData ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.title || siteTitle,
    "description": description,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": articleData.author || "ToolBite",
      "url": "https://www.toolbite.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ToolBite",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.toolbite.in/logo.png"
      }
    },
    "datePublished": articleData.datePublished || new Date().toISOString()
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
      {organizationSchema && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}
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
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
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
