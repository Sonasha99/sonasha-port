import React, { useState } from 'react';
import Section from '../components/Section';

interface SkillsProps {
  onInView: () => void;
}

const skills = [
  {
    num: "01",
    title: "Full-Stack Engineering",
    desc: "Architecting end-to-end web platforms, robust REST APIs, reactive frontends, and high-performance databases for production.",
    angle: 270,
  },
  {
    num: "02",
    title: "Frontend Design",
    desc: "Ofc you are seeing this website, how good this is... isn't it? Crafting crisp, accessible, and fast web interfaces.",
    angle: 315,
  },
  {
    num: "03",
    title: "Backend Systems",
    desc: "I genuinely enjoy spamming 'hello' to the server multiple times just to test resilience and watch it reply instantly without breaking.",
    angle: 0,
  },
  {
    num: "04",
    title: "Agentic AI",
    desc: "Architecting autonomous agent decision loops, multi-tool calling pipelines, and autonomous goal-seeking workflows.",
    angle: 45,
  },
  {
    num: "05",
    title: "Generative AI",
    desc: "Integrating LLMs, Gemini APIs, prompt engineering, and contextual reasoning directly into client-facing platforms.",
    angle: 90,
  },
  {
    num: "06",
    title: "Large Systems & Architecture",
    desc: "Structuring distributed databases, caching, concurrency control, and scalable systems built for high throughput.",
    angle: 135,
  },
  {
    num: "07",
    title: "System Design LLD & HLD",
    desc: "Low-level class design, component decomposition, and high-level distributed system design, translating real problems into scalable blueprints.",
    angle: 180,
  },
  {
    num: "08",
    title: "RAG & LLM",
    desc: "Building Retrieval-Augmented Generation pipelines, vector databases, context-aware LLM workflows, and grounded AI responses for production use.",
    angle: 225,
  },
];

const technicalStack = [
  { category: "Languages",                     items: "C++, C, Python, JavaScript, SQL" },
  { category: "Frontend Development",          items: "React.js, Next.js, Tailwind CSS, Shadcn UI, HTML5, CSS3, Bootstrap" },
  { category: "Backend Development",           items: "Node.js, Express.js, Flask, FastAPI, REST APIs, API Integration, JWT Authentication, bcrypt" },
  { category: "Databases & ORM",               items: "MongoDB, PostgreSQL, MySQL, Neon, Drizzle ORM, Mongoose" },
  { category: "AI & Machine Learning",         items: "Generative AI, Agentic AI, LLMs, RAG, Google Gemini API, Prompt Engineering, Embeddings, Semantic Search, Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn" },
  { category: "System Design & Architecture",  items: "Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, LLD, HLD, System Architecture, Distributed Systems, Scalability, Caching, Performance Optimization" },
  { category: "Developer Tools",               items: "Git, GitHub, Docker, VS Code, Postman, Figma, Jupyter Notebook" },
  { category: "Deployment & DevOps",           items: "Docker, AWS, Vercel, Render" },
];

// SVG dimensions
const SIZE = 760;
const CX = SIZE / 2;   // 380
const CY = SIZE / 2;   // 380
const ORBIT_R = 250;   // orbital radius
const OUTER_R = 76;    // radius of each skill circle (enlarged)
const CENTER_R = 95;   // radius of center circle (enlarged)

