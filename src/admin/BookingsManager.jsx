import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Phone, MessageSquare, CheckCircle, Clock, XCircle, Users, ArrowRight, IndianRupee, AlertCircle } from 'lucide-react';
import { apiGetBookings, apiUpdateBookingStatus } from '../services/api';

const DEMO_BOOKINGS = [
  {
    _id: 'b-101',
    bookingReference: 'SSR-2026-A9F2',
    guest: { name: 'Aarav Sengupta', email: 'aarav.s@example.com', phone: '9830123456', city: 'Kolkata' },
    unitSnapshot: { name: 'Wooden Log House', code: 'WL-1' },
    checkInDate: '2026-10-15',
    checkOutDate: '2026-10-17',
    nights: 2,
    adults: 2,
    children5to10: 1,
    infantsUnder5: 0,
    nonVegPlan: true,
    bonfireAddon: true,
    pricingSnapshot: {
      totalPaise: 1980000,
      advancePayablePaise: 990000,
      balanceDueAtCheckInPaise: 990000
    },
    status: 'confirmed',
    createdAt: '2026-09-10T14:30:00.000Z'
  },
  {
    _id: 'b-102',
    bookingReference: 'SSR-2026-K3M8',
    guest: { name: 'Dr. Priya Mohanty', email: 'drpriya@example.com', phone: '9437198765', city: 'Bhubaneswar' },
    unitSnapshot: { name: 'Red-and-White Cottage 2', code: 'RW-2' },
    checkInDate: '2026-10-24',
    checkOutDate: '2026-10-25',
    nights: 1,
    adults: 3,
    children5to10: 0,
    infantsUnder5: 0,
    nonVegPlan: false,
    bonfireAddon: false,
    pricingSnapshot: {
      totalPaise: 650000,
      advancePayablePaise: 325000,
      balanceDueAtCheckInPaise: 325000
    },
    status: 'enquiry',
    createdAt: '2026-09-11T10:15:00.000Z'
  },
  {
    _id: 'b-103',
    bookingReference: 'SSR-2026-T8X1',
    guest: { name: 'Rohit & Sneha Verma', email: 'rohit.v@example.com', phone: '9821098765', city: 'Ranchi' },
    unitSnapshot: { name: 'Camping Tent A', code: 'TENT-A' },
    checkInDate: '2026-11-05',
    checkOutDate: '2026-11-06',
    nights: 1,
    adults: 2,
    children5to10: 0,
    infantsUnder5: 0,
    nonVegPlan: false,
    bonfireAddon: true,
    pricingSnapshot: {
      totalPaise: 349900,
      advancePayablePaise: 174950,
      balanceDueAtCheckInPaise: 174950
    },
    status: 'confirmed',
    createdAt: '2026-09-11T16:45:00.000Z'
  }
];

