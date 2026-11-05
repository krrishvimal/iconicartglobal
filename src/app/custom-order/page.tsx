"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Upload,
  CheckCircle2,
  Send,
  MessageCircle,
  Palette,
  Heart,
  Clock,
  ShieldCheck,
  Crown,
  ArrowRight,
} from "lucide-react";
import { brandInfo } from "@/lib/constants";
import { adminStore } from "@/lib/adminStore";

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Mandala Art",
    size: "12 × 12 inches",
    occasion: "Home Sanctuary / Personal Commission",
    budget: "₹2,000 - ₹5,000",
    deadline: "",
    description: "",
    hasFile: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.addEnquiry({
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      type: "Custom Order",
      subject: `Bespoke ${formData.category} (${formData.size})`,
      category: formData.category,
      budget: formData.budget,
      deadline: formData.deadline || "Flexible",
      message: `${formData.description} | Occasion: ${formData.occasion} | Attached Ref: ${formData.hasFile ? "Yes" : "None"}`,
      status: "New",
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F3ECE0] text-[#2A1817]">
      {/* 1. Haute Couture Bespoke Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-[#EBB4BF]/40">
        <div className="absolute inset-0">
          <Image
            src="/images/instagram/lippan_ganesh.jpg"
            alt="Iconic Art Global Bespoke Commission Masterpiece"
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
            Haute Couture Commissions &bull; Curated by Rinki Verma
          </span>

          <h1 className="editorial-title text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F3ECE0] tracking-tight mb-6 leading-[1.08]">
            Your Sacred Vision,
            <span className="block font-serif italic font-normal text-[#F8DE7E]">
              Patiently Handcrafted into Reality.
            </span>
          </h1>

          <p className="text-[#EBB4BF] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Seeking a specific geometric dimension, bespoke color harmony, or a commemorative
            masterpiece for your residence? Rinki Verma personally crafts one-of-a-kind commissions.
          </p>
        </div>
      </section>

      {/* 2. Main Studio Container */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: 3 Steps Process & Concierge Assurance */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="editorial-tag text-[10px] text-[#4C1513] font-bold tracking-[0.28em] uppercase block mb-1">
                The Atelier Protocol
              </span>
              <h2 className="editorial-title text-3xl font-bold text-[#4C1513]">
                From Initial Idea to Signed Masterpiece
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  roman: "01",
                  title: "Vision Brief & Material Sourcing",
                  desc: "Share your desired palette, sacred geometry, size, or reference image. We source archival grade pigments, mirrors, and canvas.",
                },
                {
                  roman: "02",
                  title: "Artisanal Proposal & Sketches",
                  desc: "Rinki reviews your brief and shares layout concepts and precise commission pricing within 24 hours.",
                },
                {
                  roman: "03",
                  title: "Dedicated Crafting & Wax-Sealed Delivery",
                  desc: "Once commissioned, your piece is patiently handcrafted, signed, certified, and dispatched in insured archival packaging pan-India.",
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-[#D4A853]/30 shadow-sm"
                >
                  <span className="editorial-tag text-[10px] text-[#D4A853] font-bold block mb-1">
                    Step {step.roman}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#4C1513]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#525050] mt-1.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 rounded-3xl bg-[#3E000C] text-[#F3ECE0] border border-[#D4A853]/40 shadow-lg text-center">
              <span className="text-xl mb-2 block">⚜️</span>
              <p className="font-serif text-base font-bold text-[#F8DE7E] mb-1">
                Need an Urgent Custom Commission?
              </p>
              <p className="text-xs text-[#EBB4BF] mb-4">
                Chat directly with Rinki Verma on WhatsApp for instant consultation.
              </p>
              <a
                href={brandInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 bg-gradient-to-r from-[#D4A853] to-[#F8DE7E] hover:from-[#C5A059] hover:to-[#E6C85E] text-[#3E000C] text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-all inline-flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-[#3E000C]" />
                <span>Open VIP WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Right Column: Commission Brief Form */}
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
                    Bespoke Commission Brief Received
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525050] max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <strong className="text-[#4C1513]">{formData.name}</strong>.
                    Founder Rinki Verma will review your vision for a{" "}
                    <strong className="text-[#4C1513]">{formData.category}</strong> and connect with you at{" "}
                    <strong className="text-[#4C1513]">{formData.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#4C1513] text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#3E000C] transition-colors"
                  >
                    Submit Another Brief &rarr;
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="editorial-tag text-[10px] text-[#4C1513] font-bold tracking-[0.28em] uppercase block mb-1">
                      Private Atelier Intake
                    </span>
                    <h3 className="editorial-title text-2xl font-bold text-[#4C1513]">
                      Describe Your Commission
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                        Client Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Radhika Singhal"
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
                        placeholder="radhika@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                      />
                    </div>

                    <div>
                      <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                      />
                    </div>

                    <div>
                      <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                        Art Discipline *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                      >
                        <option>Sacred Mandala Art</option>
                        <option>Mud &amp; Mirror Lippan Art</option>
                        <option>Botanical &amp; Landscape Watercolor</option>
                        <option>Digital Portrait Commission</option>
                        <option>Customized Photo Frame</option>
                        <option>Everlasting Satin Flower Bouquet</option>
                        <option>Seashell Art &amp; Decorative Sculptures</option>
                      </select>
                    </div>

                    <div>
                      <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                        Scale / Dimensions
                      </label>
                      <input
                        type="text"
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        placeholder="e.g. 18 × 18 inches, or wall scale"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                      />
                    </div>

                    <div>
                      <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                      >
                        <option>₹1,500 - ₹3,000</option>
                        <option>₹3,000 - ₹7,000</option>
                        <option>₹7,000 - ₹15,000</option>
                        <option>₹15,000+ (Gallery / Statement)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                      Target Completion Date
                    </label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                    />
                  </div>

                  <div>
                    <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                      Your Vision, Color Palette &amp; Personal Notes *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Share colors, symbols, sacred patterns, names, personal quotes, or any specific emotion you want this artwork to evoke..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                    />
                  </div>

                  <div>
                    <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                      Reference Photo / Sketch (Optional)
                    </label>
                    <div className="border border-dashed border-[#D4A853]/50 rounded-2xl p-4 bg-[#FAF7F2] text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={() => setFormData({ ...formData, hasFile: true })}
                        className="text-xs text-[#525050] cursor-pointer"
                      />
                      <p className="text-[10px] text-[#525050] mt-1">
                        Upload room photo, color sample, or inspiration sketch
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#4C1513] hover:bg-[#3E000C] text-white border border-[#D4A853]/60 shadow-xl text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <Crown className="w-4 h-4 text-[#F8DE7E]" />
                    <span>Submit Bespoke Commission Brief</span>
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
