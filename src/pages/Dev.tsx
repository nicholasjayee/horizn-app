import React, { useEffect } from 'react';
import { useStore, AppStage } from '../store/useStore';
import { IPhone } from '../components/ui/devices/IPhone';
import { Laptop } from '../components/ui/devices/Laptop';
import { Desktop } from '../components/ui/devices/Desktop';
import { SceneContainer } from '../components/3d/SceneContainer';
import { Experience } from '../components/3d/Experience';
import { motion } from 'framer-motion';
import { Layout, Zap, Layers, Globe, Database, Lock, Monitor } from 'lucide-react';

// --- Mock Interfaces ---

const DashboardContent = ({ variant }: { variant: 'mobile' | 'laptop' | 'desktop' }) => (
  <div className="w-full h-full bg-[#0f1115] text-white flex flex-col font-sans">
    {/* Nav */}
    <div className="h-14 border-b border-white/5 flex items-center px-4 justify-between bg-[#16181d]">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded bg-horizn-accent/20 border border-horizn-accent flex items-center justify-center">
          <div className="w-3 h-3 bg-horizn-accent rounded-sm" />
        </div>
        {variant !== 'mobile' && <span className="font-bold text-xs tracking-widest text-white/80">NEXUS_OS</span>}
      </div>
      <div className="flex gap-3">
         <div className="w-20 h-2 bg-white/10 rounded-full" />
         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
      </div>
    </div>

    <div className="flex-1 flex overflow-hidden">
      {/* Sidebar - Hidden on mobile */}
      {variant !== 'mobile' && (
        <div className={`${variant === 'desktop' ? 'w-64' : 'w-16'} border-r border-white/5 flex flex-col gap-4 p-4 bg-[#16181d]`}>
           {[1,2,3,4,5].map(i => (
             <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 opacity-60">
                <div className="w-5 h-5 bg-white/20 rounded-sm" />
                {variant === 'desktop' && <div className="w-24 h-2 bg-white/10 rounded-full" />}
             </div>
           ))}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto no-scrollbar">
         <div className="flex justify-between items-end mb-8">
            <div>
               <h3 className="text-xl md:text-2xl font-bold mb-1">Overview</h3>
               <p className="text-xs text-white/40">System Status: Optimal</p>
            </div>
            {variant !== 'mobile' && (
               <div className="flex gap-2">
                 <div className="px-3 py-1 bg-white/5 rounded text-[10px] text-white/50">Last 24h</div>
                 <div className="px-3 py-1 bg-horizn-accent text-black rounded text-[10px] font-bold">Export</div>
               </div>
            )}
         </div>

         {/* Widgets Grid */}
         <div className={`grid gap-4 ${variant === 'mobile' ? 'grid-cols-1' : variant === 'laptop' ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {/* Chart Widget */}
            <div className={`bg-white/5 rounded-xl p-4 border border-white/5 ${variant === 'desktop' ? 'col-span-2' : 'col-span-1'}`}>
               <div className="flex justify-between mb-4">
                  <span className="text-xs text-white/50">Traffic Volume</span>
                  <span className="text-xs text-green-400">+24.5%</span>
               </div>
               <div className="h-32 flex items-end gap-1">
                  {[...Array(variant === 'mobile' ? 12 : 20)].map((_, i) => (
                    <div key={i} className="flex-1 bg-horizn-accent/20 rounded-t-sm hover:bg-horizn-accent transition-colors" style={{ height: `${Math.random() * 100}%` }} />
                  ))}
               </div>
            </div>

            {/* Stats Widget */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-4">
               <div className="space-y-1">
                 <div className="text-xs text-white/50">Active Nodes</div>
                 <div className="text-2xl font-mono">1,024</div>
               </div>
               <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                 <div className="bg-blue-500 w-[75%] h-full" />
               </div>
               <div className="space-y-1 pt-2">
                 <div className="text-xs text-white/50">Latency</div>
                 <div className="text-2xl font-mono">12ms</div>
               </div>
            </div>

            {/* List Widget */}
            <div className={`bg-white/5 rounded-xl p-4 border border-white/5 ${variant === 'mobile' ? '' : 'col-span-full'}`}>
               <div className="text-xs text-white/50 mb-4">Recent Deployments</div>
               <div className="space-y-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-green-500" />
                         <div className="w-20 h-2 bg-white/20 rounded-full" />
                      </div>
                      <div className="w-12 h-2 bg-white/10 rounded-full" />
                   </div>
                 ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  </div>
);

const EditorUI = () => (
  <div className="w-full h-full bg-[#1e1e1e] flex flex-col font-mono text-[10px] md:text-xs">
    {/* Toolbar */}
    <div className="h-8 bg-[#252526] flex items-center px-4 gap-4 border-b border-black">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="flex gap-4 ml-4 text-white/40">
        <span>File</span><span>Edit</span><span>View</span><span>Go</span><span>Run</span>
      </div>
    </div>
    
    <div className="flex-1 flex overflow-hidden">
       {/* File Tree */}
       <div className="w-48 bg-[#252526] flex flex-col gap-1 p-2 text-white/60">
          <div className="flex items-center gap-2 text-white"><span className="opacity-50">v</span> PROJECT_ROOT</div>
          <div className="pl-4">src</div>
          <div className="pl-6 text-blue-400">components</div>
          <div className="pl-8 flex items-center gap-2"><span className="text-yellow-400">TSX</span> Header.tsx</div>
          <div className="pl-8 flex items-center gap-2"><span className="text-yellow-400">TSX</span> Hero.tsx</div>
          <div className="pl-6 text-blue-400">utils</div>
          <div className="pl-8 flex items-center gap-2"><span className="text-blue-300">TS</span> api.ts</div>
          <div className="pl-4">package.json</div>
       </div>

       {/* Editor Area */}
       <div className="flex-1 bg-[#1e1e1e] p-4 text-gray-300 overflow-hidden relative">
          <div className="flex gap-4 mb-4 border-b border-white/5 pb-2 text-white/40">
             <span className="text-white border-b border-horizn-accent pb-2">Hero.tsx</span>
             <span>global.css</span>
          </div>
          
          <div className="space-y-1 opacity-80">
            <p><span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;</p>
            <p><span className="text-purple-400">import</span> {`{ Canvas }`} <span className="text-purple-400">from</span> <span className="text-green-400">'@react-three/fiber'</span>;</p>
            <br />
            <p><span className="text-blue-400">export const</span> <span className="text-yellow-300">Experience</span> = () ={`>`} {`{`}</p>
            <p className="pl-4"><span className="text-gray-500">// Initialize WebGL context</span></p>
            <p className="pl-4"><span className="text-blue-400">const</span> state = <span className="text-yellow-300">useThree</span>();</p>
            <br />
            <p className="pl-4"><span className="text-blue-400">return</span> (</p>
            <p className="pl-8">{`<Canvas shadows>`}</p>
            <p className="pl-12">{`<ambientLight intensity={0.5} />`}</p>
            <p className="pl-12">{`<mesh position={[0, 0, 0]}>`}</p>
            <p className="pl-16">{`<boxGeometry args={[1, 1, 1]} />`}</p>
            <p className="pl-16">{`<meshStandardMaterial color="#00ff88" />`}</p>
            <p className="pl-12">{`</mesh>`}</p>
            <p className="pl-8">{`</Canvas>`}</p>
            <p className="pl-4">);</p>
            <p>{`}`};</p>
          </div>

          {/* Cursor */}
          <div className="absolute top-[210px] left-[180px] w-0.5 h-4 bg-horizn-accent animate-pulse" />
       </div>

       {/* Minimap */}
       <div className="w-24 bg-[#1e1e1e] border-l border-white/5 p-1 opacity-50">
          {[...Array(30)].map((_, i) => (
             <div key={i} className="h-1 bg-white/20 mb-1 rounded-full" style={{ width: `${Math.random() * 80 + 20}%` }} />
          ))}
       </div>
    </div>

    {/* Status Bar */}
    <div className="h-6 bg-[#007acc] flex items-center px-4 justify-between text-white text-[9px]">
       <div className="flex gap-4">
          <span>master*</span>
          <span>0 errors, 0 warnings</span>
       </div>
       <div className="flex gap-4">
          <span>Ln 14, Col 22</span>
          <span>UTF-8</span>
          <span>TypeScript React</span>
       </div>
    </div>
  </div>
);

// --- Main Component ---

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

      <div className="w-full min-h-screen p-6 md:p-12 pt-32 flex flex-col items-center">
         <div className="max-w-[1400px] w-full space-y-32">
           
           {/* Header */}
           <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter">ENGINEERING</h1>
              <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto font-light">
                We build the digital nervous systems of tomorrow. Scalable, performant, and universally accessible.
              </p>
           </div>

           {/* Responsiveness Showcase */}
           <section className="w-full relative">
              <div className="text-center mb-16">
                  <span className="text-horizn-accent font-mono text-xs tracking-[0.2em] uppercase mb-4 block">Ecosystem</span>
                  <h2 className="text-4xl md:text-6xl font-bold">Fluid Intelligence</h2>
                  <p className="text-white/50 mt-4 max-w-2xl mx-auto">
                    One codebase, infinite modalities. Our applications adapt fluidly from pocket to desktop, preserving context and functionality across every breakpoint.
                  </p>
              </div>

              {/* Devices Cluster */}
              <div className="flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-4 relative py-12">
                  
                  {/* Laptop - Left/Back */}
                  <motion.div 
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="xl:absolute xl:left-0 xl:z-10 xl:scale-90 origin-right"
                  >
                      <Laptop className="!w-[500px] md:!w-[700px]">
                          <DashboardContent variant="laptop" />
                      </Laptop>
                  </motion.div>

                  {/* Desktop - Center/Front */}
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="z-20 shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                  >
                      <Desktop className="!w-[600px] md:!w-[900px]">
                          <DashboardContent variant="desktop" />
                      </Desktop>
                  </motion.div>

                  {/* Phone - Right/Front */}
                  <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="xl:absolute xl:right-20 xl:bottom-0 z-30 xl:scale-90 origin-left"
                  >
                      <IPhone type="15" className="!w-[280px]">
                          <DashboardContent variant="mobile" />
                      </IPhone>
                  </motion.div>
              </div>
           </section>

           {/* Web Tools Section */}
           <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-t border-white/10 pt-24">
              <div className="space-y-8">
                 <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                    <Layout size={24} className="text-horizn-accent" />
                 </div>
                 <h2 className="text-4xl font-bold">Desktop-Class Web Tools</h2>
                 <p className="text-lg text-white/60 leading-relaxed">
                    The browser is the new operating system. We engineer complex, data-heavy applications that rival native desktop performance. From IDEs to financial terminals, we push WebGL and Wasm to the limit.
                 </p>
                 <ul className="space-y-4 font-mono text-sm text-white/70">
                    <li className="flex items-center gap-3">
                       <Zap size={16} className="text-yellow-400" />
                       <span>Zero-latency state management</span>
                    </li>
                    <li className="flex items-center gap-3">
                       <Layers size={16} className="text-blue-400" />
                       <span>Canvas & WebGL rendering engines</span>
                    </li>
                    <li className="flex items-center gap-3">
                       <Globe size={16} className="text-green-400" />
                       <span>Offline-first PWA capabilities</span>
                    </li>
                 </ul>
              </div>

              <div className="relative">
                 <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-full opacity-50" />
                 <Desktop className="!w-full">
                    <EditorUI />
                 </Desktop>
              </div>
           </section>

           {/* Tech Stack Grid */}
           <section className="pt-20 pb-32">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
                 
                 {[
                   { icon: Globe, title: "Universal Web", desc: "Next.js & React ecosystems deploying edge-optimized content globally." },
                   { icon: Monitor, title: "Graphics", desc: "Three.js & WebGPU pipelines for cinema-quality real-time rendering." },
                   { icon: Database, title: "Infrastructure", desc: "Serverless architectures scaling automatically to meet demand." },
                   { icon: Lock, title: "Security", desc: "Enterprise-grade encryption and compliance built into the core." }
                 ].map((item, i) => (
                   <div key={i} className="bg-[#0a0a0a] p-8 group hover:bg-[#111] transition-colors">
                      <item.icon size={32} className="text-white/30 group-hover:text-horizn-accent transition-colors mb-6" />
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">
                        {item.desc}
                      </p>
                   </div>
                 ))}

              </div>
           </section>

         </div>
      </div>
    </>
  );
};