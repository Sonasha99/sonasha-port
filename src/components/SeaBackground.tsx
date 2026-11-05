import React from 'react';

const SeaBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#38050E]">
      {/* Top soft spotlight glow */}
      <div 
        className="absolute -top-[25vh] left-1/2 -translate-x-1/2 w-[1100px] h-[600px] opacity-25 blur-[160px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, #F4E8A4 0%, #5D0C1C 40%, transparent 80%)'
        }}
      />
      {/* Center ambient warm depth */}
      <div 
        className="absolute top-1/2 right-0 w-[600px] h-[600px] opacity-15 blur-[140px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, #F4E8A4 0%, #38050E 50%, transparent 75%)'
        }}
      />
      {/* Subtle vintage noise / paper dot texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#F4E8A4 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />
    </div>
  );
};

export default SeaBackground;
