
import React, { useState, useEffect } from 'react';
import { Theme, ImageItem } from './types';
import { COLORS } from './constants';
import Header from './components/Header';
import ImageCard from './components/ImageCard';
import ImageModal from './components/ImageModal';
import CoffeeWidget from './components/CoffeeWidget';
import { discoverImages } from './services/imageService';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
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

  const imagesByYear = images.reduce((acc, img) => {
    if (!acc[img.year]) acc[img.year] = [];
    acc[img.year].push(img);
    return acc;
  }, {} as Record<number, ImageItem[]>);

  const years = Object.keys(imagesByYear).map(Number).sort((a, b) => b - a);

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

      <main className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <Loader2 className="animate-spin text-[#5F7FFF]" size={64} />
            <p className="animate-pulse opacity-40 text-lg tracking-widest uppercase">Unfolding Archive...</p>
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <p className="text-red-500 text-2xl font-light italic">{error}</p>
          </div>
        ) : (
          <div className="space-y-32">
            {years.map(year => (
              <section key={year} className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="flex items-baseline gap-6 mb-12 border-b border-white/5 pb-4">
                  <h2 className="text-8xl font-black tracking-tighter opacity-10">{year}</h2>
                  <h3 className="text-2xl font-bold tracking-tight uppercase">
                    {year === 2024 ? "A Colorful Cat, A Jungle Cat" : "Cat with flower"}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                  {imagesByYear[year].map((img, idx) => (
                    <ImageCard 
                      key={img.id} 
                      image={img} 
                      priority={idx < 4}
                      onClick={setSelectedImage}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 text-center space-y-4 opacity-30 tracking-widest uppercase text-xs">
        <p>© 2024 — 2026 skyfishb archive</p>
        <p>Pursuing a surreal world of AI art</p>
      </footer>

      <ImageModal 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
      
      <CoffeeWidget />
    </div>
  );
};

export default App;
