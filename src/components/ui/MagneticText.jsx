import Magnetic from './Magnetic';
import { motion } from 'framer-motion';

const MagneticText = ({ text, className }) => {
  return (
    <h2 className={`flex flex-wrap justify-center overflow-visible ${className}`}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex mr-[2vw] mb-2">
          {word.split('').map((char, charIndex) => (
            <Magnetic key={charIndex} strength={0.8}>
              <motion.span 
                className="inline-block cursor-default"
                whileHover={{ color: '#ff3333', scale: 1.1, zIndex: 10 }}
                transition={{ duration: 0.2 }}
              >
                {char}
              </motion.span>
            </Magnetic>
          ))}
        </span>
      ))}
    </h2>
  );
};

export default MagneticText;
