import React, { useState } from 'react';
import { X, Car, MapPin, Sparkles, MessageSquare, AlertCircle, ShieldAlert } from 'lucide-react';
import { Button } from './ui/Primitives';
import { gettingHereContent } from '../content/gettingHere';
import { sightseeingContent } from '../content/sightseeing';
import { tariffsAndPackages } from '../content/tariffsAndPackages';
import { resortInfo } from '../content/resortInfo';

// 1. Pickup & Drop Assistance Modal
export function PickupModal({ isOpen, onClose }) {
  const [station, setStation] = useState('Barbil Railway Station (15 km)');
  const [date, setDate] = useState('2026-10-15');
  const [passengers, setPassengers] = useState(2);
  const [vehicle, setVehicle] = useState('Bolero / SUV');
  const [guestName, setGuestName] = useState('');

  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const text = `*Pickup & Drop Request: Saranda Safari Resort*
--------------------------------------------
• Guest: ${guestName || 'Guest'}
• Arrival Point: ${station}
• Date: ${date}
• Passengers: ${passengers}
• Preferred Vehicle: ${vehicle}
--------------------------------------------
Please provide vehicle availability and fare quotation.`;

    window.open(`https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E261C]/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#F9F6F0] rounded-xl shadow-2xl border border-[#E8DFCE] w-full max-w-lg p-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#E8DFCE] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-[#C25E3E]" />
            <h3 className="font-serif text-xl font-bold text-[#143628]">Request Station / Airport Pickup</h3>
          </div>
          <button type="button" onClick={onClose} className="text-[#143628]/60 hover:text-[#143628]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#143628]/80 mb-4">
          We arrange trusted private transport between the resort and nearby transport hubs. Fares are confirmed via quotation based on vehicle type.
        </p>

        <div className="space-y-3 text-sm">
          <div>
            <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Arrival Hub</label>
            <select
              value={station}
              onChange={(e) => setStation(e.target.value)}
              className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628]"
            >
              <option value="Barbil Railway Station (15 km)">Barbil Railway Station (15 km)</option>
              <option value="Banspani Railway Station (22 km)">Banspani Railway Station (22 km)</option>
              <option value="Rourkela Junction (102 km)">Rourkela Junction (102 km)</option>
              <option value="Ranchi Airport">Ranchi Airport</option>
              <option value="Jharsuguda Airport">Jharsuguda Airport</option>
              <option value="Bhubaneswar Airport">Bhubaneswar Airport</option>
            </select>

          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Passengers</label>
              <input
                type="number"
                min="1"
                max="10"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Preferred Vehicle</label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628]"
            >
              <option value="Bolero / Scorpio (Rugged SUV)">Bolero / Scorpio (Recommended for rural roads)</option>
              <option value="Sedan (Dzire / Etios)">Sedan (Up to 3–4 passengers)</option>
              <option value="Innova / MPV">Innova (Spacious family travel)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Your Name</label>
            <input
              type="text"
              placeholder="e.g. Ramesh Patel"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628]"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t border-[#E8DFCE] pt-4">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="terracotta" size="sm" onClick={handleWhatsApp} icon={MessageSquare}>
            Send Request via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}

// 2. Sightseeing Assistance Request Modal
export function SightseeingModal({ isOpen, onClose }) {
  const [selectedSpots, setSelectedSpots] = useState(['Jhikra Waterfall', 'Kiriburu Sunset Point']);
  const [date, setDate] = useState('2026-10-16');
  const [guestCount, setGuestCount] = useState(3);
  const [guestName, setGuestName] = useState('');

  if (!isOpen) return null;

  const toggleSpot = (spotName) => {
    setSelectedSpots(prev => 
      prev.includes(spotName) ? prev.filter(s => s !== spotName) : [...prev, spotName]
    );
  };

  const handleWhatsApp = () => {
    const text = `*Sightseeing Excursion Enquiry: Saranda Safari Resort*
--------------------------------------------
• Guest: ${guestName || 'Guest'}
• Target Date: ${date}
• Party Size: ${guestCount} Guests
• Selected Destinations:
${selectedSpots.map(s => `  - ${s}`).join('\n')}
--------------------------------------------
Please provide vehicle availability and sightseeing quotation.`;

    window.open(`https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E261C]/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#F9F6F0] rounded-xl shadow-2xl border border-[#E8DFCE] w-full max-w-lg p-6 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-[#E8DFCE] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#C25E3E]" />
            <h3 className="font-serif text-xl font-bold text-[#143628]">Request Sightseeing Assistance</h3>
          </div>
          <button type="button" onClick={onClose} className="text-[#143628]/60 hover:text-[#143628]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#143628]/80 mb-3">
          Select the places you'd like to visit. Our staff will coordinate dedicated vehicles and provide transparent quotations.
        </p>

        <div className="space-y-2 overflow-y-auto pr-1 mb-4">
          {sightseeingContent.destinations.map(dest => {
            const isChecked = selectedSpots.includes(dest.name);
            return (
              <label 
                key={dest.id} 
                className={`flex items-start gap-2.5 p-2.5 rounded border text-xs cursor-pointer transition-colors ${
                  isChecked ? 'bg-[#143628]/5 border-[#C5A059]' : 'bg-white border-[#E8DFCE]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleSpot(dest.name)}
                  className="mt-0.5 rounded text-[#C25E3E]"
                />
                <div>
                  <span className="font-semibold text-[#143628]">{dest.name}</span>
                  <span className="text-[#8F6C27] block text-[11px]">{dest.tag}</span>
                </div>
              </label>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Target Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-1.5 text-xs text-[#143628]"
            />
          </div>
          <div>
            <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Your Name</label>
            <input
              type="text"
              placeholder="e.g. Suman Sen"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-1.5 text-xs text-[#143628]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#E8DFCE] pt-3">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="terracotta" size="sm" onClick={handleWhatsApp} icon={MessageSquare}>
            Request Quote via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}

// 3. Private Event & Gathering Quote Modal
export function EventModal({ isOpen, onClose }) {
  const [eventType, setEventType] = useState('Family Reunion / Gathering');
  const [targetMonth, setTargetMonth] = useState('October 2026 or later');
  const [attendees, setAttendees] = useState(30);
  const [guestName, setGuestName] = useState('');

  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const text = `*Private Event Venue Enquiry: Saranda Safari Resort*
--------------------------------------------
• Event Type: ${eventType}
• Target Timeline: ${targetMonth} (6-Month Advance Window)
• Estimated Attendees: ${attendees}
• Client Name: ${guestName || 'Organizer'}
• Note: Acknowledged overnight accommodation cap of 25 guests.
--------------------------------------------
Please provide venue availability and quotation.`;

    window.open(`https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E261C]/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#F9F6F0] rounded-xl shadow-2xl border border-[#E8DFCE] w-full max-w-lg p-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#E8DFCE] pb-3 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C25E3E]" />
            <h3 className="font-serif text-xl font-bold text-[#143628]">Request Event Venue Quote</h3>
          </div>
          <button type="button" onClick={onClose} className="text-[#143628]/60 hover:text-[#143628]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Indicative Range & Rules */}
        <div className="bg-[#F4EFE6] border border-[#C5A059]/50 rounded-lg p-3 text-xs text-[#143628] space-y-1 mb-4">
          <div className="font-bold flex justify-between">
            <span>Indicative Venue Range:</span>
            <span className="text-[#C25E3E] font-semibold">{tariffsAndPackages.eventVenue.indicativeRange}</span>
          </div>
          <p className="text-[11px] text-[#143628]/80">
            {tariffsAndPackages.eventVenue.preBookingRequirement}
          </p>
        </div>

        {/* STRICT CAPACITY GUARD WARNING */}
        <div className="bg-amber-50 border border-amber-300 rounded p-2.5 text-xs text-amber-950 flex items-start gap-2 mb-4">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Capacity Note:</strong> Total overnight accommodation is strictly capped at 25 guests. Day gatherings can accommodate larger groups on the riverside lawns.
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <div>
            <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Event Type</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-xs text-[#143628]"
            >
              <option value="Family Gathering / Reunion">Family Gathering / Reunion</option>
              <option value="Intimate Wedding / Reception">Intimate Wedding / Reception</option>
              <option value="Corporate Retreat / Workshop">Corporate Retreat / Workshop</option>
              <option value="Community / Cultural Gathering">Community / Cultural Gathering</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Target Period</label>
              <input
                type="text"
                value={targetMonth}
                onChange={(e) => setTargetMonth(e.target.value)}
                placeholder="e.g. November 2026"
                className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-1.5 text-xs text-[#143628]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Attendees</label>
              <input
                type="number"
                min="10"
                max="100"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
                className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-1.5 text-xs text-[#143628]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Organizer Name</label>
            <input
              type="text"
              placeholder="e.g. Priya Mukherjee"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-1.5 text-xs text-[#143628]"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2 border-t border-[#E8DFCE] pt-3">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="terracotta" size="sm" onClick={handleWhatsApp} icon={MessageSquare}>
            Request Event Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
