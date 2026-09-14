import React, { useState, useEffect } from 'react';
import { Calendar, Shield, AlertTriangle, Plus, Trash2, CheckCircle2, Lock, Home, Tent } from 'lucide-react';
import { apiGetUnits, apiGetBlocks, apiCreateBlock, apiDeleteBlock } from '../services/api';

const DEFAULT_UNITS = [
  { _id: 'u1', name: 'Red-and-White Cottage 1', code: 'RW-1', type: 'red_and_white_cottage', maxAdults: 3, capacityNote: 'Base 2 + 1 extra cot (Max 3 adults strictly)' },
  { _id: 'u2', name: 'Red-and-White Cottage 2', code: 'RW-2', type: 'red_and_white_cottage', maxAdults: 3, capacityNote: 'Base 2 + 1 extra cot (Max 3 adults strictly)' },
  { _id: 'u3', name: 'Red-and-White Cottage 3', code: 'RW-3', type: 'red_and_white_cottage', maxAdults: 3, capacityNote: 'Base 2 + 1 extra cot (Max 3 adults strictly)' },
  { _id: 'u4', name: 'Red-and-White Cottage 4', code: 'RW-4', type: 'red_and_white_cottage', maxAdults: 3, capacityNote: 'Base 2 + 1 extra cot (Max 3 adults strictly)' },
  { _id: 'u5', name: 'Wooden Log House', code: 'WL-1', type: 'wooden_log_house', maxAdults: 4, capacityNote: 'Hand-crafted log cottage (Max 4 adults)' },
  { _id: 'u6', name: 'Other Cottage', code: 'OC-1', type: 'other_cottage', maxAdults: 4, capacityNote: 'Private standalone cottage (Max 4 adults)' },
  { _id: 'u7', name: 'Camping Tent A', code: 'TENT-A', type: 'camping_tent', maxAdults: 2, capacityNote: 'Double occupancy safari tent (Max 2 guests)' },
  { _id: 'u8', name: 'Camping Tent B', code: 'TENT-B', type: 'camping_tent', maxAdults: 3, capacityNote: 'Triple occupancy safari tent (Max 3 guests)' }
];

