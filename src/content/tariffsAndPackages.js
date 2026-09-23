// Official Tariffs, Packages & Pricing Architecture
// Single Source of Truth based on Client Handover Specification & Approved Package Postings
// Note: Tariff values and inclusions are consumed by both the public catalogue and booking/enquiry engine.

export const tariffsAndPackages = {
  // Hero Meta
  heroTitle: "Packages",
  heroSubtitle: "Made for Slow Days & Special Moments",
  heroDescription: "From a few quiet hours in nature to an overnight stay, camping experience, long-term homestay or educational excursion, choose the package that suits your time and occasion.",
  heroImage: "/dining.png",
  heroTagline: "Stay • Unwind • Learn • Celebrate",

  // 1. OVERNIGHT STAYS
  overnight: {
    title: "Overnight Stays",
    subtitle: "Settle into nature with a cottage stay, open-air camping, or special long-term retreats.",

    // 1A. Standard Stays (Core Booking Engine)
    standardStays: [
      {
        id: "cottage-stay",
        name: "One Night Cottage Stay",
        tagline: "Traditional brick cottage or handcrafted wooden log house",
        image: "/onenight.jpeg",
        bookingType: "BOOKING",
        pricingModel: "GUEST_SLABS",
        timings: "Check-in: 9:00 AM | Check-out: 9:00 AM next day",
        pricingSummary: "From ₹3,000 / night",
        tariffs: [
          { guests: "1 guest", rate: 3000, note: "Single occupancy" },
          { guests: "2 guests", rate: 4000, note: "₹2,000 per person" },
          { guests: "3 guests", rate: 5400, note: "₹1,800 per person" },
          { guests: "4 guests", rate: 6600, note: "Valid on log house & other 4-person cottage" }
        ],
        inclusions: [
          "Complimentary vegetarian breakfast",
          "Private cottage with attached western bath & verandah",
          "Electricity with generator backup & ceiling fans"
        ],
        exclusions: [
          "Evening snacks & bonfire (available as add-ons)",
          "Sightseeing, guides & station transfers"
        ],
        notes: "Same rates apply to the wooden log house. 4-person rate applies only to the log house and other 4-person cottage."
      },
      {
        id: "overnight-camping",
        name: "Overnight Camping",
        tagline: "Sleep beneath the trees close to the Karo River",
        image: "/CampingA.png",
        bookingType: "BOOKING",
        pricingModel: "PER_PERSON_OR_COUPLE",
        timings: "Check-in: 4:00 PM | Check-out: 9:00 AM next day",
        pricingSummary: "₹1,499 / person • ₹2,999 / couple",
        tariffs: [
          { label: "Per person", rate: 1499, note: "Individual camping berth" },
          { label: "Couple", rate: 2999, note: "2 guests in double tent" }
        ],
        inclusions: [
          "Complimentary vegetarian breakfast",
          "Starlight evening bonfire included",
          "Weatherproof canvas tents with bedding & pillows",
          "Dedicated shared clean toilet & bath facilities"
        ],
        exclusions: [
          "Lunch & mid-day stay (check-in is 4:00 PM)",
          "Personal toiletries"
        ],
        notes: "Hot water available on request. 2 tents total: Tent A (2 guests), Tent B (3 guests)."
      }
    ],

    // 1B. Special Stays (Women's Retreat & Extended Homestay)
    specialStays: [
      {
        id: "womens-nature-retreat",
        name: "Women’s Nature Retreat",
        tagline: "Solo Women Travelers Welcome • Safe, serene and close to nature",
        badge: "Special Women Travel Tariff",
        image: "/womanretreat.jpeg",
        bookingType: "ENQUIRY",
        pricingModel: "SHARING_SLABS",
        timings: "Check-in: 9:00 AM | Check-out: 9:00 AM next day",
        pricingSummary: "From ₹1,499 / night",
        description: "Unwind in nature at Saranda Safari Resort — a peaceful, secure getaway designed for women, friends and small groups. Settle into peaceful cottages, relax on open lawns with gazebos, and enjoy an unhurried riverside escape.",
        tariffs: [
          { label: "Solo Woman Stay", rate: 1499, note: "Private peaceful cottage" },
          { label: "2 Women Sharing", rate: 2499, note: "₹1,250 per person" },
          { label: "3 Women Sharing", rate: 3300, note: "₹1,100 per person" },
          { label: "4 Women Sharing", rate: 4200, note: "₹1,050 per person" }
        ],
        weekdayOffer: "10% OFF on weekday advance bookings — Solo stay from ₹1,350 / night",
        inclusions: [
          "Peaceful cottage accommodation",
          "Access to open lawns, gazebo and Karo riverbank",
          "Safe and secure resort environment",
          "Bonfire on request"
        ],
        exclusions: [
          "Meals (not included in this tariff)",
          "Sightseeing & transport"
        ],
        notes: "Accommodation tariff only. Prior booking required. Verified contact: 7008307064."
      },
      {
        id: "extended-homestay",
        name: "Homestay for Two",
        tagline: "Stay longer. Feel at home. • Unwind, Explore, Belong",
        badge: "Long-Term Nature Living",
        image: "/homeStay.jpeg",
        bookingType: "ENQUIRY",
        pricingModel: "DURATION_SLABS",
        timings: "Weekly & Monthly Flexible Stay",
        pricingSummary: "From ₹10,500 (7 Nights for Two)",
        description: "More than a stay, a closer connection to nature. Designed for couples, remote professionals, or friends seeking an unhurried, extended retreat by the Karo River with self-cooking kitchen facilities.",
        tariffs: [
          { duration: "7 Nights", rate: 10500, perNight: "₹1,500 / night for two" },
          { duration: "15 Nights", rate: 19500, perNight: "₹1,300 / night for two" },
          { duration: "30 Nights", rate: 33000, perNight: "₹1,100 / night for two" }
        ],
        inclusions: [
          "Rates for two guests sharing one cottage",
          "Self-cooking kitchen & basic utensils",
          "Water, electricity & on-site parking included",
          "Housekeeping twice weekly • Linen changed weekly"
        ],
        optionalScooty: [
          { duration: "1 Day", rate: 400 },
          { duration: "7 Days", rate: 2450 },
          { duration: "15 Days", rate: 4500 },
          { duration: "30 Days", rate: 7500 }
        ],
        terms: [
          "Groceries and cooking gas extra",
          "Scooty rental: Two helmets included, petrol extra, 60 km/day allowance (extra ₹3/km)",
          "₹3,000 refundable cottage security deposit",
          "Special dates and peak periods quoted separately"
        ],
        notes: "Advance booking recommended. Verified contact: 7008307064."
      }
    ]
  },

  // 2. DAY & EVENING PACKAGES (ENQUIRY Mode)
  dayAndEvening: {
    title: "Day & Evening Visits",
    subtitle: "Short visits, daytime cottage use, and starlit gatherings by the fire.",
    packages: [
      {
        id: "hourly-stay",
        name: "Hourly Stay (6 Hours)",
        badge: "Cook • Relax • Reconnect",
        tagline: "Private cottage day-use for families & travel groups",
        image: "/hourlyStay.jpeg",
        bookingType: "ENQUIRY",
        pricingModel: "GROUP_SLABS",
        timings: "6 Hours Day-Use (Advance slot)",
        pricingSummary: "From ₹2,500",
        startingPrice: 2500,
        startingUnit: "up to 5 guests",
        description: "A flexible 6-hour private cottage rental for transit travellers, day-trippers, and families who want a comfortable base to relax, freshen up, or cook lunch together.",
        tariffs: [
          { slab: "Up to 5 guests", rate: 2500 },
          { slab: "6 to 10 guests", rate: 3500 },
          { slab: "11 to 15 guests", rate: 4500 }
        ],
        extras: [
          { item: "Additional guest", rate: 250, unit: "per person beyond slab" },
          { item: "Extra hour", rate: 500, unit: "per hour extension" },
          { item: "Extra cottage", rate: 1000, unit: "second cottage usage" }
        ],
        inclusions: [
          "Private cottage and attached washroom for 6 hours",
          "Access to resort kitchen, gas stove and cooking utensils",
          "Use of lawns, common areas and open verandah"
        ],
        exclusions: [
          "Ingredients & provisions (guests bring their own groceries/masalas)",
          "Overnight sleeping accommodation",
          "Cook/chef service (available on separate enquiry)"
        ],
        notes: "These are day-use group capacities, not sleeping capacities. Final timings and operating details confirmed upon enquiry."
      },
      {
        id: "evening-under-stars",
        name: "Evening Under the Stars",
        badge: "Bonfire & Hearth",
        tagline: "Bonfire, barbecue and night skies by the Karo River",
        image: "/eveningUnderStar.jpeg",
        bookingType: "ENQUIRY",
        pricingModel: "TIERED_PER_PERSON",
        timings: "6:00 PM – 11:00 PM (Min 2 guests)",
        pricingSummary: "From ₹399 / person",
        startingPrice: 399,
        startingUnit: "per person",
        description: "Gather with friends or family on the riverfront lawn around a warm wood-log fire beneath unpolluted starlit skies.",
        tariffs: [
          { tier: 1, name: "Bonfire", rate: "₹399/person", includes: "Wood-log hearth, seating & ambient lawn setting" },
          { tier: 2, name: "Bonfire + Snacks", rate: "₹549/person", includes: "Bonfire plus hot tea & evening snacks" },
          { tier: 3, name: "Bonfire + Barbecue", rate: "₹699/person", includes: "Bonfire plus freshly grilled barbecue portions" },
          { tier: 4, name: "Bonfire + Snacks + Barbecue", rate: "₹849/person", includes: "Complete evening spread on the riverside lawn" }
        ],
        inclusions: [
          "Dedicated outdoor fire pit with seasoned sal wood",
          "Riverside lawn seating & stargazing atmosphere",
          "Outdoor service by resort team"
        ],
        exclusions: [
          "Overnight cottage accommodation",
          "Hard beverages (strictly regulated)",
          "Transport/transfers"
        ],
        notes: "Minimum 2 paying guests. Pre-booking required by 3:00 PM on the day of the visit."
      },
      {
        id: "evening-pause",
        name: "An Evening Pause in Nature",
        badge: "Riverbank Tea",
        tagline: "A peaceful 2-hour late afternoon breath of fresh air",
        image: "/eveningpause.jpeg",
        bookingType: "ENQUIRY",
        pricingModel: "ENTRY_FEE",
        timings: "4:00 PM – 6:00 PM",
        pricingSummary: "Adult ₹100 • Child ₹50",
        startingPrice: 100,
        startingUnit: "adult entry",
        description: "Pause by the peaceful Karo River as afternoon softens toward dusk. Stroll the lawns, watch birds return to the trees, and enjoy a quiet pause far from highway noise.",
        tariffs: [
          { category: "Adults", rate: 100, label: "₹100 per person" },
          { category: "Children (5–10 yrs)", rate: 50, label: "₹50 per child" },
          { category: "Children under 5", rate: 0, label: "Free" }
        ],
        inclusions: [
          "Riverfront lawn access and walking grounds (4 PM–6 PM)",
          "Restroom facilities"
        ],
        exclusions: [
          "Tea/coffee/snacks are not yet confirmed as included (enquiry-led)",
          "Cottage access or room use",
          "Bonfire"
        ],
        notes: "Food and beverage inclusions are subject to confirmation with resort staff on the day of visit."
      }
    ]
  },

  // 3. GROUP & EDUCATIONAL EXPERIENCES
  groupAndEducational: {
    title: "Group & Educational Experiences",
    subtitle: "Curated outdoor learning, nature education, and team discovery for young minds along the Karo River.",
    package: {
      id: "school-excursions",
      name: "School Excursions & Nature Camps",
      badge: "Learning Beyond Classrooms",
      tagline: "Where Nature Becomes a Classroom • For Classes I – XII",
      image: "/schoolExcursion.jpeg",
      bookingType: "ENQUIRY",
      timings: "9:30 AM – 4:00 PM (Full Day Itinerary)",
      pricingSummary: "From ₹349 / student",
      description: "A day of discovery, learning, and outdoor fun in the lap of nature. Designed specifically for school students to explore forest biodiversity, bird watching, and team sports in a safe and secure setting.",
      schoolSlabs: [
        { name: "Junior Nature Day", classes: "Classes I – V", rate: 349 },
        { name: "Nature Explorer", classes: "Classes VI – VIII", rate: 399 },
        { name: "Nature & Sports Day", classes: "Classes IX – XII", rate: 449 }
      ],
      inclusions: [
        "Welcome drink on arrival",
        "Morning snack",
        "Nutritious student lunch",
        "Evening snack before departure",
        "Guided nature walk & bird identification",
        "Tree & plant exploration with wildlife talks",
        "Cricket, badminton, table tennis & games",
        "Nature quiz, competitions, prizes & certificates",
        "Use of play areas and basic sports equipment"
      ],
      teacherRules: [
        "1 Teacher Complimentary per 10 students",
        "Principal / Head Teacher Complimentary",
        "Minimum group size: 20 students",
        "For 50+ students: special discounted rates (₹375 onwards)",
        "Special sessions with Invited Nature Educators for Classes IX – XII"
      ],
      itinerary: [
        { time: "09:30 – 10:00", activity: "Arrival & welcome drink" },
        { time: "10:00 – 11:00", activity: "Nature trail & bird watching" },
        { time: "11:00 – 11:20", activity: "Morning snack" },
        { time: "11:20 – 12:00", activity: "Nature education activity (tree ID, wildlife, ecology)" },
        { time: "12:00 – 01:15", activity: "Sports & team games (cricket, badminton, TT)" },
        { time: "01:15 – 02:00", activity: "Nutritious lunch" },
        { time: "02:00 – 02:30", activity: "Rest & free recreation on the green lawns" },
        { time: "02:30 – 03:15", activity: "Nature quiz / treasure hunt / fun competitions" },
        { time: "03:15 – 03:40", activity: "Prize ceremony & certificates" },
        { time: "03:40 – 04:00", activity: "Evening snack & departure" }
      ],
      contact: "7008307064"
    }
  },

  // 4. CELEBRATIONS & EVENTS (EVENT_QUOTE Mode)
  celebrations: {
    title: "Gather, Celebrate, Remember",
    subtitle: "Open riverfront lawns and ancient tree canopies for intimate gatherings and milestone occasions.",
    image: "/resort-hero.jpg",
    notice: "Important: Launch overnight stay capacity is strictly 25 guests. Event groups exceeding 25 guests can celebrate on the lawn and grounds with customized day/evening arrangements.",
    events: [
      {
        id: "weddings-parties",
        name: "Open for Weddings & Parties",
        subtitle: "Special Destination Wedding Accommodation Packages",
        tagline: "Enchanting outdoor celebrations amidst ancient trees & Karo riverfront lawns",
        image: "/wedding.jpeg",
        advanceNotice: "Advance Booking Required — Please Pre-Book 6 Months in Advance",
        pricingType: "SLAB_TARIFF",
        pricingSummary: "Slabs from ₹24,000 / night",
        description: "Celebrate your dream wedding, milestone anniversary, or grand family gathering framed by mature sal trees, river breezes, and starlit skies. Complete accommodation slabs, sprawling riverfront lawns, banquet pandals, and tailored catering create an unforgettable destination experience.",
        features: [
          "Food & Accommodation Available",
          "Banquet / Pandals Available on Request",
          "Beautiful open lawns in a natural setting",
          "Ideal for weddings, parties and family gatherings"
        ],
        accommodationPackages: [
          { slab: "Up to 30 Guests", rate: "₹ 24,000", per: "/ night" },
          { slab: "31–50 Guests", rate: "₹ 35,000", per: "/ night" },
          { slab: "51–80 Guests", rate: "₹ 52,000", per: "/ night" }
        ],
        pricingNotes: [
          "Accommodation only",
          "Food, banquet, pandal, decoration, music and other event arrangements will be charged separately."
        ],
        bookingPhone: "7008307064"
      },
      {
        id: "new-year-puja",
        name: "New Year, Puja & Seasonal Gatherings",
        subtitle: "Festival & Seasonal Lawn Events",
        tagline: "Festival get-togethers, family reunions & holiday celebrations",
        image: "/newYear.jpeg",
        pricingType: "INDICATIVE_RANGE",
        pricingSummary: "Indicative venue pricing (Quotation-based)",
        description: "Celebrate Durga Puja, Diwali, New Year, or Holi surrounded by the wilderness of Saranda. Expansive open grounds allow customized shamianas, sound setups, and holiday buffet banquets.",
        indicativeRanges: [
          { group: "Up to 30 guests", range: "₹20,000 – ₹22,000" },
          { group: "31 to 50 guests", range: "₹28,000 – ₹32,000" },
          { group: "51 to 100 guests", range: "₹40,000 – ₹48,000" },
          { group: "101 to 150 guests", range: "₹50,000 – ₹60,000" },
          { group: "151 to 200 guests", range: "₹65,000 – ₹75,000" },
          { group: "Above 200 guests", range: "Custom Quotation" }
        ],
        extraDetails: [
          "Additional cottage, cleaning/waste handling, and extra-hour charges can apply.",
          "Generator power, sound system, and festival pandal can be arranged separately."
        ],
        bookingPhone: "7008307064"
      }
    ]
  },

  // Backward-compatibility properties for HomePage Section 4
  overnightCottage: {
    title: "Cottages & Wooden Log House — One Night",
    timings: "9:00 AM Check-in to 9:00 AM Next Day",
    rates: [
      { guests: 1, rate: 3000, note: "Single occupancy" },
      { guests: 2, rate: 4000, note: "Double occupancy (₹2,000/person)" },
      { guests: 3, rate: 5400, note: "Triple occupancy (₹1,800/person)" },
      { guests: 4, rate: 6600, note: "Quad occupancy (Log House / Other Cottage)" }
    ]
  },

  overnightCamping: {
    title: "Wilderness Camping — One Night",
    timings: "4:00 PM Check-in to 9:00 AM Next Day",
    rates: [
      { type: "Per Person", rate: 1499 },
      { type: "Couple", rate: 2999 }
    ]
  },

  // Backward-compatibility references for existing modals:
  eventVenue: {
    title: "Private Gatherings & Lawn Events",
    indicativeRange: "Indicative venue pricing on quotation",
    preBookingRequirement: "Advance notice required; 6-month window for weddings & large groups",
    criticalCapacityWarning: "Overnight accommodation is limited to the capacity of the units currently in service. Event groups can celebrate on the grounds with day/evening arrangements."
  },

  diningPolicy: {
    title: "Dining Policy & Add-ons",
    notice: "Complimentary vegetarian breakfast is included with every overnight cottage and camping stay.",
    subtext: "Breakfast is served hot and fresh on your departure morning before check-out. It is the only meal bundled into a package tariff."
  }
};
