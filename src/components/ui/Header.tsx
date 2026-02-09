import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const isMenuOpen = useStore(state => state.isMenuOpen);
  const toggleMenu = useStore(state => state.toggleMenu);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-horizn-accent' : 'hover:text-horizn-accent';

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-4 h-4 bg-horizn-accent rounded-sm animate-pulse" />
        <span className="font-bold text-xl tracking-tighter">HORIZN</span>
      </Link>

      <nav className={`hidden md:flex gap-8 font-mono text-sm`}>
        <Link to="/" className={`${isActive('/')} transition-colors`}>PROCESS</Link>
        <Link to="/work" className={`${isActive('/work')} transition-colors`}>WORK</Link>
        <Link to="/studio" className={`${isActive('/studio')} transition-colors`}>STUDIO</Link>
        <Link to="/contact" className={`${isActive('/contact')} transition-colors`}>CONTACT</Link>
      </nav>

      <button onClick={toggleMenu} className="md:hidden">
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl p-6 border-b border-white/10 flex flex-col gap-4 md:hidden">
          <Link to="/" onClick={toggleMenu}>PROCESS</Link>
          <Link to="/work" onClick={toggleMenu}>WORK</Link>
          <Link to="/studio" onClick={toggleMenu}>STUDIO</Link>
          <Link to="/contact" onClick={toggleMenu}>CONTACT</Link>
        </div>
      )}
    </header>
  );
};