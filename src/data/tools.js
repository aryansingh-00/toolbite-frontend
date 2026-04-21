import { 
  Type, 
  CaseSensitive, 
  Image as ImageIcon, 
  FileText, 
  FileImage, 
  Code, 
  QrCode, 
  ShieldCheck, 
  Mic2, 
  FileJson,
  Video as Youtube,
  Camera as Instagram,
  Palette,
  CheckCheck,
  Zap,
  Maximize2,
  Smile,
  TrendingUp,
  ShieldAlert,
  SearchCode
} from 'lucide-react';

export const tools = [
  {
    id: 'word-counter',
    slug: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs in real-time with reading and speaking time analysis.',
    icon: Type,
    category: 'Text',
    tags: ['text', 'analysis', 'writing'],
    popular: true
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    title: 'Case Converter',
    description: 'Easily convert text between UPPERCASE, lowercase, Title Case, Sentence case, and camelCase flavors.',
    icon: CaseSensitive,
    category: 'Text',
    tags: ['text', 'typography', 'formatting']
  },
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    title: 'Image Compressor',
    description: 'Reduce image file size while maintaining high quality. Optimize PNG, JPG, and WEBP formats directly in-browser.',
    icon: ImageIcon,
    category: 'Image',
    tags: ['image', 'optimization', 'web'],
    popular: true
  },
  {
    id: 'image-to-pdf',
    slug: 'image-to-pdf',
    title: 'Image to PDF',
    description: 'Convert multiple images (JPG, PNG, WEBP) into a single high-quality PDF document locally.',
    icon: FileText,
    category: 'PDF',
    tags: ['pdf', 'converter', 'image']
  },
  {
    id: 'pdf-to-image',
    slug: 'pdf-to-image',
    title: 'PDF to Image',
    description: 'Convert PDF pages into high-resolution JPG or PNG images with ease and precision.',
    icon: FileImage,
    category: 'PDF',
    tags: ['pdf', 'converter', 'image']
  },
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Pretty-print, minify, and validate JSON data instantly with syntax highlighting and error detection.',
    icon: FileJson,
    category: 'Development',
    tags: ['code', 'json', 'formatting'],
    popular: true
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    title: 'QR Code Generator',
    description: 'Create custom QR codes for URLs, contact info, emails, and plain text. Download as PNG or SVG.',
    icon: QrCode,
    category: 'Marketing',
    tags: ['marketing', 'qr', 'mobile']
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    title: 'Password Generator',
    description: 'Generate strong, secure, and random passwords with customizable length and character sets.',
    icon: ShieldCheck,
    category: 'Security',
    tags: ['security', 'privacy', 'passwords']
  },
  {
    id: 'text-to-speech',
    slug: 'text-to-speech',
    title: 'Text to Speech',
    description: 'Convert any written text into natural-sounding speech. Choose from various voices and adjust speeds.',
    icon: Mic2,
    category: 'Media',
    tags: ['voice', 'accessibility', 'audio']
  },
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    description: 'Quickly generate placeholder text for your designs. Customize by paragraphs, words, or sentences.',
    icon: Code,
    category: 'Design',
    tags: ['placeholder', 'text', 'design']
  },
  {
    id: 'youtube-script-generator',
    slug: 'youtube-script-generator',
    title: 'YouTube Script Generator',
    description: 'Create professional YouTube video scripts with structured hooks, introductions, and calls to action.',
    icon: Youtube,
    category: 'AI',
    tags: ['ai', 'youtube', 'content', 'script'],
    popular: true
  },
  {
    id: 'instagram-reel-generator',
    slug: 'instagram-reel-generator',
    title: 'Instagram Reel Generator',
    description: 'Generate viral reel prompts and hooks that keep viewers engaged throughout the entire video.',
    icon: Instagram,
    category: 'AI',
    tags: ['ai', 'instagram', 'reels', 'marketing']
  },
  {
    id: 'midjourney-prompt-generator',
    slug: 'midjourney-prompt-generator',
    title: 'Midjourney Prompt Generator',
    description: 'Design highly detailed Midjourney prompts with lighting, artistic style, and camera settings.',
    icon: Palette,
    category: 'AI',
    tags: ['ai', 'art', 'midjourney', 'prompts'],
    popular: true
  },
  {
    id: 'grammar-fixer',
    slug: 'grammar-fixer',
    title: 'Grammar Fixer',
    description: 'Instantly scan and fix grammar, spelling, and punctuation errors in your text with advanced AI-style rules.',
    icon: CheckCheck,
    category: 'Text',
    tags: ['writing', 'grammar', 'proofreading']
  },
  {
    id: 'text-improver',
    slug: 'text-improver',
    title: 'Text Improver',
    description: 'Enhance your writing style, vocabulary, and overall clarity without losing the original message.',
    icon: Zap,
    category: 'Text',
    tags: ['writing', 'improvement', 'vocabulary'],
    popular: true
  },
  {
    id: 'text-length-changer',
    slug: 'text-length-changer',
    title: 'Text Length Changer',
    description: 'Condense long paragraphs into concise summaries or expand brief notes into detailed explanations.',
    icon: Maximize2,
    category: 'Text',
    tags: ['writing', 'editing', 'summary']
  },
  {
    id: 'tone-changer',
    slug: 'tone-changer',
    title: 'Tone Changer',
    description: 'Adjust the emotional tone of your message between formal, casual, persuasive, and empathetic.',
    icon: Smile,
    category: 'Text',
    tags: ['writing', 'communication', 'tone']
  },
  {
    id: 'roi-calculator',
    slug: 'roi-calculator',
    title: 'ROI Growth Predictor',
    description: 'Calculate the potential revenue growth of upgrading your digital presence with elite design and engineering benchmarks.',
    icon: TrendingUp,
    category: 'Marketing',
    tags: ['roi', 'calculator', 'growth', 'marketing'],
    popular: true
  },
  {
    id: 'brand-audit',
    slug: 'brand-audit',
    title: 'Digital Brand Audit',
    description: 'Enter your URL to perform an instant high-fidelity scan of your digital presence. Analyze gaps in design, performance, and strategy.',
    icon: SearchCode,
    category: 'Strategic',
    tags: ['audit', 'seo', 'strategy', 'analysis'],
    popular: true
  },
  {
    id: 'backlink-checker',
    slug: 'backlink-checker',
    title: 'Backlink Analysis Guide',
    description: 'Master the art of inbound links. Learn how to track, analyze, and compare your backlink profile against competitors via Bing Webmaster Tools.',
    icon: TrendingUp,
    category: 'Marketing',
    tags: ['seo', 'backlinks', 'marketing', 'authority'],
    popular: true
  }
];

export const categories = ['All', ...new Set(tools.map(t => t.category))];
