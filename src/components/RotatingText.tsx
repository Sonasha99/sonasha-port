import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = ["Software Engineer", "AI/ML Engineer", "UI/UX Developer"];

const RotatingText: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[1.5em] overflow-hidden flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-12 mb-16 w-full text-white tracking-tighter">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ y: 80, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -80, opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="whitespace-nowrap origin-center"
        >
          {roles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingText;
