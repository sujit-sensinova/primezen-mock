import { motion, useReducedMotion } from 'framer-motion';
import CountUp from './ui/CountUp';

const stats = [
  { value: '500+', label: 'Homes Automated' },
  { value: '10+', label: 'Years Experience' },
  { value: '100%', label: 'Wireless Tech' },
  { value: '24/7', label: 'Support' },
];

const About = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
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
    <section id="about" className="py-16 px-6 bg-bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left — Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main image */}
            <div className="rounded-[40px] overflow-hidden shadow-2xl shadow-black/10 relative group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
                alt="Luxury modern home interior with smart lighting"
                className="w-full h-[600px] object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating stats overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="absolute -bottom-8 -right-4 md:right-8 bg-white/90 backdrop-blur-xl shadow-2xl shadow-black/10 rounded-3xl p-8 grid grid-cols-2 gap-6 min-w-[320px] border border-white"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <CountUp
                    to={stat.value}
                    duration={1.8}
                    className="text-3xl md:text-4xl font-bold text-brand block mb-1"
                  />
                  <span className="text-sm font-semibold text-text-secondary">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right — Copy */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pl-10 pt-16 lg:pt-0"
          >
            <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">About Primezen</span>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="overflow-hidden flex flex-wrap gap-x-4">
                {["Redefining", "Luxury"].map((word, i) => (
                  <motion.span key={i} variants={wordVariants} className="title-font text-[clamp(2rem,3.5vw,3.8rem)] font-bold tracking-tight leading-[1.05] text-black inline-block origin-bottom">{word}</motion.span>
                ))}
              </div>
              <div className="overflow-hidden flex flex-wrap gap-x-4">
                {["Living", "in", "India"].map((word, i) => (
                  <motion.span key={i} variants={wordVariants} className="title-font text-[clamp(2rem,3.5vw,3.8rem)] font-bold tracking-tight leading-[1.05] text-black inline-block origin-bottom">{word}</motion.span>
                ))}
              </div>
            </motion.div>
            
            <div className="space-y-6 text-xl text-text-secondary leading-relaxed font-medium">
              <p>
                As a premier smart home automation company, we specialize in creating personalized experiences tailored to your lifestyle. We believe that technology should seamlessly blend into your space, enhancing comfort, security, and aesthetics without the clutter of complex wiring.
              </p>
              <p>
                Our expert installation team ensures your home responds to your needs effortlessly, transforming ordinary houses into intelligent havens.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-black/5">
              <div className="flex -space-x-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" alt="Client" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80" alt="Client" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80" alt="Client" className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" />
                <div className="w-12 h-12 rounded-full border-2 border-white bg-brand/10 flex items-center justify-center text-sm font-bold text-brand shadow-sm">+</div>
              </div>
              <div>
                <p className="text-base font-bold text-black mb-0.5">Trusted by top architects</p>
                <p className="text-sm font-medium text-text-secondary">and interior designers across India</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
