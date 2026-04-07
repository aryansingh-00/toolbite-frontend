import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { FileText, Upload, Download, Trash2, Plus, Layers } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';
import useDragDrop from '../../hooks/useDragDrop';

const ImageToPdf = () => {
  const [images, setImages] = useState([]);
  const [generating, setGenerating] = useState(false);

  const handleFileDrop = (fileList) => {
    const files = Array.from(fileList);
    const validImages = files.filter(file => file.type.startsWith('image/'));
    if (validImages.length < files.length) {
      toast.error('Some files were skipped. Only images are allowed.');
    }
    const newImages = validImages.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      url: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const handleFileChange = (e) => {
    handleFileDrop(e.target.files);
  };

  const { isDragging, dragProps } = useDragDrop(handleFileDrop, { accept: 'image/*', multiple: true });

  const removeImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setGenerating(true);

    try {
      const pdf = new jsPDF();
      
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const imageData = await getImageData(img.url);
        
        const imgProps = pdf.getImageProperties(imageData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        if (i > 0) pdf.addPage();
        pdf.addImage(imageData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save(`toolbite-images-${Date.now()}.pdf`);
      toast.success('PDF generated and downloaded!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate PDF');
    } finally {
      setGenerating(false);
    }
  };

  const getImageData = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.95));
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  return (
    <ToolLayout
      title="Image to PDF"
      description="Convert your photos and images into a single professional PDF document. Perfect for documents, portfolios, and easy sharing."
      keywords="image to pdf, jpg to pdf, png to pdf, convert image to pdf, pdf creator, photo to pdf"
      icon={FileText}
      category="PDF"
    >
      <div className="space-y-8">
        {/* Upload Area */}
        <div className="relative group" {...dragProps}>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
          <div className={`py-12 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all duration-300 ${
            isDragging
              ? 'border-teal-500 bg-teal-50 scale-[1.02] shadow-2xl shadow-teal-500/20'
              : 'border-slate-200 bg-slate-50 group-hover:border-teal-500 group-hover:bg-teal-50/50'
          }`}>
            <div className={`p-4 bg-white rounded-2xl shadow-lg mb-4 transition-transform ${
              isDragging ? 'scale-125' : 'group-hover:scale-110'
            }`}>
              <Plus size={32} className={isDragging ? 'text-teal-500 animate-bounce' : 'text-teal-600'} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              {isDragging ? '✨ Drop images here!' : 'Add More Images'}
            </h3>
            <p className="text-sm text-slate-500">
              {isDragging ? 'Release to add all files' : 'Drag & drop or click to select multiple files'}
            </p>
          </div>
        </div>

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 py-8 border-t border-slate-100">
            {images.map((img, index) => (
              <div key={img.id} className="relative group aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm animate-fade-in hover:shadow-md transition-shadow">
                <img src={img.url} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full backdrop-blur-sm">
                  PAGE {index + 1}
                </div>
                <button 
                  onClick={() => removeImage(img.id)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 pt-8 border-t border-slate-100">
          <div className="flex-1 space-y-2">
            <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Layers size={16} />
              PDF Document Info
            </h4>
            <p className="text-sm text-slate-500">
              Total Pages: <span className="font-bold text-slate-900">{images.length}</span>
            </p>
            <p className="text-xs text-slate-400 italic">
              Each image will be placed on its own page, automatically scaled to fit.
            </p>
          </div>
          
          <div className="flex-[2] flex gap-4">
            <button
              onClick={() => setImages([])}
              disabled={images.length === 0}
              className="px-8 py-5 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Trash2 size={20} />
              Clear All
            </button>
            <button
              onClick={generatePdf}
              disabled={images.length === 0 || generating}
              className="flex-1 py-5 bg-teal-600 text-white font-extrabold text-xl rounded-2xl shadow-xl shadow-teal-500/30 hover:bg-teal-500 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {generating ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/20 border-t-white"></div>
              ) : (
                <>
                  <Download size={24} />
                  Build & Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ImageToPdf;
