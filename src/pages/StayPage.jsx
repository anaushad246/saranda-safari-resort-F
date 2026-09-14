import React from 'react';
import { Home, Trees, Check, X, AlertTriangle, Moon, Shield, Calendar, ArrowRight } from 'lucide-react';
import { Section, Container, Heading, Button, Card, Badge } from '../components/ui/Primitives';
import { stayInventory } from '../content/stayInventory';
import { resortInfo } from '../content/resortInfo';

export function StayPage({ onOpenBooking }) {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-[#0E261C] text-[#F9F6F0] py-16 md:py-24 border-b border-[#C5A059]/30">
        <Container className="text-center max-w-4xl">
          <Badge variant="gold" className="mb-4">Overnight Capacity: Max 25 Guests</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Accommodations & Inventory
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#DFCA95] leading-relaxed max-w-2xl mx-auto">
            Traditional red-and-white brick cottages, an authentic wooden log house, and starlit riverfront camping.
          </p>
        </Container>
      </section>

      {/* Transparent Amenities Audit Section */}
      <Section background="cream-deep">
        <Container>
          <Heading
            level={2}
            badge="Honest & Transparent"
            align="center"
            subheading="Clear expectations for a tranquil, nature-focused retreat"
          >
            Resort Facilities Audit
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Object.entries(resortInfo.amenitiesStatus).map(([key, item]) => (
              <Card key={key} className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  {item.available ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <h4 className="font-serif font-bold text-sm text-[#143628]">{item.title}</h4>
                </div>
                <p className="text-xs text-[#143628]/75 leading-relaxed pl-8">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-[#F4EFE6] border border-[#C5A059]/40 text-center text-xs text-[#143628]/80 italic">
            "{resortInfo.photoDisclaimer}"
          </div>
        </Container>
      </Section>

      {/* Accommodation Inventory Detailed Breakdown */}
      <Section background="cream">
        <Container>
          <Heading
            level={2}
            badge="Unit Details & Rules"
            align="center"
            subheading="Review capacity guidelines, bed types, and inclusions"
          >
            The Four Accommodation Choices
          </Heading>

          <div className="space-y-12">
            {stayInventory.units.map((unit) => (
              <Card key={unit.id} className="p-8 md:p-10 border-[#C5A059]/40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Details */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant={unit.type === 'camping' ? 'terracotta' : 'gold'}>
                        {unit.tag}
                      </Badge>
                      <span className="text-xs font-semibold text-[#8F6C27]">
                        {unit.unitCount} Unit(s) Available
                      </span>
                      <span className="text-xs text-[#143628]/70">
                        • {unit.timings}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#143628]">
                      {unit.name}
                    </h3>

                    <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed">
                      {unit.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm">
                      <div className="bg-[#F9F6F0] p-3 rounded border border-[#E8DFCE]">
                        <span className="font-bold text-[#143628] block">Bedding:</span>
                        <span className="text-[#143628]/80 mt-0.5 block">{unit.bedConfiguration}</span>
                      </div>
                      <div className="bg-[#F9F6F0] p-3 rounded border border-[#E8DFCE]">
                        <span className="font-bold text-[#143628] block">Bathroom:</span>
                        <span className="text-[#143628]/80 mt-0.5 block">{unit.bathroom}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs uppercase font-semibold text-[#8F6C27] block mb-2">Unit Inclusions & Features:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#143628]/80">
                        {unit.amenities.map((am, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>{am}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pricing & Strict Capacity Guard */}
                  <div className="lg:col-span-4 bg-[#F4EFE6] rounded-lg p-6 border border-[#E8DFCE] flex flex-col justify-between space-y-4">
                    <div>
                      <div className="border-b border-[#E8DFCE] pb-3 mb-3">
                        <span className="text-xs uppercase tracking-wider font-semibold text-[#8F6C27] block">
                          Official Tariff Schedule
                        </span>
                        <span className="text-[11px] text-emerald-800 font-medium">
                          {unit.mealInclusion}
                        </span>
                      </div>

                      {unit.type === 'camping' ? (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Per Person:</span>
                            <span className="font-bold text-[#143628]">₹1,499</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Couple:</span>
                            <span className="font-bold text-[#143628]">₹2,999</span>
                          </div>
                          <div className="text-[11px] text-[#143628]/70 pt-1">
                            Tent 1: 2 Guests • Tent 2: 3 Guests (Total 5 Camping)
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>1 Adult:</span>
                            <span className="font-bold text-[#143628]">₹3,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>2 Adults:</span>
                            <span className="font-bold text-[#143628]">₹4,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span>3 Adults:</span>
                            <span className="font-bold text-[#143628]">₹5,400</span>
                          </div>
                          {unit.pricingTiers[4] ? (
                            <div className="flex justify-between border-t border-[#E8DFCE] pt-1.5 text-[#143628]">
                              <span className="font-semibold">4 Adults:</span>
                              <span className="font-bold text-[#143628]">₹6,600</span>
                            </div>
                          ) : (
                            <div className="border-t border-[#E8DFCE] pt-1.5 text-[11px] text-red-700 font-semibold">
                              Strict Capacity: 3 Guests Max (4th guest prohibited)
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-4 pt-3 border-t border-[#E8DFCE] text-xs text-[#143628]/75 space-y-1">
                        <div>• Children &lt;5: Free</div>
                        <div>• Children 5–10: {unit.type === 'camping' ? '₹750' : '₹700'}</div>
                      </div>
                    </div>

                    <Button
                      variant="terracotta"
                      size="md"
                      onClick={onOpenBooking}
                      className="w-full"
                      icon={Calendar}
                    >
                      Book This Unit
                    </Button>
                  </div>

                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg bg-[#143628] text-[#F9F6F0] text-center max-w-2xl mx-auto space-y-2">
            <h4 className="font-serif text-lg font-bold text-[#DFCA95]">Inventory Policy Notice</h4>
            <p className="text-xs text-[#F9F6F0]/85">
              {stayInventory.inventoryNote}
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
