"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '../../store/useStore';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const isMenuOpen = useStore(state => state.isMenuOpen);
  const toggleMenu = useStore(state => state.toggleMenu);
  const location = { pathname: usePathname() };

  const isActive = (path: string) => location.pathname === path ? 'text-horizn-accent' : 'hover:text-horizn-accent';

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center text-white">
      {/* Logo - Applies mix-blend-difference individually to ensure visibility against any background */}
      <Link href="/" className="flex items-center gap-2 relative z-50 mix-blend-difference">
        <div className="w-4 h-4 bg-horizn-accent rounded-sm animate-pulse" />
        <span className="font-bold text-xl tracking-tighter">HORIZN</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className={`hidden md:flex gap-8 font-mono text-sm mix-blend-difference`}>
        <Link href="/" className={`${isActive('/')} transition-colors`}>PROCESS</Link>
        <Link href="/work" className={`${isActive('/work')} transition-colors`}>WORK</Link>
        <Link href="/studio" className={`${isActive('/studio')} transition-colors`}>STUDIO</Link>
        <Link href="/dev" className={`${isActive('/dev')} transition-colors`}>DEV</Link>
        <Link href="/blog" className={`${isActive('/blog')} transition-colors`}>BLOG</Link>
        <Link href="/contact" className={`${isActive('/contact')} transition-colors`}>CONTACT</Link>
      </nav>

      {/* Mobile Menu Toggle */}
      <button onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} className="md:hidden relative z-50 mix-blend-difference">
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay - Full Screen, Solid Background */}
      {isMenuOpen && (
        <div className="fixed inset-0 w-full h-screen bg-[#0a0a0a] z-40 flex flex-col items-center justify-center gap-8 md:hidden">
          <Link href="/" onClick={toggleMenu} className="text-3xl font-bold tracking-tighter hover:text-horizn-accent transition-colors">PROCESS</Link>
          <Link href="/work" onClick={toggleMenu} className="text-3xl font-bold tracking-tighter hover:text-horizn-accent transition-colors">WORK</Link>
          <Link href="/studio" onClick={toggleMenu} className="text-3xl font-bold tracking-tighter hover:text-horizn-accent transition-colors">STUDIO</Link>
          <Link href="/dev" onClick={toggleMenu} className="text-3xl font-bold tracking-tighter hover:text-horizn-accent transition-colors">DEV</Link>
          <Link href="/blog" onClick={toggleMenu} className="text-3xl font-bold tracking-tighter hover:text-horizn-accent transition-colors">BLOG</Link>
          <Link href="/contact" onClick={toggleMenu} className="text-3xl font-bold tracking-tighter hover:text-horizn-accent transition-colors">CONTACT</Link>
          
          <div className="absolute bottom-12 text-xs font-mono text-white/40">
            HORIZN STUDIO © 2024
          </div>
        </div>
      )}
    </header>
  );
};