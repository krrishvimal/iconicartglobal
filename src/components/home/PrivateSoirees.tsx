"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, MessageCircle, Users } from "lucide-react";

const soirees = [
  {
    title: "Bachelorette & Bridal Art Parties",
    tagline: "Canvas Painting, Gold Leaf & Keepsakes",
    description: "An unforgettable private celebration where the bride and guests hand-paint customized mandala frames or miniature canvases together.",
    image: "/images/events/event_bridal_party.webp",
    badge: "Bachelorette & Bridal",
    guests: "8 - 25 Guests",
    colorBg: "bg-[#FAF2F4]",
  },
  {
    title: "Corporate Team Events & Retreats",
    tagline: "Relaxing Art Therapy & Team Bonding",
    description: "Guided hands-on creative wellness workshops for corporate teams, designed to unlock creativity, relieve stress, and boost team bonding.",
    image: "/images/events/event_corporate_workshop.webp",
    badge: "Corporate Teams",
    guests: "15 - 80+ Guests",
    colorBg: "bg-[#EFF5FA]",
  },
  {
    title: "Private 1-on-1 Art Mentorship",
    tagline: "Personalized In-Studio Guidance",
    description: "An exclusive one-on-one personalized session with Rinki Verma. Master traditional Lippan mirror crafts, compass mandala geometry, and textured canvas.",
    image: "/images/events/event_mentorship_guidance.webp",
    badge: "1-on-1 Mentorship",
    guests: "Private 1-on-1",
    colorBg: "bg-[#FEFCE8]",
  },
];

export default function PrivateSoirees() {
  return (
    <section className="bg-[#FAF7F2] py-20 sm:py-28 border-b border-black/[0.06] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. TOP META & MONUMENTAL SPENCER GABOR-STYLE HEADER
            ========================================================================= */}
        <div className="text-left mb-12 sm:mb-16">
          <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4A853] font-bold">
            PRIVATE EXPERIENCES &bull; GREATER NOIDA &bull; PAN-INDIA
          </p>

          <h2 className="font-sans font-black tracking-[-0.015em] text-4xl sm:text-6xl md:text-7xl uppercase text-[#3E000C] leading-[1.05] mt-2">
            Private Events <span className="inline-block mx-1 sm:mx-2 font-medium">&amp;</span> Art Parties
          </h2>

          <p className="text-xs sm:text-sm text-[#525050] max-w-xl font-normal leading-relaxed pt-2">
            Elevate your birthday party, kitty party, bridal shower, or corporate gathering with an immersive hands-on art experience.
            All canvases, easels, paints, and frames provided.
          </p>
        </div>

        {/* =========================================================================
            2. SPENCER GABOR-STYLE 3-COLUMN SQUIRCLE EVENT CARDS
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {soirees.map((soiree) => (
            <motion.div
              key={soiree.title}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-[20px] sm:rounded-[24px] ${soiree.colorBg} p-3.5 sm:p-4 shadow-[0_16px_40px_rgba(40,10,15,0.08)] hover:shadow-[0_28px_60px_rgba(40,10,15,0.18)] border border-black/[0.04] transition-all duration-500 flex flex-col justify-between group`}
            >
              <div>
                {/* Event Image Window */}
                <div className="relative h-[220px] sm:h-[240px] w-full rounded-[14px] sm:rounded-[18px] overflow-hidden bg-black/5">
                  <Image
                    src={soiree.image}
                    alt={soiree.title}
                    fill
                    className="object-cover group-hover:scale-106 transition-transform duration-700 pointer-events-none"
                    unoptimized
                  />

                  {/* Micro Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[8.5px] font-bold uppercase tracking-widest text-[#3E000C] shadow-xs">
                      {soiree.badge}
                    </span>
                  </div>

                  {/* Guest Count Badge */}
                  <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white">
                    <Users className="w-3 h-3 text-[#F8DE7E]" />
                    <span>{soiree.guests}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-4 pb-2 px-1 text-left space-y-1.5">
                  <p className="text-[9px] font-mono tracking-widest uppercase text-[#D4A853] font-bold">
                    {soiree.tagline}
                  </p>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3E000C] tracking-tight leading-snug">
                    {soiree.title}
                  </h3>

                  <p className="text-xs text-[#525050] font-normal leading-relaxed pt-1">
                    {soiree.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `⚜️ Private Event Inquiry - Iconic Art Global\n\nI would like to inquire about: ${soiree.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-white hover:bg-[#3E000C] text-[#3E000C] hover:text-[#F8DE7E] border border-black/[0.08] text-[10.5px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xs text-center"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#D4A853]" />
                  <span>Reserve Event Dates</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}