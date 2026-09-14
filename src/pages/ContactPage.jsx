import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, MapPin, Clock, ShieldCheck, Heart, AlertTriangle, Calendar } from 'lucide-react';
import { Section, Container, Heading, Button, Card, Badge } from '../components/ui/Primitives';
import { Accordion } from '../components/ui/Accordion';
import { resortInfo } from '../content/resortInfo';
import { faqsAndPolicies } from '../content/faqsAndPolicies';

export function ContactPage({ onOpenBooking }) {
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-[#0E261C] text-[#F9F6F0] py-16 md:py-24 border-b border-[#C5A059]/30">
        <Container className="text-center max-w-4xl">
          <Badge variant="gold" className="mb-4">Helpdesk & Booking Policies</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Contact & Guest Information
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#DFCA95] leading-relaxed max-w-2xl mx-auto">
            Get in touch with our resort team in Village Nimture, review verified FAQs, and understand our booking terms.
          </p>
        </Container>
      </section>

      {/* Contact Channels Grid */}
      <Section background="cream">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <Heading
                level={2}
                badge="Official Desk"
                align="left"
                subheading="Direct communication lines"
              >
                Reach Out to Us
              </Heading>

              <div className="space-y-4">
                <Card className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#143628] text-[#C5A059] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#143628]">Postal Address</h4>
                    <p className="text-xs sm:text-sm text-[#143628]/80 mt-1 leading-relaxed">
                      {resortInfo.address.fullAddress}
                    </p>
                  </div>
                </Card>

                <Card className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#143628]">WhatsApp & Mobile</h4>
                    <p className="text-xs sm:text-sm text-[#143628]/80 mt-1">
                      {resortInfo.contact.phone}
                    </p>
                    <a 
                      href={`https://wa.me/${resortInfo.contact.whatsappNumberRaw}?text=${encodeURIComponent("Hello Saranda Safari Resort, I have a query regarding stay bookings.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-800 font-semibold hover:underline block mt-1"
                    >
                      Chat Directly on WhatsApp →
                    </a>
                  </div>
                </Card>

                <Card className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#C25E3E] text-white flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#143628]">Desk Hours</h4>
                    <p className="text-xs sm:text-sm text-[#143628]/80 mt-1">
                      {resortInfo.contact.deskHours}
                    </p>
                    <span className="text-[11px] text-[#143628]/70 block mt-0.5">
                      Messages received after hours will be answered the following morning.
                    </span>
                  </div>
                </Card>
              </div>

              <div className="pt-2">
                <Button
                  variant="terracotta"
                  size="md"
                  onClick={onOpenBooking}
                  className="w-full"
                  icon={Calendar}
                >
                  Check Availability & Calculate Tariffs
                </Button>
              </div>
            </div>

            {/* Right: Message Form */}
            <div className="lg:col-span-7">
              <Card className="p-8 border-[#C5A059]/40">
                <h3 className="font-serif text-2xl font-bold text-[#143628] mb-2">Send an Enquiry Message</h3>
                <p className="text-xs text-[#143628]/75 mb-6">
                  Have specific queries regarding private stays, group meals, or seasonal accessibility? Leave your details below:
                </p>

                {submitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 text-center space-y-2">
                    <ShieldCheck className="w-8 h-8 text-emerald-700 mx-auto" />
                    <h4 className="font-serif font-bold text-lg">Thank You for Your Enquiry</h4>
                    <p className="text-xs">Your message has been logged. For urgent assistance, please reach us directly on WhatsApp.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Your Name</label>
                        <input
                          required
                          type="text"
                          value={formState.name}
                          onChange={e => setFormState({ ...formState, name: e.target.value })}
                          className="w-full bg-[#F9F6F0] border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Phone / WhatsApp</label>
                        <input
                          required
                          type="tel"
                          value={formState.phone}
                          onChange={e => setFormState({ ...formState, phone: e.target.value })}
                          className="w-full bg-[#F9F6F0] border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-[#F9F6F0] border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-semibold text-[#143628] mb-1">Message / Requirements</label>
                      <textarea
                        rows={4}
                        required
                        value={formState.message}
                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell us your target dates, number of guests, or specific questions..."
                        className="w-full bg-[#F9F6F0] border border-[#E8DFCE] rounded-md px-3 py-2 text-sm text-[#143628]"
                      />
                    </div>

                    <Button variant="forest" size="md" type="submit" className="w-full">
                      Submit Enquiry
                    </Button>
                  </form>
                )}
              </Card>
            </div>

          </div>
        </Container>
      </Section>

      {/* The 11 Official FAQs Section */}
      <Section id="faqs" background="cream-deep">
        <Container className="max-w-4xl">
          <Heading
            level={2}
            badge="Frequently Asked Questions"
            align="center"
            subheading="Clear answers regarding electricity, networks, food, and timings"
          >
            Essential Guest FAQs (11 Verified Items)
          </Heading>

          <Card className="p-8 md:p-10 border-[#C5A059]/40 bg-white">
            <Accordion items={faqsAndPolicies.faqs} />
          </Card>
        </Container>
      </Section>

      {/* Official Pets Policy */}
      <Section background="cream">
        <Container className="max-w-4xl">
          <Heading
            level={2}
            badge="Pet Friendly"
            align="center"
            subheading="Welcoming four-legged family members with sensible guidelines"
          >
            {faqsAndPolicies.petsPolicy.title}
          </Heading>

          <Card className="p-8 border-[#C5A059]/40 space-y-3">
            <div className="flex items-center gap-2 text-[#C25E3E] mb-2">
              <Heart className="w-5 h-5 fill-current" />
              <span className="font-serif font-bold text-lg text-[#143628]">Responsible Pet Stays</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#143628]/85">
              {faqsAndPolicies.petsPolicy.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0 mt-2" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </Section>

      {/* Complete Booking & Cancellation Policies (Including 100% Resort Refund Clause) */}
      <Section background="cream-deep">
        <Container className="max-w-4xl">
          <Heading
            level={2}
            badge="Booking Terms"
            align="center"
            subheading="50% advance to confirm, reschedule rules, and resort refund protection"
          >
            {faqsAndPolicies.bookingPolicies.title}
          </Heading>

          <div className="space-y-4">
            {faqsAndPolicies.bookingPolicies.terms.map((term, idx) => {
              const isRefundClause = term.term.includes('100% Full Refund');
              return (
                <Card 
                  key={idx} 
                  className={`p-6 ${
                    isRefundClause 
                      ? 'border-emerald-500 bg-emerald-50/50' 
                      : 'border-[#E8DFCE] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-serif font-bold text-base ${
                      isRefundClause ? 'text-emerald-900' : 'text-[#143628]'
                    }`}>
                      {term.term}
                    </h4>
                    {isRefundClause && (
                      <Badge variant="forest">Guaranteed Guest Protection</Badge>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#143628]/85 leading-relaxed">
                    {term.detail}
                  </p>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 text-center text-xs text-[#143628]/70">
            "{resortInfo.taxDisplayNote}" • Established 1998 in Village Nimture, Bolani, Keonjhar, Odisha.
          </div>
        </Container>
      </Section>
    </div>
  );
}
