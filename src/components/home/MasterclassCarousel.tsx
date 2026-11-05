"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { workshops } from "@/lib/constants";

interface WorkshopTheme {
  hoverBg: string;
  hoverBorder: string;
  badgeBg: string;
  badgeText: string;
  tag: string;
  btnHoverBg: string;
  btnHoverText: string;
}

// Artist-curated palette identities for each specific workshop (smooth hover morph)
const workshopThemes: Record<string, WorkshopTheme> = {
  w1: {
    // Lippan Art: Delicate Kutch Blush & Rose
    hoverBg: "hover:bg-[#FAF0F3]",
    hoverBorder: "hover:border-[#EBB4BF]",
    badgeBg: "bg-[#EBB4BF]",
    badgeText: "text-[#3E000C]",
    tag: "Kutch Mirror Heritage",
    btnHoverBg: "hover:bg-[#3E000C]",
    btnHoverText: "hover:text-[#F8DE7E]",
  },
  w2: {
    // Mandala: Sacred Indigo & Celestial Geometry
    hoverBg: "hover:bg-[#F3F6FD]",
    hoverBorder: "hover:border-[#BFDBFE]",
    badgeBg: "bg-[#BFDBFE]",
    badgeText: "text-[#1E3A8A]",
    tag: "Sacred Geometry",
    btnHoverBg: "hover:bg-[#1E3A8A]",
    btnHoverText: "hover:text-[#FDE68A]",
  },
  w3: {
    // 3D Texture: Sunlit Citron & Impasto
    hoverBg: "hover:bg-[#FEFCE8]",
    hoverBorder: "hover:border-[#FEF08A]",
    badgeBg: "bg-[#FEF08A]",
    badgeText: "text-[#713F12]",
    tag: "Impasto Canvas Relief",
    btnHoverBg: "hover:bg-[#713F12]",
    btnHoverText: "hover:text-[#FEF08A]",
  },
  w4: {
    // Studio Café: Warm Terracotta & Café Latte
    hoverBg: "hover:bg-[#FAF5EE]",
    hoverBorder: "hover:border-[#E6DCCB]",
    badgeBg: "bg-[#E6DCCB]",
    badgeText: "text-[#4C1513]",
    tag: "Greater Noida & NCR",
    btnHoverBg: "hover:bg-[#4C1513]",
    btnHoverText: "hover:text-[#F8DE7E]",
  },
  w5: {
    // Art Party: Peony Pink Celebrations
    hoverBg: "hover:bg-[#FDF2F7]",
    hoverBorder: "hover:border-[#FBCFE8]",
    badgeBg: "bg-[#FBCFE8]",
    badgeText: "text-[#831843]",
    tag: "Private Atelier Celebration",
    btnHoverBg: "hover:bg-[#831843]",
    btnHoverText: "hover:text-white",
  },
  w6: {
    // 1-on-1 Mentorship: Royal Atelier Champagne Gold
    hoverBg: "hover:bg-[#FCF9EE]",
    hoverBorder: "hover:border-[#FDE68A]",
    badgeBg: "bg-[#FDE68A]",
    badgeText: "text-[#78350F]",
    tag: "Intensive Private Guidance",
    btnHoverBg: "hover:bg-[#3E000C]",
    btnHoverText: "hover:text-[#F8DE7E]",
  },
  w7: {
    // Kids Art: Playful Mint Cream
    hoverBg: "hover:bg-[#F0FDF4]",
    hoverBorder: "hover:border-[#BBF7D0]",
    badgeBg: "bg-[#BBF7D0]",
    badgeText: "text-[#14532D]",
    tag: "Junior Atelier Academy",
    btnHoverBg: "hover:bg-[#14532D]",
    btnHoverText: "hover:text-white",
  },
};

const defaultTheme: WorkshopTheme = {
  hoverBg: "hover:bg-[#FAF0F3]",
  hoverBorder: "hover:border-[#EBB4BF]",
  badgeBg: "bg-[#EBB4BF]",
  badgeText: "text-[#3E000C]",
  tag: "Atelier Masterclass",
  btnHoverBg: "hover:bg-[#3E000C]",
  btnHoverText: "hover:text-[#F8DE7E]",
};

