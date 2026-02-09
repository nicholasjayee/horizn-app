import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore, AppStage } from '../../store/useStore';
import { PriceCalculator } from './tools/PriceCalculator';
import { TeamCards } from './tools/TeamCards';
import { VideoScrubber } from './tools/VideoScrubber';
import { BeforeAfterSlider } from './tools/BeforeAfterSlider';
import { PROJECTS } from '../../data/mockData';

gsap.registerPlugin(ScrollTrigger);

const Section: React.FC<{ 
  id: string; 
  className?: string; 
  children: React.ReactNode; 
  onEnter: () => void 
}> = ({ id, className, children, onEnter }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Use a ref for the callback to prevent ScrollTrigger recreation when the callback identity changes
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  useEffect(() => {
    const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 60%", 
          end: "bottom 60%",
          onEnter: () => onEnterRef.current(),
          onEnterBack: () => onEnterRef.current(),
        });
    }, ref);

    return () => ctx.revert();
  }, []); // Empty dependency array ensures we only create the trigger once

  return (
    <section 
      ref={ref} 
      id={id} 
      className={`min-h-screen w-full flex flex-col justify-center items-center p-6 md:p-20 relative ${className}`}
    >
      {children}
    </section>
  );
};

export const Overlay: React.FC = () => {
  const setStage = useStore(state => state.setStage);
  const setScrollProgress = useStore(state => state.setScrollProgress);

  // Memoize handlers to keep props stable if possible, though Section ref pattern handles instability now
  const handleEnterIdea = useCallback(() => setStage(AppStage.IDEA), [setStage]);
  const handleEnterCode = useCallback(() => setStage(AppStage.CODE), [setStage]);
  const handleEnterMotion = useCallback(() => setStage(AppStage.MOTION), [setStage]);
  const handleEnterPolish = useCallback(() => setStage(AppStage.POLISH), [setStage]);
  const handleEnterProduct = useCallback(() => setStage(AppStage.PRODUCT), [setStage]);

  useEffect(() => {
    // Global ScrollTrigger for progress tracking across the whole page
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      }
    });

    return () => trigger.kill();
  }, [setScrollProgress]);

  return (
    <div className="w-full relative z-10 flex flex-col">
      
      {/* PROCESS SECTION WRAPPER */}
      <div id="process">
        {/* SCENE 1: THE IDEA (Wireframe) */}
        <Section id="idea" onEnter={handleEnterIdea}>
          <div className="max-w-4xl w-full text-center pointer-events-none select-none">
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 mix-blend-difference">
              THE<br/> BLUEPRINT
            </h1>
            <p className="text-xl md:text-2xl font-mono text-horizn-accent">
              // WHERE IT ALL BEGINS
            </p>
          </div>
        </Section>

        {/* SCENE 2: THE CODE (Clay + Code) */}
        <Section id="code" onEnter={handleEnterCode} className="items-start">
          <div className="max-w-xl text-left">
             <h2 className="text-5xl font-bold mb-4">Architecture &<br/>Engineering</h2>
             <p className="text-lg text-white/70 mb-8 leading-relaxed">
               We build robust, scalable digital infrastructures. Not just pretty faces, but powerful machines driven by clean, performant code.
             </p>
             <div className="flex gap-4">
               <div className="bg-white/10 px-4 py-2 rounded-full font-mono text-xs">React</div>
               <div className="bg-white/10 px-4 py-2 rounded-full font-mono text-xs">TypeScript</div>
               <div className="bg-white/10 px-4 py-2 rounded-full font-mono text-xs">WebGL</div>
             </div>
          </div>
        </Section>

        {/* SCENE 3: THE MOTION (Rigged/Animated) */}
        <Section id="motion" onEnter={handleEnterMotion} className="items-end">
          <div className="max-w-xl text-right">
             <h2 className="text-5xl font-bold mb-4 text-horizn-accent">Fluid Motion</h2>
             <p className="text-lg text-white/70 mb-8 leading-relaxed">
               Static is boring. We breathe life into pixels with advanced rigging, physics simulations, and seamless transitions.
             </p>
             <button className="border border-horizn-accent text-horizn-accent px-8 py-3 rounded hover:bg-horizn-accent hover:text-black transition-all uppercase font-bold tracking-widest">
               See Animation Reel
             </button>
          </div>
        </Section>

        {/* SCENE 4: THE POLISH (VFX/Bloom) */}
        <Section id="polish" onEnter={handleEnterPolish}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold">The Polish</h2>
              <p className="text-white/70">
                High-fidelity post-processing, cinematic color grading, and meticulous attention to detail. See the difference.
              </p>
            </div>
            <div className="w-full h-full flex items-center justify-center">
               <BeforeAfterSlider 
                beforeImage="https://picsum.photos/id/16/800/600" 
                afterImage="https://picsum.photos/id/18/800/600" 
              />
            </div>
          </div>
        </Section>
      </div>

      {/* SCENE 5: THE PRODUCT (Final + Work + Pricing) */}
      <Section id="work" onEnter={handleEnterProduct} className="!min-h-auto py-32">
        <div className="w-full max-w-7xl space-y-32">
          
          {/* Work Grid */}
          <div className="space-y-12">
            <h2 className="text-4xl font-bold border-l-4 border-horizn-accent pl-6">Selected Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROJECTS.map(project => (
                <VideoScrubber key={project.id} {...project} />
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div id="about" className="space-y-12 text-center pt-20">
            <h2 className="text-4xl font-bold">The Squad</h2>
            <TeamCards />
          </div>

          {/* Pricing Calculator */}
          <div id="contact" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/5 rounded-3xl p-8 md:p-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">Ready to Start?</h2>
              <p className="text-white/60 mb-8">
                Get an instant estimate for your next big idea. No hidden fees, just transparent pricing for world-class quality.
              </p>
              <button className="bg-horizn-accent text-black font-bold text-xl px-12 py-4 rounded hover:scale-105 transition-transform">
                BOOK A CALL
              </button>
            </div>
            <PriceCalculator />
          </div>

          {/* Footer */}
          <footer className="border-t border-white/10 pt-12 flex justify-between text-sm text-white/40 font-mono">
            <div>© 2024 HORIZN STUDIO</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">TWITTER</a>
              <a href="#" className="hover:text-white">INSTAGRAM</a>
              <a href="#" className="hover:text-white">LINKEDIN</a>
            </div>
          </footer>
        </div>
      </Section>

    </div>
  );
};