"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  PartyPopper,
  Briefcase,
  Cake,
  Sparkles,
  Users,
  CheckCircle,
  ArrowRight,
  Calendar,
  Send,
  MessageCircle,
  Clock,
  MapPin,
  Heart,
  Crown,
} from "lucide-react";
import { eventTypes, brandInfo } from "@/lib/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function EventsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Bachelorette Party 🪩",
    date: "",
    guests: "10-15 Guests",
    requirements: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `⚜️ VIP Event Inquiry - Iconic Art Global\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nOccasion: ${formData.eventType}\nTarget Date: ${formData.date}\nGuest Count: ${formData.guests}\nCustom Vision: ${formData.requirements}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-[#F3ECE0] text-[#2A1817]">
      {/* 1. Haute Soirée Hero */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden border-b border-[#EBB4BF]/40">
        <Image
          src="/images/instagram/ig_post_4.webp"
          alt="Iconic Art Global Private Soirée & Creative Party"
          fill
          className="object-cover scale-105"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#200407] via-[#3E000C]/85 to-[#3E000C]/70" />
        <div className="absolute inset-0 bg-pattern opacity-20 pointer-events-none" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-36 pb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4A853]/60 backdrop-blur-md mb-6"
          >
            <span className="text-[#F8DE7E]">🪩</span>
            <span className="editorial-tag text-[10px] text-[#F3ECE0]">
              Private Art Salons &bull; Celebrations &bull; Corporate Retreats
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EBB4BF]" />
            <span className="text-[10px] font-bold text-[#F8DE7E]">
              Bespoke Event Styling
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="editorial-title text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F3ECE0] tracking-tight leading-[1.08] mb-6"
          >
            Unforgettable Celebrations,{" "}
            <span className="block font-serif italic font-normal text-[#F8DE7E]">
              Immortalized in Art.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#EBB4BF] text-base sm:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed"
          >
            From glamorous bachelorette parties 🪩 and high-tea kitty party gatherings
            to executive corporate retreats and bespoke birthday galas — we bring the
            complete luxury art atelier to your venue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#packages"
              className="px-8 py-3.5 rounded-full bg-[#D4A853] hover:bg-[#F8DE7E] text-[#3E000C] font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl hover:scale-105"
            >
              Curated Event Experiences &rarr;
            </a>
            <a
              href="#enquiry"
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F3ECE0] border border-[#EBB4BF]/50 font-bold text-xs uppercase tracking-[0.2em] backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4 text-[#F8DE7E]" />
              <span>Reserve Event Concierge</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Curated Event Packages Grid */}
      <section id="packages" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="editorial-tag text-[10px] text-[#4C1513] font-bold tracking-[0.3em] uppercase inline-flex items-center gap-2 bg-white/80 border border-[#D4A853]/40 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A853]" />
            Bespoke Experiences
          </span>
          <h2 className="editorial-title text-3xl sm:text-5xl font-bold text-[#4C1513] tracking-tight">
            Curated Occasions &amp; Salons
          </h2>
          <p className="mt-3 text-[#525050] text-sm sm:text-base">
            Every occasion is custom designed with thematic art activities, fine materials, personal instruction by Rinki Verma, and framed takeaways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventTypes.map((event) => (
            <motion.div
              key={event.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="luxury-card rounded-[28px] overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E6DCCB]">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#200407]/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-3xl drop-shadow">{event.icon}</span>
                    <span className="candy-badge px-3 py-1 rounded-full text-[9px] shadow">
                      All Supplies Included
                    </span>
                  </div>
                </div>

                <div className="p-6 text-left">
                  <h3 className="font-serif text-2xl font-bold text-[#4C1513] group-hover:text-[#702026] transition-colors">
                    {event.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#525050] leading-relaxed">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-2 bg-[#FAF7F2] p-4 rounded-2xl border border-[#EBB4BF]/30">
                    <span className="editorial-tag text-[9px] text-[#4C1513] block mb-2">
                      Package Signature Features:
                    </span>
                    {event.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#525050]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#D4A853] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/?text=Hello%20Rinki!%20I'm%20planning%20a%20${encodeURIComponent(
                    event.name
                  )}%20and%20would%20love%20to%20check%20availability%20and%20package%20details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#4C1513] hover:bg-[#3E000C] text-white border border-[#D4A853]/40 shadow-md text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group/btn hover:scale-[1.02]"
                >
                  <span>Request Package Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#EBB4BF] group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. VIP Event Concierge Form */}
      <section id="enquiry" className="py-24 bg-[#FAF7F2] border-t border-[#EBB4BF]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="editorial-tag text-[10px] text-[#4C1513] tracking-[0.3em] font-bold uppercase">
              Concierge Booking
            </span>
            <h2 className="editorial-title text-3xl sm:text-4xl font-bold text-[#4C1513] mt-2">
              Plan Your Bespoke Event
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#525050]">
              Tell us about your celebration or corporate offsite. We will tailor a personalized itinerary and quotation within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-white border border-[#D4A853]/40 shadow-xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="editorial-tag text-[10px] text-[#4C1513] block mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alisha Kapoor"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#EBB4BF]/60 text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                />
              </div>

              <div>
                <label className="editorial-tag text-[10px] text-[#4C1513] block mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alisha@example.com"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#EBB4BF]/60 text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                />
              </div>

              <div>
                <label className="editorial-tag text-[10px] text-[#4C1513] block mb-2">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#EBB4BF]/60 text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                />
              </div>

              <div>
                <label className="editorial-tag text-[10px] text-[#4C1513] block mb-2">
                  Occasion Type *
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#EBB4BF]/60 text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                >
                  <option>Bachelorette Party 🪩</option>
                  <option>Corporate Retreat &amp; Team Building</option>
                  <option>High-Tea Kitty Party</option>
                  <option>Birthday Gala (Adults)</option>
                  <option>Kids Birthday Creative Party</option>
                  <option>Private Art Soirée</option>
                  <option>Custom Themed Event</option>
                </select>
              </div>

              <div>
                <label className="editorial-tag text-[10px] text-[#4C1513] block mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#EBB4BF]/60 text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                />
              </div>

              <div>
                <label className="editorial-tag text-[10px] text-[#4C1513] block mb-2">
                  Expected Guest Count
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#EBB4BF]/60 text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                >
                  <option>5 - 10 Guests (Intimate)</option>
                  <option>10 - 20 Guests (Salon)</option>
                  <option>20 - 50 Guests (Party Gala)</option>
                  <option>50+ Guests (Corporate / Large)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="editorial-tag text-[10px] text-[#4C1513] block mb-2">
                Special Vision, Themes or Dietary / Venue Notes
              </label>
              <textarea
                rows={3}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="Share your preferred art medium (Mandala, Lippan, Watercolor), color themes, or any special surprise elements..."
                className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#EBB4BF]/60 text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#4C1513] hover:bg-[#3E000C] text-white border border-[#D4A853]/60 shadow-xl text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <Crown className="w-4 h-4 text-[#F8DE7E]" />
              <span>Submit VIP Event Request</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
