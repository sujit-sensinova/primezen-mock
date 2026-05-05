import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Ease-out counter logic
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo formula
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * 100));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 600);
      }
    };
    
    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] bg-bg-base flex flex-col items-center justify-between p-10 md:p-20 overflow-hidden"
    >
      <div className="w-full flex justify-between items-start opacity-40 text-sm font-bold tracking-widest uppercase">
        <span>Loading Experience</span>
        <span>Primezen OS</span>
      </div>

      <div className="relative flex items-end justify-center overflow-hidden mix-blend-difference">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="title-font text-[clamp(8rem,25vw,25rem)] font-bold tracking-tighter leading-none text-black"
          style={{ WebkitTextStroke: '2px #111', color: 'transparent' }}
        >
          {String(count).padStart(3, '0')}
        </motion.div>
        
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="title-font text-[clamp(8rem,25vw,25rem)] font-bold tracking-tighter leading-none text-brand"
            initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
            animate={{ clipPath: `polygon(0 ${100 - count}%, 100% ${100 - count}%, 100% 100%, 0 100%)` }}
            transition={{ duration: 0.1 }}
          >
            {String(count).padStart(3, '0')}
          </motion.div>
        </div>
      </div>

      <div className="w-full flex justify-between items-end">
        <div className="opacity-40 text-sm font-bold tracking-widest uppercase max-w-[200px]">
          Please wait while we prepare your space
        </div>
        <div className="w-1/3 h-[1px] bg-black/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-brand origin-left"
            style={{ scaleX: count / 100 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
