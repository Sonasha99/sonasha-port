import React, { useState } from 'react';
import { X, Mail, Music, Smile, Sparkles, AlertTriangle } from 'lucide-react';

interface NonRecruiterCornerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NonRecruiterCornerModal: React.FC<NonRecruiterCornerModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'chole' | 'daily' | 'audio' | 'memes'>('chole');
  const [copied, setCopied] = useState(false);
  const upiId = "connectsonasha@okhdfcbank";

  if (!isOpen) return null;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const songs = [
    { title: "Starboy", artist: "The Weeknd", vibe: "Late-night coding rhythm" },
    { title: "After Hours", artist: "The Weeknd", vibe: "Deep focus & debug flow" },
    { title: "Nightcall", artist: "Kavinsky", vibe: "Synthwave monk mode" },
    { title: "Chamber of Reflection", artist: "Mac DeMarco", vibe: "Chill architecture thinking" }
  ];

  const memes = [
    {
      setup: "Senior Dev:",
      punchline: "\"It works on my machine.\" \nDevOps: \"Then we are shipping your machine.\""
    },
    {
      setup: "CSS in production:",
      punchline: "margin-top: 1px;\n*Everything on the page explodes*"
    },
    {
      setup: "99 little bugs in the code:",
      punchline: "Take one down, patch it around... 127 little bugs in the code."
    },
    {
      setup: "Git commit at 3 AM:",
      punchline: "git commit -m \"pls work i beg you\""
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#38050E] border-2 border-[#F4E8A4] rounded-2xl p-6 sm:p-7 text-left shadow-2xl relative text-[#F4E8A4] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#F4E8A4]/70 hover:text-white hover:bg-[#F4E8A4]/10 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Warning Banner / Title */}
        <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-wider mb-2">
          <AlertTriangle size={14} />
          <span>Non-Recruiter Corner</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#F4E8A4] mb-1">
          Continue if you are a recruiter 😄
        </h3>
        <p className="text-xs font-mono text-[#F4E8A4]/70 mb-5">
          A little personal sandbox for good food, daily thoughts, music, and dev memes.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-[#F4E8A4]/20 pb-3 mb-5 font-mono text-xs">
          <button
            onClick={() => setActiveTab('chole')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'chole'
                ? 'bg-[#F4E8A4] text-[#4A0713] font-bold'
                : 'text-[#F4E8A4]/70 hover:text-white hover:bg-[#F4E8A4]/10'
            }`}
          >
            Treat Chole Bhature
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'daily'
                ? 'bg-[#F4E8A4] text-[#4A0713] font-bold'
                : 'text-[#F4E8A4]/70 hover:text-white hover:bg-[#F4E8A4]/10'
            }`}
          >
            Daily Dev Note
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'audio'
                ? 'bg-[#F4E8A4] text-[#4A0713] font-bold'
                : 'text-[#F4E8A4]/70 hover:text-white hover:bg-[#F4E8A4]/10'
            }`}
          >
            My Fav Songs
          </button>
          <button
            onClick={() => setActiveTab('memes')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'memes'
                ? 'bg-[#F4E8A4] text-[#4A0713] font-bold'
                : 'text-[#F4E8A4]/70 hover:text-white hover:bg-[#F4E8A4]/10'
            }`}
          >
            Dev Memes
          </button>
        </div>

        {/* Tab 1: Treat me Chole Bhature */}
        {activeTab === 'chole' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#4A0713] border border-[#F4E8A4]/30">
              <h4 className="text-base font-serif font-bold text-[#F4E8A4] mb-1">
                Fuel the Code with Delhi Street Food
              </h4>
              <p className="text-xs font-sans text-[#F4E8A4]/85 leading-relaxed mb-4">
                Writing distributed systems, fine-tuning Gemini prompts, and crafting bug-free platforms takes serious hot & crispy Chole Bhature fuel.
              </p>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#38050E] border border-[#F4E8A4]/20 text-xs font-mono mb-3">
                <span className="text-[#F4E8A4]/60">UPI:</span>
                <span className="text-[#F4E8A4] flex-1 truncate font-medium">{upiId}</span>
                <button
                  onClick={handleCopyUPI}
                  className="px-2.5 py-1 text-[11px] bg-[#F4E8A4] text-[#4A0713] font-bold rounded cursor-pointer hover:bg-white"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <a
                href="mailto:connectsonasha@gmail.com?subject=Bought%20you%20Chole%20Bhature!"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#F4E8A4] text-[#4A0713] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <Mail size={13} />
                <span>Send Chole Bhature via Email</span>
              </a>
            </div>
          </div>
        )}

        {/* Tab 2: Daily Dev Note */}
        {activeTab === 'daily' && (
          <div className="p-4 rounded-xl bg-[#4A0713] border border-[#F4E8A4]/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F4E8A4]/70">
              <Sparkles size={14} className="text-amber-300" />
              <span>Daily Engineering Reality</span>
            </div>
            <p className="text-sm font-sans italic text-[#F4E8A4] leading-relaxed">
              "If your code compiles cleanly on the very first try without warnings, do not celebrate. Assume something is deeply and mysteriously wrong."
            </p>
            <p className="text-xs font-mono text-[#F4E8A4]/75 border-t border-[#F4E8A4]/20 pt-2">
              Rule #1: Turn real problems into solutions. Ship real code.
            </p>
          </div>
        )}

        {/* Tab 3: Fav Songs */}
        {activeTab === 'audio' && (
          <div className="space-y-2.5">
            {songs.map((song, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#4A0713] border border-[#F4E8A4]/20 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#38050E] text-[#F4E8A4]">
                    <Music size={14} />
                  </div>
                  <div>
                    <h5 className="text-xs font-serif font-bold text-[#F4E8A4]">
                      {song.title}
                    </h5>
                    <p className="text-[11px] font-mono text-[#F4E8A4]/60">
                      {song.artist}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#F4E8A4]/70 px-2 py-0.5 rounded bg-[#38050E]">
                  {song.vibe}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Fav Memes */}
        {activeTab === 'memes' && (
          <div className="space-y-3">
            {memes.map((meme, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[#4A0713] border border-[#F4E8A4]/20 text-left"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#F4E8A4] mb-1">
                  <Smile size={13} className="text-amber-300" />
                  <span>{meme.setup}</span>
                </div>
                <p className="text-xs font-mono text-[#F4E8A4]/85 whitespace-pre-line bg-[#38050E] p-2 rounded-lg border border-[#F4E8A4]/10">
                  {meme.punchline}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NonRecruiterCornerModal;
