import React, { useState, useEffect } from 'react';
import { Mail, Phone, MessageSquare, Car, Compass, Calendar, CheckCircle2, Clock, Filter, AlertCircle } from 'lucide-react';
import { apiGetEnquiries, apiUpdateEnquiry } from '../services/api';

export function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiGetEnquiries();
      const list = res?.data?.enquiries || (Array.isArray(res?.data) ? res.data : []);
      setEnquiries(list);
    } catch (err) {
      setError(err.message || 'Failed to load enquiries from database.');
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiUpdateEnquiry(id, { status: newStatus });
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: newStatus } : e));
    } catch (err) {
      alert(`Could not update enquiry status: ${err.message}`);
    }
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesType = typeFilter === 'all' || e.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pickup':
        return <Car className="w-4 h-4 text-emerald-700" />;
      case 'sightseeing':
        return <Compass className="w-4 h-4 text-blue-700" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-amber-700" />;
      default:
        return <Mail className="w-4 h-4 text-gray-700" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-100 text-rose-800 border border-rose-200">New Request</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-200">Contacted</span>;
      case 'quoted':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-800 border border-blue-200">Quoted</span>;
      case 'closed':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gray-100 text-gray-700 border border-gray-200">Closed</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] uppercase bg-gray-100 text-gray-600">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-xl border border-[#143628]/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Type:
          </span>
          {['all', 'pickup', 'sightseeing', 'event'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                typeFilter === t ? 'bg-[#143628] text-[#DFCA95]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t === 'pickup' ? 'Station Pickups' : t === 'sightseeing' ? 'Sightseeing Assistance' : t === 'event' ? 'Group / Events' : 'All Requests'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">Status:</span>
          {['all', 'new', 'contacted', 'quoted', 'closed'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 rounded text-xs font-medium capitalize transition-colors cursor-pointer ${
                statusFilter === s ? 'bg-[#C5A059] text-[#143628] font-bold' : 'text-gray-600 hover:text-black'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Grid */}
      <div className="space-y-4">
        {filteredEnquiries.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-gray-200 text-gray-400 text-xs">
            <Mail className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            No enquiries found in this category.
          </div>
        ) : (
          filteredEnquiries.map((e) => {
            const cleanPhone = e.guest?.phone?.replace(/\D/g, '');
            return (
              <div key={e._id} className="bg-white p-6 rounded-xl border border-[#143628]/10 shadow-sm hover:border-[#C5A059]/50 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100">
                      {getTypeIcon(e.type)}
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wide text-[#143628]">
                        {getTypeLabel(e.type)}
                      </span>
                      <h4 className="text-sm font-bold text-[#143628] mt-0.5">{e.guest?.name}</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusBadge(e.status)}
                    <a
                      href={`tel:${cleanPhone}`}
                      className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
                      title="Call guest"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Hello ${e.guest?.name}, this is Saranda Safari Resort management regarding your ${e.type} request:`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-700 text-xs flex items-center gap-1 font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Response
                    </a>
                  </div>
                </div>

                {/* Details Breakdown */}
                {(() => {
                  const d = e.payload || e.details || {};
                  const isPickup = e.type === 'pickup' || e.type === 'pickup_drop';
                  const isSightseeing = e.type === 'sightseeing';
                  const isEvent = e.type === 'event' || e.type === 'event_venue';

                  return (
                    <div className="py-4 text-xs text-[#143628] space-y-1.5 bg-gray-50/60 p-4 rounded-lg my-3 border border-gray-100">
                      {isPickup && (
                        <>
                          <div><strong>Railway Station / Point:</strong> {d.arrivalPoint || d.station || 'Station'}</div>
                          <div><strong>Arrival Date:</strong> {d.arrivalDate || d.targetDate || '-'} {d.arrivalTime ? 'at ' + d.arrivalTime : ''}</div>
                          <div><strong>Passengers:</strong> {d.passengerCount || d.passengers || '-'} Guests</div>
                          <div><strong>Vehicle Preference:</strong> {d.vehiclePreference || 'Standard'}</div>
                        </>
                      )}

                      {isSightseeing && (
                        <>
                          <div><strong>Target Circuit:</strong> {d.circuit || (Array.isArray(d.destinations) ? d.destinations.join(', ') : '-')}</div>
                          <div><strong>Preferred Date & Group Size:</strong> {d.preferredDate || d.sightseeingDate || '-'} ({d.partySize || '-'} Persons)</div>
                          {d.assistanceNeeded && <div><strong>Assistance Needed:</strong> {d.assistanceNeeded}</div>}
                        </>
                      )}

                      {isEvent && (
                        <>
                          <div><strong>Nature of Event:</strong> {d.eventType || '-'}</div>
                          <div><strong>Group Size:</strong> {d.groupSize || d.attendees || '-'} Guests (Max overnight cap: 25)</div>
                          <div><strong>Dates / Period:</strong> {d.dates || d.targetPeriod || '-'}</div>
                          {d.requirements && <div><strong>Specific Requirements:</strong> {d.requirements}</div>}
                        </>
                      )}

                      {!isPickup && !isSightseeing && !isEvent && (
                        <div><strong>Message / Request:</strong> {d.message || JSON.stringify(d)}</div>
                      )}
                    </div>
                  );
                })()}

                {/* Staff Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                  <div className="text-gray-500 text-[11px]">
                    Received on: {new Date(e.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500">Update Status:</span>
                    {['new', 'contacted', 'quoted', 'closed'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleStatusChange(e._id, s)}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize cursor-pointer ${
                          e.status === s ? 'bg-[#143628] text-white font-bold' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
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
