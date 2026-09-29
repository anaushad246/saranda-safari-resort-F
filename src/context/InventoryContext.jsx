import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { apiGetUnits } from '../services/api';

const UNIT_CODE_PREFIX = {
  'riverwood': 'RW',
  'cherry-blossom': 'CB',
  'autumn-abode': 'AA',
  'spring-abode': 'SA',
  'gulmohar': 'GM',
  'amberwood': 'AW',
  'camping-tents': 'TENT'
};

const DEFAULT_PRICING = {
  cottage: {
    oneAdult: 3000,
    twoAdults: 4500,
    threeAdults: 5400,
    fourAdults: 6600,
    rates: [
      { guests: 1, rate: 3000, note: "Single occupancy" },
      { guests: 2, rate: 4500, note: "₹2,250/person" },
      { guests: 3, rate: 5400, note: "₹1,800/person" },
      { guests: 4, rate: 6600, note: "Riverwood, Autumn, Spring, Amberwood" }
    ]
  },
  camping: {
    perPerson: 1499,
    couple: 2999,
    child: 750,
    rates: [
      { type: "Per Person", rate: 1499 },
      { type: "Couple (2 Guests)", rate: 2999 }
    ]
  },
  addons: {
    childCottage: 700,
    nonVegAdult: 300,
    bonfireRate: 250
  }
};

const InventoryContext = createContext({
  backendUnits: [],
  isLoading: true,
  livePricing: DEFAULT_PRICING,
  findUnit: () => null,
  refreshInventory: async () => {}
});

export function InventoryProvider({ children }) {
  const [backendUnits, setBackendUnits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUnits = useCallback(async () => {
    try {
      const res = await apiGetUnits({ skipAuthRedirect: true });
      if (Array.isArray(res?.data)) {
        setBackendUnits(res.data);
      }
    } catch {
      // Retains existing state or static fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  // Dynamically derive live pricing from backend units
  const livePricing = useMemo(() => {
    if (!backendUnits || backendUnits.length === 0) {
      return DEFAULT_PRICING;
    }

    // The published cottage table has to state one figure per guest count, but the owner
    // prices all fourteen cottages individually and they do diverge (Autumn Abode's
    // single-occupancy rate is ₹2,999; every other variety is ₹3,000). The lowest figure
    // per tier is used, which keeps the table a "from" price — the claim the surrounding
    // copy already makes. Picking one unit by array position instead would make the
    // property-wide rate whatever happened to sort first, and it would move the day that
    // unit was retired.
    const cottageUnits = backendUnits.filter(u => u.unitType !== 'camping_tent');

    const tierRupees = (tierKey, defaultRupees) => {
      const values = cottageUnits
        .map(u => {
          const rupees = u?.pricingTiers?.[tierKey];
          if (typeof rupees === 'number' && rupees > 0) return rupees;
          const paise = u?.pricingTiersPaise?.[tierKey];
          return typeof paise === 'number' && paise > 0 ? Math.round(paise / 100) : null;
        })
        .filter(v => v !== null);
      return values.length ? Math.min(...values) : defaultRupees;
    };

    const t1 = tierRupees('oneAdult', 3000);
    const t2 = tierRupees('twoAdults', 4500);
    const t3 = tierRupees('threeAdults', 5400);
    const t4 = tierRupees('fourAdults', 6600);

    const tent = backendUnits.find(u => u.unitType === 'camping_tent');
    const campingPerPerson = tent?.campingRates?.perPerson ?? (tent?.campingRatesPaise?.perPerson ? Math.round(tent.campingRatesPaise.perPerson / 100) : 1499);
    const campingCouple = tent?.campingRates?.couple ?? (tent?.campingRatesPaise?.couple ? Math.round(tent.campingRatesPaise.couple / 100) : 2999);

    const sampleAddon = backendUnits.find(u => u.addons || u.addonsPaise);
    const childCottage = sampleAddon?.addons?.child5to10 ?? (sampleAddon?.addonsPaise?.child5to10Paise ? Math.round(sampleAddon.addonsPaise.child5to10Paise / 100) : 700);
    const nonVegAdult = sampleAddon?.addons?.nonVegAdult ?? (sampleAddon?.addonsPaise?.nonVegAdultPaise ? Math.round(sampleAddon.addonsPaise.nonVegAdultPaise / 100) : 300);
    const bonfireRate = sampleAddon?.addons?.bonfirePerPerson ?? (sampleAddon?.addonsPaise?.bonfirePerPersonPaise ? Math.round(sampleAddon.addonsPaise.bonfirePerPersonPaise / 100) : 250);

    return {
      cottage: {
        oneAdult: t1,
        twoAdults: t2,
        threeAdults: t3,
        fourAdults: t4,
        rates: [
          { guests: 1, rate: t1, note: "Single occupancy" },
          { guests: 2, rate: t2, note: `₹${Math.round(t2 / 2).toLocaleString('en-IN')}/person` },
          { guests: 3, rate: t3, note: `₹${Math.round(t3 / 3).toLocaleString('en-IN')}/person` },
          { guests: 4, rate: t4, note: "Riverwood, Autumn, Spring, Amberwood" }
        ]
      },
      camping: {
        perPerson: campingPerPerson,
        couple: campingCouple,
        child: 750,
        rates: [
          { type: "Per Person", rate: campingPerPerson },
          { type: "Couple (2 Guests)", rate: campingCouple }
        ]
      },
      addons: {
        childCottage,
        nonVegAdult,
        bonfireRate
      }
    };
  }, [backendUnits]);

  const value = useMemo(() => ({
    backendUnits,
    isLoading,
    livePricing,
    refreshInventory: fetchUnits,
    findUnit: (frontendUnitId) => {
      const prefix = UNIT_CODE_PREFIX[frontendUnitId];
      if (!prefix) return null;
      const matches = backendUnits.filter(
        u => typeof u?.code === 'string' && u.code.startsWith(`${prefix}-`)
      );
      if (matches.length === 0) return null;
      return matches.reduce((best, u) => ((u.maxAdults || 0) > (best.maxAdults || 0) ? u : best));
    }
  }), [backendUnits, isLoading, livePricing, fetchUnits]);

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventory() {
  return useContext(InventoryContext);
}
