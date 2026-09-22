import React, { useState, useMemo } from 'react';
import { X, Calendar, Users, AlertCircle, CheckCircle2, MessageSquare, Info, ShieldAlert } from 'lucide-react';
import { Button, Card, Badge } from './ui/Primitives';
import { stayInventory } from '../content/stayInventory';
import { resortInfo } from '../content/resortInfo';
import { FEATURES } from '../content/features';

export function AvailabilityModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const unitsList = stayInventory?.units || [];
  const defaultUnitId = unitsList[0]?.id || 'riverwood';

  // Form State
  const [selectedUnitType, setSelectedUnitType] = useState(defaultUnitId);
  const [checkInDate, setCheckInDate] = useState('2026-10-15');
  const [nights, setNights] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children5to10, setChildren5to10] = useState(0);
  const [infantsUnder5, setInfantsUnder5] = useState(0);
  const [includeNonVegPlan, setIncludeNonVegPlan] = useState(false);
  const [includeBonfire, setIncludeBonfire] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  const currentUnit = unitsList.find(u => u.id === selectedUnitType) || unitsList[0] || {
    id: 'riverwood',
    name: 'Riverwood',
    type: 'log_house',
    maxAdultsPerUnit: 4,
    unitCount: 1,
    pricingTiers: { 1: 3000, 2: 4000, 3: 5400, 4: 6600 }
  };

  const isCamping = currentUnit.type === 'camping' || selectedUnitType === 'camping-tents';

  // Capacity validation guard
  const maxAllowedAdults = isCamping ? 5 : (currentUnit.maxAdultsPerUnit || 4);
  const isOverCapacity = adults > maxAllowedAdults;
  const is3GuestMaxUnit = maxAllowedAdults === 3;
  const is3GuestUnitWith4Adults = is3GuestMaxUnit && adults > 3;

  // Price Calculation Engine
  const calculation = useMemo(() => {
    let baseRatePerNight = 0;

    if (isCamping) {
      if (adults === 1) {
        baseRatePerNight = 1499;
      } else if (adults === 2) {
        baseRatePerNight = 2999;
      } else {
        baseRatePerNight = adults * 1499;
      }
    } else {
      // Cottage rates
      if (currentUnit.pricingTiers && currentUnit.pricingTiers[adults]) {
        baseRatePerNight = currentUnit.pricingTiers[adults];
      } else {
        if (adults === 1) baseRatePerNight = 3000;
        else if (adults === 2) baseRatePerNight = 4000;
        else if (adults === 3) baseRatePerNight = 5400;
        else if (adults >= 4) {
          baseRatePerNight = is3GuestMaxUnit ? 0 : 6600;
        }
      }
    }

    const baseStayTotal = baseRatePerNight * nights;

    // Children 5–10 calculations
    const childRatePerNight = isCamping ? 750 : 700;
    const childrenTotal = children5to10 * childRatePerNight * nights;

    // Non-veg meal supplements
    let nonVegTotal = 0;
    if (FEATURES.nonVegSupplements && includeNonVegPlan) {
      const adultSupplementRate = isCamping ? 150 : 300;
      const childSupplementRate = 150;
      nonVegTotal = (adults * adultSupplementRate + children5to10 * childSupplementRate) * nights;
    }

    // Bonfire add-on (for cottages; camping already includes bonfire)
    let bonfireTotal = 0;
    if (includeBonfire && !isCamping) {
      const billableBonfireGuests = Math.max(2, adults);
      bonfireTotal = billableBonfireGuests * 250 * nights;
    }

    const grandTotal = baseStayTotal + childrenTotal + nonVegTotal + bonfireTotal;
    const advance50 = Math.round(grandTotal * 0.5);
    const balanceAtCheckIn = grandTotal - advance50;

    return {
      baseRatePerNight,
      baseStayTotal,
      childrenTotal,
      nonVegTotal,
      bonfireTotal,
      grandTotal,
      advance50,
      balanceAtCheckIn
    };
  }, [selectedUnitType, currentUnit, isCamping, adults, nights, children5to10, includeNonVegPlan, includeBonfire, is3GuestMaxUnit]);

  const generateWhatsAppUrl = () => {
    const message = `*Pre-Booking Enquiry: Saranda Safari Resort (October 2026 Season)*
--------------------------------------------
• Guest Name: ${guestName || 'Prospective Guest'}
• Contact Phone: ${guestPhone || 'Via WhatsApp'}
• Unit Selected: ${currentUnit.name}
• Target Check-in: ${checkInDate} (${isCamping ? '4:00 PM' : '9:00 AM'})
• Duration: ${nights} Night(s)
• Adults: ${adults}
• Children (5–10 yrs): ${children5to10}
• Infants (<5 yrs, free): ${infantsUnder5}
${FEATURES.nonVegSupplements ? `• Non-Veg Supplement: ${includeNonVegPlan ? 'Yes' : 'No (Default Vegetarian)'}\n` : ''}• Bonfire Add-on: ${includeBonfire && !isCamping ? 'Yes' : (isCamping ? 'Included in Camping' : 'No')}
--------------------------------------------
• Estimated Stay Total: ₹${calculation.grandTotal.toLocaleString('en-IN')}
• 50% Advance to Confirm: ₹${calculation.advance50.toLocaleString('en-IN')}
• Balance at Check-in: ₹${calculation.balanceAtCheckIn.toLocaleString('en-IN')}
--------------------------------------------
Please confirm availability for these dates.`;

    return `https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E261C]/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#F9F6F0] rounded-xl shadow-2xl border border-[#E8DFCE] w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden"
        role="dialog" 
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-[#143628] text-[#F9F6F0] px-6 py-4 flex items-center justify-between border-b border-[#C5A059]/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#DFCA95] font-semibold">
                Official Reservation & Tariffs Calculator
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
              Check Availability & Pre-Booking
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#DFCA95] hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* October 2026 Pre-booking Notice */}
          <div className="bg-[#F4EFE6] border border-[#C5A059]/50 rounded-lg p-3.5 flex items-start gap-3 text-xs sm:text-sm text-[#143628]">
            <Info className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">{resortInfo.preBookingNotice}</span>
              <p className="mt-0.5 text-[#143628]/80 text-xs">
                50% advance secures your pre-booking. Advance is non-refundable upon cancellation, with a 7-day reschedule window within 3 months. In the rare event of resort cancellation, 100% full refund is guaranteed.
              </p>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Unit Selection */}
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#143628] mb-1.5">
                Select Accommodation Unit
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {unitsList.map(unit => {
                  const isSelected = selectedUnitType === unit.id;
                  return (
                    <button
                      key={unit.id}
                      type="button"
                      onClick={() => {
                        setSelectedUnitType(unit.id);
                        if (unit.maxAdultsPerUnit === 3 && adults > 3) {
                          setAdults(3);
                        }
                      }}
                      className={`text-left p-3 rounded-lg border text-sm transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-[#C25E3E] bg-[#C25E3E]/10 ring-1 ring-[#C25E3E]' 
                          : 'border-[#E8DFCE] bg-white hover:border-[#C5A059]'
                      }`}
                    >
                      <div className="font-serif font-semibold text-[#143628] flex items-center justify-between">
                        <span>{unit.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C25E3E]" />}
                      </div>
                      <div className="text-xs text-[#143628]/70 mt-1">
                        {unit.type === 'camping' ? 'Max 5 Guests (2 Tents)' : `Max ${unit.maxAdultsPerUnit} Adults`} • {unit.unitCount} Unit(s)
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Check-In Date */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#143628] mb-1.5">
                Target Check-in Date (Oct 2026 onwards)
              </label>
              <input
                type="date"
                min="2026-10-01"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              />
              <span className="text-[11px] text-[#143628]/70 block mt-1">
                {isCamping ? 'Check-in: 4:00 PM • Check-out: 9:00 AM' : 'Check-in: 9:00 AM • Check-out: 9:00 AM (24 hrs)'}
              </span>
            </div>

            {/* Duration / Nights */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#143628] mb-1.5">
                Duration (Nights)
              </label>
              <select
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              >
                {[1, 2, 3, 4, 5, 6, 7].map(n => (
                  <option key={n} value={n}>{n} Night{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            {/* Adults Count with Capacity Guard */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#143628]">
                  Adults
                </label>
                <span className="text-[11px] text-[#8F6C27] font-medium">
                  {isCamping ? 'Max 5 across tents' : `Max ${maxAllowedAdults} in this unit`}
                </span>
              </div>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              >
                {[1, 2, 3, 4, 5].map(count => {
                  const disabled = !isCamping && count > maxAllowedAdults;
                  return (
                    <option key={count} value={count} disabled={disabled}>
                      {count} Adult{count > 1 ? 's' : ''} {disabled ? '(Exceeds unit limit)' : ''}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Children (Ages 5–10) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#143628]">
                  Children (Ages 5 to 10)
                </label>
                <span className="text-[11px] text-[#8F6C27] font-medium">
                  {isCamping ? '₹750 / child' : '₹700 / child'}
                </span>
              </div>
              <select
                value={children5to10}
                onChange={(e) => setChildren5to10(Number(e.target.value))}
                className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              >
                {[0, 1, 2, 3].map(c => (
                  <option key={c} value={c}>{c} Child{c === 1 ? '' : 'ren'}</option>
                ))}
              </select>
            </div>

            {/* Infants Under 5 (Free) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#143628]">
                  Infants (Under 5 Years)
                </label>
                <span className="text-[11px] text-emerald-800 font-semibold">
                  Free Stay • No Bed Charge
                </span>
              </div>
              <select
                value={infantsUnder5}
                onChange={(e) => setInfantsUnder5(Number(e.target.value))}
                className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              >
                {[0, 1, 2].map(i => (
                  <option key={i} value={i}>{i} Infant{i === 1 ? '' : 's'}</option>
                ))}
              </select>
            </div>

            {/* Guest Name & Phone */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#143628] mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Rajesh Sharma"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#143628] mb-1.5">
                Phone Number (WhatsApp)
              </label>
              <input
                type="tel"
                placeholder="e.g. 9876543210"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
              />
            </div>
          </div>

          {/* 3-Guest Unit Limitation Alert */}
          {is3GuestUnitWith4Adults && (
            <div className="bg-red-50 border border-red-200 text-red-900 rounded-lg p-3.5 flex items-start gap-2.5 text-xs sm:text-sm">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Capacity Limitation Rule:</span>
                <p className="mt-0.5 text-xs">
                  {currentUnit.name} is limited to 3 guests maximum. For parties of 4 adults, please select <strong>Riverwood</strong>, <strong>Autumn Abode</strong>, <strong>Spring Abode</strong>, or <strong>Amberwood</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Add-ons & Supplements */}
          <div className="border-t border-[#E8DFCE] pt-4 space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#143628]">
              Optional Add-ons
            </h4>
            
            {/* Non-veg meal supplement */}
            {FEATURES.nonVegSupplements && (
            <label className="flex items-start gap-3 p-3 rounded-lg border border-[#E8DFCE] bg-white cursor-pointer hover:border-[#C5A059]">
              <input
                type="checkbox"
                checked={includeNonVegPlan}
                onChange={(e) => setIncludeNonVegPlan(e.target.checked)}
                className="mt-0.5 rounded text-[#C25E3E] focus:ring-[#C25E3E]"
              />
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-[#143628]">
                  Add Non-Vegetarian Meals (Chicken / Seasonal Fish)
                </span>
                <p className="text-[#143628]/70 text-xs mt-0.5">
                  {isCamping 
                    ? '₹150 per person for camping dinner' 
                    : '₹300 per person per stay (covers Lunch + Dinner)'} • Children 5–10: ₹150/day.
                </p>
              </div>
            </label>
            )}

            {/* Bonfire add-on for cottages */}
            {!isCamping && (
              <label className="flex items-start gap-3 p-3 rounded-lg border border-[#E8DFCE] bg-white cursor-pointer hover:border-[#C5A059]">
                <input
                  type="checkbox"
                  checked={includeBonfire}
                  onChange={(e) => setIncludeBonfire(e.target.checked)}
                  className="mt-0.5 rounded text-[#C25E3E] focus:ring-[#C25E3E]"
                />
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold text-[#143628]">
                    Private Cottage Evening Bonfire Hearth Add-on
                  </span>
                  <p className="text-[#143628]/70 text-xs mt-0.5">
                    ₹250 per person (min 2 paying guests). Fresh firewood and hearth arranged on the riverfront lawn.
                  </p>
                </div>
              </label>
            )}
          </div>

          {/* Price Calculation Summary Card */}
          <div className="bg-[#143628] text-[#F9F6F0] rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-2.5">
              <span className="text-xs uppercase tracking-wider text-[#DFCA95] font-semibold">
                Transparent Tariff Breakdown
              </span>
              <span className="text-xs text-[#DFCA95]">
                {resortInfo.taxDisplayNote}
              </span>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span>Base Stay ({nights} night(s), {adults} adult(s))</span>
                <span className="font-medium">₹{calculation.baseStayTotal.toLocaleString('en-IN')}</span>
              </div>

              {children5to10 > 0 && (
                <div className="flex justify-between">
                  <span>Children (5–10 yrs: {children5to10})</span>
                  <span className="font-medium">+₹{calculation.childrenTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

              {FEATURES.nonVegSupplements && includeNonVegPlan && (
                <div className="flex justify-between">
                  <span>Non-Veg Supplements</span>
                  <span className="font-medium">+₹{calculation.nonVegTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

              {includeBonfire && !isCamping && (
                <div className="flex justify-between">
                  <span>Bonfire Hearth Add-on</span>
                  <span className="font-medium">+₹{calculation.bonfireTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="border-t border-[#C5A059]/30 pt-2 flex justify-between text-base sm:text-lg font-serif font-bold text-white">
                <span>Total Stay Estimate</span>
                <span className="text-[#DFCA95]">₹{calculation.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* 50% Advance Requirement Box */}
            <div className="bg-[#0E261C] rounded p-3 grid grid-cols-2 gap-3 text-center border border-[#C5A059]/40 mt-3">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#DFCA95]">
                  50% Advance to Confirm
                </span>
                <span className="text-lg font-bold text-[#C5A059]">
                  ₹{calculation.advance50.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="border-l border-[#C5A059]/30 pl-3">
                <span className="block text-[11px] uppercase tracking-wider text-[#DFCA95]">
                  Balance at Check-in
                </span>
                <span className="text-lg font-bold text-white">
                  ₹{calculation.balanceAtCheckIn.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F4EFE6] px-6 py-4 border-t border-[#E8DFCE] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#143628]/75 text-center sm:text-left">
            <span>Includes vegetarian breakfast • Attached baths • Parking on-site</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              onClick={onClose}
              className="w-1/2 sm:w-auto cursor-pointer"
            >
              Cancel
            </Button>
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-1/2 sm:w-auto inline-flex items-center justify-center font-semibold rounded-md px-5 py-2.5 text-sm transition-colors text-white ${
                is3GuestUnitWith4Adults 
                  ? 'bg-gray-400 cursor-not-allowed pointer-events-none' 
                  : 'bg-[#C25E3E] hover:bg-[#AA4E31] shadow-sm cursor-pointer'
              }`}
            >
              <MessageSquare className="w-4 h-4 mr-2 text-white" />
              Pre-Book via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
