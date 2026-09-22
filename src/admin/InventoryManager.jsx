import React, { useState, useEffect } from 'react';
import { 
  Calendar,
  Shield,
  AlertTriangle,
  Plus,
  Trash2,
  Pencil,
  CheckCircle2,
  Lock,
  Home,
  Tent,
  XCircle,
  Clock,
  Filter
} from 'lucide-react';
import { apiGetUnits, apiGetBlocks, apiCreateBlock, apiDeleteBlock, apiUpdateUnitStatus, apiGetCapacity, apiCreateUnit, apiUpdateUnit, apiDeleteUnit } from '../services/api';

// The unit list is the single source of truth and lives in MongoDB (`Unit` model,
// served by GET /api/v1/units). Nothing is hardcoded here. An earlier version of this
// screen kept a local array of 16 units with invented `_id`s ('u-rw1', 'u-cb1', ...)
// that never matched a real ObjectId — so the screen looked perfectly healthy while
// every write against those ids failed. Do not reintroduce that: when the API is
// unreachable this screen now SAYS SO rather than showing invented inventory.

// The six guest-facing cottage varieties are not a database enum — the Unit model only
// distinguishes four `unitType`s (cottages vs tents). The variety a guest sees comes
// from the unit `code` prefix, which is also what the pricing engine keys off
// ('CB-' and 'GM-' are the strictly-3-adult units).
const UNIT_VARIETIES = {
  RW: 'Riverwood',
  CB: 'Cherry Blossom',
  AA: 'Autumn Abode',
  SA: 'Spring Abode',
  GM: 'Gulmohar',
  AW: 'Amberwood',
  TENT: 'Camping Tent'
};

// Must stay in sync with the `status` enum on the Unit model.
const UNIT_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'renovation', label: 'Renovation' },
  { value: 'private_block', label: 'Private Block' }
];

const unitVariety = (unit) => {
  const prefix = String(unit?.code || '').split('-')[0];
  return UNIT_VARIETIES[prefix] || String(unit?.unitType || '').replace(/_/g, ' ') || 'Unit';
};

const BATHROOM_LABELS = {
  attached_western: 'Attached western bath',
  shared_block: 'Shared bath block'
};

// Mirrors ADULT_CAP_BY_UNIT_TYPE in backend/src/controllers/unitController.js. Keeping
// the cap in the form means the owner can never submit a capacity the API will reject.
const ADULT_CAP_BY_UNIT_TYPE = {
  red_white_cottage: 3,
  wooden_log_house: 4,
  other_cottage: 4,
  camping_tent: 3
};

// `red_white_cottage` is the strictly-3-adult group (Cherry Blossom and Gulmohar);
// the other two cottage types take 4. These four are the whole enum — the six
// guest-facing varieties are labels derived from the code prefix above.
const UNIT_TYPE_OPTIONS = [
  { value: 'red_white_cottage', label: 'Red & White Cottage — max 3 adults' },
  { value: 'wooden_log_house', label: 'Wooden Log House — max 4 adults' },
  { value: 'other_cottage', label: 'Other Cottage — max 4 adults' },
  { value: 'camping_tent', label: 'Camping Tent — max 3 adults' }
];

const EMPTY_UNIT_FORM = {
  code: '',
  name: '',
  unitType: 'other_cottage',
  maxAdults: 4,
  bedConfiguration: '',
  bathroomType: 'attached_western',
  status: 'active',
  features: ''
};

const INPUT_CLASS =
  'w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-[#143628] focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059]';

// Module scope (not defined inside the component) so its identity is stable across
// renders and the inputs inside it never lose focus mid-typing.
function Field({ label, hint, children }) {
  return (
    <div>
      <span className="block text-[11px] font-semibold text-[#143628] mb-1">{label}</span>
      {children}
      {hint && <span className="block text-[10px] text-gray-400 mt-1">{hint}</span>}
    </div>
  );
}

