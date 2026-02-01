
import React from 'react';
import { Download, Twitter, Facebook, Linkedin, Share2 } from 'lucide-react';
import { ImageItem } from '../types';
import { downloadImage, shareOnTwitter, shareOnFacebook, shareOnLinkedIn } from '../services/imageService';

interface ImageCardProps {
  image: ImageItem;
  priority?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, priority }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-[var(--card)] aspect-square shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">
      {/* Main Image */}
      <img
        src={image.url}
        alt={image.title}
        loading={priority ? 'eager' : 'lazy'}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
        <h3 className="text-white text-lg font-bold mb-4 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
          {image.title}
        </h3>
        
        <div className="flex items-center gap-3 translate-y-4 transition-transform duration-500 delay-75 group-hover:translate-y-0">
          {/* Download Button */}
          <button
            onClick={() => downloadImage(image.url, `skyfishb-${image.id}`)}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-[#5F7FFF] transition-colors"
            title="Download Image"
          >
            <Download size={20} />
          </button>

          {/* Share Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => shareOnTwitter(image.url)}
              className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-[#1DA1F2] transition-colors"
              title="Share on Twitter"
            >
              <Twitter size={18} />
            </button>
            <button
              onClick={() => shareOnFacebook(image.url)}
              className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-[#4267B2] transition-colors"
              title="Share on Facebook"
            >
              <Facebook size={18} />
            </button>
            <button
              onClick={() => shareOnLinkedIn(image.url)}
              className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-[#0077B5] transition-colors"
              title="Share on LinkedIn"
            >
              <Linkedin size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
