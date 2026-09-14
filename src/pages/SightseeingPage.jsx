import React from 'react';
import { MapPin, Calendar, Clock, Compass, Shield, ArrowRight } from 'lucide-react';
import { Section, Container, Heading, Button, Card, Badge } from '../components/ui/Primitives';
import { sightseeingContent } from '../content/sightseeing';

export function SightseeingPage({ onOpenSightseeing }) {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-[#0E261C] text-[#F9F6F0] py-16 md:py-24 border-b border-[#C5A059]/30">
        <Container className="text-center max-w-4xl">
          <Badge variant="gold" className="mb-4">Local Excursions & Waterfalls</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Sightseeing & Regional Highlights
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#DFCA95] leading-relaxed max-w-2xl mx-auto">
            {sightseeingContent.sectionSubtitle}
          </p>
        </Container>
      </section>

      {/* Workflow Explanation Banner */}
      <Section background="cream-deep">
        <Container className="max-w-4xl">
          <Card className="p-8 border-[#C5A059]/50 bg-white shadow-sm space-y-3 text-center">
            <div className="w-10 h-10 rounded-full bg-[#C25E3E] text-white flex items-center justify-center mx-auto">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#143628]">Enquiry-Led Transport Assistance</h3>
            <p className="text-xs sm:text-sm text-[#143628]/80 max-w-2xl mx-auto leading-relaxed">
              {sightseeingContent.processNotice}
            </p>
            <div className="pt-2">
              <Button
                variant="terracotta"
                size="md"
                onClick={onOpenSightseeing}
                icon={MapPin}
              >
                Request Custom Sightseeing Quotation
              </Button>
            </div>
          </Card>
        </Container>
      </Section>

      {/* All Verified Destinations Grid */}
      <Section background="cream">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sightseeingContent.destinations.map((dest) => (
              <Card key={dest.id} className="p-8 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-[#E8DFCE] pb-3 mb-4">
                    <Badge variant="gold">{dest.category}</Badge>
                    <span className="text-xs font-semibold text-[#8F6C27]">{dest.tag}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#143628]">
                    {dest.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#143628]/85 leading-relaxed mt-2">
                    {dest.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#E8DFCE] space-y-1.5 text-xs text-[#143628]/75">
                    <div>
                      <strong className="text-[#143628]">Distance/Drive:</strong> {dest.distanceNote}
                    </div>
                    <div>
                      <strong className="text-[#143628]">Best Season:</strong> {dest.bestTime}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8DFCE]">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {dest.highlights.map((h, i) => (
                      <span key={i} className="text-[11px] bg-[#F4EFE6] text-[#143628] px-2 py-0.5 rounded border border-[#E8DFCE]">
                        • {h}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={onOpenSightseeing}
                  >
                    Include in Excursion Quote
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
