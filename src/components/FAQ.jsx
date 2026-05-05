import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import WordReveal from './ui/WordReveal';

const faqs = [
  {
    question: "Can Primezen be installed in an existing home without rewiring?",
    answer: "Yes! Our wireless and battery-free technology is designed specifically for retrofitting. We can automate your home without breaking any walls or altering your existing electrical wiring."
  },
  {
    question: "Do your smart switches work without the internet?",
    answer: "Absolutely. While internet is required for remote app control and voice assistants, our switches use localized RF/kinetic technology to communicate with controllers, meaning they work perfectly even during an internet outage."
  },
  {
    question: "Is it compatible with Alexa, Google Assistant, or Apple HomeKit?",
    answer: "Yes, our smart controllers integrate seamlessly with major voice assistants like Amazon Alexa and Google Assistant, allowing you to control your home with simple voice commands."
  },
  {
    question: "What is the warranty period for your products?",
    answer: "We offer a comprehensive warranty on all our touch panels, controllers, and kinetic switches. Please contact our sales team for specific warranty details per product line."
  },
  {
    question: "How long does installation typically take?",
    answer: "Most residential installations are completed within 1-2 days depending on the scope. Since our system is wireless, there's no messy rewiring work — we simply configure the controllers and pair the switches."
  },
];

const FAQItem = ({ question, answer, isOpen, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-black/10 group last:border-b-0"
    >
      <button 
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none gap-6 cursor-pointer"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className={`text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-brand' : 'text-black group-hover:text-brand'}`}>
          {question}
        </span>
        <div className={`w-10 h-10 rounded-full border shrink-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-brand bg-brand text-white rotate-0 shadow-md shadow-brand/20' : 'border-black/20 text-black group-hover:border-brand group-hover:text-brand'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-text-secondary text-lg leading-relaxed pb-8 pr-12 font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-16 px-6 bg-bg-base">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-4 lg:sticky lg:top-28"
        >
          <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">FAQ</span>
          <WordReveal
            text="Questions Before You Upgrade?"
            as="h2"
            whileInView
            stagger={0.06}
            duration={0.85}
            className="title-font text-[clamp(2.25rem,4vw,4rem)] font-bold tracking-tight leading-[1.04] text-black"
          />
          <p className="text-text-secondary text-lg font-medium mt-5 leading-relaxed">
            Quick answers for installation, compatibility, warranty, and everyday use of Primezen panels.
          </p>
        </motion.div>

        <div className="lg:col-span-8 bg-white rounded-[32px] p-6 md:p-8 shadow-2xl shadow-black/5 border border-black/5">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
