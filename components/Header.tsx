
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../types';
import { ARTIST_NAME, SITE_DESCRIPTION_KO, SITE_DESCRIPTION_EN } from '../constants';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="w-full backdrop-blur-md border-b border-white/5 px-6 py-12 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
              <span className="text-[var(--foreground)] lowercase tracking-[-0.05em]">{ARTIST_NAME}</span>
              <span className="text-xl md:text-2xl font-light opacity-40 lowercase tracking-widest">
                2024 — 2026 collection
              </span>
            </h1>
            
            <div className="max-w-3xl mt-8 space-y-6">
              <p className="text-[var(--foreground)] opacity-90 text-xl md:text-2xl font-medium leading-tight">
                {SITE_DESCRIPTION_EN}
              </p>
              <p className="text-[var(--foreground)] opacity-50 text-base md:text-lg leading-relaxed font-light">
                {SITE_DESCRIPTION_KO}
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="p-4 rounded-full bg-[var(--card)] border border-white/10 text-[var(--foreground)] hover:scale-110 transition-transform shadow-2xl mt-2"
            aria-label="Toggle theme"
          >
            {theme === Theme.DARK ? <Sun size={28} /> : <Moon size={28} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
