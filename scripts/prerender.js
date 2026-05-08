import puppeteer from 'puppeteer';
import handler from 'serve-handler';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');

// Read the generated sitemap to get all routes dynamically
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');

const DOMAIN = 'https://www.toolbite.in';
const routes = [];
const regex = new RegExp(`<loc>${DOMAIN}(.*?)</loc>`, 'g');
let match;
while ((match = regex.exec(sitemapXml)) !== null) {
  routes.push(match[1]);
}

// Ensure the root path is included (it might match as empty string)
if (!routes.includes('/')) {
  routes.push('/');
}

const PORT = 3000;
const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: distPath,
    rewrites: [
      { source: '**', destination: '/index.html' }
    ]
  });
});

async function prerender() {
  console.log(`Starting local server on port ${PORT}...`);
  await new Promise((resolve) => server.listen(PORT, resolve));

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  
  // Create an index.html backup before overwriting
  const indexHtmlPath = path.join(distPath, 'index.html');
  
  console.log(`Prerendering ${routes.length} routes...`);
  
  for (const route of routes) {
    const page = await browser.newPage();
    // Intercept network requests to block unnecessary resources (like ads, analytics, fonts) to speed up render
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (['image', 'stylesheet', 'font', 'media'].includes(request.resourceType()) || request.url().includes('google-analytics') || request.url().includes('googlesyndication')) {
        request.abort();
      } else {
        request.continue();
      }
    });

    try {
      const url = `http://localhost:${PORT}${route || '/'}`;
      console.log(`Rendering: ${route}`);
      
      // Wait for networkidle0 to ensure React Helmet tags are fully injected
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      const html = await page.content();
      
      const dirPath = path.join(distPath, route);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      
      fs.writeFileSync(path.join(dirPath, 'index.html'), html);
    } catch (err) {
      console.error(`Error rendering ${route}:`, err.message);
    } finally {
      await page.close();
    }
  }

  console.log('Closing browser and server...');
  await browser.close();
  server.close();
  console.log('Prerendering complete! 🚀');
}

prerender().catch((err) => {
  console.error('Prerender process failed:', err);
  process.exit(1);
});
