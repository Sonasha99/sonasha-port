import React, { useState } from 'react';
import { ArrowLeft, Check, Copy, Play, Pause } from 'lucide-react';

interface NonRecruiterCornerProps {
  onBack: () => void;
}

interface SongItem {
  id: string;
  title: string;
  artist: string;
  ytId: string;
}

// Songs list (Full Track YouTube Audio - Zero Photos, Unlimited Play)
const songsList: SongItem[] = [
  { id: '4mOmWSdTmf6fSAibGWCKp7', title: 'Mental Manadhil', artist: 'A.R. Rahman, Jonita Gandhi', ytId: 'Wp05ZCG3yMk' },
  { id: '7AV8ZRp0iLBcySzwwlq65Q', title: 'O Mere Saajan', artist: 'Ajay-Atul, Javed Ali', ytId: 'Y1L01J5fhDY' },
  { id: '3yhVTO8lngap6YXZQbtEOo', title: 'Bhenge Mor Ghorer Chabi', artist: 'Rabindra Sangeet', ytId: 'ovWtd35mkAQ' },
  { id: '5bHDGWyIFML1LYXZWTD5MF', title: 'I Love You', artist: 'Pritam, Ash King, Clinton Cerejo', ytId: '0JLRExeOH-k' },
  { id: '4MJpGGIDRwHuWoZCddIOgM', title: 'ILYSMIH', artist: 'Kali Uchis', ytId: 'U7Du_n6u5CM' },
  { id: '7rija7VgKSXznBBy3b3TgD', title: 'Sitamma Vakitlo', artist: 'Mickey J. Meyer, K.S. Chithra', ytId: '0Q7cDqj3bVg' },
  { id: '0gReuuHGXFp1OovrqDPPFa', title: 'Bhalolaage Tomake', artist: 'Shreya Ghoshal, Anupam Roy', ytId: 'RMz8l3p4Feg' },
  { id: '47U38LbRLzE76b6QOPZYtu', title: 'Chhoti Si Aasha', artist: 'A.R. Rahman, Minmini', ytId: 'P2s1Cl23oik' },
  { id: '05REArTDZQd59A9Y4XC0Aq', title: 'Maine Khud Ko', artist: 'Mustafa Zahid', ytId: 'Gh0Ffh8iGwQ' },
];

// Niche wale songs (Full Track)
const sadTracks: SongItem[] = [
  { id: '4fyR24BKznXBLNkK8LwWla', title: 'Dheere Dheere', artist: 'Yo Yo Honey Singh', ytId: 'nCD2hj6zJEc' },
  { id: '7cMYs2LIf8YNqegnr0svwh', title: 'Tujhe Aksa Beach Ghuma Doon', artist: 'Wajid, Amrita Kak', ytId: 'Xss6ZlUYoGA' },
  { id: '0YCPCY9WhQFMFtoSpj6dhL', title: 'Kiya Kiya', artist: 'Anand Raj Anand, Shweta Pandit', ytId: 'phcltUsSYbI' },
  { id: '5pvXcMiqTDzUimGj2Vi8uG', title: 'Dilbar Dilbar', artist: 'Alka Yagnik', ytId: 's5Iyc5rwUoI' },
  { id: '4t77OsiudWy4timV32lPa2', title: 'Backbone', artist: 'Harrdy Sandhu, Jaani', ytId: 'giKbmzLjasc' },
  { id: '0CCkRb9Ga6nluTRiAejwCw', title: 'Caller Tune', artist: 'Neeraj Shridhar, Neeti Mohan', ytId: 'PzdQ_6uuzDc' },
  { id: '0Wt2nTFdp8maSu2cNRMxDx', title: 'Paani Waala Dance', artist: 'Ikka, Shraddha Pandit', ytId: 'v8DLJMDlokw' },
  { id: '089RI5usQMZksGlnYqSmKk', title: 'Rowdy Baby', artist: 'Dhanush, Dhee, Yuvan Shankar Raja', ytId: 'wcpgNauEovM' },
  { id: '1QZRCi2Z1DQQaR6bGAzhtN', title: 'Love Dose', artist: 'Yo Yo Honey Singh', ytId: '0E0YtltKH70' },
];

