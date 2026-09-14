import React from 'react';
import { Sparkles, Utensils, Moon, Clock, Calendar, Check, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import { Section, Container, Heading, Button, Card, Badge } from '../components/ui/Primitives';
import { tariffsAndPackages } from '../content/tariffsAndPackages';
import { resortInfo } from '../content/resortInfo';

export function PackagesPage({ onOpenBooking, onOpenEvent }) {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-[#0E261C] text-[#F9F6F0] py-16 md:py-24 border-b border-[#C5A059]/30">
        <Container className="text-center max-w-4xl">
          <Badge variant="gold" className="mb-4">Standard Packages Include Vegetarian Meals</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Tariffs & Packages
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#DFCA95] leading-relaxed max-w-2xl mx-auto">
            Transparent pricing with no hidden charges. Non-veg supplements, day visits, and private gatherings.
          </p>
        </Container>
      </section>

      {/* 1. Overnight Tariffs Section */}
      <Section background="cream">
        <Container>
          <Heading
            level={2}
            badge="Standard Overnight Stays"
            align="center"
            subheading="Check-in 9 AM (Cottages) | Check-in 4 PM (Camping) • All 3 meals included"
          >
            Overnight Accommodation Tariffs
          </Heading>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Cottage Table */}
            <Card className="p-8">
              <div className="flex items-center justify-between border-b border-[#E8DFCE] pb-3 mb-4">
                <h3 className="font-serif text-2xl font-bold text-[#143628]">{tariffsAndPackages.overnightCottage.title}</h3>
                <Badge variant="forest">9 AM – 9 AM</Badge>
              </div>

              <div className="divide-y divide-[#E8DFCE] text-sm">
                {tariffsAndPackages.overnightCottage.rates.map(tier => (
                  <div key={tier.guests} className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-[#143628]">{tier.guests} Guest{tier.guests > 1 ? 's' : ''}</span>
                      <span className="block text-xs text-[#143628]/70">{tier.note}</span>
                    </div>
                    <span className="font-serif font-bold text-lg text-[#143628]">₹{tier.rate.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DFCE] bg-[#F4EFE6] p-4 rounded-lg space-y-2 text-xs text-[#143628]">
                <div className="font-semibold text-[#8F6C27]">Children's Policy:</div>
                {tariffsAndPackages.overnightCottage.childrenRates.map((cr, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{cr.ageGroup}:</span>
                    <span className="font-bold">{cr.label}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Camping Table */}
            <Card className="p-8">
              <div className="flex items-center justify-between border-b border-[#E8DFCE] pb-3 mb-4">
                <h3 className="font-serif text-2xl font-bold text-[#143628]">{tariffsAndPackages.overnightCamping.title}</h3>
                <Badge variant="terracotta">4 PM – 9 AM</Badge>
              </div>

              <div className="divide-y divide-[#E8DFCE] text-sm">
                {tariffsAndPackages.overnightCamping.rates.map((tier, idx) => (
                  <div key={idx} className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-[#143628]">{tier.type}</span>
                    </div>
                    <span className="font-serif font-bold text-lg text-[#143628]">₹{tier.rate.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="py-3 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-[#143628]">Child (Ages 5–10)</span>
                    <span className="block text-xs text-[#143628]/70">Includes meals & shared facilities</span>
                  </div>
                  <span className="font-serif font-bold text-lg text-[#143628]">₹750</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DFCE] bg-[#F4EFE6] p-4 rounded-lg space-y-1 text-xs text-[#143628]">
                <div className="font-semibold text-[#8F6C27]">Camping Inclusions:</div>
                <p>Includes vegetarian dinner, breakfast, evening campfire, clean shared bath/toilets.</p>
                <p className="text-[11px] text-[#143628]/70 mt-1">
                  Couple tariff is strictly ₹2,999.
                </p>
              </div>
            </Card>

          </div>

          {/* Cottage Bonfire Add-on Card */}
          <div className="max-w-xl mx-auto bg-white p-5 rounded-lg border border-[#C5A059]/40 flex items-center justify-between gap-4">
            <div>
              <h4 className="font-serif font-bold text-sm text-[#143628]">Cottage Evening Bonfire Hearth</h4>
              <p className="text-xs text-[#143628]/75 mt-0.5">{tariffsAndPackages.overnightCottage.bonfireAddon.note}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="font-serif font-bold text-lg text-[#143628]">₹250</span>
              <span className="text-xs text-[#143628]/70 block">per person (min 2)</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. Official Non-Veg Supplements Table */}
      <Section background="cream-deep">
        <Container className="max-w-4xl">
          <Heading
            level={2}
            badge="Dining Options"
            align="center"
            subheading="Default meals are vegetarian; non-vegetarian additions are prepared fresh on request"
          >
            {tariffsAndPackages.nonVegSupplements.title}
          </Heading>

          <p className="text-sm text-[#143628]/85 text-center max-w-2xl mx-auto mb-8">
            {tariffsAndPackages.nonVegSupplements.description}
          </p>

          <Card className="p-8">
            <div className="divide-y divide-[#E8DFCE]">
              {tariffsAndPackages.nonVegSupplements.items.map((item, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#143628]">{item.item}</h4>
                    <p className="text-xs text-[#143628]/75 mt-0.5">{item.description}</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="font-serif font-bold text-base text-[#C25E3E]">
                      {item.price ? `₹${item.price}` : 'Separate Quote'}
                    </span>
                    <span className="text-xs text-[#143628]/70 block">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </Section>

      {/* 3. Day Visits & Evening Packages */}
      <Section background="cream">
        <Container>
          <Heading
            level={2}
            badge="Short Visits & Evenings"
            align="center"
            subheading="Experience the riverfront lawn and open bonfires without staying overnight"
          >
            Evening Packages & Day Use
          </Heading>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* An Evening Pause in Nature */}
            <Card className="p-8">
              <Badge variant="gold" className="mb-3">4:00 PM – 6:00 PM</Badge>
              <h3 className="font-serif text-2xl font-bold text-[#143628]">{tariffsAndPackages.eveningNatureVisit.title}</h3>
              <p className="text-xs text-[#143628]/75 mt-1">{tariffsAndPackages.eveningNatureVisit.experience}</p>

              <div className="mt-4 divide-y divide-[#E8DFCE] text-sm">
                {tariffsAndPackages.eveningNatureVisit.pricing.map((p, i) => (
                  <div key={i} className="py-2 flex justify-between">
                    <span>{p.category}</span>
                    <span className="font-bold text-[#143628]">{p.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded bg-amber-50 border border-amber-300 text-xs text-amber-950">
                {tariffsAndPackages.eveningNatureVisit.pendingClarification}
              </div>
            </Card>

            {/* Evening Under the Stars (5 Discrete Tiers) */}
            <Card className="p-8">
              <Badge variant="forest" className="mb-3">6:00 PM – 11:00 PM</Badge>
              <h3 className="font-serif text-2xl font-bold text-[#143628]">{tariffsAndPackages.eveningUnderTheStars.title}</h3>
              <p className="text-xs text-[#143628]/75 mt-1">{tariffsAndPackages.eveningUnderTheStars.description}</p>

              <div className="mt-4 space-y-2 text-xs">
                {tariffsAndPackages.eveningUnderTheStars.tiers.map(t => (
                  <div key={t.tier} className="p-2.5 rounded bg-[#F9F6F0] border border-[#E8DFCE] flex justify-between items-center">
                    <div>
                      <span className="font-bold text-[#143628]">Tier {t.tier}: {t.name}</span>
                      <span className="block text-[11px] text-[#143628]/70 mt-0.5">{t.includes}</span>
                    </div>
                    <span className="font-serif font-bold text-sm text-[#C25E3E] shrink-0 ml-2">₹{t.rate} / person</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs text-[#8F6C27] font-medium border-t border-[#E8DFCE] pt-2">
                {tariffsAndPackages.eveningUnderTheStars.dinnerAddonOption.note}
              </div>
            </Card>

          </div>

          {/* Hourly Day Stays [P] */}
          <div className="bg-[#F4EFE6] rounded-xl p-8 border border-[#E8DFCE] mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <Badge variant="neutral">6-Hour Cottage Day-Use</Badge>
                <h3 className="font-serif text-2xl font-bold text-[#143628] mt-1">{tariffsAndPackages.hourlyStays.title}</h3>
              </div>
              <span className="text-xs text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 font-semibold self-start">
                Enquiry-Led Only
              </span>
            </div>

            <p className="text-xs text-[#143628]/80 mb-6">
              {tariffsAndPackages.hourlyStays.statusNote}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {tariffsAndPackages.hourlyStays.tiers.map((t, i) => (
                <div key={i} className="bg-white p-4 rounded border border-[#E8DFCE] text-center">
                  <span className="text-xs uppercase text-[#8F6C27] font-semibold block">{t.range}</span>
                  <span className="font-serif text-xl font-bold text-[#143628] mt-1 block">{t.label}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E8DFCE] pt-3 flex flex-wrap gap-4 text-xs text-[#143628]/80">
              {tariffsAndPackages.hourlyStays.extras.map((ex, idx) => (
                <span key={idx}>• {ex.item}: <strong>₹{ex.rate}</strong> ({ex.unit})</span>
              ))}
            </div>
          </div>

          {/* Event Venue Hire [P] */}
          <div className="bg-[#0E261C] text-[#F9F6F0] rounded-xl p-8 md:p-10 border border-[#C5A059]/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C5A059]/30 pb-4 mb-6">
              <div>
                <Badge variant="gold" className="mb-2">Private Gatherings</Badge>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">{tariffsAndPackages.eventVenue.title}</h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-[#DFCA95] block uppercase font-medium">Indicative Venue Range</span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#DFCA95]">{tariffsAndPackages.eventVenue.indicativeRange}</span>
              </div>
            </div>

            <div className="bg-amber-900/30 border border-amber-500/40 rounded-lg p-4 mb-6 flex items-start gap-3 text-xs text-amber-200">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-white">Critical Capacity Notice:</strong>
                <p className="mt-0.5">{tariffsAndPackages.eventVenue.criticalCapacityWarning}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#F9F6F0]/80 mb-6">
              <div>• <strong>Pre-Booking:</strong> {tariffsAndPackages.eventVenue.preBookingRequirement}</div>
              <div>• <strong>Payment Terms:</strong> {tariffsAndPackages.eventVenue.paymentTerms}</div>
              {tariffsAndPackages.eventVenue.extras.map((ex, idx) => (
                <div key={idx}>• <strong>{ex.item}:</strong> {ex.rate} ({ex.unit})</div>
              ))}
            </div>

            <div className="pt-2 text-center sm:text-right">
              <Button
                variant="terracotta"
                size="md"
                onClick={onOpenEvent}
                icon={Sparkles}
              >
                Request Event Quotation
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-[#143628]/70">
            {tariffsAndPackages.taxPolicyNote}
          </div>
        </Container>
      </Section>
    </div>
  );
}
