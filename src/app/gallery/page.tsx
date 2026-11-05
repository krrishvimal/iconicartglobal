"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Palette,
  Sparkles,
  X,
  ExternalLink,
  Filter,
  Eye,
  Crown,
} from "lucide-react";
import { Instagram, Youtube } from "@/components/ui/Icons";
import { galleryImages, brandInfo } from "@/lib/constants";
import { GalleryImage } from "@/types";

const categories = [
  { id: "all", label: "All Works" },
  { id: "artwork", label: "Original Masterpieces" },
  { id: "workshops", label: "Atelier Masterclasses" },
  { id: "events", label: "Soirées & Galas" },
  { id: "products", label: "Handcrafted Creations" },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    activeTab === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeTab);

  return (
    <div className="min-h-screen bg-[#F3ECE0] text-[#2A1817]">
      {/* 1. Haute Exhibition Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-[#EBB4BF]/40">
        <div className="absolute inset-0">
          <Image
            src="/images/products/dot_mandala_art.webp"
            alt="Iconic Art Global Salon Exhibition"
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
            The Salon Wall &bull; Curated by Rinki Verma
          </span>

          <h1 className="editorial-title text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F3ECE0] tracking-tight mb-6 leading-[1.08]">
            The Atelier Glimpses,
            <span className="block font-serif italic font-normal text-[#F8DE7E]">
              Exhibited in Pure High-Definition.
            </span>
          </h1>

          <p className="text-[#EBB4BF] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Glimpses from 40+ curated art masterclasses, authentic Lippan mirror reflections,
            delicate watercolors, and vibrant private soirées across India.
          </p>
        </div>
      </section>

      {/* 2. Filter Navigation Bar */}
      <section className="sticky top-[68px] z-30 bg-white/90 backdrop-blur-md border-b border-[#EBB4BF]/40 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto hide-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === cat.id
                    ? "bg-[#4C1513] text-white shadow-lg border border-[#D4A853]"
                    : "bg-[#FAF7F2] text-[#525050] hover:text-[#4C1513] hover:bg-white border border-[#EBB4BF]/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Salon Wall Masonry */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div layout className="columns-2 lg:columns-3 gap-3 sm:gap-6 lg:gap-8 space-y-3 sm:space-y-6 lg:space-y-8">
          <AnimatePresence>
            {filteredImages.map((img, idx) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative rounded-[28px] overflow-hidden shadow-md group cursor-pointer bg-white border border-[#D4A853]/30"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative overflow-hidden bg-[#E6DCCB]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    unoptimized
                    className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#200407]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="candy-badge px-3 py-1 rounded-full text-[9px] shadow self-start mb-2">
                      {img.category}
                    </span>
                    <p className="text-white font-serif text-lg font-bold">
                      {img.alt}
                    </p>
                    <span className="text-[#F8DE7E] text-xs mt-1 flex items-center gap-1 font-mono">
                      <Eye className="w-3.5 h-3.5" />
                      Expand Exhibition View
                    </span>
                  </div>
                </div>

                {/* Placard Beneath */}
                <div className="p-4 border-t border-[#EBB4BF]/30 flex items-center justify-between text-xs text-[#525050]">
                  <span className="font-serif font-bold text-[#4C1513] text-sm">
                    {img.alt}
                  </span>
                  <span className="font-mono text-[10px] text-[#D4A853]">
                    N° {idx < 9 ? `0${idx + 1}` : idx + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. Atelier Social Broadcast */}
      <section className="py-20 bg-[#FAF7F2] border-t border-[#EBB4BF]/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-2xl mb-2 block">⚜️</span>
          <span className="editorial-tag text-[10px] text-[#4C1513] tracking-[0.3em] font-bold uppercase block mb-1">
            Global Connoisseur Community
          </span>
          <h2 className="editorial-title text-3xl sm:text-4xl font-bold text-[#4C1513] mb-4">
            Follow 17,100+ Art Enthusiasts on Instagram &amp; YouTube
          </h2>
          <p className="text-xs sm:text-sm text-[#525050] max-w-xl mx-auto mb-8 font-light">
            Behind-the-scenes glimpses from Rinki Verma&apos;s studio, live exhibition tours,
            daily mandala step-by-steps, and student showcases.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={brandInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#4C1513] hover:bg-[#3E000C] text-white text-xs font-bold uppercase tracking-[0.18em] rounded-full shadow-lg hover:scale-105 transition-all"
            >
              <Instagram className="w-4 h-4 text-[#EBB4BF]" />
              <span>Explore @iconic.art.global</span>
            </a>
            <a
              href={brandInfo.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-[#FAF7F2] border border-[#EBB4BF] text-[#4C1513] text-xs font-bold uppercase tracking-[0.18em] rounded-full shadow-sm hover:scale-105 transition-all"
            >
              <Youtube className="w-4 h-4 text-red-600" />
              <span>YouTube Masterclasses</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#200407]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] rounded-[32px] overflow-hidden bg-black shadow-2xl flex flex-col border border-[#D4A853]/40"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 flex items-center justify-center bg-black/70 p-4">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={900}
                  unoptimized
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>
              <div className="p-6 bg-[#FAF7F2] border-t border-[#D4A853]/40 flex items-center justify-between text-left">
                <div>
                  <span className="candy-badge px-3 py-1 rounded-full text-[9px] shadow inline-block mb-1.5">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#4C1513]">
                    {selectedImage.alt}
                  </h3>
                </div>
                <Link
                  href="/custom-order"
                  className="px-6 py-2.5 bg-[#4C1513] hover:bg-[#3E000C] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-colors border border-[#D4A853]/40"
                >
                  Commission Similar Piece &rarr;
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
