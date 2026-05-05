import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Look for data-cursor attribute up the DOM tree
      const cursorTarget = target.closest('[data-cursor]');
      
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor'));
        setIsHovered(true);
      } else if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Don't render cursor on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center font-bold tracking-widest text-[10px] uppercase transition-colors duration-300 ${
          cursorText ? 'bg-brand text-white' : 'bg-brand mix-blend-difference'
        }`}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: cursorText ? 80 : isHovered ? 60 : 8,
          height: cursorText ? 80 : isHovered ? 60 : 8,
          borderRadius: '50%',
          opacity: 1
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 35,
          mass: 0.1
        }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white z-10"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Ring cursor - hidden when text is present */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-brand/50"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          width: isHovered || cursorText ? 0 : 40,
          height: isHovered || cursorText ? 0 : 40,
          opacity: isHovered || cursorText ? 0 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
          mass: 0.1
        }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
};

export default CustomCursor;
