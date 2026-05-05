import { motion, useReducedMotion } from 'framer-motion';
import { AppWindow, Fan, Lightbulb, Mic2, Palette, PanelsTopLeft, Radio, Smartphone, Sparkles, Sun, Thermometer, Waves } from 'lucide-react';
import Button from './ui/Button';

const panelModules = ['2 Module', '4 Module', '6 Module', '8 Module', '12 Module'];

const designOptions = [
  {
    icon: PanelsTopLeft,
    title: 'Size',
    text: 'Select 2, 4, 6, 8, or 12 module layouts for bedrooms, living rooms, kitchens, lounges, and offices.',
  },
  {
    icon: Palette,
    title: 'Color',
    text: 'Choose timeless black or white finishes so the panel feels intentional with your interiors.',
  },
  {
    icon: Sparkles,
    title: 'Material',
    text: 'Pick refined acrylic or glass finishes for a clean, premium switchboard replacement.',
  },
  {
    icon: AppWindow,
    title: 'Switch Icons',
    text: 'Use etched icons for lights, fans, curtains, AC, geyser, scenes, and other daily controls.',
  },
];

const homeControls = [
  { icon: Lightbulb, title: 'Smart Lighting', text: 'Set scenes, dim lights, and create schedules for every mood.' },
  { icon: Fan, title: 'Smart Fans', text: 'Adjust fan speed or set timers directly from the panel.' },
  { icon: Waves, title: 'Curtains', text: 'Open or close curtains with a touch, schedule, app, or voice command.' },
  { icon: Sun, title: 'Water Heating', text: 'Schedule heating so hot water is ready when the day begins.' },
  { icon: Thermometer, title: 'Cooling & Comfort', text: 'Pre-cool rooms and manage comfort from one central interface.' },
  { icon: Radio, title: 'Security & Doorbell', text: 'Bring security alerts and doorbell control into the smart home flow.' },
];

const controlWays = [
  { icon: PanelsTopLeft, title: 'Smart Touch', text: 'Tap sleek wall panels that blend into modern decor.' },
  { icon: Smartphone, title: 'Mobile', text: 'Control rooms, schedules, and appliances from anywhere.' },
  { icon: Mic2, title: 'Voice', text: 'Use Alexa, Google Assistant, or Siri for hands-free control.' },
  { icon: Radio, title: 'Remote', text: 'Give the whole family a simple one-touch control option.' },
];

const MotionCard = ({ children, className = '', delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const TouchPanelDetails = () => {
  return (
    <section id="touch-panel-details" className="py-20 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-12">
          <div className="lg:col-span-7">
            <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Custom Touch Panel Designs</span>
            <h2 className="title-font text-[clamp(2.25rem,4.5vw,4.25rem)] font-bold tracking-tight leading-[1.02] text-black mb-5">
              Upgrade, touch, and transform your living space.
            </h2>
            <p className="text-xl text-text-secondary leading-relaxed font-medium max-w-3xl">
              Primezen Zen Touch Panels replace conventional switches with a sleek, intuitive control surface for lights, fans, appliances, curtains, comfort, and scenes.
            </p>
          </div>

          <div className="lg:col-span-5 lg:text-right">
            <Button href="#contact" className="text-lg px-10 py-5">Design My Panel</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {panelModules.map((module, index) => (
            <MotionCard
              key={module}
              delay={index * 0.04}
              className="rounded-[22px] border border-black/5 bg-bg-surface p-5 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-3xl md:text-4xl font-black text-black block mb-2">{module.split(' ')[0]}</span>
              <span className="text-sm font-bold text-text-secondary uppercase tracking-widest">Module</span>
            </MotionCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <MotionCard className="rounded-[30px] overflow-hidden bg-black text-white min-h-[420px] relative shadow-2xl shadow-black/15">
            <img
              src="https://www.primezen.in/wp-content/uploads/2025/03/Touch-Panel-Switch.webp"
              alt="Primezen Zen Touch Panel switch"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="relative z-10 h-full p-7 md:p-9 flex flex-col justify-end">
              <span className="text-brand text-sm font-bold uppercase tracking-widest mb-4">Panel Variants</span>
              <h3 className="title-font text-4xl md:text-5xl font-bold leading-none mb-4">Built around your rooms.</h3>
              <p className="text-white/70 text-lg leading-relaxed font-medium max-w-xl">
                Start with simple two-module panels or build larger multi-control layouts for complete room automation.
              </p>
            </div>
          </MotionCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {designOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <MotionCard
                  key={option.title}
                  delay={index * 0.06}
                  className="rounded-[24px] bg-bg-surface border border-black/5 p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="title-font text-2xl font-bold text-black mb-3">{option.title}</h3>
                  <p className="text-text-secondary leading-relaxed font-medium">{option.text}</p>
                </MotionCard>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <div className="max-w-3xl mb-8">
            <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Personalized to Your Touch</span>
            <h2 className="title-font text-[clamp(2.3rem,4vw,4rem)] font-bold tracking-tight leading-[1.04] text-black mb-5">
              From morning routines to evening scenes.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed font-medium">
              Use Zen Touch Panels to create room-level controls for the functions your family actually uses every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeControls.map((control, index) => {
              const Icon = control.icon;
              return (
                <MotionCard
                  key={control.title}
                  delay={index * 0.04}
                className="rounded-[24px] border border-black/5 bg-white p-6 shadow-md shadow-black/5"
                >
                  <Icon className="text-brand mb-5" size={30} />
                  <h3 className="title-font text-2xl font-bold text-black mb-3">{control.title}</h3>
                  <p className="text-text-secondary leading-relaxed font-medium">{control.text}</p>
                </MotionCard>
              );
            })}
          </div>
        </div>

        <div className="rounded-[30px] bg-black text-white p-7 md:p-10 lg:p-12 overflow-hidden relative">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '72px 72px'
          }} />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4">Four Ways to Control</span>
              <h2 className="title-font text-[clamp(2rem,3.5vw,3.5rem)] font-bold tracking-tight leading-none mb-5">
                One home. Effortless control.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed font-medium">
                Whether you are near the wall, on the sofa, or away from home, Primezen keeps your rooms easy to control.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {controlWays.map((way, index) => {
                const Icon = way.icon;
                return (
                  <MotionCard
                    key={way.title}
                    delay={index * 0.05}
                    className="rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/10 text-brand flex items-center justify-center mb-5">
                      <Icon size={24} />
                    </div>
                    <h3 className="title-font text-2xl font-bold mb-2">{way.title}</h3>
                    <p className="text-white/60 leading-relaxed font-medium">{way.text}</p>
                  </MotionCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TouchPanelDetails;
