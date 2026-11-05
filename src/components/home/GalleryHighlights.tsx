"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ZoomIn, Sparkles } from "lucide-react";
import { galleryImages } from "@/lib/constants";

export default function GalleryHighlights() {
  const highlightImages = galleryImages.slice(0, 8);

  return (
    <section className="bg-[#F3ECE0] py-24 lg:py-32 border-b border-[#EBB4BF]/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="editorial-tag text-[10px] text-[#4C1513] font-bold tracking-[0.3em] uppercase inline-flex items-center gap-2 bg-white/80 border border-[#D4A853]/40 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A853]" />
            Chapter V • Atelier Glimpses &amp; Provenance
          </span>
          <h2 className="editorial-title text-3xl sm:text-5xl font-bold text-[#4C1513] tracking-tight">
            Curated Visual{" "}
            <span className="italic font-serif font-normal text-[#702026]">
              Portfolio
            </span>
          </h2>
          <p className="mx-auto mt-4 text-sm sm:text-base text-[#525050] leading-relaxed">
            Authentic moments from 40+ hosted workshops, live corporate exhibitions,
            and private commissioned creations crafted in our studio.
          </p>
        </motion.div>

        {/* Curated Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {highlightImages.map((image, i) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-square overflow-hidden rounded-2xl luxury-card"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized
              />

              {/* Luxury Hover Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#3E000C]/75 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 p-4 text-center">
                <div className="w-10 h-10 rounded-full bg-[#EBB4BF] text-[#4C1513] flex items-center justify-center mb-2 shadow-lg">
                  <ZoomIn className="h-5 w-5" />
                </div>
                <p className="text-xs font-serif font-bold text-white drop-shadow">
                  {image.alt}
                </p>
                <span className="mt-2 rounded-full bg-white/20 px-3 py-0.5 text-[9px] uppercase tracking-wider text-[#F8DE7E]">
                  {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-[#4C1513] text-[#4C1513] hover:text-white border border-[#D4A853] shadow-md text-xs font-bold uppercase tracking-[0.2em] transition-all group"
          >
            <span>Explore Full Masonry Lightbox Gallery</span>
            <ArrowRight className="h-4 w-4 text-[#D4A853] group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