function polarToXY(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

const Skills: React.FC<SkillsProps> = ({ onInView }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const hoveredSkill = hovered !== null ? skills[hovered] : null;

  return (
    <Section id="section-skills" number="02" onInView={onInView}>
      <div className="w-full text-left">
        {/* Section Heading */}
        <div className="border-b border-[#F4E8A4]/25 pb-6 mb-12">
          <span className="text-xs font-mono tracking-[0.2em] text-[#F4E8A4]/70 uppercase font-semibold block mb-2">
            Focus Areas
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#F4E8A4] tracking-tight">
            What I Build
          </h2>
        </div>

        {/* Orbital Skill Map */}
        <div className="flex flex-col items-center gap-6 mb-16">
          {/* Responsive SVG wrapper with enlarged circles */}
          <div className="w-full max-w-[760px] mx-auto">
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              width="100%"
              style={{ display: 'block' }}
            >
              {/* Orbit ring */}
              <circle
                cx={CX}
                cy={CY}
                r={ORBIT_R}
                fill="none"
                stroke="#F4E8A4"
                strokeOpacity={0.08}
                strokeWidth={1.5}
              />

              {/* Connecting dashed lines */}
              {skills.map((skill, i) => {
                const pos = polarToXY(skill.angle, ORBIT_R);
                const isActive = hovered === i;
                return (
                  <line
                    key={`line-${i}`}
                    x1={CX}
                    y1={CY}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="#F4E8A4"
                    strokeOpacity={isActive ? 0.45 : 0.12}
                    strokeWidth={isActive ? 1.8 : 1}
                    strokeDasharray="4 6"
                    style={{ transition: 'stroke-opacity 0.2s, stroke-width 0.2s' }}
                  />
                );
              })}

              {/* Outer skill circles */}
              {skills.map((skill, i) => {
                const pos = polarToXY(skill.angle, ORBIT_R);
                const isActive = hovered === i;

                // Split title into lines for SVG text
                const words = skill.title.split(' ');
                let lines: string[] = [];
                let current = '';
                words.forEach((word) => {
                  const test = current ? `${current} ${word}` : word;
                  if (test.length > 13 && current) {
                    lines.push(current);
                    current = word;
                  } else {
                    current = test;
                  }
                });
                if (current) lines.push(current);

                const lineH = 15;
                const totalH = lines.length * lineH;
                const startY = pos.y - totalH / 2 + 7;

                return (
                  <g
                    key={`circle-${i}`}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Glow */}
                    {isActive && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={OUTER_R + 8}
                        fill="#F4E8A4"
                        fillOpacity={0.08}
                      />
                    )}
                    {/* Circle border */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={OUTER_R}
                      fill={isActive ? 'rgba(244,232,164,0.12)' : 'rgba(56,5,14,0.92)'}
                      stroke="#F4E8A4"
                      strokeOpacity={isActive ? 0.95 : 0.3}
                      strokeWidth={isActive ? 1.8 : 1.2}
                      style={{ transition: 'fill 0.2s, stroke-opacity 0.2s' }}
                    />
                    {/* Number */}
                    <text
                      x={pos.x}
                      y={startY - 14}
                      textAnchor="middle"
                      fill="#F4E8A4"
                      fillOpacity={0.45}
                      fontSize={10}
                      fontFamily="'JetBrains Mono', monospace"
                    >
                      {skill.num}
                    </text>
                    {/* Title lines */}
                    {lines.map((line, li) => (
                      <text
                        key={li}
                        x={pos.x}
                        y={startY + li * lineH}
                        textAnchor="middle"
                        fill="#F4E8A4"
                        fillOpacity={isActive ? 1 : 0.9}
                        fontSize={12}
                        fontFamily="'Cinzel', serif"
                        fontWeight={600}
                        style={{ transition: 'fill-opacity 0.2s' }}
                      >
                        {line}
                      </text>
                    ))}
                  </g>
                );
              })}

              {/* Center circle */}
              <circle
                cx={CX}
                cy={CY}
                r={CENTER_R}
                fill="#F4E8A4"
              />
              <text
                x={CX}
                y={CY + 7}
                textAnchor="middle"
                fill="#38050E"
                fontSize={21}
                fontFamily="'Cinzel', serif"
                fontWeight={700}
                letterSpacing="0.04em"
              >
                I Build
              </text>
            </svg>
          </div>

          {/* Hover description panel */}
          <div
            className="max-w-lg w-full min-h-[72px] text-center px-4"
            style={{ opacity: hoveredSkill ? 1 : 0.35, transition: 'opacity 0.2s' }}
          >
            {hoveredSkill ? (
              <>
                <span className="font-serif font-bold text-[#F4E8A4] text-sm block mb-1">
                  {hoveredSkill.title}
                </span>
                <span className="font-mono text-xs text-[#F4E8A4]/80 leading-relaxed">
                  {hoveredSkill.desc}
                </span>
              </>
            ) : (
              <span className="font-mono text-xs text-[#F4E8A4]/40">
                hover a circle to explore
              </span>
            )}
          </div>
        </div>

        {/* Technical Stack */}
        <div className="pt-10 border-t border-[#F4E8A4]/20">
          <span className="text-xs font-mono tracking-[0.2em] text-[#F4E8A4]/70 uppercase font-semibold block mb-6">
            Technical Stack
          </span>
          <div className="divide-y divide-[#F4E8A4]/15">
            {technicalStack.map((tech) => (
              <div key={tech.category} className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 font-mono text-xs">
                <span className="font-bold text-[#F4E8A4] sm:w-64 shrink-0 uppercase tracking-wide">{tech.category}</span>
                <span className="text-[#F4E8A4]/85 flex-1">{tech.items}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Skills;
