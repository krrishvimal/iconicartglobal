"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MessageCircle, ExternalLink } from "lucide-react";
import { Instagram } from "@/components/ui/Icons";
import { galleryImages } from "@/lib/constants";

export default function InstagramFeed() {
  const feedImages = galleryImages.slice(0, 6);

  return (
    <section className="bg-[#FAF7F2] py-20 sm:py-28 border-b border-black/[0.06] relative select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. TOP META & MONUMENTAL SPENCER GABOR-STYLE HEADER
            ========================================================================= */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4A853] font-bold">
            INSTAGRAM GALLERY &bull; 17.1K+ ART LOVERS &bull; GREATER NOIDA &amp; NCR
          </p>

          <h2 className="font-sans font-black tracking-[-0.04em] text-4xl sm:text-6xl md:text-7xl uppercase text-[#3E000C] leading-none mt-2">
            @iconic.art.global
          </h2>

          <p className="text-xs sm:text-sm text-[#525050] max-w-lg mx-auto font-normal leading-relaxed pt-2">
            Step-by-step masterclasses, sacred mandala geometry, behind-the-scenes studio sessions, and daily creations.
          </p>
        </div>

        {/* =========================================================================
            2. SPENCER GABOR-STYLE 3-COLUMN SQUIRCLE IMAGE TILES
            High-fashion 3-column salon layout across desktop and tablet
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
          {feedImages.map((image, i) => (
            <motion.a
              key={image.id}
              href="https://www.instagram.com/iconic.art.global/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-square overflow-hidden rounded-[28px] sm:rounded-[34px] bg-white p-3 shadow-[0_16px_40px_rgba(40,10,15,0.08)] hover:shadow-[0_28px_65px_rgba(40,10,15,0.20)] border border-black/[0.04] transition-all duration-300 block"
            >
              <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#FAF7F2]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                  unoptimized
                />

                {/* Hover Dark Gradient Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#3E000C]/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4 text-center text-white">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[#EBB4BF]">
                      <Heart className="h-4 w-4 fill-[#EBB4BF]" />
                      <span className="text-xs font-bold font-mono">
                        {180 + i * 35}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#F8DE7E]">
                      <MessageCircle className="h-4 w-4 fill-[#F8DE7E]" />
                      <span className="text-xs font-bold font-mono">
                        {24 + i * 6}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-white/95 font-serif italic mt-1 line-clamp-2 max-w-[200px]">
                    {image.alt}
                  </span>
                  <span className="mt-2 text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/20 text-[#F8DE7E]">
                    View on Instagram ↗
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.instagram.com/iconic.art.global/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#3E000C] hover:bg-[#200407] text-[#F8DE7E] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] shadow-xl transition-all hover:scale-105"
          >
            <Instagram className="h-4 w-4 text-[#F8DE7E]" />
            <span>Join 17K+ Connoisseurs on Instagram</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#F8DE7E]" />
          </a>
        </div>

      </div>
    </section>
  );
}