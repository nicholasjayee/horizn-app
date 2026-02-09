import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStore, AppStage } from '../store/useStore';
import { TeamCards } from '../components/ui/tools/TeamCards';
import { Billboard } from '../components/ui/devices/Billboard';
import { SceneContainer } from '../components/3d/SceneContainer';
import { Experience } from '../components/3d/Experience';

const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  
  useEffect(() => {
    const startTimeout = setTimeout(() => {
        setStarted(true);
    }, delay * 1000);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i === text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [started, text]);

  return <span className="font-mono">{displayedText}<motion.span {...({ animate: { opacity: [0, 1, 0] }, transition: { duration: 0.8, repeat: Infinity } } as any)}>_</motion.span></span>;
};

export const Studio: React.FC = () => {
  const setStage = useStore(state => state.setStage);

  useEffect(() => {
    setStage(AppStage.CODE); 
  }, [setStage]);

  return (
    <>
      <SceneContainer>
        <Experience />
      </SceneContainer>

      <div className="w-full min-h-screen p-6 md:p-20 pt-32 flex flex-col items-center overflow-x-hidden">
         <div className="max-w-7xl w-full text-center space-y-32">
           
           <motion.div 
              {...({
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, ease: "easeOut" }
              } as any)}
           >
              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase">The Collective</h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
                We are a disparate group of creative technologists, 3D artists, and system architects working at the bleeding edge of the possible.
              </p>
           </motion.div>

           <TeamCards />

           {/* Creative Output / Showcase Section */}
           <div className="py-20 w-full relative">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <motion.div 
                  {...({
                      initial: { opacity: 0, x: -50 },
                      whileInView: { opacity: 1, x: 0 },
                      viewport: { once: true, margin: "-100px" },
                      transition: { duration: 0.8 }
                  } as any)}
                  className="mb-20 text-left"
              >
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">GLOBAL PRESENCE</h2>
                  <p className="text-white/50 font-mono">DEPLOYING ACROSS PHYSICAL & DIGITAL REALITIES</p>
              </motion.div>
              
              <motion.div 
                  {...({
                      initial: { opacity: 0, scale: 0.9 },
                      whileInView: { opacity: 1, scale: 1 },
                      viewport: { once: true },
                      transition: { duration: 1, ease: "easeOut" }
                  } as any)}
                  className="flex flex-col items-center gap-4 w-full"
              >
                  {/* Billboard Mockup */}
                  <Billboard className="mx-auto shadow-[0_50px_150px_rgba(0,0,0,0.5)]">
                      <div className="w-full h-full relative overflow-hidden bg-black group">
                          {/* Background Video */}
                          <video 
                              src="https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-futuristic-interface-3199-large.mp4" 
                              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen group-hover:opacity-80 transition-opacity duration-700"
                              autoPlay 
                              muted 
                              loop 
                              playsInline 
                          />
                          
                          {/* Dramatic Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] opacity-10 pointer-events-none" />

                          {/* Content - More Editorial Layout */}
                          <div className="relative z-20 w-full h-full flex flex-row items-center justify-between px-12 md:px-24">
                              <div className="text-left">
                                  <motion.div 
                                      className="flex items-center gap-3 mb-4"
                                      {...({
                                          initial: { opacity: 0 },
                                          whileInView: { opacity: 1 },
                                          transition: { delay: 0.5 }
                                      } as any)}
                                  >
                                      <motion.div 
                                          {...({
                                              animate: { opacity: [1, 0.2, 1], scale: [1, 1.2, 1] },
                                              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                          } as any)}
                                          className="w-2 h-2 rounded-full bg-horizn-accent shadow-[0_0_15px_#00ff88]"
                                      />
                                      <span className="text-horizn-accent font-mono text-xs md:text-sm tracking-[0.2em]">LIVE FEED</span>
                                  </motion.div>
                                  
                                  <div className="overflow-hidden">
                                      <motion.h2 
                                          {...({
                                              initial: { y: "100%" },
                                              whileInView: { y: 0 },
                                              transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }
                                          } as any)}
                                          className="text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter text-white mix-blend-difference"
                                      >
                                          FUTURE
                                      </motion.h2>
                                  </div>
                                  <div className="overflow-hidden">
                                      <motion.h2 
                                          {...({
                                              initial: { y: "100%" },
                                              whileInView: { y: 0 },
                                              transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }
                                          } as any)}
                                          className="text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50"
                                      >
                                          READY
                                      </motion.h2>
                                  </div>
                              </div>
                              
                              <motion.div 
                                  {...({
                                      initial: { height: 0 },
                                      whileInView: { height: "8rem" },
                                      transition: { duration: 1, ease: "circOut", delay: 0.5 }
                                  } as any)}
                                  className="hidden md:block w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent" 
                              />

                              <div className="text-right">
                                  <motion.div 
                                      {...({
                                          initial: { opacity: 0, x: 20 },
                                          whileInView: { opacity: 1, x: 0 },
                                          transition: { delay: 0.6 }
                                      } as any)}
                                      className="text-[10px] font-mono text-white/50 mb-2 tracking-widest"
                                  >
                                      CAMPAIGN ID
                                  </motion.div>
                                  <div className="text-xl md:text-2xl font-bold text-white mb-6">
                                      <TypewriterText text="HZ_2025_Q1" delay={1} />
                                  </div>
                                  <motion.button
                                      {...({
                                          initial: { opacity: 0, scale: 0.9 },
                                          whileInView: { opacity: 1, scale: 1 },
                                          whileHover: { scale: 1.05, textShadow: "0 0 8px rgba(255,255,255,0.5)" },
                                          transition: { delay: 1.5 }
                                      } as any)}
                                      className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-6 py-3 hover:bg-white hover:text-black transition-all duration-300 tracking-widest shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                                  >
                                      DISCOVER MORE
                                  </motion.button>
                              </div>
                          </div>
                      </div>
                  </Billboard>
                  <div className="flex items-center gap-4 mt-8 opacity-50">
                      <span className="text-xs font-mono text-white">NYC / TIMES SQUARE</span>
                      <span className="w-1 h-1 bg-white rounded-full" />
                      <span className="text-xs font-mono text-white">LDN / PICCADILLY</span>
                      <span className="w-1 h-1 bg-white rounded-full" />
                      <span className="text-xs font-mono text-white">TKY / SHIBUYA</span>
                  </div>
              </motion.div>
           </div>

           {/* Services Grid with Hover Effects */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left justify-center pb-20">
              {['STRATEGY', 'DESIGN', 'ENGINEERING', 'MOTION'].map((item, i) => (
                  <motion.div 
                      key={item}
                      {...({
                          initial: { opacity: 0, y: 20 },
                          whileInView: { opacity: 1, y: 0 },
                          viewport: { once: true },
                          transition: { delay: i * 0.1 }
                      } as any)}
                      className="p-10 border border-white/5 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] rounded-xl transition-all group cursor-default"
                  >
                      <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-horizn-accent transition-colors">{item}</h3>
                      <p className="text-sm text-white/50 group-hover:text-white/80 transition-colors leading-relaxed">
                          We define the future through {item.toLowerCase()}. Meticulous attention to detail and a relentless pursuit of perfection.
                      </p>
                  </motion.div>
              ))}
           </div>
         </div>
      </div>
    </>
  );
};