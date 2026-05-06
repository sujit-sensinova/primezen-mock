import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import WordReveal from './ui/WordReveal';

gsap.registerPlugin(ScrollTrigger);

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
  },
  {
    title: "Touch, App, Voice & Remote",
    description: "Control your home from the wall panel, Primezen app, Alexa, Google Assistant, Siri, or a dedicated remote, so every family member has a simple way to use it.",
    linkText: "Explore Control Options",
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=1200&q=80",
  },
];

const ProductShowcase = () => {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Desktop: Pinned sequence animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", // Increased pin duration to give much more scrolling room
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Pause to let user read the first item (longer pause)
      tl.to({}, { duration: 2.5 });

      // Step 1: Animate index 0 out, 1 in
      tl.to(".product-text-0", { opacity: 0, y: -40, duration: 0.4 })
        .fromTo(".product-text-1", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo(".product-img-1", { top: "100%" }, { top: "0%", duration: 0.8, ease: "power2.inOut" }, "-=0.8")
        .fromTo(".product-img-1-overlay", { opacity: 1 }, { opacity: 0, duration: 0.4 }, "-=0.4");

      // Pause to let user read the second item (longer pause)
      tl.to({}, { duration: 2.5 });

      // Step 2: Animate index 1 out, 2 in
      tl.to(".product-text-1", { opacity: 0, y: -40, duration: 0.4 })
        .fromTo(".product-text-2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo(".product-img-2", { top: "100%" }, { top: "0%", duration: 0.8, ease: "power2.inOut" }, "-=0.8")
        .fromTo(".product-img-2-overlay", { opacity: 1 }, { opacity: 0, duration: 0.4 }, "-=0.4");
        
      // Pause to let user read the final item before unpinning (longer pause)
      tl.to({}, { duration: 2.5 });
        
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile: Standard scroll-up animations (no pinning)
      products.forEach((_, i) => {
        gsap.fromTo(`.mobile-card-${i}`, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: {
              trigger: `.mobile-card-${i}`,
              start: "top 80%",
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="products" className="bg-bg-base relative overflow-hidden">
      {/* Title Area */}
      <div className="pt-24 px-6 relative z-10">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Zen Touch Panels</span>
          <div className="mb-6">
            <WordReveal text="A Smarter Wall" as="h2" whileInView stagger={0.05} duration={0.8} className="title-font text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.05] text-black" />
            <WordReveal text="For Every Room" as="h2" whileInView stagger={0.05} duration={0.8} delay={0.12} className="title-font text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.05] text-black" />
          </div>
          <p className="text-text-secondary text-xl leading-relaxed font-medium">Zen Touch Panels bring lighting, fans, curtains, AC, security, and scenes into one elegant wall-mounted control experience.</p>
        </div>
      </div>

      <div ref={containerRef}>
        {/* Desktop Pinned View */}
        <div className="hidden lg:flex h-screen items-center overflow-hidden w-full relative -mt-10">
          <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-2 gap-24 items-center">
            
            {/* Left Text Area */}
            <div className="relative h-[400px]">
               {products.map((p, i) => (
                  <div key={i} className={`product-text-${i} absolute inset-0 flex flex-col justify-center ${i === 0 ? 'opacity-100' : 'opacity-0'}`}>
                     <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Zen Touch Panels</span>
                     <h3 className="title-font text-5xl xl:text-6xl font-bold mb-6 tracking-tight leading-[1.1] text-black">{p.title}</h3>
                     <p className="text-text-secondary text-xl mb-10 leading-relaxed font-medium">{p.description}</p>
                     <a href="#contact" className="inline-flex items-center gap-3 text-brand font-bold text-lg group/link">
                       {p.linkText}
                       <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center group-hover/link:bg-brand group-hover/link:text-white transition-colors">
                         <ArrowRight size={18} />
                       </div>
                     </a>
                  </div>
               ))}
            </div>

            {/* Right Image Area */}
            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl shadow-black/10">
               {products.map((p, i) => (
                  <div 
                    key={i} 
                    className={`product-img-${i} absolute inset-0 bg-white ${i === 0 ? 'z-10' : i === 1 ? 'z-20 top-full' : 'z-30 top-full'}`}
                  >
                     <div className={`product-img-${i}-overlay absolute inset-0 bg-black/30 z-10 ${i === 0 ? 'hidden' : ''}`} />
                     <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                     <div className="absolute top-8 left-8 w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-xl font-bold text-black border border-black/5 z-40 shadow-lg">
                       {String(i + 1).padStart(2, '0')}
                     </div>
                  </div>
               ))}
            </div>

          </div>
        </div>

        {/* Mobile Scrolling View */}
        <div className="lg:hidden flex flex-col gap-16 px-6 pb-24 pt-10">
          {products.map((p, i) => (
            <div key={i} className={`mobile-card-${i} opacity-0`}>
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl shadow-black/10 mb-8">
                 <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                 <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-lg font-bold text-black border border-black/5 z-40 shadow-lg">
                   {String(i + 1).padStart(2, '0')}
                 </div>
              </div>
              <div>
                 <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Zen Touch Panels</span>
                 <h3 className="title-font text-3xl font-bold mb-4 tracking-tight leading-[1.1] text-black">{p.title}</h3>
                 <p className="text-text-secondary text-lg mb-8 leading-relaxed font-medium">{p.description}</p>
                 <a href="#contact" className="inline-flex items-center gap-3 text-brand font-bold text-lg group/link">
                   {p.linkText}
                   <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                     <ArrowRight size={18} />
                   </div>
                 </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
