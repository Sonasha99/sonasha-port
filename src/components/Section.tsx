import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface SectionProps {
  id: string;
  number: string;
  children: React.ReactNode;
  onInView: () => void;
  className?: string;
  containerClassName?: string;
}

const Section: React.FC<SectionProps> = ({ 
  id, 
  children, 
  onInView, 
  className = "", 
  containerClassName = "max-w-6xl" 
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.15 });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  return (
    <section 
      id={id}
      ref={ref}
      className={`w-full py-16 sm:py-24 relative flex flex-col items-center justify-center px-4 sm:px-8 border-b border-[#F4E8A4]/15 ${className}`}
    >
      <div className={`w-full z-10 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
