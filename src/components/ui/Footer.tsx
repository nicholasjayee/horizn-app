import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-black/20 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-white/40">
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-center md:text-left">
            <Link to="/" className="font-bold text-white/80 hover:text-horizn-accent transition-colors">HORIZN STUDIO</Link>
            <span>© 2024. ALL RIGHTS RESERVED.</span>
        </div>
        
        <div className="flex gap-6 md:gap-8 uppercase tracking-wider">
           <a href="#" className="hover:text-horizn-accent transition-colors">Twitter</a>
           <a href="#" className="hover:text-horizn-accent transition-colors">Instagram</a>
           <a href="#" className="hover:text-horizn-accent transition-colors">LinkedIn</a>
           <a href="mailto:hello@horizn.studio" className="hover:text-horizn-accent transition-colors">Mail</a>
        </div>

      </div>
    </footer>
  );
};