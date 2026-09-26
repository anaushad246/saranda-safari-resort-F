import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Check, 
  X, 
  Info, 
  Flame, 
  Utensils, 
  Users, 
  MessageSquare,
  ShieldCheck,
  GraduationCap,
  Heart,
  Home,
  Bike
} from 'lucide-react';
import { Container, Button, Badge } from '../components/ui/Primitives';
import { tariffsAndPackages } from '../content/tariffsAndPackages';
import { FEATURES } from '../content/features';
import { resortInfo } from '../content/resortInfo';

export function PackagesPage({ onOpenBooking, onOpenEvent }) {
  // State for Reusable PackageDetailModal
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showSchoolModal, setShowSchoolModal] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleWhatsAppEnquiry = (pkgName, pricingInfo) => {
    const text = `*Package Enquiry: ${pkgName}*
--------------------------------------------
• Package: ${pkgName}
• Tariff/Rate: ${pricingInfo}
--------------------------------------------
Please provide availability, date confirmation and arrangement details.`;
    window.open(`https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const school = tariffsAndPackages.groupAndEducational.package;

  return (
    <div className="w-full bg-[#FDFBF7]">
      {/* 1. Hero — Compact, Editorial & Premium */}
      <section className="relative bg-[#0E261C] text-[#F9F6F0] pt-10 sm:pt-14 pb-8 sm:pb-12 border-b border-[#C5A059]/30 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

        <Container className="relative z-10 max-w-4xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/35 text-[#E5C378] text-[11px] uppercase tracking-widest font-cinzel font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tariff Schedule & Experiences</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {tariffsAndPackages.heroSubtitle}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#DFCA95] font-light leading-relaxed max-w-2xl mx-auto">
            {tariffsAndPackages.heroDescription}
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 sm:gap-4 text-xs text-[#E5C378]/80 font-cinzel tracking-wider uppercase">
            <span>Stay</span>
            <span>•</span>
            <span>Unwind</span>
            <span>•</span>
            <span>Learn</span>
            <span>•</span>
            <span>Celebrate</span>
          </div>
        </Container>

        {/* Widescreen Hero Graphic */}
        <div className="mt-8 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-2xl aspect-[16/8] sm:aspect-[21/8] bg-black/40">
            <img
              src={tariffsAndPackages.heroImage}
              alt="Saranda Safari Resort Packages"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute bottom-3 left-4 sm:left-6 text-xs text-[#F9F6F0]/90 font-light flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
              <span>{tariffsAndPackages.heroTagline}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Quick-Jump Navigation Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#EADFC9] shadow-sm py-2.5">
        <Container className="max-w-5xl px-4 sm:px-6 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => scrollToSection('overnight')}
            className="px-4 py-1.5 rounded-full text-xs font-cinzel font-semibold text-[#143628] hover:bg-[#F4ECE1] border border-transparent hover:border-[#C5A059]/40 transition-all shrink-0"
          >
            Overnight Stays
          </button>
          <span className="text-[#C5A059]/60">•</span>
          <button
            onClick={() => scrollToSection('day-evening')}
            className="px-4 py-1.5 rounded-full text-xs font-cinzel font-semibold text-[#143628] hover:bg-[#F4ECE1] border border-transparent hover:border-[#C5A059]/40 transition-all shrink-0"
          >
            Day & Evening
          </button>
          {FEATURES.schoolExcursions && (
          <>
          <span className="text-[#C5A059]/60">•</span>
          <button
            onClick={() => scrollToSection('groups-events')}
            className="px-4 py-1.5 rounded-full text-xs font-cinzel font-semibold text-[#143628] hover:bg-[#F4ECE1] border border-transparent hover:border-[#C5A059]/40 transition-all shrink-0"
          >
            Groups & Events
          </button>
          </>
          )}
        </Container>
      </div>

      {/* 3. OVERNIGHT STAYS (Standard Stays + Special Stays) */}
      <section id="overnight" className="py-10 sm:py-14 scroll-mt-28">
        <Container className="max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#8F6C27] font-bold block mb-1">
              Section 1
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#143628] tracking-tight">
              {tariffsAndPackages.overnight.title}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#143628]/75">
              {tariffsAndPackages.overnight.subtitle}
            </p>
          </div>

          {/* 3A. Standard Stays (The 2 Hero Cards) */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-cinzel uppercase tracking-widest text-[#8F6C27] font-bold">
                Standard Stays
              </span>
              <div className="flex-1 h-[1px] bg-[#EADFC9]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {tariffsAndPackages.overnight.standardStays.map((pkg) => (
                <article
                  key={pkg.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#EADFC9]/90 shadow-[0_2px_14px_rgba(20,54,40,0.05)] hover:shadow-[0_12px_32px_rgba(20,54,40,0.1)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Photo & Timing Pill */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0E261C]/5">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                      
                      <div className="absolute top-3.5 left-3.5 bg-[#0E261C]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C5A059]/40 text-xs text-[#E5C378] font-cinzel font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{pkg.timings}</span>
                      </div>

                      <div className="absolute bottom-3.5 right-3.5 bg-[#C85A32] text-white px-3 py-1 rounded-md text-xs font-semibold shadow">
                        {pkg.pricingSummary}
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 sm:p-7">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#143628] tracking-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8F6C27] font-serif italic mt-0.5 mb-4">
                        {pkg.tagline}
                      </p>

                      {/* Inclusions Highlight */}
                      <div className="p-3 rounded-lg bg-[#F4ECE1]/60 border border-[#EADFC9] mb-4 text-xs text-[#143628]">
                        <div className="flex items-center gap-1.5 font-bold text-[#143628] mb-1">
                          <Utensils className="w-3.5 h-3.5 text-[#8F6C27]" />
                          <span>Meal Inclusion:</span>
                        </div>
                        <p className="text-xs text-[#143628]/85">
                          {pkg.inclusions[0]}
                        </p>
                      </div>

                      {/* Compact Tariff Slabs */}
                      <div className="border border-[#EADFC9] rounded-xl p-4 bg-[#FDFBF7] space-y-2 mb-4">
                        <span className="text-[11px] font-cinzel font-bold text-[#8F6C27] uppercase tracking-wider block border-b border-[#EADFC9] pb-1.5 mb-2">
                          Official Tariff Schedule
                        </span>
                        {pkg.tariffs.map((t, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-[#EADFC9]/50 last:border-b-0">
                            <div>
                              <span className="font-bold text-[#143628]">{t.guests || t.label}</span>
                              {t.note && <span className="block text-[11px] text-[#143628]/60">{t.note}</span>}
                            </div>
                            <span className="font-serif font-bold text-sm text-[#C85A32]">
                              ₹{t.rate.toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      {pkg.notes && (
                        <p className="text-[11px] text-[#143628]/70 italic mb-2">
                          • {pkg.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Button
                      variant="terracotta"
                      size="md"
                      onClick={onOpenBooking}
                      icon={Calendar}
                      className="w-full text-xs py-2.5 font-semibold"
                    >
                      Check Availability & Book
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 3B. Special Stays Subsection (Women's Nature Retreat & Extended Homestay) */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-cinzel uppercase tracking-widest text-[#8F6C27] font-bold">
                Special Stays
              </span>
              <div className="flex-1 h-[1px] bg-[#EADFC9]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Card 1: Women's Nature Retreat */}
              {(() => {
                const wPkg = tariffsAndPackages.overnight.specialStays[0];
                return (
                  <article className="bg-white rounded-2xl overflow-hidden border border-[#EADFC9]/90 shadow-[0_2px_14px_rgba(20,54,40,0.05)] hover:shadow-[0_12px_32px_rgba(20,54,40,0.1)] transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#0E261C]/5">
                        <img
                          src={wPkg.image}
                          alt={wPkg.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />
                        
                        <div className="absolute top-3.5 left-3.5 bg-[#0E261C]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C5A059]/40 text-xs text-[#E5C378] font-cinzel font-semibold flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5 text-[#E5C378]" />
                          <span>Solo Women Travelers Welcome</span>
                        </div>

                        <div className="absolute bottom-3.5 right-3.5 bg-[#C85A32] text-white px-3 py-1 rounded-md text-xs font-semibold shadow">
                          {wPkg.pricingSummary}
                        </div>
                      </div>

                      <div className="p-6 sm:p-7">
                        <div className="text-[10px] font-cinzel font-bold text-[#8F6C27] uppercase tracking-wider mb-1">
                          {wPkg.badge}
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#143628] tracking-tight">
                          {wPkg.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#8F6C27] font-serif italic mt-0.5 mb-3">
                          {wPkg.tagline}
                        </p>

                        <p className="text-xs text-[#143628]/80 leading-relaxed mb-4">
                          {wPkg.description}
                        </p>

                        {/* Weekday Offer Banner */}
                        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 mb-4 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span className="font-semibold">{wPkg.weekdayOffer}</span>
                        </div>

                        {/* Sharing Tariff Table */}
                        <div className="border border-[#EADFC9] rounded-xl p-3.5 bg-[#FDFBF7] space-y-1.5 mb-4">
                          <span className="text-[11px] font-cinzel font-bold text-[#8F6C27] uppercase tracking-wider block border-b border-[#EADFC9] pb-1">
                            Sharing Tariff Breakdown
                          </span>
                          {wPkg.tariffs.map((t, i) => (
                            <div key={i} className="flex justify-between items-center text-xs py-0.5">
                              <span className="font-semibold text-[#143628]">{t.label}</span>
                              <span className="font-serif font-bold text-[#C85A32]">₹{t.rate.toLocaleString('en-IN')} / night</span>
                            </div>
                          ))}
                        </div>

                        <p className="text-[11px] text-[#143628]/70 italic">
                          • {wPkg.notes}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Button
                        variant="terracotta"
                        size="md"
                        onClick={() => handleWhatsAppEnquiry(wPkg.name, wPkg.pricingSummary)}
                        icon={MessageSquare}
                        className="w-full text-xs py-2.5 font-semibold"
                      >
                        Enquire for Women’s Retreat
                      </Button>
                    </div>
                  </article>
                );
              })()}

              {/* Card 2: Extended Homestay for Two */}
              {(() => {
                const hPkg = tariffsAndPackages.overnight.specialStays[1];
                return (
                  <article className="bg-white rounded-2xl overflow-hidden border border-[#EADFC9]/90 shadow-[0_2px_14px_rgba(20,54,40,0.05)] hover:shadow-[0_12px_32px_rgba(20,54,40,0.1)] transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#0E261C]/5">
                        <img
                          src={hPkg.image}
                          alt={hPkg.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />
                        
                        <div className="absolute top-3.5 left-3.5 bg-[#0E261C]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C5A059]/40 text-xs text-[#E5C378] font-cinzel font-semibold flex items-center gap-1.5">
                          <Home className="w-3.5 h-3.5 text-[#E5C378]" />
                          <span>Stay Longer • Feel at Home</span>
                        </div>

                        <div className="absolute bottom-3.5 right-3.5 bg-[#C85A32] text-white px-3 py-1 rounded-md text-xs font-semibold shadow">
                          {hPkg.pricingSummary}
                        </div>
                      </div>

                      <div className="p-6 sm:p-7">
                        <div className="text-[10px] font-cinzel font-bold text-[#8F6C27] uppercase tracking-wider mb-1">
                          {hPkg.badge}
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#143628] tracking-tight">
                          {hPkg.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#8F6C27] font-serif italic mt-0.5 mb-3">
                          {hPkg.tagline}
                        </p>

                        <p className="text-xs text-[#143628]/80 leading-relaxed mb-4">
                          {hPkg.description}
                        </p>

                        {/* Extended Stay Tariffs */}
                        <div className="border border-[#EADFC9] rounded-xl p-3.5 bg-[#FDFBF7] space-y-1.5 mb-4">
                          <span className="text-[11px] font-cinzel font-bold text-[#8F6C27] uppercase tracking-wider block border-b border-[#EADFC9] pb-1">
                            Introductory Stay Tariffs (For 2 Guests)
                          </span>
                          {hPkg.tariffs.map((t, i) => (
                            <div key={i} className="flex justify-between items-center text-xs py-0.5">
                              <div>
                                <span className="font-bold text-[#143628]">{t.duration}:</span>
                                <span className="text-[11px] text-[#143628]/60 ml-1.5">({t.perNight})</span>
                              </div>
                              <span className="font-serif font-bold text-[#C85A32]">₹{t.rate.toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>

                        {/* Scooty Rental Addon Callout */}
                        <div className="p-2.5 rounded-lg bg-[#F4ECE1]/80 border border-[#EADFC9] text-xs text-[#143628] mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Bike className="w-4 h-4 text-[#8F6C27]" />
                            <span className="font-semibold">Optional Scooty Rental:</span>
                          </div>
                          <span className="text-[#C85A32] font-bold">₹400/day • ₹2,450/week</span>
                        </div>

                        <p className="text-[11px] text-[#143628]/70 italic">
                          • Self-cooking kitchen + basic utensils included. {hPkg.notes}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Button
                        variant="terracotta"
                        size="md"
                        onClick={() => handleWhatsAppEnquiry(hPkg.name, hPkg.pricingSummary)}
                        icon={MessageSquare}
                        className="w-full text-xs py-2.5 font-semibold"
                      >
                        Enquire for Extended Homestay
                      </Button>
                    </div>
                  </article>
                );
              })()}
            </div>
          </div>
        </Container>
      </section>

      {/* 4. DAY & EVENING VISITS (3 Compact Editorial Cards) */}
      <section id="day-evening" className="py-10 sm:py-14 bg-[#F4ECE1]/40 border-t border-[#EADFC9]/80 scroll-mt-28">
        <Container className="max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#8F6C27] font-bold block mb-1">
              Section 2
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#143628] tracking-tight">
              {tariffsAndPackages.dayAndEvening.title}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#143628]/75">
              {tariffsAndPackages.dayAndEvening.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {tariffsAndPackages.dayAndEvening.packages.map((pkg) => (
              <article
                key={pkg.id}
                className="bg-white rounded-xl overflow-hidden border border-[#EADFC9]/90 shadow-[0_2px_12px_rgba(20,54,40,0.04)] hover:shadow-[0_10px_26px_rgba(20,54,40,0.08)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0E261C]/5">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    <div className="absolute top-2.5 left-2.5 bg-[#0E261C]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#C5A059]/40 text-[10px] text-[#E5C378] font-cinzel font-semibold">
                      {pkg.timings}
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 bg-black/65 backdrop-blur-sm px-2.5 py-0.5 rounded text-[11px] text-[#F9F6F0] font-semibold">
                      {pkg.pricingSummary}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="text-[10px] font-cinzel font-bold text-[#8F6C27] uppercase tracking-wider mb-1">
                      {pkg.badge}
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#143628] tracking-tight group-hover:text-[#B38F46] transition-colors leading-snug">
                      {pkg.name}
                    </h3>

                    <p className="text-xs text-[#8F6C27] font-serif italic mt-0.5 mb-2">
                      {pkg.tagline}
                    </p>

                    <p className="text-xs text-[#143628]/80 leading-relaxed line-clamp-3">
                      {pkg.description}
                    </p>

                    {pkg.dinnerPricing && (
                      <div className="mt-3 p-2 rounded-lg bg-[#F4ECE1]/80 border border-[#EADFC9] flex items-center justify-between text-[11px]">
                        <span className="font-cinzel font-bold text-[#8F6C27]">Optional Dinner:</span>
                        <span className="text-[#143628] font-medium">
                          Veg <strong>₹{pkg.dinnerPricing.veg}</strong>
                          {FEATURES.nonVegSupplements && <> • Non-Veg <strong>₹{pkg.dinnerPricing.nonVeg}</strong></>}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-5 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPackage(pkg)}
                    icon={ArrowRight}
                    className="w-full text-xs py-2 !border-[#C5A059] !text-[#143628] hover:!bg-[#143628] hover:!text-[#DFCA95] font-semibold"
                  >
                    View Package Details
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. GROUPS & EDUCATIONAL EXPERIENCES — hidden for now, see FEATURES.schoolExcursions */}
      {FEATURES.schoolExcursions && (
      <section id="groups-events" className="py-10 sm:py-14 scroll-mt-28">
        <Container className="max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#8F6C27] font-bold block mb-1">
              Section 3
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#143628] tracking-tight">
              {tariffsAndPackages.groupAndEducational.title}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#143628]/75">
              {tariffsAndPackages.groupAndEducational.subtitle}
            </p>
          </div>

          {/* School Excursions Feature Card */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#EADFC9]/90 shadow-lg grid grid-cols-1 lg:grid-cols-12 mb-14">
            <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#0E261C]/5">
              <img
                src={school.image}
                alt={school.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-3.5 left-3.5 bg-[#0E261C]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C5A059]/40 text-xs text-[#E5C378] font-cinzel font-semibold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#E5C378]" />
                <span>{school.badge}</span>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-cinzel font-bold text-[#8F6C27] uppercase tracking-wider block mb-1">
                  Full-Day Learning Outing (9:30 AM – 4:00 PM)
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#143628] tracking-tight">
                  {school.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#8F6C27] font-serif italic mt-0.5 mb-3">
                  {school.tagline}
                </p>

                <p className="text-xs sm:text-sm text-[#143628]/85 leading-relaxed mb-5">
                  {school.description}
                </p>

                {/* Slabs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                  {school.schoolSlabs.map((sl, i) => (
                    <div key={i} className="bg-[#FDFBF7] p-3 rounded-xl border border-[#EADFC9] text-center">
                      <span className="text-[11px] font-bold text-[#143628] block">{sl.name}</span>
                      <span className="text-[10px] text-[#8F6C27] block mb-1">({sl.classes})</span>
                      <span className="font-serif font-bold text-base text-[#C85A32]">₹{sl.rate}</span>
                      <span className="text-[10px] text-[#143628]/60 block">per student</span>
                    </div>
                  ))}
                </div>

                {/* Inclusions summary */}
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 mb-5 space-y-1">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>All-Inclusive Package:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-emerald-900/90">
                    Welcome Drink + Morning Snack + Lunch + Evening Snack + Guided Nature Trail + Wildlife Talks + Sports & Games + Certificates.
                  </p>
                  <p className="text-[10px] text-emerald-800 italic pt-0.5">
                    • 1 Teacher complimentary per 10 students • Principal complimentary • Min 20 students.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Button
                  variant="terracotta"
                  size="md"
                  onClick={() => handleWhatsAppEnquiry(school.name, school.pricingSummary)}
                  icon={MessageSquare}
                  className="w-full sm:w-auto text-xs py-2.5 px-6 font-semibold"
                >
                  Book School Excursion
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setShowSchoolModal(true)}
                  icon={Clock}
                  className="w-full sm:w-auto text-xs py-2.5 px-5 !border-[#C5A059] !text-[#143628] hover:!bg-[#F4ECE1] font-semibold"
                >
                  View Suggested Itinerary
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      )}

      {/* 6. CELEBRATIONS & EVENTS (EVENT_QUOTE Mode) */}
      <section className="py-12 sm:py-16 bg-[#0E261C] text-[#F9F6F0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

        <Container className="relative z-10 max-w-5xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#E5C378] font-bold block mb-1">
              Private Gatherings & Milestones
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {tariffsAndPackages.celebrations.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#DFCA95] font-light leading-relaxed">
              {tariffsAndPackages.celebrations.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {tariffsAndPackages.celebrations.events.map((evt) => {
              const isWedding = evt.id === 'weddings-parties';

              return (
                <div 
                  key={evt.id}
                  className="bg-white/5 backdrop-blur-sm border border-[#C5A059]/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#C5A059]/70 shadow-xl"
                >
                  <div>
                    {/* Visual Header Image if available */}
                    {evt.image && (
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        <img 
                          src={evt.image} 
                          alt={evt.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E261C] via-[#0E261C]/50 to-transparent" />
                        
                        <div className="absolute top-3 left-3 bg-[#0E261C]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#C5A059]/50 text-[10px] text-[#E5C378] font-cinzel font-semibold">
                          {evt.pricingSummary}
                        </div>

                        {evt.advanceNotice && (
                          <div className="absolute bottom-3 left-3 right-3 bg-[#143628]/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#C5A059]/40 text-center">
                            <span className="text-[11px] text-[#E5C378] font-semibold tracking-wide">
                              ⚠️ {evt.advanceNotice}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-5 sm:p-6 space-y-4">
                      <div>
                        {!evt.image && (
                          <div className="inline-block px-2.5 py-0.5 rounded bg-[#C5A059]/20 border border-[#C5A059]/40 text-[10px] text-[#E5C378] uppercase tracking-wider font-cinzel font-semibold mb-2">
                            {evt.pricingSummary}
                          </div>
                        )}
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {evt.name}
                        </h3>
                        {evt.subtitle && (
                          <p className="text-xs text-[#E5C378] font-cinzel tracking-wider uppercase mt-0.5 font-semibold">
                            {evt.subtitle}
                          </p>
                        )}
                        <p className="text-xs text-[#DFCA95] italic font-serif mt-1">
                          {evt.tagline}
                        </p>
                      </div>

                      <p className="text-xs text-[#F9F6F0]/80 leading-relaxed">
                        {evt.description}
                      </p>

                      {/* 4 Feature Pills / Highlights */}
                      {evt.features && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {evt.features.map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-[11px] text-[#F9F6F0]/90 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
                              <Check className="w-3.5 h-3.5 text-[#E5C378] shrink-0" />
                              <span className="leading-tight">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Accommodation Tariff Slabs for Wedding (₹24k, ₹35k, ₹52k) */}
                      {evt.accommodationPackages && (
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-1">
                            <span className="text-[11px] font-cinzel font-bold text-[#E5C378] uppercase tracking-wider">
                              Destination Wedding Accommodation Packages
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {evt.accommodationPackages.map((pkg, idx) => (
                              <div key={idx} className="bg-black/35 border border-[#C5A059]/50 rounded-xl p-3 text-center">
                                <span className="text-[11px] font-medium text-[#F9F6F0]/85 block">
                                  {pkg.slab}
                                </span>
                                <span className="font-serif font-bold text-lg text-[#E5C378] block my-0.5">
                                  {pkg.rate}
                                </span>
                                <span className="text-[10px] text-[#DFCA95]/70 block">
                                  {pkg.per}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Pricing Footnotes */}
                          {evt.pricingNotes && (
                            <div className="bg-black/20 rounded-lg p-2.5 border border-white/10 space-y-1 text-[10px] text-[#DFCA95]/85 italic">
                              {evt.pricingNotes.map((note, nIdx) => (
                                <p key={nIdx} className="leading-relaxed">• {note}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Indicative Ranges for Festival/Puja */}
                      {evt.indicativeRanges && (
                        <div className="space-y-1.5 text-xs text-[#F9F6F0]/85 bg-black/25 p-3 rounded-lg border border-white/10">
                          <span className="text-[11px] font-bold text-[#E5C378] block mb-1 font-cinzel">Indicative Venue Pricing:</span>
                          {evt.indicativeRanges.map((r, i) => (
                            <div key={i} className="flex justify-between py-0.5 text-[11px]">
                              <span>{r.group}</span>
                              <span className="font-bold text-[#DFCA95]">{r.range}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Extra Details */}
                      {evt.extraDetails && (
                        <div className="space-y-1 text-[11px] text-[#F9F6F0]/75">
                          {evt.extraDetails.map((d, i) => (
                            <p key={i}>• {d}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA & Helpline */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-white/10 mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-[11px] text-[#DFCA95]">
                      <span>Bookings & Queries: </span>
                      <a href="tel:+917008307064" className="text-white font-bold hover:underline">
                        7008307064
                      </a>
                    </div>

                    <Button
                      variant={isWedding ? "terracotta" : "outline"}
                      size="sm"
                      onClick={onOpenEvent}
                      icon={Sparkles}
                      className="text-xs py-2 px-4 font-semibold cursor-pointer"
                    >
                      {isWedding ? "Request Wedding Quote" : "Request Venue Quote"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-amber-900/30 border border-amber-500/40 text-center max-w-2xl mx-auto mb-8 text-xs text-amber-200">
            <span className="font-bold block text-white mb-0.5">Capacity & Advance Notice:</span>
            <span>{tariffsAndPackages.celebrations.notice}</span>
          </div>

          <div className="text-center">
            <Button
              variant="terracotta"
              size="lg"
              onClick={onOpenEvent}
              icon={Sparkles}
              className="text-xs py-3 px-8 font-semibold"
            >
              Request Event Quotation
            </Button>
          </div>
        </Container>
      </section>

      {/* 7. Dining Policy & Transparent Tariff Notes Strip */}
      <div className="bg-[#F4ECE1] border-t border-[#EADFC9] py-6 px-4">
        <Container className="max-w-4xl text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#143628]">
            <Utensils className="w-4 h-4 text-[#8F6C27]" />
            <span>{tariffsAndPackages.diningPolicy.notice}</span>
          </div>
          <p className="text-xs text-[#143628]/75 leading-relaxed max-w-2xl mx-auto">
            {tariffsAndPackages.diningPolicy.subtext}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#8F6C27] font-cinzel">
            <span>50% Advance For Overnight Stays</span>
            <span>•</span>
            <span>Taxes Applicable</span>
            <span>•</span>
            <span>Rural Wilderness Sanctuary</span>
          </div>
        </Container>
      </div>

      {/* 8. Reusable PackageDetailModal (For Day & Evening packages) */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E261C]/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#EADFC9] w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-[#0E261C] text-[#F9F6F0] p-5 flex items-center justify-between border-b border-[#C5A059]/30">
              <div>
                <span className="text-[10px] font-cinzel text-[#E5C378] tracking-widest uppercase block mb-0.5">
                  {selectedPackage.badge}
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  {selectedPackage.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPackage(null)}
                className="text-[#DFCA95] hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-[#143628]">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#F4ECE1] border border-[#EADFC9]">
                <div>
                  <span className="text-[11px] text-[#8F6C27] block font-cinzel font-semibold">Timings:</span>
                  <span className="font-bold text-[#143628]">{selectedPackage.timings}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#8F6C27] block font-cinzel font-semibold">Tariff:</span>
                  <span className="font-serif font-bold text-base text-[#C85A32]">{selectedPackage.pricingSummary}</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-[#143628]/85">
                {selectedPackage.description}
              </p>

              {selectedPackage.tariffs && (
                <div className="border border-[#EADFC9] rounded-xl p-3.5 bg-white space-y-2">
                  <span className="text-[11px] font-cinzel font-bold text-[#8F6C27] uppercase tracking-wider block border-b border-[#EADFC9] pb-1">
                    Tariff Breakdown
                  </span>
                  {selectedPackage.tariffs.map((t, i) => (
                    <div key={i} className="flex justify-between py-1 border-b border-[#EADFC9]/40 last:border-b-0">
                      <div>
                        <span className="font-bold text-[#143628]">{t.slab || t.name || t.category}</span>
                        {t.includes && <span className="block text-[10px] text-[#143628]/70">{t.includes}</span>}
                      </div>
                      <span className="font-serif font-bold text-sm text-[#C85A32] shrink-0 ml-2">
                        {t.label || `₹${t.rate}`}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {(selectedPackage.extras || selectedPackage.optionalAddons) && (
                <div className="bg-[#F9F6F0] p-3.5 rounded-xl border border-[#EADFC9] space-y-1.5">
                  <span className="font-bold text-[11px] text-[#8F6C27] block font-cinzel uppercase tracking-wider">
                    Additional Options & Extras:
                  </span>
                  {(selectedPackage.extras || selectedPackage.optionalAddons).map((ex, i) => (
                    <div key={i} className="flex justify-between items-center text-xs py-1 border-b border-[#EADFC9]/40 last:border-b-0">
                      <span className="text-[#143628] font-medium">{ex.item}:</span>
                      <span className="font-bold font-serif text-[#C85A32]">
                        ₹{ex.rate} <span className="text-[10px] font-sans text-[#143628]/70 font-normal">({ex.unit})</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {selectedPackage.inclusions && (
                <div>
                  <span className="font-bold text-[11px] text-[#143628] block mb-1 font-cinzel">Package Inclusions:</span>
                  <div className="space-y-1">
                    {selectedPackage.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#143628]/85">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedPackage.exclusions && (
                <div>
                  <span className="font-bold text-[11px] text-[#8F6C27] block mb-1 font-cinzel">Exclusions:</span>
                  <div className="space-y-1">
                    {selectedPackage.exclusions.map((exc, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#143628]/70">
                        <X className="w-3.5 h-3.5 text-red-700 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedPackage.notes && (
                <p className="text-[10px] text-[#8F6C27] italic bg-[#FFF8E7] p-2.5 rounded border border-[#EAD7A1]">
                  Note: {selectedPackage.notes}
                </p>
              )}
            </div>

            <div className="p-4 bg-[#F4ECE1] border-t border-[#EADFC9] flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPackage(null)}
                className="text-xs"
              >
                Close
              </Button>
              <Button
                variant="terracotta"
                size="sm"
                onClick={() => {
                  handleWhatsAppEnquiry(selectedPackage.name, selectedPackage.pricingSummary);
                  setSelectedPackage(null);
                }}
                icon={MessageSquare}
                className="text-xs font-semibold"
              >
                Enquire for This Package
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 9. School Excursions Suggested Itinerary Modal */}
      {showSchoolModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E261C]/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#EADFC9] w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-[#0E261C] text-[#F9F6F0] p-5 flex items-center justify-between border-b border-[#C5A059]/30">
              <div>
                <span className="text-[10px] font-cinzel text-[#E5C378] tracking-widest uppercase block mb-0.5">
                  Suggested Itinerary
                </span>
                <h3 className="font-serif text-xl font-bold text-white">
                  School Nature Day (9:30 AM – 4:00 PM)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSchoolModal(false)}
                className="text-[#DFCA95] hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-3 text-xs text-[#143628]">
              <p className="text-xs text-[#143628]/80 italic">
                “A structured, safe, and engaging schedule balancing nature discovery, team games, and dining.”
              </p>

              <div className="border border-[#EADFC9] rounded-xl overflow-hidden divide-y divide-[#EADFC9] bg-white">
                {school.itinerary.map((item, idx) => (
                  <div key={idx} className="p-2.5 flex items-center gap-3">
                    <span className="font-cinzel font-bold text-[11px] text-[#8F6C27] shrink-0 w-28">
                      {item.time}
                    </span>
                    <span className="text-xs text-[#143628] font-medium">
                      {item.activity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-950 space-y-1">
                <span className="font-bold block">Safety & Arrangements Notice:</span>
                <p>1 Teacher complimentary per 10 students. Clean drinking water, first aid, and safe perimeter supervision provided.</p>
              </div>
            </div>

            <div className="p-4 bg-[#F4ECE1] border-t border-[#EADFC9] flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSchoolModal(false)}
                className="text-xs"
              >
                Close
              </Button>
              <Button
                variant="terracotta"
                size="sm"
                onClick={() => {
                  setShowSchoolModal(false);
                  handleWhatsAppEnquiry(school.name, school.pricingSummary);
                }}
                icon={MessageSquare}
                className="text-xs font-semibold"
              >
                Book This Excursion
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
