import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const presets = [
  { name: 'Sleep',  hue: 8,   intensity: 0.18, sub: 'Dim ember glow' },
  { name: 'Movie',  hue: 285, intensity: 0.32, sub: 'Cinematic violet' },
  { name: 'Dinner', hue: 28,  intensity: 0.62, sub: 'Warm amber 2700K' },
  { name: 'Focus',  hue: 215, intensity: 0.92, sub: 'Cool daylight' },
  { name: 'Party',  hue: 320, intensity: 1.0,  sub: 'Vivid magenta' },
];

const easeOut = [0.16, 1, 0.3, 1];

const LightColorPlayground = () => {
  const [hue, setHue] = useState(28);
  const [intensity, setIntensity] = useState(0.62);
  const [activeName, setActiveName] = useState('Dinner');
  const [activeSub, setActiveSub] = useState('Warm amber 2700K');

  const lightColor = `hsl(${hue} 100% 60%)`;
  const tintColor  = `hsl(${hue} 90% 50%)`;

  const tintOpacity     = 0.75 - intensity * 0.45;
  const glowMain        = 0.18 + intensity * 0.72;
  const glowSecondary   = glowMain * 0.55;
  const glowAmbient     = 0.10 + intensity * 0.20;
  const stripBrightness = 0.20 + intensity * 0.80;

  const glowStrong = `hsla(${hue}, 100%, 65%, ${glowMain})`;
  const glowSoft   = `hsla(${hue}, 100%, 60%, ${glowSecondary})`;
  const glowFaint  = `hsla(${hue}, 100%, 55%, ${glowAmbient})`;

  const baseFilter = `saturate(${0.32 + intensity * 0.28}) brightness(${0.46 + intensity * 0.24}) contrast(1.05)`;

  const applyPreset = (p) => {
    setHue(p.hue);
    setIntensity(p.intensity);
    setActiveName(p.name);
    setActiveSub(p.sub);
  };

  const onCustomChange = () => {
    if (activeName !== 'Custom') {
      setActiveName('Custom');
      setActiveSub('Tuned by you');
    }
  };

  return (
    <section id="light-playground" className="bg-[#0a0a0a] px-4 py-10 md:px-8 md:py-14">
      <div
        className="relative mx-auto max-w-[1520px] overflow-hidden rounded-[32px] bg-black min-h-[680px] md:min-h-[760px]"
        style={{ '--active-light': lightColor }}
      >
        {/* ─── Lighting Layers ─── */}
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=80"
          alt="Living room with Primezen colour lighting control"
          className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 ease-out"
          style={{ filter: baseFilter }}
          loading="eager"
        />
        <div
          className="absolute inset-0 mix-blend-multiply pointer-events-none transition-all duration-700 ease-out"
          style={{ backgroundColor: tintColor, opacity: tintOpacity }}
        />
        <div
          className="absolute left-[14%] right-[14%] top-[18%] h-[2px] rounded-full pointer-events-none transition-all duration-700 ease-out z-[2]"
          style={{
            background: lightColor,
            opacity: stripBrightness,
            boxShadow: `
              0 0 ${6 + intensity * 14}px ${lightColor},
              0 0 ${20 + intensity * 60}px ${lightColor},
              0 ${4 + intensity * 12}px ${30 + intensity * 80}px ${lightColor}
            `,
            filter: `brightness(${0.8 + intensity * 0.6})`,
          }}
        />
        <div
          className="absolute inset-0 mix-blend-screen pointer-events-none transition-[background] duration-700 ease-out"
          style={{
            background: `
              radial-gradient(ellipse 70% 32% at 50% 22%, ${glowStrong} 0%, ${glowSoft} 38%, transparent 65%),
              radial-gradient(ellipse 55% 45% at 18% 65%, ${glowSoft} 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 82% 60%, ${glowSoft} 0%, transparent 60%),
              radial-gradient(ellipse 88% 30% at 50% 100%, ${glowFaint} 0%, transparent 70%)
            `,
          }}
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/35 via-transparent to-black/65" />

        {/* ─── Editorial Typography ─── */}

        {/* Top-left: section number + kicker */}
        <div className="absolute top-6 left-6 md:top-10 md:left-12 z-10 flex items-baseline gap-4">
          <span
            className="title-font text-5xl md:text-7xl font-bold leading-none text-transparent select-none"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.45)' }}
          >
            01
          </span>
          <div className="text-white">
            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/45 mb-1">Section</p>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Interactive Lighting</p>
          </div>
        </div>

        {/* Mid-left: editorial headline + description */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 max-w-[640px] z-10 pr-6">
          <h2 className="title-font text-white text-[clamp(2.6rem,6.4vw,6rem)] font-bold leading-[0.94] tracking-tight">
            Set every<br />living room<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.85)' }}>
              mood.
            </span>
          </h2>
          <p className="mt-6 text-sm md:text-base font-medium text-white/55 max-w-sm leading-relaxed">
            Drag the colour or pick a scene to see how Zen Touch Panels orchestrate every moment in the room.
          </p>
        </div>

        {/* Mega watermark scene name — bottom-right, behind controls */}
        <div className="absolute bottom-0 right-0 pr-6 pb-2 md:pr-10 md:pb-6 pointer-events-none select-none z-[3] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h3
              key={activeName}
              initial={{ y: '60%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-40%', opacity: 0 }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="title-font font-bold text-[clamp(5rem,16vw,18rem)] leading-[0.82] tracking-tighter uppercase text-transparent text-right"
              style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.18)' }}
            >
              {activeName}
            </motion.h3>
          </AnimatePresence>
        </div>

        {/* Bottom-left: now-playing readout */}
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-12 z-10 flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full transition-all duration-500"
            style={{ background: lightColor, boxShadow: `0 0 14px ${lightColor}` }}
          />
          <div className="text-white">
            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-white/45">Now Playing</p>
            <p className="text-sm md:text-base font-bold tracking-tight">
              {activeName} <span className="text-white/40 font-medium">— {activeSub}</span>
            </p>
          </div>
        </div>

        {/* Bottom-right: compact controls panel */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-12 z-10 w-[min(460px,calc(100vw-3rem))] rounded-[22px] border border-white/10 bg-black/55 p-5 md:p-6 backdrop-blur-2xl shadow-2xl shadow-black/50">
          {/* Hue */}
          <div className="flex items-center gap-4">
            <span className="w-16 shrink-0 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Colour</span>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => { setHue(Number(e.target.value)); onCustomChange(); }}
              className="color-light-slider flex-1"
              aria-label="Change light colour"
            />
          </div>

          {/* Intensity */}
          <div className="mt-4 flex items-center gap-4">
            <span className="w-16 shrink-0 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Bright</span>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(intensity * 100)}
              onChange={(e) => { setIntensity(Number(e.target.value) / 100); onCustomChange(); }}
              className="intensity-slider flex-1"
              aria-label="Change brightness"
              style={{ '--track-fill': `${Math.round(intensity * 100)}%` }}
            />
            <span className="w-9 shrink-0 text-right text-xs font-bold tabular-nums text-white/70">
              {Math.round(intensity * 100)}%
            </span>
          </div>

          {/* Scene presets */}
          <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
            {presets.map((preset) => {
              const isActive = activeName === preset.name;
              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-black shadow-md'
                      : 'bg-white/5 text-white/65 hover:bg-white/15 hover:text-white'
                  }`}
                  aria-pressed={isActive}
                  title={preset.sub}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: `hsl(${preset.hue} 100% 60%)`,
                      boxShadow: `0 0 8px hsl(${preset.hue} 100% 60%)`,
                    }}
                  />
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LightColorPlayground;
