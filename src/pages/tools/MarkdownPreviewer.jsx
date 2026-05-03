import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Eye, Copy, Trash2, FileText, Download } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const defaultMarkdown = `# Markdown Previewer
## Features:
- Real-time preview
- GitHub Flavored Markdown (GFM) support
- Syntax highlighting
- Easy copy and download

### Code Example:
\`\`\`javascript
function helloWorld() {
  console.log("Hello, ToolBite!");
}
\`\`\`

> "Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents."

**Bold text**, *italic text*, and [links](https://toolbite.in).
`;

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    toast.success('Markdown copied to clipboard!');
  };

  const handleClear = () => {
    setMarkdown('');
    toast.success('Editor cleared!');
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.md';
    link.click();
    toast.success('Markdown file downloaded!');
  };

  return (
    <ToolLayout
      title="Markdown Previewer"
      description="Write and preview Markdown in real-time. Supports GitHub Flavored Markdown (GFM), tables, and task lists."
      keywords="markdown previewer, markdown editor, online md viewer, gfm preview, markdown to html"
      icon={Eye}
      category="Development"
      extendedContent={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">Why Markdown is the Industry Standard</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Markdown has become the ubiquitous standard for documentation, technical writing, and content management systems. Its beauty lies in its simplicity: it allows writers to format text using plain text characters, which remain perfectly readable even without a renderer. This "future-proof" nature makes it ideal for long-term project documentation.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">GFM Support</h3>
              <p className="text-slate-600 leading-relaxed">
                GitHub Flavored Markdown (GFM) extends the original Markdown specification with additional features like task lists, tables, and auto-linked URLs. Our previewer fully supports GFM, ensuring that your READMEs and project notes look exactly as they will on GitHub or GitLab.
              </p>
            </section>

            <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Developer Workflow</h3>
              <p className="text-slate-600 leading-relaxed">
                Using a markdown previewer speeds up the development cycle by providing instant feedback. Whether you're drafting a blog post, documenting an API, or writing a status update, seeing the final rendered output helps catch formatting errors early.
              </p>
            </section>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[700px]">
        {/* Editor */}
        <div className="flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-slate-400" />
              <span className="font-bold text-slate-700 text-sm uppercase tracking-widest">Markdown Editor</span>
            </div>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500 hover:text-teal-600" title="Copy Markdown">
                <Copy size={18} />
              </button>
              <button onClick={handleClear} className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500 hover:text-red-600" title="Clear Editor">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-grow p-6 font-mono text-sm focus:outline-none resize-none bg-white text-slate-800 leading-relaxed"
            placeholder="Type your markdown here..."
          />
        </div>

        {/* Preview */}
        <div className="flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <Eye size={18} className="text-slate-400" />
              <span className="font-bold text-slate-700 text-sm uppercase tracking-widest">Live Preview</span>
            </div>
            <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-xl font-bold text-xs hover:bg-teal-500 transition-all shadow-md">
              <Download size={14} />
              Download .md
            </button>
          </div>
          <div className="flex-grow p-8 overflow-y-auto prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-black prose-a:text-teal-600 prose-code:text-teal-600 prose-pre:bg-slate-900 prose-pre:text-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default MarkdownPreviewer;
