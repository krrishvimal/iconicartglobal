"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Award, ShieldCheck, Feather, MessageCircle } from "lucide-react";

export default function VelvetManifesto() {
  return (
    <section className="bg-[#FAF7F2] pt-16 sm:pt-20 pb-12 sm:pb-16 relative overflow-hidden border-b border-black/[0.06] select-none">
      
      {/* Background Subtle Radial Accent */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#EBB4BF]/15 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. TOP META & MONUMENTAL SPENCER GABOR-STYLE HEADER
            ========================================================================= */}
        <div className="text-left mb-12 sm:mb-16">
          <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4A853] font-bold">
            THE ARTIST &bull; ATELIER PHILOSOPHY
          </p>

          <h2 className="font-artist italic text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-[#3E000C] tracking-tight leading-[1.08] mt-2">
            Where Art Meets <span className="font-serif italic text-[#D4A853]">Devotion</span>
          </h2>
        </div>

        {/* =========================================================================
            2. SPENCER GABOR-STYLE ASYMMETRICAL EDITORIAL SPREAD
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Modern Squircle Portrait Card (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto max-w-sm sm:max-w-md rounded-[34px] sm:rounded-[40px] bg-white p-3.5 sm:p-4 shadow-[0_24px_55px_rgba(40,10,15,0.12)] border border-black/[0.04] group"
            >
              {/* Squircle Image Container */}
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-[26px] sm:rounded-[32px] overflow-hidden bg-[#FAF7F2]">
                <Image
                  src="/images/artist.webp"
                  alt="Rinki Verma - Lead Artist & Founder of Iconic Art Global"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-top group-hover:scale-104 transition-transform duration-700 pointer-events-none"
                  priority
                />
                
                {/* Micro Verified Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest text-[#3E000C] shadow-xs">
                    Curated by Rinki Verma
                  </span>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/85 via-black/35 to-transparent text-left text-white pointer-events-none">
                  <p className="text-[9.5px] font-mono tracking-widest uppercase text-[#F8DE7E] font-semibold">
                    Mandala Artist &bull; Educator Since 2018
                  </p>
                  <h3 className="font-serif text-2xl font-bold tracking-tight text-white mt-0.5">
                    Rinki Verma
                  </h3>
                  <p className="text-xs text-[#EBB4BF] mt-1 font-light">
                    800+ Guided Students &bull; 40+ Workshops Worldwide
                  </p>
                </div>
              </div>

              {/* Bottom Micro Footer on Card */}
              <div className="pt-3 pb-1 px-2 flex items-center justify-between text-xs text-[#525050]">
                <span className="font-mono tracking-widest uppercase text-[9.5px] text-[#D4A853] font-bold">
                  FOUNDER &bull; ICONIC ART GLOBAL
                </span>
                <span className="text-[11px] font-serif font-bold text-[#3E000C]">
                  Fine Arts &bull; Mandalas
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Manifesto Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Bold Quote */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4A853] font-bold">
                The Artist&apos;s Voice
              </span>

              <p className="text-2xl sm:text-3xl font-serif text-[#3E000C] leading-snug font-bold border-l-2 border-[#D4A853] pl-6 py-1">
                &ldquo;Art has never been just a hobby for me. It is a part of who I am—turning a childhood love for colours into an unforgettable creative journey.&rdquo;
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#525050] font-normal leading-relaxed">
              Before founding Iconic Art Global, <strong>Rinki Verma</strong> was the dedicated student finishing drawing books in a week, entering every competition, and choosing Fine Arts in school because no other path called to her. What began as a childhood fascination with colours soon grew into a lifelong devotion to sacred mandala geometry and tactile mixed mediums.
            </p>

            <p className="text-sm sm:text-base text-[#525050] font-normal leading-relaxed">
              Today, she has guided over <strong>800+ participants</strong> through <strong>40+ workshops</strong> across India and internationally. Having collaborated with leading creative learning platforms like <em>Moj &amp; Seekho</em>, her mission is simple yet resolute: to create beginner-friendly, meditative spaces where everyone leaves with a gallery-worthy piece they can proudly cherish.
            </p>

            {/* Spencer Gabor-Style Metric Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-black/[0.04] shadow-xs text-left">
                <p className="text-2xl sm:text-3xl font-sans font-black text-[#3E000C]">800+</p>
                <p className="text-[10px] font-mono tracking-wider uppercase text-[#525050] mt-1 font-semibold">
                  Participants Guided
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/[0.04] shadow-xs text-left">
                <p className="text-2xl sm:text-3xl font-sans font-black text-[#3E000C]">40+</p>
                <p className="text-[10px] font-mono tracking-wider uppercase text-[#525050] mt-1 font-semibold">
                  Workshops Hosted
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-black/[0.04] shadow-xs text-left col-span-2 sm:col-span-1">
                <p className="text-2xl sm:text-3xl font-sans font-black text-[#3E000C]">2018</p>
                <p className="text-[10px] font-mono tracking-wider uppercase text-[#525050] mt-1 font-semibold">
                  Teaching Mandalas
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Trigger */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/?text=Hello%20Rinki!%20I'm%20inspired%20by%20your%20art%20journey%20and%20would%20love%20to%20learn%20more%20about%20your%20upcoming%20workshops%20and%20creations."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#3E000C] hover:bg-[#200407] text-[#F8DE7E] text-xs font-bold uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#F8DE7E]" />
                <span>Create with Rinki</span>
              </a>

              <Link
                href="/workshops"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3E000C] border border-black/[0.08] text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-xs"
              >
                <span>Explore Workshops</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}