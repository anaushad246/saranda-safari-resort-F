// Verified Sightseeing Destinations & Assistance Request Workflow
// Single Source of Truth based on Client Handover Specification
// Note: Internal quotation rates are strictly kept offline. Public site shows approximate one-way distances and enquiry-led workflow.

export const sightseeingContent = {
  heroBadge: "Sightseeing & Assistance",
  heroTitle: "Explore Beyond the Resort",
  heroSubtitle: "Discover waterfalls, riverside landscapes, hilltop sunsets and places of worship during your stay. Whether you prefer a relaxed outing or a day exploring the surroundings, our team can help you plan your visit.",
  heroImage: "/sightseeing-hero.jpg",

  destinations: [
    {
      id: "jhikra-waterfall",
      name: "Jhikra Waterfall",
      category: "Natural Waterfall",
      distance: "10.7 km · one way",
      description: "A secluded multi-tiered forest cascade tumbling down rock shelves into cool natural pools.",
      image: "/jhikraWaterfall.png"
    },
    {
      id: "pacheri-waterfall",
      name: "Pacheri Waterfall",
      category: "River Cascade",
      distance: "17.2 km · one way",
      description: "A wide, scenic river cascade forming natural swirling rock pools in the Keonjhar valley.",
      image: "/PacheriWaterfall.jpg"
    },
    {
      id: "kiriburu-sunset",
      name: "Kiriburu Sunset Point",
      category: "Hilltop Vantage",
      distance: "20 km · one way",
      description: "Famous panoramic hilltop vista overlooking the endless rolling 700 hills of Saranda at dusk.",
      image: "/KiriburuSunsetPoint.png"
    },
    {
      id: "pundul-river",
      name: "Pundul River",
      category: "Riverside Landscape",
      distance: "20 km · one way",
      description: "A clear hill stream winding through gravel banks and quiet forest valleys away from tourist crowds.",
      image: "/sightseeing-pundul.jpg"
    },
    {
      id: "mirgsingha-temple",
      name: "Mirgsingha Temple",
      category: "Sacred Shrine",
      distance: "25 km · one way",
      description: "An ancient regional stone temple reverently set amidst natural rock outcrops and sal trees.",
      image: "/sightseeing-mirgsingha.jpg"
    },
    {
      id: "jateshwar-temple",
      name: "Jateshwar Temple",
      category: "Forest Shiva Shrine",
      distance: "28 km · one way",
      description: "A venerated forest Shiva shrine in a quiet woodland clearing, known for its tranquil spiritual presence.",
      image: "/sightseeing-jateshwar.jpg"
    }
  ],

  moreToExploreTitle: "Also available on enquiry",
  moreToExplore: [
    { name: "Thalkobad", note: "Deep Forest Village & Historic Post" },
    { name: "Ghaghirathi Waterfall", note: "Secluded Forest Cascade" },
    { name: "Maa Tarini Temple", note: "Venerated Regional Shrine" },
    { name: "Leopard Caves Trek", note: "Escorted Rocky Ridge Trail" }
  ],
  moreToExploreNote: "Exact routes, place names and access arrangements will be confirmed when planning your visit.",

  exploreModesTitle: "Explore your way",
  exploreModesSubtitle: "Choose the level of assistance that suits your travel style:",
  exploreModes: [
    { id: "vehicle", label: "Vehicle only", desc: "Bolero with experienced local driver for your group" },
    { id: "guide", label: "Guide only", desc: "Local guide joins your own vehicle to navigate trails" },
    { id: "both", label: "Vehicle + Guide", desc: "Full assistance: vehicle and knowledgeable local guide" },
    { id: "self", label: "Own vehicle / No assistance", desc: "Self-guided outing with our team's route advice" }
  ],
  exploreAssistanceNote: "Bolero vehicles and local guides can be arranged in advance, subject to availability.",

  planningNote: "Sightseeing is arranged separately from your stay. Final quotation is confirmed before payment. Visits depend on weather, local access and permissions."
};
