import React, { useState } from 'react';
import { Calendar, ArrowRight, Sparkles, Feather, Compass, Heart } from 'lucide-react';
import { Section, Container, Heading, Button, Card, Badge } from '../components/ui/Primitives';
import { thePlaceContent } from '../content/thePlace';
import { resortInfo } from '../content/resortInfo';


const chronologicalSeasons = [
  {
    id: "autumn",
    title: "Autumn",
    months: "October – November",
    badge: "Season Opening",
    summary: "Post-monsoon freshness, sparkling river waters, and comfortable weather.",
    description: "Following the rainy season, the air is clean and the Karo River runs clear. Temperatures are comfortable throughout the day and evening, marking the start of the primary travel season.",
    highlights: ["Clear river waters", "Clean post-rain air", "Comfortable daytime walks"],
    accentBorder: "border-l-amber-600"
  },
  {
    id: "winter",
    title: "Winter",
    months: "December – January",
    badge: "Campfires & Clear Skies",
    summary: "Crisp mornings, warm sun through the trees, evening bonfires, and active birdlife.",
    description: "Winter brings distinctly chilly mornings and nights to the Keonjhar hills, contrasted with warm, clear sunny afternoons. Campfires on the riverfront lawn become the gathering point after dusk, and bird activity in the mango orchards and sal trees is at its peak.",
    highlights: ["Evening campfires", "Active bird watching", "Pleasant daytime trails"],
    accentBorder: "border-l-slate-400"
  },
  {
    id: "spring",
    title: "Late winter & spring",
    months: "February – March",
    badge: "Foliage Transition",
    summary: "Sal leaf fall in February followed by the emergence of fresh new foliage.",
    description: "A distinctive phase in the sal forest: February brings widespread leaf-fall, covering the forest trails in dry, rustling leaves. Shortly after, the sal trees sprout tender new foliage in shades of light green and bronze, renewing the canopy.",
    highlights: ["Fallen leaf carpet", "Fresh emerging foliage", "Mild pleasant days"],
    accentBorder: "border-l-emerald-600"
  },
  {
    id: "summer",
    title: "Summer",
    months: "April – June",
    badge: "River Breezes & Shade",
    summary: "Cool morning river breezes, deep shade beneath mango trees, and vibrant sunsets.",
    description: "While afternoons can be warm across the plateau, the proximity of the Karo River and the dense canopy of mature mango orchards offer cool, shaded spots for rest. Early mornings and late evenings remain gentle and pleasant.",
    highlights: ["Riverside relaxation", "Shady mango orchard", "Kiriburu hill sunsets"],
    accentBorder: "border-l-amber-500"
  },
  {
    id: "monsoon",
    title: "Monsoon",
    months: "July – September",
    badge: "Lush Hills & Waterfalls",
    summary: "Lush green landscape and full-flow cascades across the seven hundred hills.",
    description: "The rains bring out the deep emerald green of the sal forests, and nearby cascades like Jhikra and Pacheri waterfalls run with vigour. Note: River bathing in the Karo is strictly prohibited during high monsoon flows for guest safety.",
    highlights: ["Vibrant forest green", "Waterfalls in full flow", "Misty hill views"],
    accentBorder: "border-l-emerald-700"
  }
];

