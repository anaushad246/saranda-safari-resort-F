// Official Tariffs, Non-Veg Supplements & Packages
// Single Source of Truth based on Handover Document

export const tariffsAndPackages = {
  // 1. Overnight Cottage & Log House Tariff
  overnightCottage: {
    title: "Cottage & Wooden Log House — One Night",
    checkInTime: "9:00 AM",
    checkOutTime: "9:00 AM next day",
    mealInclusion: "Includes vegetarian breakfast, lunch, and dinner.",
    rates: [
      { guests: 1, rate: 3000, note: "Single occupancy in private cottage" },
      { guests: 2, rate: 4000, note: "Double occupancy (₹2,000 per person)" },
      { guests: 3, rate: 5400, note: "Triple occupancy (₹1,800 per person)" },
      { 
        guests: 4, 
        rate: 6600, 
        note: "Quad occupancy (₹1,650 per person) — Valid ONLY on Wooden Log House and Other cottage", 
        restrictedUnits: ["wooden-log-house", "other-cottage"] // Enforce guard!
      }
    ],
    childrenRates: [
      { ageGroup: "Children under 5 years", rate: 0, label: "Free" },
      { ageGroup: "Children aged 5 to 10 years", rate: 700, label: "₹700 per child (includes all 3 meals)" },
      { ageGroup: "Children aged 11+ years", rate: null, label: "Regular adult rate applies" }
    ],
    bonfireAddon: {
      rate: 250,
      unit: "per person",
      minGuests: 2,
      note: "Arranged in designated bonfire hearth with seasoned firewood (minimum 2 paying guests)."
    }
  },

  // 2. Overnight Camping Tariff
  overnightCamping: {
    title: "Wilderness Camping — One Night",
    checkInTime: "4:00 PM",
    checkOutTime: "9:00 AM next day",
    mealInclusion: "Includes vegetarian dinner, breakfast, evening bonfire, and shared bath/washroom facilities.",
    rates: [
      { type: "Individual Guest", rate: 1499, label: "₹1,499 per person" },
      { type: "Couple", rate: 2999, label: "₹2,999 per couple (strictly ₹2,999, never ₹2,998)" }
    ],
    childrenRates: [
      { ageGroup: "Children under 5 years", rate: 0, label: "Free" },
      { ageGroup: "Children aged 5 to 10 years", rate: 750, label: "₹750 per child (includes meals & tent space)" },
      { ageGroup: "Children aged 11+ years", rate: 1499, label: "Regular camping rate (₹1,499)" }
    ]
  },

  // 3. Official Non-Veg Supplements Table (Packages default to veg)
  nonVegSupplements: {
    title: "Non-Vegetarian Meal Supplements",
    description: "All our standard overnight packages include pure vegetarian meals prepared fresh with local village produce. Non-vegetarian additions are available as per the official supplement schedule below:",
    items: [
      {
        item: "Chicken or Fish Preparation",
        price: 150,
        unit: "per person per meal",
        description: "Freshly prepared local homestyle chicken curry or seasonal river/pond fish."
      },
      {
        item: "Cottage Stay Non-Veg Meal Plan",
        price: 300,
        unit: "per person per stay",
        description: "Covers non-vegetarian preparations for both Lunch and Dinner during a 24-hour cottage stay."
      },
      {
        item: "Camping Non-Veg Dinner Plan",
        price: 150,
        unit: "per person per stay",
        description: "Covers chicken/fish dinner supplement during an overnight camping stay."
      },
      {
        item: "Child Non-Veg Supplement (Ages 5–10)",
        price: 75,
        unit: "per child per meal",
        description: "Portion-adjusted chicken or fish curry for children aged 5 to 10."
      },
      {
        item: "Mutton / Prawns Special Preparations",
        price: null,
        unit: "On separate advance quotation",
        description: "Subject to local market availability; requires at least 24-hour advance notice."
      }
    ]
  },

  // 4. An Evening Pause in Nature (Day Visit)
  eveningNatureVisit: {
    title: "An Evening Pause in Nature",
    timing: "4:00 PM – 6:00 PM",
    pricing: [
      { category: "Adults", rate: 100, label: "₹100 per adult" },
      { category: "Children (Ages 5–10)", rate: 50, label: "₹50 per child" },
      { category: "Children under 5", rate: 0, label: "Free entry" }
    ],
    pendingClarification: "Please note: Tea, coffee, and evening snacks are [P] pending final confirmation whether included or available for separate on-site purchase.",
    experience: "Access to resort riverside lawns, mango orchards, and scenic walking trails during late golden hours."
  },

  // 5. Evening Under the Stars (5 Discrete Tiers)
  eveningUnderTheStars: {
    title: "Evening Under the Stars",
    timing: "6:00 PM – 11:00 PM",
    description: "An atmospheric evening gathering on the riverfront lawn around a crackling wood fire.",
    tiers: [
      { tier: 1, name: "Bonfire Experience Only", rate: 399, perPerson: true, includes: "River lawn access, log fire hearth, outdoor seating under starlight" },
      { tier: 2, name: "Bonfire + Evening Snacks", rate: 549, perPerson: true, includes: "Log bonfire + hot freshly made vegetarian appetizers & tea/coffee" },
      { tier: 3, name: "Bonfire + Barbecue", rate: 699, perPerson: true, includes: "Log bonfire + fresh coal barbecue skewers" },
      { tier: 4, name: "Bonfire + Snacks + Barbecue", rate: 849, perPerson: true, includes: "Log bonfire + appetizers, snacks, and live barbecue" },
      { tier: 5, name: "Bonfire + Complete Dinner Buffet", rate: "1,099 – 1,199", perPerson: true, includes: "Bonfire, evening snacks, barbecue skewers, and full dinner" }
    ],
    dinnerAddonOption: {
      veg: 250,
      nonVeg: 350,
      note: "Optional dinner buffet add-on for Tiers 1–4: ₹250 (Vegetarian) or ₹350 (Non-Vegetarian) per person."
    }
  },

  // 6. Hourly Day-Use Stays (Marked [P] Pending operating hours & deposit)
  hourlyStays: {
    title: "Hourly Stays (6-Hour Day Cottage Use)",
    statusNote: "[P] Enquiry-led only. Operating hours and refundable security deposit are pending final operational confirmation.",
    duration: "6 Hours",
    tiers: [
      { range: "Up to 5 Guests", rate: 2500, label: "₹2,500 (1 cottage)" },
      { range: "6 to 10 Guests", rate: 3500, label: "₹3,500 (1–2 cottages)" },
      { range: "11 to 15 Guests", rate: 4500, label: "₹4,500 (2 cottages)" }
    ],
    extras: [
      { item: "Additional Guest Beyond Tier", rate: 250, unit: "per person" },
      { item: "Extra Hour Extension", rate: 500, unit: "per hour" },
      { item: "Extra Cottage Designation", rate: 1000, unit: "per cottage" }
    ]
  },

  // 7. Event Venue Hire (Indicative Venue Range, 6 Months Pre-booking)
  eventVenue: {
    title: "Private Events & Gatherings Venue",
    indicativeRange: "₹20,000 to ₹75,000+",
    preBookingRequirement: "Minimum 6 months advance pre-booking required.",
    paymentTerms: "50% advance to block date; 100% full balance payable BEFORE the event begins.",
    criticalCapacityWarning: "Important: Overnight accommodation is strictly capped at 25 guests across all cottages, log house, and tents. Events with larger attendee lists must arrange external accommodations for guests exceeding 25.",
    extras: [
      { item: "Additional Cottage Room", rate: "₹3,000 – ₹4,000", unit: "per cottage" },
      { item: "Post-Event Cleaning & Waste Management", rate: "₹3,000 – ₹5,000", unit: "per event" },
      { item: "Additional Venue Hour", rate: 3000, unit: "per hour" }
    ]
  },

  taxPolicyNote: "No tax is added to the published package tariffs. All supplementary options (non-veg, bonfire, extra hours) are itemized transparently. The total payable amount is visible in full prior to booking."
};
