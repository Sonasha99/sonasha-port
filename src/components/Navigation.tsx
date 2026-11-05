import React from 'react';

interface NavigationProps {
  activeSection: number;
  onOpenCorner: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onOpenCorner }) => {
  const sections = [
    { num: 1, label: 'About', target: 'section-about' },
    { num: 2, label: 'What I Build', target: 'section-skills' },
    { num: 3, label: 'Projects', target: 'section-projects' },
    { num: 4, label: 'Process', target: 'section-process' },
    { num: 5, label: 'Contact', target: 'section-contact' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#38050E]/95 backdrop-blur-md border-b border-[#F4E8A4]/20 text-[#F4E8A4]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
        {/* Identity */}
        <button
          onClick={() => scrollTo('section-about')}
          className="flex items-baseline gap-2 group cursor-pointer focus:outline-none text-left"
        />

        {/* Navigation Links + Don't Click */}
        <nav className="flex items-center gap-3 sm:gap-6">
          {sections.map(({ num, label, target }) => {
            const isActive = activeSection === num;
            return (
              <button
                key={num}
                onClick={() => scrollTo(target)}
                className={`relative px-1.5 py-1 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer focus:outline-none ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-[#F4E8A4]/70 hover:text-[#F4E8A4]'
                }`}
              >
                {label}
                {isActive && (
                  <div className="absolute -bottom-[14px] left-0 right-0 h-[2px] bg-[#F4E8A4] rounded-full" />
                )}
              </button>
            );
          })}

          <button
            onClick={onOpenCorner}
            className="px-2.5 py-1 text-xs font-mono tracking-wider uppercase text-[#F4E8A4] hover:text-white hover:bg-[#F4E8A4]/10 rounded transition-colors cursor-pointer focus:outline-none font-semibold"
            title="Don't Click"
          >
            Don't Click
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
