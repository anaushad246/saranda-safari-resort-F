import React, { useState, useEffect } from 'react';
import {
  BookOpen, Search, Phone, MessageSquare, CheckCircle, Clock, XCircle,
  Users, ArrowRight, IndianRupee, AlertCircle, RefreshCw, LogIn, LogOut, ShieldAlert, X
} from 'lucide-react';
import { apiGetBookings, apiUpdateBookingStatus } from '../services/api';

// Mirrors the paymentStatus enum on the Booking model.
const PAYMENT_BADGES = {
  pending: { label: 'Payment Awaited', cls: 'bg-amber-50 text-amber-800 border-amber-200' },
  advance_paid: { label: 'Advance Paid', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  fully_paid: { label: 'Fully Paid', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  refunded: { label: 'Refunded', cls: 'bg-sky-50 text-sky-700 border-sky-200' },
  failed: { label: 'Payment Failed', cls: 'bg-red-50 text-red-700 border-red-200' }
};

export function BookingsManager() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  const [verifyingBooking, setVerifyingBooking] = useState(null);
  const [utrInput, setUtrInput] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await apiGetBookings();
      const list = res?.data?.bookings || (Array.isArray(res?.data) ? res.data : []);
      setBookings(list);
    } catch (err) {
      setFetchError(err.message || 'Failed to connect to reservations database.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (b) => {
    return b.bookingStatus || 'pending';
  };

  const isHoldActive = (b) => {
    if (getStatus(b) !== 'pending') return false;
    if (!b.holdExpiresAt) return true;
    return new Date(b.holdExpiresAt) > new Date();
  };

  const getRemainingHoldTime = (holdExpiresAt) => {
    if (!holdExpiresAt) return null;
    const diffMs = new Date(holdExpiresAt) - new Date();
    if (diffMs <= 0) return 'Expired';
    const totalMinutes = Math.floor(diffMs / (60 * 1000));
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours > 0) return `${hours}h ${mins}m remaining`;
    return `${mins}m remaining`;
  };

  const getFinancials = (b) => {
    const totalPaise = b.financials?.totalPaise ?? b.priceSnapshot?.baseRateApplied ?? 0;
    const advancePaise = b.financials?.advancePayablePaise ?? Math.round(totalPaise / 2);
    const balancePaise = b.financials?.balanceDuePaise ?? (totalPaise - advancePaise);
    return {
      totalRs: Math.round(totalPaise / 100),
      advanceRs: Math.round(advancePaise / 100),
      balanceRs: Math.round(balancePaise / 100)
    };
  };

  const getDates = (b) => {
    const fmt = (d) => {
      if (!d) return '';
      if (typeof d === 'string' && d.includes('T')) return d.split('T')[0];
      if (d instanceof Date) return d.toISOString().split('T')[0];
      return String(d);
    };
    return {
      checkIn: fmt(b.checkIn),
      checkOut: fmt(b.checkOut)
    };
  };

  // `transactionReference` is the 4th argument the Verify Advance modal passes. It was missing
  // from this signature, so the operator's UTR was silently thrown away and the audit trail
  // recorded transactionReference: null.
  const handleStatusChange = async (booking, newStatus, paymentStatus = null, transactionReference = null) => {
    setActionLoadingId(booking._id);
    setActionMessage(null);
    try {
      const payload = { status: newStatus };
      if (paymentStatus) payload.paymentStatus = paymentStatus;
      if (transactionReference) payload.transactionReference = transactionReference;
      const res = await apiUpdateBookingStatus(booking._id, payload);
      const updated = res?.data || {
        ...booking,
        bookingStatus: newStatus,
        ...(paymentStatus ? { paymentStatus } : {}),
        ...(transactionReference ? { transactionReference } : {})
      };

      setBookings(prev => prev.map(b => (b._id === booking._id ? updated : b)));
      setActionMessage({
        type: 'success',
        text: `Booking ${booking.bookingReference} status updated to ${newStatus.replace('_', ' ')}.`
      });
      // The modal has no other exit on success — without this it stayed open over the row.
      setVerifyingBooking(null);
      setUtrInput('');
    } catch (err) {
      setActionMessage({
        type: 'error',
        text: `Could not update ${booking.bookingReference}: ${err.message}`
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Status Filter Logic
  const filteredBookings = bookings.filter(b => {
    const status = getStatus(b);
    let matchesStatus = true;
    if (statusFilter === 'pending') {
      matchesStatus = status === 'pending';
    } else if (statusFilter === 'confirmed') {
      matchesStatus = status === 'confirmed';
    } else if (statusFilter === 'checked_in') {
      matchesStatus = status === 'checked_in';
    } else if (statusFilter === 'checked_out') {
      matchesStatus = status === 'checked_out';
    } else if (statusFilter === 'cancelled_expired') {
      matchesStatus = status === 'cancelled' || status === 'expired';
    }

    const matchesSearch = 
      b.bookingReference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guest?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guest?.phone?.includes(searchTerm);

    return matchesStatus && matchesSearch;
  });

  // Financial calculations in rupees
  const activePendingHoldsCount = bookings.filter(b => isHoldActive(b)).length;

  const totalRevenue = bookings
    .filter(b => ['confirmed', 'checked_in', 'checked_out'].includes(getStatus(b)))
    .reduce((sum, b) => sum + getFinancials(b).totalRs, 0);

  const totalAdvanceCollected = bookings
    .filter(b => ['confirmed', 'checked_in', 'checked_out'].includes(getStatus(b)) || b.paymentStatus === 'advance_paid')
    .reduce((sum, b) => sum + getFinancials(b).advanceRs, 0);

  const totalBalanceDue = bookings
    .filter(b => getStatus(b) === 'confirmed' || getStatus(b) === 'checked_in')
    .reduce((sum, b) => sum + getFinancials(b).balanceRs, 0);

  // The status badge below is driven by bookingStatus alone, so a confirmed-but-unpaid booking
  // and a confirmed-and-paid one rendered identically. This is the only place paymentStatus is
  // surfaced per row.
  const getPaymentBadge = (b) => {
    const pay = PAYMENT_BADGES[b.paymentStatus];
    if (!pay) return null;
    return (
      <span className={`inline-flex items-center px-1.5 py-0.5 mt-1.5 rounded border text-[10px] font-semibold uppercase tracking-wide ${pay.cls}`}>
        {pay.label}
      </span>
    );
  };

  const getStatusBadge = (b) => {
    const status = getStatus(b);
    if (status === 'pending') {
      const active = isHoldActive(b);
      const remaining = getRemainingHoldTime(b.holdExpiresAt);
      if (active) {
        return (
          <div className="flex flex-col gap-0.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 inline-flex items-center gap-1 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Pending Advance
            </span>
            {remaining && (
              <span className="text-[10px] text-amber-700 font-mono font-medium pl-1">
                ⏱ {remaining}
              </span>
            )}
          </div>
        );
      }
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-300 inline-flex items-center gap-1">
          <Clock className="w-3 h-3 text-gray-500" /> Hold Expired
        </span>
      );
    }

    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-600" /> Confirmed (50% Advance Paid)
          </span>
        );
      case 'checked_in':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300 inline-flex items-center gap-1">
            <LogIn className="w-3 h-3 text-blue-600" /> Checked In (On-site)
          </span>
        );
      case 'checked_out':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300 inline-flex items-center gap-1">
            <LogOut className="w-3 h-3 text-purple-600" /> Completed (Checked Out)
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300 inline-flex items-center gap-1">
            <XCircle className="w-3 h-3 text-rose-600" /> Cancelled
          </span>
        );
      case 'expired':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600 border border-gray-200 inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-400" /> Expired
          </span>
        );
      default:
        return <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Banners */}
      {actionMessage && (
        <div className={`p-3.5 rounded-lg border text-xs sm:text-sm font-medium flex items-center justify-between ${
          actionMessage.type === 'error'
            ? 'bg-rose-50 text-rose-800 border-rose-200'
            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
        }`}>
          <span>{actionMessage.text}</span>
          <button onClick={() => setActionMessage(null)} className="text-gray-400 hover:text-gray-600 text-base font-bold ml-2">×</button>
        </div>
      )}

      {fetchError && (
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium">{fetchError}</span>
          </div>
          <button
            onClick={loadBookings}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-md text-xs font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        </div>
      )}

      {/* Financial Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#143628]/10 shadow-sm">
          <span className="text-[11px] font-semibold text-gray-500 uppercase block">Total Reservations</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-serif text-[#143628]">{bookings.length}</span>
            {activePendingHoldsCount > 0 && (
              <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {activePendingHoldsCount} Active Hold{activePendingHoldsCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#143628]/10 shadow-sm">
          <span className="text-[11px] font-semibold text-gray-500 uppercase block">Confirmed Stays Value</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-serif text-[#143628]">₹{totalRevenue.toLocaleString('en-IN')}</span>
            <span className="text-xs text-gray-400 font-mono">INR</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#143628]/10 shadow-sm">
          <span className="text-[11px] font-semibold text-emerald-800 uppercase block">50% Advance Collected</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-serif text-emerald-800">₹{totalAdvanceCollected.toLocaleString('en-IN')}</span>
            <span className="text-xs text-emerald-600 font-semibold">Verified</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#143628]/10 shadow-sm">
          <span className="text-[11px] font-semibold text-amber-800 uppercase block">Balance Due at Check-In</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-serif text-amber-800">₹{totalBalanceDue.toLocaleString('en-IN')}</span>
            <span className="text-xs text-amber-600 font-semibold">Upon Arrival</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#143628]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: `All (${bookings.length})` },
            { id: 'pending', label: `Pending Holds (${bookings.filter(b => getStatus(b) === 'pending').length})` },
            { id: 'confirmed', label: `Confirmed (${bookings.filter(b => getStatus(b) === 'confirmed').length})` },
            { id: 'checked_in', label: `Checked In (${bookings.filter(b => getStatus(b) === 'checked_in').length})` },
            { id: 'checked_out', label: `Checked Out (${bookings.filter(b => getStatus(b) === 'checked_out').length})` },
            { id: 'cancelled_expired', label: `Cancelled/Expired (${bookings.filter(b => ['cancelled', 'expired'].includes(getStatus(b))).length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === tab.id
                  ? 'bg-[#143628] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Ref, Name, Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
            />
          </div>
          <button
            onClick={loadBookings}
            disabled={loading}
            className="p-2 border border-gray-200 rounded-lg hover:border-[#C5A059] transition-colors cursor-pointer text-gray-600"
            title="Refresh Ledger"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-[#143628]/10 shadow-sm overflow-hidden">
        {loading && bookings.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#143628] mb-2" />
            Loading real-time reservations ledger from database...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-500">
            <BookOpen className="w-8 h-8 mx-auto text-gray-300 mb-2" />
            <p className="font-semibold text-gray-700">No reservations found in this category.</p>
            <p className="text-xs text-gray-400 mt-1">Live bookings submitted by guests on the website appear here automatically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Ref & Unit</th>
                  <th className="py-3 px-4">Guest Info</th>
                  <th className="py-3 px-4">Stay Dates</th>
                  <th className="py-3 px-4">Party</th>
                  <th className="py-3 px-4">Financials (50%)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Operational Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredBookings.map((b) => {
                  const status = getStatus(b);
                  const { totalRs, advanceRs, balanceRs } = getFinancials(b);
                  const { checkIn, checkOut } = getDates(b);
                  const unitTitle = b.unit?.name || b.priceSnapshot?.unitName || 'Unit';
                  const unitCode = b.unit?.code || '';
                  const cleanPhone = b.guest?.phone?.replace(/\D/g, '') || '';
                  const isActionLoading = actionLoadingId === b._id;

                  const whatsAppText = encodeURIComponent(
                    `*Saranda Safari Resort - Reservation Voucher*\n\n` +
                    `Dear ${b.guest?.name},\n` +
                    `Booking Reference: ${b.bookingReference}\n` +
                    `Unit: ${unitTitle} (${unitCode})\n` +
                    `Check-In: ${checkIn}\n` +
                    `Check-Out: ${checkOut}\n` +
                    `50% Advance: ₹${advanceRs.toLocaleString('en-IN')} (${b.paymentStatus === 'advance_paid' || status === 'confirmed' ? 'CONFIRMED' : 'AWAITED'})\n` +
                    `Balance at Check-In: ₹${balanceRs.toLocaleString('en-IN')}\n\n` +
                    `Thank you for choosing Saranda Safari Resort, Bolani, Keonjhar, Odisha.`
                  );

                  return (
                    <tr key={b._id} className="hover:bg-amber-50/20 transition-colors">
                      {/* Ref & Unit */}
                      <td className="py-3.5 px-4 font-medium">
                        <div className="font-mono font-bold text-sm text-[#143628]">{b.bookingReference}</div>
                        <div className="text-[11px] text-gray-600 font-semibold mt-0.5">{unitTitle} {unitCode && <span className="text-gray-400">({unitCode})</span>}</div>
                        {b.source && <div className="text-[10px] text-gray-400 uppercase font-mono">{b.source.replace('_', ' ')}</div>}
                      </td>

                      {/* Guest Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-900">{b.guest?.name}</div>
                        <div className="text-gray-500 font-mono text-[11px] mt-0.5">{b.guest?.phone}</div>
                        {b.guest?.email && <div className="text-gray-400 text-[10px]">{b.guest.email}</div>}
                        {b.specialRequests && (
                          <div className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 mt-1 max-w-[200px] truncate" title={b.specialRequests}>
                            Note: {b.specialRequests}
                          </div>
                        )}
                      </td>

                      {/* Stay Dates */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-800">{checkIn}</div>
                        <div className="text-gray-400 text-[11px] flex items-center gap-1">
                          to {checkOut} <span className="text-[#C5A059] font-bold">({b.nights}n)</span>
                        </div>
                      </td>

                      {/* Party */}
                      <td className="py-3.5 px-4 text-gray-700">
                        <div>{b.adults} Adult{b.adults > 1 ? 's' : ''}</div>
                        {b.children5to10 > 0 && <div className="text-gray-400 text-[11px]">{b.children5to10} Child(5-10)</div>}
                        {b.infantsUnder5 > 0 && <div className="text-gray-400 text-[11px]">{b.infantsUnder5} Under-5</div>}
                      </td>

                      {/* Financials */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900 font-mono">₹{totalRs.toLocaleString('en-IN')}</div>
                        <div className="text-emerald-700 text-[11px] font-medium">50% Adv: ₹{advanceRs.toLocaleString('en-IN')}</div>
                        <div className="text-amber-800 text-[10px]">Bal Due: ₹{balanceRs.toLocaleString('en-IN')}</div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {getStatusBadge(b)}
                        <div>{getPaymentBadge(b)}</div>
                      </td>

                      {/* Operational Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {/* WhatsApp Guest */}
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/91${cleanPhone}?text=${whatsAppText}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md border border-emerald-200 transition-colors"
                              title="Chat / Send Voucher on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* State Transition Actions */}
                          {status === 'pending' && (
                            <>
                              <button
                                onClick={() => { setVerifyingBooking(b); setUtrInput(''); }}
                                disabled={isActionLoading}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md text-[11px] transition-colors cursor-pointer"
                              >
                                {isActionLoading ? 'Saving...' : 'Verify Advance'}
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Release hold on ${b.bookingReference}? This will make the cottage available again.`)) {
                                    handleStatusChange(b, 'cancelled');
                                  }
                                }}
                                disabled={isActionLoading}
                                className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-md text-[11px] border border-rose-200 transition-colors cursor-pointer"
                              >
                                Cancel Hold
                              </button>
                            </>
                          )}

                          {status === 'confirmed' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(b, 'checked_in')}
                                disabled={isActionLoading}
                                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-[11px] transition-colors cursor-pointer"
                              >
                                {isActionLoading ? 'Saving...' : 'Check-In'}
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Cancel confirmed reservation ${b.bookingReference}?`)) {
                                    handleStatusChange(b, 'cancelled');
                                  }
                                }}
                                disabled={isActionLoading}
                                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-md text-[11px] transition-colors cursor-pointer"
                              >
                                Cancel
                              </button>
                            </>
                          )}

                          {status === 'checked_in' && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Collect ₹${balanceRs.toLocaleString('en-IN')} balance and check out ${b.guest?.name}?`)) {
                                  handleStatusChange(b, 'checked_out', 'fully_paid');
                                }
                              }}
                              disabled={isActionLoading}
                              className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md text-[11px] transition-colors cursor-pointer"
                            >
                              {isActionLoading ? 'Saving...' : 'Check-Out (Collect Bal)'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      {/* Verify Advance Payment Modal */}
      {verifyingBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-[#E8DFCE] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#143628]">Verify Advance Payment</h3>
              <button
                onClick={() => { setVerifyingBooking(null); setUtrInput(''); }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#FAF7F2] rounded-lg p-4 mb-4 text-xs space-y-2 border border-[#E8DFCE]">
              <div className="flex justify-between">
                <span className="text-gray-500">Booking Reference:</span>
                <span className="font-bold text-[#143628]">{verifyingBooking.bookingReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Guest Name:</span>
                <span className="font-semibold text-[#143628]">{verifyingBooking.guest?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Guest Phone:</span>
                <span className="font-semibold text-[#143628]">{verifyingBooking.guest?.phone}</span>
              </div>
              <div className="flex justify-between border-t border-[#E8DFCE] pt-2">
                <span className="text-[#8F6C27] font-semibold">50% Advance Required:</span>
                <span className="font-bold text-[#143628]">
                  ₹{Math.round((verifyingBooking.financials?.advancePayablePaise || 0) / 100).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#143628] uppercase tracking-wider mb-1.5">
                UPI / Bank UTR Reference (Optional)
              </label>
              <input
                type="text"
                value={utrInput}
                onChange={(e) => setUtrInput(e.target.value)}
                placeholder="e.g. 426819284729 or UPI-123456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                Verifying will confirm the booking, clear the 2-hour hold timer, and record the UTR in audit history.
              </p>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => { setVerifyingBooking(null); setUtrInput(''); }}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange(verifyingBooking, 'confirmed', 'advance_paid', utrInput.trim() || undefined)}
                disabled={actionLoadingId === verifyingBooking._id}
                className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                {actionLoadingId === verifyingBooking._id ? 'Verifying...' : 'Confirm & Mark Advance Paid'}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
