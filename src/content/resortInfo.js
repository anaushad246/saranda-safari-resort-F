// Official Resort Profile & Metadata
// Single Source of Truth based on Handover Document

export const resortInfo = {
  name: "SARANDA SAFARI RESORT",
  established: 1998,
  tagline: "Nature • Wildlife • Tranquility",
  subtext: "A little closer to nature. A little further from the everyday.",
  preBookingNotice: "Welcoming guests from October 2026 — pre-book your stay now.",
  heroDescription: "Unwind among trees, open lawns and peaceful surroundings at Saranda Safari Resort in Nimture, Bolani, Odisha. Enjoy a cottage stay, settle into our wooden log house, or spend a night camping beneath the open sky.",
  
  address: {
    village: "Village Nimture",
    postOffice: "P.O. Bolani",
    district: "District Keonjhar",
    state: "Odisha",
    pincode: "758037",
    fullAddress: "Village Nimture, P.O. Bolani, District Keonjhar, Odisha – 758037",
    landmark: "Nestled along the Karo River, bordered by the lush Sal forest hills of Jharkhand and Odisha",
  },

  contact: {
    phone: "+91 94370 XXXXX", // Official handover placeholder
    whatsapp: "+91 9899373222",
    whatsappNumberRaw: "9899373222",
    email: "info@sarandasafariresort.com",
    deskHours: "8:00 AM – 8:00 PM IST",
  },

  // Transparent truth-in-marketing audit
  amenitiesStatus: {
    electricity: {
      available: true,
      title: "Electricity Available",
      desc: "Grid power is connected across cottages, log house, and dining grounds."
    },
    hotWater: {
      available: true,
      title: "Hot Water on Request",
      desc: "Fresh hot water is promptly arranged by our staff upon request."
    },
    bathrooms: {
      available: true,
      title: "Attached Bathrooms in Cottages",
      desc: "All cottages and the wooden log house feature private attached western bathrooms. Camping has dedicated clean shared washroom blocks."
    },
    parking: {
      available: true,
      title: "Secure On-Site Parking",
      desc: "Free and spacious parking available directly on the resort grounds."
    },
    airConditioning: {
      available: false,
      title: "No Air Conditioning",
      desc: "Rooms are naturally ventilated with ceiling fans, shaded by sal trees and fresh river breezes."
    },
    wifi: {
      available: false,
      title: "No Wi-Fi (Off-Screen Sanctuary)",
      desc: "Wi-Fi is currently unavailable, allowing guests to truly disconnect and immerse in nature."
    },
    powerBackup: {
      available: false,
      title: "No Power Backup",
      desc: "Power backup is currently unavailable. We embrace the gentle pace and starlit nights of the forest."
    }
  },

  photoDisclaimer: "Photographed before renovation; updated interiors coming soon.",
  taxDisplayNote: "No tax is added to published tariffs. All extras are clearly separated.",
};
