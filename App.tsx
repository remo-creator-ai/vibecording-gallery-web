
import React, { useState, useEffect } from 'react';
import { Theme, ImageItem } from './types';
import { COLORS } from './constants';
import Header from './components/Header';
import ImageCard from './components/ImageCard';
import CoffeeWidget from './components/CoffeeWidget';
import { discoverImages } from './services/imageService';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const list = await discoverImages();
        setImages(list);
      } catch (err) {
        setError('Failed to load images from the digital jungle.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  };

  const currentColors = COLORS[theme];

  return (
    <div 
      className="min-h-screen transition-colors duration-500"
      style={{
        backgroundColor: currentColors.background,
        color: currentColors.foreground,
        '--background': currentColors.background,
        '--foreground': currentColors.foreground,
        '--card': currentColors.card,
        '--card-hover': currentColors.cardHover,
        '--accent': currentColors.accent
      } as React.CSSProperties}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <Loader2 className="animate-spin text-[#5F7FFF]" size={64} />
            <p className="animate-pulse opacity-40 text-lg tracking-widest uppercase">Initializing Archive...</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 w-full mt-12">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="aspect-square rounded-2xl bg-[var(--card)] shimmer opacity-10" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <p className="text-red-500 text-2xl font-light italic">{error}</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-32">
            <p className="opacity-30 text-2xl font-light tracking-tight">The archive is currently empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {images.map((img, index) => (
              <ImageCard 
                key={img.id} 
                image={img} 
                priority={index < 4} 
              />
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs md:text-sm opacity-30 tracking-widest uppercase">
        <p>© 2024 — 2026 skyfishb archive</p>
        <p className="hidden md:block">/// ai-driven vitality ///</p>
        <p>Built with Vibe Coding</p>
      </footer>

      <CoffeeWidget />
    </div>
  );
};

export default App;
