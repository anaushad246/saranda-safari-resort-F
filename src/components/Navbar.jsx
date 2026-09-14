import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, MessageSquare, Compass, Shield } from 'lucide-react';
import { Button } from './ui/Primitives';
import { resortInfo } from '../content/resortInfo';

export function Navbar({ currentPage, onNavigate, onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-[#F9F6F0]/95 backdrop-blur-md shadow-sm border-[#E8DFCE]' 
          : 'bg-[#F9F6F0] border-[#E8DFCE]/60'
      }`}
    >
      {/* Pre-booking Announcement Bar */}
      <div className="bg-[#143628] text-[#F9F6F0] px-4 py-1.5 text-center text-xs font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
        <span>{resortInfo.preBookingNotice}</span>
        <span className="hidden sm:inline text-[#DFCA95]">• Village Nimture, Bolani, Keonjhar (Estd. 1998)</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Brand Logo & Tagline */}
          <button 
            type="button" 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            {/* Elephant Silhouette Emblem */}
            <div className="w-12 h-12 rounded-full bg-[#143628] flex items-center justify-center text-[#C5A059] border border-[#C5A059]/40 shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
              <svg 
                className="w-7 h-7 fill-current" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Stylized Elephant Profile matching classic 1998 forest heritage */}
                <path d="M19.5 8.2c-.3-.8-.8-1.5-1.5-2-.7-.5-1.6-.7-2.5-.7h-4.2c-1.8 0-3.5.9-4.5 2.3-.6.8-1 1.8-1.1 2.8-.4.3-.8.7-1.1 1.2-.5.8-.7 1.8-.6 2.8.1 1.2.7 2.2 1.6 2.9v4c0 .8.6 1.5 1.4 1.5.8 0 1.5-.7 1.5-1.5v-2h3.5v2c0 .8.7 1.5 1.5 1.5.8 0 1.5-.7 1.5-1.5v-2.5c1.4-.4 2.6-1.5 3-2.9.3-.9.3-1.9 0-2.8-.2-.7-.6-1.3-1.1-1.8.4-.7.6-1.6.5-2.5 0-.4-.1-.7-.2-1.1zm-8.2 1.8c.4 0 .8.4.8.8s-.4.8-.8.8-.8-.4-.8-.8.4-.8.8-.8zm5.7 3.5c-.3.8-1 1.5-1.8 1.8v-3.6c.9 0 1.6.7 1.8 1.8z" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-cinzel tracking-wider text-lg sm:text-xl font-bold text-[#143628] leading-tight">
                {resortInfo.name}
              </span>
              <span className="text-[11px] sm:text-xs text-[#8F6C27] font-medium tracking-widest uppercase">
                {resortInfo.tagline}
              </span>
              <span className="text-[10px] text-[#143628]/60 font-sans hidden sm:inline">
                Estd. 1998 • Bolani, Odisha
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.slice(1).map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`text-sm tracking-wide font-medium transition-colors cursor-pointer py-1 relative ${
                    isActive 
                      ? 'text-[#C25E3E] font-semibold' 
                      : 'text-[#143628] hover:text-[#C5A059]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C25E3E] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              variant="terracotta"
              size="md"
              onClick={onOpenBooking}
              icon={Calendar}
            >
              Check Availability
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onOpenBooking}
              className="text-xs bg-[#C25E3E] text-white px-3 py-2 rounded font-medium sm:hidden"
            >
              Check
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#143628] hover:text-[#C5A059] hover:bg-[#F4EFE6] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F4EFE6] border-b border-[#E8DFCE] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="flex flex-col divide-y divide-[#E8DFCE]/60">
            {navLinks.map(link => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-3 text-base font-serif transition-colors ${
                  currentPage === link.id 
                    ? 'text-[#C25E3E] font-semibold pl-2 border-l-2 border-[#C25E3E]' 
                    : 'text-[#143628] hover:text-[#C5A059]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-2">
            <Button
              variant="terracotta"
              size="lg"
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
              href={`https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent("Hello, I am enquiring about stays at Saranda Safari Resort.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded border border-[#143628] text-center text-sm font-medium text-[#143628] flex items-center justify-center gap-2 hover:bg-[#143628]/5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
