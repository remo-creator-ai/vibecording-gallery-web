
import React, { useEffect } from 'react';
import { X, Download, Twitter, Facebook, Linkedin } from 'lucide-react';
import { ImageItem } from '../types';
import { downloadImage, shareOnTwitter, shareOnFacebook, shareOnLinkedIn } from '../services/imageService';

interface ImageModalProps {
  image: ImageItem | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [image]);

  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-2xl bg-black/90 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
      >
        <X size={32} />
      </button>

      <div 
        className="relative max-w-5xl w-full flex flex-col md:flex-row bg-[var(--card)] rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:w-2/3 aspect-square md:aspect-auto">
          <img 
            src={image.url} 
            alt={image.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="md:w-1/3 p-8 flex flex-col justify-between bg-[var(--card)] text-[var(--foreground)]">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#5F7FFF] mb-2 block">
              {image.year} Archive
            </span>
            <h2 className="text-3xl font-black tracking-tight mb-4">{image.title}</h2>
            <p className="opacity-60 font-light leading-relaxed">
              Series: {image.series}<br/>
              Part of the digital exploration of wild vitality reimagined through AI.
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
            <button
              onClick={() => downloadImage(image.url, image.title)}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#5F7FFF] text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg"
            >
              <Download size={20} />
              Download
            </button>
            
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Share Artwork</p>
              <div className="flex gap-2">
                <button
                  onClick={() => shareOnTwitter(image.url)}
                  className="flex-1 flex items-center justify-center py-3 bg-white/5 hover:bg-[#1DA1F2] hover:text-white rounded-xl transition-all"
                  title="Share on X"
                >
                  <Twitter size={18} />
                </button>
                <button
                  onClick={() => shareOnFacebook(image.url)}
                  className="flex-1 flex items-center justify-center py-3 bg-white/5 hover:bg-[#4267B2] hover:text-white rounded-xl transition-all"
                  title="Share on Facebook"
                >
                  <Facebook size={18} />
                </button>
                <button
                  onClick={() => shareOnLinkedIn(image.url)}
                  className="flex-1 flex items-center justify-center py-3 bg-white/5 hover:bg-[#0077B5] hover:text-white rounded-xl transition-all"
                  title="Share on LinkedIn"
                >
                  <Linkedin size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