export default function MasterclassCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section
      id="workshops-salon"
      className="bg-[#FAF7F2] py-20 sm:py-28 border-b border-black/[0.06] relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. TOP META & MONUMENTAL SPENCER GABOR-STYLE HEADER
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-2 text-left">
            <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4A853] font-bold">
              ART WORKSHOPS &bull; GREATER NOIDA &amp; ONLINE
            </p>

            <h2 className="font-sans font-black tracking-[-0.015em] text-4xl sm:text-6xl md:text-7xl uppercase text-[#3E000C] leading-[1.05]">
              Curated Workshops
            </h2>

            <p className="text-xs sm:text-sm text-[#525050] max-w-xl font-normal leading-relaxed pt-1">
              Hands-on creative sessions personally led by Master Educator Rinki Verma.
              Every patron walks away holding a fully finished, framed museum-grade original.
            </p>
          </div>

          {/* Spencer Gabor-Style Drag Controllers */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#525050] hidden sm:inline mr-2">
              Drag or Scroll Track
            </span>
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full bg-white border border-black/[0.08] text-[#3E000C] flex items-center justify-center hover:bg-[#3E000C] hover:text-[#F8DE7E] hover:scale-105 transition-all shadow-xs cursor-pointer"
              aria-label="Previous workshops"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full bg-white border border-black/[0.08] text-[#3E000C] flex items-center justify-center hover:bg-[#3E000C] hover:text-[#F8DE7E] hover:scale-105 transition-all shadow-xs cursor-pointer"
              aria-label="Next workshops"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. SPENCER GABOR-STYLE SQUIRCLE WORKSHOP CAROUSEL TRACK
            ========================================================================= */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-12 pt-3 px-2 -mx-2 hide-scrollbar scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {workshops.map((workshop) => {
            const theme = workshopThemes[workshop.id] || defaultTheme;

            return (
              <motion.div
                key={workshop.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`w-[310px] sm:w-[350px] md:w-[370px] shrink-0 snap-start rounded-[16px] sm:rounded-[18px] bg-white ${theme.hoverBg} p-3.5 sm:p-4 border border-black/[0.08] ${theme.hoverBorder} transition-all duration-500 ease-out flex flex-col justify-between group cursor-pointer shadow-none hover:shadow-xl`}
              >
                <div>
                  {/* 1. Inset Image Window with clean gap from outer card border */}
                  <div className="relative aspect-[4/3] w-full rounded-[12px] sm:rounded-[14px] overflow-hidden bg-black/5 mb-4">
                    <Image
                      src={workshop.image}
                      alt={workshop.title}
                      fill
                      className="object-cover group-hover:scale-106 transition-transform duration-700 pointer-events-none"
                      unoptimized
                    />

                    {/* Discreet Atelier Micro Tag */}
                    <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[9.5px] font-bold tracking-[0.18em] uppercase text-[#3E000C] shadow-xs">
                      {workshop.duration} &bull; {workshop.format}
                    </div>
                  </div>

                  {/* 2. Discipline Tag & Transparent Price Header */}
                  <div className="flex items-center justify-between mb-1.5 px-0.5">
                    <span className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#D4A853]">
                      {workshop.disciplineTag || theme.tag}
                    </span>
                    <span className="text-sm font-serif font-bold text-[#3E000C]">
                      {workshop.price}
                    </span>
                  </div>

                  {/* 3. Full Graceful Title */}
                  <Link href={`/workshops#${workshop.id}`}>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3E000C] group-hover:text-[#702026] transition-colors leading-snug mb-2 min-h-[52px] flex items-center">
                      {workshop.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#525050] line-clamp-2 font-normal leading-relaxed mb-4">
                    {workshop.description}
                  </p>
                </div>

                {/* 4. Sleek Editorial Bottom Bar */}
                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                  <span className="text-[11px] text-[#4C1513]/60 font-medium">
                    All materials provided
                  </span>
                  <Link
                    href={`/workshops#${workshop.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#3E000C] group-hover:text-[#D4A853] transition-colors py-1"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================================
            3. BOTTOM ALL WORKSHOPS PILL
            ========================================================================= */}
        <div className="mt-12 text-center">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#3E000C] hover:bg-[#200407] text-[#F8DE7E] text-xs font-bold uppercase tracking-[0.22em] shadow-xl hover:scale-105 transition-all"
          >
            <span>Explore All 10+ Art Workshops</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