export function BookingsManager() {
  const [bookings, setBookings] = useState(DEMO_BOOKINGS);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const getStatus = (b) => {
    const s = b.bookingStatus || b.status || 'pending';
    return s === 'pending' ? 'enquiry' : s;
  };

  const getFinancials = (b) => {
    const totalPaise = b.financials?.totalPaise ?? b.pricingSnapshot?.totalPaise ?? 0;
    const advancePaise = b.financials?.advancePayablePaise ?? b.pricingSnapshot?.advancePayablePaise ?? Math.round(totalPaise / 2);
    const balancePaise = b.financials?.balanceDuePaise ?? b.pricingSnapshot?.balanceDueAtCheckInPaise ?? (totalPaise - advancePaise);
    return {
      totalRs: totalPaise / 100,
      advanceRs: advancePaise / 100,
      balanceRs: balancePaise / 100
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
      checkIn: fmt(b.checkIn || b.checkInDate),
      checkOut: fmt(b.checkOut || b.checkOutDate)
    };
  };

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await apiGetBookings();
      const list = res?.data?.bookings || (Array.isArray(res?.data) ? res.data : null);
      if (list && list.length) {
        setBookings(list);
      }
    } catch {
      // Fallback to demo bookings
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await apiUpdateBookingStatus(bookingId, { status: newStatus });
    } catch {
      // Fallback local update
    }
    setBookings(bookings.map(b => b._id === bookingId ? { ...b, bookingStatus: newStatus, status: newStatus } : b));
    setActiveModal(null);
  };

  const filteredBookings = bookings.filter(b => {
    const currentStatus = getStatus(b);
    const matchesStatus = statusFilter === 'all' || currentStatus === statusFilter;
    const matchesSearch = 
      b.bookingReference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guest?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guest?.phone?.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  // Financial calculations in rupees
  const totalRevenue = bookings
    .filter(b => ['confirmed', 'checked_in', 'completed'].includes(getStatus(b)))
    .reduce((sum, b) => sum + getFinancials(b).totalRs, 0);

  const totalAdvanceCollected = bookings
    .filter(b => ['confirmed', 'checked_in', 'completed'].includes(getStatus(b)))
    .reduce((sum, b) => sum + getFinancials(b).advanceRs, 0);

  const totalBalanceDue = bookings
    .filter(b => getStatus(b) === 'confirmed')
    .reduce((sum, b) => sum + getFinancials(b).balanceRs, 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Confirmed (50% Paid)</span>;
      case 'enquiry':
      case 'pending':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1"><Clock className="w-3 h-3" /> Enquiry Pending</span>;
      case 'checked_in':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1">Checked In (On-site)</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1">Completed</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1"><XCircle className="w-3 h-3" /> Cancelled</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Financial Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#143628]/10 shadow-sm">
          <span className="text-[11px] font-semibold text-gray-500 uppercase block">Total Bookings</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-serif text-[#143628]">{bookings.length}</span>
            <span className="text-xs text-emerald-700 font-semibold">{bookings.filter(b => getStatus(b) === 'confirmed').length} Confirmed</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#143628]/10 shadow-sm">
          <span className="text-[11px] font-semibold text-gray-500 uppercase block">Gross Bookings Value</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-serif text-[#143628]">₹{totalRevenue.toLocaleString('en-IN')}</span>
            <span className="text-xs text-gray-400 font-mono">INR</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#143628]/10 shadow-sm">
          <span className="text-[11px] font-semibold text-emerald-800 uppercase block">50% Advance Collected</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-serif text-emerald-800">₹{totalAdvanceCollected.toLocaleString('en-IN')}</span>
            <span className="text-xs text-emerald-600 font-semibold">In Bank</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#143628]/10 shadow-sm">
          <span className="text-[11px] font-semibold text-amber-800 uppercase block">Balance Due at Check-In</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-serif text-amber-800">₹{totalBalanceDue.toLocaleString('en-IN')}</span>
            <span className="text-xs text-amber-600 font-semibold">50% Cash/UPI</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#143628]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['all', 'enquiry', 'confirmed', 'checked_in', 'completed', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                statusFilter === tab
                  ? 'bg-[#143628] text-[#DFCA95]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ref, guest name, phone..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059]"
          />
        </div>
      </div>

      {/* Bookings Ledger List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-gray-200 text-gray-400 text-xs">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            No bookings found matching the current filter.
          </div>
        ) : (
          filteredBookings.map((b) => {
            const currentStatus = getStatus(b);
            const { totalRs, advanceRs, balanceRs } = getFinancials(b);
            const { checkIn, checkOut } = getDates(b);
            const unitTitle = b.unit?.name || b.unitSnapshot?.name || b.unitName || 'Unit';
            const cleanPhone = b.guest?.phone?.replace(/\D/g, '');

            return (
              <div key={b._id} className="bg-white p-6 rounded-xl border border-[#143628]/10 shadow-sm hover:border-[#C5A059]/50 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {b.bookingReference}
                      </span>
                      {getStatusBadge(currentStatus)}
                      <span className="text-xs font-semibold text-[#143628] font-cinzel">
                        {unitTitle}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#143628] mt-1">
                      {b.guest?.name} {b.guest?.city && <span className="text-xs font-normal text-gray-500">({b.guest.city})</span>}
                    </h4>
                  </div>

                  {/* Contact Links */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${cleanPhone}`}
                      className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs flex items-center gap-1 font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5 text-gray-500" /> Call {b.guest?.phone}
                    </a>
                    <a
                      href={`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Hello ${b.guest?.name}, regarding your reservation ${b.bookingReference} at Saranda Safari Resort:`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-700 text-xs flex items-center gap-1 font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Guest
                    </a>
                  </div>
                </div>

                {/* Stay Details & Financials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 border-b border-gray-100 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-semibold">Dates & Duration</span>
                    <span className="font-bold text-[#143628] mt-0.5 block">
                      {b.checkInDate} → {b.checkOutDate} ({b.nights} {b.nights === 1 ? 'Night' : 'Nights'})
                    </span>
                    <span className="text-gray-500 mt-0.5 block">
                      Check-in: 09:00 AM • Check-out: 04:00 PM
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-semibold">Guest Party & Meals</span>
                    <span className="font-bold text-[#143628] mt-0.5 block">
                      {b.adults} Adults {b.children5to10 > 0 && `• ${b.children5to10} Child (5-10)`} {b.infantsUnder5 > 0 && `• ${b.infantsUnder5} Infant (<5)`}
                    </span>
                    <span className="text-gray-500 mt-0.5 block">
                      Plan: {b.nonVegPlan ? 'Non-Veg Meal Plan' : 'Default Vegetarian Meals'} {b.bonfireAddon && '• Bonfire Included'}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase font-semibold">Payment Breakdown (50 / 50 Rule)</span>
                    <div className="mt-0.5 space-y-0.5">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Tariff:</span>
                        <strong className="text-[#143628]">₹{totalRs.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between text-emerald-800">
                        <span>50% Advance (to confirm):</span>
                        <strong>₹{advanceRs.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between text-amber-800">
                        <span>50% Balance at Check-in:</span>
                        <strong>₹{balanceRs.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Management Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-[11px] text-gray-500">
                    * Advance is non-refundable. 7-day reschedule window. <strong>100% refund if resort cancels</strong>.
                  </div>

                  <div className="flex items-center gap-2">
                    {(currentStatus === 'enquiry' || currentStatus === 'pending') && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(b._id, 'confirmed')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-700 font-semibold cursor-pointer"
                      >
                        Confirm (50% Advance Received)
                      </button>
                    )}

                    {currentStatus === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(b._id, 'checked_in')}
                        className="px-3 py-1.5 rounded-lg bg-blue-800 text-white hover:bg-blue-700 font-semibold cursor-pointer"
                      >
                        Mark Checked In (Balance Received)
                      </button>
                    )}

                    {currentStatus === 'checked_in' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(b._id, 'completed')}
                        className="px-3 py-1.5 rounded-lg bg-purple-800 text-white hover:bg-purple-700 font-semibold cursor-pointer"
                      >
                        Mark Stay Completed
                      </button>
                    )}

                    {currentStatus !== 'cancelled' && currentStatus !== 'completed' && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Cancel this reservation? Note: If cancelled by the resort, the 100% full refund guarantee applies.')) {
                            handleUpdateStatus(b._id, 'cancelled');
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 font-semibold cursor-pointer"
                      >
                        Cancel Reservation
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
