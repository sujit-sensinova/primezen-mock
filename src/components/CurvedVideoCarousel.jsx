import React, { useRef, useCallback, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const videos = [
  {
    id: 1,
    title: "Smart Lighting",
    url: "https://ldtqzpaipskmhxkyigdt.supabase.co/storage/v1/object/public/primezen/%20(1).mp4",
  },
  {
    id: 2,
    title: "Touch Panels",
    url: "https://ldtqzpaipskmhxkyigdt.supabase.co/storage/v1/object/public/primezen/%20(2).mp4",
  },
  {
    id: 3,
    title: "Scene Control",
    url: "https://ldtqzpaipskmhxkyigdt.supabase.co/storage/v1/object/public/primezen/%20(3).mp4",
  },
  {
    id: 4,
    title: "Home Security",
    url: "https://ldtqzpaipskmhxkyigdt.supabase.co/storage/v1/object/public/primezen/%20(4).mp4",
  },
  {
    id: 5,
    title: "Voice Control",
    url: "https://ldtqzpaipskmhxkyigdt.supabase.co/storage/v1/object/public/primezen/%20(5).mp4",
  },
  {
    id: 6,
    title: "Curtain Automation",
    url: "https://ldtqzpaipskmhxkyigdt.supabase.co/storage/v1/object/public/primezen/%20(6).mp4",
  },
];

const CurvedVideoCarousel = ({ soundEnabled = false }) => {
  const videoRefs = useRef([]);
  const activeIndexRef = useRef(2);

  // Sync muted state with the master soundEnabled prop
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      video.muted = !soundEnabled;
      // Re-trigger play on active video when unmuting
      if (index === activeIndexRef.current && soundEnabled) {
        video.play().catch(() => {});
      }
    });
  }, [soundEnabled]);

  const handleSlideChange = useCallback((swiper) => {
    activeIndexRef.current = swiper.activeIndex;
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === swiper.activeIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, []);

  return (
    <section className="py-24 bg-bg-base overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-brand text-sm font-bold tracking-widest uppercase mb-4"
        >
          Primezen in Action
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="title-font text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black"
        >
          See the Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto"
        >
          Swipe through real moments powered by Zen Touch Panels.
        </motion.p>
      </div>

      <div className="w-full">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 18,
            stretch: 0,
            depth: 250,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="w-full py-10"
          initialSlide={2}
          onSlideChange={handleSlideChange}
          onSwiper={handleSlideChange}
        >
          {videos.map((item, i) => (
            <SwiperSlide
              key={item.id}
              style={{ width: '280px', maxWidth: '90vw' }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group" style={{ aspectRatio: '9/16' }}>
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                    if (el) el.muted = true;
                  }}
                  src={item.url}
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Number badge + title */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="text-brand font-bold text-sm tracking-wider">
                    #{String(item.id).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-bold title-font mt-1">{item.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Brand-colored pagination dots */}
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullet {
          background-color: #cbd5e1;
          opacity: 1;
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          background-color: #ff3333 !important;
          transform: scale(1.3);
        }
        .swiper-slide-shadow-left,
        .swiper-slide-shadow-right {
          border-radius: 1.5rem;
        }
      `}} />
    </section>
  );
};

export default CurvedVideoCarousel;
