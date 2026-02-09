import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="w-full h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 text-center z-50 relative font-sans">
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <h1 className="text-6xl md:text-8xl font-bold mb-4 text-red-500 tracking-tighter">Oops!</h1>
      <p className="text-xl md:text-2xl mb-8 text-white/60">Sorry, an unexpected error has occurred.</p>
      
      {error && (
        <div className="font-mono text-sm bg-white/5 border border-white/10 p-4 rounded mb-8 max-w-lg overflow-auto">
          <p className="text-red-400">Error Code: {error.status || 'Unknown'}</p>
          <p className="opacity-70">{error.statusText || error.message}</p>
        </div>
      )}

      <Link 
        to="/" 
        className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm"
      >
        Return Home
      </Link>
    </div>
  );
};