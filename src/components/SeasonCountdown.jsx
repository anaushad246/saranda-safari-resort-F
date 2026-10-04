import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

/**
 * SeasonCountdown
 * Lightweight, zero-dependency countdown timer to the resort's opening season.
 * Gracefully switches to "Season Now Open" when the target time is reached.
 */
export function SeasonCountdown({ targetDate = '2026-11-01T09:00:00+05:30' }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateRemaining(targetDate);
      setTimeLeft(remaining);
      if (!remaining) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateRemaining(target) {
    const targetMs = new Date(target).getTime();
    const diff = targetMs - Date.now();
    if (isNaN(diff) || diff <= 0) {
      return null;
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  if (!timeLeft) {
    return (
      <div className="mt-2.5 pt-2 border-t border-[#C5A059]/30 text-xs font-semibold text-[#DFCA95] flex items-center justify-center gap-1.5 animate-fadeIn">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>🌿 Season Now Open — Pre-Bookings & Reservations Active</span>
      </div>
    );
  }

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours.toString().padStart(2, '0') },
    { label: 'MINS', value: timeLeft.minutes.toString().padStart(2, '0') },
    { label: 'SECS', value: timeLeft.seconds.toString().padStart(2, '0') },
  ];

  return (
    <div className="mt-3 pt-2.5 border-t border-[#C5A059]/30 flex flex-col items-center gap-2">
      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-[#DFCA95]/85">
        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>Season Opens In</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-xs sm:max-w-sm">
        {timeBlocks.map((block) => (
          <div
            key={block.label}
            className="group flex flex-col items-center justify-center bg-[#0E261C]/90 border border-[#C5A059]/40 rounded-lg py-2 px-2 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-[#DFCA95] hover:bg-[#143628] hover:shadow-[0_8px_22px_rgba(197,160,89,0.25)] cursor-default select-none"
          >
            <span className="font-mono text-base sm:text-lg font-bold text-[#F9F6F0] leading-none tracking-tight transition-colors duration-300 group-hover:text-[#DFCA95]">
              {block.value}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#DFCA95]/90 mt-1 font-semibold transition-colors duration-300 group-hover:text-white">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
