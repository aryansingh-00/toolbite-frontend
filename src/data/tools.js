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
  FileJson
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
    title: 'Lorem Ipsum',
    description: 'Quickly generate placeholder text for your designs. Customize by paragraphs, words, or sentences.',
    icon: Code,
    category: 'Design',
    tags: ['placeholder', 'text', 'design']
  }
];

export const categories = ['All', ...new Set(tools.map(t => t.category))];
