"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Eye,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
} from "lucide-react";
import { products } from "@/lib/constants";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";

export default function BoutiqueLookbook() {
  const [inspectingProduct, setInspectingProduct] = useState<Product | null>(null);
  const { addItem } = useCart();
  const [addedToast, setAddedToast] = useState(false);

  // Curated 6 signature salon masterpieces spanning each distinct art discipline
  const salonProducts = [
    products.find((p) => p.id === "p1"), // Dot Mandala Art
    products.find((p) => p.id === "p-lippan"), // Sacred Lotus Lippan Mirror
    products.find((p) => p.id === "p-frame-manor"), // Twilight Manor Baroque Framed Art
    products.find((p) => p.id === "p-lemon"), // Citron 3D Textured Canvas
    products.find((p) => p.id === "p3"), // Sunset Horizon Watercolor
    products.find((p) => p.id === "p7"), // Handcrafted Satin Rose Bouquet
  ].filter(Boolean) as Product[];

  const handleQuickAdd = (product: Product) => {
    addItem(product, 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <section className="bg-[#FAF7F2] pt-10 sm:pt-14 pb-20 sm:pb-24 border-b border-black/[0.06] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. TOP META & MONUMENTAL SPENCER GABOR-STYLE HEADER
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-2 text-left">
            <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4A853] font-bold">
              ORIGINAL HANDMADE CREATIONS &bull; BY RINKI VERMA
            </p>

            <h2 className="font-sans font-black tracking-[-0.015em] text-4xl sm:text-6xl md:text-7xl uppercase text-[#3E000C] leading-[1.05]">
              Handcrafted Art <span className="inline-block mx-1 sm:mx-2 font-medium">&amp;</span> Decor
            </h2>

            <p className="text-xs sm:text-sm text-[#525050] max-w-xl font-normal leading-relaxed pt-1">
              Every piece is handcrafted individually by Master Artist Rinki Verma with
              sacred intention, high-grade convex mirrors, and custom framing. Authentic 1-of-1 originals.
            </p>
          </div>

          {/* Curated Salon Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-black/[0.08] text-[11px] font-mono tracking-widest uppercase text-[#3E000C] font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A853]" />
              <span>Limited 1-of-1 Editions</span>
            </span>
          </div>
        </div>

        {/* =========================================================================
            2. SPENCER GABOR-STYLE CLEAN SQUIRCLE PRODUCT GRID
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {salonProducts.map((product) => {
            const displayImage =
              (product.images && product.images[0]) ||
              "/images/instagram/lippan_ganesh.jpg";

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[30px] sm:rounded-[34px] bg-white p-3 sm:p-3.5 shadow-[0_16px_40px_rgba(40,10,15,0.08)] hover:shadow-[0_28px_65px_rgba(40,10,15,0.20)] border border-black/[0.04] flex flex-col justify-between group transition-shadow duration-300"
              >
                {/* 1. Artwork Window */}
                <div
                  className="relative h-[240px] sm:h-[270px] w-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#FAF7F2] cursor-pointer"
                  onClick={() => setInspectingProduct(product)}
                >
                  <Image
                    src={displayImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-106 transition-transform duration-700"
                    unoptimized
                  />

                  {/* Micro Category Pill */}
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[8.5px] font-bold uppercase tracking-widest text-[#3E000C] shadow-xs">
                      {product.category}
                    </span>
                  </div>

                  {/* Hover Inspect Cue */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="px-4 py-2 rounded-full bg-white text-[#3E000C] text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Artwork</span>
                    </span>
                  </div>
                </div>

                {/* 2. Placard Details: Clean Title, Tag, and Price */}
                <div className="pt-3.5 pb-2 px-1 text-left flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-mono tracking-widest uppercase text-[#D4A853] font-bold">
                      Original Studio Creation
                    </p>
                    <h3
                      onClick={() => setInspectingProduct(product)}
                      className="font-serif text-base sm:text-lg font-bold text-[#3E000C] tracking-tight leading-snug truncate mt-0.5 cursor-pointer hover:text-[#D4A853] transition-colors"
                    >
                      {product.name}
                    </h3>
                  </div>

                  <div className="shrink-0 pt-1">
                    <span className="inline-block text-xs sm:text-sm font-serif font-bold text-[#3E000C] bg-[#FAF7F2] px-3 py-1 rounded-full border border-black/[0.06] shadow-xs">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* 3. Action Buttons */}
                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="flex-1 py-3 rounded-full bg-[#FAF7F2] hover:bg-[#3E000C] text-[#3E000C] hover:text-[#F8DE7E] border border-black/[0.06] text-[10.5px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => setInspectingProduct(product)}
                    className="w-11 h-11 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3E000C] border border-black/[0.08] flex items-center justify-center cursor-pointer transition-colors shrink-0 shadow-xs"
                    title="Inspect Details"
                    aria-label="Inspect creation"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================================
            3. BOTTOM ALL PIECES BUTTON
            ========================================================================= */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#3E000C] hover:bg-[#200407] text-[#F8DE7E] text-xs font-bold uppercase tracking-[0.22em] shadow-xl hover:scale-105 transition-all"
          >
            <span>Explore Entire Permanent Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* =========================================================================
          4. MUSEUM VITRINE INSPECTION MODAL
          ========================================================================= */}
      <AnimatePresence>
        {inspectingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl rounded-[36px] bg-[#FAF7F2] border border-black/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectingProduct(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white hover:bg-[#3E000C] text-[#3E000C] hover:text-white flex items-center justify-center border border-black/[0.08] shadow-md transition-all cursor-pointer"
                aria-label="Close inspector"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Image in Museum Frame */}
              <div className="relative h-72 md:h-auto md:w-1/2 bg-[#FAF7F2] shrink-0">
                <Image
                  src={
                    (inspectingProduct.images && inspectingProduct.images[0]) ||
                    "/images/instagram/lippan_ganesh.jpg"
                  }
                  alt={inspectingProduct.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/95 text-[10px] font-bold uppercase tracking-widest text-[#3E000C] border border-black/[0.06] shadow-sm">
                  {inspectingProduct.category}
                </span>
              </div>

              {/* Right Column: Museum Placard Details */}
              <div className="p-6 sm:p-8 flex-1 text-left flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#D4A853]">⚜️</span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4A853]">
                      Atelier Vitrine Inspection
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3E000C] tracking-tight">
                    {inspectingProduct.name}
                  </h3>

                  <p className="font-serif text-2xl font-bold text-[#3E000C] mt-2">
                    ₹{inspectingProduct.price.toLocaleString("en-IN")}
                  </p>

                  <p className="text-xs sm:text-sm text-[#525050] font-normal leading-relaxed mt-4">
                    {inspectingProduct.description}
                  </p>

                  {/* Provenance Bullets */}
                  <div className="mt-5 space-y-2 border-t border-black/[0.06] pt-4 text-xs text-[#3E000C]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#D4A853]" />
                      <span>100% Handcrafted by Rinki Verma</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#D4A853]" />
                      <span>Complimentary Pan-India Insured Wooden Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4A853]" />
                      <span>Archival Quality &bull; Authenticity Certificate</span>
                    </div>
                  </div>
                </div>

                {/* Acquisition Actions */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      handleQuickAdd(inspectingProduct);
                      setInspectingProduct(null);
                    }}
                    className="w-full py-3.5 rounded-full bg-[#3E000C] hover:bg-[#200407] text-[#F8DE7E] text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Atelier Bag</span>
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `⚜️ Luxury Inquiry - Iconic Art Global\n\nI would like to acquire / commission details for: ${inspectingProduct.name} (₹${inspectingProduct.price})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full bg-white hover:bg-[#FAF7F2] text-[#3E000C] border border-black/[0.08] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xs text-center"
                  >
                    <span>Inquire via WhatsApp Concierge</span>
                  </a>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Added Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full bg-[#3E000C] text-[#F8DE7E] border border-[#D4A853]/60 shadow-2xl flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4 text-[#F8DE7E]" />
            <span>Added to Atelier Bag!</span>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}