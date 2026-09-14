import React from 'react';
import { Compass, AlertTriangle, Clock, MapPin, Shield, Calendar, ArrowRight } from 'lucide-react';
import { Section, Container, Heading, Button, Card, Badge } from '../components/ui/Primitives';
import { experiencesContent } from '../content/experiences';

export function ExperiencesPage({ onOpenBooking, onNavigate }) {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-[#0E261C] text-[#F9F6F0] py-16 md:py-24 border-b border-[#C5A059]/30">
        <Container className="text-center max-w-4xl">
          <Badge variant="gold" className="mb-4">Nature • Adventure • Stillness</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Ten Curated Experiences
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#DFCA95] leading-relaxed max-w-2xl mx-auto">
            {experiencesContent.tagline}
          </p>
        </Container>
      </section>

      {/* Full 10 Experiences Grid */}
      <Section background="cream">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiencesContent.experiences.map((exp) => (
              <Card key={exp.id} className="p-8 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-[#E8DFCE] pb-3 mb-4">
                    <span className="font-cinzel text-sm font-bold text-[#C5A059]">
                      Experience #{exp.number}
                    </span>
                    <Badge variant={exp.id === 4 ? 'terracotta' : 'neutral'}>
                      {exp.category}
                    </Badge>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#143628]">
                    {exp.title}
                  </h3>

                  <p className="text-sm text-[#143628]/85 leading-relaxed mt-3">
                    {exp.fullDescription}
                  </p>

                  {/* MANDATORY SAFETY WARNING FOR EXPERIENCE #4 */}
                  {exp.safetyWarning && (
                    <div className="mt-4 p-3.5 rounded-lg bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold block">Safety Guideline & Advisory:</strong>
                        <span className="leading-relaxed mt-0.5 block">{exp.safetyWarning}</span>
                      </div>
                    </div>
                  )}

                  {exp.safetyNote && (
                    <div className="mt-3 text-xs text-[#8F6C27] flex items-center gap-1.5 font-medium">
                      <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{exp.safetyNote}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#E8DFCE] flex items-center justify-between text-xs text-[#8F6C27]">
                  <span className="font-semibold">{exp.tag}</span>
                  <span className="text-[#143628]/70">Village Nimture, Bolani</span>
                </div>
              </Card>

            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              variant="terracotta"
              size="lg"
              onClick={onOpenBooking}
              icon={Calendar}
            >
              Plan Your Experiences & Check Availability
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
