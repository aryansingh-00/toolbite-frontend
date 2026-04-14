// scripts/generate-sitemap.js
// Auto-generates public/sitemap.xml by reading all data sources.
// Run via: node scripts/generate-sitemap.js
// Or automatically as part of the build process.

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Static data (mirrors src/data/tools.js, blogPosts.js, templates.js) ──────
// We duplicate minimal info here to avoid ESM import issues with lucide-react icons.

const TOOL_SLUGS = [
  'word-counter',
  'case-converter',
  'image-compressor',
  'image-to-pdf',
  'pdf-to-image',
  'json-formatter',
  'qr-code-generator',
  'password-generator',
  'text-to-speech',
  'lorem-ipsum-generator',
  'youtube-script-generator',
  'instagram-reel-generator',
  'midjourney-prompt-generator',
  'grammar-fixer',
  'text-improver',
  'text-length-changer',
  'tone-changer',
  'roi-calculator',
];

const BLOG_IDS = [1, 2, 3, 4];

const TEMPLATE_IDS = [
  'tpl-001', 'tpl-002', 'tpl-003', 'tpl-004', 'tpl-005',
  'tpl-006', 'tpl-007', 'tpl-008', 'tpl-009', 'tpl-010',
  'tpl-011', 'tpl-012', 'tpl-013', 'tpl-014', 'tpl-015',
  'tpl-016', 'tpl-017', 'tpl-018', 'tpl-019', 'tpl-020',
  'tpl-021', 'tpl-022', 'tpl-023', 'tpl-024', 'tpl-025',
  'tpl-026', 'tpl-027', 'tpl-028', 'tpl-029', 'tpl-030',
  'tpl-031', 'tpl-032', 'tpl-033', 'tpl-034', 'tpl-035',
  'tpl-036', 'tpl-037', 'tpl-038', 'tpl-039', 'tpl-040',
];

// ─────────────────────────────────────────────────────────────────────────────

const DOMAIN = 'https://www.toolbite.in';
const TODAY = new Date().toISOString().split('T')[0]; // e.g. 2026-04-08

function url(loc, priority, changefreq = 'weekly', lastmod = TODAY) {
  return `  <url>
    <loc>${DOMAIN}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const entries = [
  // Static core pages
  url('/',                 '1.0', 'weekly'),
  url('/templates',        '0.9', 'weekly'),
  url('/tools',            '0.9', 'weekly'),
  url('/about',            '0.7', 'monthly'),
  url('/contact',          '0.7', 'monthly'),
  url('/blog',             '0.8', 'weekly'),
  url('/start-project',    '0.9', 'monthly'),

  // Legal pages
  url('/privacy-policy',   '0.3', 'yearly'),
  url('/terms-of-service', '0.3', 'yearly'),
  url('/cookie-policy',    '0.3', 'yearly'),

  // All tool pages
  ...TOOL_SLUGS.map(slug => url(`/tools/${slug}`, '0.8', 'weekly')),

  // All blog posts
  ...BLOG_IDS.map(id => url(`/blog/${id}`, '0.7', 'monthly')),

  // All template detail pages
  ...TEMPLATE_IDS.map(id => url(`/template/${id}`, '0.8', 'monthly')),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${entries.join('\n\n')}

</urlset>
`;

const outputPath = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(outputPath, sitemap, 'utf-8');

console.log(`✅ Sitemap generated with ${entries.length} URLs → public/sitemap.xml`);
