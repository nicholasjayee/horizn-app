import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';
import { useStore, AppStage } from '../store/useStore';
import { BLOG_POSTS } from '../data/blogs';
import { BlogNotFound } from '../components/ui/BlogNotFound';
import { LoadingScreen } from '../components/ui/LoadingScreen';

export const BlogView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const setStage = useStore(state => state.setStage);

  useEffect(() => {
    // Hide 3D elements for better reading experience
    setStage(AppStage.HIDDEN);
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [setStage, id]);

  const post = BLOG_POSTS.find(p => p.id === Number(id));

  if (!post) {
    return <BlogNotFound />;
  }

  return (
    <>
      <LoadingScreen />
      <article className="w-full min-h-screen bg-[#0a0a0a] pb-24">
        
        {/* Hero Image Section */}
        <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover grayscale opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
          
          <div className="absolute top-32 left-6 md:left-12 z-20">
             <button 
                onClick={() => navigate('/blog')}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase font-mono text-xs tracking-widest bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:border-white/30"
             >
                <ArrowLeft size={14} /> Back to Transmissions
             </button>
          </div>

          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
             <div className="max-w-4xl mx-auto">
                 <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-4 text-xs font-mono text-horizn-accent mb-4"
                 >
                    <span className="px-2 py-1 bg-horizn-accent/10 border border-horizn-accent/20 rounded">{post.category}</span>
                    <span className="flex items-center gap-1 text-white/60"><Clock size={12} /> {post.readTime} READ</span>
                 </motion.div>
                 
                 <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl md:text-7xl font-bold leading-none tracking-tighter mb-8"
                 >
                    {post.title}
                 </motion.h1>

                 <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap items-center gap-8 text-sm text-white/50 border-t border-white/10 pt-6 font-mono"
                 >
                    <div className="flex items-center gap-2">
                        <User size={14} />
                        <span className="text-white">{post.author}</span>
                        <span className="opacity-50">// {post.authorRole}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <button className="hover:text-white transition-colors flex items-center gap-2">
                            <Share2 size={14} /> SHARE
                        </button>
                    </div>
                 </motion.div>
             </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20 relative">
            <div className="absolute top-0 left-6 bottom-0 w-px bg-white/5 hidden md:block" />
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="prose prose-invert prose-lg max-w-none md:pl-12"
            >
                {/* Render HTML content safely */}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </motion.div>
            
            <div className="mt-20 pt-10 border-t border-white/10 md:pl-12">
                <p className="font-mono text-xs text-white/40 mb-4">TAGS</p>
                <div className="flex gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-xs border border-white/10 px-3 py-1 rounded-full text-white/60 hover:bg-white hover:text-black transition-all cursor-default">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>

      </article>
    </>
  );
};