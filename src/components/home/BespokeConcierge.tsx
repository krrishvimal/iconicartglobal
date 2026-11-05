"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Users,
  Calendar,
  User,
  Phone,
  Mail,
  LayoutGrid,
  ChevronDown,
  PenLine,
  ArrowRight,
  Lock,
  Gem,
  Handshake,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function BespokeConcierge() {
  const [category, setCategory] = useState<"custom" | "workshop" | "corporate">("custom");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interestDetail, setInterestDetail] = useState("");
  const [vision, setVision] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const interestOptions = {
    custom: [
      "Lippan Mirror & Mud Art Masterpiece",
      "Sacred Dot Mandala Art",
      "3D Textured Impasto Canvas",
      "Framed Silhouette / Baroque Decor",
      "Custom Watercolor Floral Painting",
      "Other Bespoke Art Commission",
    ],
    workshop: [
      "Lippan Mud & Mirror Workshop",
      "Mandala Art & Sacred Geometry",
      "3D Textured Canvas Workshop",
      "Weekend Art Cafe Session",
      "1-on-1 Private Mentorship",
      "Kids Creative Art Workshop",
    ],
    corporate: [
      "Corporate Creative Wellness Workshop",
      "Executive Team Building Retreat",
      "Bachelorette Art Party",
      "Private Birthday / Kitty Celebration",
      "Brand Activation / Art Experience",
      "Custom Group Event",
    ],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const categoryLabel =
      category === "custom"
        ? "Custom Artwork"
        : category === "workshop"
        ? "Art Workshop"
        : "Corporate Event";

    const waText = `Hello Rinki! I'm submitting an inquiry from Iconic Art Global:

• Category: ${categoryLabel}
• Name: ${name}
• Contact: ${phone}
${email ? `• Email: ${email}\n` : ""}${
      interestDetail ? `• Interested In: ${interestDetail}\n` : ""
    }${vision ? `• Vision / Note: ${vision}\n` : ""}
Looking forward to hearing from you!`;

    const waUrl = `https://wa.me/?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <section
      id="custom-order-section"
      className="bg-[#EFE6DE] py-20 sm:py-28 relative overflow-hidden select-none border-b border-black/[0.06]"
    >
      {/* =========================================================================
          1. "BURGUNDY CURVED PAINT STROKE" (TOP-LEFT ONLY)
          Pure authentic impasto oil/acrylic curve framing the atelier canvas
          ========================================================================= */}
      <div className="absolute -top-3 -left-4 sm:-top-6 sm:-left-8 md:-top-8 md:-left-12 w-[240px] sm:w-[340px] md:w-[420px] lg:w-[480px] h-auto aspect-[1536/1024] pointer-events-none select-none z-0">
        <Image
          src="/images/burgundy_paint_stroke.webp"
          alt="Burgundy Curved Paint Stroke"
          fill
          className="object-contain object-top-left pointer-events-none drop-shadow-[0_8px_20px_rgba(72,11,21,0.08)]"
          priority
          unoptimized
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            2. HEADER (Matches Reference Mockup Exactly)
            ========================================================================= */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Eyebrow flanked with subtle horizontal dashes */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-8 sm:w-12 bg-[#8B7D76]/40" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.28em] uppercase text-[#786C65] font-semibold">
              LET&apos;S CREATE TOGETHER
            </span>
            <span className="h-px w-8 sm:w-12 bg-[#8B7D76]/40" />
          </div>

          {/* Main Display Serif Title */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[62px] text-[#480B15] tracking-tight leading-[1.08] mb-3">
            Connect with the Atelier
          </h2>

          {/* Italic Subtitle */}
          <p className="font-serif italic text-sm sm:text-base text-[#6E5D57] max-w-xl mx-auto leading-relaxed">
            Whether it&apos;s a custom artwork, a workshop, or an artistic event &mdash;
            <br className="hidden sm:inline" /> share your vision with us, and we&apos;ll bring it to life.
          </p>
        </div>

        {/* =========================================================================
            3. MAIN COMPOSITION: SCULPTURE WITH ARCH CURVE + BADGES & INQUIRY CARD
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Classical Atelier Still Life with Arch Curve + 3 Service Badges */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 sm:gap-6 lg:gap-8 lg:pr-6 relative">
            
            {/* The Classical Marble Bust Still Life with Arch Curve at the End */}
            <div className="relative w-[230px] sm:w-[260px] md:w-[285px] h-[370px] sm:h-[430px] md:h-[470px] shrink-0">
              <Image
                src="/images/atelier_sculpture_arch.webp"
                alt="Classical Atelier Still Life with Marble Bust and Artist Brushes"
                fill
                className="object-contain object-bottom pointer-events-none drop-shadow-[0_12px_28px_rgba(72,11,21,0.08)]"
                priority
                unoptimized
              />
            </div>

            {/* 3 Vertically Stacked Feature Badges */}
            <div className="flex-1 space-y-7 pb-2 w-full sm:w-auto text-left">
              
              {/* Badge 1: Custom Art */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-11 h-11 rounded-full border border-[#8B7D76]/35 bg-[#FAF4ED] flex items-center justify-center text-[#480B15] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Palette className="w-5 h-5 stroke-[1.6]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#480B15] leading-tight">
                    Custom Art
                  </h3>
                  <p className="text-xs text-[#786C65] mt-0.5 leading-relaxed">
                    Commission a personalised piece
                  </p>
                </div>
              </div>

              {/* Badge 2: Art Workshops */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-11 h-11 rounded-full border border-[#8B7D76]/35 bg-[#FAF4ED] flex items-center justify-center text-[#480B15] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5 stroke-[1.6]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#480B15] leading-tight">
                    Art Workshops
                  </h3>
                  <p className="text-xs text-[#786C65] mt-0.5 leading-relaxed">
                    Hands-on creative experiences
                  </p>
                </div>
              </div>

              {/* Badge 3: Corporate Events */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-11 h-11 rounded-full border border-[#8B7D76]/35 bg-[#FAF4ED] flex items-center justify-center text-[#480B15] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5 stroke-[1.6]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#480B15] leading-tight">
                    Corporate Events
                  </h3>
                  <p className="text-xs text-[#786C65] mt-0.5 leading-relaxed">
                    Inspire your team through art
                  </p>
                </div>
              </div>

            </div>

            {/* Subtle editorial vertical hairline divider separating left content from right card */}
            <div className="hidden lg:block absolute right-0 top-6 bottom-6 w-px bg-[#8B7D76]/20" />
          </div>

          {/* RIGHT COLUMN: Floating Card (Matches Reference Mockup Exactly) */}
          <div className="lg:col-span-6">
            <div className="rounded-[28px] sm:rounded-[34px] bg-[#FAF3EC]/95 backdrop-blur-xl p-6 sm:p-9 border border-[#E4D5C7] shadow-[0_18px_50px_rgba(72,11,21,0.08)] text-left relative">
              
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#FAF0F3] text-[#480B15] flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-8 h-8 text-[#D4A853]" />
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#480B15]">
                      Thank You, {name}!
                    </h3>

                    <p className="text-xs sm:text-sm text-[#786C65] max-w-sm mx-auto leading-relaxed">
                      Your inquiry has been sent. Artist Rinki Verma will review your details
                      and connect personally on <strong className="text-[#480B15]">{phone}</strong>.
                    </p>

                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setName("");
                          setPhone("");
                          setEmail("");
                          setVision("");
                          setInterestDetail("");
                        }}
                        className="px-6 py-2.5 rounded-full bg-[#EFE6DE] hover:bg-[#480B15] text-[#480B15] hover:text-[#FAF3EC] border border-[#E4D5C7] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Header: TELL US ABOUT YOUR IDEA + Horizontal Hairline */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[10px] sm:text-[10.5px] uppercase font-bold tracking-[0.24em] text-[#786C65] shrink-0">
                        TELL US ABOUT YOUR IDEA
                      </span>
                      <div className="h-px bg-[#8B7D76]/25 flex-1" />
                    </div>

                    {/* Top 3 Category Filter Pills */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pb-1">
                      {/* Pill 1: Custom Artwork */}
                      <button
                        type="button"
                        onClick={() => {
                          setCategory("custom");
                          setInterestDetail("");
                        }}
                        className={`py-2.5 px-2 rounded-full text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          category === "custom"
                            ? "bg-[#480B15] text-[#FAF3EC] shadow-sm"
                            : "bg-[#F3E9DF] text-[#480B15] hover:bg-[#EBDDCF] border border-black/[0.04]"
                        }`}
                      >
                        <Palette className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Custom Artwork</span>
                      </button>

                      {/* Pill 2: Art Workshop */}
                      <button
                        type="button"
                        onClick={() => {
                          setCategory("workshop");
                          setInterestDetail("");
                        }}
                        className={`py-2.5 px-2 rounded-full text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          category === "workshop"
                            ? "bg-[#480B15] text-[#FAF3EC] shadow-sm"
                            : "bg-[#F3E9DF] text-[#480B15] hover:bg-[#EBDDCF] border border-black/[0.04]"
                        }`}
                      >
                        <Users className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Art Workshop</span>
                      </button>

                      {/* Pill 3: Corporate Event */}
                      <button
                        type="button"
                        onClick={() => {
                          setCategory("corporate");
                          setInterestDetail("");
                        }}
                        className={`py-2.5 px-2 rounded-full text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          category === "corporate"
                            ? "bg-[#480B15] text-[#FAF3EC] shadow-sm"
                            : "bg-[#F3E9DF] text-[#480B15] hover:bg-[#EBDDCF] border border-black/[0.04]"
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Corporate Event</span>
                      </button>
                    </div>

                    {/* Row 1: Your Name & Contact Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Name Field */}
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8B7D76] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name *"
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F6EDE4] border border-[#E2D2C3] focus:border-[#480B15] focus:bg-white text-xs text-[#480B15] placeholder:text-[#786C65] outline-none transition-all"
                        />
                      </div>

                      {/* Contact Number Field */}
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#8B7D76] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Contact Number *"
                          className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F6EDE4] border border-[#E2D2C3] focus:border-[#480B15] focus:bg-white text-xs text-[#480B15] placeholder:text-[#786C65] outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email Address (Optional) */}
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8B7D76] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address (Optional)"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F6EDE4] border border-[#E2D2C3] focus:border-[#480B15] focus:bg-white text-xs text-[#480B15] placeholder:text-[#786C65] outline-none transition-all"
                      />
                    </div>

                    {/* Row 3: What are you interested in? (Custom Dropdown) */}
                    <div className="relative">
                      <LayoutGrid className="w-4 h-4 text-[#8B7D76] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={interestDetail}
                        onChange={(e) => setInterestDetail(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#F6EDE4] border border-[#E2D2C3] focus:border-[#480B15] focus:bg-white text-xs text-[#480B15] outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">What are you interested in?</option>
                        {interestOptions[category].map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-[#480B15]">
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#8B7D76] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Row 4: Tell us more about your vision... (Textarea) */}
                    <div className="relative">
                      <PenLine className="w-4 h-4 text-[#8B7D76] absolute left-3.5 top-3.5 pointer-events-none" />
                      <textarea
                        rows={3}
                        value={vision}
                        onChange={(e) => setVision(e.target.value)}
                        placeholder="Tell us more about your vision..."
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F6EDE4] border border-[#E2D2C3] focus:border-[#480B15] focus:bg-white text-xs text-[#480B15] placeholder:text-[#786C65] outline-none transition-all resize-none leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#480B15] via-[#54121F] to-[#38070F] hover:from-[#35050D] hover:to-[#28040A] text-[#FAF3EC] font-serif text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Send Inquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Security Disclaimer */}
                    <div className="pt-1 flex items-center justify-center gap-1.5 text-[10.5px] text-[#786C65]">
                      <Lock className="w-3 h-3 text-[#786C65]" />
                      <span>Your details are safe with us</span>
                    </div>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* =========================================================================
            4. BOTTOM TRUST STRIP (3 Pillars from Reference Mockup)
            ========================================================================= */}
        <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-[#8B7D76]/25 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 text-left">
          
          {/* Pillar 1: Premium Quality */}
          <div className="flex items-center gap-3.5 sm:px-4">
            <Gem className="w-7 h-7 text-[#480B15] shrink-0 stroke-[1.6]" />
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#480B15] leading-tight">
                Premium Quality
              </h4>
              <p className="text-xs text-[#786C65] mt-0.5 leading-relaxed">
                Art with purpose
              </p>
            </div>
          </div>

          {/* Pillar 2: Personalised Approach */}
          <div className="flex items-center gap-3.5 sm:px-6 md:border-x md:border-[#8B7D76]/25">
            <Handshake className="w-7 h-7 text-[#480B15] shrink-0 stroke-[1.6]" />
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#480B15] leading-tight">
                Personalised Approach
              </h4>
              <p className="text-xs text-[#786C65] mt-0.5 leading-relaxed">
                Designed around you
              </p>
            </div>
          </div>

          {/* Pillar 3: Trusted by Leading Brands */}
          <div className="flex items-center gap-3.5 sm:px-6">
            <Star className="w-7 h-7 text-[#480B15] shrink-0 stroke-[1.6]" />
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#480B15] leading-tight">
                Trusted by Leading Brands
              </h4>
              <p className="text-xs text-[#786C65] mt-0.5 leading-relaxed">
                Art for a greater impact
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
