import React from 'react';
import Section from '../components/Section';
import { ArrowRight } from 'lucide-react';

interface ExperienceProps {
  onInView: () => void;
}

const Experience: React.FC<ExperienceProps> = ({ onInView }) => {
  const stages = [
    {
      num: "01",
      title: "Understand the Problem",
      desc: "I dig deep into the core problem first, understanding who it helps and why it matters."
    },
    {
      num: "02",
      title: "Research & Explore",
      desc: "Explore existing systems, read official documentation, and evaluate the cleanest tech choices."
    },
    {
      num: "03",
      title: "Architecture & Design",
      desc: "Plan data flow, map low-level component interfaces, and wireframe UX before touching code."
    },
    {
      num: "04",
      title: "Build & Test",
      desc: "Write modular code, hook up resilient APIs, handle edge cases, and test performance."
    },
    {
      num: "05",
      title: "Documentation",
      desc: "Write crisp readmes and clear setup steps so anyone can run or scale it effortlessly."
    }
  ];

  const experiences = [
    {
      company: "ITJOBXS",
      period: "Jun 2026 - Present",
      role: "Software Development Intern (SDE Intern)",
      bullets: [
        "Developed responsive Interview Experiences webpage with PHP, MySQL registration, email validation, and Google reCAPTCHA.",
        "Built full-stack MERN applications featuring React interfaces, secure REST APIs, and JWT authentication."
      ]
    },
    {
      company: "DRDO - ISSA",
      period: "Jun 2025 - Jul 2025",
      role: "Software Development Intern",
      sub: "Institute for Systems Studies & Analyses",
      bullets: [
        "Engineered dynamic Navy ship configuration platform with interactive 2D visualization and region-based placement.",
        "Implemented real-time frontend-to-backend data synchronization for 12+ naval components with sub-2-second latency."
      ]
    }
  ];

  return (
    <Section id="section-process" number="04" onInView={onInView}>
      <div className="w-full text-left">
        {/* ─────────────────────────────────────────────────────────────
            ENGINEERING PROCESS (From idea in mind to website in browser)
        ───────────────────────────────────────────────────────────── */}
        <div className="border-b border-[#F4E8A4]/25 pb-5 mb-10">
          <span className="text-xs font-mono tracking-[0.2em] text-[#F4E8A4]/70 uppercase font-semibold block mb-1">
            Engineering Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4E8A4] tracking-tight">
            From idea in mind to website in browser
          </h2>
        </div>

        {/* 5 Stages with Arrows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
          {stages.map((stage, idx) => (
            <div key={stage.num} className="space-y-2 border-t border-[#F4E8A4]/20 pt-4 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-[#F4E8A4]/60">
                    {stage.num}
                  </span>
                  {idx < stages.length - 1 && (
                    <span className="hidden lg:inline-flex text-[#F4E8A4]/50">
                      <ArrowRight size={14} />
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-serif font-bold text-[#F4E8A4] tracking-tight">
                  {stage.title}
                </h3>
                <p className="text-xs font-light text-[#F4E8A4]/80 leading-relaxed font-sans pt-1">
                  {stage.desc}
                </p>
              </div>

              {idx < stages.length - 1 && (
                <div className="flex lg:hidden justify-center pt-2 text-[#F4E8A4]/40">
                  <ArrowRight size={13} className="rotate-90 sm:rotate-0" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            EXPERIENCE (Exactly 2 lines per job)
        ───────────────────────────────────────────────────────────── */}
        <div className="pt-10 border-t border-[#F4E8A4]/25">
          <div className="mb-10">
            <span className="text-xs font-mono tracking-[0.2em] text-[#F4E8A4]/70 uppercase font-semibold block mb-1">
              Experience
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4E8A4] tracking-tight">
              Work Experience
            </h3>
          </div>

          <div className="space-y-10 divide-y divide-[#F4E8A4]/15">
            {experiences.map((exp, i) => (
              <div key={exp.company} className={i > 0 ? "pt-8" : ""}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <div className="flex items-baseline gap-3">
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#F4E8A4]">
                      {exp.company}
                    </h4>
                    {exp.sub && (
                      <span className="text-xs font-mono text-[#F4E8A4]/60 hidden sm:inline">
                        ({exp.sub})
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#F4E8A4]/75">
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs font-mono text-[#F4E8A4]/90 font-medium mb-3">
                  {exp.role}
                </p>

                <ul className="space-y-1.5 text-xs sm:text-sm text-[#F4E8A4]/85 font-sans leading-relaxed max-w-3xl">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#F4E8A4]/50 mr-2.5 font-mono">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Experience;
