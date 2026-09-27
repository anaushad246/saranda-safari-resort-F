import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, Clock, ShieldCheck } from 'lucide-react';

const STAGES = [
  { after: 0, text: 'Processing your booking details...', subtext: 'Connecting with Saranda Safari Resort reservation desk' },
  { after: 3, text: 'Contacting reservation server...', subtext: 'Verifying seasonal rates & room availability' },
  { after: 8, text: 'Waking up secure server...', subtext: 'Our cloud server wakes up on demand (~20–30s on first visit)' },
  { after: 20, text: 'Almost there! Locking hold...', subtext: 'Generating your 2-hour reservation hold receipt' },
  { after: 35, text: 'Finalizing your booking hold...', subtext: 'Thank you for your patience! Just a few more seconds' }
];

export function SubmissionLoader() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentStage = [...STAGES].reverse().find(s => seconds >= s.after) || STAGES[0];
  const estimatedProgress = Math.min(94, Math.round(15 + (seconds / 40) * 75));

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-[#0E261C]/95 backdrop-blur-md rounded-xl text-white animate-fadeIn text-center">
      <div className="relative mb-5 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-[#C5A059]/30 flex items-center justify-center bg-[#143628]">
          <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin" />
        </div>
        <div className="absolute -top-1 -right-1 bg-[#C25E3E] text-white p-1 rounded-full shadow">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 transition-all">
        {currentStage.text}
      </h4>
      <p className="text-xs sm:text-sm text-[#DFCA95] max-w-md mx-auto mb-6 transition-all">
        {currentStage.subtext}
      </p>

      <div className="w-full max-w-sm bg-black/40 rounded-full h-2.5 overflow-hidden border border-[#C5A059]/30 mb-3 relative">
        <div 
          className="h-full bg-gradient-to-r from-[#C5A059] via-[#DFCA95] to-[#C25E3E] transition-all duration-700 ease-out rounded-full"
          style={{ width: `${estimatedProgress}%` }}
        />
      </div>

      <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#F9F6F0]/70 mb-4">
        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>Time elapsed: <strong className="text-white font-mono">{seconds}s</strong></span>
      </div>

      {seconds >= 7 && (
        <div className="mt-2 px-4 py-2.5 rounded-lg bg-[#143628]/80 border border-[#C5A059]/30 max-w-md text-left flex items-start gap-2.5 animate-fadeIn">
          <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#F9F6F0]/85 leading-relaxed">
            Please keep this window open. Your 2-hour hold is being secured directly in our reservation register.
          </p>
        </div>
      )}
    </div>
  );
}

export default SubmissionLoader;
