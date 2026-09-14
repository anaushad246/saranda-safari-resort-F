// Verified Sightseeing Destinations & Assistance Request Workflow
// Single Source of Truth based on Handover Document
// Quotation-based: No fixed direct checkout.

export const sightseeingContent = {
  sectionTitle: "Sightseeing & Excursions",
  sectionSubtitle: "Explore scenic waterfalls, panoramic hill sunset points, and ancient forest temples.",
  processNotice: "Sightseeing trips are arranged via our network of reliable local vehicles. Submit an enquiry for your preferred destinations, and our resort team will coordinate vehicle availability and provide an exact quotation.",

  destinations: [
    {
      id: "jhikra-waterfall",
      name: "Jhikra Waterfall",
      category: "Natural Waterfall",
      tag: "Hidden Cascade",
      description: "A secluded perennial forest cascade tumbling down multi-tiered dark rock shelves surrounded by dense sal trees and wild ferns.",
      distanceNote: "Short excursion from resort; requires brief walking trail down rocky steps.",
      bestTime: "Post-monsoon and winter months (October through March)",
      highlights: ["Cool rock pools", "Forest shade", "Scenic nature trail"]
    },
    {
      id: "pacheri-waterfall",
      name: "Pacheri Waterfall",
      category: "Natural Waterfall",
      tag: "River Cascade",
      description: "A wider cascade forming natural swirling rock pools, ideal for photography and observing riverine wildlife in their natural habitat.",
      distanceNote: "Scenic drive through Keonjhar valley road.",
      bestTime: "September through February",
      highlights: ["Vibrant waterfall sprays", "Rocky riverbank picnics", "Birdlife"]
    },
    {
      id: "kiriburu-sunset",
      name: "Kiriburu Sunset Point",
      category: "Hill Vantage Point",
      tag: "Panoramic 180° Vista",
      description: "Famous panoramic hilltop overlooking the 'land of seven hundred hills'. Watch the evening mist settle over the endless ridgelines of Saranda as the sun sets in blazing amber and crimson.",
      distanceNote: "Approx. 45–60 minute scenic hill ascent drive.",
      bestTime: "Late afternoon arrival (4:30 PM recommended)",
      highlights: ["Spectacular hill horizons", "Cool alpine evening breeze", "Sunset photography"]
    },
    {
      id: "pundul-river",
      name: "Pundul River Valley",
      category: "River Landscape",
      tag: "Pristine Valley Waters",
      description: "A clear hill stream winding through gravel banks and quiet forest valleys, offering quiet riverbank spots away from regular tourist footfall.",
      distanceNote: "Countryside drive through local tribal hamlets.",
      bestTime: "Morning or mid-day",
      highlights: ["Crystal shallow waters", "Quiet reading spots", "River stones"]
    },
    {
      id: "mirgsingha-temple",
      name: "Mirgsingha Temple",
      category: "Heritage & Culture",
      tag: "Sacred Shrine",
      description: "An ancient regional temple reverently set amidst natural rock outcrops and shaded groves, deeply venerated by surrounding villages.",
      distanceNote: "Local cultural excursion.",
      bestTime: "Morning hours",
      highlights: ["Local tribal heritage", "Tranquil spiritual ambiance", "Historic architecture"]
    },
    {
      id: "jateshwar-temple",
      name: "Jateshwar Temple",
      category: "Heritage & Culture",
      tag: "Forest Shiva Shrine",
      description: "A venerated Shiva shrine situated in a quiet forest clearing, drawing pilgrims and nature seekers with its peaceful wooded surroundings.",
      distanceNote: "Can be combined with local valley exploration.",
      bestTime: "Morning hours",
      highlights: ["Sacred forest grove", "Peaceful bells & mantras", "Ancient stone carvings"]
    }
  ]
};
