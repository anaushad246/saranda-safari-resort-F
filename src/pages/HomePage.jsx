import React, { useState } from 'react';
import { 
  Compass, Calendar, Trees, Waves, Sparkles, MapPin, 
  ArrowRight, Phone, MessageSquare, Check, Shield, AlertTriangle, 
  Car, Coffee, Utensils, Moon, HelpCircle
} from 'lucide-react';
import { Section, Container, Heading, Button, Card, Badge } from '../components/ui/Primitives';
import { resortInfo } from '../content/resortInfo';
import { FEATURES } from '../content/features';
import { thePlaceContent } from '../content/thePlace';
import { stayInventory } from '../content/stayInventory';
import { experiencesContent } from '../content/experiences';
import { tariffsAndPackages } from '../content/tariffsAndPackages';
import { sightseeingContent } from '../content/sightseeing';
import { gettingHereContent } from '../content/gettingHere';
import { faqsAndPolicies } from '../content/faqsAndPolicies';

export function HomePage({ 
  onNavigate, 
  onOpenBooking, 
  onOpenPickup, 
  onOpenSightseeing, 
  onOpenEvent 
}) {
  return (
    <div className="w-full">
      {/* =========================================================================
          SECTION 1: HERO
          SARANDA SAFARI RESORT | Nature • Wildlife • Tranquility
          "A little closer to nature. A little further from the everyday."
          October 2026 Pre-Booking Notice & Quick Booking Bar
         ========================================================================= */}
      <section className="relative min-h-[90vh] flex flex-col justify-center bg-[#0E261C] text-[#F9F6F0] py-20 border-b border-[#C5A059]/30 overflow-hidden">
        {/* Main Property Photograph Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000 ease-out"
          style={{ backgroundImage: "url('/resort-hero.jpg')" }}
        />

        {/* Sophisticated Multi-stop Dark Forest Overlay for optimal typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E261C]/85 via-[#0E261C]/65 to-[#0E261C]/95 pointer-events-none" />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        {/* Subtle ambient gold starlight pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

        <Container className="relative z-10 text-center max-w-5xl">
          {/* Elephant Badge & Foundation Year */}
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#143628] border border-[#C5A059]/40 text-[#DFCA95] text-xs font-medium uppercase tracking-widest mb-6 shadow-sm">
            <span>Established 1998</span>
            <span>•</span>
            <span>Village Nimture, Bolani, Odisha</span>
          </div> */}

          <h1 className="font-cinzel tracking-wider text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F9F6F0] leading-tight">
            {resortInfo.name}
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#DFCA95] mt-3 tracking-wide">
            {resortInfo.tagline}
          </p>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#F9F6F0] mt-4 font-serif leading-relaxed">
            "{resortInfo.subtext}"
          </p>

          <p className="max-w-3xl mx-auto text-sm sm:text-base text-[#F9F6F0]/85 mt-4 leading-relaxed font-sans">
            Unwind among trees, open lawns and peaceful surroundings at Saranda Safari Resort in Nimture, Bolani, Odisha. Enjoy a cottage stay, settle into our wooden log house, or spend a night camping beneath the open sky.
          </p>

          {/* October 2026 Season Pre-Booking Banner */}
          <div className="mt-8 inline-block bg-[#143628]/90 border border-[#C5A059]/60 rounded-xl px-5 py-3 max-w-xl mx-auto shadow-md backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#DFCA95] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
              <span>{resortInfo.preBookingNotice}</span>
            </div>
          </div>

          {/* Action CTAs: Explore Our Stays | Check Availability | WhatsApp Us */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => onNavigate('stay')}
              icon={ArrowRight}
            >
              Explore Our Stays
            </Button>

            <Button
              variant="terracotta"
              size="lg"
              onClick={onOpenBooking}
              icon={Calendar}
            >
              Check Availability
            </Button>

            <a
              href={`https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent("Hello, I would like to enquire about pre-booking at Saranda Safari Resort for October 2026 onwards.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-medium rounded-md text-base px-6 py-3.5 bg-emerald-900/80 hover:bg-emerald-800 text-white border border-emerald-500/50 shadow-sm transition-colors gap-2"
            >
              <MessageSquare className="w-5 h-5 text-emerald-300" />
              WhatsApp Us
            </a>
          </div>

          {/* Quick Booking Strip Bar */}
          {/* <div className="mt-14 max-w-4xl mx-auto bg-white/95 backdrop-blur-md text-[#143628] rounded-xl p-4 shadow-xl border border-[#E8DFCE] hidden sm:grid grid-cols-4 gap-4 text-left items-center">
            <div className="border-r border-[#E8DFCE] pr-3">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8F6C27] block">Season</span>
              <span className="text-sm font-serif font-bold text-[#143628]">Oct 2026 Stays</span>
            </div>
            <div className="border-r border-[#E8DFCE] pr-3">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8F6C27] block">Timing</span>
              <span className="text-sm font-medium text-[#143628]">9 AM – 9 AM (24 Hrs)</span>
            </div>
            <div className="border-r border-[#E8DFCE] pr-3">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8F6C27] block">Capacity</span>
              <span className="text-sm font-medium text-[#143628]">Max 25 Overnight</span>
            </div>
            <div>
              <Button
                variant="terracotta"
                size="sm"
                className="w-full"
                onClick={onOpenBooking}
              >
                Reserve Stay
              </Button>
            </div>
          </div> */}
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2: THE PLACE (PREVIEW)
          Compact editorial bridge between Hero and Stay
         ========================================================================= */}
      <Section id="the-place-preview" background="cream" className="!py-10 sm:!py-12 lg:!py-14">
        <Container>
          <div className="mx-auto max-w-3xl text-center">

            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#8F6C27]">
              Village Nimture, Bolani, Odisha
            </p>

            <h2 className="mt-2 font-serif text-3xl font-bold leading-tight text-[#143628] sm:text-4xl">
              The Place
            </h2>

            <p className="mt-2 font-serif text-base italic text-[#143628]/70 sm:text-lg">
              The Land of Seven Hundred Hills &amp; Whispering Sal
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#143628]/80 sm:text-base sm:leading-7">
              Nestled along the gentle curves of the Karo River, Saranda Safari
              Resort is a tranquil forest retreat surrounded by rolling hills,
              magnificent sal trees and mature mango orchards. A peaceful
              sanctuary to slow down, breathe fresh air, and reconnect with nature.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-medium text-[#8F6C27] sm:text-sm">
              <span>Karo Riverfront</span>
              <span aria-hidden="true">•</span>
              <span>Sal Forests</span>
              <span aria-hidden="true">•</span>
              <span>Mango Orchards</span>
            </div>

            <div className="mt-5">
              <Button
                variant="forest"
                size="md"
                onClick={() => onNavigate('the-place')}
                icon={ArrowRight}
              >
                Explore The Place
              </Button>
            </div>

          </div>
        </Container>
      </Section>

      {/* =========================================================================
          SECTION 3: STAY (PREVIEW)
          Visual-first, 2 main built stays (Slideable on mobile, 2-col on desktop)
         ========================================================================= */}
      <Section id="stay-preview" background="cream-deep" className="!py-10 sm:!py-12 lg:!py-14">
        <Container>
          <div className="mx-auto max-w-5xl">
            
            {/* Heading */}
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#8F6C27]">
                Accommodation
              </p>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143628]">
                Where You Stay
              </h2>
              <p className="mt-2 font-serif text-sm sm:text-base italic text-[#143628]/75 max-w-xl mx-auto">
                Comfortable stays surrounded by forest, open lawns and the quiet of nature.
              </p>
            </div>

            {/* Stays Container: Slideable on mobile, 2-column grid on desktop */}
            <div className="flex lg:grid lg:grid-cols-2 gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-3 lg:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              
              {/* Card 1: Riverwood */}
              <div 
                onClick={() => onNavigate('stay')}
                className="w-[85vw] sm:w-[380px] lg:w-auto shrink-0 snap-center bg-white rounded-xl border border-[#E8DFCE] overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#143628]">
                    <img 
                      src="/RIVERWOODCOTTAGE.jpeg" 
                      alt="Riverwood"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-[#143628]/90 backdrop-blur-xs text-[#DFCA95] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      1 Exclusive Unit • 4 Guests
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#143628] group-hover:text-[#C25E3E] transition-colors">
                      Riverwood
                    </h3>
                    <p className="text-xs text-[#8F6C27] font-serif italic mt-0.5 mb-1">
                      The warmth of wood, the calm of the riverside.
                    </p>
                    <p className="text-xs sm:text-sm text-[#143628]/80 mt-1 leading-relaxed">
                      Riverside location, rustic wooden charm, and a leisurely river-facing veranda watching the changing light over the water.
                    </p>
                  </div>
                </div>
                <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[#E8DFCE]/60 flex items-center justify-between text-xs font-semibold text-[#8F6C27]">
                  <span>From ₹3,000 / night</span>
                  <span className="text-[#143628] group-hover:text-[#C25E3E] flex items-center gap-1">
                    Explore Stay <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card 2: Cherry Blossom */}
              <div 
                onClick={() => onNavigate('stay')}
                className="w-[85vw] sm:w-[380px] lg:w-auto shrink-0 snap-center bg-white rounded-xl border border-[#E8DFCE] overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#143628]">
                    <img 
                      src="/CHERRYBLOSSOM.jpeg" 
                      alt="Cherry Blossom"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-[#143628]/90 backdrop-blur-xs text-[#DFCA95] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                      4 Units • 3 Guests / Unit
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#143628] group-hover:text-[#C25E3E] transition-colors">
                      Cherry Blossom
                    </h3>
                    <p className="text-xs text-[#8F6C27] font-serif italic mt-0.5 mb-1">
                      A peaceful retreat with our finest river views.
                    </p>
                    <p className="text-xs sm:text-sm text-[#143628]/80 mt-1 leading-relaxed">
                      Direct Karo River vantage, white walls with red accents, graceful arched verandas, and peaceful open lawns.
                    </p>
                  </div>
                </div>
                <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-[#E8DFCE]/60 flex items-center justify-between text-xs font-semibold text-[#8F6C27]">
                  <span>From ₹3,000 / night</span>
                  <span className="text-[#143628] group-hover:text-[#C25E3E] flex items-center gap-1">
                    Explore Stays <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>

            {/* Mobile Swipe Hint Indicator */}
            <p className="text-center text-[11px] text-[#143628]/60 mt-2 lg:hidden">
              ← Swipe to explore stays →
            </p>

            {/* Secondary Stays Line */}
            <div className="mt-6 text-center text-xs text-[#143628]/80 max-w-2xl mx-auto space-y-1.5">
              <div>
                <span>Also explore: </span>
                <strong className="text-[#143628]">Autumn Abode</strong> (3 Units • 4 Guests/Unit) • 
                <strong className="text-[#143628]"> Spring Abode</strong> (4 Units • 4 Guests/Unit) • 
                <strong className="text-[#143628]"> Gulmohar</strong> (1 Unit • 3 Guests) • 
                <strong className="text-[#143628]"> Amberwood</strong> (1 Unit • 4 Guests)
              </div>
              <div className="text-[11px] text-[#8F6C27] font-medium">
                Plus <strong className="text-[#143628]">Wilderness Camping Tents</strong> (2 Tents • 5 Guests Total) by the Karo River
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-5 text-center">
              <Button
                variant="forest"
                size="md"
                onClick={() => onNavigate('stay')}
                icon={ArrowRight}
              >
                Explore All Stays &amp; Tariffs
              </Button>
            </div>

          </div>
        </Container>
      </Section>

      {/* =========================================================================
          SECTION 4: TEN EXPERIENCES (PREVIEW)
          Inspiring visual gateway: Ten Ways to Slow Down
          Desktop: 3-image composition | Mobile: horizontal swipeable
         ========================================================================= */}
      <Section id="experiences-preview" background="cream" className="!py-10 sm:!py-12 lg:!py-14">
        <Container>
          <div className="mx-auto max-w-6xl">

            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#8F6C27]">
                Outdoor Life
              </p>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143628]">
                Ten Ways to Slow Down
              </h2>
              <p className="mt-2 font-serif text-sm sm:text-base italic text-[#143628]/75 max-w-xl mx-auto">
                From forest trails and waterfalls to hilltop sunsets and quiet moments by the Karo.
              </p>
            </div>

            {/* 3 Visual Previews (Slideable on mobile, 3-column grid on desktop) */}
            <div className="flex lg:grid lg:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-3 lg:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              
              {/* Card 01: Leopard Caves Trail */}
              <div 
                onClick={() => onNavigate('experiences')}
                className="w-[80vw] sm:w-[320px] lg:w-auto shrink-0 snap-center bg-white rounded-xl border border-[#E8DFCE] overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#143628]">
                    <img 
                      src="/exp-leopard-caves.jpg" 
                      alt="Leopard Caves Trail"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#143628]/90 backdrop-blur-xs text-[#DFCA95] text-[10px] font-bold px-2.5 py-0.5 rounded-full font-cinzel">
                      01 • Wilderness Hike
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628] group-hover:text-[#C25E3E] transition-colors leading-snug">
                      Leopard Caves Trail
                    </h3>
                    <p className="text-xs text-[#143628]/75 mt-1.5 leading-relaxed">
                      A rugged, scenic natural trail through towering sal trees up to ancient cave formations.
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-3.5 pt-2 border-t border-[#E8DFCE]/50 flex items-center justify-between text-xs font-semibold text-[#8F6C27]">
                  <span>Forest &amp; Ridges</span>
                  <span className="text-[#143628] group-hover:text-[#C25E3E] flex items-center gap-1">
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card 02: Waterfalls Exploration */}
              <div 
                onClick={() => onNavigate('experiences')}
                className="w-[80vw] sm:w-[320px] lg:w-auto shrink-0 snap-center bg-white rounded-xl border border-[#E8DFCE] overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#143628]">
                    <img 
                      src="/exp-waterfalls.jpg" 
                      alt="Waterfalls Exploration"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#143628]/90 backdrop-blur-xs text-[#DFCA95] text-[10px] font-bold px-2.5 py-0.5 rounded-full font-cinzel">
                      02 • Excursion
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628] group-hover:text-[#C25E3E] transition-colors leading-snug">
                      Waterfalls Exploration
                    </h3>
                    <p className="text-xs text-[#143628]/75 mt-1.5 leading-relaxed">
                      Pristine cascade points hidden in green ravines, with natural freshwater pools.
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-3.5 pt-2 border-t border-[#E8DFCE]/50 flex items-center justify-between text-xs font-semibold text-[#8F6C27]">
                  <span>Cascades &amp; Pools</span>
                  <span className="text-[#143628] group-hover:text-[#C25E3E] flex items-center gap-1">
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card 03: Kiriburu Sunset Point */}
              <div 
                onClick={() => onNavigate('experiences')}
                className="w-[80vw] sm:w-[320px] lg:w-auto shrink-0 snap-center bg-white rounded-xl border border-[#E8DFCE] overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#143628]">
                    <img 
                      src="/exp-sunset.jpg" 
                      alt="Kiriburu Sunset Point"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-[#143628]/90 backdrop-blur-xs text-[#DFCA95] text-[10px] font-bold px-2.5 py-0.5 rounded-full font-cinzel">
                      03 • Sunset Vantage
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628] group-hover:text-[#C25E3E] transition-colors leading-snug">
                      Kiriburu Sunset Point
                    </h3>
                    <p className="text-xs text-[#143628]/75 mt-1.5 leading-relaxed">
                      Golden hour over the vast rolling ridges of the land of seven hundred hills.
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-3.5 pt-2 border-t border-[#E8DFCE]/50 flex items-center justify-between text-xs font-semibold text-[#8F6C27]">
                  <span>Hilltop Panorama</span>
                  <span className="text-[#143628] group-hover:text-[#C25E3E] flex items-center gap-1">
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>

            {/* Mobile swipe hint */}
            <p className="text-center text-[11px] text-[#143628]/60 mt-2 lg:hidden">
              ← Swipe to explore experiences →
            </p>

            {/* Secondary note */}
            <div className="mt-5 text-center text-xs text-[#143628]/75">
              <span>10 experiences • Every season brings something different</span>
            </div>

            {/* CTA */}
            <div className="mt-4 text-center">
              <Button
                variant="forest"
                size="md"
                onClick={() => onNavigate('experiences')}
                icon={ArrowRight}
              >
                Explore Experiences
              </Button>
            </div>

          </div>
        </Container>
      </Section>

      {/* =========================================================================
          SECTION 5: PACKAGES & TARIFFS (PREVIEW)
          Tightened padding & margins (Slideable on mobile, 3-col on desktop)
         ========================================================================= */}
      <Section id="packages-preview" background="cream-deep" className="!py-10 sm:!py-12 lg:!py-14">
        <Container>
          <div className="text-center mb-5 sm:mb-6">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#8F6C27]">
              Transparent Pricing
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143628]">
              Packages &amp; Official Tariffs
            </h2>
            <p className="mt-1.5 font-serif text-sm sm:text-base italic text-[#143628]/75 max-w-xl mx-auto">
              Breakfast included in every stay • 9:00 AM check-in
            </p>
          </div>

          {/* Slideable on mobile, 3-column grid on desktop with disciplined gaps */}
          <div className="flex lg:grid lg:grid-cols-3 gap-3.5 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-2.5 lg:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            
            {/* Card 1: Cottage Overnight Tariff */}
            <Card className="w-[82vw] sm:w-[340px] lg:w-auto shrink-0 snap-center p-4 sm:p-5 flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-full h-36 sm:h-40 rounded-lg overflow-hidden mb-3 relative border border-[#E8DFCE]/80">
                  <img 
                    src="/package-cottage.jpg" 
                    alt="Cottages & Log House" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="forest">24-Hour Stay</Badge>
                  </div>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#143628]">Cottages &amp; Log House</h3>
                <p className="text-[11px] sm:text-xs text-[#143628]/70 mt-0.5">9:00 AM Check-in to 9:00 AM Next Day</p>
                
                <div className="mt-3 divide-y divide-[#E8DFCE]/80 text-xs">
                  {tariffsAndPackages.overnightCottage.rates.map(tier => (
                    <div key={tier.guests} className="py-1.5 flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-[#143628]">{tier.guests} Adult{tier.guests > 1 ? 's' : ''}</span>
                        {tier.guests === 4 && (
                          <span className="block text-[10px] text-[#C25E3E] font-medium">Riverwood, Autumn, Spring, Amberwood</span>
                        )}
                      </div>
                      <span className="font-serif font-bold text-sm text-[#143628]">₹{tier.rate.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#E8DFCE] text-[11px] sm:text-xs text-[#8F6C27] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Includes Veg Breakfast</span>
              </div>
            </Card>

            {/* Card 2: Camping Overnight Tariff */}
            <Card className="w-[82vw] sm:w-[340px] lg:w-auto shrink-0 snap-center p-4 sm:p-5 flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-full h-36 sm:h-40 rounded-lg overflow-hidden mb-3 relative border border-[#E8DFCE]/80">
                  <img 
                    src="/package-camping.jpg" 
                    alt="Wilderness Tents" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="terracotta">Riverside Camping</Badge>
                  </div>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#143628]">Wilderness Tents</h3>
                <p className="text-[11px] sm:text-xs text-[#143628]/70 mt-0.5">4:00 PM Check-in to 9:00 AM Next Day</p>

                <div className="mt-3 divide-y divide-[#E8DFCE]/80 text-xs">
                  {tariffsAndPackages.overnightCamping.rates.map((tier, idx) => (
                    <div key={idx} className="py-1.5 flex justify-between items-center">
                      <span className="font-semibold text-[#143628]">{tier.type}</span>
                      <span className="font-serif font-bold text-sm text-[#143628]">₹{tier.rate.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                  <div className="py-1.5 flex justify-between items-center">
                    <span className="font-semibold text-[#143628]">Child (5–10 yrs)</span>
                    <span className="font-serif font-bold text-sm text-[#143628]">₹750</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#E8DFCE] text-[11px] sm:text-xs text-[#8F6C27] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Includes Breakfast, Bonfire &amp; Bath</span>
              </div>
            </Card>

            {/* Card 3: Non-Veg Supplements & Add-ons */}
            <Card className="w-[82vw] sm:w-[340px] lg:w-auto shrink-0 snap-center p-4 sm:p-5 flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-full h-36 sm:h-40 rounded-lg overflow-hidden mb-3 relative border border-[#E8DFCE]/80">
                  <img 
                    src="/package-bonfire.jpg" 
                    alt="Add-ons, Bonfires & Day Use" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="gold">Bonfire &amp; Day Use</Badge>
                  </div>
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#143628]">Add-ons &amp; Day Use</h3>
                <p className="text-[11px] sm:text-xs text-[#143628]/70 mt-0.5">Enhance your stay or visit for the evening</p>

                <div className="mt-3 divide-y divide-[#E8DFCE]/80 text-xs">
                  {FEATURES.nonVegSupplements && (
                  <div className="py-1.5 flex justify-between items-center">
                    <span>Non-Veg Chicken/Fish</span>
                    <span className="font-serif font-bold text-[#143628]">₹150 / meal</span>
                  </div>
                  )}
                  {FEATURES.nonVegSupplements && (
                  <div className="py-1.5 flex justify-between items-center">
                    <span>Cottage Lunch+Dinner Non-Veg</span>
                    <span className="font-serif font-bold text-[#143628]">₹300 / stay</span>
                  </div>
                  )}
                  <div className="py-1.5 flex justify-between items-center">
                    <span>Cottage Bonfire Hearth</span>
                    <span className="font-serif font-bold text-[#143628]">₹250 / person</span>
                  </div>
                  <div className="py-1.5 flex justify-between items-center">
                    <span>Evening Pause (4–6 PM)</span>
                    <span className="font-serif font-bold text-[#143628]">₹100 / adult</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#E8DFCE] text-[11px] text-[#143628]/70">
                Evening Under the Stars (₹399–₹1,199) &amp; Hourly Stays.
              </div>
            </Card>

          </div>

          {/* Mobile swipe hint */}
          <p className="text-center text-[11px] text-[#143628]/60 mt-2 lg:hidden">
            ← Swipe to explore packages →
          </p>

          {/* Bottom CTAs: tightened spacing */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <Button
              variant="terracotta"
              size="md"
              onClick={onOpenBooking}
              icon={Calendar}
            >
              Calculate Your Stay
            </Button>

            <Button
              variant="forest"
              size="md"
              onClick={() => onNavigate('packages')}
              icon={ArrowRight}
            >
              View All Tariffs &amp; Packages
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={onOpenEvent}
              icon={Sparkles}
            >
              Request Event Quote
            </Button>
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          SECTION 6: SIGHTSEEING (PREVIEW)
          Excursions preview & custom coordination assistance
          Desktop: 3-col compact cards | Mobile: horizontal slideable
         ========================================================================= */}
      <Section id="sightseeing-preview" background="cream" className="!py-10 sm:!py-12 lg:!py-14">
        <Container>
          <div className="mx-auto max-w-5xl">
            
            {/* Heading */}
            <div className="text-center mb-5 sm:mb-6">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#8F6C27]">
                Excursions &amp; Beyond
              </p>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143628]">
                Explore Surrounding Sights
              </h2>
              <p className="mt-1.5 font-serif text-sm sm:text-base italic text-[#143628]/75 max-w-xl mx-auto">
                Natural cascades, valley rivers, and ancient forest shrines — Saranda serves as the peaceful basecamp for day excursions.
              </p>
            </div>

            {/* 3 Diverse Destination Cards: Slideable on mobile, 3-column grid on desktop */}
            <div className="flex lg:grid lg:grid-cols-3 gap-3.5 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-2.5 lg:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              
              {/* Card 1: Jhikra & Pacheri Waterfalls */}
              <div 
                onClick={() => onNavigate('sightseeing')}
                className="w-[80vw] sm:w-[320px] lg:w-auto shrink-0 snap-center bg-white rounded-xl border border-[#E8DFCE] p-5 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#143628] px-2 py-0.5 rounded-full font-sans">
                      Waterfalls
                    </span>
                    <span className="text-[11px] text-[#8F6C27] font-medium">Day Excursion</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628] group-hover:text-[#C25E3E] transition-colors leading-snug">
                    Jhikra &amp; Pacheri Waterfalls
                  </h3>
                  <p className="text-xs text-[#143628]/75 mt-1.5 leading-relaxed">
                    Hidden natural cascade points nestled within lush green forest ravines with clear rocky wading pools.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#E8DFCE]/60 flex items-center justify-between text-xs font-semibold text-[#8F6C27]">
                  <span>Scenic Cascades</span>
                  <span className="text-[#143628] group-hover:text-[#C25E3E] flex items-center gap-1">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card 2: Pundul River Valley */}
              <div 
                onClick={() => onNavigate('sightseeing')}
                className="w-[80vw] sm:w-[320px] lg:w-auto shrink-0 snap-center bg-white rounded-xl border border-[#E8DFCE] p-5 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFCA95] bg-[#143628] px-2 py-0.5 rounded-full font-sans">
                      River Valley
                    </span>
                    <span className="text-[11px] text-[#8F6C27] font-medium">Scenic Landscape</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628] group-hover:text-[#C25E3E] transition-colors leading-snug">
                    Pundul River Valley
                  </h3>
                  <p className="text-xs text-[#143628]/75 mt-1.5 leading-relaxed">
                    Gentle flowing valley waters and open riverside meadows framed by the undulating forested hills.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#E8DFCE]/60 flex items-center justify-between text-xs font-semibold text-[#8F6C27]">
                  <span>Pristine Waters</span>
                  <span className="text-[#143628] group-hover:text-[#C25E3E] flex items-center gap-1">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card 3: Ancient Forest Shrines */}
              <div 
                onClick={() => onNavigate('sightseeing')}
                className="w-[80vw] sm:w-[320px] lg:w-auto shrink-0 snap-center bg-white rounded-xl border border-[#E8DFCE] p-5 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFCA95] bg-[#143628] px-2 py-0.5 rounded-full font-sans">
                      Heritage
                    </span>
                    <span className="text-[11px] text-[#8F6C27] font-medium">Cultural Shrines</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628] group-hover:text-[#C25E3E] transition-colors leading-snug">
                    Mirgsingha &amp; Jateshwar Temples
                  </h3>
                  <p className="text-xs text-[#143628]/75 mt-1.5 leading-relaxed">
                    Revered woodland shrines deeply woven into local forest folklore and quiet spiritual heritage.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#E8DFCE]/60 flex items-center justify-between text-xs font-semibold text-[#8F6C27]">
                  <span>Sacred Woods</span>
                  <span className="text-[#143628] group-hover:text-[#C25E3E] flex items-center gap-1">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>

            {/* Mobile swipe hint */}
            <p className="text-center text-[11px] text-[#143628]/60 mt-2 lg:hidden">
              ← Swipe to explore destinations →
            </p>

            {/* Service Note */}
            <div className="mt-5 text-center text-xs text-[#143628]/75">
              <span>Day excursions arranged on request with trusted local vehicle coordination.</span>
            </div>

            {/* CTAs */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="forest"
                size="md"
                onClick={() => onNavigate('sightseeing')}
                icon={ArrowRight}
              >
                View All Destinations
              </Button>

              <Button
                variant="terracotta"
                size="md"
                onClick={onOpenSightseeing}
                icon={MapPin}
              >
                Request Excursion Quote
              </Button>
            </div>

          </div>
        </Container>
      </Section>

      {/* =========================================================================
          SECTION 7: GETTING HERE (PREVIEW)
          Route & access preview with 3 travel pillars (Slideable on mobile, 3-col desktop)
         ========================================================================= */}
      <Section id="getting-here-preview" background="cream-deep" className="!py-10 sm:!py-12 lg:!py-14">
        <Container>
          <div className="mx-auto max-w-5xl">
            
            {/* Heading */}
            <div className="text-center mb-5 sm:mb-6">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#8F6C27]">
                Location &amp; Access
              </p>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143628]">
                Getting to Saranda
              </h2>
              <p className="mt-1.5 font-serif text-sm sm:text-base italic text-[#143628]/75 max-w-xl mx-auto">
                Village Nimture, Bolani, Keonjhar, Odisha — accessible by direct rail, scenic highways, and connecting flights.
              </p>
            </div>

            {/* 3 Travel Modes: Slideable on mobile, 3-column grid on desktop */}
            <div className="flex lg:grid lg:grid-cols-3 gap-3.5 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-2.5 lg:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              
              {/* Pillar 1: Nearest Railhead */}
              <div 
                onClick={() => onNavigate('getting-here')}
                className="w-[80vw] sm:w-[320px] lg:w-auto shrink-0 snap-center bg-white rounded-xl border border-[#E8DFCE] p-5 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#143628] px-2 py-0.5 rounded-full font-sans">
                      Nearest Railhead
                    </span>
                    <span className="text-[11px] text-[#C25E3E] font-semibold">15 km • 25 mins</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628] group-hover:text-[#C25E3E] transition-colors leading-snug">
                    Barbil Station (BBL)
                  </h3>
                  <p className="text-xs text-[#143628]/75 mt-1.5 leading-relaxed">
                    Closest station to the resort. Regular direct trains from Howrah (Kolkata) and Tatanagar (Jamshedpur).
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#E8DFCE]/60 flex items-center justify-between text-xs font-semibold text-[#8F6C27]">
                  <span>Local Highway Transfer</span>
                  <span className="text-[#143628] group-hover:text-[#C25E3E] flex items-center gap-1">
                    Route <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Pillar 2: Major Rail Junctions */}
              <div 
                onClick={() => onNavigate('getting-here')}
                className="w-[80vw] sm:w-[320px] lg:w-auto shrink-0 snap-center bg-white rounded-xl border border-[#E8DFCE] p-5 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFCA95] bg-[#143628] px-2 py-0.5 rounded-full font-sans">
                      Major Terminals
                    </span>
                    <span className="text-[11px] text-[#C25E3E] font-semibold">2.5–3 hrs by road</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628] group-hover:text-[#C25E3E] transition-colors leading-snug">
                    Rourkela &amp; Tatanagar
                  </h3>
                  <p className="text-xs text-[#143628]/75 mt-1.5 leading-relaxed">
                    Nationwide major rail hubs connected to Delhi, Mumbai, Kolkata, and South India with scenic road transfers.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#E8DFCE]/60 flex items-center justify-between text-xs font-semibold text-[#8F6C27]">
                  <span>100–150 km Highway</span>
                  <span className="text-[#143628] group-hover:text-[#C25E3E] flex items-center gap-1">
                    Route <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Pillar 3: Connecting Airports */}
              <div 
                onClick={() => onNavigate('getting-here')}
                className="w-[80vw] sm:w-[320px] lg:w-auto shrink-0 snap-center bg-white rounded-xl border border-[#E8DFCE] p-5 shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFCA95] bg-[#143628] px-2 py-0.5 rounded-full font-sans">
                      Airports
                    </span>
                    <span className="text-[11px] text-[#C25E3E] font-semibold">Scheduled Flights</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628] group-hover:text-[#C25E3E] transition-colors leading-snug">
                    Ranchi &amp; Jharsuguda
                  </h3>
                  <p className="text-xs text-[#143628]/75 mt-1.5 leading-relaxed">
                    Domestic airports with daily flights from metro cities. Private pickup cars arranged upon advance notice.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#E8DFCE]/60 flex items-center justify-between text-xs font-semibold text-[#8F6C27]">
                  <span>Airport Taxi Transfer</span>
                  <span className="text-[#143628] group-hover:text-[#C25E3E] flex items-center gap-1">
                    Route <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>

            {/* Mobile swipe hint */}
            <p className="text-center text-[11px] text-[#143628]/60 mt-2 lg:hidden">
              ← Swipe to explore travel routes →
            </p>

            {/* Pickup Note */}
            <div className="mt-5 text-center text-xs text-[#143628]/75">
              <span>Private pickup and drop can be arranged from any station or airport upon advance notice.</span>
            </div>

            {/* CTAs */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="forest"
                size="md"
                onClick={() => onNavigate('getting-here')}
                icon={ArrowRight}
              >
                View Full Route Directions
              </Button>

              <Button
                variant="terracotta"
                size="md"
                onClick={onOpenPickup}
                icon={Car}
              >
                Request Station / Airport Pickup
              </Button>
            </div>

          </div>
        </Container>
      </Section>

      {/* =========================================================================
          SECTION 8: FAQ & CONTACT FOOTER (PREVIEW)
          FAQ preview, official helpdesk, 100% refund guarantee & footer
         ========================================================================= */}
      <footer className="bg-[#0E261C] text-[#F9F6F0] pt-10 sm:pt-12 pb-8 sm:pb-10 border-t-2 border-[#C5A059]">
        <Container>
          {/* Top Grid: FAQ Highlights & Official Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 sm:pb-10 border-b border-[#C5A059]/30">
            
            {/* Left: Brand Identity, Location & Direct Helpdesk (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#143628] flex items-center justify-center border border-[#C5A059]/50 overflow-hidden shadow-xs shrink-0">
                  <img
                    src="/logo.jpeg"
                    alt="Saranda Safari Resort"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/logo.jpg';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white leading-tight">
                    {resortInfo.name}
                  </h3>
                  <span className="text-[10px] sm:text-xs text-[#DFCA95] tracking-[0.16em] uppercase block mt-0.5">
                    {resortInfo.tagline}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#F9F6F0]/80 leading-relaxed max-w-md">
                A quiet forest retreat in Village Nimture along the Karo River in District Keonjhar, Odisha. Welcoming guests with authentic cottage stays, wooden cabin living, and starlit camping.
              </p>

              <div className="text-xs text-[#DFCA95] space-y-1.5 pt-1">
                <div>
                  <span className="text-white font-medium">Address: </span>
                  {resortInfo.address.fullAddress}
                </div>
                <div>
                  <span className="text-white font-medium">Reception Desk: </span>
                  {resortInfo.contact.deskHours}
                </div>
                <div>
                  <span className="text-white font-medium">Direct Phone: </span>
                  <a href={`tel:${resortInfo.contact.phoneRaw}`} className="text-[#DFCA95] hover:text-white underline font-semibold">
                    {resortInfo.contact.phone}
                  </a>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <Button
                  variant="terracotta"
                  size="sm"
                  onClick={onOpenBooking}
                  icon={Calendar}
                >
                  Check Availability
                </Button>

                <a
                  href={`https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent("Hello, I am enquiring about stay bookings at Saranda Safari Resort.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold border border-emerald-500/40 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-200" />
                  <span>WhatsApp Us</span>
                </a>

                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => onNavigate('contact')}
                >
                  Helpdesk &amp; Policies
                </Button>
              </div>
            </div>

            {/* Right: Essential FAQs & 100% Refund Protection Guarantee (7 cols) */}
            <div className="lg:col-span-7 space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#DFCA95] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                  Essential Booking &amp; Policy FAQs
                </h4>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="text-xs text-[#DFCA95] hover:text-white underline cursor-pointer"
                >
                  View All 16 FAQs &rarr;
                </button>
              </div>

              {/* 100% Full Refund Guarantee Banner */}
              <div className="p-3.5 rounded-lg bg-[#143628] border border-emerald-500/50 flex items-start gap-3 shadow-xs">
                <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-xs sm:text-sm text-white">100% Full Refund Guarantee</span>
                    <span className="text-[9px] uppercase font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">Resort Promise</span>
                  </div>
                  <p className="text-[11px] text-[#F9F6F0]/80 mt-1 leading-relaxed">
                    If Saranda Safari Resort cancels a booking due to road washouts, extreme weather, or operational reasons, 100% of all amounts paid is refunded in full.
                  </p>
                </div>
              </div>

              {/* 3 Quick Verified FAQs */}
              <div className="space-y-2 text-xs">
                {faqsAndPolicies.faqs.slice(0, 3).map((faq) => (
                  <div key={faq.id} className="bg-[#143628]/80 rounded-lg p-3 border border-[#C5A059]/20">
                    <span className="font-bold text-[#DFCA95] block">{faq.question}</span>
                    <p className="text-[#F9F6F0]/80 mt-1 line-clamp-2 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="pt-1 text-[11px] text-[#DFCA95]/85">
                Pre-booking open for October 2026 onwards • 50% advance to confirm booking
              </div>
            </div>

          </div>

          {/* Bottom Disclaimers & Copyright */}
          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F9F6F0]/60 gap-4 text-center sm:text-left">
            <div>
              <p>© {new Date().getFullYear()} {resortInfo.name}. All Rights Reserved. Established in Village Nimture.</p>
              <p className="text-[11px] text-[#DFCA95]/70 mt-0.5">
                "{resortInfo.photoDisclaimer}" • {resortInfo.taxDisplayNote}
              </p>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <button type="button" onClick={() => onNavigate('contact')} className="hover:text-white underline cursor-pointer">
                100% Resort Refund Policy
              </button>
              <button type="button" onClick={() => onNavigate('contact')} className="hover:text-white underline cursor-pointer">
                Pets Policy
              </button>
              <button type="button" onClick={() => onNavigate('the-place')} className="hover:text-white underline cursor-pointer">
                Seasons Guide
              </button>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
