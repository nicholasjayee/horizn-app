import React, { useEffect } from 'react';
import { useStore, AppStage } from '../store/useStore';
import { IPhone } from '../components/ui/devices/IPhone';
import { Laptop } from '../components/ui/devices/Laptop';
import { SceneContainer } from '../components/3d/SceneContainer';
import { Experience } from '../components/3d/Experience';

export const Dev: React.FC = () => {
  const setStage = useStore(state => state.setStage);

  useEffect(() => {
    setStage(AppStage.CODE);
  }, [setStage]);

  return (
    <>
      <SceneContainer>
        <Experience />
      </SceneContainer>

      <div className="w-full min-h-screen p-6 md:p-20 pt-32 flex flex-col items-center">
         <div className="max-w-7xl w-full text-center space-y-20">
           <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">ENGINEERING</h1>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Building robust digital ecosystems with cutting-edge technology. From native mobile applications to high-performance web platforms.
              </p>
           </div>

           {/* Platforms Section */}
           <div className="py-20 border-t border-white/10 w-full">
              <h2 className="text-3xl font-bold mb-12 text-left">PLATFORMS</h2>
              
              <div className="flex flex-col gap-24">
                  
                  {/* Row 1: Mobile & Laptop */}
                  <div className="flex flex-col xl:flex-row gap-20 items-center justify-center">
                      
                      {/* Mobile Mockup */}
                      <div className="flex flex-col items-center gap-4">
                          <IPhone type="15">
                              <div className="w-full min-h-full bg-white text-black p-4 pt-12">
                                  <div className="flex items-center justify-between mb-6">
                                      <h3 className="font-bold text-2xl">Messages</h3>
                                      <div className="w-8 h-8 bg-blue-500 rounded-full" />
                                  </div>
                                  <div className="space-y-4">
                                      <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                                          <p className="text-xs">Hey, did you see the new deploy?</p>
                                      </div>
                                      <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] ml-auto">
                                          <p className="text-xs">Yeah! The physics engine is insane.</p>
                                      </div>
                                      <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                                          <p className="text-xs">Client loves the smooth scroll too.</p>
                                      </div>
                                      <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] ml-auto">
                                          <p className="text-xs">Shipping it to prod tonight 🚀</p>
                                      </div>
                                  </div>
                                  <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                      <div className="h-24 bg-gray-200 rounded-lg mb-2 animate-pulse" />
                                      <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                                  </div>
                              </div>
                          </IPhone>
                          <span className="text-xs font-mono text-white/50">iPhone 15 • Native iOS/Android</span>
                      </div>

                      {/* Laptop Mockup */}
                      <div className="flex flex-col items-center gap-4 w-full max-w-[600px]">
                          <Laptop className="!w-full">
                              <div className="w-full h-full bg-[#1e1e1e] text-white p-4 pt-8 font-mono text-[10px] leading-relaxed">
                                  <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
                                      <span className="text-yellow-400">index.tsx</span>
                                      <span className="text-white/30">styles.css</span>
                                      <span className="text-white/30">api.ts</span>
                                  </div>
                                  <div className="space-y-1">
                                      <p><span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;</p>
                                      <p><span className="text-purple-400">import</span> {`{ Canvas }`} <span className="text-purple-400">from</span> <span className="text-green-400">'@react-three/fiber'</span>;</p>
                                      <br />
                                      <p><span className="text-blue-400">const</span> <span className="text-yellow-300">Experience</span> = () ={`>`} {`{`}</p>
                                      <p className="pl-4"><span className="text-blue-400">return</span> (</p>
                                      <p className="pl-8">{`<Canvas shadows>`}</p>
                                      <p className="pl-12">{`<ambientLight intensity={0.5} />`}</p>
                                      <p className="pl-12">{`<mesh position={[0, 0, 0]}>`}</p>
                                      <p className="pl-16">{`<boxGeometry args={[1, 1, 1]} />`}</p>
                                      <p className="pl-16">{`<meshStandardMaterial color="hotpink" />`}</p>
                                      <p className="pl-12">{`</mesh>`}</p>
                                      <p className="pl-8">{`</Canvas>`}</p>
                                      <p className="pl-4">);</p>
                                      <p>{`}`};</p>
                                  </div>
                                  <div className="absolute bottom-0 left-0 w-full h-6 bg-blue-600 flex items-center px-2 gap-4 text-[9px]">
                                      <span>MAIN</span>
                                      <span>Ln 12, Col 42</span>
                                      <span>UTF-8</span>
                                      <span className="ml-auto">TypeScript React</span>
                                  </div>
                              </div>
                          </Laptop>
                          <span className="text-xs font-mono text-white/50">Full-Stack Web Architecture</span>
                      </div>

                  </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left pt-20 w-full max-w-4xl mx-auto">
              <div className="p-8 border border-white/10 rounded-xl bg-white/5">
                <h3 className="text-2xl font-bold mb-4 text-horizn-accent">Mobile Development</h3>
                <p className="text-sm text-white/70">
                  Native and cross-platform mobile applications built with React Native and Swift. We focus on performance, gesture-driven interfaces, and offline-first capabilities.
                </p>
              </div>
              <div className="p-8 border border-white/10 rounded-xl bg-white/5">
                <h3 className="text-2xl font-bold mb-4 text-horizn-accent">Web Engineering</h3>
                <p className="text-sm text-white/70">
                  WebGL, React/Next.js, GLSL Shaders, and High-performance Creative Coding. We build immersive web experiences that push the boundaries of the browser.
                </p>
              </div>
           </div>
         </div>
      </div>
    </>
  );
};