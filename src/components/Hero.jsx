import { motion, useReducedMotion } from 'framer-motion';
import Button from './ui/Button';

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-base">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80"
          alt="Modern luxury home interior with smart lighting"
          className="w-full h-full object-cover opacity-60"
          fetchPriority="high"
        />
        {/* Soft white gradient over the video */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Content */}
      <div className="max-w-7xl w-full mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-block"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-md text-brand text-sm font-bold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand pulse-glow" />
              Zen Touch Panels
            </span>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <div className="overflow-hidden flex flex-wrap gap-x-4">
              {["Touch", "Every"].map((word, i) => (
                <motion.span 
                  key={i}
                  variants={wordVariants}
                  className="title-font text-[clamp(2.8rem,8vw,6.5rem)] font-bold tracking-tighter leading-[0.9]"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            
            <div className="overflow-hidden flex flex-wrap gap-x-4">
              {["Mood", "Prime."].map((word, i) => (
                <motion.span 
                  key={i}
                  variants={wordVariants}
                  className={`title-font text-[clamp(2.8rem,8vw,6.5rem)] font-bold tracking-tighter leading-[0.9] ${word === 'Prime.' ? 'text-brand' : ''}`}
                  style={word === 'Live' ? { WebkitTextStroke: '2px #111', color: 'transparent' } : {}}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[3px] bg-brand mb-8"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-text-secondary mb-12 leading-relaxed max-w-xl"
          >
            <strong className="text-text-primary block mb-3 font-bold tracking-wider text-xs uppercase">Premium smart touch switch panels</strong>
            Control lights, fans, curtains, AC, scenes, and security from elegant glass-finish Zen Touch Panels, with app, voice, and remote control built for modern Indian homes.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button href="#products" className="text-lg px-10 py-5">Explore Touch Panels</Button>
            <Button href="#contact" variant="secondary" className="text-lg px-10 py-5 text-text-primary border-black/10 hover:bg-black/5 hover:border-black/20">Book Free Consultation</Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#technology"
        aria-label="Scroll to panel technology"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-6 hidden md:flex flex-col items-center gap-3 group"
      >
        <span className="text-[10px] text-text-primary font-bold tracking-widest uppercase rotate-90 mb-5 origin-left translate-x-3 group-hover:text-brand transition-colors">Scroll</span>
        <div className="w-6 h-11 rounded-full border border-black/25 flex justify-center pt-2 bg-white/40 backdrop-blur-sm group-hover:border-brand transition-colors">
          <span className="scroll-cue-dot w-1.5 h-1.5 rounded-full bg-brand" />
        </div>
      </motion.a>
    </section>
  );
};

export default Hero;
