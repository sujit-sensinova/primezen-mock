import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const parseTarget = (value) => {
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { number: null, suffix: String(value) };
  return {
    number: parseFloat(match[1]),
    suffix: match[2] || '',
    decimals: (match[1].split('.')[1] || '').length,
  };
};

const CountUp = ({
  to,
  duration = 1.6,
  prefix = '',
  className = '',
  startOnView = true,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState('');

  const { number, suffix, decimals } = parseTarget(to);
  const finalDisplay = number !== null ? `${prefix}${number.toFixed(decimals)}${suffix}` : suffix;
  const fallbackDisplay = number !== null ? `${prefix}0${suffix}` : suffix;
  const reducedMotionDisplay = shouldReduceMotion && (!startOnView || inView) ? finalDisplay : fallbackDisplay;

  useEffect(() => {
    if (number === null) return;
    if (!startOnView || !inView) return;
    if (shouldReduceMotion) return;

    let raf = 0;
    const start = performance.now();
    const ms = duration * 1000;

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / ms, 1);
      const eased = easeOutCubic(t);
      const current = (number * eased).toFixed(decimals);
      setDisplay(`${prefix}${current}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, number, suffix, decimals, prefix, duration, startOnView, shouldReduceMotion]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display || reducedMotionDisplay}
    </span>
  );
};

export default CountUp;
