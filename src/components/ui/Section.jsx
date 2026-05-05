const Section = ({ 
  id, 
  title, 
  subtitle, 
  children, 
  className = '', 
  containerClassName = 'max-w-7xl mx-auto' 
}) => {
  return (
    <section id={id} className={`py-32 px-6 ${className}`}>
      <div className={containerClassName}>
        {(title || subtitle) && (
          <div className="text-center mb-16 max-w-2xl mx-auto">
            {title && (
              <h2 className="title-font text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-text-secondary text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