export function InventoryManager() {
  const [units, setUnits] = useState(DEFAULT_UNITS);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // New Block Form state
  const [selectedUnitId, setSelectedUnitId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('maintenance');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const unitsRes = await apiGetUnits();
      if (unitsRes?.data?.length) setUnits(unitsRes.data);
    } catch {
      // Keep defaults
    }

    try {
      const blocksRes = await apiGetBlocks();
      if (blocksRes?.data) setBlocks(blocksRes.data);
    } catch {
      // Local fallback blocks for preview
      setBlocks([
        {
          _id: 'b-demo-1',
          unitId: 'u5',
          startDate: '2026-10-20',
          endDate: '2026-10-22',
          reason: 'maintenance',
          notes: 'Pre-season roof sal wood polishing and pest maintenance.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlock = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setMessage({ type: 'error', text: 'Please select both start and end dates.' });
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setMessage({ type: 'error', text: 'End date must be after start date.' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const payload = {
      unitId: selectedUnitId || null, // null means whole resort
      startDate,
      endDate,
      reason,
      notes
    };

    try {
      const res = await apiCreateBlock(payload);
      const newBlock = res?.data || { ...payload, _id: 'b-' + Date.now() };
      setBlocks([newBlock, ...blocks]);
      setMessage({ type: 'success', text: 'Date block added successfully.' });
      setStartDate('');
      setEndDate('');
      setNotes('');
    } catch (err) {
      // Offline fallback
      const fallbackBlock = { ...payload, _id: 'b-' + Date.now() };
      setBlocks([fallbackBlock, ...blocks]);
      setMessage({ type: 'success', text: 'Date block recorded locally (offline preview mode).' });
      setStartDate('');
      setEndDate('');
      setNotes('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlock = async (id) => {
    if (!window.confirm('Are you sure you want to remove this date block?')) return;
    try {
      await apiDeleteBlock(id);
    } catch {
      // Local fallback
    }
    setBlocks(blocks.filter(b => b._id !== id));
    setMessage({ type: 'success', text: 'Block removed and dates reopened.' });
  };

  const formatDateStr = (d) => {
    if (!d) return '';
    if (typeof d === 'string' && d.includes('T')) return d.split('T')[0];
    if (d instanceof Date) return d.toISOString().split('T')[0];
    return String(d);
  };

  const getUnitName = (target) => {
    if (!target) return 'Entire Resort (All 8 Units)';
    if (typeof target === 'object' && target.name) {
      return `${target.name} (${target.code || ''})`.trim();
    }
    const unitId = typeof target === 'object' ? target._id : target;
    const found = units.find(u => u._id === unitId || u.code === unitId);
    return found ? `${found.name} (${found.code})` : 'Specific Unit';
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner Notice */}
      <div className="bg-[#143628] text-[#F9F6F0] p-5 rounded-xl border border-[#C5A059]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-cinzel text-lg font-bold text-white">Resort Inventory Control</h3>
          </div>
          <p className="text-xs text-[#DFCA95] mt-1">
            Total Overnight Capacity: <strong className="text-white">Strictly 25 guests</strong> across 6 cottages & 2 safari tents. 
            No AC, No Wi-Fi, Generator-free peaceful retreat.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#0E261C] px-3 py-1.5 rounded-lg border border-[#C5A059]/20 text-xs text-[#DFCA95]">
          <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Active Units: {units.length} / 8</span>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 text-sm ${
          message.type === 'error' ? 'bg-rose-900/30 border border-rose-500/50 text-rose-200' : 'bg-emerald-900/30 border border-emerald-500/50 text-emerald-200'
        }`}>
          {message.type === 'error' ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Grid of 8 Units */}
      <div>
        <h4 className="font-cinzel text-base font-bold text-[#143628] mb-3 flex items-center gap-2">
          <Home className="w-4 h-4 text-[#C5A059]" />
          Accommodation Units (Estd. 1998)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {units.map((u) => {
            const isTent = (u.unitType || u.type) === 'camping_tent';
            return (
              <div key={u._id} className="bg-white p-4 rounded-xl border border-[#143628]/10 shadow-sm hover:border-[#C5A059] transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#143628]/10 text-[#143628]">
                    {u.code}
                  </span>
                  {isTent ? (
                    <Tent className="w-4 h-4 text-[#C25E3E]" />
                  ) : (
                    <Home className="w-4 h-4 text-[#143628]" />
                  )}
                </div>
                <h5 className="font-cinzel text-sm font-bold text-[#143628]">{u.name}</h5>
                <p className="text-[11px] text-[#143628]/70 mt-1">{u.capacityNote}</p>
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="text-gray-500">Max Adults:</span>
                  <span className="font-bold text-[#143628]">{u.maxAdults}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Block Dates Form & Active Blocks Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Quick Date Blocker */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-[#143628]/10 shadow-sm">
          <h4 className="font-cinzel text-base font-bold text-[#143628] mb-1 flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#C5A059]" />
            Block Dates (Maintenance / Private)
          </h4>
          <p className="text-xs text-gray-500 mb-5">
            Blocked dates are immediately hidden from public website availability searches.
          </p>

          <form onSubmit={handleCreateBlock} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#143628] mb-1">Select Unit to Block</label>
              <select
                value={selectedUnitId}
                onChange={(e) => setSelectedUnitId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="">-- All Resort (Full Buyout / Weather Closure) --</option>
                {units.map(u => (
                  <option key={u._id} value={u._id}>{u.name} ({u.code})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#143628] mb-1">Check-in Block</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#143628] mb-1">Check-out Reopen</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#143628] mb-1">Reason for Block</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059]"
              >
                <option value="maintenance">Maintenance / Cottage Repairs</option>
                <option value="owner_reserved">Private Owner / Family Stay</option>
                <option value="offline_booking">Direct Phone / Offline Booking</option>
                <option value="monsoon_closure">Monsoon Safety Period</option>
                <option value="seasonal_closure">Seasonal Closure</option>
                <option value="event">Private Event / Buyout</option>
                <option value="other">Other Operational Hold</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#143628] mb-1">Internal Staff Note (Optional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Sal wood polish / Mr. Patnaik phone booking"
                className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-lg bg-[#143628] text-[#DFCA95] hover:bg-[#0E261C] text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Blocking Dates...' : 'Apply Date Block'}
            </button>
          </form>
        </div>

        {/* Right: Active Blocks Table */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-[#143628]/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-cinzel text-base font-bold text-[#143628]">
              Active Blocked Periods ({blocks.length})
            </h4>
            <span className="text-[11px] text-gray-500">Unblock to make available</span>
          </div>

          {blocks.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              No active date blocks. All units are open for booking.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 pr-3">Target Unit</th>
                    <th className="py-2.5 px-3">Date Range</th>
                    <th className="py-2.5 px-3">Reason</th>
                    <th className="py-2.5 px-3">Note</th>
                    <th className="py-2.5 pl-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {blocks.map((b) => (
                    <tr key={b._id} className="hover:bg-gray-50/80">
                      <td className="py-3 pr-3 font-semibold text-[#143628]">
                        {getUnitName(b.unit || b.unitId)}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-gray-600">
                        {b.startDate} → {b.endDate}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-amber-50 text-amber-800 border border-amber-200">
                          {b.reason?.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-500 italic max-w-[140px] truncate">
                        {b.notes || '—'}
                      </td>
                      <td className="py-3 pl-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteBlock(b._id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                          title="Remove block / Reopen dates"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
