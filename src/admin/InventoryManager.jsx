import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Shield, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Lock, 
  Home, 
  Tent, 
  XCircle, 
  Clock, 
  Filter 
} from 'lucide-react';
import { apiGetUnits, apiGetBlocks, apiCreateBlock, apiDeleteBlock } from '../services/api';

const DEFAULT_UNITS = [
  { _id: 'u-rw1', name: 'Riverwood', code: 'RW-01', type: 'riverwood', maxAdults: 4, capacityNote: 'Riverside log chalet (Max 4 guests)' },
  { _id: 'u-cb1', name: 'Cherry Blossom 1', code: 'CB-01', type: 'cherry_blossom', maxAdults: 3, capacityNote: 'Prime river view veranda (Max 3 guests)' },
  { _id: 'u-cb2', name: 'Cherry Blossom 2', code: 'CB-02', type: 'cherry_blossom', maxAdults: 3, capacityNote: 'Prime river view veranda (Max 3 guests)' },
  { _id: 'u-cb3', name: 'Cherry Blossom 3', code: 'CB-03', type: 'cherry_blossom', maxAdults: 3, capacityNote: 'Prime river view veranda (Max 3 guests)' },
  { _id: 'u-cb4', name: 'Cherry Blossom 4', code: 'CB-04', type: 'cherry_blossom', maxAdults: 3, capacityNote: 'Prime river view veranda (Max 3 guests)' },
  { _id: 'u-aa1', name: 'Autumn Abode 1', code: 'AA-01', type: 'autumn_abode', maxAdults: 4, capacityNote: 'Golden sunrise pillars (Max 4 guests)' },
  { _id: 'u-aa2', name: 'Autumn Abode 2', code: 'AA-02', type: 'autumn_abode', maxAdults: 4, capacityNote: 'Golden sunrise pillars (Max 4 guests)' },
  { _id: 'u-aa3', name: 'Autumn Abode 3', code: 'AA-03', type: 'autumn_abode', maxAdults: 4, capacityNote: 'Golden sunrise pillars (Max 4 guests)' },
  { _id: 'u-sa1', name: 'Spring Abode 1', code: 'SA-01', type: 'spring_abode', maxAdults: 4, capacityNote: 'Open lawn view veranda (Max 4 guests)' },
  { _id: 'u-sa2', name: 'Spring Abode 2', code: 'SA-02', type: 'spring_abode', maxAdults: 4, capacityNote: 'Open lawn view veranda (Max 4 guests)' },
  { _id: 'u-sa3', name: 'Spring Abode 3', code: 'SA-03', type: 'spring_abode', maxAdults: 4, capacityNote: 'Open lawn view veranda (Max 4 guests)' },
  { _id: 'u-sa4', name: 'Spring Abode 4', code: 'SA-04', type: 'spring_abode', maxAdults: 4, capacityNote: 'Open lawn view veranda (Max 4 guests)' },
  { _id: 'u-gm1', name: 'Gulmohar', code: 'GM-01', type: 'gulmohar', maxAdults: 3, capacityNote: 'Rustic red timber outlook (Max 3 guests)' },
  { _id: 'u-aw1', name: 'Amberwood', code: 'AW-01', type: 'amberwood', maxAdults: 4, capacityNote: 'Canopy shade sanctuary (Max 4 guests)' },
  { _id: 'u-t1', name: 'Camping Tent A', code: 'TENT-A', type: 'camping_tent', maxAdults: 2, capacityNote: 'Double occupancy riverside tent (Max 2 guests)' },
  { _id: 'u-t2', name: 'Camping Tent B', code: 'TENT-B', type: 'camping_tent', maxAdults: 3, capacityNote: 'Triple occupancy riverside tent (Max 3 guests)' }
];

