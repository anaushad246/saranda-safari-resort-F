import React from 'react';
import { 
  Sparkles,
  Calendar, 
  ArrowRight, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { Container, Button, Badge } from '../components/ui/Primitives';
import { experiencesContent } from '../content/experiences';

export function ExperiencesPage({ onOpenBooking, onNavigate }) {
  return (
    <div className="w-full bg-[#FDFBF7]">
      {/* Editorial Hero Header */}
      <section className="relative bg-[#0E261C] text-[#F9F6F0] py-10 sm:py-14 border-b border-[#C5A059]/30 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <Container className="relative z-10 text-center max-w-4xl px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/35 text-[#E5C378] text-[11px] uppercase tracking-widest font-cinzel font-semibold mb-3">
            <Sparkles className="w-3 h-3 text-[#E5C378]" />
            <span>Curated Nature Living</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            {experiencesContent.sectionTitle}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#DFCA95] font-light leading-relaxed max-w-2xl mx-auto">
            {experiencesContent.tagline}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm text-[#DFCA95]/85 font-serif italic">
            <span>90+ Bird Species</span>
            <span>•</span>
            <span>Karo Riverbank</span>
            <span>•</span>
            <span>Starry Skies</span>
            <span>•</span>
            <span>Seasonal Forest Rhythms</span>
          </div>
        </Container>
      </section>

      {/* Compact Intro Strip */}
      <div className="bg-[#F4ECE1]/60 border-b border-[#EADFC9]/70 py-3">
        <Container className="max-w-7xl px-4 sm:px-6 text-center">
          <p className="text-xs sm:text-sm text-[#143628]/85 italic font-serif">
            “Every quiet stroll offers the joy of a new discovery. Settle into the natural rhythms of the forest.”
          </p>
        </Container>
      </div>

      {/* Main Experiences Grid (3 Cards per Row on Desktop) */}
      <section className="py-8 sm:py-12 lg:py-14">
        <Container className="max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {experiencesContent.experiences.map((exp) => (
              <article 
                key={exp.id}
                className="bg-white rounded-xl overflow-hidden border border-[#EADFC9]/80 shadow-[0_2px_12px_rgba(20,54,40,0.04)] hover:shadow-[0_8px_24px_rgba(20,54,40,0.08)] transition-all duration-300 flex flex-col group"
              >
                {/* Visual Photograph Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0E261C]/5">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Badge: Number */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-[#0E261C]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#C5A059]/40 shadow-sm">
                    <span className="font-cinzel text-xs font-bold text-[#E5C378]">
                      {exp.number}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                    <span className="text-[10px] uppercase tracking-wider text-[#F9F6F0]/90 font-medium font-cinzel">
                      Signature Experience
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-[#143628] tracking-tight group-hover:text-[#B38F46] transition-colors leading-snug">
                      {exp.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-[13.5px] text-[#143628]/80 leading-relaxed font-light">
                      {exp.description}
                    </p>
                    {exp.pricing && (
                      <div className="mt-3 inline-block px-2.5 py-1 rounded bg-[#F4EFE6] border border-[#E8DFCE] text-[11px] font-semibold text-[#8F6C27]">
                        {exp.pricing}
                      </div>
                    )}
                    {exp.note && (
                      <p className="mt-2 text-[11px] text-[#8F6C27] italic font-serif">
                        ({exp.note})
                      </p>
                    )}
                  </div>

                  {/* Card Footer Bar */}
                  <div className="mt-5 pt-3 border-t border-[#EADFC9]/60 flex items-center justify-between text-xs text-[#8F6C27]">
                    <span className="flex items-center gap-1.5 font-medium text-[#143628]/75">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#143628]/60" />
                      Resort Experience
                    </span>
                    <span className="font-cinzel text-[10px] font-semibold text-[#8F6C27] tracking-widest uppercase">
                      Saranda Rhythms
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Official Safety and Advisory Note */}
          <div className="mt-10 sm:mt-12 rounded-xl bg-[#FFF8E7] border border-[#EAD7A1] p-5 sm:p-6 text-[#785418] shadow-xs flex flex-col sm:flex-row items-start gap-4">
            <div className="p-2 rounded-lg bg-[#EAD7A1]/40 text-[#8F6C27] shrink-0 mt-0.5">
              <Info className="w-5 h-5 text-[#8F6C27]" />
            </div>
            <div className="flex-1 text-xs sm:text-[13px] leading-relaxed">
              <span className="font-bold text-[#5c3e0f] block text-sm mb-1 font-serif">
                Experience Note & Safety Guidance:
              </span>
              <p className="text-[#6d4d16]">
                {experiencesContent.note}
              </p>
            </div>
          </div>

          {/* Bottom Invitation Banner */}
          <div className="mt-8 sm:mt-10 rounded-2xl bg-[#0E261C] border border-[#C5A059]/40 p-6 sm:p-8 text-center text-[#F9F6F0] relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="relative z-10 max-w-xl mx-auto space-y-3">
              <Badge variant="gold" className="uppercase tracking-widest text-[10px] py-0.5">
                Your Sanctuary Awaits
              </Badge>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                Ready to Experience Saranda?
              </h2>
              <p className="text-xs sm:text-sm text-[#DFCA95] leading-relaxed font-light">
                Wake to river birdsong, wander through fruit orchards, and gather under starlit forest skies. Choose between peaceful cottages and wilderness camping.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  variant="terracotta"
                  size="md"
                  onClick={onOpenBooking}
                  icon={Calendar}
                  className="w-full sm:w-auto text-xs py-2 px-4"
                >
                  Check Availability & Reserve
                </Button>
                {onNavigate && (
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => onNavigate('stay')}
                    icon={ArrowRight}
                    className="w-full sm:w-auto text-xs py-2 px-4 !border-[#C5A059] !text-[#DFCA95] hover:!bg-[#C5A059]/20"
                  >
                    View Stay Packages
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
