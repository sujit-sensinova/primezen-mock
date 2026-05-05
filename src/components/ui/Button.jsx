import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  href, 
  className = '', 
  onClick, 
  ...props 
}) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3; // 0.3 is the magnetic pull strength
    const y = (e.clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "inline-flex items-center justify-center px-8 py-4 rounded-full font-bold tracking-wide transition-colors duration-300 text-center cursor-pointer relative overflow-hidden group";
  
  const variants = {
    primary: "bg-brand text-white shadow-xl shadow-brand/20 hover:bg-brand-dark",
    secondary: "bg-white border border-black/10 text-black hover:bg-black/5 hover:border-black/20 shadow-sm",
    ghost: "bg-transparent text-black hover:text-brand"
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  const innerContent = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
      )}
    </>
  );

  const motionProps = {
    ref: buttonRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
    className: classes,
    onClick: onClick,
    ...props
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps}>
      {innerContent}
    </motion.button>
  );
};

export default Button;
