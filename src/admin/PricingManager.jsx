import React, { useState, useEffect, useMemo } from 'react';
import { 
  IndianRupee, 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Info, 
  Flame, 
  Utensils, 
  Baby, 
  Calculator,
  ShieldAlert,
  Copy
} from 'lucide-react';
import { apiGetUnits, apiUpdateUnitPricing, apiUpdatePricingByType, apiGetQuote } from '../services/api';

export function PricingManager() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('cottages'); // 'cottages', 'camping', 'addons', 'simulator'

  // Editable state keyed by unit._id
  const [editableRates, setEditableRates] = useState({});

  // Global Add-ons state (in Rupees)
  const [addons, setAddons] = useState({
    childCottage: 700,
    childCamping: 750,
    nonVegAdult: 300,
    nonVegChild: 150,
    bonfirePerPerson: 250
  });

  // Simulator State
  const [simUnitType, setSimUnitType] = useState('red_white_cottage');
  const [simAdults, setSimAdults] = useState(2);
  const [simNights, setSimNights] = useState(1);
  const [simChildren, setSimChildren] = useState(0);
  const [simNonVeg, setSimNonVeg] = useState(false);
  const [simBonfire, setSimBonfire] = useState(false);
  const [simQuote, setSimQuote] = useState(null);
  const [simLoading, setSimLoading] = useState(false);

  useEffect(() => {
    loadUnits();
  }, []);

  const loadUnits = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await apiGetUnits();
      const unitList = res.data || [];
      setUnits(unitList);

      // Initialize editable rates in Rupees (convert from paise)
      const ratesMap = {};
      unitList.forEach(u => {
        ratesMap[u._id] = {
          tier1: u.pricingTiersPaise?.oneAdult ? u.pricingTiersPaise.oneAdult / 100 : 3000,
          tier2: u.pricingTiersPaise?.twoAdults ? u.pricingTiersPaise.twoAdults / 100 : 4000,
          tier3: u.pricingTiersPaise?.threeAdults ? u.pricingTiersPaise.threeAdults / 100 : 5400,
          tier4: u.pricingTiersPaise?.fourAdults ? u.pricingTiersPaise.fourAdults / 100 : (u.unitType === 'red_white_cottage' ? '' : 6600),
          perPerson: u.campingRatesPaise?.perPerson ? u.campingRatesPaise.perPerson / 100 : 1499,
          couple: u.campingRatesPaise?.couple ? u.campingRatesPaise.couple / 100 : 2999
        };
      });
      setEditableRates(ratesMap);

      // Check if any unit has addonsPaise stored
      const sampleUnit = unitList.find(u => u.addonsPaise);
      if (sampleUnit?.addonsPaise) {
        setAddons({
          childCottage: (sampleUnit.addonsPaise.child5to10Paise || 70000) / 100,
          childCamping: 750,
          nonVegAdult: (sampleUnit.addonsPaise.nonVegAdultPaise || 30000) / 100,
          nonVegChild: (sampleUnit.addonsPaise.nonVegChildPaise || 15000) / 100,
          bonfirePerPerson: (sampleUnit.addonsPaise.bonfirePerPersonPaise || 25000) / 100
        });
      }
    } catch (err) {
      setError('Failed to load resort units: ' + (err.message || 'Server error'));
    } finally {
      setLoading(false);
    }
  };

  const handleRateChange = (unitId, field, val) => {
    const numericVal = val === '' ? '' : Math.max(0, parseInt(val, 10) || 0);
    setEditableRates(prev => ({
      ...prev,
      [unitId]: {
        ...prev[unitId],
        [field]: numericVal
      }
    }));
  };

  const handleSaveUnitPricing = async (unit, applyToAllCategory = false) => {
    setSavingId(unit._id);
    setError('');
    setSaveSuccess('');

    try {
      const rates = editableRates[unit._id];
      const payload = {
        pricingTiersPaise: {
          oneAdult: Number(rates.tier1 || 3000) * 100,
          twoAdults: Number(rates.tier2 || 4000) * 100,
          threeAdults: Number(rates.tier3 || 5400) * 100,
          fourAdults: unit.unitType === 'red_white_cottage' ? null : (rates.tier4 ? Number(rates.tier4) * 100 : 660000)
        },
        campingRatesPaise: {
          perPerson: Number(rates.perPerson || 1499) * 100,
          couple: Number(rates.couple || 2999) * 100
        },
        applyToAllOfType: applyToAllCategory
      };

      await apiUpdateUnitPricing(unit._id, payload);

      setSaveSuccess(
        applyToAllCategory 
          ? `Successfully updated and synced rates across ALL ${unit.unitType.replace(/_/g, ' ')} units!`
          : `Rates saved successfully for ${unit.code} (${unit.name})!`
      );

      // Reload fresh data to sync everything
      await loadUnits();
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      setError('Failed to save pricing: ' + (err.message || 'Server error'));
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveAddons = async () => {
    setSavingId('addons');
    setError('');
    setSaveSuccess('');

    try {
      const addonsPaise = {
        child5to10Paise: Number(addons.childCottage || 700) * 100,
        nonVegAdultPaise: Number(addons.nonVegAdult || 300) * 100,
        nonVegChildPaise: Number(addons.nonVegChild || 150) * 100,
        bonfirePerPersonPaise: Number(addons.bonfirePerPerson || 250) * 100
      };

      // Save across all units so pricing engine reads dynamically
      for (const u of units) {
        await apiUpdateUnitPricing(u._id, { addonsPaise });
      }

      setSaveSuccess('Meal supplements, child tariffs & bonfire rates updated globally across all inventory!');
      await loadUnits();
      setTimeout(() => setSaveSuccess(''), 4000);
    } catch (err) {
      setError('Failed to save addons: ' + err.message);
    } finally {
      setSavingId(null);
    }
  };

  // Run price simulation
  const runSimulator = async () => {
    setSimLoading(true);
    try {
      const res = await apiGetQuote({
        unitType: simUnitType,
        adults: simAdults,
        nights: simNights,
        children5to10: simChildren,
        includeNonVegPlan: simNonVeg,
        includeBonfire: simBonfire
      });
      setSimQuote(res.data);
    } catch (err) {
      setError('Simulation failed: ' + err.message);
    } finally {
      setSimLoading(false);
    }
  };

  // Trigger sim whenever params change
  useEffect(() => {
    if (activeCategory === 'simulator') {
      runSimulator();
    }
  }, [activeCategory, simUnitType, simAdults, simNights, simChildren, simNonVeg, simBonfire]);

  const cottages = units.filter(u => u.unitType !== 'camping_tent');
  const campingUnits = units.filter(u => u.unitType === 'camping_tent');

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-4">
        <RefreshCw className="w-8 h-8 text-[#C5A059] animate-spin" />
        <p className="text-[#143628] font-medium">Loading resort inventory & tariff structures...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C5A059]/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#143628] text-[#C5A059] rounded-lg">
              <IndianRupee className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#143628]">Tariffs & Dynamic Pricing Engine</h2>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            Official Source of Truth: All prices set here directly calculate guest reservation totals and 50% advance deposits in real time.
          </p>
        </div>

        <button
          onClick={loadUnits}
          className="flex items-center gap-2 text-xs font-semibold px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reload Database Rates
        </button>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-3 text-emerald-800 text-sm shadow-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span className="font-medium">{saveSuccess}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl flex items-center gap-3 text-rose-800 text-sm shadow-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveCategory('cottages')}
          className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
            activeCategory === 'cottages'
              ? 'bg-[#143628] text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <span>🏡</span>
          Cottages & Log Houses ({cottages.length})
        </button>

        <button
          onClick={() => setActiveCategory('camping')}
          className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
            activeCategory === 'camping'
              ? 'bg-[#143628] text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <span>🏕️</span>
          Camping Tents ({campingUnits.length})
        </button>

        <button
          onClick={() => setActiveCategory('addons')}
          className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
            activeCategory === 'addons'
              ? 'bg-[#143628] text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <span>🍲</span>
          Meals, Child Tariffs & Bonfire
        </button>

        <button
          onClick={() => setActiveCategory('simulator')}
          className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
            activeCategory === 'simulator'
              ? 'bg-[#C5A059] text-[#143628] font-semibold shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Live Price Simulator
        </button>
      </div>

      {/* CATEGORY 1: COTTAGES */}
      {activeCategory === 'cottages' && (
        <div className="space-y-6">
          <div className="bg-[#F4EFE6] border border-[#C5A059]/40 p-4 rounded-xl flex items-start gap-3 text-sm text-[#143628]">
            <Info className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Resort Capacity Policy & Tier Structure:</p>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-xs text-gray-700">
                <li><strong>Red-and-White Cottages (RW-01 to RW-04):</strong> Strict max capacity is 3 adults. 4-adult occupancy is legally blocked.</li>
                <li><strong>Wooden Log House (LOG-01) & Other Cottage (OTHER-01):</strong> Allow up to 4 adults with quad tariff tier.</li>
                <li>All tariffs include morning bed-tea, buffet breakfast, jungle evening tea, and hearty tribal dinner.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cottages.map(unit => {
              const rates = editableRates[unit._id] || {};
              const isRwCottage = unit.unitType === 'red_white_cottage';
              const isSaving = savingId === unit._id;

              return (
                <div 
                  key={unit._id} 
                  className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:border-[#C5A059] transition-all space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#143628] text-white rounded">
                          {unit.code}
                        </span>
                        <h3 className="font-serif font-bold text-lg text-[#143628]">{unit.name}</h3>
                      </div>
                      <p className="text-xs text-gray-500 capitalize mt-0.5">
                        {unit.unitType.replace(/_/g, ' ')} • Max {unit.maxAdults} Adults
                      </p>
                    </div>

                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      unit.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {unit.status}
                    </span>
                  </div>

                  {/* Tier Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Tier 1 */}
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        1 Adult (Solo)
                      </label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-2 text-gray-400 text-xs">₹</span>
                        <input
                          type="number"
                          value={rates.tier1 ?? 3000}
                          onChange={(e) => handleRateChange(unit._id, 'tier1', e.target.value)}
                          className="w-full pl-6 pr-2 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#143628] focus:ring-1 focus:ring-[#C5A059]"
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 block">Full Board with meals</span>
                    </div>

                    {/* Tier 2 */}
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        2 Adults (Couple)
                      </label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-2 text-gray-400 text-xs">₹</span>
                        <input
                          type="number"
                          value={rates.tier2 ?? 4000}
                          onChange={(e) => handleRateChange(unit._id, 'tier2', e.target.value)}
                          className="w-full pl-6 pr-2 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#143628] focus:ring-1 focus:ring-[#C5A059]"
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 block">Base Couple Tariff</span>
                    </div>

                    {/* Tier 3 */}
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        3 Adults (Triple)
                      </label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-2 text-gray-400 text-xs">₹</span>
                        <input
                          type="number"
                          value={rates.tier3 ?? 5400}
                          onChange={(e) => handleRateChange(unit._id, 'tier3', e.target.value)}
                          className="w-full pl-6 pr-2 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#143628] focus:ring-1 focus:ring-[#C5A059]"
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 block">Includes extra mattress</span>
                    </div>

                    {/* Tier 4 */}
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        4 Adults (Quad)
                      </label>
                      {isRwCottage ? (
                        <div className="py-1.5 px-2 bg-gray-200/70 rounded-lg text-center text-xs font-medium text-gray-500 border border-gray-200">
                          N/A (Max 3 Adults)
                        </div>
                      ) : (
                        <div className="relative">
                          <span className="absolute left-2.5 top-2 text-gray-400 text-xs">₹</span>
                          <input
                            type="number"
                            value={rates.tier4 ?? 6600}
                            onChange={(e) => handleRateChange(unit._id, 'tier4', e.target.value)}
                            className="w-full pl-6 pr-2 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#143628] focus:ring-1 focus:ring-[#C5A059]"
                          />
                        </div>
                      )}
                      <span className="text-[10px] text-gray-400 mt-1 block">
                        {isRwCottage ? 'Restricted (Max 3 guests)' : 'Allowed (Max 4 guests)'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 gap-2">
                    {isRwCottage ? (
                      <button
                        onClick={() => handleSaveUnitPricing(unit, true)}
                        disabled={isSaving}
                        className="text-xs text-[#143628] hover:text-[#C5A059] flex items-center gap-1 font-medium transition-colors"
                        title="Sync these prices across all 4 Red & White cottages"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                        Apply to all 4 R&W cottages
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">Independent cottage pricing</span>
                    )}

                    <button
                      onClick={() => handleSaveUnitPricing(unit, false)}
                      disabled={isSaving}
                      className="px-4 py-1.5 bg-[#143628] hover:bg-[#0F291E] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5 text-[#C5A059]" />
                          Save Unit Rate
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CATEGORY 2: CAMPING TENTS */}
      {activeCategory === 'camping' && (
        <div className="space-y-6">
          <div className="bg-[#F4EFE6] border border-[#C5A059]/40 p-4 rounded-xl flex items-start gap-3 text-sm text-[#143628]">
            <Info className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Wilderness Tent Pricing Rules:</p>
              <ul className="list-disc pl-5 mt-1 space-y-0.5 text-xs text-gray-700">
                <li>Solo Camper: ₹1,499 per night with buffet meals and community campfire included.</li>
                <li><strong>Couple Rate:</strong> Strictly <strong>₹2,999</strong> (never ₹2,998) to reflect special couple safari package.</li>
                <li>3 or more camping guests: Multiplied by the per-person rate.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campingUnits.map(unit => {
              const rates = editableRates[unit._id] || {};
              const isSaving = savingId === unit._id;

              return (
                <div 
                  key={unit._id} 
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:border-[#C5A059] transition-all space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#143628] text-white rounded">
                          {unit.code}
                        </span>
                        <h3 className="font-serif font-bold text-lg text-[#143628]">{unit.name}</h3>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Waterproof Alpine Double Tent with shared sanitary block</p>
                    </div>

                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-100 text-emerald-800">
                      {unit.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Solo Camper (1 Person)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
                        <input
                          type="number"
                          value={rates.perPerson ?? 1499}
                          onChange={(e) => handleRateChange(unit._id, 'perPerson', e.target.value)}
                          className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#143628] focus:ring-1 focus:ring-[#C5A059]"
                        />
                      </div>
                      <span className="text-[11px] text-gray-400 mt-1 block">Includes full board & bonfire</span>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Couple Rate (2 Persons)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
                        <input
                          type="number"
                          value={rates.couple ?? 2999}
                          onChange={(e) => handleRateChange(unit._id, 'couple', e.target.value)}
                          className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#143628] focus:ring-1 focus:ring-[#C5A059]"
                        />
                      </div>
                      <span className="text-[11px] text-amber-700 font-medium mt-1 block">Strictly ₹2,999 couple bundle</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleSaveUnitPricing(unit, true)}
                      disabled={isSaving}
                      className="text-xs text-[#143628] hover:text-[#C5A059] flex items-center gap-1 font-medium"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      Apply to both tents (A & B)
                    </button>

                    <button
                      onClick={() => handleSaveUnitPricing(unit, false)}
                      disabled={isSaving}
                      className="px-4 py-2 bg-[#143628] hover:bg-[#0F291E] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'Save Tent Rate'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CATEGORY 3: ADD-ONS & MEALS */}
      {activeCategory === 'addons' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div>
            <h3 className="font-serif font-bold text-xl text-[#143628] flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#C5A059]" />
              Meals, Children Tariffs & Experience Add-ons
            </h3>
            <p className="text-gray-500 text-xs mt-1">
              Standard booking rates include vegetarian breakfast and dinner. These global add-ons apply across all cottages and tents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Child 5-10 yrs (Cottage) */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-[#143628] font-semibold text-sm">
                <Baby className="w-4 h-4 text-[#C5A059]" />
                Child Tariff (5–10 years)
              </div>
              <p className="text-xs text-gray-500">Per child per night with mattress & all meals</p>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
                <input
                  type="number"
                  value={addons.childCottage}
                  onChange={(e) => setAddons(p => ({ ...p, childCottage: Math.max(0, parseInt(e.target.value, 10) || 0) }))}
                  className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#143628] focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>
              <span className="text-[11px] text-gray-400 block">Infants under 5 are always 100% Free</span>
            </div>

            {/* Non-Veg Meal Plan (Adult) */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-[#143628] font-semibold text-sm">
                <Utensils className="w-4 h-4 text-[#C5A059]" />
                Non-Veg Supplement (Adult)
              </div>
              <p className="text-xs text-gray-500">Local Country Chicken / Desi Mutton Dinner</p>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
                <input
                  type="number"
                  value={addons.nonVegAdult}
                  onChange={(e) => setAddons(p => ({ ...p, nonVegAdult: Math.max(0, parseInt(e.target.value, 10) || 0) }))}
                  className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#143628] focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>
              <span className="text-[11px] text-gray-400 block">Per adult guest per night</span>
            </div>

            {/* Non-Veg Meal Plan (Child) */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-[#143628] font-semibold text-sm">
                <Utensils className="w-4 h-4 text-[#C5A059]" />
                Non-Veg Supplement (Child)
              </div>
              <p className="text-xs text-gray-500">Half portion non-veg accompaniment</p>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
                <input
                  type="number"
                  value={addons.nonVegChild}
                  onChange={(e) => setAddons(p => ({ ...p, nonVegChild: Math.max(0, parseInt(e.target.value, 10) || 0) }))}
                  className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#143628] focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>
              <span className="text-[11px] text-gray-400 block">Per child (5-10 yrs) per night</span>
            </div>

            {/* Bonfire Hearth Add-on */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-[#143628] font-semibold text-sm">
                <Flame className="w-4 h-4 text-[#C5A059]" />
                Private Bonfire Hearth
              </div>
              <p className="text-xs text-gray-500">Sal wood log fire with night attendant</p>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400 text-sm">₹</span>
                <input
                  type="number"
                  value={addons.bonfirePerPerson}
                  onChange={(e) => setAddons(p => ({ ...p, bonfirePerPerson: Math.max(0, parseInt(e.target.value, 10) || 0) }))}
                  className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#143628] focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>
              <span className="text-[11px] text-gray-400 block">Per person/night (min 2 paying guests)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={handleSaveAddons}
              disabled={savingId === 'addons'}
              className="px-6 py-2.5 bg-[#143628] hover:bg-[#0F291E] text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-[#C5A059]" />
              {savingId === 'addons' ? 'Saving Add-on Rates...' : 'Save All Add-on Rates'}
            </button>
          </div>
        </div>
      )}

      {/* CATEGORY 4: LIVE PRICE SIMULATOR */}
      {activeCategory === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-5">
            <h3 className="font-serif font-bold text-lg text-[#143628] flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#C5A059]" />
              Instant Tariff Calculator
            </h3>
            <p className="text-xs text-gray-500">
              Test and verify how the pricing engine quotes reservations with your current rates.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Select Unit Type</label>
                <select
                  value={simUnitType}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSimUnitType(val);
                    if (val === 'red_white_cottage' && simAdults > 3) setSimAdults(3);
                  }}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#143628]"
                >
                  <option value="riverwood">Riverwood (Max 4 adults)</option>
                  <option value="cherry_blossom">Cherry Blossom (Max 3 adults)</option>
                  <option value="autumn_abode">Autumn Abode (Max 4 adults)</option>
                  <option value="spring_abode">Spring Abode (Max 4 adults)</option>
                  <option value="gulmohar">Gulmohar (Max 3 adults)</option>
                  <option value="amberwood">Amberwood (Max 4 adults)</option>
                  <option value="camping_tent">Wilderness Camping Tent</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Adults</label>
                  <select
                    value={simAdults}
                    onChange={(e) => setSimAdults(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#143628]"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    {simUnitType !== 'red_white_cottage' && <option value={4}>4 Adults</option>}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Nights</label>
                  <input
                    type="number"
                    min={1}
                    max={14}
                    value={simNights}
                    onChange={(e) => setSimNights(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#143628]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Children (5–10 years)</label>
                <input
                  type="number"
                  min={0}
                  max={4}
                  value={simChildren}
                  onChange={(e) => setSimChildren(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#143628]"
                />
              </div>

              <div className="pt-2 border-t border-gray-100 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={simNonVeg}
                    onChange={(e) => setSimNonVeg(e.target.checked)}
                    className="rounded text-[#143628] focus:ring-[#C5A059]"
                  />
                  <span>Include Non-Veg Meal Plan</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={simBonfire}
                    onChange={(e) => setSimBonfire(e.target.checked)}
                    className="rounded text-[#143628] focus:ring-[#C5A059]"
                  />
                  <span>Include Private Bonfire Hearth</span>
                </label>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-7 bg-[#143628] text-white rounded-2xl p-6 shadow-md space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
                    Pricing Engine Live Output
                  </span>
                  <h4 className="font-serif font-bold text-2xl mt-0.5">
                    {simQuote ? `₹${simQuote.inr.grandTotal.toLocaleString('en-IN')}` : 'Calculating...'}
                  </h4>
                </div>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/90">
                  {simNights} Night{simNights > 1 ? 's' : ''} • {simAdults} Adult{simAdults > 1 ? 's' : ''}
                </span>
              </div>

              {simQuote ? (
                <div className="py-4 space-y-3 text-sm">
                  <div className="flex justify-between text-white/80">
                    <span>Base Stay ({simNights} night × ₹{simQuote.inr.baseRatePerNight.toLocaleString('en-IN')})</span>
                    <span className="font-mono text-white">₹{simQuote.inr.baseStayTotal.toLocaleString('en-IN')}</span>
                  </div>

                  {simQuote.inr.childrenTotal > 0 && (
                    <div className="flex justify-between text-white/80">
                      <span>Children Tariffs ({simChildren} child)</span>
                      <span className="font-mono text-white">₹{simQuote.inr.childrenTotal.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {simQuote.inr.nonVegTotal > 0 && (
                    <div className="flex justify-between text-white/80">
                      <span>Non-Veg Meal Supplement</span>
                      <span className="font-mono text-white">₹{simQuote.inr.nonVegTotal.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {simQuote.inr.bonfireTotal > 0 && (
                    <div className="flex justify-between text-white/80">
                      <span>Private Bonfire Hearth</span>
                      <span className="font-mono text-white">₹{simQuote.inr.bonfireTotal.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-base">
                    <span>Total Package Value</span>
                    <span className="font-mono text-[#C5A059]">₹{simQuote.inr.grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-white/60">
                  {simLoading ? 'Querying backend pricing engine...' : 'Configure parameters to view quote'}
                </div>
              )}
            </div>

            {/* Deposit Split Box */}
            {simQuote && (
              <div className="bg-black/25 rounded-xl p-4 border border-white/10 grid grid-cols-2 gap-4 text-center">
                <div className="border-r border-white/10 pr-2">
                  <p className="text-xs text-[#C5A059] font-medium uppercase tracking-wider">50% Advance Online</p>
                  <p className="text-xl font-mono font-bold mt-1 text-white">
                    ₹{simQuote.inr.advancePayable.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-white/60 mt-0.5">Required to confirm booking</p>
                </div>
                <div className="pl-2">
                  <p className="text-xs text-white/70 font-medium uppercase tracking-wider">50% Balance Due</p>
                  <p className="text-xl font-mono font-bold mt-1 text-white">
                    ₹{simQuote.inr.balanceDue.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-white/60 mt-0.5">Payable at check-in</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
