import { motion } from 'framer-motion';

const SensoryOverlay = () => {
  return (
    <>
      {/* Cinematic Grain/Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.035] mix-blend-multiply">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Ambient Floating Orbs (Subtle Background Depth) */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brand/5 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 80, -120, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-brand/3 blur-[150px] rounded-full"
        />
      </div>
    </>
  );
};

export default SensoryOverlay;
