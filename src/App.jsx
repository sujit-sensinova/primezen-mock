import { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LightColorPlayground from './components/LightColorPlayground';
import TrustedBy from './components/TrustedBy';
import FeaturesBento from './components/FeaturesBento';
import About from './components/About';
import ProductShowcase from './components/ProductShowcase';
import TouchPanelDetails from './components/TouchPanelDetails';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CookieBanner from './components/CookieBanner';
import Button from './components/ui/Button';
import MarqueeBanner from './components/MarqueeBanner';
import Preloader from './components/Preloader';
import MagneticText from './components/ui/MagneticText';
import InteractiveDemo from './components/InteractiveDemo';
import CurvedVideoCarousel from './components/CurvedVideoCarousel';
import BackToTop from './components/BackToTop';
import { useSound } from './hooks/useSound';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { playSound } = useSound(soundEnabled);
  
  const scrollFrame = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollFrame.current) return;
      scrollFrame.current = window.requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
        setScrollProgress(progress);
        scrollFrame.current = 0;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrame.current) window.cancelAnimationFrame(scrollFrame.current);
    };
  }, []);

  useEffect(() => {
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const handleAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      const startY = window.scrollY;
      const endY = target.getBoundingClientRect().top + window.scrollY - 82;
      const distance = endY - startY;
      const duration = Math.min(900, Math.max(450, Math.abs(distance) * 0.45));
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeOutCubic(progress));
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-bg-base text-text-primary selection:bg-brand selection:text-white">

        {/* Sound Toggle */}
        <button 
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="fixed bottom-10 left-10 z-[100] w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border border-black/5 hover:scale-110 transition-transform"
          aria-label={soundEnabled ? "Disable Sound" : "Enable Sound"}
        >
          {soundEnabled ? <Volume2 size={20} className="text-brand" /> : <VolumeX size={20} className="text-text-secondary" />}
        </button>

        <AnimatePresence mode="wait">
          {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onPointerDown={() => playSound('click')}
            className="relative z-10"
          >
            {/* Scroll Progress Bar */}
            <div 
              className="scroll-progress" 
              style={{ transform: `scaleX(${scrollProgress})` }}
            />

            <Navbar />
            
            <main id="main-content">
              <Hero />
              <LightColorPlayground />
              <TrustedBy />
              <FeaturesBento />
              <MarqueeBanner />
              <About />
              <ProductShowcase />
              <TouchPanelDetails />
              <InteractiveDemo />
              <MarqueeBanner />
              <Gallery />
              <CurvedVideoCarousel soundEnabled={soundEnabled} />
              <Testimonials />
              
              {/* Added solid white backgrounds for sections below the dark theme journey to ensure readability */}
              <div className="bg-bg-base text-text-primary">
                <FAQ />
                
                {/* Full-Screen CTA Section */}
                <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0">
                    <motion.img
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
                      alt="Luxury smart home with ambient lighting and modern automation"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto text-center relative z-10 px-6 py-24"
                  >
                    <span className="inline-block px-5 py-2 rounded-full border border-black/10 bg-white/80 backdrop-blur-md text-brand text-sm font-bold tracking-widest uppercase mb-8 shadow-sm">
                      Zen Touch Panels
                    </span>
                  <div className="mb-8 relative z-50">
                    <MagneticText
                      text="Upgrade Every Wall"
                      className="title-font text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-tighter leading-[0.9] text-black"
                    />
                    <MagneticText
                      text="with Zen Touch"
                      className="title-font text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-tighter leading-[0.9] text-black"
                    />
                  </div>
                    <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                      Replace ordinary switchboards with elegant touch panels that control lighting, fans, curtains, AC, scenes, and security from one refined interface.
                    </p>
                    <Button href="#contact" className="text-lg px-12 py-5 shadow-xl">
                      Plan Your Touch Panel Setup
                    </Button>
                  </motion.div>
                </section>

                <Contact />
                <Footer />
              </div>
            </main>
            
            <BackToTop />
            <FloatingWhatsApp />
            <CookieBanner />
          </motion.div>
        )}
      </div>
    </>
  );
}

export default App;
