import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Button from './ui/Button';

const frameCount = 192;
const currentFrame = index => `/hero_frames/${index.toString().padStart(3, '0')}.jpg`;

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

  // Preload images
  useEffect(() => {
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      imagesRef.current.push(img);
    }
  }, []);

  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[index];
    
    // Only render if image is loaded
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Ensure canvas dimensions match window to stay sharp
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;
    const cratio = cw / ch;
    const iratio = iw / ih;

    let rw, rh, sx, sy;
    if (cratio > iratio) {
        rw = iw;
        rh = iw / cratio;
        sx = 0;
        sy = (ih - rh) / 2;
    } else {
        rh = ih;
        rw = ih * cratio;
        sy = 0;
        sx = (iw - rw) / 2;
    }

    ctx.drawImage(img, sx, sy, rw, rh, 0, 0, cw, ch);
  };

  useEffect(() => {
    const handleResize = () => {
      // Re-render the current frame on resize based on current scroll position
      const scrollPos = window.scrollY;
      const containerTop = containerRef.current?.offsetTop || 0;
      const maxScroll = (containerRef.current?.offsetHeight || window.innerHeight) - window.innerHeight;
      
      let progress = 0;
      if (maxScroll > 0) {
        progress = Math.min(1, Math.max(0, (scrollPos - containerTop) / maxScroll));
      }
      
      const frameIndex = Math.floor(progress * (frameCount - 1));
      renderFrame(frameIndex);
    };
    
    // Draw first frame when the first image loads
    if (imagesRef.current[0]) {
      imagesRef.current[0].onload = () => renderFrame(0);
      if (imagesRef.current[0].complete) renderFrame(0);
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8, 0.95], [1, 1, 0]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (shouldReduceMotion) return;
    const index = Math.min(frameCount - 1, Math.max(0, Math.floor(latest)));
    renderFrame(index);
  });

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
    <section ref={containerRef} className="relative h-[250vh] bg-bg-base">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Canvas Background Sequence */}
        <div className="absolute inset-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

        {/* Content */}
        <motion.div style={{ opacity: textOpacity }} className="max-w-7xl w-full mx-auto px-6 relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32 pt-32">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 w-full">
            
            {/* Left Column: Badge & Title */}
            <div className="w-full lg:w-auto max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-block"
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
                className="mix-blend-difference text-white"
              >
                <div className="overflow-hidden flex flex-wrap gap-x-4">
                  {["Touch", "Every"].map((word, i) => (
                    <motion.span 
                      key={i}
                      variants={wordVariants}
                      className="title-font text-[clamp(2rem,5.5vw,4.5rem)] font-bold tracking-tighter leading-[0.9]"
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
                      className={`title-font text-[clamp(2rem,5.5vw,4.5rem)] font-bold tracking-tighter leading-[0.9] ${word === 'Prime.' ? 'text-[#ff3333]' : ''}`}
                      style={word === 'Live' ? { WebkitTextStroke: '2px #111', color: 'transparent' } : {}}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Description & CTAs */}
            <div className="w-full lg:w-[45%] flex flex-col items-start lg:items-end text-left lg:text-right">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-[3px] bg-brand mb-6 mix-blend-difference self-start lg:self-end hidden lg:block"
              />
              
              <motion.p 
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-base md:text-lg mb-8 leading-relaxed mix-blend-difference text-white/90 w-full"
              >
                <strong className="text-white block mb-3 font-bold tracking-wider text-xs uppercase">Premium smart touch switch panels</strong>
                Control lights, fans, curtains, AC, scenes, and security from elegant glass-finish Zen Touch Panels, with app, voice, and remote control built for modern Indian homes.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-start lg:justify-end"
              >
                <Button href="#products" className="text-[15px] px-8 py-4">Explore Touch Panels</Button>
                <Button href="#contact" variant="secondary" className="text-[15px] px-8 py-4 text-text-primary border-black/10 hover:bg-black/5 hover:border-black/20">Book Free Consultation</Button>
              </motion.div>
            </div>

          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div style={{ opacity: textOpacity }} className="absolute bottom-8 left-6 hidden md:block">
          <motion.a
            href="#technology"
            aria-label="Scroll to panel technology"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex flex-col items-center gap-3 group"
          >
          <span className="text-[10px] text-text-primary font-bold tracking-widest uppercase rotate-90 mb-5 origin-left translate-x-3 group-hover:text-brand transition-colors">Scroll</span>
          <div className="w-6 h-11 rounded-full border border-black/25 flex justify-center pt-2 bg-white/40 backdrop-blur-sm group-hover:border-brand transition-colors">
            <span className="scroll-cue-dot w-1.5 h-1.5 rounded-full bg-brand" />
          </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
