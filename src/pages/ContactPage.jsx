import React, { useState } from 'react';
import { 
  Phone, MessageSquare, Mail, MapPin, Clock, ShieldCheck, Heart, 
  AlertTriangle, Calendar, HelpCircle, FileText, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { Container, Button, Card, Badge } from '../components/ui/Primitives';
import { Accordion } from '../components/ui/Accordion';
import { resortInfo } from '../content/resortInfo';
import { faqsAndPolicies } from '../content/faqsAndPolicies';

export function ContactPage({ onOpenBooking }) {
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('faqs'); // 'faqs' | 'policies' | 'pets'

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen">
      {/* Compact & Clean Header */}
      <section className="bg-[#0E261C] text-[#F9F6F0] py-8 sm:py-10 border-b border-[#C5A059]/30">
        <Container className="max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              {/* <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#DFCA95]">
                  Official Helpdesk & Guest Info
                </span>
              </div> */}
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Contact Us
              </h1>
              <p className="text-xs sm:text-sm text-[#DFCA95]/90 mt-1">
                 Desk Hours: {resortInfo.contact.deskHours}
              </p>
            </div>

            {/* Quick Action Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0">
              <a
                href={`tel:${resortInfo.contact.phoneRaw}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#DFCA95]" />
                <span>Call Desk</span>
              </a>

              <a
                href={`https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent("Hello Saranda Safari Resort, I have an inquiry regarding stay bookings.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-semibold border border-emerald-400/40 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-200" />
                <span>WhatsApp Us</span>
              </a>

              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#C25E3E] hover:bg-[#a94f33] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Check Availability</span>
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Handy Content Area */}
      <main className="py-8 sm:py-10">
        <Container className="max-w-6xl space-y-8">
          
          {/* Top 2-Column: Quick Contact Cards & Compact Message Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 5 Cols: Direct Contact Details */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Card 1: Phone & WhatsApp */}
              <Card className="p-4 sm:p-5 border-[#C5A059]/30 bg-white shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-800 text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-sm text-[#143628]">Phone & WhatsApp</h3>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">Active</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-[#143628] mt-1">
                      {resortInfo.contact.phone}
                    </p>
                    <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-100">
                      <a 
                        href={`https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent("Hello Saranda Safari Resort, I have an inquiry regarding stay bookings.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
                      >
                        Chat on WhatsApp &rarr;
                      </a>
                      <span className="text-gray-300">|</span>
                      <a 
                        href={`tel:${resortInfo.contact.phoneRaw}`}
                        className="text-xs font-semibold text-[#143628] hover:text-[#C5A059] flex items-center gap-1"
                      >
                        Call Now &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Card 2: Desk Hours & Policy */}
              <Card className="p-4 sm:p-5 border-[#C5A059]/30 bg-white shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#143628] text-[#C5A059] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#143628]">Reception Desk Hours</h3>
                    <p className="text-xs sm:text-sm font-medium text-[#143628]/90 mt-0.5">
                      {resortInfo.contact.deskHours}
                    </p>
                    <p className="text-[11px] text-[#143628]/70 mt-1 leading-snug">
                      Messages received after 7:00 PM will be answered promptly the following morning at 9:00 AM.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Card 3: Address & Location */}
              <Card className="p-4 sm:p-5 border-[#C5A059]/30 bg-white shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#C25E3E] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#143628]">Resort Location</h3>
                    <p className="text-xs sm:text-sm text-[#143628]/85 mt-0.5 leading-relaxed">
                      {resortInfo.address.fullAddress}
                    </p>
                    <span className="inline-block text-[11px] font-medium text-[#8F6C27] mt-1 bg-[#F4EFE6] px-2 py-0.5 rounded">
                      Karo Riverfront • Near Bolani Railhead
                    </span>
                  </div>
                </div>
              </Card>

              {/* Quick Quote Banner */}
              <div className="bg-[#143628] rounded-xl p-4 text-white flex items-center justify-between gap-3 shadow-xs">
                <div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#DFCA95]">Planning an October 2026 Stay?</h4>
                  <p className="text-[11px] text-white/80 mt-0.5">Calculate instant prices & pre-book your dates.</p>
                </div>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-3 py-1.5 rounded-lg bg-[#C25E3E] hover:bg-[#a94f33] text-white text-xs font-semibold shrink-0 cursor-pointer transition-colors"
                >
                  Quote & Book
                </button>
              </div>

            </div>

            {/* Right 7 Cols: Handy Enquiry Form */}
            <div className="lg:col-span-7">
              <Card className="p-5 sm:p-6 border-[#C5A059]/40 bg-white shadow-xs">
                <div className="border-b border-[#E8DFCE] pb-3 mb-4">
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#143628]">
                    Send a Quick Message
                  </h2>
                  <p className="text-xs text-[#143628]/70 mt-0.5">
                    Have questions about stays, camping, group food supplements, or seasonal access?
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                    <h3 className="font-serif font-bold text-base">Thank You! Your Enquiry is Logged</h3>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Our team in Bolani will get back to you shortly. For immediate response during desk hours, feel free to drop a WhatsApp message.
                    </p>
                    <button
                      type="button"
                      onClick={() => { setSubmitted(false); setFormState({ name: '', phone: '', email: '', message: '' }); }}
                      className="mt-3 text-xs font-semibold text-emerald-900 underline hover:text-emerald-700 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#143628] mb-1">
                          Your Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. Rajesh Sharma"
                          value={formState.name}
                          onChange={e => setFormState({ ...formState, name: e.target.value })}
                          className="w-full bg-[#FAF7F2] border border-[#E8DFCE] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#143628] focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#143628] mb-1">
                          Phone / WhatsApp <span className="text-red-600">*</span>
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="e.g. +91 98765 43210"
                          value={formState.phone}
                          onChange={e => setFormState({ ...formState, phone: e.target.value })}
                          className="w-full bg-[#FAF7F2] border border-[#E8DFCE] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#143628] focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#143628] mb-1">
                        Email Address <span className="text-[#143628]/50 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="rajesh@example.com"
                        value={formState.email}
                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFCE] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#143628] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#143628] mb-1">
                        Message / Stay Details <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Dates, number of guests (max 25 overnight), food preferences, or specific questions..."
                        value={formState.message}
                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFCE] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#143628] focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-[#143628]/60">
                        ⚡ Quick response guaranteed
                      </span>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-lg bg-[#143628] hover:bg-[#1f4a38] text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                      >
                        Submit Enquiry
                      </button>
                    </div>
                  </form>
                )}
              </Card>
            </div>

          </div>

          {/* Bottom Section: Handy Segmented Tabbed Guest Info Hub */}
          <div className="pt-2">
            <div className="bg-white rounded-2xl border border-[#E8DFCE] shadow-xs p-5 sm:p-7">
              
              {/* Header & Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E8DFCE] pb-5">
                <div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#143628]">
                    Guest Information Hub
                  </h2>
                  <p className="text-xs text-[#143628]/70 mt-0.5">
                    Verified answers on amenities, refund protection, and pets guidelines.
                  </p>
                </div>

                {/* Segmented Tab Controls */}
                <div className="inline-flex rounded-xl bg-[#FAF7F2] p-1 border border-[#E8DFCE] self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab('faqs')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'faqs'
                        ? 'bg-[#143628] text-white shadow-xs'
                        : 'text-[#143628]/75 hover:text-[#143628]'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>16 FAQs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('policies')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'policies'
                        ? 'bg-[#143628] text-white shadow-xs'
                        : 'text-[#143628]/75 hover:text-[#143628]'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Booking & Refund</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('pets')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'pets'
                        ? 'bg-[#143628] text-white shadow-xs'
                        : 'text-[#143628]/75 hover:text-[#143628]'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Pets Policy</span>
                  </button>
                </div>
              </div>

              {/* Tab 1: 16 FAQs */}
              {activeTab === 'faqs' && (
                <div className="pt-5">
                  <div className="flex items-center justify-between mb-3 text-xs text-[#8F6C27] font-semibold uppercase tracking-wider">
                    <span>Essential Guest Questions (11 Verified Items)</span>
                    <span className="text-[#143628]/60 normal-case font-normal">Click any question to view answer</span>
                  </div>
                  <Accordion items={faqsAndPolicies.faqs} />
                </div>
              )}

              {/* Tab 2: Booking & Cancellation Policies */}
              {activeTab === 'policies' && (
                <div className="pt-5 space-y-4">
                  {/* 100% Full Refund Guarantee Highlight */}
                  <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 border border-emerald-300">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif font-bold text-sm sm:text-base text-emerald-950">
                            100% Full Refund Guarantee
                          </h3>
                          <span className="text-[10px] uppercase font-bold bg-emerald-700 text-white px-2 py-0.5 rounded-full">
                            Resort Promise
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-900 mt-1 leading-relaxed">
                          In the rare event that Saranda Safari Resort must cancel a booking due to unforeseen circumstances, road washouts, extreme weather, or operational issues, a <strong>100% full refund</strong> of all amounts paid is guaranteed.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remaining Terms in 2-Column Clean Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                    {faqsAndPolicies.bookingPolicies.terms
                      .filter(t => !t.term.includes('100% Full Refund'))
                      .map((term, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl border border-[#E8DFCE] bg-[#FAF7F2]">
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-[#143628] flex items-center gap-1.5">
                            <ChevronRight className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                            <span>{term.term}</span>
                          </h4>
                          <p className="text-xs text-[#143628]/80 mt-1 pl-5 leading-relaxed">
                            {term.detail}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Pets Policy */}
              {activeTab === 'pets' && (
                <div className="pt-5 space-y-4">
                  <div className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/40">
                    <div className="flex items-center gap-2 text-[#C25E3E] mb-3">
                      <Heart className="w-5 h-5 fill-current" />
                      <h3 className="font-serif font-bold text-base text-[#143628]">
                        Responsible Pet Stays at Saranda
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#143628]/80 leading-relaxed mb-3">
                      We warmly welcome well-behaved pets to enjoy the open lawns and outdoor surroundings under guest supervision:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#143628]/85">
                      {faqsAndPolicies.petsPolicy.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0 mt-1.5" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Notice footnote */}
              <div className="mt-6 pt-4 border-t border-[#E8DFCE] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#143628]/65 gap-2 text-center sm:text-left">
                <span>{resortInfo.taxDisplayNote}</span>
                <span>Established 1998 • Village Nimture, Bolani, Keonjhar, Odisha</span>
              </div>

            </div>
          </div>

        </Container>
      </main>
    </div>
  );
}
