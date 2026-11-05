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
            2. SPENCER GABOR-STYLE SQUIRCLE IMAGE TILES
            ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {feedImages.map((image, i) => (
            <motion.a
              key={image.id}
              href="https://www.instagram.com/iconic.art.global/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-square overflow-hidden rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_12px_30px_rgba(40,10,15,0.06)] hover:shadow-[0_20px_45px_rgba(40,10,15,0.16)] border border-black/[0.04]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                unoptimized
              />

              {/* Hover Dark Gradient Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#3E000C]/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-2 text-center text-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#EBB4BF]">
                    <Heart className="h-3.5 w-3.5 fill-[#EBB4BF]" />
                    <span className="text-xs font-bold font-mono">
                      {120 + i * 23}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[#F8DE7E]">
                    <MessageCircle className="h-3.5 w-3.5 fill-[#F8DE7E]" />
                    <span className="text-xs font-bold font-mono">
                      {14 + i * 3}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-white/90 font-serif italic mt-1 line-clamp-1">
                  {image.alt}
                </span>
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