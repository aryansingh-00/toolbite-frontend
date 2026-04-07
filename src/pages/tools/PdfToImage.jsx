import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { FileImage, Upload, Download, Trash2, Layers, Eye, Camera } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';
import useDragDrop from '../../hooks/useDragDrop';

// Set up pdfjs worker using a local import for performance
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfToImage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [numPages, setNumPages] = useState(0);

  const loadPdf = async (file) => {
    if (file && file.type === 'application/pdf') {
      setLoading(true);
      setPdfFile(file);
      setPages([]);
      try {
        const fileReader = new FileReader();
        fileReader.onload = async () => {
          const typedarray = new Uint8Array(fileReader.result);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          setNumPages(pdf.numPages);
          const pagesData = [];
          for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 0.3 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d');
            await page.render({ canvasContext: ctx, viewport }).promise;
            pagesData.push({ id: i, url: canvas.toDataURL() });
          }
          setPages(pagesData);
        };
        fileReader.readAsArrayBuffer(file);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load PDF');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Please upload a valid PDF file');
    }
  };

  const handleFileChange = async (e) => {
    await loadPdf(e.target.files[0]);
  };

  const handleFileDrop = async (fileList) => {
    await loadPdf(fileList[0]);
  };

  const { isDragging, dragProps } = useDragDrop(handleFileDrop, { accept: 'application/pdf' });

  const downloadPage = async (pageNumber) => {
    setProcessing(true);
    try {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const typedarray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 2.0 }); // High quality
        const canvas = document.createElement('canvas');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const canvasContext = canvas.getContext('2d');
        await page.render({ canvasContext, viewport }).promise;
        
        const link = document.createElement('a');
        link.download = `toolbite-pdf-page-${pageNumber}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        toast.success(`Page ${pageNumber} downloaded!`);
      };
      fileReader.readAsArrayBuffer(pdfFile);
    } catch (error) {
      console.error(error);
      toast.error('Failed to export page');
    } finally {
      setProcessing(false);
    }
  };

  const downloadAll = async () => {
    toast.error('Batch download not implemented yet. Please download pages individually.');
  };

  return (
    <ToolLayout
      title="PDF to Image"
      description="Extract high-quality images from your PDF documents. Convert every page into a crisp PNG file with one click."
      keywords="pdf to image, pdf to png, extract pdf images, pdf converter, pdf to jpg, high quality pdf export"
      icon={FileImage}
      category="PDF"
    >
      <div className="space-y-10">
        {!pdfFile ? (
        <div className="relative group" {...dragProps}>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            <div className={`py-24 border-2 border-dashed rounded-[40px] flex flex-col items-center justify-center transition-all duration-300 ${
              isDragging
                ? 'border-teal-500 bg-teal-50 scale-[1.02] shadow-2xl shadow-teal-500/20'
                : 'border-slate-200 bg-slate-50 group-hover:border-teal-500 group-hover:bg-teal-50/50'
            }`}>
              <div className={`p-6 bg-white rounded-3xl shadow-xl shadow-slate-200/50 mb-6 transition-transform ${
                isDragging ? 'scale-125 shadow-teal-500/30' : 'group-hover:scale-110'
              }`}>
                <Upload size={48} className={isDragging ? 'text-teal-500 animate-bounce' : 'text-teal-600'} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {isDragging ? '✨ Drop your PDF here!' : 'Upload PDF Document'}
              </h3>
              <p className="text-slate-500 font-medium italic">
                {isDragging ? 'Release to start processing' : 'Max 20MB for best performance'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center bg-slate-50 p-6 rounded-3xl border border-slate-100 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg text-teal-600">
                  <FileImage size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900 truncate max-w-md">{pdfFile.name}</h4>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{numPages} Total Pages</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => { setPdfFile(null); setPages([]); }}
                  className="px-6 py-3 bg-white text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm"
                >
                  <Trash2 size={18} className="inline mr-2" />
                  Remove PDF
                </button>
                <button 
                  onClick={downloadAll}
                  className="px-8 py-3 bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 hover:bg-teal-500 transition-all hover:-translate-y-0.5"
                >
                  <Camera size={18} className="inline mr-2" />
                  Full Export
                </button>
              </div>
            </div>

            {loading ? (
              <div className="py-24 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
                <p className="text-slate-500 font-medium">Analyzing PDF structure...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {pages.map((page) => (
                  <div key={page.id} className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    <img src={page.url} alt={`Page ${page.id}`} className="w-full h-auto aspect-[3/4] object-contain bg-slate-50 border-b border-slate-50" />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-extrabold text-slate-800 shadow-sm">
                      PAGE {page.id}
                    </div>
                    <div className="p-3">
                      <button
                        onClick={() => downloadPage(page.id)}
                        disabled={processing}
                        className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <Download size={14} />
                        Export PNG
                      </button>
                    </div>
                  </div>
                ))}
                {numPages > 10 && (
                  <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
                    <Layers size={24} className="text-slate-300 mb-2" />
                    <p className="text-xs font-bold text-slate-400 uppercase leading-relaxed">+ {numPages - 10} More Pages</p>
                    <p className="text-[10px] text-slate-400 mt-1">Available for download</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="p-8 bg-teal-50 rounded-3xl border border-teal-100 flex items-start gap-4">
          <div className="p-3 bg-white rounded-2xl text-teal-600 shadow-sm">
            <Eye size={24} />
          </div>
          <div>
            <h5 className="font-bold text-teal-800 mb-1 leading-tight">Privacy Guarantee</h5>
            <p className="text-sm text-teal-700/80 leading-relaxed shadow-sm">
              We never upload your PDF to any server. All page rendering and conversion takes place entirely within your browser's local memory. Your documents stay 100% private.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PdfToImage;
