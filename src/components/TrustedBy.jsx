import { motion } from 'framer-motion';

const brands = [
  {
    name: "Amazon Alexa",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.73 0 3.36-.44 4.78-1.22.27-.15.31-.51.08-.71l-.47-.4c-.17-.14-.4-.17-.6-.06A8.5 8.5 0 1 1 20.5 12c0 1.33-.58 2.5-1.5 2.5s-1.5-1.17-1.5-2.5V8.5c0-.28-.22-.5-.5-.5h-.5c-.21 0-.39.13-.47.32A4.5 4.5 0 1 0 16.5 15c.88 0 1.7-.36 2.3-.96.6.6 1.4.96 2.2.96 1.93 0 3-1.67 3-4C24 6.48 18.52 2 12 2zm0 14.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>
      </svg>
    )
  },
  {
    name: "Google Home",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  {
    name: "Apple HomeKit",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    )
  },
  {
    name: "SmartThings",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    )
  },
  {
    name: "KNX",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm3 3h2v8H8V8zm3 2h2v6h-2v-6zm3-1h2v7h-2V9z"/>
      </svg>
    )
  },
];

const TrustedBy = () => {
  return (
    <section className="py-10 px-6 border-b border-black/5 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-bold tracking-[0.3em] uppercase text-text-secondary/50 mb-8"
        >
          Seamlessly Integrates With
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-14"
        >
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-3 text-black/20 hover:text-black transition-all duration-500 cursor-default group"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {brand.logo}
              </div>
              <span className="text-base font-bold tracking-wide hidden sm:inline">{brand.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBy;
