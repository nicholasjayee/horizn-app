import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';

export const BlogNotFound: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 text-center pt-24 bg-[#0a0a0a]">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
        <Terminal size={40} className="text-white/30" />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">TRANSMISSION LOST</h1>
      
      <div className="max-w-md space-y-6">
        <p className="text-white/60 font-mono text-sm leading-relaxed">
          The signal you are trying to intercept does not exist or has been redacted from the archives.
        </p>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-horizn-accent hover:gap-4 transition-all uppercase font-bold tracking-widest text-xs"
        >
          <ArrowLeft size={16} /> Return to Feed
        </Link>
      </div>
    </div>
  );
};