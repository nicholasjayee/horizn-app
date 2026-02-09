import React, { useEffect } from 'react';
import { useStore, AppStage } from '../store/useStore';
import { PriceCalculator } from '../components/ui/tools/PriceCalculator';
import { InteractiveMap } from '../components/ui/maps/InteractiveMap';
import { motion } from 'framer-motion';
import { LoadingScreen } from '../components/ui/LoadingScreen';

export const Contact: React.FC = () => {
  const setStage = useStore(state => state.setStage);

  useEffect(() => {
    // Hide the background torus to focus on the map
    setStage(AppStage.HIDDEN);
  }, [setStage]);

  return (
    <>
      <LoadingScreen />
      <div className="w-full min-h-screen p-6 md:p-12 pt-28 flex flex-col items-center">
         
         <div className="w-full max-w-7xl mx-auto space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">GLOBAL<br/><span className="text-horizn-accent">OPERATIONS</span></h1>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                  Physical presence in key creative hubs. Digital presence everywhere.
                </p>
            </div>

            {/* Interactive Map Section */}
            <motion.div 
              {...({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8 }
              } as any)}
              className="w-full"
            >
               <InteractiveMap />
            </motion.div>

            {/* Info & Calculator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-12">
                
                <div className="space-y-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Connect</h2>
                        <p className="text-white/70 mb-8 leading-relaxed">
                          Whether you need a full digital transformation or a specific WebGL campaign, our network of specialists is ready to deploy.
                        </p>
                        
                        <div className="space-y-6 font-mono text-sm border-l border-white/10 pl-6">
                          <div className="group">
                            <span className="text-xs text-horizn-accent block mb-1">GENERAL INQUIRIES</span>
                            <a href="mailto:hello@horizn.studio" className="text-lg hover:text-white transition-colors">hello@horizn.studio</a>
                          </div>
                          <div className="group">
                            <span className="text-xs text-horizn-accent block mb-1">NEW BUSINESS</span>
                            <a href="mailto:growth@horizn.studio" className="text-lg hover:text-white transition-colors">growth@horizn.studio</a>
                          </div>
                          <div className="group">
                            <span className="text-xs text-horizn-accent block mb-1">CAREERS</span>
                            <a href="mailto:talent@horizn.studio" className="text-lg hover:text-white transition-colors">talent@horizn.studio</a>
                          </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {['Twitter', 'Instagram', 'LinkedIn', 'Github'].map(social => (
                            <button key={social} className="px-4 py-2 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest">
                                {social}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full">
                   <PriceCalculator />
                </div>

            </div>
         </div>
      </div>
    </>
  );
};