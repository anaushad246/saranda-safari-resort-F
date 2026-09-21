import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Car, 
  Navigation, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import { Container, Button, Badge } from '../components/ui/Primitives';
import { sightseeingContent } from '../content/sightseeing';

export function SightseeingPage({ onOpenSightseeing }) {
  const [activeMode, setActiveMode] = useState('both');

  return (
    <div className="w-full bg-[#FDFBF7]">
      {/* 1. Hero — Very Visual (Scenic & Editorial) */}
      <section className="relative bg-[#0E261C] text-[#F9F6F0] pt-10 sm:pt-14 pb-8 sm:pb-12 border-b border-[#C5A059]/30 overflow-hidden">
        {/* Subtle decorative pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

        <Container className="relative z-10 max-w-5xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/35 text-[#E5C378] text-[11px] uppercase tracking-widest font-cinzel font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{sightseeingContent.heroBadge}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {sightseeingContent.heroTitle}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#DFCA95] font-light leading-relaxed max-w-2xl mx-auto">
            {sightseeingContent.heroSubtitle}
          </p>
        </Container>

        {/* Large Scenic Generated Image Frame */}
        <div className="mt-8 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-2xl aspect-[16/8] sm:aspect-[21/8] bg-black/40">
            <img
              src={sightseeingContent.heroImage}
              alt="Scenic Forest Highway and Hills of Saranda"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
            <div className="absolute bottom-3 left-4 sm:left-6 text-xs text-[#F9F6F0]/90 font-light flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#E5C378]" />
              <span>Scenic hill routes & forest highways of Saranda, West Singhbhum</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Destinations — Main Section (3x2 Cards) */}
      <section className="py-8 sm:py-12">
        <Container className="max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-cinzel uppercase tracking-widest text-[#8F6C27] font-bold block mb-1">
              Regional Highlights
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#143628] tracking-tight">
              Six Verified Destinations
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#143628]/75">
              Short drives from the resort grounds, ranging from secluded forest cascades to hilltop sunsets.
            </p>
          </div>

          {/* 3x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {sightseeingContent.destinations.map((dest) => (
              <article 
                key={dest.id}
                className="bg-white rounded-xl overflow-hidden border border-[#EADFC9]/90 shadow-[0_2px_12px_rgba(20,54,40,0.04)] hover:shadow-[0_10px_26px_rgba(20,54,40,0.09)] transition-all duration-300 flex flex-col group"
              >
                {/* Visual Photograph Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0E261C]/5">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Distance Pill Top Right */}
                  <div className="absolute top-3 right-3 bg-[#0E261C]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#C5A059]/40 shadow-sm flex items-center gap-1.5 text-[11px] text-[#E5C378] font-cinzel font-semibold">
                    <Navigation className="w-3 h-3 text-[#C5A059]" />
                    <span>{dest.distance}</span>
                  </div>

                  {/* Category Pill Top Left */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] uppercase tracking-wider text-[#F9F6F0] font-medium font-cinzel">
                    {dest.category}
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#143628] tracking-tight group-hover:text-[#B38F46] transition-colors leading-snug">
                      {dest.name}
                    </h3>

                    {/* 1-Line Clean Description */}
                    <p className="mt-2 text-xs sm:text-[13px] text-[#143628]/80 leading-relaxed font-light">
                      {dest.description}
                    </p>
                  </div>

                  {/* Action Link inside Card */}
                  <div className="mt-4 pt-3 border-t border-[#EADFC9]/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-medium text-[#143628]/60">
                      Enquiry Excursion
                    </span>
                    <button
                      onClick={onOpenSightseeing}
                      className="text-[#8F6C27] hover:text-[#143628] font-medium inline-flex items-center gap-1 transition-colors text-xs font-cinzel font-semibold"
                    >
                      <span>Add to Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. “More to Explore” — Compact Horizontal List */}
      <section className="py-6 bg-[#F4ECE1]/40 border-y border-[#EADFC9]/80">
        <Container className="max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
            <div>
              <span className="text-[11px] font-cinzel font-bold text-[#8F6C27] tracking-wider uppercase block">
                Additional Circuits
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#143628]">
                {sightseeingContent.moreToExploreTitle}
              </h3>
            </div>
            <p className="text-xs text-[#143628]/75 italic max-w-md">
              {sightseeingContent.moreToExploreNote}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {sightseeingContent.moreToExplore.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-lg p-3 border border-[#EADFC9] shadow-sm flex flex-col justify-between"
              >
                <span className="font-serif font-bold text-sm text-[#143628] block">
                  {item.name}
                </span>
                <span className="text-[11px] text-[#8F6C27] mt-1 block">
                  {item.note}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Explore Your Way — Simple 4-Option Selector */}
      <section className="py-8 sm:py-10">
        <Container className="max-w-4xl px-4 sm:px-6 text-center">
          <span className="text-xs font-cinzel uppercase tracking-widest text-[#8F6C27] font-bold block mb-1">
            Flexible Assistance
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#143628] tracking-tight">
            {sightseeingContent.exploreModesTitle}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#143628]/75 mb-6">
            {sightseeingContent.exploreModesSubtitle}
          </p>

          {/* 4 Simple Pills/Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sightseeingContent.exploreModes.map((mode) => {
              const isSelected = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`p-4 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#143628] text-white border-[#143628] shadow-md'
                      : 'bg-white text-[#143628] border-[#EADFC9] hover:border-[#C5A059]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`font-serif font-bold text-sm ${isSelected ? 'text-[#DFCA95]' : 'text-[#143628]'}`}>
                        {mode.label}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#DFCA95]" />}
                    </div>
                    <p className={`text-xs leading-relaxed ${isSelected ? 'text-white/80' : 'text-[#143628]/70'}`}>
                      {mode.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-[#8F6C27] font-medium">
            {sightseeingContent.exploreAssistanceNote}
          </p>
        </Container>
      </section>

      {/* 5. Planning Note (Restrained Information Strip) */}
      <div className="bg-[#FFF8E7] border-y border-[#EAD7A1] py-3.5 px-4 text-center">
        <Container className="max-w-3xl">
          <p className="text-xs text-[#785418] leading-relaxed flex items-center justify-center gap-2 font-normal">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{sightseeingContent.planningNote}</span>
          </p>
        </Container>
      </div>

      {/* 6. Final CTA — Large but Compact Banner */}
      <section className="py-10 sm:py-12">
        <Container className="max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl bg-[#0E261C] border border-[#C5A059]/40 p-6 sm:p-10 text-center text-[#F9F6F0] relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="relative z-10 max-w-xl mx-auto space-y-3">
              <Badge variant="gold" className="uppercase tracking-widest text-[10px] py-0.5">
                On-Ground Coordination
              </Badge>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Plan Your Day Beyond Saranda
              </h2>

              <p className="text-xs sm:text-sm text-[#DFCA95] leading-relaxed font-light">
                Share your dates and destinations of interest. Our team will verify weather, local route conditions, and provide a clear, all-inclusive quotation.
              </p>

              <div className="pt-3">
                <Button
                  variant="terracotta"
                  size="md"
                  onClick={onOpenSightseeing}
                  icon={Compass}
                  className="w-full sm:w-auto text-xs py-2.5 px-6 font-semibold"
                >
                  Request Sightseeing Assistance
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
