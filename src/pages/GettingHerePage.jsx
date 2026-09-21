import React, { useState } from 'react';
import { 
  MapPin, 
  Train, 
  Bus, 
  Car, 
  Plane, 
  Navigation, 
  Phone, 
  MessageSquare, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import { Container, Button } from '../components/ui/Primitives';
import { resortInfo } from '../content/resortInfo';

export function GettingHerePage({ onOpenPickup }) {
  const [showMoreRoad, setShowMoreRoad] = useState(false);

  const resortAddress = {
    name: 'Saranda Safari Resort',
    line1: 'Village Nimture, P.O. Bolani',
    district: 'District Keonjhar',
    stateZip: 'Odisha 758037',
    fullDisplay: 'Saranda Safari Resort, Village Nimture, P.O. Bolani, Keonjhar, Odisha.'
  };

  const trainStations = [
    { station: 'Barbil', distance: '15 km' },
    { station: 'Banspani', distance: '22 km' },
    { station: 'Rourkela', distance: '102 km' },
    { station: 'Tatanagar', distance: '150 km' }
  ];

  const airports = [
    { name: 'Ranchi', code: 'IXR' },
    { name: 'Jharsuguda', code: 'JRG' },
    { name: 'Bhubaneswar', code: 'BBI' }
  ];

  const roadApproaches = [
    {
      from: 'From Kolkata (~320 km)',
      route: 'Kolkata → Kharagpur → Baharagora → Baripada or Jamshedpur / Chaibasa → Noamundi → Barbil → Bolani / Nimture.'
    },
    {
      from: 'From Bhubaneswar (~290 km)',
      route: 'Bhubaneswar → Cuttack → Panikoili → Keonjhar (NH 20) → Champua → Barbil → Bolani / Nimture.'
    },
    {
      from: 'From Rourkela (~102 km)',
      route: 'Rourkela → Rajgangpur / Koida or via Barbil highway corridor to Bolani.'
    },
    {
      from: 'From Jamshedpur (~150 km)',
      route: 'Jamshedpur → Chaibasa → Noamundi → Barbil → Bolani / Nimture.'
    }
  ];

  const handleOpenMap = () => {
    window.open(
      'https://maps.google.com/?q=Village+Nimture,+Bolani,+Keonjhar,+Odisha',
      '_blank'
    );
  };

  const handleWhatsApp = () => {
    const text = 'Hello Saranda Safari Resort, I need assistance with directions and travel to the resort.';
    window.open(`https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen">
      {/* 1. Compact Hero */}
      <section className="relative bg-[#0E261C] text-[#F9F6F0] py-8 sm:py-10 border-b border-[#C5A059]/30 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

        <Container className="relative z-10 max-w-3xl px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/35 text-[#E5C378] text-[11px] uppercase tracking-widest font-cinzel font-semibold mb-2.5">
            <Navigation className="w-3 h-3" />
            <span>Getting Here</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            Your Journey to Saranda
          </h1>

          <p className="mt-2.5 text-xs sm:text-sm text-[#DFCA95] font-light leading-relaxed max-w-xl mx-auto italic">
            "{resortAddress.fullDisplay}"
          </p>

          <div className="mt-4 flex items-center justify-center">
            <Button
              variant="terracotta"
              size="sm"
              onClick={handleOpenMap}
              icon={Navigation}
              className="text-xs py-2 px-5 font-semibold cursor-pointer"
            >
              Get Directions
            </Button>
          </div>
        </Container>
      </section>

      {/* 2. Main Travel Guide — 5-Step Structure + Sticky Desktop Map */}
      <section className="py-8 sm:py-12">
        <Container className="max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: 5-Step Numbered Guide (~58% width on desktop) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">

              {/* Step 01: Your Destination */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EADFC9] shadow-xs flex gap-4 sm:gap-5 items-start transition-all hover:border-[#C5A059]/50">
                <span className="font-cinzel font-bold text-2xl sm:text-3xl text-[#C5A059] shrink-0 leading-none mt-0.5">
                  01
                </span>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#8F6C27]" />
                    <h2 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#8F6C27]">
                      Your Destination
                    </h2>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#143628]">
                      {resortAddress.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#143628]/80 leading-relaxed mt-0.5">
                      {resortAddress.line1}, {resortAddress.district}, {resortAddress.stateZip}
                    </p>
                  </div>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={handleOpenMap}
                      className="text-xs font-cinzel font-semibold text-[#8F6C27] hover:text-[#143628] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Open Google Maps</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 02: By Train */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EADFC9] shadow-xs flex gap-4 sm:gap-5 items-start transition-all hover:border-[#C5A059]/50">
                <span className="font-cinzel font-bold text-2xl sm:text-3xl text-[#C5A059] shrink-0 leading-none mt-0.5">
                  02
                </span>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <Train className="w-4 h-4 text-[#8F6C27]" />
                    <h2 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#8F6C27]">
                      By Train
                    </h2>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628]">
                    Nearest Railway Stations
                  </h3>

                  {/* Clean Destination Table Rows */}
                  <div className="border border-[#EADFC9] rounded-xl overflow-hidden divide-y divide-[#EADFC9] bg-[#FDFBF7]">
                    {trainStations.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center px-4 py-2.5 text-xs sm:text-sm hover:bg-[#F4ECE1]/40 transition-colors">
                        <span className="font-bold text-[#143628]">{item.station}</span>
                        <span className="font-serif font-bold text-[#C85A32]">{item.distance}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-[#8F6C27] italic leading-relaxed pt-0.5">
                    Note: Train services and timings should be checked before travel.
                  </p>
                </div>
              </div>

              {/* Step 03: By Bus or Road */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EADFC9] shadow-xs flex gap-4 sm:gap-5 items-start transition-all hover:border-[#C5A059]/50">
                <span className="font-cinzel font-bold text-2xl sm:text-3xl text-[#C5A059] shrink-0 leading-none mt-0.5">
                  03
                </span>
                <div className="space-y-3.5 flex-1">
                  <div className="flex items-center gap-2">
                    <Bus className="w-4 h-4 text-[#8F6C27]" />
                    <h2 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#8F6C27]">
                      By Bus or Road
                    </h2>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628]">
                    Bus Connections & Highway Access
                  </h3>

                  {/* Two Visual Sub-Blocks: Bus & Road Proximity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#FDFBF7] border border-[#EADFC9] space-y-1.5">
                      <span className="text-[10px] font-cinzel font-bold text-[#8F6C27] uppercase tracking-wider block">
                        Bus
                      </span>
                      <div className="text-xs text-[#143628] space-y-1">
                        <p><strong className="text-[#143628]">From Kolkata:</strong> Babughat → Barbil</p>
                        <p><strong className="text-[#143628]">From Bhubaneswar:</strong> Bus services towards Bolani</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FDFBF7] border border-[#EADFC9] space-y-1.5">
                      <span className="text-[10px] font-cinzel font-bold text-[#8F6C27] uppercase tracking-wider block">
                        Road
                      </span>
                      <p className="text-xs text-[#143628]/85 leading-relaxed">
                        Bolani is approximately <strong>5 km from the resort</strong>. Confirm bus services and timings with operators in advance.
                      </p>
                    </div>
                  </div>

                  {/* Expandable Road Approaches */}
                  <div className="border border-[#EADFC9] rounded-xl p-3.5 bg-[#FDFBF7]">
                    <button
                      type="button"
                      onClick={() => setShowMoreRoad(!showMoreRoad)}
                      className="w-full flex items-center justify-between text-xs font-bold text-[#143628] hover:text-[#8F6C27] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2 font-cinzel">
                        <Car className="w-3.5 h-3.5 text-[#8F6C27]" />
                        <span>More Road Details & Self-Drive Routes</span>
                      </span>
                      {showMoreRoad ? <ChevronUp className="w-4 h-4 text-[#8F6C27]" /> : <ChevronDown className="w-4 h-4 text-[#8F6C27]" />}
                    </button>

                    {showMoreRoad && (
                      <div className="mt-3 pt-3 border-t border-[#EADFC9] space-y-2.5 text-xs text-[#143628]/80">
                        {roadApproaches.map((dir, i) => (
                          <div key={i} className="space-y-0.5">
                            <strong className="text-[#143628] block font-medium">{dir.from}</strong>
                            <p className="text-[11px] leading-relaxed text-[#143628]/75">{dir.route}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 04: By Air */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EADFC9] shadow-xs flex gap-4 sm:gap-5 items-start transition-all hover:border-[#C5A059]/50">
                <span className="font-cinzel font-bold text-2xl sm:text-3xl text-[#C5A059] shrink-0 leading-none mt-0.5">
                  04
                </span>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-[#8F6C27]" />
                    <h2 className="font-cinzel text-xs uppercase tracking-widest font-bold text-[#8F6C27]">
                      By Air
                    </h2>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#143628]">
                    Nearby Commercial Airports
                  </h3>

                  {/* 3 Simple Airport Rows / Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {airports.map((ap, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#FDFBF7] border border-[#EADFC9] text-center hover:border-[#C5A059] transition-colors">
                        <span className="font-serif font-bold text-sm text-[#143628] block">
                          {ap.name}
                        </span>
                        <span className="text-[10px] font-cinzel text-[#8F6C27] block mt-0.5 font-semibold tracking-wider">
                          {ap.code} Airport
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-[#143628]/80 leading-relaxed pt-0.5">
                    From the airport, continue by road to Saranda Safari Resort.
                  </p>
                </div>
              </div>

              {/* Step 05: Arrival Assistance (Visually Stronger Section) */}
              <div className="bg-[#0E261C] text-[#F9F6F0] rounded-2xl p-6 sm:p-7 border border-[#C5A059]/40 shadow-xl flex gap-4 sm:gap-5 items-start relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px]" />

                <span className="font-cinzel font-bold text-2xl sm:text-3xl text-[#E5C378] shrink-0 leading-none mt-0.5 relative z-10">
                  05
                </span>

                <div className="space-y-3 flex-1 relative z-10">
                  <div>
                    <span className="text-[10px] font-cinzel text-[#E5C378] uppercase tracking-widest block mb-1 font-semibold">
                      Arrival Assistance
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Let Us Arrange Your Arrival
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-[#DFCA95] leading-relaxed font-light">
                    Arriving by train, bus or flight? Pickup and drop can be arranged in advance, subject to vehicle availability and prevailing fares.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Button
                      variant="terracotta"
                      size="md"
                      onClick={onOpenPickup}
                      icon={Car}
                      className="text-xs py-2.5 px-5 font-semibold cursor-pointer"
                    >
                      Request Pickup & Drop
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={handleWhatsApp}
                      icon={MessageSquare}
                      className="text-xs py-2.5 px-4 !border-[#C5A059] !text-[#DFCA95] hover:!bg-[#C5A059]/20 font-semibold cursor-pointer"
                    >
                      WhatsApp Us
                    </Button>
                  </div>

                  <div className="pt-2 text-[11px] text-[#DFCA95]/70 flex items-center gap-2">
                    <Phone className="w-3 h-3 text-[#E5C378]" />
                    <span>Direct Resort Helpline:</span>
                    <a href={`tel:${resortInfo.contact.phoneRaw}`} className="text-white hover:underline font-semibold">
                      {resortInfo.contact.phone}
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Google Map (~42% width on desktop) */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 space-y-3">
                <div className="rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-lg bg-white p-2">
                  <div className="w-full h-80 sm:h-[450px] lg:h-[540px] rounded-xl overflow-hidden">
                    <iframe
                      title="Saranda Safari Resort Location Map"
                      src="https://maps.google.com/maps?q=Bolani,Keonjhar,Odisha&t=&z=12&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={handleOpenMap}
                    className="text-xs font-cinzel font-semibold text-[#8F6C27] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
