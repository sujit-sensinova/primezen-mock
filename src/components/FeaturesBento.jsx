import { motion, useReducedMotion } from 'framer-motion';

const DrawingIcon = ({ children, className = "" }) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.path
        d={children}
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut", delay: 0.2 }
          }
        }}
      />
    </motion.svg>
  );
};

const FeaturesBento = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="technology" className="py-16 px-6 bg-bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Panel Technology</span>
          <h2 className="title-font text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight mb-6 leading-[1.05] text-black">Elegant Touch Control for Modern Indian Homes</h2>
          <p className="text-text-secondary text-lg leading-relaxed font-medium">Zen Touch Panels combine premium wall control with Primezen's wireless automation ecosystem, giving every room a cleaner, smarter way to manage daily comfort.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]"
        >
          {/* Featured Bento Card — Touch Panel Control */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-[32px] bg-white shadow-xl shadow-black/5 group hover:shadow-2xl hover:shadow-black/10 transition-all duration-500">
            <video 
              src="/color.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="relative h-full p-10 flex flex-col justify-end">
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md shadow-lg flex items-center justify-center mb-auto group-hover:scale-110 transition-transform duration-500 border border-white/20">
                <DrawingIcon className="w-8 h-8 text-white">M13 2L3 14h9l-1 8 10-12h-9l1-8z</DrawingIcon>
              </div>
              <div>
                <h3 className="title-font text-4xl font-bold mb-3 text-white tracking-tight">One Panel, Many Scenes</h3>
                <p className="text-white/70 text-lg max-w-lg font-medium leading-relaxed">Create room-ready controls for lights, fans, curtains, AC, and mood scenes from a refined glass-finish interface.</p>
              </div>
            </div>
          </motion.div>

          {/* Premium Finish */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-[32px] p-8 flex flex-col justify-end group hover:-translate-y-2 hover:shadow-xl shadow-md shadow-black/5 transition-all duration-500 relative overflow-hidden border border-black/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-100 transition-colors" />
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-auto relative z-10 group-hover:bg-green-50 transition-colors">
              <DrawingIcon className="w-7 h-7 text-black group-hover:text-green-600 transition-colors">M6 7H18V19H6V7ZM6 7V5H9M18 7V5H15M15 5V3H9V5</DrawingIcon>
            </div>
            <div className="relative z-10">
              <h3 className="title-font text-2xl font-bold mb-2 text-black">Premium Finish</h3>
              <p className="text-text-secondary font-medium">Glass-style panels designed to blend with luxury interiors.</p>
            </div>
          </motion.div>

          {/* Custom Icons */}
          <motion.div variants={itemVariants} className="lg:col-span-1 bg-white rounded-[32px] p-8 flex flex-col justify-end group hover:-translate-y-2 hover:shadow-xl shadow-md shadow-black/5 transition-all duration-500 relative overflow-hidden border border-black/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors" />
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-auto relative z-10 group-hover:bg-blue-50 transition-colors">
              <DrawingIcon className="w-7 h-7 text-black group-hover:text-blue-600 transition-colors">M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z</DrawingIcon>
            </div>
            <div className="relative z-10">
              <h3 className="title-font text-2xl font-bold mb-2 text-black">Custom Icons</h3>
              <p className="text-text-secondary font-medium">Clear etched labels for lighting, fans, curtains, AC, and scenes.</p>
            </div>
          </motion.div>

          {/* App & Voice */}
          <motion.div variants={itemVariants} className="lg:col-span-1 bg-white rounded-[32px] p-8 flex flex-col justify-end group hover:-translate-y-2 hover:shadow-xl shadow-md shadow-black/5 transition-all duration-500 relative overflow-hidden border border-black/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-100 transition-colors" />
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-auto relative z-10 group-hover:bg-purple-50 transition-colors">
              <DrawingIcon className="w-7 h-7 text-black group-hover:text-purple-600 transition-colors">M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01</DrawingIcon>
            </div>
            <div className="relative z-10">
              <h3 className="title-font text-2xl font-bold mb-2 text-black">App & Voice Ready</h3>
              <p className="text-text-secondary font-medium">Works with mobile control and popular voice assistants through the Primezen automation setup.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesBento;
