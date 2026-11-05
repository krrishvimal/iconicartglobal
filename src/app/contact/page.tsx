"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  MessageCircle,
  Send,
  Sparkles,
  Phone,
  Clock,
  CheckCircle2,
  Calendar,
  Gift,
  ShoppingBag,
  ShieldCheck,
  Crown,
} from "lucide-react";
import { Instagram, Youtube } from "@/components/ui/Icons";
import { brandInfo } from "@/lib/constants";
import { adminStore } from "@/lib/adminStore";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Masterclass Booking Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.addEnquiry({
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      type: formData.subject.toLowerCase().includes("workshop") ? "Workshop Booking" : "General",
      subject: formData.subject,
      message: formData.message,
      status: "New",
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F3ECE0] text-[#2A1817]">
      {/* 1. Haute Atelier Contact Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-[#EBB4BF]/40">
        <div className="absolute inset-0">
          <Image
            src="/images/instagram/upits_exhibition.jpg"
            alt="Iconic Art Global Atelier & Concierge"
            fill
            className="object-cover scale-105"
            unoptimized
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#200407] via-[#3E000C]/90 to-[#3E000C]/75" />
        <div className="absolute inset-0 bg-pattern opacity-20 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4A853]/60 backdrop-blur-md text-[10px] uppercase font-bold tracking-[0.25em] text-[#F3ECE0] mb-6">
            <span className="text-[#F8DE7E]">⚜️</span>
            Private Concierge &bull; Iconic Art Global
          </span>

          <h1 className="editorial-title text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F3ECE0] tracking-tight mb-6 leading-[1.08]">
            Connect with the Atelier,
            <span className="block font-serif italic font-normal text-[#F8DE7E]">
              Let Us Shape Something Singular.
            </span>
          </h1>

          <p className="text-[#EBB4BF] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Inquiring about upcoming masterclass schedules, private corporate retreats,
            bespoke commissions, or press interviews? We welcome your correspondence.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="editorial-tag text-[10px] text-[#4C1513] font-bold tracking-[0.28em] uppercase block mb-1">
                Direct Channels
              </span>
              <h2 className="editorial-title text-3xl font-bold text-[#4C1513]">
                Attentive Atelier Support
              </h2>
              <p className="text-xs sm:text-sm text-[#525050] mt-2 leading-relaxed">
                Reach out directly to founder Rinki Verma. All private and corporate inquiries are answered with personal attention within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <a
                href={`mailto:${brandInfo.email}`}
                className="flex items-center gap-4 p-5 rounded-3xl bg-white border border-[#D4A853]/30 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#EBB4BF] flex items-center justify-center text-[#4C1513] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-[#4C1513]" />
                </div>
                <div>
                  <p className="editorial-tag text-[9px] text-[#525050]">Official Correspondence</p>
                  <p className="font-serif text-sm font-bold text-[#4C1513] group-hover:text-[#702026] transition-colors">
                    {brandInfo.email}
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={brandInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-3xl bg-white border border-[#D4A853]/30 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#EBB4BF] flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5 fill-[#25D366] text-[#25D366]" />
                </div>
                <div>
                  <p className="editorial-tag text-[9px] text-[#525050]">VIP WhatsApp Concierge</p>
                  <p className="font-serif text-sm font-bold text-[#4C1513] group-hover:text-[#702026] transition-colors">
                    Direct Chat with Rinki Verma
                  </p>
                </div>
              </a>

              {/* Social Channels */}
              <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#EBB4BF]/50">
                <span className="editorial-tag text-[9px] text-[#4C1513] block mb-3">
                  Atelier Social Galleries
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={brandInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-2xl bg-white border border-[#EBB4BF] text-[#4C1513] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#4C1513] hover:text-white transition-all shadow-sm"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={brandInfo.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-2xl bg-white border border-[#EBB4BF] text-[#4C1513] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#4C1513] hover:text-white transition-all shadow-sm"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Hours & Assurance */}
            <div className="p-6 rounded-3xl bg-white border border-[#D4A853]/30 flex items-center gap-4 text-xs text-[#525050]">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#D4A853] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#D4A853]" />
              </div>
              <div>
                <p className="font-bold text-[#4C1513] text-xs uppercase tracking-wider">
                  Live Response Guarantee
                </p>
                <p className="text-[11px] text-[#525050]">
                  Mon – Sat &bull; 10:00 AM – 7:00 PM IST &bull; Inquiries processed daily
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-[#D4A853]/40 shadow-xl text-left">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#4C1513] border border-[#D4A853] flex items-center justify-center mx-auto mb-4 shadow">
                    <CheckCircle2 className="w-8 h-8 text-[#D4A853]" />
                  </div>
                  <h3 className="editorial-title text-2xl font-bold text-[#4C1513] mb-2">
                    Message Delivered to Atelier
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525050] max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <strong className="text-[#4C1513]">{formData.name}</strong>.
                    Our studio team has received your message regarding{" "}
                    <strong className="text-[#4C1513]">{formData.subject}</strong> and will reply to{" "}
                    <strong className="text-[#4C1513]">{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#4C1513] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#3E000C] transition-colors"
                  >
                    Send Another Message &rarr;
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="editorial-tag text-[10px] text-[#4C1513] font-bold tracking-[0.28em] uppercase block mb-1">
                      Direct Correspondence
                    </span>
                    <h3 className="editorial-title text-2xl font-bold text-[#4C1513]">
                      Send an Inquiry
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ananya Mehra"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                      />
                    </div>

                    <div>
                      <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ananya@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                      />
                    </div>

                    <div>
                      <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                      />
                    </div>

                    <div>
                      <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                        Topic of Inquiry *
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                      >
                        <option>Masterclass Booking Inquiry</option>
                        <option>Private Soirée / Bachelorette Party</option>
                        <option>Corporate Offsite / Team Workshop</option>
                        <option>Bespoke Art Commission</option>
                        <option>Artwork Order Status</option>
                        <option>Exhibition &amp; Press Collaboration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding your request, dates, or ideas..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#4C1513] hover:bg-[#3E000C] text-white border border-[#D4A853]/60 shadow-xl text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4 text-[#F8DE7E]" />
                    <span>Transmit Message to Atelier</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
