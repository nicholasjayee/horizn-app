import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';
import { useStore, AppStage } from '../store/useStore';
import { ARCHIVE_PROJECTS } from '../data/archive_projects';
import { LoadingScreen } from '../components/ui/LoadingScreen';

export const ProjectView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const setStage = useStore(state => state.setStage);

  useEffect(() => {
    // Stage management for 3D background
    setStage(AppStage.HIDDEN);
    window.scrollTo(0, 0);
  }, [setStage, id]);

  const project = ARCHIVE_PROJECTS.find(p => p.id === Number(id));

  if (!project) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                <Link to="/work" className="text-horizn-accent hover:underline">Return to Archives</Link>
            </div>
        </div>
    );
  }

  const SocialIcon = ({ platform }: { platform: string }) => {
    switch(platform) {
        case 'github': return <Github size={18} />;
        case 'twitter': return <Twitter size={18} />;
        case 'instagram': return <Instagram size={18} />;
        case 'linkedin': return <Linkedin size={18} />;
        default: return <Globe size={18} />;
    }
  };

  return (
    <>
      <LoadingScreen />
      <div className="w-full min-h-screen bg-[#0a0a0a] pb-20">
        
        {/* Navigation & Hero Image */}
        <div className="relative w-full h-[60vh] lg:h-[80vh]">
            <img 
                src={project.heroImage} 
                alt={project.title} 
                className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
            
            <div className="absolute top-32 left-6 md:left-12 z-20">
                <button 
                    onClick={() => navigate('/work')}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase font-mono text-xs tracking-widest bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:border-white/30"
                >
                    <ArrowLeft size={14} /> Back to Archives
                </button>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-horizn-accent font-mono text-sm tracking-widest uppercase">{project.client}</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full" />
                            <span className="text-white/60 font-mono text-sm">{project.year}</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">{project.title}</h1>
                    </motion.div>
                </div>
            </div>
        </div>

        {/* Project Meta Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xs font-mono text-white/40 uppercase mb-2">Category</h3>
                    <p className="text-lg font-bold">{project.category}</p>
                </div>
                <div>
                    <h3 className="text-xs font-mono text-white/40 uppercase mb-2">Services</h3>
                    <div className="flex flex-col gap-1">
                        {project.services.map(s => <span key={s} className="text-sm">{s}</span>)}
                    </div>
                </div>
                <div>
                    <h3 className="text-xs font-mono text-white/40 uppercase mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map(t => (
                            <span key={t} className="text-[10px] border border-white/20 px-2 py-1 rounded bg-white/5">{t}</span>
                        ))}
                    </div>
                </div>
                <div>
                     <h3 className="text-xs font-mono text-white/40 uppercase mb-2">Links</h3>
                     <div className="flex flex-col gap-3">
                        {project.website && (
                            <a href={project.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-horizn-accent hover:text-white transition-colors text-sm font-bold">
                                Visit Site <ExternalLink size={14} />
                            </a>
                        )}
                        <div className="flex gap-4 mt-1">
                            {project.socials?.map((s, i) => (
                                <a key={i} href={s.url} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors">
                                    <SocialIcon platform={s.platform} />
                                </a>
                            ))}
                        </div>
                     </div>
                </div>
            </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                
                {/* Brief */}
                <div className="lg:col-span-8 space-y-12">
                     <div>
                        <h2 className="text-3xl font-bold mb-6">The Brief</h2>
                        <p className="text-xl text-white/70 leading-relaxed font-light">
                            {project.description}
                        </p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-horizn-accent">The Challenge</h3>
                            <p className="text-white/60 text-sm leading-relaxed">{project.challenge}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-horizn-accent">The Solution</h3>
                            <p className="text-white/60 text-sm leading-relaxed">{project.solution}</p>
                        </div>
                     </div>
                </div>

                {/* Sidebar / sticky elements could go here */}
            </div>
        </div>

        {/* Gallery */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-8">
            {project.gallery.map((img, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full"
                >
                    <img src={img} alt={`${project.title} gallery ${i}`} className="w-full rounded-lg border border-white/5 opacity-90 hover:opacity-100 transition-opacity" />
                </motion.div>
            ))}
        </div>

        {/* Footer Navigation */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-white/10 flex justify-between">
            <Link to="/work" className="text-white/50 hover:text-white uppercase text-xs font-mono tracking-widest">
                ← Index
            </Link>
            {/* Logic for next project could be added here */}
            <Link to={`/project/${project.id === 106 ? 101 : project.id + 1}`} className="text-white/50 hover:text-white uppercase text-xs font-mono tracking-widest">
                Next Project →
            </Link>
        </div>

      </div>
    </>
  );
};