import React from 'react';
import { MapPin, Train, Bus, Plane, Car, Phone, Navigation, MessageSquare } from 'lucide-react';
import { Section, Container, Button, Card, Badge } from '../components/ui/Primitives';

export function GettingHerePage({ onOpenPickup }) {
  const handleOpenMap = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=Village+Nimture+Bolani+Keonjhar+Odisha',
      '_blank'
    );
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-[#0E261C] text-[#F9F6F0] py-14 md:py-20 border-b border-[#C5A059]/30">
        <Container className="text-center max-w-4xl">
          <Badge variant="gold" className="mb-3">Travel Directions & Connectivity</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Getting Here
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#DFCA95]">
            How to reach Saranda Safari Resort
          </p>
        </Container>
      </section>

      {/* Main Numbered Layout with Map */}
      <Section background="cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Numbered Sections 1 to 5 */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. Your Destination */}
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-[#143628] text-[#DFCA95] font-serif font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div className="space-y-1.5 text-sm text-[#143628]/85">
                  <h3 className="font-serif text-xl font-bold text-[#143628]">Your Destination</h3>
                  <p className="leading-relaxed">
                    Find Saranda Safari Resort at <strong>Village Nimture, near Bolani, in Keonjhar district, Odisha</strong>. 
                    Bolani is approximately 5 km from the resort. Arrive in your own vehicle or request a pickup in advance.
                  </p>
                </div>
              </div>

              {/* 2. By Train */}
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-[#143628] text-[#DFCA95] font-serif font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div className="space-y-3 w-full">
                  <div className="flex items-center gap-2">
                    <Train className="w-5 h-5 text-[#C5A059]" />
                    <h3 className="font-serif text-xl font-bold text-[#143628]">By Train</h3>
                  </div>
                  
                  {/* Clean Train Table */}
                  <div className="overflow-x-auto border border-[#E8DFCE] rounded-lg bg-white">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#F4EFE6] text-[#143628] font-serif border-b border-[#E8DFCE]">
                        <tr>
                          <th className="p-2.5">Station</th>
                          <th className="p-2.5">Distance</th>
                          <th className="p-2.5">Travel Planning</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8DFCE] text-[#143628]/80">
                        <tr>
                          <td className="p-2.5 font-semibold text-[#143628]">Barbil</td>
                          <td className="p-2.5 font-medium text-[#C25E3E]">15 km</td>
                          <td className="p-2.5">An arrival option from Howrah/Kolkata and Tata/Jamshedpur, depending on available trains.</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-semibold text-[#143628]">Banspani near Joda</td>
                          <td className="p-2.5 font-medium text-[#C25E3E]">22 km</td>
                          <td className="p-2.5">An arrival option from Bhubaneswar and other parts of Odisha.</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-semibold text-[#143628]">Rourkela</td>
                          <td className="p-2.5 font-medium text-[#C25E3E]">102 km</td>
                          <td className="p-2.5">Alternative connection followed by a road transfer.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-[#8F6C27] italic">
                    Check current train services and operating days before booking tickets.
                  </p>
                </div>
              </div>

              {/* 3. By Bus or Road */}
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-[#143628] text-[#DFCA95] font-serif font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div className="space-y-2 text-sm text-[#143628]/85">
                  <div className="flex items-center gap-2">
                    <Bus className="w-5 h-5 text-[#C5A059]" />
                    <h3 className="font-serif text-xl font-bold text-[#143628]">By Bus or Road</h3>
                  </div>
                  <p className="leading-relaxed">
                    From Bhubaneswar, take an evening bus to Bolani and arrange pickup for the remaining journey. From Kolkata, check evening buses from Babughat to Barbil, with an onward transfer arranged in advance. Confirm the bus schedule and exact arrival point with the operator.
                  </p>
                  <p className="leading-relaxed">
                    Guests from Ranchi, Rourkela, Jamshedpur, Keonjhar and other districts of Odisha can travel by road. Parking is available at the resort.
                  </p>
                </div>
              </div>

              {/* 4. By Air */}
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-[#143628] text-[#DFCA95] font-serif font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div className="space-y-2 text-sm text-[#143628]/85">
                  <div className="flex items-center gap-2">
                    <Plane className="w-5 h-5 text-[#C5A059]" />
                    <h3 className="font-serif text-xl font-bold text-[#143628]">By Air</h3>
                  </div>
                  <p className="leading-relaxed">
                    Consider Birsa Munda Airport in Ranchi, Veer Surendra Sai Airport in Jharsuguda, or Biju Patnaik International Airport in Bhubaneswar according to your available flights and onward travel plan. Airport transfers require advance arrangements and a separate quotation.
                  </p>
                </div>
              </div>

              {/* 5. Let Us Arrange Your Arrival */}
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-[#143628] text-[#DFCA95] font-serif font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  5
                </span>
                <div className="space-y-3 text-sm text-[#143628]/85">
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-[#C5A059]" />
                    <h3 className="font-serif text-xl font-bold text-[#143628]">Let Us Arrange Your Arrival</h3>
                  </div>
                  <p className="leading-relaxed">
                    Request pickup and drop when booking your stay. Share your arrival point, date, expected time, passenger count, luggage requirements and train, bus or flight details.
                  </p>
                  <p className="leading-relaxed">
                    Transfers are charged separately. Vehicle availability and the total fare will be confirmed before payment, based on the vehicle required and prevailing operator rates.
                  </p>

                  {/* Dual Action Buttons & Phone */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Button variant="forest" size="md" onClick={handleOpenMap} icon={Navigation}>
                      Get Directions
                    </Button>
                    <Button variant="terracotta" size="md" onClick={onOpenPickup} icon={Car}>
                      Request Pickup & Drop
                    </Button>
                  </div>
                  <div className="pt-2 text-xs text-[#143628] flex flex-wrap items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Direct Assistance:</span>
                    <a href="tel:+917008307064" className="font-semibold text-emerald-800 hover:underline">
                      +91 70083 07064
                    </a>
                    <span className="text-gray-300">?</span>
                    <a
                      href="https://wa.me/917008307064?text=Hello%20Saranda%20Safari%20Resort,%20I%20need%20assistance%20with%20directions%20and%20travel."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Working Map (Sticky on Desktop, Stacked Below on Mobile) */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-3">
                <Card className="p-2 border-[#C5A059]/40 overflow-hidden shadow-md">
                  <div className="w-full h-80 lg:h-[500px] rounded overflow-hidden">
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
                </Card>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleOpenMap}
                    className="text-xs text-[#8F6C27] hover:underline cursor-pointer font-medium"
                  >
                    Open direct coordinates in Google Maps ?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