const favPhotos = Array.from({ length: 39 }, (_, i) => `/fav-photos/photo-${String(i + 1).padStart(2, '0')}.jpeg`);

const menuItems = [
  { name: "Chole Bhature", amount: 200, price: "₹200", note: "Bhogal CP, omggg" },
  { name: "Butter Chicken", amount: 995, price: "₹995", note: "Gulati, Pandara Road, my favv" },
  { name: "Momos", amount: 100, price: "₹100", note: "Safdarjung Enclave street cart, Delhi" },
  { name: "Biryani", amount: 500, price: "₹500", note: "still searching for best" },
];

const NonRecruiterCorner: React.FC<NonRecruiterCornerProps> = ({ onBack }) => {
  const [hasPassedWarning, setHasPassedWarning] = useState(false);
  const [activeTab, setActiveTab] = useState<'audio' | 'treat' | 'photos' | 'corner'>('treat');
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);
  const [currentlyPlayingAudio, setCurrentlyPlayingAudio] = useState<string | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [activeSongId, setActiveSongId] = useState<string | null>(null);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const voiceAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const upiId = "sonasha96@ybl";

  const activeSong = [...songsList, ...sadTracks].find((s) => s.id === activeSongId) || null;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAudio = () => {
    // Exclusively controls "Tu Online Hai" background music
    const iframe = document.getElementById('tu-online-player') as HTMLIFrameElement;
    if (isPlaying) {
      iframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
      setIsPlaying(false);
    } else {
      // Pause full-song player if playing so audio does not clash
      if (isSongPlaying) {
        const fullIframe = document.getElementById('full-song-stream') as HTMLIFrameElement;
        fullIframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
        setIsSongPlaying(false);
      }
      iframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
      setIsPlaying(true);
    }
  };

  const handleToggleSong = (song: SongItem) => {
    if (activeSongId === song.id && isSongPlaying) {
      const iframe = document.getElementById('full-song-stream') as HTMLIFrameElement;
      iframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
      setIsSongPlaying(false);
    } else if (activeSongId === song.id && !isSongPlaying) {
      const iframe = document.getElementById('full-song-stream') as HTMLIFrameElement;
      iframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
      setIsSongPlaying(true);
    } else {
      // 1. Pause Tu Online Hai background music so they don't clash
      const bgYt = document.getElementById('tu-online-player') as HTMLIFrameElement;
      bgYt?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
      setIsPlaying(false);

      // 2. Pause voice notes if any
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
        setCurrentlyPlayingAudio(null);
      }

      // 3. Play selected song
      setActiveSongId(song.id);
      setIsSongPlaying(true);
    }
  };

  const playVoiceNote = (src: string, label: string) => {
    // 1. Pause any currently playing voice note
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current.currentTime = 0;
    }

    // 2. Pause YouTube background music so voices do not clash
    const yt = document.getElementById('tu-online-player') as HTMLIFrameElement;
    yt?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
    setIsPlaying(false);

    // 3. Pause full song stream if playing
    if (isSongPlaying) {
      const fullIframe = document.getElementById('full-song-stream') as HTMLIFrameElement;
      fullIframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
      setIsSongPlaying(false);
    }

    // 4. Play selected voice note
    const audio = new Audio(src);
    voiceAudioRef.current = audio;
    setCurrentlyPlayingAudio(label);

    audio.play().catch((err) => console.log('Playback error:', err));
    audio.onended = () => {
      setCurrentlyPlayingAudio(null);
    };
  };

  React.useEffect(() => {
    if (hasPassedWarning && isPlaying) {
      const timer = setTimeout(() => {
        const iframe = document.getElementById('tu-online-player') as HTMLIFrameElement;
        iframe?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasPassedWarning, isPlaying]);

  React.useEffect(() => {
    return () => {
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
        voiceAudioRef.current = null;
      }
    };
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 1. WARNING SCREEN
  // ─────────────────────────────────────────────────────────────
  if (!hasPassedWarning) {
    return (
      <div className="min-h-screen bg-[#38050E] text-[#F4E8A4] font-sans flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full space-y-6">
          <p className="text-sm font-mono text-[#F4E8A4]/80">
            continue only if u are not a recruiter
          </p>

          <div className="pt-2 flex flex-col gap-3 font-mono text-xs">
            <button
              onClick={() => {
                setHasPassedWarning(true);
                setIsPlaying(true);
              }}
              className="w-full py-3 px-6 rounded-full bg-[#F4E8A4] text-[#38050E] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
            >
              continue
            </button>
            <button
              onClick={onBack}
              className="w-full py-3 px-6 rounded-full border border-[#F4E8A4]/40 text-[#F4E8A4] hover:bg-[#F4E8A4]/10 uppercase tracking-wider transition-colors cursor-pointer"
            >
              return to port
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. UNLOCKED SPACE (Full width layout)
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#38050E] text-[#F4E8A4] font-sans selection:bg-[#F4E8A4] selection:text-[#38050E] flex flex-col justify-between">
      {/* Top Header with Return button only */}
      <header className="border-b border-[#F4E8A4]/20 bg-[#38050E]/95 backdrop-blur-md sticky top-0 z-40 w-full">
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F4E8A4]/80 hover:text-[#F4E8A4] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>return to port</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full px-4 sm:px-8 py-8 flex-1 text-left max-w-[1700px] mx-auto">
        {/* Intro + Music Player on exact right side of hello */}
        <div className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4E8A4] tracking-tight">
              helloooooooooooooooooooooooooooooooo
            </h2>
            <p className="text-base font-serif text-[#F4E8A4]/90">
              everything ok?
            </p>
            <p className="font-mono text-xs text-[#F4E8A4]/70 pt-1">
              if (!ok) {'{'} cout &lt;&lt; "mail me at connectsonasha@gmail.com"; {'}'}
            </p>
          </div>

          {/* Right Side: Circular Play/Pause Button (Exclusively for Tu Online Hai) */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
            <button
              onClick={toggleAudio}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#F4E8A4]/50 hover:border-[#F4E8A4] text-[#F4E8A4] flex items-center justify-center hover:bg-[#F4E8A4]/15 transition-all cursor-pointer shadow-md active:scale-95"
              title={isPlaying ? "Pause Tu Online Hai" : "Play Tu Online Hai"}
              aria-label={isPlaying ? "Pause Tu Online Hai" : "Play Tu Online Hai"}
            >
              {isPlaying ? (
                <Pause size={22} className="fill-[#F4E8A4]" />
              ) : (
                <Play size={22} className="fill-[#F4E8A4] ml-1" />
              )}
            </button>

            {/* Hidden Persistent Audio Streams (Never unmount when changing tabs!) */}
            <div className="w-0 h-0 overflow-hidden opacity-0 pointer-events-none absolute">
              <iframe
                id="tu-online-player"
                src="https://www.youtube.com/embed/A5rcp02MBL4?enablejsapi=1&autoplay=1&mute=0&loop=1&playlist=A5rcp02MBL4"
                title="Tu Online Hai"
                width="200"
                height="200"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />

              {activeSong && (
                <iframe
                  key={activeSong.id}
                  id="full-song-stream"
                  src={`https://www.youtube.com/embed/${activeSong.ytId}?enablejsapi=1&autoplay=1&mute=0`}
                  title={activeSong.title}
                  width="200"
                  height="200"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs: treat me | fav photos | music | our corner */}
        <div className="flex gap-6 sm:gap-8 border-b border-[#F4E8A4]/20 pb-3 mb-8 font-mono text-xs flex-wrap">
          <button
            onClick={() => setActiveTab('treat')}
            className={`pb-1 transition-colors cursor-pointer uppercase tracking-wider ${
              activeTab === 'treat'
                ? 'text-[#F4E8A4] font-bold border-b-2 border-[#F4E8A4]'
                : 'text-[#F4E8A4]/60 hover:text-[#F4E8A4]'
            }`}
          >
            treat me
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`pb-1 transition-colors cursor-pointer uppercase tracking-wider ${
              activeTab === 'photos'
                ? 'text-[#F4E8A4] font-bold border-b-2 border-[#F4E8A4]'
                : 'text-[#F4E8A4]/60 hover:text-[#F4E8A4]'
            }`}
          >
            fav photos
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`pb-1 transition-colors cursor-pointer uppercase tracking-wider ${
              activeTab === 'audio'
                ? 'text-[#F4E8A4] font-bold border-b-2 border-[#F4E8A4]'
                : 'text-[#F4E8A4]/60 hover:text-[#F4E8A4]'
            }`}
          >
            music
          </button>
          <button
            onClick={() => setActiveTab('corner')}
            className={`pb-1 transition-colors cursor-pointer uppercase tracking-wider ${
              activeTab === 'corner'
                ? 'text-[#F4E8A4] font-bold border-b-2 border-[#F4E8A4]'
                : 'text-[#F4E8A4]/60 hover:text-[#F4E8A4]'
            }`}
          >
            our corner
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TAB 1: MUSIC / FULL-SONG PLAYER (Unlimited Full Audio, Zero Photos)
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'audio' && (
          <div className="space-y-6 w-full">
            {/* Clean Songs Heading */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F4E8A4] font-semibold">
                  fav songs
                </span>
                {activeSongId && isSongPlaying && (
                  <span className="text-[11px] font-mono text-[#F4E8A4] flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-[#F4E8A4]" />
                    now playing: {activeSong?.title}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                {songsList.map((song) => {
                  const isThisPlaying = activeSongId === song.id && isSongPlaying;
                  return (
                    <div
                      key={song.id}
                      onClick={() => handleToggleSong(song)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer group select-none shadow-sm ${
                        isThisPlaying
                          ? 'bg-[#4A0713] border-[#F4E8A4] shadow-[0_0_15px_rgba(244,232,164,0.15)]'
                          : 'bg-[#38050E]/80 border-[#F4E8A4]/25 hover:border-[#F4E8A4]/70 hover:bg-[#4A0713]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        {/* Play/Pause Button */}
                        <div
                          className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            isThisPlaying
                              ? 'bg-[#F4E8A4] text-[#38050E] border-[#F4E8A4] shadow-md'
                              : 'border-[#F4E8A4]/40 text-[#F4E8A4] group-hover:bg-[#F4E8A4] group-hover:text-[#38050E] group-hover:border-[#F4E8A4]'
                          }`}
                        >
                          {isThisPlaying ? (
                            <Pause size={14} className="fill-current" />
                          ) : (
                            <Play size={14} className="fill-current ml-0.5" />
                          )}
                        </div>

                        {/* Title & Artist */}
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-sans font-medium text-[#F4E8A4] truncate group-hover:text-white transition-colors">
                            {song.title}
                          </p>
                          <p className="text-[11px] font-mono text-[#F4E8A4]/60 truncate">
                            {song.artist}
                          </p>
                        </div>
                      </div>

                      {/* Right indicator */}
                      <div className="shrink-0">
                        {isThisPlaying && (
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#F4E8A4] font-bold">
                            playing...
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Divider Message */}
            <p className="text-xs font-mono text-[#F4E8A4]/80 leading-relaxed py-4 border-t border-[#F4E8A4]/15">
              if u are sad listen these below if u listen sad songs now u will become more sad, instead listen the songs belowww heehee, smiling? no? okay
            </p>

            {/* Sad Songs */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                {sadTracks.map((song) => {
                  const isThisPlaying = activeSongId === song.id && isSongPlaying;
                  return (
                    <div
                      key={song.id}
                      onClick={() => handleToggleSong(song)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer group select-none shadow-sm ${
                        isThisPlaying
                          ? 'bg-[#4A0713] border-[#F4E8A4] shadow-[0_0_15px_rgba(244,232,164,0.15)]'
                          : 'bg-[#38050E]/80 border-[#F4E8A4]/25 hover:border-[#F4E8A4]/70 hover:bg-[#4A0713]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        {/* Play/Pause Button */}
                        <div
                          className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            isThisPlaying
                              ? 'bg-[#F4E8A4] text-[#38050E] border-[#F4E8A4] shadow-md'
                              : 'border-[#F4E8A4]/40 text-[#F4E8A4] group-hover:bg-[#F4E8A4] group-hover:text-[#38050E] group-hover:border-[#F4E8A4]'
                          }`}
                        >
                          {isThisPlaying ? (
                            <Pause size={14} className="fill-current" />
                          ) : (
                            <Play size={14} className="fill-current ml-0.5" />
                          )}
                        </div>

                        {/* Title & Artist */}
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-sans font-medium text-[#F4E8A4] truncate group-hover:text-white transition-colors">
                            {song.title}
                          </p>
                          <p className="text-[11px] font-mono text-[#F4E8A4]/60 truncate">
                            {song.artist}
                          </p>
                        </div>
                      </div>

                      {/* Right indicator */}
                      <div className="shrink-0">
                        {isThisPlaying && (
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#F4E8A4] font-bold">
                            playing...
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-xs font-mono text-[#F4E8A4]/70 pt-2">
              spam me at{' '}
              <a
                href="mailto:connectsonasha@gmail.com?subject=Song%20Recommendations"
                className="underline hover:text-[#F4E8A4] transition-colors"
              >
                connectsonasha@gmail.com
              </a>{' '}
              for more such songs :)
            </p>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 2: TREAT ME (Clean Normal Text List & UPI on Top)
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'treat' && (
          <div className="space-y-6 max-w-xl text-left">
            {/* UPI ID on Top */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#4A0713]/80 border border-[#F4E8A4]/25">
                <div>
                  <span className="text-[#F4E8A4]/60 block text-[10px] uppercase tracking-wider">UPI ID</span>
                  <span className="font-bold text-[#F4E8A4] text-sm">{upiId}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#F4E8A4] text-[#38050E] font-bold rounded cursor-pointer hover:opacity-90 transition-opacity"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              <p className="text-xs font-mono text-[#F4E8A4]/80 italic pt-1">
                Yesss, I know asking like this is a bit weird, but but{' '}
                <a
                  href="https://www.instagram.com/p/DVnhDbLkjcH/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-[#F4E8A4] transition-colors cursor-pointer font-bold"
                >
                  see (click to see)
                </a>
              </p>
            </div>

            {/* Food Menu: Normal Text List, Not Buttons */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F4E8A4]/70 block font-semibold">
                Menu
              </span>
              <div className="space-y-2">
                {menuItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col sm:flex-row sm:items-baseline justify-between py-2.5 border-b border-[#F4E8A4]/15 gap-1"
                  >
                    <div>
                      <span className="font-serif text-[#F4E8A4] text-base font-medium">
                        {item.name}
                      </span>
                      <span className="text-xs font-sans text-[#F4E8A4]/65 sm:ml-3 block sm:inline">
                        {item.note}
                      </span>
                    </div>
                    <span className="font-mono text-[#F4E8A4] text-sm font-semibold shrink-0">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 3: FAV PHOTOS (Full Screen Width Masonry Grid)
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'photos' && (
          <div className="w-full space-y-3">
            <p className="text-xs font-mono text-[#F4E8A4]/60 mb-4">fav photos :)</p>
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-3 space-y-3 w-full">
              {favPhotos.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`fav photo ${idx + 1}`}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  className="w-full rounded-lg break-inside-avoid object-cover hover:opacity-95 transition-opacity"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 4: OUR CORNER (Personal Interactive Voice Feedback)
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'corner' && (
          <div className="space-y-10 w-full text-left font-sans">
            {/* 1. Welcome Message */}
            <div className="pb-8 border-b border-[#F4E8A4]/15">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-sm sm:text-base font-sans text-[#F4E8A4]">
                  Hey
                </span>

                <button
                  onClick={() => playVoiceNote('/audio/welcome.mpeg', 'welcome')}
                  className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg border font-mono text-xs transition-all cursor-pointer shadow-sm active:scale-95 ${
                    currentlyPlayingAudio === 'welcome'
                      ? 'border-[#F4E8A4] bg-[#4A0713] text-[#F4E8A4] font-medium'
                      : 'bg-[#38050E]/60 border-[#F4E8A4]/25 text-[#F4E8A4] hover:border-[#F4E8A4] hover:bg-[#4A0713]/40'
                  }`}
                >
                  {currentlyPlayingAudio === 'welcome' ? 'playing...' : 'welcome (click to listen)'}
                </button>

                <span className="text-sm sm:text-base font-sans text-[#F4E8A4]">
                  to the end of the portfolio
                </span>
              </div>
            </div>

            {/* 2 & 3. Personal Interaction & Feedback Buttons */}
            <div className="space-y-6 pb-8 border-b border-[#F4E8A4]/15">
              <div className="space-y-2">
                <p className="text-lg sm:text-xl font-serif text-[#F4E8A4]">
                  I'd love to know what you think about my portfolio!
                </p>
                <p className="text-sm font-sans text-[#F4E8A4]/85">
                  btwww how are you, how's your day goinggg?
                </p>
                <p className="text-xs font-mono text-[#F4E8A4]/70">
                  whats your feedback on portfolio ..like is it very very amazing
                </p>
              </div>

              {/* 4 Interactive Audio Feedback Options - Horizontally spread */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full pt-2">
                {[
                  { id: 'very-very-amazing', label: 'very very amazing', audio: '/audio/okayish.mpeg' },
                  { id: 'amazing', label: 'amazing', audio: '/audio/very-very-amazing.mpeg' },
                  { id: 'good', label: 'good', audio: '/audio/amazing.mpeg' },
                  { id: 'okayish', label: 'okayish', audio: '/audio/good.mpeg' },
                ].map((opt) => {
                  const isPlayingThis = currentlyPlayingAudio === opt.id;
                  const isSelected = selectedFeedback === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelectedFeedback(opt.id);
                        playVoiceNote(opt.audio, opt.id);
                      }}
                      className={`py-3 px-3.5 rounded-lg border font-mono text-xs transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-1 ${
                        isPlayingThis
                          ? 'bg-[#F4E8A4] text-[#38050E] border-[#F4E8A4] shadow-md'
                          : isSelected
                          ? 'bg-[#4A0713] text-[#F4E8A4] border-[#F4E8A4]'
                          : 'bg-[#38050E]/60 border-[#F4E8A4]/25 text-[#F4E8A4] hover:border-[#F4E8A4] hover:bg-[#4A0713]/40'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="text-[10px] text-[#F4E8A4]/60">
                        {isPlayingThis ? 'playing...' : 'click to listen'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Contact & Suggestion */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-mono text-[#F4E8A4]">
                Faced an issue or have a suggestion?
              </p>
              <p className="text-xs font-sans text-[#F4E8A4]/80 leading-relaxed">
                You can reach out to me on{' '}
                <a
                  href="mailto:connectsonasha@gmail.com?subject=Portfolio%20Feedback%20from%20Our%20Corner"
                  className="underline text-[#F4E8A4] hover:opacity-80 transition-opacity cursor-pointer font-mono"
                >
                  connectsonasha@gmail.com
                </a>
                . I'd love to hear your feedback and improve!
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#F4E8A4]/20 py-6 px-4 sm:px-8 text-center text-xs font-mono text-[#F4E8A4]/60 w-full">
        <div className="w-full max-w-[1700px] mx-auto flex items-center justify-between">
          <span>Sonasha Choudhary</span>
          <button
            onClick={onBack}
            className="hover:text-[#F4E8A4] underline cursor-pointer transition-colors"
          >
            return to port
          </button>
        </div>
      </footer>
    </div>
  );
};

export default NonRecruiterCorner;
