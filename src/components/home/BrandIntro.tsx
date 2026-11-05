"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Feather, ShieldCheck } from "lucide-react";

export default function BrandIntro() {
  return (
    <section className="relative overflow-hidden bg-[#F3ECE0] py-24 lg:py-32 border-b border-[#EBB4BF]/40">
      {/* Pattern texture overlay */}
      <div className="bg-pattern absolute inset-0 opacity-25 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 flex items-center justify-center gap-4 text-center"
        >
          <span className="h-px w-16 bg-[#D4A853]/60" />
          <span className="editorial-tag text-[10px] text-[#4C1513] font-bold tracking-[0.3em] uppercase">
            Chapter I • The Artisanal Philosophy
          </span>
          <span className="h-px w-16 bg-[#D4A853]/60" />
        </motion.div>

        {/* Major Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="editorial-title text-3xl sm:text-5xl lg:text-6xl font-bold text-[#4C1513] tracking-tight leading-[1.12]">
            Art is Never Assembled in Factories.
            <span className="block font-serif italic font-normal text-[#702026] mt-2">
              It is Patiently Born Through Human Devotion.
            </span>
          </h2>
        </motion.div>

        {/* Two-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Founder Portrait in Museum Arch Frame (5 Columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              {/* Gold & Candy Shadow Glow */}
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-[#D4A853]/20 via-[#EBB4BF]/30 to-[#4C1513]/10 blur-xl pointer-events-none" />

              <div className="relative bg-[#FAF7F2] p-4 sm:p-5 rounded-[36px] border border-[#D4A853]/40 shadow-2xl">
                {/* Arch-shaped portrait container */}
                <div className="relative h-[420px] sm:h-[480px] w-full rounded-[28px] overflow-hidden bg-[#E6DCCB]">
                  <Image
                    src="/images/artist.webp"
                    alt="Rinki Verma - Founder & Lead Artist of Iconic Art Global"
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#3E000C]/85 via-[#3E000C]/35 to-transparent pointer-events-none" />

                  {/* Placard on Image */}
                  <div className="absolute bottom-5 left-5 right-5 text-white text-left">
                    <span className="candy-badge px-3 py-1 rounded-full text-[9px] shadow-sm mb-2 inline-block">
                      Founder &amp; Master Art Educator
                    </span>
                    <h3 className="font-serif text-2xl font-bold drop-shadow">
                      Rinki Verma
                    </h3>
                    <p className="text-xs text-[#F3ECE0]/90 font-light mt-0.5">
                      40+ Curated Workshops Hosted &bull; 17.1K+ Connoisseurs
                    </p>
                  </div>
                </div>

                {/* Wax Seal Authenticity Tag */}
                <div className="mt-4 pt-3 border-t border-[#D4A853]/30 flex items-center justify-between text-xs text-[#525050]">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-[#4C1513]">
                    <ShieldCheck className="w-4 h-4 text-[#D4A853]" />
                    Atelier Provenance Certified
                  </span>
                  <span className="font-mono text-[10px] text-[#525050]">
                    Atelier N° 01
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Curated Narrative & Quote (7 Columns) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <p className="text-base sm:text-lg text-[#525050] leading-relaxed font-normal">
              Founded by acclaimed visual artist and educator{" "}
              <strong className="text-[#4C1513] font-bold">Rinki Verma</strong>, Iconic Art Global
              is a contemporary art house dedicated to the revival of hands-on human craftsmanship.
              In an era dominated by mass production, our atelier preserves sacred geometric mandalas,
              authentic Indian Lippan mirror artistry, and delicate miniature watercolors.
            </p>

            <p className="text-base sm:text-lg text-[#525050] leading-relaxed font-normal">
              Having guided over <strong className="text-[#4C1513] font-bold">40+ physical &amp; virtual masterclasses</strong> for corporate leaders, private collectors, and enthusiastic beginners, Rinki designs each experience to be meditative, joyous, and deeply fulfilling.
            </p>

            {/* Curated Callout Card with Wax Seal Design */}
            <div className="p-8 rounded-3xl bg-white/90 border border-[#EBB4BF] shadow-lg relative overflow-hidden backdrop-blur-md">
              <span className="absolute top-2 left-6 text-7xl font-serif text-[#D4A853]/20 select-none pointer-events-none">
                “
              </span>

              <p className="font-serif text-2xl font-bold text-[#4C1513] italic leading-snug relative z-10">
                &ldquo;Where Art Meets Experience&rdquo;
              </p>

              <p className="text-xs uppercase tracking-[0.25em] text-[#525050] font-bold mt-2 relative z-10">
                The Iconic Creative Philosophy
              </p>

              <div className="mt-6 pt-5 border-t border-[#EBB4BF]/40 flex items-center justify-between">
                <div>
                  <span className="font-cursive text-2xl font-bold text-[#4C1513] block">
                    Rinki Verma
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#525050]">
                    Lead Artist, Educator &amp; Atelier Curator
                  </span>
                </div>

                <div className="w-11 h-11 rounded-full bg-[#3E000C] border-2 border-[#D4A853] flex items-center justify-center shadow-lg text-[#F8DE7E]">
                  <Feather className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Atelier Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/about"
                className="px-7 py-3.5 rounded-full bg-[#4C1513] hover:bg-[#3E000C] text-white border border-[#D4A853]/40 shadow-md text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group hover:scale-[1.02]"
              >
                <span>The Complete Atelier Story</span>
                <ArrowRight className="w-4 h-4 text-[#EBB4BF] group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/gallery"
                className="px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#4C1513] border border-[#EBB4BF] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-[#D4A853]" />
                <span>Exhibition Salon Wall</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
