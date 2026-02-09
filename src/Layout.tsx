import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      
      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="w-full flex-grow pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};