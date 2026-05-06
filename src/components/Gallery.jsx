import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Zap, Shield, Maximize2 } from 'lucide-react';
import Magnetic from './ui/Magnetic';

const projects = [
  {
    id: "mumbai-penthouse",
    title: "The Penthouse, Mumbai",
    desc: "Full lighting, climate, and security automation.",
    fullDesc: "A complete transformation of a 4,500 sqft luxury penthouse in Worli. Primezen touch panels were planned across key rooms so the client could manage lighting, curtains, comfort, and scenes through wall control, app control, and voice commands.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
    ],
    stats: { automation: "95%", space: "4500 sqft", tech: "Wireless" }
  },
  {
    id: "pune-villa",
    title: "Modern Villa, Pune",
    desc: "Retrofit wireless touch panels throughout.",
    fullDesc: "This heritage-inspired modern villa required a zero-wiring solution to preserve the intricate wall carvings. We deployed our flagship Wireless Kinetic switches and battery-free sensors to create a seamless smart environment without a single cut in the walls.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
    ],
    stats: { automation: "80%", space: "6000 sqft", tech: "Kinetic" }
  },
  {
    id: "delhi-condo",
    title: "Luxury Condo, Delhi",
    desc: "Voice-controlled smart living experience.",
    fullDesc: "A contemporary condo in Delhi featuring touch-panel based lighting scenes, entertainment controls, and comfort automation. The home can be managed through wall panels, mobile app control, and voice commands through the Primezen setup.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
    ],
    stats: { automation: "100%", space: "3200 sqft", tech: "Hybrid" }
  },
];

const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-2xl overflow-y-auto"
    >
      <div className="fixed top-6 right-6 md:top-10 md:right-10 z-[110]">
        <Magnetic strength={0.5}>
          <button 
            onClick={onClose}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
          >
            <X size={28} className="md:w-8 md:h-8" />
          </button>
        </Magnetic>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 py-24 md:py-32 min-h-screen">
        <motion.div 
          layoutId={`image-${project.id}`}
          className="rounded-[40px] overflow-hidden shadow-2xl h-fit sticky top-20"
        >
          <img src={project.image} alt={project.title} className="w-full h-full object-cover aspect-[4/5]" />
        </motion.div>

        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Case Study</span>
            <h2 className="title-font text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-black leading-none">{project.title}</h2>
            
            <div className="flex flex-wrap gap-4 mb-12">
              {Object.entries(project.stats).map(([key, value], idx) => (
                <div key={idx} className="bg-black/5 px-6 py-3 rounded-2xl border border-black/5">
                  <span className="text-[10px] font-bold text-brand uppercase block mb-1">{key}</span>
                  <span className="text-xl font-black text-black">{value}</span>
                </div>
              ))}
            </div>

            <div className="prose prose-xl max-w-none text-text-secondary leading-relaxed mb-12">
              <p>{project.fullDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="p-8 rounded-[32px] bg-bg-surface border border-black/5">
                <Zap className="text-brand mb-4" size={32} />
                <h4 className="font-bold text-black text-xl mb-2">Technical Feat</h4>
                <p className="text-text-secondary">Designed room-wise control flows so daily scenes feel quick, simple, and natural to use.</p>
              </div>
              <div className="p-8 rounded-[32px] bg-bg-surface border border-black/5">
                <Shield className="text-brand mb-4" size={32} />
                <h4 className="font-bold text-black text-xl mb-2">Zero Invasive</h4>
                <p className="text-text-secondary">No wall cutting or rewiring was performed during this entire installation.</p>
              </div>
            </div>

            <h4 className="title-font text-2xl font-bold mb-8 text-black uppercase tracking-wider">Project Gallery</h4>
            <div className="grid grid-cols-2 gap-4">
              {project.gallery.map((img, i) => (
                <div key={i} className="rounded-3xl overflow-hidden aspect-square shadow-lg">
                  <img src={img} alt="Detail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const targetRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  // Mobile: Simple vertical card layout with touch scroll
  if (isMobile) {
    return (
      <section id="gallery" className="py-24 px-4">
        <div className="mb-12">
          <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Portfolio</span>
          <h2 className="title-font text-4xl font-bold tracking-tight leading-none text-black">Signature Projects</h2>
        </div>

        {/* Horizontal touch-scroll carousel */}
        <div className="flex gap-6 overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
          {projects.map((project, i) => (
            <div 
              key={i} 
              className="w-[80vw] shrink-0 snap-center cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl border border-black/5 bg-white">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover ripple-on-hover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="title-font text-2xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-white/60 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    View Case Study <ArrowRight size={12} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </section>
    );
  }

  // Desktop: Full horizontal scroll experience
  return (
    <section ref={targetRef} id="gallery" className="relative h-[260vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-start overflow-hidden pt-24 pb-10">
        {/* Header */}
        <div className="px-6 md:px-20 z-10 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Portfolio</span>
            <h2 className="title-font text-[clamp(2.25rem,4.5vw,4rem)] font-bold tracking-tight leading-none text-black">Signature Projects</h2>
          </motion.div>
        </div>

        {/* Horizontal scroll container */}
        <motion.div 
          style={shouldReduceMotion ? {} : { x }} 
          className="flex gap-8 px-6 md:px-20"
          data-cursor="DRAG"
        >
          {projects.map((project, i) => (
            <div 
              key={i} 
              className="relative w-[85vw] md:w-[55vw] shrink-0 group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <motion.div 
                layoutId={`image-${project.id}`}
                className="relative aspect-[16/9] max-h-[62vh] overflow-hidden rounded-[32px] shadow-2xl shadow-black/10 border border-black/5 bg-white"
                data-cursor="VIEW"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover img-zoom ripple-on-hover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Expand indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/40">
                  <Maximize2 className="text-white" size={32} />
                </div>

                <div className="absolute bottom-0 left-0 p-10 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="title-font text-4xl md:text-5xl font-bold mb-4 text-white">{project.title}</h3>
                  <div className="flex items-center gap-2 text-white/60 font-bold uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    Click to view Case Study <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
          
          {/* Final "View More" Card */}
          <div className="relative w-[40vw] shrink-0 flex items-center justify-center">
             <div className="text-center group cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-brand flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-brand/20 mx-auto">
                   <ArrowRight size={32} />
                </div>
                <h3 className="title-font text-2xl font-bold text-black tracking-widest uppercase">View All<br/>Projects</h3>
             </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <div className="absolute bottom-20 left-20 right-20 h-[1px] bg-black/10 z-10 hidden md:block">
        <motion.div 
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-0 bg-brand origin-left" 
        />
      </div>
    </section>
  );
};

export default Gallery;
