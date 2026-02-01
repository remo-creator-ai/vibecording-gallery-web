
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../types';
import { ARTIST_NAME, HEADER_CONTENT } from '../constants';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="w-full border-b border-white/5 px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="flex-1">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 lowercase">
            {ARTIST_NAME}
          </h1>
          
          <div className="space-y-4 max-w-4xl">
            <p className="text-2xl md:text-3xl font-medium leading-tight opacity-90">
              {HEADER_CONTENT.line1}
            </p>
            <p className="text-lg md:text-xl opacity-60 font-light max-w-2xl">
              {HEADER_CONTENT.line2}
            </p>
          </div>

          <div className="mt-12 space-y-2 border-l-2 border-[#5F7FFF] pl-6 py-2">
            <p className="text-base font-semibold tracking-wide text-[#5F7FFF] uppercase">{HEADER_CONTENT.series2024}</p>
            <p className="text-base font-semibold tracking-wide opacity-40 uppercase">{HEADER_CONTENT.series2026}</p>
            <p className="text-sm italic opacity-30 mt-4">{HEADER_CONTENT.footer}</p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="p-4 rounded-full bg-[var(--card)] border border-white/10 text-[var(--foreground)] hover:scale-110 transition-transform shadow-xl shrink-0"
        >
          {theme === Theme.DARK ? <Sun size={28} /> : <Moon size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
