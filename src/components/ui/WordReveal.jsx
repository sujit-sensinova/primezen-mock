import { motion } from 'framer-motion';

const easeOut = [0.16, 1, 0.3, 1];

const WordReveal = ({
  text,
  as: Tag = 'p',
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.045,
  duration = 0.8,
  whileInView = false,
  once = true,
}) => {
  const MotionTag = motion[Tag] || motion.p;

  const container = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const word = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration, ease: easeOut },
    },
  };

  const animationProps = whileInView
    ? { initial: 'hidden', whileInView: 'visible', viewport: { once, margin: '-80px' } }
    : { initial: 'hidden', animate: 'visible' };

  const words = text.split(' ');

  return (
    <MotionTag variants={container} {...animationProps} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            variants={word}
            className={`inline-block ${wordClassName}`}
            style={{ willChange: 'transform' }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

export default WordReveal;
