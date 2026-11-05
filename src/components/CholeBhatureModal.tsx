import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Check, Sparkles, Heart } from 'lucide-react';

interface CholeBhatureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CholeBhatureModal: React.FC<CholeBhatureModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const upiId = "connectsonasha@okhdfcbank";

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.2 }}
            className="w-full max-w-md bg-[#4A0713] border-2 border-[#F4E8A4] rounded-2xl p-6 sm:p-8 text-left shadow-2xl relative overflow-hidden text-[#F4E8A4]"
          >
            {/* Background watermarked monogram / seal */}
            <div className="absolute -bottom-10 -right-10 text-[140px] font-serif font-black text-[#F4E8A4]/5 select-none pointer-events-none">
              ✦
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full text-[#F4E8A4]/70 hover:text-[#F4E8A4] hover:bg-[#F4E8A4]/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4E8A4]/10 border border-[#F4E8A4]/40 text-[10px] font-mono tracking-widest uppercase mb-4 text-[#F4E8A4]">
              <Sparkles size={11} className="text-[#F4E8A4]" />
              <span>Delhi Street Fuel</span>
            </div>

            {/* Title */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🍛</span>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-tight text-[#F4E8A4]">
                  Buy me Chole Bhature
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#F4E8A4]/85 leading-relaxed font-light mb-6">
              Engineering AI mock interview platforms, ATS resume analyzers, and high-performance full-stack architectures takes hot, crispy bhature fuel from Delhi's legendary food spots!
            </p>

            {/* Actions */}
            <div className="space-y-3">
              <a
                href="mailto:connectsonasha@gmail.com?subject=Bought%20you%20Chole%20Bhature!%20%F0%9F%8D%9B&body=Hey%20Sonasha,%20love%20your%20portfolio!%20Here%20is%20some%20Chole%20Bhature%20fuel%20on%20me."
                className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#F4E8A4] hover:bg-white text-[#4A0713] text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer active:scale-[0.98]"
              >
                <Mail size={14} />
                <span>Treat via Email ↗</span>
              </a>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#38050E]/80 border border-[#F4E8A4]/30 text-xs">
                <span className="text-[#F4E8A4]/60 font-mono text-[11px]">UPI:</span>
                <span className="font-mono text-[#F4E8A4] flex-1 truncate font-medium">{upiId}</span>
                <button
                  onClick={handleCopyUPI}
                  className="px-3 py-1 text-[11px] font-mono uppercase bg-[#F4E8A4]/20 hover:bg-[#F4E8A4] hover:text-[#4A0713] text-[#F4E8A4] rounded-lg border border-[#F4E8A4]/40 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-300 font-bold">Copied</span>
                    </>
                  ) : (
                    <span>Copy UPI</span>
                  )}
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#F4E8A4]/60">
                <Heart size={12} className="text-[#F4E8A4] fill-[#F4E8A4]" />
                <span>Fueling passionate software engineering</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CholeBhatureModal;
