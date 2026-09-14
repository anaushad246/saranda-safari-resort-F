import React, { useState } from 'react';
import { 
  Compass, Calendar, Trees, Waves, Sparkles, MapPin, 
  ArrowRight, Phone, MessageSquare, Check, Shield, AlertTriangle, 
  Car, Coffee, Utensils, Moon, HelpCircle
} from 'lucide-react';
import { Section, Container, Heading, Button, Card, Badge } from '../components/ui/Primitives';
import { resortInfo } from '../content/resortInfo';
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
      <section className="relative min-h-[85vh] flex flex-col justify-center bg-[#0E261C] text-[#F9F6F0] py-20 border-b border-[#C5A059]/30 overflow-hidden">
        {/* Subtle Background Pattern resembling tall sal tree trunks and soft moonlight */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E261C] via-[#143628]/80 to-[#0E261C]/90 pointer-events-none" />

        <Container className="relative z-10 text-center max-w-5xl">
          {/* Elephant Badge & Foundation Year */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#143628] border border-[#C5A059]/40 text-[#DFCA95] text-xs font-medium uppercase tracking-widest mb-6 shadow-sm">
            <span>Established 1998</span>
            <span>•</span>
            <span>Village Nimture, Bolani, Odisha</span>
          </div>

          <h1 className="font-cinzel tracking-wider text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F9F6F0] leading-tight">
            {resortInfo.name}
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-[#DFCA95] mt-3 tracking-wide">
            {resortInfo.tagline}
          </p>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#F9F6F0]/80 mt-4 leading-relaxed font-sans">
            "{resortInfo.subtext}"
          </p>

          {/* October 2026 Season Pre-Booking Banner */}
          <div className="mt-8 inline-block bg-[#143628]/90 border border-[#C5A059]/60 rounded-xl p-4 max-w-xl mx-auto shadow-md backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#DFCA95] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
              <span>{resortInfo.preBookingNotice}</span>
            </div>
            <p className="text-xs text-[#F9F6F0]/80 mt-1">
              Secure your stay with 50% advance. Non-refundable advance with a 7-day reschedule window. Full 100% refund guarantee if resort cancels.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="terracotta"
              size="lg"
              onClick={onOpenBooking}
              icon={Calendar}
            >
              Check Availability
            </Button>

            <Button
              variant="outline-light"
              size="lg"
              onClick={() => onNavigate('stay')}
              icon={ArrowRight}
            >
              Explore Our Stays
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
          <div className="mt-14 max-w-4xl mx-auto bg-white/95 backdrop-blur-md text-[#143628] rounded-xl p-4 shadow-xl border border-[#E8DFCE] hidden sm:grid grid-cols-4 gap-4 text-left items-center">
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
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2: THE PLACE (PREVIEW)
          Short introduction and link to The Place
         ========================================================================= */}
      <Section id="the-place-preview" background="cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Heading
                level={2}
                badge="The Heritage & Setting"
                align="left"
                subheading="The Land of Seven Hundred Hills & Whispering Sal"
              >
                A Sanctuary Bordered by River & Forest
              </Heading>

              <p className="text-base sm:text-lg text-[#143628]/85 leading-relaxed">
                {thePlaceContent.shortSummary}
              </p>

              <p className="text-sm text-[#143628]/75 leading-relaxed">
                Founded in 1998, Saranda Safari Resort was created for travellers seeking the simple, profound rhythms of nature: the fresh morning mist rising off the Karo River, the golden foliage of sal trees, the shade of mature mango orchards, and starry nights around the fire hearth.
              </p>

              {/* 4 Quick Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {thePlaceContent.highlights.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-[#C5A059] pl-3 py-1">
                    <h4 className="font-serif font-semibold text-sm text-[#143628]">{item.title}</h4>
                    <p className="text-xs text-[#143628]/70 mt-0.5 line-clamp-2">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  variant="forest"
                  size="md"
                  onClick={() => onNavigate('the-place')}
                  icon={ArrowRight}
                >
                  Read The Full Story & Seasonal Guide
                </Button>
              </div>
            </div>

            {/* Visual Card / Summary Box */}
            <div className="lg:col-span-5">
              <Card className="bg-[#F4EFE6] border-[#C5A059]/40 p-8 space-y-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#143628] text-[#C5A059] flex items-center justify-center">
                  <Trees className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#143628]">What Defines Saranda</h3>
                  <p className="text-xs text-[#8F6C27] font-medium tracking-wide uppercase mt-1">Village Nimture, Bolani, Keonjhar</p>
                </div>
                
                <ul className="space-y-3 text-xs sm:text-sm text-[#143628]/85">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Direct riverfront access along the gentle Karo River</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Land of seven hundred hills & magnificent sal trees</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Established in 1998 — over 25 years of quiet presence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Unplugged atmosphere for genuine mental tranquility</span>
                  </li>
                </ul>

                <div className="border-t border-[#E8DFCE] pt-4 text-xs text-[#143628]/70 italic">
                  "{resortInfo.photoDisclaimer}"
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          SECTION 3: STAY (PREVIEW)
          Accommodation preview and link to Stay
         ========================================================================= */}
      <Section id="stay-preview" background="cream-deep">
        <Container>
          <Heading
            level={2}
            badge="Accommodation Overview"
            align="center"
            subheading="Authentic, peaceful stays for up to 25 overnight guests"
          >
            Our Cottages, Log House & Camping
          </Heading>

          {/* Truth-in-Marketing Amenities Strip */}
          <div className="mb-10 bg-white/90 rounded-lg p-4 border border-[#E8DFCE] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <span className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
                <Check className="w-4 h-4" /> Electricity Available
              </span>
              <span className="text-[11px] text-[#143628]/70 block mt-0.5">Connected across units</span>
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
                <Check className="w-4 h-4" /> Attached Bathrooms
              </span>
              <span className="text-[11px] text-[#143628]/70 block mt-0.5">In all cottages & log house</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#8F6C27] flex items-center justify-center gap-1">
                <AlertTriangle className="w-4 h-4" /> No Air Conditioning
              </span>
              <span className="text-[11px] text-[#143628]/70 block mt-0.5">Ceiling fans & forest breeze</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#8F6C27] flex items-center justify-center gap-1">
                <Moon className="w-4 h-4" /> Disconnect to Reconnect
              </span>
              <span className="text-[11px] text-[#143628]/70 block mt-0.5">No Wi-Fi / No power backup</span>
            </div>
          </div>

          {/* 3 Unit Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stayInventory.units.slice(0, 3).map((unit) => (
              <Card key={unit.id} className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={unit.type === 'camping' ? 'terracotta' : 'gold'}>
                      {unit.tag}
                    </Badge>
                    <span className="text-xs font-semibold text-[#8F6C27]">
                      {unit.unitCount} Unit{unit.unitCount > 1 ? 's' : ''}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#143628]">{unit.name}</h3>
                  <p className="text-xs text-[#143628]/75 mt-2 line-clamp-3 leading-relaxed">
                    {unit.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#E8DFCE] space-y-1.5 text-xs text-[#143628]/80">
                    <div className="flex justify-between">
                      <span className="font-medium">Capacity:</span>
                      <span className="font-bold text-[#143628]">Max {unit.maxAdultsPerUnit} Guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Bath:</span>
                      <span>{unit.type === 'camping' ? 'Shared Facilities' : 'Private Attached'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Meals:</span>
                      <span className="text-emerald-800 font-medium">Veg Meals Included</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8DFCE]">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xs text-[#8F6C27] font-semibold">Starting from</span>
                    <span className="font-serif text-xl font-bold text-[#143628]">
                      ₹{unit.pricingTiers[1] || unit.pricingTiers.perPerson}
                      <span className="text-xs font-sans font-normal text-[#143628]/70"> / night</span>
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => onNavigate('stay')}
                    icon={ArrowRight}
                  >
                    View Room Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="forest"
              size="lg"
              onClick={() => onNavigate('stay')}
              icon={ArrowRight}
            >
              View All 4 Accommodation Types & Inventory Rules
            </Button>
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          SECTION 4: TEN EXPERIENCES (PREVIEW)
          Preview of 10 experiences with official titles & link to Experiences
         ========================================================================= */}
      <Section id="experiences-preview" background="cream">
        <Container>
          <Heading
            level={2}
            badge="Outdoor Life"
            align="center"
            subheading={experiencesContent.tagline}
          >
            {experiencesContent.sectionTitle}
          </Heading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiencesContent.experiences.slice(0, 4).map(exp => (
              <Card key={exp.id} className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-cinzel text-xs font-bold text-[#C5A059]">{exp.number}</span>
                    <span className="text-[11px] uppercase tracking-wider text-[#8F6C27] font-semibold">{exp.category}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#143628] leading-snug">
                    {exp.title}
                  </h3>

                  <p className="text-xs text-[#143628]/75 mt-2 leading-relaxed">
                    {exp.shortDescription}
                  </p>

                  {/* MANDATORY SAFETY WARNING FOR EXPERIENCE #4 */}
                  {exp.safetyWarning && (
                    <div className="mt-3 p-2.5 rounded bg-amber-50 border border-amber-300 text-[11px] text-amber-950 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{exp.safetyWarning}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8DFCE] flex items-center justify-between text-xs text-[#8F6C27]">
                  <span>{exp.tag}</span>
                  <span className="text-[#143628]/60 font-medium">Nature Immersion</span>
                </div>
              </Card>

            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="forest"
              size="lg"
              onClick={() => onNavigate('experiences')}
              icon={ArrowRight}
            >
              Explore All 10 Experiences & Guides
            </Button>
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          SECTION 5: PACKAGES & TARIFFS (PREVIEW)
          Tariffs preview and link to Packages
         ========================================================================= */}
      <Section id="packages-preview" background="cream-deep">
        <Container>
          <Heading
            level={2}
            badge="Transparent Pricing"
            align="center"
            subheading="Standard tariffs with vegetarian meals included • 9 AM check-in"
          >
            Packages & Official Tariffs
          </Heading>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cottage Overnight Tariff Card */}
            <Card className="p-6">
              <Badge variant="forest" className="mb-3">24-Hour Cottage Stay</Badge>
              <h3 className="font-serif text-2xl font-bold text-[#143628]">Cottages & Log House</h3>
              <p className="text-xs text-[#143628]/75 mt-1">9:00 AM Check-in to 9:00 AM Next Day</p>
              
              <div className="mt-4 divide-y divide-[#E8DFCE] text-xs">
                {tariffsAndPackages.overnightCottage.rates.map(tier => (
                  <div key={tier.guests} className="py-2.5 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-[#143628]">{tier.guests} Adult{tier.guests > 1 ? 's' : ''}</span>
                      {tier.guests === 4 && (
                        <span className="block text-[10px] text-[#C25E3E] font-medium">Log House / Other Cottage Only</span>
                      )}
                    </div>
                    <span className="font-serif font-bold text-sm text-[#143628]">₹{tier.rate.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8DFCE] text-xs text-[#8F6C27] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Includes Veg Breakfast, Lunch & Dinner</span>
              </div>
            </Card>

            {/* Camping Overnight Tariff Card */}
            <Card className="p-6">
              <Badge variant="terracotta" className="mb-3">Riverside Camping</Badge>
              <h3 className="font-serif text-2xl font-bold text-[#143628]">Wilderness Tents</h3>
              <p className="text-xs text-[#143628]/75 mt-1">4:00 PM Check-in to 9:00 AM Next Day</p>

              <div className="mt-4 divide-y divide-[#E8DFCE] text-xs">
                {tariffsAndPackages.overnightCamping.rates.map((tier, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center">
                    <span className="font-semibold text-[#143628]">{tier.type}</span>
                    <span className="font-serif font-bold text-sm text-[#143628]">₹{tier.rate.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-semibold text-[#143628]">Child (5–10 yrs)</span>
                  <span className="font-serif font-bold text-sm text-[#143628]">₹750</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8DFCE] text-xs text-[#8F6C27] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Includes Dinner, Breakfast, Bonfire & Shared Bath</span>
              </div>
            </Card>

            {/* Non-Veg Supplements & Evening Preview Card */}
            <Card className="p-6">
              <Badge variant="gold" className="mb-3">Supplements & Day Visits</Badge>
              <h3 className="font-serif text-2xl font-bold text-[#143628]">Add-ons & Day Use</h3>
              <p className="text-xs text-[#143628]/75 mt-1">Enhance your stay or visit for the evening</p>

              <div className="mt-4 divide-y divide-[#E8DFCE] text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <span>Non-Veg Chicken/Fish</span>
                  <span className="font-serif font-bold text-[#143628]">₹150 / meal</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span>Cottage Lunch+Dinner Non-Veg</span>
                  <span className="font-serif font-bold text-[#143628]">₹300 / stay</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span>Cottage Bonfire Hearth</span>
                  <span className="font-serif font-bold text-[#143628]">₹250 / person (min 2)</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span>Evening Pause (4–6 PM)</span>
                  <span className="font-serif font-bold text-[#143628]">₹100 / adult</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8DFCE] text-xs text-[#143628]/70">
                5-tier Evening Under the Stars (₹399 to ₹1,199) & Hourly Stays available.
              </div>
            </Card>

          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
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
              View All Tariffs, Supplements & Events
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
          Sightseeing preview and assistance request
         ========================================================================= */}
      <Section id="sightseeing-preview" background="cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <Heading
                level={2}
                badge="Excursions & Waterfalls"
                align="left"
                subheading="Natural cascades, viewpoints, and forest temples"
              >
                Explore Surrounding Sights
              </Heading>

              <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed">
                Saranda Safari Resort serves as an ideal launchpad to explore the waterfalls and scenic highlights of the Keonjhar–Saranda borderlands. Excursions are arranged via trusted local vehicles with custom quotations.
              </p>

              <div className="space-y-2.5 pt-2">
                {sightseeingContent.destinations.slice(0, 3).map(dest => (
                  <div key={dest.id} className="p-3 bg-white rounded border border-[#E8DFCE] flex justify-between items-center">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#143628]">{dest.name}</h4>
                      <span className="text-[11px] text-[#8F6C27]">{dest.tag}</span>
                    </div>
                    <span className="text-xs text-[#143628]/70">{dest.category}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex items-center gap-3">
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
                  Request Sightseeing Quote
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <Card className="bg-[#F4EFE6] border-[#C5A059]/40 p-8 space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#C25E3E] text-white flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#143628]">Sightseeing Assistance Workflow</h3>
                <p className="text-xs text-[#143628]/80 leading-relaxed">
                  To ensure maximum flexibility, sightseeing trips are not fixed online items. Instead, we coordinate with vetted local drivers to provide clean vehicles, accurate timing around sunset, and fair local quotations.
                </p>

                <div className="border-t border-[#E8DFCE] pt-3 text-xs text-[#8F6C27] font-semibold space-y-1">
                  <div>✓ Kiriburu Sunset Point (Spectacular panoramic hill views)</div>
                  <div>✓ Jhikra & Pacheri Waterfalls (Cool cascading pools)</div>
                  <div>✓ Mirgsingha & Jateshwar Ancient Forest Temples</div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          SECTION 7: GETTING HERE (PREVIEW)
          Getting Here preview and pickup request
         ========================================================================= */}
      <Section id="getting-here-preview" background="cream-deep">
        <Container>
          <Heading
            level={2}
            badge="Travel & Route Guide"
            align="center"
            subheading="Reaching Village Nimture, P.O. Bolani, District Keonjhar, Odisha"
          >
            How to Reach the Resort
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {gettingHereContent.railheads.map((rail, idx) => (
              <Card key={idx} className="p-6">
                <span className="text-xs font-cinzel font-bold text-[#C5A059] block mb-1">Railhead #{idx + 1}</span>
                <h3 className="font-serif text-lg font-bold text-[#143628]">{rail.station}</h3>
                <div className="text-xs text-[#C25E3E] font-semibold mt-0.5">{rail.distance} ({rail.travelTime})</div>
                <p className="text-xs text-[#143628]/75 mt-2 line-clamp-2">{rail.connectivity}</p>
              </Card>
            ))}
          </div>

          <div className="bg-white/80 rounded-lg p-6 border border-[#E8DFCE] max-w-3xl mx-auto text-center space-y-4">
            <h4 className="font-serif text-xl font-bold text-[#143628]">Airports & Private Transfers</h4>
            <p className="text-xs sm:text-sm text-[#143628]/80 max-w-xl mx-auto">
              Nearest connecting airports: <strong>Ranchi</strong>, <strong>Jharsuguda</strong>, and <strong>Bhubaneswar</strong>. Private pickup and drop can be arranged upon advance notice.
            </p>


            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
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
          FAQ preview, official contact details, 100% refund policy reminder
         ========================================================================= */}
      <footer className="bg-[#0E261C] text-[#F9F6F0] pt-16 pb-12 border-t-2 border-[#C5A059]">
        <Container>
          {/* Top Grid: FAQ Highlights & Official Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-[#C5A059]/30">
            
            {/* Left: Brand Identity & Address */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#143628] flex items-center justify-center text-[#C5A059] border border-[#C5A059]/40">
                  <Trees className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-white">{resortInfo.name}</h3>
                  <span className="text-xs text-[#DFCA95] tracking-widest uppercase">{resortInfo.tagline}</span>
                </div>
              </div>

              <p className="text-xs text-[#F9F6F0]/80 leading-relaxed max-w-md">
                Established in 1998, Saranda Safari Resort is an authentic, peaceful retreat situated in Village Nimture along the Karo River in District Keonjhar, Odisha.
              </p>

              <div className="text-xs text-[#DFCA95] space-y-1">
                <div><strong>Address:</strong> {resortInfo.address.fullAddress}</div>
                <div><strong>Desk Hours:</strong> {resortInfo.contact.deskHours}</div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Button
                  variant="terracotta"
                  size="sm"
                  onClick={onOpenBooking}
                  icon={Calendar}
                >
                  Check Availability
                </Button>

                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => onNavigate('contact')}
                >
                  Contact & FAQs
                </Button>
              </div>
            </div>

            {/* Right: Essential FAQs Preview */}
            <div className="lg:col-span-7 space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#DFCA95] mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#C5A059]" />
                Essential Booking & Policy Questions
              </h4>

              <div className="space-y-2 text-xs">
                {faqsAndPolicies.faqs.slice(0, 3).map((faq) => (
                  <div key={faq.id} className="bg-[#143628] rounded p-3 border border-[#C5A059]/20">
                    <span className="font-bold text-[#DFCA95] block">{faq.question}</span>
                    <p className="text-[#F9F6F0]/80 mt-1 line-clamp-2">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between items-center text-xs text-[#DFCA95]">
                <span>Pre-booking for October 2026 onwards • 50% advance to confirm</span>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="underline hover:text-white cursor-pointer"
                >
                  Read all 11 FAQs & Policies →
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Disclaimers & Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F9F6F0]/60 gap-4 text-center sm:text-left">
            <div>
              <p>© {new Date().getFullYear()} {resortInfo.name}. All Rights Reserved. Established 1998.</p>
              <p className="text-[11px] text-[#DFCA95]/70 mt-0.5">
                "{resortInfo.photoDisclaimer}" • {resortInfo.taxDisplayNote}
              </p>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <button type="button" onClick={() => onNavigate('contact')} className="hover:text-white underline">
                100% Resort Refund Policy
              </button>
              <button type="button" onClick={() => onNavigate('contact')} className="hover:text-white underline">
                Pets Policy
              </button>
              <button type="button" onClick={() => onNavigate('the-place')} className="hover:text-white underline">
                Seasons Guide
              </button>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