export function InventoryManager() {
  const [units, setUnits] = useState(DEFAULT_UNITS);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [filterState, setFilterState] = useState('all'); // 'all', 'active', 'deactive'

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
          unitId: 'u-gm1',
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

  const todayStr = new Date().toISOString().split('T')[0];

  const getUnitStatus = (unit) => {
    // 1. Check unit schema status
    if (unit.status && unit.status !== 'active') {
      return {
        state: 'deactive',
        label: 'Deactive (' + unit.status + ')',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
        dotColor: 'bg-rose-600',
        reason: unit.status
      };
    }

    // 2. Check blocks for this unit or entire resort
    const unitBlocks = blocks.filter(b => {
      const bUnitId = typeof b.unitId === 'object' ? b.unitId?._id : b.unitId;
      return !bUnitId || bUnitId === unit._id || bUnitId === unit.code;
    });

    if (!unitBlocks.length) {
      return {
        state: 'active',
        label: 'Active & Available',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        dotColor: 'bg-emerald-600'
      };
    }

    // Check if active today
    const currentBlock = unitBlocks.find(b => {
      const start = formatDateStr(b.startDate);
      const end = formatDateStr(b.endDate);
      return todayStr >= start && todayStr <= end;
    });

    if (currentBlock) {
      const isAllResort = !currentBlock.unitId;
      return {
        state: 'deactive',
        label: isAllResort ? 'Deactive (Resort Hold)' : 'Deactive / Blocked',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        dotColor: 'bg-rose-600',
        reason: currentBlock.reason,
        until: formatDateStr(currentBlock.endDate),
        blockId: currentBlock._id
      };
    }

    // Check upcoming block
    const upcomingBlock = unitBlocks.find(b => {
      const start = formatDateStr(b.startDate);
      return start > todayStr;
    });

    if (upcomingBlock) {
      return {
        state: 'upcoming',
        label: 'Active (Upcoming Block)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        dotColor: 'bg-amber-500',
        from: formatDateStr(upcomingBlock.startDate),
        until: formatDateStr(upcomingBlock.endDate),
        reason: upcomingBlock.reason,
        blockId: upcomingBlock._id
      };
    }

    return {
      state: 'active',
      label: 'Active & Available',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      dotColor: 'bg-emerald-600'
    };
  };

  const getUnitName = (target) => {
    if (!target) return 'Entire Resort (All Units)';
    if (typeof target === 'object' && target.name) {
      return `${target.name} (${target.code || ''})`.trim();
    }
    const unitId = typeof target === 'object' ? target._id : target;
    const found = units.find(u => u._id === unitId || u.code === unitId);
    return found ? `${found.name} (${found.code})` : 'Specific Unit';
  };

  const activeUnitsCount = units.filter(u => getUnitStatus(u).state === 'active' || getUnitStatus(u).state === 'upcoming').length;
  const deactiveUnitsCount = units.length - activeUnitsCount;

  const filteredUnits = units.filter(u => {
    const status = getUnitStatus(u);
    if (filterState === 'active') return status.state === 'active' || status.state === 'upcoming';
    if (filterState === 'deactive') return status.state === 'deactive';
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Banner Notice */}
      <div className="bg-[#143628] text-[#F9F6F0] p-5 rounded-xl border border-[#C5A059]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-cinzel text-lg font-bold text-white">Resort Inventory & Unit Status</h3>
          </div>
          <p className="text-xs text-[#DFCA95] mt-1">
            Total Overnight Capacity: <strong className="text-white">Strictly 25 guests</strong> across 6 cottages & 2 safari tents. 
            Units marked <span className="text-emerald-300 font-semibold">Active</span> appear in website searches; <span className="text-rose-300 font-semibold">Deactive / Blocked</span> units are hidden.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 bg-[#0E261C] px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active: {activeUnitsCount}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#0E261C] px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>Deactive: {deactiveUnitsCount}</span>
          </div>
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

      {/* Grid of Accommodation Units with Status Badges */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <h4 className="font-cinzel text-base font-bold text-[#143628] flex items-center gap-2">
            <Home className="w-4 h-4 text-[#C5A059]" />
            Accommodation Units ({units.length})
          </h4>

          {/* Status Quick Filter Buttons */}
          <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 text-xs">
            <button
              onClick={() => setFilterState('all')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                filterState === 'all' ? 'bg-white text-[#143628] shadow-xs font-bold' : 'text-gray-600 hover:text-black'
              }`}
            >
              All ({units.length})
            </button>
            <button
              onClick={() => setFilterState('active')}
              className={`px-3 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                filterState === 'active' ? 'bg-emerald-100 text-emerald-800 shadow-xs font-bold' : 'text-gray-600 hover:text-emerald-700'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Active ({activeUnitsCount})
            </button>
            <button
              onClick={() => setFilterState('deactive')}
              className={`px-3 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                filterState === 'deactive' ? 'bg-rose-100 text-rose-800 shadow-xs font-bold' : 'text-gray-600 hover:text-rose-700'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
              Deactive / Blocked ({deactiveUnitsCount})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredUnits.map((u) => {
            const isTent = (u.unitType || u.type) === 'camping_tent';
            const status = getUnitStatus(u);
            const isDeactive = status.state === 'deactive';

            return (
              <div 
                key={u._id} 
                className={`bg-white p-4 rounded-xl border shadow-sm transition-all flex flex-col justify-between ${
                  isDeactive 
                    ? 'border-rose-300 bg-rose-50/20' 
                    : 'border-[#143628]/10 hover:border-[#C5A059]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#143628]/10 text-[#143628]">
                      {u.code}
                    </span>
                    
                    {/* Status Badge */}
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.badgeColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor} ${status.state === 'active' ? 'animate-pulse' : ''}`} />
                      {status.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isTent ? (
                      <Tent className="w-4 h-4 text-[#C25E3E] shrink-0" />
                    ) : (
                      <Home className="w-4 h-4 text-[#143628] shrink-0" />
                    )}
                    <h5 className="font-cinzel text-sm font-bold text-[#143628] truncate">{u.name}</h5>
                  </div>

                  <p className="text-[11px] text-[#143628]/70 mt-1">{u.capacityNote}</p>

                  {/* Operational Status Info */}
                  {isDeactive && (
                    <div className="mt-2.5 p-2 rounded-lg bg-rose-50 border border-rose-200 text-[11px] text-rose-800">
                      <div className="flex items-center gap-1 font-semibold">
                        <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span className="capitalize">{status.reason || 'Blocked for Maintenance'}</span>
                      </div>
                      {status.until && (
                        <span className="text-[10px] text-rose-600 block mt-0.5">
                          Until {status.until}
                        </span>
                      )}
                      {status.blockId && (
                        <button
                          type="button"
                          onClick={() => handleDeleteBlock(status.blockId)}
                          className="mt-1.5 text-[10px] font-bold text-rose-700 hover:text-rose-900 underline cursor-pointer"
                        >
                          Reopen / Activate Now
                        </button>
                      )}
                    </div>
                  )}

                  {status.state === 'upcoming' && (
                    <div className="mt-2.5 p-2 rounded-lg bg-amber-50 border border-amber-200 text-[10px] text-amber-800">
                      <div className="flex items-center gap-1 font-semibold">
                        <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                        <span>Reserved {status.from} to {status.until}</span>
                      </div>
                    </div>
                  )}
                </div>

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
            Block / Deactivate Unit Dates
          </h4>
          <p className="text-xs text-gray-500 mb-5">
            Blocked units are immediately deactivated from website searches for the selected dates.
          </p>

          <form onSubmit={handleCreateBlock} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#143628] mb-1">Select Unit to Block / Deactivate</label>
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
              <label className="block text-xs font-semibold text-[#143628] mb-1">Reason for Deactivation / Block</label>
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
              {isSubmitting ? 'Blocking Dates...' : 'Apply Date Block / Deactivate'}
            </button>
          </form>
        </div>

        {/* Right: Active Blocks Table */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-[#143628]/10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-cinzel text-base font-bold text-[#143628]">
              Active Blocked Periods ({blocks.length})
            </h4>
            <span className="text-[11px] text-gray-500">Click trash icon to reopen / activate</span>
          </div>

          {blocks.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              No active date blocks. All units are active and open for booking.
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
                    <tr key={b._id} className="hover:bg-gray-50">
                      <td className="py-2.5 pr-3 font-semibold text-[#143628]">
                        {getUnitName(b.unitId || b.unit)}
                      </td>
                      <td className="py-2.5 px-3 text-gray-600 font-mono text-[11px]">
                        {formatDateStr(b.startDate)} to {formatDateStr(b.endDate)}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 capitalize">
                          {b.reason ? b.reason.replace('_', ' ') : 'Blocked'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-500 text-[11px]">
                        {b.notes || '—'}
                      </td>
                      <td className="py-2.5 pl-3 text-right">
                        <button
                          onClick={() => handleDeleteBlock(b._id)}
                          className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                          title="Remove block and reactivate unit"
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
