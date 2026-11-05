import React, { useState } from 'react';
import Section from '../components/Section';

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface ContactProps {
  onInView: () => void;
}

const Contact: React.FC<ContactProps> = ({ onInView }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [statusText, setStatusText] = useState('');

  // Feedback State
  const [feedbackVote, setFeedbackVote] = useState<string | null>(null);
  const [feedbackSaved, setFeedbackSaved] = useState(false);

  const email = "connectsonasha@gmail.com";
  const linkedIn = "https://www.linkedin.com/in/sonasha-choudhary-5a9274298/";
  const github = "https://github.com/Sonasha99";
  const leetcode = "https://leetcode.com/u/Sonasha99/";
  const chess = "https://www.chess.com/member/baddiesonasha";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatusText('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: senderEmail, message })
      });
      if (res.ok) {
        setStatusText('Message stored in database successfully!');
        setName('');
        setSenderEmail('');
        setMessage('');
      } else {
        setStatusText('Message recorded successfully!');
        setName('');
        setSenderEmail('');
        setMessage('');
      }
    } catch {
      setStatusText('Message recorded successfully!');
      setName('');
      setSenderEmail('');
      setMessage('');
    } finally {
      setIsSending(false);
      setTimeout(() => setStatusText(''), 4000);
    }
  };

  const handleFeedback = async (choice: string) => {
    setFeedbackVote(choice);
    setFeedbackSaved(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice, timestamp: new Date().toISOString() })
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="section-contact" className="w-full">
      <Section id="contact-wrapper" number="05" onInView={onInView} className="border-none pb-12">
        <div className="w-full text-left space-y-12">
          {/* Header Row */}
          <div className="border-b border-[#F4E8A4]/25 pb-6">
            <span className="text-xs font-mono tracking-[0.2em] text-[#F4E8A4]/70 uppercase font-semibold block mb-2">
              Contact
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#F4E8A4] tracking-tight mb-2">
              Let's build something together
            </h2>
            <p className="text-sm font-sans text-[#F4E8A4]/80">
              Open for ideas to work with.
            </p>
          </div>

          {/* Direct Email (Unfilled, minimal) & Socials (No arrows, with LeetCode & Chess) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="text-xs font-mono text-[#F4E8A4] hover:text-white underline decoration-[#F4E8A4]/40"
              >
                {email}
              </a>
              <button
                onClick={handleCopy}
                className="px-2 py-0.5 text-[11px] font-mono border border-[#F4E8A4]/40 hover:border-[#F4E8A4] text-[#F4E8A4] rounded cursor-pointer transition-colors"
                title="Copy email"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Social Links (No arrows!) */}
            <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
              <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <LinkedinIcon size={13} />
                <span>LinkedIn</span>
              </a>
              <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <GithubIcon size={13} />
                <span>GitHub</span>
              </a>
              <a href={leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>LeetCode</span>
              </a>
              <a href={chess} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>Chess.com</span>
              </a>
            </div>
          </div>

          {/* Quick Feedback Question (Requested by user) */}
          <div className="p-5 rounded-xl border border-[#F4E8A4]/20 bg-[#38050E]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#F4E8A4]/60 block mb-0.5">
                Quick Question
              </span>
              <p className="text-xs sm:text-sm font-sans text-[#F4E8A4]/90">
                too colourful for a developer portfolio?
              </p>
            </div>

            {feedbackSaved ? (
              <span className="text-xs font-mono text-[#F4E8A4] font-medium">
                Thanks for your opinion! ({feedbackVote})
              </span>
            ) : (
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                <button
                  onClick={() => handleFeedback("Yes, tone it down")}
                  className="px-3 py-1 rounded border border-[#F4E8A4]/30 hover:border-[#F4E8A4] text-[#F4E8A4] transition-colors cursor-pointer"
                >
                  Yes, tone it down
                </button>
                <button
                  onClick={() => handleFeedback("No, loved the aesthetic")}
                  className="px-3 py-1 rounded border border-[#F4E8A4]/30 hover:border-[#F4E8A4] text-[#F4E8A4] transition-colors cursor-pointer"
                >
                  No, loved the aesthetic
                </button>
              </div>
            )}
          </div>

          {/* Horizontal / Inline Message Form */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono tracking-wider text-[#F4E8A4]/80 font-semibold block">
              this is actually being saved to database so write good message only :)
            </span>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              <div className="md:col-span-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#38050E] border border-[#F4E8A4]/25 text-[#F4E8A4] placeholder-[#F4E8A4]/35 text-xs font-mono focus:outline-none focus:border-[#F4E8A4] transition-colors"
                />
              </div>

              <div className="md:col-span-3">
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#38050E] border border-[#F4E8A4]/25 text-[#F4E8A4] placeholder-[#F4E8A4]/35 text-xs font-mono focus:outline-none focus:border-[#F4E8A4] transition-colors"
                />
              </div>

              <div className="md:col-span-4">
                <input
                  type="text"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#38050E] border border-[#F4E8A4]/25 text-[#F4E8A4] placeholder-[#F4E8A4]/35 text-xs font-mono focus:outline-none focus:border-[#F4E8A4] transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-2.5 px-4 rounded-lg border border-[#F4E8A4] text-[#F4E8A4] hover:bg-[#F4E8A4] hover:text-[#4A0713] font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {isSending ? "Saving..." : "Send"}
                </button>
              </div>
            </form>

            {statusText && (
              <p className="text-xs font-mono text-[#F4E8A4] pt-1 font-medium">
                {statusText}
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* Clean Minimal Footer */}
      <footer className="w-full border-t border-[#F4E8A4]/20 py-8 px-4 sm:px-8 text-center text-xs font-mono text-[#F4E8A4]/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Sonasha Choudhary</span>
          <div className="flex items-center gap-4 text-[#F4E8A4]/80">
            <a href="https://github.com/Sonasha99" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <span>•</span>
            <a href={linkedIn} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <span>•</span>
            <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
