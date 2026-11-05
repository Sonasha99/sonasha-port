import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import SeaBackground from './components/SeaBackground';
import NonRecruiterCorner from './pages/NonRecruiterCorner';

function App() {
  const [activeSection, setActiveSection] = useState(1);
  const [view, setView] = useState<'portfolio' | 'corner'>('portfolio');

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#corner') {
        setView('corner');
      } else {
        setView('portfolio');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openCorner = () => {
    window.location.hash = '#corner';
    setView('corner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToPortfolio = () => {
    window.location.hash = '';
    setView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'corner') {
    return <NonRecruiterCorner onBack={backToPortfolio} />;
  }

  return (
    <div className="relative w-full min-h-screen bg-[#38050E] text-[#F4E8A4] font-sans selection:bg-[#F4E8A4] selection:text-[#38050E]">
      <SeaBackground />
      <Navigation
        activeSection={activeSection}
        onOpenCorner={openCorner}
      />

      {/* Main content container */}
      <main className="w-full relative z-10">
        <About onInView={() => setActiveSection(1)} />
        <Skills onInView={() => setActiveSection(2)} />
        <Projects onInView={() => setActiveSection(3)} />
        <Experience onInView={() => setActiveSection(4)} />
        <Contact onInView={() => setActiveSection(5)} />
      </main>
    </div>
  );
}

export default App;
