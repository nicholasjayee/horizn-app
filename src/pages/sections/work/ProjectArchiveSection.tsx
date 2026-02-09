import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ARCHIVE_PROJECTS } from '../../../data/archive_projects';

export const ProjectArchiveSection: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section className="w-full py-12 md:py-24 border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">ARCHIVE</h2>
          <p className="text-white/50 font-mono text-xs md:text-sm max-w-xs text-right mt-4 md:mt-0">
             A collection of experiments, prototypes, and client work from the past 4 years.
          </p>
      </div>

      <div className="w-full">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-white/10 text-xs font-mono text-white/40 uppercase tracking-widest px-4">
              <div className="col-span-1">Year</div>
              <div className="col-span-4">Client</div>
              <div className="col-span-4">Project</div>
              <div className="col-span-3 text-right">Services</div>
          </div>

          {/* List Items */}
          <div className="flex flex-col">
              {ARCHIVE_PROJECTS.map((project, i) => (
                  <Link to={`/project/${project.id}`} key={project.id}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative md:grid md:grid-cols-12 md:gap-4 items-center py-6 md:py-8 border-b border-white/5 hover:bg-white/5 transition-colors px-4 cursor-pointer"
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        {/* Mobile Layout */}
                        <div className="flex md:hidden justify-between items-start mb-2">
                            <span className="text-xs font-mono text-white/40">{project.year}</span>
                            <span className="text-xs font-mono text-white/40">{project.category}</span>
                        </div>
                        <h3 className="text-xl font-bold md:hidden mb-2">{project.title}</h3>
                        <p className="text-sm text-white/60 md:hidden mb-4">{project.client}</p>

                        {/* Desktop Grid Layout */}
                        <div className="hidden md:block col-span-1 font-mono text-sm text-white/50">{project.year}</div>
                        <div className="hidden md:block col-span-4 font-bold text-lg">{project.client}</div>
                        <div className="hidden md:block col-span-4 text-white/70 group-hover:text-white transition-colors">{project.title}</div>
                        <div className="hidden md:block col-span-3 text-right">
                            <div className="flex justify-end gap-2 flex-wrap">
                                {project.services?.map(s => (
                                    <span key={s} className="text-[10px] border border-white/10 bg-black/20 px-2 py-1 rounded-full text-white/50">{s}</span>
                                ))}
                            </div>
                        </div>

                        {/* Hover Arrow */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 -translate-x-4 md:block hidden">
                            <ArrowUpRight size={20} className="text-horizn-accent" />
                        </div>
                    </motion.div>
                  </Link>
              ))}
          </div>
      </div>
    </section>
  );
};