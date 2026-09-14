// Official 11 FAQs, Pets Policy & Booking/Cancellation Rules
// Single Source of Truth based on Handover Document

export const faqsAndPolicies = {
  // Complete 11 Official FAQ Questions
  faqs: [
    {
      id: 1,
      question: "Is electricity available at the resort?",
      answer: "Yes, electricity is available across all cottages, the wooden log house, dining facilities, and common grounds. However, please note that power backup (generator or heavy inverter) is currently unavailable. When brief rural outages occur, we provide rechargeable emergency lanterns."
    },
    {
      id: 2,
      question: "Is there Wi-Fi or internet access on the property?",
      answer: "Wi-Fi is currently unavailable at the resort. We encourage our guests to embrace this as a peaceful off-screen retreat—a chance to disconnect from notifications and enjoy the sounds of the sal trees, the river, and starry night skies."
    },
    {
      id: 3,
      question: "What is the mobile phone network coverage like?",
      answer: "Mobile signal varies by service provider. In general, BSNL and Airtel receive moderate connectivity for basic phone calls in most open areas of the property, while mobile 4G/5G data coverage can be intermittent. Guests are advised to complete any essential online work prior to arrival."
    },
    {
      id: 4,
      question: "Is hot water available for bathing?",
      answer: "Yes, hot water is available on request. Our staff will gladly supply freshly heated water to your cottage or washroom promptly upon your notice."
    },
    {
      id: 5,
      question: "Are the meals purely vegetarian or is non-vegetarian food served?",
      answer: "All our standard overnight packages include pure vegetarian meals by default (breakfast, lunch, and dinner). However, non-vegetarian preparations (chicken, seasonal fish) are available as official add-on supplements (₹150 per person per meal, or ₹300 per person for lunch+dinner during a cottage stay). Mutton and prawns can also be arranged upon separate advance quotation."
    },
    {
      id: 6,
      question: "What are the standard check-in and check-out timings?",
      answer: "For Cottage and Wooden Log House stays, check-in is at 9:00 AM and check-out is at 9:00 AM the following morning (a full 24-hour cycle). For Wilderness Camping, check-in is at 4:00 PM and check-out is at 9:00 AM the following morning."
    },
    {
      id: 7,
      question: "Are pets allowed at Saranda Safari Resort?",
      answer: "Yes, pets are welcome at the resort with prior notice. To maintain safety and tranquility for wildlife, fellow guests, and village surroundings, pets must be kept on a leash in common grounds and outdoor dining areas."
    },
    {
      id: 8,
      question: "Can four guests stay in one of the Red-and-White Cottages?",
      answer: "No. The four Red-and-White Cottages are built for a strict maximum capacity of 3 guests each (1 to 3 adults). If your party has 4 adults, you may book our Wooden Log House or Other cottage (both built for up to 4 adults at ₹6,600/night), or book two separate Red-and-White Cottages."
    },

    {
      id: 9,
      question: "How do I confirm my reservation?",
      answer: "Reservations are confirmed upon receipt of a 50% advance deposit. The remaining 50% balance is payable upon arrival at check-in (or prior to the commencement of an event in the case of private venue bookings)."
    },
    {
      id: 10,
      question: "What happens if I need to reschedule or cancel my stay?",
      answer: "Advance deposits are non-refundable upon guest cancellation. However, if you provide at least 7 days advance notice before your scheduled check-in, we offer a one-time date reschedule valid for up to 3 months from the original date (subject to unit availability and any seasonal tariff differences). Cancellations made with less than 7 days notice or no-shows result in full forfeiture of the advance."
    },
    {
      id: 11,
      question: "What happens if the resort cancels my booking due to unforeseen circumstances?",
      answer: "In the rare and unforeseen event that the resort must cancel your booking (such as extreme weather, natural emergency, or unforeseen administrative closure), a 100% full refund of all amounts paid will be returned to the guest immediately."
    }
  ],

  // Official Pets Policy
  petsPolicy: {
    title: "Pets Policy",
    rules: [
      "Pets are welcome with mandatory prior notice at the time of reservation.",
      "Pets must remain on a leash or under direct supervision in all common grounds, riverside lawns, and dining areas.",
      "Owners are responsible for their pets' bedding, food, and cleaning up after them.",
      "Please ensure pets do not chase local wildlife, orchard birds, or village livestock.",
      "Any damage to property or linens caused by a pet will be billed to the guest at actual replacement cost."
    ]
  },

  // Complete Booking & Cancellation Terms
  bookingPolicies: {
    title: "Booking, Payment & Cancellation Policies",
    terms: [
      {
        term: "50% Advance Requirement",
        detail: "A 50% advance deposit is mandatory to secure and confirm any room, camping, or package reservation."
      },
      {
        term: "Balance Payment",
        detail: "The remaining 50% balance must be settled at check-in for stays, or before the start of proceedings for private event venue bookings."
      },
      {
        term: "Guest Cancellation (Non-Refundable)",
        detail: "Advance deposits are non-refundable in the event of guest cancellation."
      },
      {
        term: "One-Time Reschedule (7+ Days Notice)",
        detail: "With at least 7 full days advance written notice prior to check-in, guests may request a one-time date reschedule valid within 3 months of the original reservation date, subject to room availability. If the new dates fall under a higher seasonal tariff, the price difference will be payable."
      },
      {
        term: "Late Cancellation & No-Show",
        detail: "Cancellations submitted with less than 7 days notice, or failure to check in on the reserved date (no-show), will result in full forfeiture of the 50% advance."
      },
      {
        term: "Resort Cancellation Protection (100% Full Refund)",
        detail: "If the resort is compelled to cancel a confirmed reservation due to natural eventualities, regional road blockages, or emergency operational factors, a 100% full refund will be issued to the guest without deduction."
      },
      {
        term: "Tax Policy Notice",
        detail: "No tax is added to the published package tariffs. All supplementary options (non-veg meals, bonfire add-ons, extra hours) are itemized transparently. Note: The business is never described as tax-exempt; tariffs simply include all baseline local dues."
      }
    ]
  }
};
