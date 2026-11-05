"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  ArrowRight,
  Star,
  Sparkles,
  Heart,
  Palette,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { productCategories, products, brandInfo } from "@/lib/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.categorySlug === selectedCategory);

  return (
    <main className="min-h-screen bg-[#F3ECE0] text-[#2A1817]">
      {/* 1. Haute Boutique Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-[#EBB4BF]/40">
        <Image
          src="/images/products/dot_mandala_art.webp"
          alt="Iconic Art Global Permanent Fine Art Collection"
          fill
          className="object-cover scale-105"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#200407] via-[#3E000C]/85 to-[#3E000C]/70" />
        <div className="absolute inset-0 bg-pattern opacity-20 pointer-events-none" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-36 pb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4A853]/60 backdrop-blur-md mb-6"
          >
            <span className="text-[#F8DE7E]">⚜️</span>
            <span className="editorial-tag text-[10px] text-[#F3ECE0]">
              The Permanent Atelier Collection &bull; 100% Handcrafted
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EBB4BF]" />
            <span className="text-[10px] font-bold text-[#F8DE7E]">
              Bespoke Personalization
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="editorial-title text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F3ECE0] tracking-tight leading-[1.08] mb-6"
          >
            Acquire Fine Art &amp;{" "}
            <span className="block font-serif italic font-normal text-[#F8DE7E]">
              Handcrafted Treasures.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[#EBB4BF] text-base sm:text-lg max-w-2xl mx-auto mb-8 font-light leading-relaxed"
          >
            Every piece is created with patient intention by artist Rinki Verma —
            sacred geometry mandalas, authentic Lippan mirrors, customized photo frames,
            and everlasting satin flora for refined spaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#F3ECE0]/80"
          >
            <span className="flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#D4A853]" />
              Certificate of Authenticity
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Truck className="w-4 h-4 text-[#EBB4BF]" />
              Safe Pan-India Archival Delivery
            </span>
            <span className="flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 text-[#F8DE7E]" />
              Custom Sizing &amp; Framing
            </span>
          </motion.div>
        </div>
      </section>

      {/* 2. Curated Category Salon Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#EBB4BF]/40">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="editorial-tag text-[10px] text-[#4C1513] font-bold tracking-[0.3em] uppercase inline-flex items-center gap-2 bg-white/80 border border-[#D4A853]/40 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A853]" />
            Atelier Salon
          </span>
          <h2 className="editorial-title text-3xl sm:text-5xl font-bold text-[#4C1513] tracking-tight">
            Explore by Medium &amp; Craft
          </h2>
          <p className="mt-3 text-[#525050] text-sm sm:text-base">
            Select an art discipline to explore individual creations, commissioned variants, and personalized gifts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCategories.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className="luxury-card rounded-[28px] overflow-hidden group block"
            >
              <div className="relative aspect-square overflow-hidden bg-[#E6DCCB]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#200407]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4">
                  <span className="editorial-tag text-[9px] px-2.5 py-1 rounded-full bg-white/90 text-[#4C1513] font-bold border border-[#D4A853]/40">
                    Collection 0{idx + 1}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                  <h3 className="font-serif text-xl font-bold drop-shadow">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#EBB4BF] mt-0.5">
                    {cat.productCount} Handcrafted Pieces
                  </p>
                </div>
              </div>

              <div className="p-5 text-left">
                <p className="text-xs text-[#525050] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4C1513] group-hover:text-[#702026] transition-colors">
                  <span>Enter Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. The Permanent Creations Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="editorial-tag text-[10px] text-[#4C1513] font-bold tracking-[0.3em] uppercase inline-flex items-center gap-2 bg-white/80 border border-[#D4A853]/40 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A853]" />
            Fine Works Gallery
          </span>
          <h2 className="editorial-title text-3xl sm:text-5xl font-bold text-[#4C1513] tracking-tight">
            Original Artworks &amp; Bespoke Items
          </h2>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-[#4C1513] text-white shadow-lg border border-[#D4A853]"
                  : "bg-white/80 text-[#525050] hover:text-[#4C1513] hover:bg-white border border-[#EBB4BF]/50"
              }`}
            >
              All Pieces
            </button>
            {productCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === c.slug
                    ? "bg-[#4C1513] text-white shadow-lg border border-[#D4A853]"
                    : "bg-white/80 text-[#525050] hover:text-[#4C1513] hover:bg-white border border-[#EBB4BF]/50"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="luxury-card rounded-[28px] overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-[#E6DCCB]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#200407]/75 via-transparent to-transparent pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="candy-badge px-3 py-1 rounded-full text-[9px] shadow">
                      {product.category}
                    </span>
                    {product.customizable && (
                      <span className="sky-badge px-3 py-1 rounded-full text-[9px] shadow">
                        Customizable
                      </span>
                    )}
                  </div>

                  {/* Price Tag Placard */}
                  <div className="absolute bottom-4 right-4">
                    <span className="px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#D4A853]/60 text-[#3E000C] font-serif font-bold text-sm shadow-md">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="p-6 text-left">
                  <div className="flex items-center gap-1 text-[#D4A853] text-xs mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4A853]" />
                    ))}
                    <span className="text-[#525050] text-[11px] font-bold ml-1">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#4C1513] group-hover:text-[#702026] transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#525050] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#EBB4BF]/30 flex items-center justify-between text-[11px] text-[#525050]">
                    <span>Dimensions: {product.dimensions}</span>
                    <span className="text-[#4C1513] font-semibold">Prep: {product.prepTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/shop/${product.categorySlug}/${product.slug}`}
                  className="w-full py-3.5 rounded-full bg-[#4C1513] hover:bg-[#3E000C] text-white border border-[#D4A853]/40 shadow-md text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group/btn hover:scale-[1.02]"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#EBB4BF]" />
                  <span>View Details &amp; Personalize</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
