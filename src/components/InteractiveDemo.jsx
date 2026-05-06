import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Zap, Play, Pause } from 'lucide-react';

const InteractiveDemo = () => {
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const forwardVideoRef = useRef(null);
  const reverseVideoRef = useRef(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    const fwVideo = forwardVideoRef.current;
    const rvVideo = reverseVideoRef.current;
    if (!fwVideo || !rvVideo) return;

    if (isCinemaMode) {
      hasInteracted.current = true;
      rvVideo.pause();
      
      // Calculate where to start the forward video if interrupted
      if (rvVideo.currentTime > 0 && rvVideo.duration) {
        fwVideo.currentTime = Math.max(0, fwVideo.duration - rvVideo.currentTime);
      } else if (fwVideo.currentTime >= fwVideo.duration || fwVideo.currentTime === 0) {
        fwVideo.currentTime = 0;
      }
      
      fwVideo.play().catch(e => console.log('Video play interrupted', e));
    } else {
      fwVideo.pause();
      if (hasInteracted.current) {
        // Calculate where to start the reverse video if interrupted
        if (fwVideo.currentTime > 0 && fwVideo.duration) {
          rvVideo.currentTime = Math.max(0, rvVideo.duration - fwVideo.currentTime);
        } else if (rvVideo.currentTime >= rvVideo.duration || rvVideo.currentTime === 0) {
          rvVideo.currentTime = 0;
        }
        
        rvVideo.play().catch(e => console.log('Video play interrupted', e));
      }
    }
  }, [isCinemaMode]);

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Background Room Video - Transitioning between Day and Cinema */}
      <div className="absolute inset-0 transition-all duration-1000">
        <video
          ref={forwardVideoRef}
          src="/cinema-transition.mp4"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isCinemaMode || !hasInteracted.current ? 'opacity-100' : 'opacity-0'}`}
          muted
          playsInline
          disablePictureInPicture
        />
        <video
          ref={reverseVideoRef}
          src="/logo/SVG/cinema-transition-reverse.mp4"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${!isCinemaMode && hasInteracted.current ? 'opacity-100' : 'opacity-0'}`}
          muted
          playsInline
          disablePictureInPicture
        />
        {/* Overlays */}
        <div className={`absolute inset-0 transition-colors duration-1000 ${isCinemaMode ? 'bg-brand/10' : 'bg-transparent'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-brand text-sm font-bold tracking-widest uppercase mb-5">
                Interactive Demo
              </span>
              <h2 className="title-font text-[clamp(2.25rem,4.5vw,4rem)] font-bold tracking-tight mb-6 leading-[1] text-white">
                One Touch.<br />Infinite Atmosphere.
              </h2>
              <p className="text-lg text-white/60 mb-8 max-w-xl leading-relaxed font-medium">
                Experience the transition from bright morning light to a cinematic evening ambiance. Primezen panels allow you to orchestrate your home's entire environment with a single gesture.
              </p>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-5 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isCinemaMode ? 'bg-white/10 text-white/40' : 'bg-brand text-white shadow-lg shadow-brand/40'}`}>
                    <Sun size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Bright Morning</h4>
                    <p className="text-white/40">Curtains open, circadian lighting active.</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isCinemaMode ? 'bg-brand text-white shadow-lg shadow-brand/40' : 'bg-white/10 text-white/40'}`}>
                    <Moon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Cinema Mode</h4>
                    <p className="text-white/40">Blackout curtains, warm dimming, entertainment on.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center">
             <div className="relative group" data-cursor="TOGGLE">
                {/* The "Switch" Control */}
                <div className="relative w-80 h-80 bg-white/10 backdrop-blur-xl rounded-[32px] border border-white/20 shadow-2xl p-8 flex flex-col items-center justify-between group-hover:scale-[1.02] transition-transform duration-500">
                   <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center text-brand mb-2">
                      <Zap size={34} fill="currentColor" />
                   </div>
                   
                   <div className="text-center">
                      <h3 className="text-white font-bold text-2xl mb-2">Primezen Hub</h3>
                      <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Master Control</p>
                   </div>

                   <button 
                    onClick={() => setIsCinemaMode(!isCinemaMode)}
                    className="w-full h-16 rounded-2xl bg-white text-black font-black text-lg flex items-center justify-center gap-3 hover:bg-brand hover:text-white transition-all duration-300 relative overflow-hidden"
                   >
                     {isCinemaMode ? (
                       <>Exit Cinema <Pause size={24} fill="currentColor" /></>
                     ) : (
                       <>Enter Cinema <Play size={24} fill="currentColor" /></>
                     )}
                   </button>
                </div>

             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
