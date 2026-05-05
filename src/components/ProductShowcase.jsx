import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WordReveal from './ui/WordReveal';

const products = [
  {
    title: "2, 4, 6 & 8 Module Panels",
    description: "Choose the right Zen Touch Panel layout for bedrooms, living rooms, kitchens, and offices with a clean glass-finish interface that replaces ordinary switches.",
    linkText: "Plan Panel Layouts",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Personalized Icons & Finishes",
    description: "Match your interiors with custom switch icons, premium finishes, and intuitive labels for lights, fans, curtains, AC, scenes, and more.",
    linkText: "Customize Your Panel",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    reverse: true,
  },
  {
    title: "Touch, App, Voice & Remote",
    description: "Control your home from the wall panel, Primezen app, Alexa, Google Assistant, Siri, or a dedicated remote, so every family member has a simple way to use it.",
    linkText: "Explore Control Options",
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=1200&q=80",
  },
];

const ProductCard = ({ title, description, linkText, image, reverse, index }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div 
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${reverse ? 'lg:[direction:rtl]' : ''}`}
    >
      {/* Image with 3D Tilt */}
      <div className={`${reverse ? '[direction:ltr]' : ''}`}>
        <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-black/5 group">
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={image} 
              alt={`Primezen ${title} - Smart Home Automation India`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {/* Product number badge */}
          <div className="absolute top-8 left-8 w-14 h-14 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-xl font-bold text-black border border-black/5">
            {String(index + 1).padStart(2, '0')}
          </div>
          
          {/* Subtle Glare Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>
      
      {/* Copy */}
      <div className={`${reverse ? '[direction:ltr]' : ''} py-10`}>
        <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Zen Touch Panels</span>
        <h3 className="title-font text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.1] text-black">{title}</h3>
        <p className="text-text-secondary text-xl mb-10 leading-relaxed font-medium">{description}</p>
        <a href="#contact" className="inline-flex items-center gap-3 text-brand font-bold text-lg group/link hover:gap-5 transition-all duration-300">
          {linkText}
          <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center group-hover/link:bg-brand group-hover/link:text-white transition-colors">
            <ArrowRight size={18} />
          </div>
        </a>
      </div>
    </motion.div>
  );
};

const ProductShowcase = () => {
  return (
    <section id="products" className="py-16 px-6 bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 max-w-3xl mx-auto"
        >
          <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Zen Touch Panels</span>
          <div className="mb-6">
            <WordReveal
              text="A Smarter Wall"
              as="h2"
              whileInView
              stagger={0.05}
              duration={0.8}
              className="title-font text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.05] text-black"
            />
            <WordReveal
              text="For Every Room"
              as="h2"
              whileInView
              stagger={0.05}
              duration={0.8}
              delay={0.12}
              className="title-font text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.05] text-black"
            />
          </div>
          <p className="text-text-secondary text-xl leading-relaxed font-medium">Zen Touch Panels bring lighting, fans, curtains, AC, security, and scenes into one elegant wall-mounted control experience.</p>
        </motion.div>

        <div className="flex flex-col gap-20 lg:gap-24">
          {products.map((product, i) => (
            <ProductCard key={i} index={i} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