export function InventoryManager() {
  const [units, setUnits] = useState([]);
  const [blocks, setBlocks] = useState([]);
  // Kept apart from `blocks` being empty: "no blocks exist" and "we could not read the
  // blocks" look identical on screen but mean opposite things to an operator.
  const [blocksError, setBlocksError] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [loading, setLoading] = useState(false);
  // null when closed, 'new' when creating, otherwise the _id being edited.
  const [editingUnit, setEditingUnit] = useState(null);
  const [form, setForm] = useState(EMPTY_UNIT_FORM);
  const [saving, setSaving] = useState(false);
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
    setLoadError(null);

    try {
      const unitsRes = await apiGetUnits();
      setUnits(unitsRes?.data ?? []);
    } catch (err) {
      // Never fall back to invented inventory — showing fake units is worse than
      // showing none, because the screen then looks healthy while nothing works.
      setUnits([]);
      setLoadError(err?.message || 'Could not reach the units API.');
    }

    try {
      const blocksRes = await apiGetBlocks();
      setBlocks(blocksRes?.data ?? []);
      setBlocksError(null);
    } catch (err) {
      // Never fall back to a demo block — an invented row here reads as "this unit is
      // blocked" and marks every unit deactive, which is a worse lie than an empty list.
      setBlocks([]);
      setBlocksError(err?.message || 'Could not reach the blocked-dates API.');
    }

    try {
      const capacityRes = await apiGetCapacity();
      setCapacity(capacityRes?.data ?? null);
    } catch {
      setCapacity(null);
    }

    setLoading(false);
  };

  // The derived capacity moves whenever a unit is added, deleted, or retired, so the
  // banner has to be re-read after any inventory write rather than cached.
  const refreshCapacity = async () => {
    try {
      const res = await apiGetCapacity();
      setCapacity(res?.data ?? null);
    } catch {
      // Keep the last known figures rather than blanking the banner.
    }
  };

  // Re-read the blocked dates from the server after every write, so the table can only ever
  // show what the database actually holds.
  const refreshBlocks = async () => {
    try {
      const res = await apiGetBlocks();
      setBlocks(res?.data ?? []);
      setBlocksError(null);
    } catch (err) {
      setBlocksError(err?.message || 'Could not reach the blocked-dates API.');
    }
  };

  const handleStatusChange = async (unit, nextStatus) => {
    const previous = unit.status;
    // Optimistic: the owner sees the badge move immediately, and it snaps back on failure.
    setUnits((prev) => prev.map((u) => (u._id === unit._id ? { ...u, status: nextStatus } : u)));

    try {
      const res = await apiUpdateUnitStatus(unit._id, nextStatus);
      if (res?.data) {
        setUnits((prev) => prev.map((u) => (u._id === unit._id ? res.data : u)));
      }
      setMessage({ type: 'success', text: `${unit.code} marked ${nextStatus.replace(/_/g, ' ')}.` });
      refreshCapacity();
    } catch (err) {
      setUnits((prev) => prev.map((u) => (u._id === unit._id ? { ...u, status: previous } : u)));
      setMessage({ type: 'error', text: `Could not update ${unit.code}: ${err.message}` });
    }
  };

  const openCreateForm = () => {
    setForm(EMPTY_UNIT_FORM);
    setEditingUnit('new');
    setMessage(null);
  };

  const openEditForm = (unit) => {
    setForm({
      code: unit.code || '',
      name: unit.name || '',
      unitType: unit.unitType || 'other_cottage',
      maxAdults: unit.maxAdults ?? 4,
      bedConfiguration: unit.bedConfiguration || '',
      bathroomType: unit.bathroomType || 'attached_western',
      status: unit.status || 'active',
      features: Array.isArray(unit.features) ? unit.features.join(', ') : ''
    });
    setEditingUnit(unit._id);
    setMessage(null);
  };

  const closeForm = () => {
    setEditingUnit(null);
    setForm(EMPTY_UNIT_FORM);
    setSaving(false);
  };

  const handleSubmitUnit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      unitType: form.unitType,
      maxAdults: Number(form.maxAdults),
      bedConfiguration: form.bedConfiguration.trim(),
      bathroomType: form.bathroomType,
      status: form.status,
      features: form.features.split(',').map((f) => f.trim()).filter(Boolean)
    };

    try {
      if (editingUnit === 'new') {
        const res = await apiCreateUnit(payload);
        if (res?.data) {
          setUnits((prev) => [...prev, res.data].sort((a, b) => String(a.code).localeCompare(String(b.code))));
        }
        setMessage({ type: 'success', text: `Unit ${payload.code} created. Set its rates in the Pricing Manager.` });
      } else {
        const res = await apiUpdateUnit(editingUnit, payload);
        if (res?.data) {
          setUnits((prev) => prev.map((u) => (u._id === editingUnit ? res.data : u)));
        }
        setMessage({ type: 'success', text: `Unit ${payload.code} updated.` });
      }
      closeForm();
      refreshCapacity();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
      setSaving(false);
    }
  };

  const handleDeleteUnit = async (unit) => {
    const confirmed = window.confirm(
      `Delete ${unit.code} — ${unit.name}?\n\nThis cannot be undone. If this unit has any bookings or blocked dates the server will refuse the delete; use status "Private Block" to retire it instead.`
    );
    if (!confirmed) return;

    try {
      await apiDeleteUnit(unit._id);
      setUnits((prev) => prev.filter((u) => u._id !== unit._id));
      setMessage({ type: 'success', text: `Unit ${unit.code} deleted.` });
      refreshCapacity();
    } catch (err) {
      // The 409 explaining which bookings/blocks hold it back arrives here verbatim.
      setMessage({ type: 'error', text: err.message });
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
      await apiCreateBlock(payload);
      // Mirror the server rather than trusting the response body: a locally-invented row
      // with a fabricated _id cannot be deleted later and misrepresents what is blocked.
      await refreshBlocks();
      setMessage({ type: 'success', text: 'Date block added successfully.' });
      setStartDate('');
      setEndDate('');
      setNotes('');
    } catch (err) {
      // The input is deliberately left in place so the operator can retry after fixing the
      // cause, and the real reason is shown instead of a fabricated success.
      setMessage({ type: 'error', text: err?.message || 'Could not save the date block.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBlock = async (id) => {
    if (!window.confirm('Are you sure you want to remove this date block?')) return;
    try {
      await apiDeleteBlock(id);
      await refreshBlocks();
      setMessage({ type: 'success', text: 'Block removed and dates reopened.' });
    } catch (err) {
      // Only report success once the server has confirmed the delete; the row stays on
      // screen otherwise so the operator can see it is still in force.
      setMessage({ type: 'error', text: err?.message || 'Could not remove the date block.' });
    }
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
      // The API accepts `unitId` on write but stores and returns the field as `unit`
      // (populated by getBlocks). Two distinct cases must not be conflated:
      //   `unit: null`      — a deliberate whole-resort hold, which blocks every unit;
      //   no `unit` key     — a row this screen never received from the server, which
      //                       must block nothing rather than everything.
      if (!Object.prototype.hasOwnProperty.call(b, 'unit')) return false;
      if (b.unit === null || b.unit === undefined) return true;
      const bUnitId = typeof b.unit === 'object' ? b.unit._id : b.unit;
      if (bUnitId === null || bUnitId === undefined) return true;
      return String(bUnitId) === String(unit._id) || String(bUnitId) === unit.code;
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
      const isAllResort = currentBlock.unit === null;
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
            {capacity ? (
              <>
                Live from inventory: <strong className="text-white">{capacity.activeCottages} cottages + {capacity.activeTents} tents</strong> in
                service, <strong className="text-white">{capacity.totalAdults} adults</strong> of overnight capacity. This figure is derived at
                runtime from the units marked Active below — there is no fixed property-wide number.
              </>
            ) : (
              <>
                Overnight capacity is derived at runtime from the units marked Active below — there is no fixed property-wide number.
              </>
            )}{' '}
            Units marked <span className="text-emerald-300 font-semibold">Active</span> appear in website searches;{' '}
            <span className="text-rose-300 font-semibold">Deactive / Blocked</span> units are hidden.
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

      {loadError && (
        <div className="p-4 rounded-lg bg-rose-50 border border-rose-300 text-rose-900 flex items-start gap-3 text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Could not load the unit inventory.</p>
            <p className="text-xs mt-0.5">
              {loadError} No units are listed below rather than placeholder data, so nothing on this screen can be mistaken for real
              inventory. Reload once the API is reachable.
            </p>
          </div>
        </div>
      )}

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 text-sm ${
          message.type === 'error' ? 'bg-rose-900/30 border border-rose-500/50 text-rose-200' : 'bg-emerald-900/30 border border-emerald-500/50 text-emerald-200'
        }`}>
          {message.type === 'error' ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Add / Edit Unit */}
      {editingUnit && (
        <form onSubmit={handleSubmitUnit} className="bg-white p-5 rounded-xl border border-[#C5A059]/60 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-cinzel text-base font-bold text-[#143628] flex items-center gap-2">
                {editingUnit === 'new' ? <Plus className="w-4 h-4 text-[#C5A059]" /> : <Pencil className="w-4 h-4 text-[#C5A059]" />}
                {editingUnit === 'new' ? 'Add Accommodation Unit' : `Edit ${form.code}`}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Tariff amounts are not set here — the Pricing Manager is the single writer for rates.
              </p>
            </div>
            <button
              type="button"
              onClick={closeForm}
              className="text-xs text-gray-500 hover:text-black font-medium shrink-0 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Field label="Unit Code" hint="Must be unique, e.g. CB-05 or TENT-C">
              <input
                required
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="CB-05"
                className={INPUT_CLASS}
              />
            </Field>

            <Field label="Display Name">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Cherry Blossom 5"
                className={INPUT_CLASS}
              />
            </Field>

            <Field label="Unit Type" hint="Sets the adult ceiling and the tariff group">
              <select
                value={form.unitType}
                onChange={(e) => {
                  const nextType = e.target.value;
                  const nextCap = ADULT_CAP_BY_UNIT_TYPE[nextType] || 4;
                  setForm((prev) => ({ ...prev, unitType: nextType, maxAdults: Math.min(prev.maxAdults, nextCap) }));
                }}
                className={INPUT_CLASS}
              >
                {UNIT_TYPE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </Field>

            <Field label="Max Adults" hint="Capped by the unit type; enforced again server-side">
              <select
                value={form.maxAdults}
                onChange={(e) => setForm({ ...form, maxAdults: Number(e.target.value) })}
                className={INPUT_CLASS}
              >
                {Array.from({ length: ADULT_CAP_BY_UNIT_TYPE[form.unitType] || 4 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n} adult{n === 1 ? '' : 's'}</option>
                ))}
              </select>
            </Field>

            <Field label="Bed Configuration" hint="Shown to guests on the Stay page">
              <input
                required
                value={form.bedConfiguration}
                onChange={(e) => setForm({ ...form, bedConfiguration: e.target.value })}
                placeholder="1 double bed + 1 single bed"
                className={INPUT_CLASS}
              />
            </Field>

            <Field label="Bathroom">
              <select
                value={form.bathroomType}
                onChange={(e) => setForm({ ...form, bathroomType: e.target.value })}
                className={INPUT_CLASS}
              >
                <option value="attached_western">Attached western bath</option>
                <option value="shared_block">Shared bath block</option>
              </select>
            </Field>

            <Field label="Status" hint="Only Active units appear in website searches">
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className={INPUT_CLASS}
              >
                {UNIT_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </Field>

            <Field label="Features" hint="Comma separated, e.g. Verandah, River view">
              <input
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                placeholder="Verandah, River view"
                className={INPUT_CLASS}
              />
            </Field>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#143628] text-[#DFCA95] text-sm font-semibold hover:bg-[#0E261C] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {saving ? 'Saving…' : editingUnit === 'new' ? 'Create Unit' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:text-black cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Grid of Accommodation Units with Status Badges */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-3">
            <h4 className="font-cinzel text-base font-bold text-[#143628] flex items-center gap-2">
              <Home className="w-4 h-4 text-[#C5A059]" />
              Accommodation Units ({units.length})
            </h4>
            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#143628] text-[#DFCA95] text-xs font-semibold hover:bg-[#0E261C] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Unit
            </button>
          </div>

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
            const isTent = u.unitType === 'camping_tent';
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

                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-[#F4EFE6] text-[#8F6C27] font-semibold">
                      {unitVariety(u)}
                    </span>
                    <span className="text-[#143628]/60">{BATHROOM_LABELS[u.bathroomType] || u.bathroomType}</span>
                  </div>

                  {u.bedConfiguration && (
                    <p className="text-[11px] text-[#143628]/70 mt-1">{u.bedConfiguration}</p>
                  )}

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

                <div className="mt-3 pt-2 border-t border-gray-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-500">Max Adults:</span>
                    <span className="font-bold text-[#143628]">{u.maxAdults}</span>
                  </div>

                  {/* Status is editable inline for speed; everything else goes through the form. */}
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-gray-500 shrink-0">Status:</span>
                    <select
                      value={u.status || 'active'}
                      onChange={(e) => handleStatusChange(u, e.target.value)}
                      className="flex-1 min-w-0 py-1 px-1.5 bg-white border border-gray-200 rounded-md text-[11px] font-semibold text-[#143628] focus:ring-1 focus:ring-[#C5A059] cursor-pointer"
                    >
                      {UNIT_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => openEditForm(u)}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-1 rounded-md border border-gray-200 text-[11px] font-semibold text-[#143628] hover:border-[#C5A059] transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteUnit(u)}
                      title="Delete — refused if this unit has bookings or blocked dates"
                      className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-md border border-rose-200 text-[11px] font-semibold text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {loading && (
          <p className="text-center text-xs text-gray-500 py-6">Loading units from the server…</p>
        )}

        {!loading && !units.length && (
          <p className="text-center text-xs text-gray-500 py-6">
            {loadError
              ? 'No units to show — the inventory API could not be reached.'
              : 'The database returned no units. Seed the Unit collection before using this screen.'}
          </p>
        )}

        {!loading && units.length > 0 && !filteredUnits.length && (
          <p className="text-center text-xs text-gray-500 py-6">
            No units match the “{filterState}” filter.
          </p>
        )}
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

          {blocksError ? (
            <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
              <strong>Blocked dates could not be loaded.</strong> {blocksError} The list is empty
              because the request failed, not because nothing is blocked — do not read it as any
              unit being open.
            </div>
          ) : blocks.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              No date blocks recorded. Unit statuses shown above are still in force.
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
                        {getUnitName(b.unit)}
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
