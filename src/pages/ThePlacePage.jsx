import React, { useState } from 'react';
import { Trees, Calendar, Sun, CloudRain, Wind, Droplets, ArrowRight } from 'lucide-react';
import { Section, Container, Heading, Button, Card, Badge } from '../components/ui/Primitives';
import { thePlaceContent } from '../content/thePlace';
import { resortInfo } from '../content/resortInfo';

export function ThePlacePage({ onOpenBooking, onNavigate }) {
  const [activeSeason, setActiveSeason] = useState(0);

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-[#0E261C] text-[#F9F6F0] py-16 md:py-24 border-b border-[#C5A059]/30">
        <Container className="text-center max-w-4xl">
          <Badge variant="gold" className="mb-4">Village Nimture, Bolani, Keonjhar (Estd. 1998)</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            The Place & Setting
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#DFCA95] leading-relaxed max-w-2xl mx-auto">
            Where the river flows, birds sing, and life slows down.
          </p>
        </Container>
      </section>

      {/* Main Narrative */}
      <Section background="cream">
        <Container className="max-w-4xl">
          <Heading
            level={2}
            badge="Origin & Geography"
            align="left"
            subheading="Over two decades of quiet presence along the Karo riverbank"
          >
            {thePlaceContent.fullStory.heading}
          </Heading>

          <div className="space-y-6 text-base sm:text-lg text-[#143628]/85 leading-relaxed">
            {thePlaceContent.fullStory.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-lg bg-[#F4EFE6] border border-[#C5A059]/50 text-xs sm:text-sm text-[#143628] italic">
            "{resortInfo.photoDisclaimer}"
          </div>
        </Container>
      </Section>

      {/* Natural Highlights Grid */}
      <Section background="cream-deep">
        <Container>
          <Heading
            level={2}
            badge="The Landscape"
            align="center"
            subheading="Distinct natural features that shape life at Saranda"
          >
            Elements of the Property
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {thePlaceContent.highlights.map((item, idx) => (
              <Card key={idx} className="p-8 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#143628] text-[#C5A059] flex items-center justify-center font-cinzel font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#143628]">{item.title}</h3>
                <p className="text-sm text-[#143628]/80 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* =========================================================================
          THE COMPLETE 5-BLOCK SEASONS SECTION
          (Natural home: The Place page)
         ========================================================================= */}
      <Section id="seasons" background="cream">
        <Container>
          <Heading
            level={2}
            badge="Forest Calendar"
            align="center"
            subheading="Understanding how the hills, river, and sal trees transform throughout the year"
          >
            The Five Seasons of Saranda
          </Heading>

          {/* Season Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {thePlaceContent.seasons.map((season, idx) => (
              <button
                key={season.id}
                type="button"
                onClick={() => setActiveSeason(idx)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeSeason === idx
                    ? 'bg-[#143628] text-[#F9F6F0] shadow-sm'
                    : 'bg-white text-[#143628] border border-[#E8DFCE] hover:border-[#C5A059]'
                }`}
              >
                {season.title} ({season.months.split(' ')[0]})
              </button>
            ))}
          </div>

          {/* Active Season Highlight Card */}
          {(() => {
            const season = thePlaceContent.seasons[activeSeason];
            return (
              <Card className="max-w-4xl mx-auto p-8 md:p-10 border-[#C5A059]/60 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DFCE] pb-4 mb-6">
                  <div>
                    <Badge variant="gold" className="mb-2">{season.badge}</Badge>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#143628]">{season.title}</h3>
                  </div>
                  <span className="font-sans text-sm sm:text-base font-semibold text-[#8F6C27] bg-[#F4EFE6] px-3.5 py-1.5 rounded-full border border-[#C5A059]/40 self-start">
                    {season.months}
                  </span>
                </div>

                <p className="text-base sm:text-lg font-serif italic text-[#143628] mb-4">
                  "{season.summary}"
                </p>

                <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed mb-6">
                  {season.description}
                </p>

                <div className="border-t border-[#E8DFCE] pt-4">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#8F6C27] block mb-2">
                    Key Seasonal Highlights:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {season.highlights.map((h, i) => (
                      <div key={i} className="text-xs sm:text-sm font-medium text-[#143628] bg-[#F9F6F0] p-2.5 rounded border border-[#E8DFCE] text-center">
                        • {h}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })()}

          <div className="mt-12 text-center">
            <Button
              variant="terracotta"
              size="lg"
              onClick={onOpenBooking}
              icon={Calendar}
            >
              Check Availability for October 2026 Season
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
