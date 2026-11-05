"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Palette,
  CalendarCheck,
  Sparkles,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  MessageCircle,
  ShieldCheck,
  Award,
} from "lucide-react";
import { workshopCategories, workshops, brandInfo } from "@/lib/constants";

const pillars = [
  {
    roman: "I",
    title: "Sacred Intention & Materials",
    description:
      "All masterclasses provide fine-grade archival pigments, handcrafted mirrors, artist-grade canvases, and specialized tools curated personally by Rinki Verma.",
  },
  {
    roman: "II",
    title: "Meditative Step-by-Step Guidance",
    description:
      "Whether you are an absolute beginner or an experienced creator, each technique is broken down into serene, intuitive strokes that inspire confidence.",
  },
  {
    roman: "III",
    title: "Museum-Grade Masterpiece to Keep",
    description:
      "You conclude the session holding a fully finished, framed art piece worthy of exhibition in your living space or gifting to someone treasured.",
  },
];

export default function WorkshopsPage() {
  const [selectedFormat, setSelectedFormat] = useState<string>("all");

  const filteredWorkshops =
    selectedFormat === "all"
      ? workshops
      : workshops.filter(
          (w) =>
            w.categorySlug.toLowerCase() === selectedFormat.toLowerCase() ||
            w.format.toLowerCase().includes(selectedFormat.toLowerCase())
        );

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#3E000C] select-none">
      
      {/* =========================================================================
          1. SPENCER GABOR-STYLE MASTERCLASS HERO
          ========================================================================= */}
      <section className="relative pt-36 sm:pt-44 pb-16 sm:pb-24 border-b border-black/[0.06] text-center px-4 overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-tr from-[#EBB4BF]/20 via-[#D4A853]/15 to-[#A2C0DD]/15 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-[10.5px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4A853] font-bold">
            GREATER NOIDA, NEW DELHI &bull; 40+ SESSIONS HOSTED &bull; CURATED BY RINKI VERMA
          </p>

          <h1 className="font-sans font-black tracking-[-0.04em] text-5xl sm:text-7xl md:text-8xl uppercase text-[#3E000C] leading-none">
            Atelier Masterclasses
          </h1>

          <p className="text-sm sm:text-base text-[#525050] max-w-2xl mx-auto font-normal leading-relaxed pt-2">
            Immersive hands-on masterclasses spanning sacred geometry mandalas, authentic Lippan mirror relief,
            miniature watercolors, and 3D textured canvases. Personally guided by Rinki Verma.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#curriculum"
              className="px-7 py-3 rounded-full bg-[#3E000C] hover:bg-[#200407] text-[#F8DE7E] text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all"
            >
              Explore Curriculum &darr;
            </a>

            <a
              href="https://wa.me/?text=Hello%20Rinki!%20I'm%20interested%20in%20reserving%20a%20seat%20for%20an%20Iconic%20Art%20Global%20masterclass.%20Could%20you%20share%20upcoming%20dates%20and%20details?"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3E000C] border border-black/[0.08] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#D4A853]" />
              <span>Inquire Upcoming Dates</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ATELIER DISCIPLINE FILTER BAR & WORKSHOPS GRID
          ========================================================================= */}
      <section id="curriculum" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D4A853] font-bold mb-2">
            CURATED DISCIPLINES &bull; SELECT FORMAT
          </p>

          <h2 className="font-sans font-black tracking-[-0.04em] text-3xl sm:text-5xl uppercase text-[#3E000C] leading-none">
            Discover Your Masterclass
          </h2>

          {/* Minimalist Filter Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Masterclasses" },
              { id: "adults", label: "Adult Atelier" },
              { id: "kids", label: "Young Prodigies" },
              { id: "offline", label: "In-Studio Offline" },
              { id: "online", label: "Virtual Global" },
              { id: "private", label: "Private 1-on-1" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFormat(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedFormat === tab.id
                    ? "bg-[#3E000C] text-[#F8DE7E] shadow-sm"
                    : "bg-white text-[#525050] hover:text-[#3E000C] border border-black/[0.06]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masterclasses Grid in Spencer Gabor Squircle Style */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {filteredWorkshops.map((workshop) => (
            <motion.div
              key={workshop.id}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[32px] sm:rounded-[36px] bg-white p-3.5 sm:p-4 shadow-[0_16px_40px_rgba(40,10,15,0.08)] hover:shadow-[0_28px_65px_rgba(40,10,15,0.20)] border border-black/[0.04] transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                {/* Artwork Window */}
                <div className="relative h-[220px] sm:h-[250px] w-full rounded-[24px] sm:rounded-[28px] overflow-hidden bg-black/5">
                  <Image
                    src={workshop.image}
                    alt={workshop.title}
                    fill
                    className="object-cover group-hover:scale-106 transition-transform duration-700 pointer-events-none"
                    unoptimized
                  />

                  {/* Micro Category & Format Badges */}
                  <div className="absolute top-3 left-3 z-10 flex gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[8.5px] font-bold uppercase tracking-widest text-[#3E000C] shadow-xs">
                      {workshop.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#3E000C]/85 backdrop-blur-md text-[8.5px] font-bold uppercase tracking-wider text-[#F8DE7E] shadow-xs">
                      {workshop.format}
                    </span>
                  </div>

                  {/* Price Tag Pill */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-white font-serif font-bold text-xs text-[#3E000C] shadow-sm border border-black/[0.06]">
                      {workshop.price}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-4 pb-2 px-1 text-left space-y-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3E000C] tracking-tight leading-snug">
                    {workshop.title}
                  </h3>

                  <p className="text-xs text-[#525050] leading-relaxed line-clamp-2">
                    {workshop.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="flex items-center gap-4 text-[11px] font-medium text-[#525050] pt-2 border-t border-black/[0.05]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D4A853]" />
                      <span>{workshop.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#D4A853]" />
                      <span>{workshop.ageGroup}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-3 space-y-1 bg-[#FAF7F2] p-3 rounded-2xl border border-black/[0.04]">
                    <span className="text-[9px] font-mono tracking-widest uppercase text-[#D4A853] font-bold block mb-1">
                      Atelier Inclusions:
                    </span>
                    {workshop.highlights.slice(0, 3).map((h, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#525050]">
                        <CheckCircle className="w-3 h-3 text-[#D4A853] shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `⚜️ Masterclass Reservation - Iconic Art Global\n\nI would like to reserve a seat for: ${workshop.title} (${workshop.price})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-[#FAF7F2] hover:bg-[#3E000C] text-[#3E000C] hover:text-[#F8DE7E] border border-black/[0.08] text-[10.5px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group/btn shadow-xs text-center"
                >
                  <span>Reserve Seat &bull; {workshop.price}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* =========================================================================
          3. THE THREE PILLARS (Spencer Gabor Style)
          ========================================================================= */}
      <section className="py-20 border-t border-black/[0.06] bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D4A853] font-bold mb-2">
              THE ATELIER STANDARD
            </p>
            <h2 className="font-sans font-black tracking-[-0.04em] text-3xl sm:text-5xl uppercase text-[#3E000C] leading-none">
              Why Patrons Choose Iconic Art Global
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.roman}
                className="rounded-[32px] bg-white p-7 shadow-[0_12px_36px_rgba(40,10,15,0.06)] border border-black/[0.04] text-left space-y-3"
              >
                <span className="font-serif font-black text-2xl text-[#D4A853]">
                  {pillar.roman}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#3E000C]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#525050] font-normal leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}