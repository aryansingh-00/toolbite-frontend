import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "ToolBite — Premium Web Design Agency & Website Templates",
  description = "ToolBite is an elite web design agency and digital engineering firm. We build high-performance website templates, custom React applications, and premium mobile apps.",
  keywords = "web design agency, website templates, react templates, toolbite",
  image = "https://www.toolbite.in/logo.png",
  url = "https://www.toolbite.in/",
  type = "website"
}) => {
  const siteTitle = title.includes('ToolBite') ? title : `${title} | ToolBite`;

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
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
