
import React from 'react';
import { Maximize2 } from 'lucide-react';
import { ImageItem } from '../types';

interface ImageCardProps {
  image: ImageItem;
  priority?: boolean;
  onClick: (image: ImageItem) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, priority, onClick }) => {
  return (
    <div 
      onClick={() => onClick(image)}
      className="group relative overflow-hidden rounded-2xl bg-[var(--card)] aspect-square shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
    >
      <img
        src={image.url}
        alt={image.title}
        loading={priority ? 'eager' : 'lazy'}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
        <div className="p-4 bg-white/20 backdrop-blur-xl rounded-full text-white scale-90 group-hover:scale-100 transition-transform duration-300">
          <Maximize2 size={24} />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-sm font-bold truncate">{image.title}</p>
      </div>
    </div>
  );
};

export default ImageCard;
