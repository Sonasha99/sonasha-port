import React from 'react';
import Section from '../components/Section';

interface ProjectsProps {
  onInView: () => void;
}

interface ProjectItem {
  title: string;
  tagline?: string;
  description: string;
  learned: string;
  github: string | null;
  live: string | null;
}

const Projects: React.FC<ProjectsProps> = ({ onInView }) => {
  const projects: ProjectItem[] = [
    {
      title: "InterviewMentor",
      tagline: "Free for lifetime, because every other tool in the market is behind a paywall",
      description: "An AI-powered mock interview platform that generates role-tailored technical & behavioral interview questions with real-time feedback.",
      learned: "Dived deep into systems architecture, JWT tokens, user sessions, how Clerk works under the hood, and low-latency AI streaming pipelines.",
      github: "https://github.com/Sonasha99/InterviewMentor",
      live: "https://interview-mentor-nine.vercel.app/"
    },
    {
      title: "ResumeToaster",
      tagline: "ATS resume analyzer & roast engine",
      description: "An AI resume analyzer that scans resumes against modern ATS filters to deliver honest, high-impact improvements.",
      learned: "Tackled PDF parsing quirks, prompt grounding for consistent scoring, and rewriting resume bullets so people actually land interviews.",
      github: "https://github.com/Sonasha99/HireHubJob",
      live: "https://resume-toaster-kohl.vercel.app/"
    },
    {
      title: "HireHubJob",
      tagline: "Centralized application workspace",
      description: "A centralized job application tracker designed to organize recruitment stages, interviews, and recruiter follow-ups in one place.",
      learned: "Engineered clean database models, relational application tracking stages, and structured RESTful CRUD operations for end-to-end reliability.",
      github: "https://github.com/Sonasha99/HireHubJob",
      live: null
    },
    {
      title: "DevSync",
      tagline: "Real-time collaborative code editor",
      description: "A real-time collaborative code editor containerized with Docker and built for AWS deployment, featuring live synchronization and syntax highlighting.",
      learned: "Explored how sockets actually behave under load, containerizing socket clusters with Docker, AWS deployment, and sub-second multi-user sync.",
      github: "https://github.com/Sonasha99/DEVSYNC",
      live: null
    },
    {
      title: "HabitTracker",
      tagline: "Monk-mode consistency tracker",
      description: "A minimalist habit and consistency tracker focused on streak accountability and distraction-free daily logging.",
      learned: "Built around distraction-free execution with zero external library bloat, instant client-side state, and pure daily streak discipline.",
      github: "https://github.com/Sonasha99/HabitTracker",
      live: "https://habit-tracker-kappa-murex.vercel.app/"
    }
  ];

  return (
    <Section id="section-projects" number="03" onInView={onInView}>
      <div className="w-full text-left">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#F4E8A4]/25 pb-6 mb-12">
          <div>
            <span className="text-xs font-mono tracking-[0.2em] text-[#F4E8A4]/70 uppercase font-semibold block mb-2">
              Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#F4E8A4] tracking-tight">
              Projects
            </h2>
          </div>

          <div className="mt-4 sm:mt-0">
            <a
              href="https://github.com/Sonasha99"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F4E8A4] hover:text-white uppercase tracking-wider underline decoration-[#F4E8A4]/50 hover:decoration-white transition-colors"
            >
              <span>Explore My GitHub Profile</span>
            </a>
          </div>
        </div>

        {/* Clean Typographic Editorial Project List */}
        <div className="divide-y divide-[#F4E8A4]/20 mb-16">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${idx === 0 ? "pt-2" : ""}`}
            >
              {/* Left Column: Title & Tagline */}
              <div className="lg:col-span-5 space-y-2">
                <span className="text-xs font-mono text-[#F4E8A4]/50 block">0{idx + 1}</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4E8A4] tracking-tight">
                  {project.title}
                </h3>
                {project.tagline && (
                  <p className="text-xs font-mono text-[#F4E8A4]/80 font-medium">
                    {project.tagline}
                  </p>
                )}
              </div>

              {/* Right Column: Narrative, 1-Line Learning & Actions */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
                <p className="text-sm font-light text-[#F4E8A4]/90 leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* 1-Line Humanized Takeaway */}
                <div className="text-xs font-mono text-[#F4E8A4]/85 bg-[#38050E]/60 p-3 rounded-lg border-l-2 border-[#F4E8A4]">
                  <span>{project.learned}</span>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F4E8A4] hover:text-white uppercase tracking-wider underline decoration-[#F4E8A4]/50 hover:decoration-white transition-colors"
                    >
                      <span>Live</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F4E8A4] hover:text-white uppercase tracking-wider underline decoration-[#F4E8A4]/50 hover:decoration-white transition-colors"
                    >
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal GitHub Link */}
        <div className="pt-6 border-t border-[#F4E8A4]/20 flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <p className="text-xs font-mono text-[#F4E8A4]/70">
            For more code samples and utility scripts:
          </p>
          <a
            href="https://github.com/Sonasha99"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono uppercase tracking-wider text-[#F4E8A4] hover:text-white underline decoration-[#F4E8A4]/50"
          >
            github.com/Sonasha99
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Projects;
