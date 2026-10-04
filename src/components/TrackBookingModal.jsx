import React, { useState } from 'react';
import { 
  X, Search, Clock, CheckCircle2, AlertCircle, Phone, 
  ArrowRight, ShieldCheck, HelpCircle, MessageSquare 
} from 'lucide-react';
import { Button } from './ui/Primitives';
import { apiLookupBooking } from '../services/api';
import { saveActiveHold } from '../utils/bookingHoldCache';
import { resortInfo } from '../content/resortInfo';

export function TrackBookingModal({ isOpen, onClose, onOpenPaymentStep }) {
  const [reference, setReference] = useState('');
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [foundBooking, setFoundBooking] = useState(null);

  // Forgot reference state
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [recoveryHold, setRecoveryHold] = useState(null);

  if (!isOpen) return null;

  const handleLookup = async (e) => {
    e?.preventDefault();
    setErrorMsg('');
    setFoundBooking(null);
    setRecoveryHold(null);

    const cleanRef = reference.trim().toUpperCase();
    const cleanPhone = mobile.replace(/\D/g, '').slice(-10);

    if (!cleanRef) {
      setErrorMsg('Please enter your Booking Reference (e.g. SSR-2026-XXXX).');
      return;
    }
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiLookupBooking({ reference: cleanRef, mobile: cleanPhone });
      const booking = res.data?.booking || res.data;
      if (booking) {
        setFoundBooking(booking);
        // Cache if it's still a pending hold
        if (booking.bookingStatus === 'pending' && booking.holdExpiresAt) {
          saveActiveHold({
            bookingReference: booking.bookingReference,
            expiresAt: booking.holdExpiresAt,
            phone: cleanPhone
          });
        }
      } else {
        setErrorMsg('No reservation found matching these details. Please double-check and try again.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'No reservation found matching these details. Please double-check and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverByPhone = async (e) => {
    e?.preventDefault();
    setErrorMsg('');
    setFoundBooking(null);
    setRecoveryHold(null);

    const cleanPhone = mobile.replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter your registered 10-digit Indian mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiLookupBooking({ mobile: cleanPhone });
      const data = res.data || res;
      if (data.hasActiveHold && data.bookingReference) {
        setRecoveryHold(data);
        setReference(data.bookingReference);
      } else {
        setErrorMsg('No active pending reservation found for this mobile number.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Unable to check reservation hold.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToPayment = (booking) => {
    onClose();
    if (onOpenPaymentStep) {
      onOpenPaymentStep(booking);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0E261C]/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#F9F6F0] rounded-xl shadow-2xl border border-[#E8DFCE] w-full max-w-lg flex flex-col overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#143628] text-[#F9F6F0] px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#C5A059]/40">
          <div className="flex items-center gap-2.5">
            <Search className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-white leading-tight">Track Your Reservation</h3>
              <p className="text-[11px] text-[#DFCA95]">Saranda Safari Resort Registry</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {!foundBooking ? (
            <>
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-900 rounded-lg text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Forgot Reference Recovery Notice */}
              {recoveryHold && (
                <div className="p-3.5 bg-amber-50 border border-[#C5A059] text-amber-950 rounded-lg text-xs space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-[#143628]">
                    <Clock className="w-4 h-4 text-[#C25E3E]" />
                    <span>Active Hold Found!</span>
                  </div>
                  <p className="text-stone-700">
                    Booking Reference: <strong className="font-mono text-[#143628] font-bold">{recoveryHold.bookingReference}</strong>
                  </p>
                  <p className="text-[11px] text-stone-600">
                    Click <strong>Verify & View Payment</strong> below to unlock full stay details and UPI instructions.
                  </p>
                </div>
              )}

              <form onSubmit={isForgotMode ? handleRecoverByPhone : handleLookup} className="space-y-3.5">
                {!isForgotMode && (
                  <div>
                    <label className="block text-xs font-semibold text-[#143628] uppercase tracking-wider mb-1">
                      Booking Reference ID *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SSR-2026-A1B2"
                      value={reference}
                      onChange={(e) => setReference(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2 rounded-md border border-[#E8DFCE] bg-white text-[#143628] font-mono text-sm uppercase placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-[#143628]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#143628] uppercase tracking-wider mb-1">
                    Registered Mobile Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit WhatsApp number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-11 pr-3.5 py-2 rounded-md border border-[#E8DFCE] bg-white text-[#143628] text-sm focus:outline-none focus:ring-2 focus:ring-[#143628]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#143628] hover:bg-[#0E261C] text-white font-semibold cursor-pointer justify-center"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Verifying...
                      </span>
                    ) : isForgotMode ? (
                      'Find My Active Hold'
                    ) : (
                      'Track Reservation'
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotMode(!isForgotMode);
                      setErrorMsg('');
                      setRecoveryHold(null);
                    }}
                    className="text-xs text-[#143628]/70 hover:text-[#C25E3E] text-center cursor-pointer py-1"
                  >
                    {isForgotMode ? '← Back to Reference ID lookup' : 'Forgot Booking Reference ID?'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Verified Booking Details Result Card */
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white border border-[#E8DFCE] rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#E8DFCE] pb-2.5">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#143628]/60">Booking Reference</span>
                    <div className="font-mono text-base font-bold text-[#143628]">{foundBooking.bookingReference}</div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      foundBooking.bookingStatus === 'confirmed' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : foundBooking.bookingStatus === 'pending'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {foundBooking.bookingStatus === 'confirmed' && 'Confirmed Reservation'}
                      {foundBooking.bookingStatus === 'pending' && 'Temporary 2-Hr Hold'}
                      {foundBooking.bookingStatus === 'cancelled' && 'Cancelled'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 block">Accommodation</span>
                    <span className="font-semibold text-[#143628]">{foundBooking.unit?.name || 'Assigned Unit'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 block">Guest Name</span>
                    <span className="font-semibold text-[#143628]">{foundBooking.guest?.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 block">Check-in</span>
                    <span className="font-semibold text-[#143628]">{new Date(foundBooking.checkIn).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 block">Check-out</span>
                    <span className="font-semibold text-[#143628]">{new Date(foundBooking.checkOut).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>

                <div className="border-t border-[#E8DFCE] pt-2.5 flex items-center justify-between text-xs">
                  <span className="text-gray-600">Total Stay Amount:</span>
                  <span className="font-serif font-bold text-sm text-[#143628]">
                    ₹{(Math.round((foundBooking.financials?.totalPaise || 0) / 100)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {foundBooking.bookingStatus === 'pending' ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 space-y-2 text-xs text-amber-950">
                  <p className="font-medium">
                    Your unit is held in the resort registry. Please complete the 50% advance deposit via UPI to confirm.
                  </p>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleProceedToPayment(foundBooking)}
                    className="w-full bg-[#C25E3E] hover:bg-[#AA4E31] text-white font-semibold cursor-pointer justify-center"
                  >
                    View UPI QR & Send Proof on WhatsApp <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your booking is confirmed! We look forward to hosting you at Saranda Safari Resort.</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setFoundBooking(null)}
                className="w-full text-xs text-gray-500 hover:text-[#143628] text-center cursor-pointer py-1"
              >
                Track another reservation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
