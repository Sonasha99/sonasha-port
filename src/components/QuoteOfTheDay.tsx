import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { get365Quotes } from '../data/quotes';

// Calculate day of the year (1-365)
const getDayOfYear = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime() + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return Math.min(Math.max(day, 1), 365);
};

const quotes = get365Quotes();

const QuoteOfTheDay: React.FC = () => {
  const todayDayIndex = getDayOfYear();
  const [currentDay, setCurrentDay] = useState<number>(todayDayIndex);

  const activeQuoteIndex = Math.min(Math.max(currentDay - 1, 0), quotes.length - 1);
  const currentQuote = quotes[activeQuoteIndex];

  const handlePrev = () => {
    setCurrentDay(prev => (prev > 1 ? prev - 1 : 365));
  };

  const handleNext = () => {
    setCurrentDay(prev => (prev < 365 ? prev + 1 : 1));
  };

  const handleReset = () => {
    setCurrentDay(todayDayIndex);
  };

  return (
    <div className="flex flex-col items-end text-right my-2 max-w-sm ml-auto bg-[#38050E]/80 backdrop-blur-md border border-[#F4E8A4]/30 rounded-2xl p-3 sm:p-4 text-[#F4E8A4] shadow-lg">
      {/* Counter bar: Quote I Live By • ← 227/365 → */}
      <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#F4E8A4]/70 mb-1.5">
        <span className="uppercase tracking-wider font-semibold">Quote I Live By</span>
        <span className="text-[#F4E8A4]/40">•</span>
        <button
          onClick={handlePrev}
          className="hover:text-white transition-colors cursor-pointer px-1 py-0.5 rounded hover:bg-[#F4E8A4]/10"
          aria-label="Previous quote"
        >
          ←
        </button>
        <span className="text-[#4A0713] font-bold bg-[#F4E8A4] px-1.5 py-0.2 rounded font-mono">
          {currentDay}/365
        </span>
        <button
          onClick={handleNext}
          className="hover:text-white transition-colors cursor-pointer px-1 py-0.5 rounded hover:bg-[#F4E8A4]/10"
          aria-label="Next quote"
        >
          →
        </button>
        {currentDay !== todayDayIndex && (
          <button
            onClick={handleReset}
            className="text-[10px] text-[#F4E8A4] underline hover:text-white transition-colors cursor-pointer ml-1 font-mono uppercase"
          >
            Today
          </button>
        )}
      </div>

      {/* Quote text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentDay}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.2 }}
          className="text-xs sm:text-sm font-light italic text-[#F4E8A4]/90 leading-snug border-r-2 border-[#F4E8A4] pr-2.5"
        >
          "{currentQuote}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default QuoteOfTheDay;
