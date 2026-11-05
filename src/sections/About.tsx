import React from 'react';
import Section from '../components/Section';
import { ArrowDown, ArrowUpRight, GraduationCap } from 'lucide-react';

interface AboutProps {
  onInView: () => void;
}

const About: React.FC<AboutProps> = ({ onInView }) => {
  const rolesLookingFor = [
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Engineer",
    "AI Engineer",
    "6-Month Internship Opportunities",
    "Full-Time Roles"
  ];

  const focusAreas = [
    "Backend Engineering",
    "Frontend Engineering & UI/UX",
    "API Design & Integration",
    "System Design (LLD & HLD)",
    "Distributed Systems",
    "Scalable System Architecture",
    "Database Design & Optimization",
    "Performance Engineering",
    "AI Agents & Workflow Automation",
    "Software Architecture",
    "Engineering That Scales",
    "Ideas into Products",
    "Full-Stack Engineering",
    "Agentic AI",
    "Generative AI",
    "RAG & LLM Applications"
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="section-about" className="w-full">
      {/* ─────────────────────────────────────────────────────────────
          HERO & INTRO: HORIZONTALLY SCALED ACROSS FULL MAX-W-6XL
      ───────────────────────────────────────────────────────────── */}
      <Section id="hero" number="01" onInView={onInView} className="pt-36 sm:pt-48 pb-20 border-b-0" containerClassName="max-w-6xl">
        <div className="w-full flex flex-col justify-center text-left space-y-12">
          {/* Name, Tagline & Buttons (Lower & smaller font as requested) */}
          <div className="pt-2 sm:pt-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-serif font-bold text-[#F4E8A4] tracking-tight mb-2.5">
              Sonasha Choudhary
            </h1>

            <p className="text-xs sm:text-sm font-mono text-[#F4E8A4]/70 tracking-wide mb-7">
              a software engineer - isn't that enough?
            </p>

            {/* Action Buttons: Clean minimal outline */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('section-projects')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#F4E8A4]/70 hover:border-[#F4E8A4] text-[#F4E8A4] hover:bg-[#F4E8A4]/10 font-mono text-xs font-bold uppercase tracking-wider transition-colors active:scale-95 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowDown size={14} />
              </button>

              <button
                onClick={() => scrollTo('section-contact')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#F4E8A4]/70 hover:border-[#F4E8A4] text-[#F4E8A4] hover:bg-[#F4E8A4]/10 font-mono text-xs font-bold uppercase tracking-wider transition-colors active:scale-95 cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* 1. Open to Roles (Pill tags with boundaries) */}
          <div className="w-full space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#F4E8A4]/70 block">
              Open to Roles
            </span>
            <div className="flex flex-wrap gap-2.5 w-full">
              {rolesLookingFor.map((role) => (
                <span
                  key={role}
                  className="px-4 py-2 rounded-full border border-[#F4E8A4]/30 text-[#F4E8A4] font-mono text-xs font-medium bg-[#38050E]/60 hover:border-[#F4E8A4] transition-colors"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* 2. Education */}
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap size={15} className="text-[#F4E8A4]" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#F4E8A4]/70">
                    Education
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#F4E8A4] tracking-tight">
                  B.Tech in Computer Science & Engineering
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#F4E8A4]/75">
                  Indira Gandhi Delhi Technical University for Women (IGDTUW)
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-center pt-1 md:pt-0">
                <span className="px-3.5 py-1 rounded-full border border-[#F4E8A4]/45 text-[#F4E8A4] font-mono text-xs font-semibold bg-[#38050E]">
                  CGPA: 8.51
                </span>
                <span className="px-3.5 py-1 rounded-full border border-[#F4E8A4]/30 text-[#F4E8A4]/75 font-mono text-xs bg-[#38050E]">
                  2023 - 2027
                </span>
              </div>
            </div>
          </div>

          {/* 3. Core Focus (Pill tags with boundaries) */}
          <div className="w-full space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#F4E8A4]/70 block">
              Core Focus
            </span>
            <div className="flex flex-wrap gap-2.5 w-full">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 rounded-full border border-[#F4E8A4]/30 text-[#F4E8A4] font-mono text-xs font-medium bg-[#38050E]/60 hover:border-[#F4E8A4] transition-colors"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default About;
