// Official Accommodation Catalogue & Stays
// Single Source of Truth based strictly on Client Handover Specification

// 1. Boutique Accommodation Catalogue Presentation (For StayPage)
export const stayContent = {
  heroTitle: "Accommodation",
  heroDescription: "At Saranda Safari Resort, our accommodations are designed to bring you closer to nature without compromising on comfort and warmth. Tucked alongside the peaceful Karo River and surrounded by lush foliage, each of our distinct stays features its own unique character—from rustic, handcrafted wooden chalets to vibrant, lawn-facing retreats with spacious open verandas. Whether you are looking for a front-row seat to the morning river view, a cozy stay nestled under a canopy of mature trees, or a peaceful sanctuary for quiet reflection, our stays provide the perfect backdrop to slow down, unwind, and feel right at home.",
  heroImage: "/placewhyvisit.webp",

  featuredCottages: [
    {
      id: "riverwood",
      name: "Riverwood",
      units: 1,
      cottageCount: "1 unit",
      capacity: "4 Guests",
      tagline: "The warmth of wood, the calm of the riverside.",
      subtitle: "The warmth of wood, the calm of the riverside.",
      setting: "Riverside location, rustic wooden charm, leisurely river-facing veranda.",
      image: "/RIVERWOODCOTTAGE.webp",
      description: "Riverwood brings together rustic wooden charm and a beautiful riverside view at Saranda Safari Resort. Settle into a leisurely morning, sip your tea, and watch the changing light over the water."
    },
    {
      id: "cherry-blossom",
      name: "Cherry Blossom",
      units: 4,
      cottageCount: "4 units",
      capacity: "3 Guests / Unit",
      tagline: "A peaceful retreat with our finest river views.",
      subtitle: "A peaceful retreat with our finest river views.",
      setting: "Direct Karo River vantage, white walls with red accents, graceful arched verandas, mature tree cover.",
      image: "/CHERRYBLOSSOM.webp",
      description: "Offering the best riverside views, Cherry Blossom invites you to slow down and enjoy the beauty of the Karo River. Their white walls, cheerful red accents, and graceful arched verandas create a charming setting amid mature trees and open lawns."
    }
  ],

  otherCottages: [
    {
      id: "autumn-abode",
      name: "Autumn Abode",
      units: 3,
      cottageCount: "3 units",
      capacity: "4 Guests / Unit",
      tagline: "Where mornings arrive in gold.",
      subtitle: "Where mornings arrive in gold.",
      setting: "First morning sunrise rays, golden-yellow pillars, verandas beneath leafy shade.",
      image: "/AUTUMNABODE.webp",
      description: "The first rays of sunrise fall on Autumn Abode’s cheerful yellow pillars, bathing the cottages in a warm golden glow. Set beneath mature trees, their welcoming verandas offer a lovely place for morning tea and birdsong."
    },
    {
      id: "spring-abode",
      name: "Spring Abode",
      units: 4,
      cottageCount: "4 units",
      capacity: "4 Guests / Unit",
      tagline: "A cheerful retreat overlooking the lawns.",
      subtitle: "A cheerful retreat overlooking the lawns.",
      setting: "Front-facing open green lawns, spacious sit-out verandas, relaxed family-friendly ambiance.",
      image: "/SpringAbode.webp",
      description: "With welcoming verandas and open lawns stretching out in front, Spring Abode offers a relaxed setting to enjoy Saranda Safari Resort’s natural surroundings. Its simple cottage charm makes it a lovely choice for families and friends."
    },
    {
      id: "gulmohar",
      name: "Gulmohar",
      units: 1,
      cottageCount: "1 unit",
      capacity: "3 Guests",
      tagline: "A little wooden retreat with a wide view of resort life.",
      subtitle: "A little wooden retreat with a wide view of resort life.",
      setting: "Warm red wooden exterior, yellow window frames, elevated perspective of lawns and resort life.",
      image: "/GulmoharCottage.webp",
      description: "With its warm red wooden walls and cheerful yellow windows, Gulmohar offers rustic charm amid the trees. From here, much of the resort’s landscape unfolds before you — the open lawns, neighbouring cottages, and surrounding greenery."
    },
    {
      id: "amberwood",
      name: "Amberwood",
      units: 1,
      cottageCount: "1 unit",
      capacity: "4 Guests",
      tagline: "A quiet retreat beneath the trees.",
      subtitle: "A quiet retreat beneath the trees.",
      setting: "Natural rustic wooden craftsmanship, earthy color palette, dappled sunlight beneath dense canopy.",
      image: "/AMBERWOOD.webp",
      description: "With its rustic wooden charm, warm earthy tones, and welcoming veranda, Amberwood invites you to slow down and savour the peaceful surroundings. Sunlight filters through the leafy canopy, casting gentle patterns across the cottage."
    }
  ],

  campingExperience: {
    title: "Camping Under the Open Sky",
    subtitle: "Close to the river, beneath the forest canopy.",
    capacity: "2 tents · 5 guests total",
    image: "/CampingA.webp",
    description: "Sleep beneath the trees and wake to birdsong in the welcoming surroundings of Saranda Safari Resort. Whether travelling with friends or as a woman exploring solo, enjoy a camping escape close to nature, complete with starlight evenings and unhurried quiet."
  }
};

