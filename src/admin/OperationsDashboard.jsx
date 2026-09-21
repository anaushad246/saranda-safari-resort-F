import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Home, Mail, ArrowRight, CheckCircle, Clock, Calendar } from 'lucide-react';
import { apiGetBookings, apiGetEnquiries, apiUpdateBookingStatus } from '../services/api';

export function OperationsDashboard({ user }) {
  const [bookings, setBookings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  const displayDate = today.toLocaleDateString('en-IN', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });

  const hour = today.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [bookingsRes, enquiriesRes] = await Promise.all([
          apiGetBookings(),
          apiGetEnquiries()
        ]);
        
        const bookingsList = bookingsRes?.data?.bookings || (Array.isArray(bookingsRes?.data) ? bookingsRes.data : []);
        const enquiriesList = enquiriesRes?.data?.enquiries || (Array.isArray(enquiriesRes?.data) ? enquiriesRes.data : []);

        setBookings(bookingsList);
        setEnquiries(enquiriesList);
      } catch (error) {
        console.error("Failed to load operations data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleQuickCheckIn = async (id) => {
    try {
      await apiUpdateBookingStatus(id, { status: 'checked_in' });
      setBookings(bookings.map(b => b._id === id ? { ...b, bookingStatus: 'checked_in', status: 'checked_in' } : b));
    } catch (e) {
      alert("Failed to update status.");
    }
  };

  const handleQuickComplete = async (id) => {
    try {
      await apiUpdateBookingStatus(id, { status: 'completed' });
      setBookings(bookings.map(b => b._id === id ? { ...b, bookingStatus: 'completed', status: 'completed' } : b));
    } catch (e) {
      alert("Failed to update status.");
    }
  };

  const getDateStr = (d) => {
    if (!d) return '';
    if (typeof d === 'string' && d.includes('T')) return d.split('T')[0];
    return String(d);
  };

  const getStatus = (b) => b.bookingStatus || b.status || 'pending';

  const arrivalsToday = bookings.filter(b => 
    getDateStr(b.checkIn || b.checkInDate) === todayStr && 
    getStatus(b) === 'confirmed'
  );

  const departuresToday = bookings.filter(b => 
    getDateStr(b.checkOut || b.checkOutDate) === todayStr && 
    getStatus(b) === 'checked_in'
  );

  const occupiedTonight = bookings.filter(b => {
    const checkIn = getDateStr(b.checkIn || b.checkInDate);
    const checkOut = getDateStr(b.checkOut || b.checkOutDate);
    const status = getStatus(b);
    return checkIn <= todayStr && checkOut > todayStr && (status === 'checked_in' || status === 'confirmed');
  });

  const newEnquiries = enquiries.filter(e => e.status === 'new');

  if (loading) {
    return <div className="p-8 text-center text-[#143628] animate-pulse">Loading operations data...</div>;
  }

  const renderGuestInfo = (b, showParty) => {
    const unitName = b.unit?.name || b.unitSnapshot?.name || 'Unit';
    const childCount = b.children5to10 || 0;
    return (
      <div>
        <span className="text-xs font-bold text-gray-500 block mb-0.5">{unitName}</span>
        <strong className="text-sm text-[#143628]">{b.guest?.name}</strong>
        {showParty && (
          <div className="text-xs text-gray-500 mt-0.5">
            {b.adults} Adults{childCount > 0 ? `, ${childCount} Child` : ''}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Greeting Banner */}
      <div className="bg-[#143628] text-[#F9F6F0] p-6 rounded-xl border border-[#C5A059]/30 shadow-md">
        <h2 className="font-serif text-2xl font-bold text-white">
          {greeting}, {user?.name || 'Administrator'}
        </h2>
        <p className="text-[#DFCA95] mt-1 text-sm flex items-center gap-2">
          <Calendar className="w-4 h-4" /> {displayDate}
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#143628]/10 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-700"><Home className="w-6 h-6" /></div>
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase block">Occupied Tonight</span>
            <span className="text-2xl font-bold font-serif text-[#143628]">{occupiedTonight.length} <span className="text-sm font-sans text-gray-400 font-normal">Units</span></span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#143628]/10 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-700"><ArrowRight className="w-6 h-6" /></div>
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase block">Arrivals Today</span>
            <span className="text-2xl font-bold font-serif text-[#143628]">{arrivalsToday.length}</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#143628]/10 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-700"><ArrowRight className="w-6 h-6 rotate-180" /></div>
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase block">Departures Today</span>
            <span className="text-2xl font-bold font-serif text-[#143628]">{departuresToday.length}</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[#143628]/10 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-rose-50 text-rose-700"><Mail className="w-6 h-6" /></div>
          <div>
            <span className="text-[11px] font-semibold text-gray-500 uppercase block">New Enquiries</span>
            <span className="text-2xl font-bold font-serif text-[#143628]">{newEnquiries.length}</span>
          </div>
        </div>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Arrivals Panel */}
        <div className="bg-white rounded-xl border border-[#143628]/10 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-[#143628] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Arrivals Pending Check-In
            </h3>
          </div>
          <div className="p-0">
            {arrivalsToday.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">No pending arrivals today.</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {arrivalsToday.map(b => (
                  <li key={b._id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {renderGuestInfo(b, true)}
                    <button 
                      onClick={() => handleQuickCheckIn(b._id)}
                      className="px-3 py-1.5 bg-emerald-800 text-white rounded text-xs font-medium hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      Mark Checked In
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Departures Panel */}
        <div className="bg-white rounded-xl border border-[#143628]/10 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-[#143628] flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" /> Pending Departures
            </h3>
          </div>
          <div className="p-0">
            {departuresToday.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">No pending departures today.</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {departuresToday.map(b => (
                  <li key={b._id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {renderGuestInfo(b, false)}
                    <button 
                      onClick={() => handleQuickComplete(b._id)}
                      className="px-3 py-1.5 bg-gray-800 text-white rounded text-xs font-medium hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      Mark Stay Complete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
