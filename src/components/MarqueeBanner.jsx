import React from 'react';
import { motion } from 'framer-motion';

const MarqueeBanner = () => {
  return (
    <div className="w-full overflow-hidden bg-brand py-4 border-y border-brand-dark relative z-20">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
          className="flex whitespace-nowrap text-white font-bold tracking-[0.2em] uppercase text-sm md:text-base items-center"
        >
          {/* We duplicate the content to make it seamless */}
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-8">•</span>
              <span>Wireless Automation</span>
              <span className="mx-8">•</span>
              <span>Zero Rewiring</span>
              <span className="mx-8">•</span>
              <span>Voice Controlled</span>
              <span className="mx-8">•</span>
              <span>Luxury Smart Living</span>
              <span className="mx-8">•</span>
              <span>Retrofit Ready</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MarqueeBanner;
