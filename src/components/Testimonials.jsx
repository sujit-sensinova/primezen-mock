import { motion, useReducedMotion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import WordReveal from './ui/WordReveal';

const testimonials = [
  {
    name: "Rahul Desai",
    role: "Homeowner, Mumbai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    content: "The transition to a smart home was seamless. Since they use wireless tech, we didn't have to break any walls in our newly renovated apartment. The touch panels look incredibly premium.",
  },
  {
    name: "Neha Sharma",
    role: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    content: "As a designer, aesthetics are everything. Primezen's switches blend perfectly into modern interiors. I recommend them to all my clients looking for reliable, wire-free automation.",
  },
  {
    name: "Vikram Patel",
    role: "Homeowner, Ahmedabad",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    content: "Controlling my entire home's lighting from my phone and voice has completely changed my routine. The system has been flawless since day one.",
  },
];

const TestimonialCard = ({ name, role, content, avatar, index }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white shadow-xl shadow-black/5 p-7 rounded-[28px] flex flex-col h-full relative group hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 border border-black/5"
    >
      {/* Quote icon */}
      <Quote size={34} className="text-brand/10 mb-4 group-hover:text-brand/20 transition-colors duration-500" strokeWidth={2} />

      {/* Stars */}
      <div className="flex gap-1.5 text-brand mb-5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} fill="currentColor" />
        ))}
      </div>

      <p className="text-text-primary text-lg mb-7 flex-grow leading-relaxed font-medium">
        "{content}"
      </p>

      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-black/5">
        <img src={avatar} alt={name} className="w-14 h-14 rounded-full object-cover shadow-sm" loading="lazy" />
        <div>
          <h4 className="font-bold text-black text-base">{name}</h4>
          <p className="text-sm font-medium text-text-secondary">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10"
        >
          <div className="lg:col-span-7">
            <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Testimonials</span>
            <WordReveal
              text="What Our Clients Say"
              as="h2"
              whileInView
              stagger={0.06}
              duration={0.85}
              className="title-font text-[clamp(2.25rem,4.5vw,4rem)] font-bold tracking-tight leading-tight text-black"
            />
          </div>
          <p className="lg:col-span-5 text-text-secondary text-lg font-medium leading-relaxed">
            Homeowners and designers choose Primezen when they want smart control that still respects the interior design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} index={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
