import React from 'react';
import { 
  Calendar, 
  Sparkles,
  Users,
  MapPin
} from 'lucide-react';
import { Container, Button } from '../components/ui/Primitives';
import { stayContent } from '../content/stayInventory';

export function StayPage({ onOpenBooking }) {
  return (
    <div className="w-full bg-[#FDFBF7]">
      {/* 1. Hero — Clean, Editorial & Atmospheric */}
      <section className="relative bg-[#0E261C] text-[#F9F6F0] pt-10 sm:pt-14 pb-8 sm:pb-12 border-b border-[#C5A059]/30 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

        <Container className="relative z-10 max-w-4xl px-4 sm:px-6 text-center">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {stayContent.heroTitle}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#DFCA95] font-light leading-relaxed max-w-3xl mx-auto">
            {stayContent.heroDescription}
          </p>
        </Container>

        {/* Large Scenic Accommodation Image Frame */}
        <div className="mt-8 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-2xl aspect-[16/8] sm:aspect-[21/8] bg-black/40">
            <img
              src={stayContent.heroImage}
              alt="Accommodations at Saranda Safari Resort"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute bottom-3 left-4 sm:left-6 text-xs text-[#F9F6F0]/90 font-light flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
              <span>Quiet stays along the Karo River & forest canopy</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Signature Stays — Main Section */}
      <section className="py-10 sm:py-14">
        <Container className="max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#8F6C27] font-bold block mb-1">
              Boutique Collection
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#143628] tracking-tight">
              Signature Stays
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#143628]/75">
              Each distinct retreat features its own unique character, verandas, and forest settings.
            </p>
          </div>

          {/* Top Feature Duo: Riverwood & Cherry Blossom (Large Feature Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
            {stayContent.featuredCottages.map((cottage) => (
              <article
                key={cottage.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#EADFC9]/90 shadow-[0_2px_14px_rgba(20,54,40,0.05)] hover:shadow-[0_12px_32px_rgba(20,54,40,0.1)] transition-all duration-300 flex flex-col group"
              >
                {/* Visual Photograph Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0E261C]/5">
                  <img
                    src={cottage.image}
                    alt={cottage.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Badge: Units & Capacity */}
                  <div className="absolute top-3.5 left-3.5 bg-[#0E261C]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C5A059]/40 shadow-sm flex items-center gap-2 text-xs text-[#E5C378] font-cinzel font-semibold">
                    <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{cottage.capacity}</span>
                    <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                    <span className="text-[#F9F6F0]/85 text-[11px] font-normal">{cottage.cottageCount}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#143628] tracking-tight group-hover:text-[#B38F46] transition-colors">
                      {cottage.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#8F6C27] font-serif italic mt-1 mb-3">
                      {cottage.tagline || cottage.subtitle}
                    </p>

                    <p className="text-xs sm:text-[13px] text-[#143628]/80 leading-relaxed font-light mb-3">
                      {cottage.description}
                    </p>

                    {cottage.setting && (
                      <div className="flex items-start gap-2 text-[11px] text-[#8F6C27] bg-[#FDFBF7] p-2.5 rounded-lg border border-[#EADFC9]">
                        <MapPin className="w-3.5 h-3.5 text-[#8F6C27] shrink-0 mt-0.5" />
                        <span className="leading-snug">{cottage.setting}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EADFC9]/60 flex items-center justify-between">
                    <span className="text-xs text-[#143628]/60 font-cinzel font-medium">
                      Riverside Vantage
                    </span>
                    <Button
                      variant="terracotta"
                      size="sm"
                      onClick={onOpenBooking}
                      icon={Calendar}
                      className="text-xs py-2 px-4 font-semibold cursor-pointer"
                    >
                      Check Availability
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Remaining Four: Editorial 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {stayContent.otherCottages.map((cottage) => (
              <article
                key={cottage.id}
                className="bg-white rounded-xl overflow-hidden border border-[#EADFC9]/85 shadow-[0_2px_12px_rgba(20,54,40,0.04)] hover:shadow-[0_10px_26px_rgba(20,54,40,0.08)] transition-all duration-300 flex flex-col group"
              >
                {/* Visual Photograph Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0E261C]/5">
                  <img
                    src={cottage.image}
                    alt={cottage.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Badge: Units & Capacity */}
                  <div className="absolute top-3 left-3 bg-[#0E261C]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#C5A059]/40 shadow-sm flex items-center gap-1.5 text-[11px] text-[#E5C378] font-cinzel font-semibold">
                    <Users className="w-3 h-3 text-[#C5A059]" />
                    <span>{cottage.capacity}</span>
                    <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                    <span className="text-[#F9F6F0]/85 text-[10px] font-normal">{cottage.cottageCount}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#143628] tracking-tight group-hover:text-[#B38F46] transition-colors">
                      {cottage.name}
                    </h3>
                    <p className="text-xs text-[#8F6C27] font-serif italic mt-0.5 mb-2.5">
                      {cottage.tagline || cottage.subtitle}
                    </p>

                    <p className="text-xs sm:text-[13px] text-[#143628]/80 leading-relaxed font-light mb-3">
                      {cottage.description}
                    </p>

                    {cottage.setting && (
                      <div className="flex items-start gap-1.5 text-[11px] text-[#8F6C27] bg-[#FDFBF7] p-2 rounded-lg border border-[#EADFC9]">
                        <MapPin className="w-3 h-3 text-[#8F6C27] shrink-0 mt-0.5" />
                        <span className="leading-snug">{cottage.setting}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#EADFC9]/60 flex items-center justify-between">
                    <span className="text-[11px] text-[#143628]/60 font-cinzel">
                      Resort Grounds
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onOpenBooking}
                      icon={Calendar}
                      className="text-xs py-1.5 px-3.5 !border-[#C5A059] !text-[#143628] hover:!bg-[#143628] hover:!text-[#DFCA95] cursor-pointer"
                    >
                      Check Availability
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Camping — Separate Standalone Experience */}
      <section className="py-10 sm:py-14 bg-[#F4ECE1]/50 border-t border-[#EADFC9]/80">
        <Container className="max-w-5xl px-4 sm:px-6">
          <div className="bg-white rounded-2xl overflow-hidden border border-[#EADFC9] shadow-lg grid grid-cols-1 md:grid-cols-12">
            {/* Image on Left/Top */}
            <div className="md:col-span-6 relative aspect-[16/10] md:aspect-auto overflow-hidden bg-[#0E261C]/5">
              <img
                src={stayContent.campingExperience.image}
                alt={stayContent.campingExperience.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />
              <div className="absolute top-3 left-3 bg-[#0E261C]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#C5A059]/40 text-xs text-[#E5C378] font-cinzel font-semibold">
                {stayContent.campingExperience.capacity}
              </div>
            </div>

            {/* Content on Right */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-cinzel uppercase tracking-widest text-[#8F6C27] font-bold block mb-1">
                  Wilderness Night
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#143628]">
                  {stayContent.campingExperience.title}
                </h3>
                <p className="text-xs text-[#8F6C27] font-serif italic mt-0.5 mb-3">
                  {stayContent.campingExperience.subtitle}
                </p>
                <p className="text-xs text-[#143628]/80 leading-relaxed font-light mb-4">
                  {stayContent.campingExperience.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EADFC9] flex items-center justify-between">
                <span className="text-xs text-[#143628]/70 font-cinzel">
                  Tent Pitches
                </span>
                <Button
                  variant="terracotta"
                  size="sm"
                  onClick={onOpenBooking}
                  icon={Calendar}
                  className="text-xs py-2 px-4 font-semibold cursor-pointer"
                >
                  Book Camping
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