// 2. Operational Inventory Engine (For Booking Engine & Availability Verification)
// Total Capacity: 20 cottage/log house + 5 camping = 25 overnight guests
export const stayInventory = {
  totalCapacity: 25,
  cottageLogHouseCapacity: 20,
  campingCapacity: 5,

  units: [
    {
      id: "riverwood",
      name: "Riverwood",
      type: "log_house",
      unitCount: 1,
      maxAdultsPerUnit: 4,
      minAdultsPerUnit: 1,
      tag: "Riverside Wooden Chalet (Max 4 Guests)",
      setting: "Riverside location, rustic wooden charm, leisurely river-facing veranda.",
      description: "Riverwood brings together rustic wooden charm and a beautiful riverside view at Saranda Safari Resort. Settle into a leisurely morning, sip your tea, and watch the changing light over the water.",
      bedConfiguration: "Double bed + two timber twin beds (sleeps up to 4)",
      bathroom: "Private attached western bathroom with shower",
      amenities: [
        "Authentic natural timber craftsmanship",
        "Attached western bathroom with hot water on request",
        "Leisurely river-facing veranda",
        "Electricity & ceiling fans",
        "Direct Karo river view"
      ],
      pricingTiers: { 1: 3000, 2: 4000, 3: 5400, 4: 6600 },
      childPricing: { under5: 0, age5to10: 700, age11Plus: "regular_rate" },
      mealInclusion: "Vegetarian breakfast, lunch, and dinner included (breakfast served on departure morning).",
      timings: "Check-in: 9:00 AM | Check-out: 9:00 AM next day"
    },
    {
      id: "cherry-blossom",
      name: "Cherry Blossom",
      type: "cottage",
      unitCount: 4,
      maxAdultsPerUnit: 3,
      minAdultsPerUnit: 1,
      tag: "Finest River Views & Arched Verandas (Max 3 Guests)",
      setting: "Direct Karo River vantage, white walls with red accents, graceful arched verandas, mature tree cover.",
      description: "Offering the best riverside views, Cherry Blossom invites you to slow down and enjoy the beauty of the Karo River. Their white walls, cheerful red accents, and graceful arched verandas create a charming setting amid mature trees and open lawns.",
      bedConfiguration: "Double bed + extra cot (sleeps up to 3)",
      bathroom: "Private attached western bathroom with shower",
      amenities: [
        "Direct Karo River outlook",
        "Attached western bathroom with hot water",
        "Graceful arched veranda",
        "Electricity & ceiling fans",
        "Lawn & riverside breeze"
      ],
      pricingTiers: { 1: 3000, 2: 4000, 3: 5400 },
      childPricing: { under5: 0, age5to10: 700, age11Plus: "regular_rate" },
      mealInclusion: "Vegetarian breakfast, lunch, and dinner included (breakfast served on departure morning).",
      timings: "Check-in: 9:00 AM | Check-out: 9:00 AM next day"
    },
    {
      id: "autumn-abode",
      name: "Autumn Abode",
      type: "cottage",
      unitCount: 3,
      maxAdultsPerUnit: 4,
      minAdultsPerUnit: 1,
      tag: "Golden Sunrise Pillars & Leafy Shade (Max 4 Guests)",
      setting: "First morning sunrise rays, golden-yellow pillars, verandas beneath leafy shade.",
      description: "The first rays of sunrise fall on Autumn Abode’s cheerful yellow pillars, bathing the cottages in a warm golden glow. Set beneath mature trees, their welcoming verandas offer a lovely place for morning tea and birdsong.",
      bedConfiguration: "Double bed + twin beds (sleeps up to 4)",
      bathroom: "Private attached western bathroom",
      amenities: [
        "Sunrise views & golden pillars",
        "Attached western bathroom",
        "Shaded veranda beneath mature trees",
        "Electricity & ceiling fans",
        "Fresh forest air"
      ],
      pricingTiers: { 1: 3000, 2: 4000, 3: 5400, 4: 6600 },
      childPricing: { under5: 0, age5to10: 700, age11Plus: "regular_rate" },
      mealInclusion: "Vegetarian breakfast, lunch, and dinner included (breakfast served on departure morning).",
      timings: "Check-in: 9:00 AM | Check-out: 9:00 AM next day"
    },
    {
      id: "spring-abode",
      name: "Spring Abode",
      type: "cottage",
      unitCount: 4,
      maxAdultsPerUnit: 4,
      minAdultsPerUnit: 1,
      tag: "Open Lawns & Family Verandas (Max 4 Guests)",
      setting: "Front-facing open green lawns, spacious sit-out verandas, relaxed family-friendly ambiance.",
      description: "With welcoming verandas and open lawns stretching out in front, Spring Abode offers a relaxed setting to enjoy Saranda Safari Resort’s natural surroundings. Its simple cottage charm makes it a lovely choice for families and friends.",
      bedConfiguration: "Double bed + twin beds (sleeps up to 4)",
      bathroom: "Private attached western bathroom",
      amenities: [
        "Direct front-facing open lawn view",
        "Spacious sit-out veranda",
        "Attached western bathroom",
        "Electricity & ceiling fans",
        "Family-friendly setting"
      ],
      pricingTiers: { 1: 3000, 2: 4000, 3: 5400, 4: 6600 },
      childPricing: { under5: 0, age5to10: 700, age11Plus: "regular_rate" },
      mealInclusion: "Vegetarian breakfast, lunch, and dinner included (breakfast served on departure morning).",
      timings: "Check-in: 9:00 AM | Check-out: 9:00 AM next day"
    },
    {
      id: "gulmohar",
      name: "Gulmohar",
      type: "cottage",
      unitCount: 1,
      maxAdultsPerUnit: 3,
      minAdultsPerUnit: 1,
      tag: "Red Wooden Walls & Wide Landscape View (Max 3 Guests)",
      setting: "Warm red wooden exterior, yellow window frames, elevated perspective of lawns and resort life.",
      description: "With its warm red wooden walls and cheerful yellow windows, Gulmohar offers rustic charm amid the trees. From here, much of the resort’s landscape unfolds before you — the open lawns, neighbouring cottages, and surrounding greenery.",
      bedConfiguration: "Double bed + extra cot (sleeps up to 3)",
      bathroom: "Private attached western bathroom",
      amenities: [
        "Warm red wooden walls & yellow windows",
        "Elevated landscape outlook",
        "Attached western bathroom",
        "Veranda overlooking resort life",
        "Electricity & ceiling fans"
      ],
      pricingTiers: { 1: 3000, 2: 4000, 3: 5400 },
      childPricing: { under5: 0, age5to10: 700, age11Plus: "regular_rate" },
      mealInclusion: "Vegetarian breakfast, lunch, and dinner included (breakfast served on departure morning).",
      timings: "Check-in: 9:00 AM | Check-out: 9:00 AM next day"
    },
    {
      id: "amberwood",
      name: "Amberwood",
      type: "cottage",
      unitCount: 1,
      maxAdultsPerUnit: 4,
      minAdultsPerUnit: 1,
      tag: "Canopy Shade Sanctuary (Max 4 Guests)",
      setting: "Natural rustic wooden craftsmanship, earthy color palette, dappled sunlight beneath dense canopy.",
      description: "With its rustic wooden charm, warm earthy tones, and welcoming veranda, Amberwood invites you to slow down and savour the peaceful surroundings. Sunlight filters through the leafy canopy, casting gentle patterns across the cottage.",
      bedConfiguration: "Double bed + twin beds (sleeps up to 4)",
      bathroom: "Private attached western bathroom",
      amenities: [
        "Dappled canopy shade & garden tranquility",
        "Attached western bathroom",
        "Welcoming sit-out veranda",
        "Rustic timber craftsmanship",
        "Electricity & ceiling fans"
      ],
      pricingTiers: { 1: 3000, 2: 4000, 3: 5400, 4: 6600 },
      childPricing: { under5: 0, age5to10: 700, age11Plus: "regular_rate" },
      mealInclusion: "Vegetarian breakfast, lunch, and dinner included (breakfast served on departure morning).",
      timings: "Check-in: 9:00 AM | Check-out: 9:00 AM next day"
    },
    {
      id: "camping-tents",
      name: "Wilderness Camping Tents",
      type: "camping",
      unitCount: 2,
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
        couple: 2999
      },
      childPricing: {
        under5: 0,
        age5to10: 750,
        age11Plus: 1499
      },
      mealInclusion: "Complimentary vegetarian breakfast & bonfire included; shared bath facilities.",
      timings: "Check-in: 4:00 PM | Check-out: 9:00 AM next day"
    }
  ],

  inventoryNote: "Current operational capacity is strictly 25 overnight guests (20 cottage/log-house guests + 5 camping guests). Future accommodations currently undergoing finishing will not be opened for bookings until fully verified."
};