export function ThePlacePage({ onOpenBooking, onNavigate }) {
  const [activeSeason, setActiveSeason] = useState(0);

  return (
    <div className="w-full bg-[#F9F6F0]">
      {/* Page Header */}
      <section className="bg-[#0E261C] text-[#F9F6F0] py-12 sm:py-16 border-b border-[#C5A059]/30">
        <Container className="text-center max-w-4xl">
          <Badge variant="gold" className="mb-3">Village Nimture, Bolani, Keonjhar</Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            The Place &amp; Our Story
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#DFCA95] leading-relaxed max-w-2xl mx-auto font-serif italic">
            Where the forest whispers, wildlife stories unfold, and time slows down.
          </p>
        </Container>
      </section>

      {/* =========================================================================
          1. DESCRIPTION ABOUT THE PLACE
         ========================================================================= */}
      <Section id="about-the-place" background="cream" className="!py-10 sm:!py-14">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-4 text-[#143628]">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8F6C27]">
                  The Setting &amp; Rhythms
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                  Where the Forest Whispers and Time Slows
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed font-sans">
                Near the gentle waters of the Karo River, in the green embrace of the Saranda hills, mornings begin with birdsong. Chirps, whistles and gentle calls drift through the trees—a morning chorus from a world waking beyond your window. With <strong>90 bird species</strong> recorded on our grounds, every quiet stroll offers birdwatchers the joy of a new discovery.
              </p>

              <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed font-sans">
                Winter arrives wrapped in mist, draping the cottages and mango trees in a soft veil. Breathe in the fresh air, far from the city’s smoke and hurry, and warm your hands around a cup of tea as sunlight slowly finds its way through the fog.
              </p>

              <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed font-sans">
                Spring paints the forest canopy in changing shades of tender green, copper and gold. Nearby, the gurgle of flowing water accompanies unhurried afternoons, inviting you to pause, listen and stay a little longer.
              </p>

              <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed font-sans">
                When darkness settles, fireflies flicker among the trees like fallen stars finding their way home. Beneath the open sky, the warmth of a bonfire and the quiet murmur of conversation bring the day to a gentle close.
              </p>

              <p className="font-serif italic text-base sm:text-lg text-[#8F6C27] pt-1">
                “Come to Saranda Safari Resort—where mornings have a melody, seasons have their colours, and nights hold a little magic.”
              </p>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#E8DFCE] relative group">
                <img
                  src="/placemorningmist.webp"
                  alt="Morning mist along Karo River"
                  className="w-full h-80 lg:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#143628]/90 backdrop-blur-xs text-white p-3 rounded-xl text-xs border border-[#C5A059]/40">
                  <span className="font-serif font-bold text-[#DFCA95] block">Mornings on the Karo</span>
                  <span className="text-white/80 text-[11px]">90 recorded bird species &amp; misty riverfront sunrises</span>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* =========================================================================
          2. ABOUT US — WHERE WILDLIFE STORIES UNFOLD
         ========================================================================= */}
      <Section id="about-us" background="cream-deep" className="!py-10 sm:!py-14 border-t border-[#E8DFCE]">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Photo (Desktop) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#E8DFCE] relative group">
                <img
                  src="/placewildlife.png"
                  alt="Tea and binoculars on the verandah"
                  className="w-full h-80 lg:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#143628]/90 backdrop-blur-xs text-white p-3 rounded-xl text-xs border border-[#C5A059]/40">
                  <span className="font-serif font-bold text-[#DFCA95] block">Estd. 1998 in Nimture</span>
                  <span className="text-white/80 text-[11px]">Over two decades of quiet presence &amp; wildlife encounters</span>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 space-y-4 text-[#143628] order-1 lg:order-2">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8F6C27]">
                  Our Heritage &amp; Roots
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                  About Us — Where Wildlife Stories Unfold
                </h2>
              </div>

              <p className="text-sm sm:text-base font-medium text-[#143628] leading-relaxed">
                Every place has a story. At Saranda Safari Resort, many of ours begin with a wild visitor!
              </p>

              <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed font-sans">
                Once a farmhouse surrounded by agricultural fields, the property became <strong>Saranda Safari Resort in 1998</strong>. Over the years, our family has gathered stories of passing elephants, unexpected encounters with deer and wild boar, Indian rock pythons, and elusive leopards—each adding a little adventure to life beside the Karo River.
              </p>

              <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed font-sans">
                Today, chirping birds welcome the morning, winter mist drifts through the grounds, and spring dresses the forest canopy in colour. With <strong>90 bird species</strong> recorded on our grounds, a pair of binoculars and a little patience can turn a quiet morning into a delightful discovery. As evening falls, gurgling water and flickering fireflies lend their own magic to the setting.
              </p>

              <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed font-sans">
                And the wildlife stories? Those are best shared here, over a warm cup of tea.
              </p>

              <p className="font-serif italic text-base sm:text-lg text-[#8F6C27] pt-1">
                “Come, stay a while. Let Saranda unfold its stories.”
              </p>
            </div>

          </div>
        </Container>
      </Section>

      {/* =========================================================================
          3. WHY VISIT US — MORE SKY. MORE GREEN. MORE ROOM TO BE YOURSELF.
         ========================================================================= */}
      <Section id="why-visit-us" background="cream" className="!py-10 sm:!py-14 border-t border-[#E8DFCE]">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-[#143628]">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8F6C27]">
                  The Retreat Experience
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                  Why Visit Us — More Sky. More Green. More Room to Be Yourself.
                </h2>
              </div>

              <p className="text-sm sm:text-base font-serif italic text-[#8F6C27] leading-relaxed">
                Some journeys take you to new places. A stay at Saranda Safari Resort gives you the space to return to yourself.
              </p>

              <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed font-sans">
                For nature lovers, wildlife enthusiasts and anyone weary of city traffic, crowded streets and days spent within four walls, our cosy cottages offer a welcome change of pace.
              </p>

              <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed font-sans">
                Wake in a river-view cottage to the calls of birds and the first light of sunrise peeking through your window. Beyond it, the Karo River greets the morning, inviting you to linger over the view before the day begins.
              </p>

              <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed font-sans">
                Here, nature is part of your stay—the shade of a mango tree, the gentle gurgle of water, a flutter of wings, and the wide night sky above you. Winter brings misty mornings, spring colours the forest canopy, and fireflies lend a little magic to the evenings.
              </p>

              <p className="text-sm sm:text-base text-[#143628]/85 leading-relaxed font-sans">
                Spend your day exploring nearby waterfalls, forest landscapes and scenic viewpoints. Then return to your cottage, settle into the quiet, and enjoy time that belongs entirely to you.
              </p>

              <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#C5A059]/40 text-xs sm:text-sm font-medium text-[#143628] space-y-1">
                <p>📖 Read a few pages. ☕ Share a cup of tea. 🌊 Watch the river. Or do nothing at all.</p>
                <p className="font-serif font-bold text-[#8F6C27] pt-1">Come for a change of scenery. Stay for the room to breathe.</p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  variant="terracotta"
                  size="md"
                  onClick={onOpenBooking}
                  icon={Calendar}
                >
                  Check Availability
                </Button>

                <Button
                  variant="forest"
                  size="md"
                  onClick={() => onNavigate('stay')}
                  icon={ArrowRight}
                >
                  Explore Our Stays
                </Button>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#E8DFCE] relative group">
                <img
                  src="/placewhyvisit.png"
                  alt="Gentle Karo River lawn and open sky"
                  className="w-full h-80 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-[#143628]/90 backdrop-blur-xs text-white p-3 rounded-xl text-xs border border-[#C5A059]/40">
                  <span className="font-serif font-bold text-[#DFCA95] block">Room to Breathe</span>
                  <span className="text-white/80 text-[11px]">Riverside lawns, open blue skies &amp; unhurried pace</span>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* =========================================================================
          4. THE COMPLETE 5-BLOCK SEASONS SECTION (CHRONOLOGICAL FOREST CALENDAR)
         ========================================================================= */}
      <Section id="seasons" background="cream-deep" className="!py-10 sm:!py-14 border-t border-[#E8DFCE]">
        <Container>
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] text-[#8F6C27]">
              Forest Calendar
            </p>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#143628]">
              The Five Seasons of Saranda
            </h2>
            <p className="mt-1.5 font-serif text-sm sm:text-base italic text-[#143628]/75 max-w-xl mx-auto">
              Understanding how the hills, river, and sal trees transform throughout the year
            </p>
          </div>

          {/* Desktop 5-Step Horizontal Timeline */}
          <div className="hidden md:block mb-8 max-w-4xl mx-auto">
            <div className="relative flex items-center justify-between px-2">
              {/* Connecting line */}
              <div className="absolute top-4 left-8 right-8 h-0.5 bg-[#E8DFCE]" />

              {chronologicalSeasons.map((season, idx) => {
                const isActive = activeSeason === idx;
                return (
                  <button
                    key={season.id}
                    type="button"
                    onClick={() => setActiveSeason(idx)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isActive
                        ? 'bg-[#143628] text-[#C5A059] ring-4 ring-[#C5A059]/25 shadow-xs'
                        : 'bg-white border-2 border-[#E8DFCE] text-[#143628]/60 group-hover:border-[#C5A059]'
                    }`}>
                      <span className="text-xs font-bold font-serif">{idx + 1}</span>
                    </div>

                    <span className={`mt-2 font-serif text-xs lg:text-sm transition-colors ${
                      isActive ? 'font-bold text-[#143628]' : 'text-[#143628]/70 group-hover:text-[#143628]'
                    }`}>
                      {season.title}
                    </span>

                    <span className="text-[11px] text-[#8F6C27] font-sans font-medium">
                      {season.months}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Horizontal Swipeable Pills (Single line, no wrapping) */}
          <div className="md:hidden flex items-center gap-2 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-none -mx-4 px-4 mb-6">
            {chronologicalSeasons.map((season, idx) => {
              const isActive = activeSeason === idx;
              return (
                <button
                  key={season.id}
                  type="button"
                  onClick={() => setActiveSeason(idx)}
                  className={`shrink-0 snap-center px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#143628] text-white shadow-xs'
                      : 'bg-white text-[#143628] border border-[#E8DFCE]'
                  }`}
                >
                  {season.title} • <span className="opacity-80 text-[11px] font-normal">{season.months.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Season Highlight Card */}
          {(() => {
            const season = chronologicalSeasons[activeSeason];
            return (
              <Card className={`max-w-4xl mx-auto p-6 sm:p-8 bg-white border border-[#E8DFCE] border-l-4 ${season.accentBorder} shadow-xs`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8DFCE] pb-4 mb-5">
                  <div>
                    <Badge variant="gold" className="mb-2">{season.badge}</Badge>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#143628]">{season.title}</h3>
                  </div>
                  <span className="font-sans text-xs sm:text-sm font-semibold text-[#8F6C27] bg-[#F4EFE6] px-3.5 py-1 rounded-full border border-[#C5A059]/40 self-start">
                    {season.months}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-serif italic text-[#143628] mb-3">
                  "{season.summary}"
                </p>

                <p className="text-xs sm:text-sm text-[#143628]/85 leading-relaxed mb-5 font-sans">
                  {season.description}
                </p>

                <div className="border-t border-[#E8DFCE] pt-4">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8F6C27] block mb-2">
                    Key Seasonal Highlights:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {season.highlights.map((h, i) => (
                      <div key={i} className="text-xs font-medium text-[#143628] bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8DFCE] text-center">
                        • {h}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })()}

        </Container>
      </Section>
    </div>
  );
}
