import React, { useEffect } from 'react';
import { useStore, AppStage } from '../store/useStore';
import { PriceCalculator } from '../components/ui/tools/PriceCalculator';

export const Contact: React.FC = () => {
  const setStage = useStore(state => state.setStage);

  useEffect(() => {
    setStage(AppStage.POLISH);
  }, [setStage]);

  return (
    <div className="w-full min-h-screen p-6 md:p-20 pt-32 flex justify-center items-center">
       <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8">LET'S BUILD<br/>THE FUTURE</h1>
              <p className="text-xl text-white/70 mb-12">
                Ready to elevate your digital presence? Use our estimator to get a ballpark figure, or reach out directly for a custom quote.
              </p>
              
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-horizn-accent"></span>
                  <a href="mailto:hello@horizn.studio" className="hover:text-horizn-accent transition-colors">hello@horizn.studio</a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-horizn-accent"></span>
                  <span>+1 (555) 012-3456</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-horizn-accent"></span>
                  <span>Los Angeles, CA</span>
                </div>
              </div>
          </div>

          <div>
             <PriceCalculator />
          </div>
       </div>
    </div>
  );
};