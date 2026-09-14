// Official Stay Inventory & Units
// Single Source of Truth based on Handover Document
// Total Capacity: 20 cottage/log house + 5 camping = 25 overnight guests

export const stayInventory = {
  totalCapacity: 25,
  cottageLogHouseCapacity: 20,
  campingCapacity: 5,

  units: [
    {
      id: "cottage-rw",
      name: "Red-and-White Cottage",
      type: "cottage",
      unitCount: 4,
      maxAdultsPerUnit: 3, // STRICT GUARD: Only up to 3 guests allowed!
      minAdultsPerUnit: 1,
      tag: "Classic Forest Heritage",
      description: "Traditional brick-and-mortar cottages with signature red-and-white painted facades, spacious verandahs, and attached private bathrooms, set amidst landscaped greenery.",
      bedConfiguration: "Double bed + extra cot upon request",
      bathroom: "Private attached western bathroom with shower",
      amenities: [
        "Attached western bathroom",
        "Hot water on request",
        "Covered private verandah",
        "Electricity & ceiling fans",
        "Garden & forest greenery view",
        "Fresh linens & daily housekeeping",
        "Close proximity to dining area"
      ],
      pricingTiers: {
        1: 3000,
        2: 4000,
        3: 5400
        // 4 is strictly disallowed on this unit!
      },
      childPricing: {
        under5: 0,
        age5to10: 700,
        age11Plus: "regular_rate"
      },
      mealInclusion: "Includes vegetarian breakfast, lunch, and dinner.",
      timings: "Check-in: 9:00 AM | Check-out: 9:00 AM next day"
    },
    {
      id: "wooden-log-house",
      name: "Wooden Log House",
      type: "log_house",
      unitCount: 1,
      maxAdultsPerUnit: 4, // 4-guest rate valid here!
      minAdultsPerUnit: 1,
      tag: "Rustic Timber Architecture",
      description: "An authentic rustic wooden log house crafted with natural timber poles and wood paneling, offering an earthy wilderness atmosphere with an attached bathroom and comfortable family living space.",
      bedConfiguration: "Double bed + additional timber twin beds (sleeps up to 4)",
      bathroom: "Private attached western bathroom",
      amenities: [
        "Authentic natural timber construction",
        "Attached western bathroom",
        "Hot water on request",
        "Spacious wooden verandah",
        "Electricity & ceiling fans",
        "Orchard & woodland outlook",
        "Rustic artisanal furnishings"
      ],
      pricingTiers: {
        1: 3000,
        2: 4000,
        3: 5400,
        4: 6600 // Valid on log house
      },
      childPricing: {
        under5: 0,
        age5to10: 700,
        age11Plus: "regular_rate"
      },
      mealInclusion: "Includes vegetarian breakfast, lunch, and dinner.",
      timings: "Check-in: 9:00 AM | Check-out: 9:00 AM next day"
    },
    {
      id: "other-cottage",
      name: "Other cottage",
      type: "cottage",
      unitCount: 1,
      maxAdultsPerUnit: 4, // 4-guest rate valid here!
      minAdultsPerUnit: 1,
      tag: "Standalone Cottage",
      description: "A standalone cottage designed for up to 4 guests, located alongside the mango trees with an attached bathroom and verandah.",

      bedConfiguration: "Double bed + two twin beds (sleeps up to 4)",
      bathroom: "Private attached western bathroom",
      amenities: [
        "Private attached western bathroom",
        "Hot water on request",
        "Spacious private sit-out",
        "Electricity & ceiling fans",
        "Mango orchard outlook",
        "Fresh linens & towels",
        "Family-friendly layout"
      ],
      pricingTiers: {
        1: 3000,
        2: 4000,
        3: 5400,
        4: 6600 // Valid on this cottage
      },
      childPricing: {
        under5: 0,
        age5to10: 700,
        age11Plus: "regular_rate"
      },
      mealInclusion: "Includes vegetarian breakfast, lunch, and dinner.",
      timings: "Check-in: 9:00 AM | Check-out: 9:00 AM next day"
    },
    {
      id: "camping-tents",
      name: "Wilderness Camping Tents",
      type: "camping",
      unitCount: 2, // Tent 1 (capacity 2), Tent 2 (capacity 3) = Total 5
      totalCampingCapacity: 5,
      tentsBreakdown: [
        { tentId: 1, capacity: 2, name: "Riverside Tent A (2-Person)" },
        { tentId: 2, capacity: 3, name: "Riverside Tent B (3-Person)" }
      ],
      tag: "Starlit Riverside Adventure",
      description: "Quality weatherproof outdoor camping pitched on the riverfront lawn under the open starry sky, complete with evening bonfire and outdoor dining.",
      bedConfiguration: "Camping ground mattresses, sleeping bags & clean cotton blankets",
      bathroom: "Clean shared bathroom and toilet block with running water",
      amenities: [
        "Weatherproof all-season canvas tents",
        "Evening bonfire included in package",
        "Riverside lawn location",
        "Clean shared toilet and shower facilities",
        "Outdoor dining area",
        "Clean bedding and pillows provided",
        "Night lantern and perimeter lighting"
      ],
      pricingTiers: {
        perPerson: 1499,
        couple: 2999 // Strictly 2999, never 2998!
      },
      childPricing: {
        under5: 0,
        age5to10: 750,
        age11Plus: 1499
      },
      mealInclusion: "Includes vegetarian dinner, breakfast, bonfire, and shared bath facilities.",
      timings: "Check-in: 4:00 PM | Check-out: 9:00 AM next day"
    }
  ],

  // Summary note for public display
  inventoryNote: "Current operational capacity is strictly 25 overnight guests (20 cottage/log-house guests + 5 camping guests). Future accommodations currently undergoing finishing will not be opened for bookings until fully verified.",
};
