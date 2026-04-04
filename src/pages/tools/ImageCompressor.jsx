import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { ImageIcon, Upload, Download, ArrowRight, Zap, Trash2, CheckCircle2 } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const ImageCompressor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.8);
  const [stats, setStats] = useState({ original: 0, compressed: 0, reduction: 0 });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload a valid image file');
        return;
      }
      setSelectedFile(file);
      setOriginalImage(URL.createObjectURL(file));
      setCompressedImage(null);
      setStats({ ...stats, original: file.size });
    }
  };

  const compressImage = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: quality
    };

    try {
      const compressedFile = await imageCompression(selectedFile, options);
      setCompressedImage(URL.createObjectURL(compressedFile));
      setStats({
        ...stats,
        compressed: compressedFile.size,
        reduction: ((stats.original - compressedFile.size) / stats.original * 100).toFixed(1)
      });
      toast.success('Image compressed successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Compression failed. Try a different quality.');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = `compressed-${selectedFile.name}`;
    link.href = compressedImage;
    link.click();
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce image size without losing quality. Optimized for PNG, JPG, and WEBP formats. All processing happens locally for maximum privacy."
      keywords="image compressor, reduce image size, optimize images, photo compressor, online image optimization"
      icon={ImageIcon}
      category="Image"
    >
      <div className="space-y-10">
        {/* Upload Section */}
        {!selectedFile ? (
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            <div className="py-24 border-2 border-dashed border-slate-200 rounded-[40px] bg-slate-50 flex flex-col items-center justify-center transition-all group-hover:border-teal-500 group-hover:bg-teal-50/50">
              <div className="p-6 bg-white rounded-3xl shadow-xl shadow-slate-200/50 mb-6 group-hover:scale-110 transition-transform">
                <Upload size={48} className="text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Click or Drag Image Here</h3>
              <p className="text-slate-500 font-medium italic">Supports JPG, PNG, and WEBP</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Original Image</span>
                <span className="text-sm font-bold text-slate-400">{formatSize(stats.original)}</span>
              </div>
              <div className="aspect-square rounded-3xl bg-slate-100 overflow-hidden border-2 border-slate-100 flex items-center justify-center p-2 group relative">
                <img src={originalImage} alt="Original" className="w-full h-full object-contain rounded-2xl transition-transform group-hover:scale-105" />
                <button 
                  onClick={() => setSelectedFile(null)} 
                  className="absolute top-4 right-4 p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-lg"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {compressedImage ? 'Compressed Result' : 'Settings'}
                </span>
                {compressedImage && (
                  <span className="text-sm font-bold text-teal-600">{formatSize(stats.compressed)}</span>
                )}
              </div>
              
              <div className="aspect-square rounded-3xl bg-slate-900 border-2 border-slate-800 flex flex-col items-center justify-center p-8 text-white relative">
                {compressedImage ? (
                  <>
                    <img src={compressedImage} alt="Compressed" className="w-full h-full object-contain rounded-2xl mb-6 shadow-2xl shadow-teal-500/10" />
                    <div className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-lg">
                      <CheckCircle2 size={12} />
                      Saved {stats.reduction}%
                    </div>
                  </>
                ) : (
                  <div className="w-full space-y-8 text-center">
                    <div className="space-y-4">
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Compression Quality</p>
                      <input 
                        type="range" min="0.1" max="1" step="0.1" value={quality}
                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg accent-teal-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-bold px-1">
                        <span>Max Compression (Smaller)</span>
                        <span>Quality ({Math.round(quality * 100)}%)</span>
                        <span>Min Compression (Better)</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={compressImage}
                      disabled={loading}
                      className="w-full py-5 bg-teal-600 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-teal-500/30 hover:bg-teal-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/20 border-t-white"></div>
                      ) : (
                        <>
                          <Zap size={22} fill="currentColor" />
                          Apply Compression
                        </>
                      )}
                    </button>
                    <p className="text-xs text-slate-500">Wait a few seconds for high-res images</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {compressedImage && (
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
            <button
              onClick={() => { setCompressedImage(null); }}
              className="flex-1 py-5 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <Zap size={20} fill="currentColor" />
              Change Quality
            </button>
            <button
              onClick={downloadImage}
              className="flex-1 py-5 bg-teal-600 text-white font-extrabold text-xl rounded-2xl shadow-2xl shadow-teal-500/30 hover:bg-teal-700 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <Download size={24} />
              Download Result
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default ImageCompressor;
