import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useStore, AppStage } from '../store/useStore';
import { BLOG_POSTS, BlogPost } from '../data/blogs';
import { ArrowUpRight, Clock, Calendar, Search, Filter, X, Tag, User } from 'lucide-react';
import { LoadingScreen } from '../components/ui/LoadingScreen';

export const Blog: React.FC = () => {
  const setStage = useStore(state => state.setStage);
  
  // Filtering States
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    setStage(AppStage.HIDDEN);
  }, [setStage]);

  // Derived Data for Filters
  const authors = useMemo(() => Array.from(new Set(BLOG_POSTS.map(p => p.author))), []);
  const allTags = useMemo(() => Array.from(new Set(BLOG_POSTS.flatMap(p => p.tags))), []);

  // Filter Logic
  const filteredPosts = useMemo(() => {
      return BLOG_POSTS.filter(post => {
          const matchesCategory = activeCategory === 'ALL' || post.category === activeCategory;
          
          const query = searchQuery.toLowerCase();
          const matchesSearch = searchQuery === '' || 
                                post.title.toLowerCase().includes(query) || 
                                post.excerpt.toLowerCase().includes(query) ||
                                post.authorRole.toLowerCase().includes(query); // Find staff by title
          
          const matchesAuthor = selectedAuthor === '' || post.author === selectedAuthor;
          const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);

          return matchesCategory && matchesSearch && matchesAuthor && matchesTag;
      });
  }, [activeCategory, searchQuery, selectedAuthor, selectedTag]);

  // Related Staff (Authors present in the current filtered view)
  const relatedStaff = useMemo(() => {
      const staffMap = new Map();
      filteredPosts.forEach(post => {
          if (!staffMap.has(post.author)) {
              staffMap.set(post.author, post.authorRole);
          }
      });
      return Array.from(staffMap.entries()).map(([name, role]) => ({ name, role }));
  }, [filteredPosts]);

  const isFiltering = activeCategory !== 'ALL' || searchQuery !== '' || selectedAuthor !== '' || selectedTag !== '';
  
  // Decide what to show: Featured + Grid OR Just Grid (if filtering)
  const featuredPost = !isFiltering ? (BLOG_POSTS.find(post => post.featured) || BLOG_POSTS[0]) : null;
  const gridPosts = !isFiltering ? BLOG_POSTS.filter(post => post.id !== featuredPost?.id) : filteredPosts;

  const resetFilters = () => {
      setSearchQuery('');
      setSelectedAuthor('');
      setSelectedTag('');
      setActiveCategory('ALL');
  };

  return (
    <>
      <LoadingScreen />
      <div className="w-full min-h-screen p-6 md:p-12 pt-32 flex flex-col items-center bg-[#0a0a0a]">
         <div className="w-full max-w-7xl mx-auto space-y-12">
            
            {/* Header & Controls */}
            <div className="border-b border-white/10 pb-8 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter">TRANSMISSIONS</h1>
                    
                    <button 
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-all ${isSearchOpen ? 'bg-white text-black border-white' : 'border-white/20 text-white hover:border-white'}`}
                    >
                        {isSearchOpen ? <X size={16} /> : <Search size={16} />}
                        <span className="text-xs font-bold uppercase tracking-widest">{isSearchOpen ? 'Close' : 'Advanced Search'}</span>
                    </button>
                </div>

                {/* Advanced Search Panel */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Search Input */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-white/50 uppercase">Keywords / Role</label>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search posts or staff titles..."
                                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 pl-10 text-sm text-white focus:outline-none focus:border-horizn-accent"
                                            />
                                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                        </div>
                                    </div>

                                    {/* Author Select */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-white/50 uppercase">Staff / Author</label>
                                        <div className="relative">
                                            <select 
                                                value={selectedAuthor}
                                                onChange={(e) => setSelectedAuthor(e.target.value)}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 pl-10 text-sm text-white appearance-none focus:outline-none focus:border-horizn-accent cursor-pointer"
                                            >
                                                <option value="">All Authors</option>
                                                {authors.map(author => (
                                                    <option key={author} value={author}>{author}</option>
                                                ))}
                                            </select>
                                            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                        </div>
                                    </div>

                                    {/* Tag Select */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-white/50 uppercase">Topic / Tag</label>
                                        <div className="relative">
                                            <select 
                                                value={selectedTag}
                                                onChange={(e) => setSelectedTag(e.target.value)}
                                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 pl-10 text-sm text-white appearance-none focus:outline-none focus:border-horizn-accent cursor-pointer"
                                            >
                                                <option value="">All Topics</option>
                                                {allTags.map(tag => (
                                                    <option key={tag} value={tag}>{tag}</option>
                                                ))}
                                            </select>
                                            <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                        </div>
                                    </div>
                                </div>

                                {/* Active Filters & Related Staff Display */}
                                <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-start gap-6">
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-mono text-white/50 uppercase block">Related Staff</span>
                                        <div className="flex flex-wrap gap-2">
                                            {relatedStaff.length > 0 ? relatedStaff.map(staff => (
                                                <div key={staff.name} className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-full px-3 py-1">
                                                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-horizn-accent to-blue-500 opacity-80" />
                                                    <div className="flex flex-col leading-none">
                                                        <span className="text-[10px] font-bold text-white">{staff.name}</span>
                                                        <span className="text-[8px] text-white/50">{staff.role}</span>
                                                    </div>
                                                </div>
                                            )) : (
                                                <span className="text-xs text-white/30 italic">No matching staff found.</span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={resetFilters}
                                        className="text-xs text-red-400 hover:text-red-300 underline font-mono"
                                    >
                                        Reset All Filters
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Category Tabs */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs font-mono text-white/50 gap-4">
                    <p>INSIGHTS FROM THE HORIZN NETWORK</p>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                        {['ALL', 'ENGINEERING', 'DESIGN', 'CULTURE', 'DEV', 'UX/UI'].map((cat, i) => {
                            // Map generic tabs to actual data categories where needed, mostly matching mock data
                            const isActive = activeCategory === cat;
                            return (
                                <button 
                                    key={cat} 
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-3 py-1 border rounded hover:text-white transition-colors whitespace-nowrap ${isActive ? 'bg-white text-black border-white' : 'border-white/20 text-white/50 hover:border-white'}`}
                                >
                                    {cat}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeCategory + searchQuery + selectedAuthor + selectedTag}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-12"
                >
                    {filteredPosts.length === 0 && (
                        <div className="text-center py-20 text-white/30 font-mono">
                            <p className="text-xl">NO SIGNALS FOUND</p>
                            <p className="text-sm mt-2">Try adjusting your frequency filters.</p>
                        </div>
                    )}

                    {/* Featured Post (Only visible if no specific filters active) */}
                    {featuredPost && (
                        <Link to={`/blog/${featuredPost.id}`}>
                            <motion.div 
                                className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center cursor-pointer mb-20"
                            >
                                <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 relative">
                                    <img 
                                        src={featuredPost.image} 
                                        alt={featuredPost.title} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 bg-horizn-accent text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                                        Featured
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-xs font-mono text-horizn-accent">
                                        <span>{featuredPost.category}</span>
                                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                                        <span className="text-white/50">{featuredPost.date}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold leading-tight group-hover:text-horizn-accent transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-lg text-white/60 leading-relaxed max-w-xl">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-6 pt-4">
                                        <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:gap-4 transition-all">
                                            Read Article <ArrowUpRight size={16} />
                                        </span>
                                        <span className="flex items-center gap-2 text-xs font-mono text-white/40">
                                            <Clock size={12} /> {featuredPost.readTime} READ
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    )}

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {gridPosts.map((post, i) => (
                            <Link to={`/blog/${post.id}`} key={post.id}>
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group flex flex-col gap-4 cursor-pointer h-full"
                                >
                                    <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10 relative">
                                        <div className="absolute inset-0 bg-horizn-accent/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                                        <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform"
                                        />
                                        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-white/10 text-white/70 text-[10px] font-mono px-2 py-1 uppercase">
                                            {post.category}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 flex flex-col flex-grow">
                                        <div className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
                                            <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                                            <span>{post.readTime} READ</span>
                                        </div>
                                        <h3 className="text-xl font-bold leading-tight group-hover:text-horizn-accent transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-white/50 line-clamp-2 flex-grow">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {post.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-[9px] border border-white/10 px-2 py-0.5 rounded text-white/30">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Newsletter / CTA */}
            <div className="w-full py-20 border-t border-white/10 mt-20">
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                    
                    <h2 className="text-3xl md:text-4xl font-bold">Stay on the frequency.</h2>
                    <p className="text-white/60 max-w-lg mx-auto">
                        Get the latest on creative technology, design systems, and WebGL directly to your inbox. No noise, just signal.
                    </p>
                    
                    <form className="max-w-md mx-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            type="email" 
                            placeholder="ENTER EMAIL ADDRESS" 
                            className="flex-grow bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-horizn-accent focus:bg-white/10 transition-all font-mono"
                        />
                        <button className="bg-white text-black font-bold text-xs uppercase px-6 py-3 rounded hover:bg-horizn-accent transition-colors tracking-widest">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

         </div>
      </div>
    </>
  );
};