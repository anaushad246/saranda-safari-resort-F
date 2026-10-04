import { IMAGES } from '../content/images';
import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Calendar,
  MessageSquare,
  Clock,
  Search,
} from 'lucide-react';
import { Button } from './ui/Primitives';
import { resortInfo } from '../content/resortInfo';

export function Navbar({ 
  currentPage, 
  onNavigate, 
  onOpenBooking,
  onOpenTrackBooking,
  activeHold,
  onActiveHoldClick,
  isValidatingHold
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [remainingText, setRemainingText] = useState('');

  useEffect(() => {
    if (!activeHold?.expiresAt) {
      setRemainingText('');
      return;
    }

    const updateTimer = () => {
      const diff = new Date(activeHold.expiresAt).getTime() - Date.now();
      if (diff <= 0) {
        setRemainingText('expired');
      } else {
        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setRemainingText(hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 30000);
    return () => clearInterval(interval);
  }, [activeHold]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'the-place', label: 'The Place' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'stay', label: 'Stay' },
    { id: 'packages', label: 'Packages' },
    { id: 'sightseeing', label: 'Sightseeing' },
    { id: 'getting-here', label: 'Getting Here' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isHoldLive = activeHold && remainingText && remainingText !== 'expired';

  return (
    <header
      className={`
        sticky top-0 z-40 w-full
        border-b
        transition-all duration-300
        ${
          isScrolled
            ? 'bg-[#F9F6F0]/95 backdrop-blur-md shadow-xs border-[#E8DFCE]'
            : 'bg-[#F9F6F0] border-[#E8DFCE]/70'
        }
      `}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-4">

          {/* Brand */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="
              group flex shrink-0 items-center gap-2 sm:gap-3
              text-left cursor-pointer
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-[#C5A059]/60
              rounded-lg
            "
          >
            {/* Logo Image */}
            <div
              className="
                flex h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 shrink-0 items-center justify-center
                rounded-full
                border border-[#C5A059]/50
                bg-[#143628]
                overflow-hidden
                shadow-xs
                transition-transform duration-300
                group-hover:scale-105
              "
            >
              <img
                src={IMAGES.logo}
                alt="Saranda Safari Resort"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/logo.webp';
                }}
              />
            </div>

            {/* Brand Text: SARANDA is perfectly centered above SAFARI RESORT */}
            <div className="flex flex-col items-center justify-center text-center select-none min-w-0">
              <span
                className="
                  block
                  w-full
                  text-center
                  whitespace-nowrap
                  font-cinzel
                  font-bold
                  tracking-[0.14em]
                  text-[#143628]
                  leading-tight
                  uppercase
                  text-sm sm:text-base md:text-xl
                "
              >
                SARANDA
              </span>

              <span
                className="
                  block
                  w-full
                  text-center
                  whitespace-nowrap
                  font-cinzel
                  font-semibold
                  tracking-[0.18em] sm:tracking-[0.22em]
                  text-[#8F6C27]
                  leading-tight
                  mt-0.5
                  uppercase
                  text-[9px] sm:text-[10px] md:text-xs
                "
              >
                SAFARI RESORT
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.slice(1).map((link) => {
              const isActive = currentPage === link.id;

              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`
                    relative cursor-pointer
                    py-1.5
                    text-sm font-medium tracking-wide
                    transition-colors
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#C5A059]/60
                    rounded-sm
                    ${
                      isActive
                        ? 'font-semibold text-[#C25E3E]'
                        : 'text-[#143628] hover:text-[#C5A059]'
                    }
                  `}
                >
                  {link.label}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#C25E3E]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA & Hold Pill */}
          <div className="hidden sm:flex shrink-0 items-center gap-2.5 lg:ml-2">
            {/* Active Hold Compact Pill */}
            {isHoldLive && (
              <button
                type="button"
                onClick={onActiveHoldClick}
                disabled={isValidatingHold}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-[#C5A059] text-[#143628] hover:bg-amber-100 transition-all text-xs font-semibold shadow-xs cursor-pointer"
                title="Active 2-Hour Reservation Hold - Click to verify and view payment"
              >
                {isValidatingHold ? (
                  <span className="w-3 h-3 border-2 border-[#C25E3E] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-[#C25E3E] shrink-0" />
                )}
                <span>⏳ Payment pending · <strong className="font-mono">{activeHold.reference}</strong> · {remainingText}</span>
              </button>
            )}

            {/* Track Booking Button */}
            <button
              type="button"
              onClick={onOpenTrackBooking}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#143628] hover:text-[#C25E3E] px-2.5 py-1.5 rounded-md hover:bg-[#F4EFE6] transition-colors cursor-pointer"
              title="Look up your booking status by reference ID"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Booking</span>
            </button>

            <Button
              variant="terracotta"
              size="md"
              onClick={onOpenBooking}
              icon={Calendar}
            >
              Check Availability
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
            {isHoldLive ? (
              <button
                type="button"
                onClick={onActiveHoldClick}
                disabled={isValidatingHold}
                className="
                  inline-flex items-center gap-1
                  rounded-md
                  bg-amber-100 border border-[#C5A059]
                  px-2 py-1.5
                  text-[11px] font-semibold
                  text-[#143628]
                  cursor-pointer
                  shrink-0
                "
              >
                <Clock className="w-3 h-3 text-[#C25E3E]" />
                <span>{activeHold.reference}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenBooking}
                className="
                  rounded-md
                  bg-[#C25E3E]
                  px-2.5 py-1.5
                  text-[11px] font-semibold
                  tracking-wide text-white
                  transition-colors
                  hover:bg-[#A94F34]
                  cursor-pointer
                  shrink-0
                "
              >
                Book Stay
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                flex h-9 w-9 items-center justify-center
                rounded-md
                text-[#143628]
                transition-colors
                hover:bg-[#F4EFE6]
                hover:text-[#C5A059]
                focus:outline-none
                cursor-pointer
                shrink-0
              "
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Active Hold Alert Bar (when hold is active) */}
      {isHoldLive && (
        <div className="sm:hidden bg-[#143628] text-[#F9F6F0] px-3.5 py-1.5 border-t border-[#C5A059]/40 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 text-[#DFCA95]">
            <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Hold active: <strong className="font-mono text-white">{activeHold.reference}</strong> ({remainingText})</span>
          </span>
          <button
            type="button"
            onClick={onActiveHoldClick}
            disabled={isValidatingHold}
            className="text-white bg-[#C25E3E] px-2.5 py-0.5 rounded text-[10px] font-semibold cursor-pointer"
          >
            {isValidatingHold ? '...' : 'Pay 50%'}
          </button>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="
            lg:hidden
            border-t border-[#E8DFCE]
            bg-[#F9F6F0]
            shadow-md
            animate-fadeIn
            w-full
          "
        >
          <div className="mx-auto max-w-7xl px-4 py-2">
            <nav className="divide-y divide-[#E8DFCE]/60">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`
                    flex w-full items-center
                    py-2.5 sm:py-3
                    text-left
                    text-sm sm:text-base
                    font-serif
                    transition-colors
                    cursor-pointer
                    focus:outline-none
                    ${
                      currentPage === link.id
                        ? 'pl-2 font-semibold text-[#C25E3E] border-l-2 border-[#C25E3E]'
                        : 'text-[#143628] hover:text-[#C5A059]'
                    }
                  `}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex flex-col gap-2 border-t border-[#E8DFCE] pt-3 pb-4">
              {/* Track Booking in Mobile Drawer */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrackBooking();
                }}
                className="
                  flex w-full items-center justify-center gap-2
                  rounded-md
                  border border-[#143628]/30
                  px-4 py-2.5
                  text-xs sm:text-sm font-semibold
                  text-[#143628]
                  transition-colors
                  hover:bg-[#143628]/5
                  cursor-pointer
                "
              >
                <Search className="h-4 w-4 text-[#143628]" />
                Track My Reservation
              </button>

              <Button
                variant="terracotta"
                size="md"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                icon={Calendar}
              >
                Check Availability
              </Button>

              <a
                href={`https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent(
                  "Hello, I am enquiring about stays at Saranda Safari Resort."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex w-full items-center justify-center gap-2
                  rounded-md
                  border border-[#143628]
                  px-4 py-2.5
                  text-xs sm:text-sm font-medium
                  text-[#143628]
                  transition-colors
                  hover:bg-[#143628]/5
                "
              >
                <MessageSquare className="h-4 w-4 text-emerald-700" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
