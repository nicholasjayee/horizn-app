import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TEAM_MEMBERS } from '../../../data/mockData';

const Card3D = ({ member }: { member: any }) => {
  const [flipped, setFlipped] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setFlipped(false);
  };

  return (
    <motion.div
      style={{
        perspective: 1000,
      } as any}
      className="w-80 h-[460px] cursor-pointer group relative z-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        } as any}
        className="w-full h-full relative transition-all duration-200"
      >
        {/* Flipping Container */}
        <motion.div
           className="w-full h-full relative"
           style={{ transformStyle: "preserve-3d" }}
           {...({
             animate: { rotateY: flipped ? 180 : 0 },
             transition: { duration: 0.6, type: "spring", stiffness: 260, damping: 20 }
           } as any)}
        >
            {/* FRONT FACE */}
            <div 
              className="absolute inset-0 bg-horizn-dark rounded-xl overflow-hidden border border-white/10 shadow-2xl"
              style={{ backfaceVisibility: 'hidden' }}
            >
                {/* Image */}
                <div className="h-full w-full relative">
                   <img src={member.avatar} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
                   
                   {/* Content */}
                   <div className="absolute bottom-0 left-0 w-full p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-horizn-accent animate-pulse shadow-[0_0_10px_#00ff88]" />
                        <span className="text-[10px] font-mono text-horizn-accent tracking-widest uppercase">Available</span>
                      </div>
                      <h3 className="text-4xl font-bold text-white mb-2 uppercase leading-none tracking-tighter">{member.name}</h3>
                      <p className="text-sm font-mono text-white/60">{member.role}</p>
                   </div>
                   
                   {/* Glitch/Noise Overlay */}
                   <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay" />
                   
                   {/* Top Border Accent */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-horizn-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>

            {/* BACK FACE */}
            <div 
              className="absolute inset-0 bg-black rounded-xl overflow-hidden border border-horizn-accent/30 shadow-[0_0_30px_rgba(0,255,136,0.1)]"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
                {/* Video Background */}
                <video src={member.video} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" autoPlay muted loop playsInline />
                
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 backdrop-blur-[2px]" />

                <div className="absolute inset-0 p-8 flex flex-col justify-between relative z-10">
                    <div className="flex justify-between items-start">
                        <span className="text-horizn-accent font-mono text-[10px] border border-horizn-accent/50 px-2 py-1 rounded bg-horizn-accent/10">CORE TEAM</span>
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur">
                            <span className="text-[10px] font-mono text-white/50">0{member.id}</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-mono text-white/50 uppercase tracking-wider">
                                <span>Projects Shipped</span>
                                <span className="text-white">82</span>
                            </div>
                            <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                  {...({
                                    initial: { width: 0 },
                                    animate: { width: flipped ? '80%' : 0 },
                                    transition: { delay: 0.2, duration: 1 }
                                  } as any)}
                                  className="h-full bg-white/60 shadow-[0_0_10px_white]" 
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                             <div className="flex justify-between text-[10px] font-mono text-white/50 uppercase tracking-wider">
                                <span>Technical Skill</span>
                                <span className="text-horizn-accent">MAX</span>
                            </div>
                            <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                  {...({
                                    initial: { width: 0 },
                                    animate: { width: flipped ? '95%' : 0 },
                                    transition: { delay: 0.4, duration: 1 }
                                  } as any)}
                                  className="h-full bg-horizn-accent shadow-[0_0_10px_#00ff88]" 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                         <div className="flex gap-2">
                             {['WEBGL', 'REACT', '3D'].map((tag, i) => (
                                 <span key={i} className="text-[10px] font-mono text-white/40 bg-white/5 px-2 py-1 rounded border border-white/5">
                                     {tag}
                                 </span>
                             ))}
                         </div>
                        <button className="w-full py-4 bg-white text-black hover:bg-horizn-accent transition-colors rounded-sm text-xs font-bold tracking-[0.2em] uppercase">
                            View Profile
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
}

export const TeamCards: React.FC = () => {
  return (
    <motion.div 
      {...({
        variants: container,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true }
      } as any)}
      className="flex flex-wrap justify-center gap-12 py-12 perspective-[2000px]"
    >
      {TEAM_MEMBERS.map((member) => (
        <motion.div key={member.id} variants={item as any}>
            <Card3D member={member} />
        </motion.div>
      ))}
    </motion.div>
  );
};