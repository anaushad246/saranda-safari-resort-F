// Getting Here, Transport Nodes & Pickup Request Details
// Single Source of Truth based on Handover Document
// Note: Per handover instructions, road distances from airports/Kolkata are NOT published.

export const gettingHereContent = {
  propertyLocation: {
    village: "Village Nimture",
    po: "P.O. Bolani",
    district: "District Keonjhar",
    state: "Odisha",
    pin: "758037",
    fullAddress: "Village Nimture, P.O. Bolani, District Keonjhar, Odisha – 758037",
    geography: "Border country of District Keonjhar, nestled along the Karo River."
  },

  // The 3 Verified Railheads (Distances strictly from handover)
  railheads: [
    {
      station: "Barbil Railway Station (BBL)",
      distance: "15 km",
      travelTime: "Approx. 25–30 minutes by road",
      connectivity: "An arrival option from Howrah/Kolkata and Tata/Jamshedpur, depending on available trains.",
      recommendedFor: "Nearest railhead for travellers arriving from Kolkata or coastal Odisha."
    },
    {
      station: "Banspani Railway Station (BSPX)",
      distance: "22 km",
      travelTime: "Approx. 35–40 minutes by road",
      connectivity: "An arrival option from Bhubaneswar and other parts of Odisha.",
      recommendedFor: "Convenient alternative for central and eastern rail routes."
    },
    {
      station: "Rourkela Junction (ROU)",
      distance: "102 km",
      travelTime: "Approx. 2.5 to 3 hours by road",
      connectivity: "Alternative connection followed by a road transfer",
      recommendedFor: "Best connected major terminal for nationwide visitors arriving by long-distance trains."
    },
    {
      station: "Tatanagar",
      distance: "150 km",
      travelTime: "Approx. 2.5 to 3 hours by road",
      connectivity: "Alternative connection followed by a road transfer",
      recommendedFor: "Best connected major terminal for nationwide visitors arriving by long-distance trains."
    }
  ],

  // The 3 Verified Airports (Road distances omitted per handover rule)
  airports: [
    {
      name: "Ranchi (Birsa Munda Airport - IXR)",
      connectivity: "Connecting via NH-20 corridor",
      flights: "Daily direct flights from Delhi, Mumbai, Kolkata, Bengaluru, Hyderabad, and Patna."
    },
    {
      name: "Jharsuguda (Veer Surendra Sai Airport - JRG)",
      connectivity: "Connecting via western Odisha corridor",
      flights: "Direct regional connections from Kolkata, Delhi, Bhubaneswar, and Bengaluru."
    },
    {
      name: "Bhubaneswar (Biju Patnaik International Airport - BBI)",
      connectivity: "Connecting via NH-520 / rail link via Barbil",
      flights: "Extensive national and international air connectivity across all major airlines."
    }
  ],


  // Bus and Road Directives (strictly from handover)
  busRoutes: {
    bhubaneswar: "From Bhubaneswar, take an evening bus to Bolani and arrange pickup for the remaining journey.",
    kolkata: "From Kolkata, check evening buses from Babughat to Barbil, with an onward transfer arranged in advance.",
    note: "Bolani is approximately 5 km from the resort. Arrive in your own vehicle or request a pickup in advance."
  },

  // Road Driving Approaches
  roadDirections: [
    {
      from: "From Rourkela (102 km)",
      route: "Take SH-10 toward Rajgangpur/Bisra -> proceed via Manoharpur / Bolani approach road toward Village Nimture."
    },
    {
      from: "From Keonjhar (Approx. 85 km)",
      route: "Follow NH-520 through Rimuli -> Barbil -> take the Bolani town bypass to Village Nimture."
    },
    {
      from: "From Jamshedpur / Chaibasa",
      route: "Head south via Chaibasa on NH-20 toward Noamundi -> Barbil -> proceed to Village Nimture along the Karo River."
    }
  ],

  pickupServiceNotice: "Private station and airport pickup and drop can be arranged with trusted local drivers upon advance request. Fares vary depending on vehicle type and current fuel tariffs. Fares are confirmed via quotation."
};
