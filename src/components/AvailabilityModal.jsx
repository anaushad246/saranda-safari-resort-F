import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, Calendar, Users, AlertCircle, CheckCircle2, MessageSquare, Info, 
  ShieldAlert, Clock, Copy, Check, ArrowLeft, ArrowRight, Printer, Sparkles 
} from 'lucide-react';
import { Button, Card, Badge } from './ui/Primitives';
import { stayInventory } from '../content/stayInventory';
import { resortInfo } from '../content/resortInfo';
import { apiCreateBooking } from '../services/api';

export function AvailabilityModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const unitsList = stayInventory?.units || [];
  const defaultUnitId = unitsList[0]?.id || 'riverwood';

  // Step state: 1 = 'select', 2 = 'details', 3 = 'receipt'
  const [step, setStep] = useState(1);

  // Form State (Step 1)
  const [selectedUnitType, setSelectedUnitType] = useState(defaultUnitId);
  const [checkInDate, setCheckInDate] = useState('2026-10-15');
  const [nights, setNights] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children5to10, setChildren5to10] = useState(0);
  const [infantsUnder5, setInfantsUnder5] = useState(0);
  const [includeBonfire, setIncludeBonfire] = useState(false);

  // Guest Details State (Step 2)
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // API Interaction State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Receipt / Confirmed Booking State (Step 3)
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [copiedField, setCopiedField] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isHoldExpired, setIsHoldExpired] = useState(false);

  const currentUnit = unitsList.find(u => u.id === selectedUnitType) || unitsList[0] || {
    id: 'riverwood',
    name: 'Riverwood',
    type: 'log_house',
    maxAdultsPerUnit: 4,
    unitCount: 1,
    pricingTiers: { 1: 3000, 2: 4000, 3: 5400, 4: 6600 }
  };

  const isCamping = currentUnit.type === 'camping' || selectedUnitType === 'camping-tents';

  // Calculated check-out date
  const checkOutDate = useMemo(() => {
    try {
      const d = new Date(checkInDate);
      if (isNaN(d.getTime())) return '';
      d.setDate(d.getDate() + Number(nights));
      return d.toISOString().split('T')[0];
    } catch {
      return '';
    }
  }, [checkInDate, nights]);

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

    // Bonfire add-on (cottages only)
    let bonfireTotal = 0;
    if (includeBonfire && !isCamping) {
      const billableBonfireGuests = Math.max(2, adults);
      bonfireTotal = billableBonfireGuests * 250 * nights;
    }

    const grandTotal = baseStayTotal + childrenTotal + bonfireTotal;
    const advance50 = Math.round(grandTotal * 0.5);
    const balanceAtCheckIn = grandTotal - advance50;

    return {
      baseRatePerNight,
      baseStayTotal,
      childrenTotal,
      bonfireTotal,
      grandTotal,
      advance50,
      balanceAtCheckIn
    };
  }, [selectedUnitType, currentUnit, isCamping, adults, nights, children5to10, includeBonfire, is3GuestMaxUnit]);

  // Live Countdown Timer for Step 3
  useEffect(() => {
    if (step !== 3 || !confirmedBooking?.holdExpiresAt) return;

    const timer = setInterval(() => {
      const expiresAt = new Date(confirmedBooking.holdExpiresAt).getTime();
      const now = Date.now();
      const diff = expiresAt - now;

      if (diff <= 0) {
        setTimeRemaining('00:00:00');
        setIsHoldExpired(true);
        clearInterval(timer);
      } else {
        const hrs = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining(
          `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [step, confirmedBooking]);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2500);
  };

  const handleProceedToDetails = () => {
    if (is3GuestUnitWith4Adults) {
      setErrorMessage('Please adjust party size or pick a larger unit (max 3 adults for this unit).');
      return;
    }
    setErrorMessage('');
    setStep(2);
  };

  const handleConfirmReservation = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!guestName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const cleanPhone = guestPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit WhatsApp phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const bookingPayload = {
        unitId: selectedUnitType,
        checkInDate,
        checkOutDate,
        nights,
        adults,
        children5to10,
        infantsUnder5,
        nonVegPlan: false,
        bonfireAddon: includeBonfire && !isCamping,
        guest: {
          name: guestName.trim(),
          phone: cleanPhone,
          email: guestEmail.trim() || undefined
        },
        specialRequests: specialRequests.trim() || undefined,
        source: 'website_enquiry'
      };

      const res = await apiCreateBooking(bookingPayload);
      const data = res.data || res;
      setConfirmedBooking(data);
      setStep(3);
    } catch (err) {
      console.error('Reservation creation failed:', err);
      setErrorMessage(err.message || 'Unable to place reservation hold. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateReceiptWhatsAppUrl = () => {
    if (!confirmedBooking) return '';
    const ref = confirmedBooking.bookingReference || 'SSR-HOLD';
    const adv = confirmedBooking.pricing?.advancePayable || calculation.advance50;
    const tot = confirmedBooking.pricing?.totalStay || calculation.grandTotal;

    const message = `*Advance Payment for Saranda Safari Resort Hold*
--------------------------------------------
• Booking ID: ${ref}
• Guest Name: ${guestName}
• WhatsApp: ${guestPhone}
• Unit: ${currentUnit.name}
• Check-in: ${checkInDate} (${isCamping ? '4:00 PM' : '9:00 AM'})
• Check-out: ${checkOutDate} (9:00 AM)
• Stay Total: ₹${tot.toLocaleString('en-IN')}
• 50% Advance: ₹${adv.toLocaleString('en-IN')}
--------------------------------------------
I have initiated the UPI transfer. Sharing screenshot for confirmation!`;

    return `https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0E261C]/80 backdrop-blur-sm animate-fadeIn print:static print:block print:p-0 print:bg-white print:backdrop-blur-none">
      <div
        className="bg-[#F9F6F0] rounded-xl shadow-2xl border border-[#E8DFCE] w-full max-w-3xl max-h-[94vh] flex flex-col overflow-hidden print:max-w-none print:max-h-none print:overflow-visible print:rounded-none print:border-0 print:shadow-none print:bg-white"
        role="dialog" 
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#143628] text-[#F9F6F0] px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-[#C5A059]/40 shrink-0 print:hidden">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#DFCA95] font-semibold">
                Direct Reservation & Instant 2-Hr Hold
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-white mt-0.5">
              {step === 1 && '1. Select Stay & View Tariffs'}
              {step === 2 && '2. Guest Information & Lock Hold'}
              {step === 3 && '3. Hold Confirmed & Payment Receipt'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#DFCA95] hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Step Progress Pill Bar */}
        <div className="bg-[#F4EFE6] px-6 py-2 border-b border-[#E8DFCE] flex items-center justify-between text-xs font-medium text-[#143628]/70 shrink-0 print:hidden">
          <span className={step >= 1 ? 'text-[#C25E3E] font-bold flex items-center gap-1.5' : ''}>
            <span className="w-5 h-5 rounded-full bg-[#C25E3E] text-white flex items-center justify-center text-[10px]">1</span>
            Accommodation
          </span>
          <span className="text-[#C5A059]">→</span>
          <span className={step >= 2 ? 'text-[#C25E3E] font-bold flex items-center gap-1.5' : ''}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#C25E3E] text-white' : 'bg-[#E8DFCE] text-[#143628]/60'}`}>2</span>
            Guest Details
          </span>
          <span className="text-[#C5A059]">→</span>
          <span className={step === 3 ? 'text-emerald-800 font-bold flex items-center gap-1.5' : ''}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-emerald-700 text-white' : 'bg-[#E8DFCE] text-[#143628]/60'}`}>3</span>
            Hold & Receipt
          </span>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-[#143628] print:p-0 print:overflow-visible">
          {/* Error Notice */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-900 rounded-lg p-3.5 flex items-start gap-2.5 text-xs sm:text-sm animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold">Notice:</span>
                <p className="mt-0.5 text-xs">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* STEP 1: Accommodation & Dates */}
          {step === 1 && (
            <>
              {/* Notice */}
              <div className="bg-[#F4EFE6] border border-[#C5A059]/50 rounded-lg p-3 flex items-start gap-2.5 text-xs text-[#143628]">
                <Info className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">October 2026 Season: </span>
                  <span>Direct reservations place an automatic 2-hour hold on the unit. 50% advance secures your stay with 100% refund guarantee if canceled by resort.</span>
                </div>
              </div>

              {/* Unit Selection */}
              <div>
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

              {/* Dates & Guests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#143628] mb-1.5">
                    Check-in Date (Oct 2026 Season)
                  </label>
                  <input
                    type="date"
                    min="2026-10-01"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  />
                  <span className="text-[11px] text-[#143628]/70 block mt-1">
                    {isCamping ? 'Check-in: 4:00 PM • Check-out: 9:00 AM' : 'Check-in: 9:00 AM • Check-out: 9:00 AM'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#143628] mb-1.5">
                    Stay Duration (Nights)
                  </label>
                  <select
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(n => {
                      let optionCheckOut = '';
                      try {
                        const d = new Date(checkInDate);
                        if (!isNaN(d.getTime())) {
                          d.setDate(d.getDate() + Number(n));
                          optionCheckOut = d.toISOString().split('T')[0];
                        }
                      } catch {}
                      return (
                        <option key={n} value={n}>
                          {n} Night{n > 1 ? 's' : ''} {optionCheckOut ? `(Check-out: ${optionCheckOut})` : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#143628]">
                      Adults (Age 11+)
                    </label>
                    <span className="text-[11px] text-[#8F6C27] font-medium">
                      {isCamping ? 'Max 5 across tents' : `Max ${maxAllowedAdults} in unit`}
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

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#143628]">
                      Children (Ages 5–10)
                    </label>
                    <span className="text-[11px] text-[#8F6C27] font-medium">
                      {isCamping ? '₹750 / child / night' : '₹700 / child / night'}
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
              </div>

              {/* Add-ons */}
              <div className="border-t border-[#E8DFCE] pt-3.5 space-y-2.5">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#143628]">
                  Optional Add-ons
                </h4>

                {!isCamping && (
                  <label className="flex items-start gap-3 p-2.5 rounded-lg border border-[#E8DFCE] bg-white cursor-pointer hover:border-[#C5A059]">
                    <input
                      type="checkbox"
                      checked={includeBonfire}
                      onChange={(e) => setIncludeBonfire(e.target.checked)}
                      className="mt-0.5 rounded text-[#C25E3E] focus:ring-[#C25E3E]"
                    />
                    <div className="text-xs sm:text-sm">
                      <span className="font-semibold text-[#143628]">Private Cottage Bonfire Hearth Add-on</span>
                      <p className="text-[#143628]/70 text-xs mt-0.5">
                        ₹250/guest (min 2 paying guests = ₹500) with freshly arranged riverfront lawn hearth.
                      </p>
                    </div>
                  </label>
                )}
              </div>

              {/* Price Calculation Card */}
              <div className="bg-[#143628] text-[#F9F6F0] rounded-lg p-4 sm:p-5 space-y-2.5">
                <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-2">
                  <span className="text-xs uppercase tracking-wider text-[#DFCA95] font-semibold">
                    Estimated Tariff Breakdown
                  </span>
                  <span className="text-xs text-[#DFCA95]">
                    {isCamping ? 'Includes complimentary breakfast' : 'Includes breakfast, lunch & dinner'}
                  </span>
                </div>

                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span>Base Accommodation ({nights} night(s), {adults} adult(s))</span>
                    <span className="font-medium">₹{calculation.baseStayTotal.toLocaleString('en-IN')}</span>
                  </div>
                  {children5to10 > 0 && (
                    <div className="flex justify-between">
                      <span>Children (5–10 yrs: {children5to10})</span>
                      <span className="font-medium">+₹{calculation.childrenTotal.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {includeBonfire && !isCamping && (
                    <div className="flex justify-between">
                      <span>Bonfire Hearth</span>
                      <span className="font-medium">+₹{calculation.bonfireTotal.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="border-t border-[#C5A059]/30 pt-2 flex justify-between text-base sm:text-lg font-serif font-bold text-white">
                    <span>Total Stay Estimate</span>
                    <span className="text-[#DFCA95]">₹{calculation.grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="bg-[#0E261C] rounded p-2.5 grid grid-cols-2 gap-2 text-center border border-[#C5A059]/40 mt-2">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-[#DFCA95]">50% Advance to Confirm</span>
                    <span className="text-lg font-bold text-[#C5A059]">₹{calculation.advance50.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-l border-[#C5A059]/30 pl-2">
                    <span className="block text-[11px] uppercase tracking-wider text-[#DFCA95]">Balance at Check-in</span>
                    <span className="text-lg font-bold text-white">₹{calculation.balanceAtCheckIn.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* STEP 2: Guest Details & Confirm Hold */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Selected summary pill */}
              <div className="bg-[#143628]/5 border border-[#C5A059]/40 rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
                <div>
                  <span className="font-bold text-[#143628]">{currentUnit.name}</span>
                  <span className="text-[#143628]/70 block">
                    {checkInDate} to {checkOutDate} ({nights} Night{nights > 1 ? 's' : ''}) • {adults} Adult{adults > 1 ? 's' : ''}{children5to10 > 0 ? `, ${children5to10} Child(ren)` : ''}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#143628]/70 block">50% Advance Required</span>
                  <span className="text-base font-bold text-[#C25E3E]">₹{calculation.advance50.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Guest Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#143628] mb-1">
                    Primary Guest Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singh"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#143628] mb-1">
                    WhatsApp Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  />
                  <span className="text-[11px] text-[#143628]/70 block mt-0.5">Used for booking reference & UPI confirmation</span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#143628] mb-1">
                    Email Address <span className="text-xs text-[#143628]/50 font-normal">(Optional for e-receipt)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. guest@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#143628] mb-1">
                    Special Requests or Arrival Notes <span className="text-xs text-[#143628]/50 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Estimated arrival time 11:30 AM, senior citizens in party, etc."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-white border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              {/* Hold Policy Notice */}
              <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-3 flex items-start gap-2.5 text-xs">
                <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Automatic 2-Hour Reservation Hold:</span>
                  <p className="mt-0.5">
                    Once submitted, your accommodation is locked in the resort system for <strong>2 hours</strong>. Transfer the 50% advance via UPI to permanently confirm your reservation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Hold Confirmed & Payment Receipt */}
          {step === 3 && confirmedBooking && (
            <div className="space-y-4 animate-fadeIn">
              {/* Green Success Confirmation Banner */}
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold block">Temporary Hold Active</span>
                    <h4 className="font-serif text-xl font-bold text-emerald-900">Unit Held for 2 Hours!</h4>
                    <p className="text-xs text-emerald-800 mt-0.5">Your reservation reference has been generated in the resort registry.</p>
                  </div>
                </div>

                {/* Booking Reference Pill */}
                <div className="bg-white border-2 border-emerald-600 rounded-lg px-3.5 py-2 text-center shadow-sm">
                  <span className="text-[10px] uppercase tracking-wider text-[#143628]/60 font-semibold block">Booking Reference</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#143628]">
                      {confirmedBooking.bookingReference}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(confirmedBooking.bookingReference, 'ref')}
                      className="text-gray-500 hover:text-[#143628] cursor-pointer p-1 rounded hover:bg-gray-100"
                      title="Copy Reference ID"
                    >
                      {copiedField === 'ref' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* 2-Hour Countdown Timer */}
              <div className={`rounded-lg p-3 flex items-center justify-between border text-xs sm:text-sm ${
                isHoldExpired 
                  ? 'bg-red-50 border-red-300 text-red-900' 
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}>
                <div className="flex items-center gap-2 font-medium">
                  <Clock className={`w-4 h-4 ${isHoldExpired ? 'text-red-600' : 'text-amber-700 animate-spin-slow'}`} />
                  <span>
                    {isHoldExpired 
                      ? 'Hold Expired! Unit may be released to other guests.' 
                      : 'Hold Expiry Countdown (Time to send advance):'}
                  </span>
                </div>
                <div className="font-mono font-bold text-sm sm:text-base">
                  {timeRemaining || '02:00:00'}
                </div>
              </div>

              {/* Stay Summary Card */}
              <div className="bg-white border border-[#E8DFCE] rounded-lg p-4 text-xs sm:text-sm space-y-2">
                <div className="flex justify-between border-b border-[#E8DFCE] pb-2 font-serif font-bold text-[#143628]">
                  <span>{currentUnit.name} ({confirmedBooking.unit?.code || 'Assigned'})</span>
                  <span className="text-[#C25E3E]">₹{(confirmedBooking.pricing?.totalStay || calculation.grandTotal).toLocaleString('en-IN')} Total</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#143628]/80">
                  <div>
                    <span className="text-[10px] uppercase text-[#143628]/50 block">Check-in</span>
                    <span className="font-semibold">{checkInDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#143628]/50 block">Check-out</span>
                    <span className="font-semibold">{checkOutDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#143628]/50 block">Guests</span>
                    <span className="font-semibold">{adults} Adults{children5to10 > 0 ? `, ${children5to10} Kids` : ''}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#143628]/50 block">Primary Guest</span>
                    <span className="font-semibold">{guestName}</span>
                  </div>
                </div>
              </div>

              {/* Official UPI Payment Details */}
              <div className="bg-[#143628] text-[#F9F6F0] rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-2">
                  <span className="text-xs uppercase tracking-wider text-[#DFCA95] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]\" />
                    Official UPI Deposit Details
                  </span>
                  <span className="text-xs font-bold text-[#C5A059]">
                    Pay 50%: ₹{(confirmedBooking.pricing?.advancePayable || calculation.advance50).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {confirmedBooking?.paymentInstructions?.upiVpa ? (
                    <div className="bg-[#0E261C] p-3 rounded-lg border border-[#C5A059]/30 space-y-1.5">
                      <span className="text-[10px] uppercase text-[#DFCA95] block">Official Resort UPI ID</span>
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-white text-sm">{confirmedBooking.paymentInstructions.upiVpa}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(confirmedBooking.paymentInstructions.upiVpa, 'upi')}
                          className="text-[#DFCA95] hover:text-white cursor-pointer p-1 rounded hover:bg-white/10"
                          title="Copy UPI ID"
                        >
                          {copiedField === 'upi' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                      <span className="text-[11px] text-[#DFCA95]/80 block">Payee Name: Saranda Safari Resort</span>
                    </div>
                  ) : (
                    <div className="bg-[#0E261C] p-3 rounded-lg border border-[#C5A059]/30 space-y-1.5">
                      <span className="text-[10px] uppercase text-[#DFCA95] block">Payment Concierge</span>
                      <p className="text-white text-xs leading-snug">Official UPI & Bank Transfer details provided via WhatsApp.</p>
                      <span className="text-[11px] text-[#DFCA95]/80 block">Helpline: +91 {confirmedBooking?.paymentInstructions?.phone || '9899373222'}</span>
                    </div>
                  )}

                  <div className="bg-[#0E261C] p-3 rounded-lg border border-[#C5A059]/30 space-y-1.5">
                    <span className="text-[10px] uppercase text-[#DFCA95] block">Balance Due on Arrival</span>
                    <div className="font-serif font-bold text-base text-white">
                      ₹{(confirmedBooking.pricing?.balanceAtCheckIn || calculation.balanceAtCheckIn).toLocaleString('en-IN')}
                    </div>
                    <span className="text-[11px] text-[#DFCA95]/80 block">Payable at reception during check-in</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#DFCA95]/80 text-center sm:text-left">
                  After transferring the 50% advance via GPay, PhonePe, or Paytm, click the green WhatsApp button below to share the screenshot. Our desk will confirm your booking immediately.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F4EFE6] px-5 sm:px-6 py-3 sm:py-4 border-t border-[#E8DFCE] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 print:hidden">
          {/* Left notice / back */}
          <div className="text-xs text-[#143628]/75 text-center sm:text-left">
            {step === 1 && (
              <span>
                {isCamping
                  ? 'Includes complimentary vegetarian breakfast • Shared washroom block • Parking on-site'
                  : 'Includes vegetarian breakfast, lunch & dinner • Attached baths • Parking on-site'}
              </span>
            )}
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center text-xs font-semibold text-[#143628] hover:text-[#C25E3E] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Accommodation
              </button>
            )}
            {step === 3 && (
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center text-xs font-semibold text-[#143628] hover:text-[#C25E3E] cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 mr-1" /> Print / Save Receipt
              </button>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {step === 1 && (
              <>
                <Button
                  variant="outline"
                  size="md"
                  onClick={onClose}
                  className="w-1/2 sm:w-auto cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleProceedToDetails}
                  className="w-1/2 sm:w-auto cursor-pointer bg-[#C25E3E] hover:bg-[#AA4E31] text-white"
                >
                  Proceed to Guest Details <ArrowRight className="w-4 h-4 ml-1.5 inline" />
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setStep(1)}
                  className="w-1/3 sm:w-auto cursor-pointer"
                >
                  Back
                </Button>
                <button
                  type="button"
                  onClick={handleConfirmReservation}
                  disabled={isSubmitting}
                  className="flex-1 sm:w-auto inline-flex items-center justify-center font-semibold rounded-md px-5 py-2.5 text-sm transition-colors text-white bg-[#C25E3E] hover:bg-[#AA4E31] shadow-sm cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Securing 2-Hr Hold...
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 mr-2" />
                      Lock 2-Hour Reservation Hold
                    </>
                  )}
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <Button
                  variant="outline"
                  size="md"
                  onClick={onClose}
                  className="w-1/3 sm:w-auto cursor-pointer"
                >
                  Done
                </Button>
                <a
                  href={generateReceiptWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:w-auto inline-flex items-center justify-center font-semibold rounded-md px-5 py-2.5 text-sm transition-colors text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Proof on WhatsApp
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
