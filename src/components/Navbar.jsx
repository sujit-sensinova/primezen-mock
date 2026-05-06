import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './ui/Magnetic';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Technology', href: '#technology' },
    { name: 'Products', href: '#products' },
    { name: 'Projects', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm'
            : 'py-6 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Magnetic strength={0.2}>
            <a href="#" className="relative z-50 flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm">
              <img
                src="/logo/SVG/logo-dark.svg"
                alt="PrimeZen Logo"
                className="h-7 md:h-8 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <span class="text-2xl font-bold tracking-tight text-black">
                      Prime<span class="text-brand">zen</span>
                    </span>
                  `;
                }}
              />
            </a>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Magnetic key={link.name} strength={0.4}>
                <a
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm px-2 py-1 relative group ${isScrolled ? 'text-text-secondary hover:text-black' : 'text-black/70 hover:text-black'
                    }`}
                >
                  {link.name}
                  {/* Hover underline */}
                  <span className="absolute -bottom-1 left-2 right-2 h-[2px] bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              </Magnetic>
            ))}
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${isScrolled
                    ? 'bg-black text-white hover:bg-black/80 shadow-md'
                    : 'bg-black text-white hover:bg-black/80 shadow-md'
                  }`}
              >
                Get a Quote
              </a>
            </Magnetic>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 p-2 text-black outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-8 w-full px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-bold title-font text-black hover:text-brand transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 px-10 py-4 bg-brand text-white rounded-full text-xl font-bold hover:bg-brand-dark transition-colors w-full text-center shadow-xl shadow-brand/20"
              >
                Get a Quote
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
