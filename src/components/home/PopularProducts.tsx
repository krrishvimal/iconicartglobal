"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Eye,
} from "lucide-react";
import { products } from "@/lib/constants";
import { useCart } from "@/hooks/useCart";

export default function PopularProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const popularProducts = products.filter((p) => p.featured || p.bestseller);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#F3ECE0] py-24 lg:py-32 border-b border-[#EBB4BF]/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-[#EBB4BF]/40">
          <div>
            <span className="editorial-tag text-[10px] text-[#4C1513] font-bold tracking-[0.3em] uppercase inline-flex items-center gap-2 bg-white/80 border border-[#D4A853]/40 px-4 py-1.5 rounded-full mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A853]" />
              Chapter III • The Permanent Collection
            </span>
            <h2 className="editorial-title text-3xl sm:text-5xl font-bold text-[#4C1513] tracking-tight">
              Art Creations &amp;{" "}
              <span className="italic font-serif font-normal text-[#702026]">
                Keepsakes
              </span>
            </h2>
            <p className="mt-3 text-sm text-[#525050] max-w-xl">
              Original hand-drawn mandalas, botanical watercolors, mud-mirror Lippan art,
              and customizable memory keepsakes crafted in our studio.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full bg-white hover:bg-[#4C1513] text-[#4C1513] hover:text-white border border-[#EBB4BF] flex items-center justify-center transition-all shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full bg-white hover:bg-[#4C1513] text-[#4C1513] hover:text-white border border-[#EBB4BF] flex items-center justify-center transition-all shadow-sm"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="hide-scrollbar mt-12 flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory"
        >
          {popularProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="w-[300px] sm:w-[320px] flex-shrink-0 snap-start luxury-card rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Artwork Mat-Board Window */}
                <div className="relative aspect-square overflow-hidden bg-[#F3ECE0]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                    <span className="candy-badge px-3 py-0.5 rounded-full text-[9px] shadow">
                      {product.category}
                    </span>
                    {product.customizable && (
                      <span className="butter-badge px-2.5 py-0.5 rounded-full text-[9px] shadow">
                        Personalized
                      </span>
                    )}
                  </div>

                  {/* Quick Acquisition Overlay on Hover */}
                  <div className="absolute inset-0 bg-[#3E000C]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                    <button
                      onClick={() => addItem(product, 1)}
                      className="px-4 py-2.5 rounded-full bg-[#EBB4BF] hover:bg-white text-[#4C1513] text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add To Bag</span>
                    </button>
                    <Link
                      href={`/shop/${product.categorySlug}/${product.slug}`}
                      className="p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all"
                      title="Inspect Artwork"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 text-left">
                  <h3 className="font-serif text-lg font-bold text-[#4C1513] line-clamp-1 group-hover:text-[#702026] transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#525050] line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#EBB4BF]/30 flex items-baseline justify-between">
                    <div>
                      <span className="font-serif text-xl font-bold text-[#4C1513]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-xs text-[#525050] line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4A853]">
                      ⭐ {product.rating} ({product.reviewCount})
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] text-[#525050] tracking-wide">
                    📦 {product.prepTime || "3-5 days crafting"}
                  </p>
                </div>
              </div>

              {/* View Item Link */}
              <div className="p-6 pt-0">
                <Link
                  href={`/shop/${product.categorySlug}/${product.slug}`}
                  className="w-full py-2.5 rounded-2xl bg-[#F3ECE0] group-hover:bg-[#4C1513] text-[#4C1513] group-hover:text-white border border-[#EBB4BF] text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Acquire / Customize</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Entire Collection */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#4C1513] hover:bg-[#3E000C] text-white border border-[#D4A853]/50 shadow-md text-xs font-bold uppercase tracking-[0.2em] transition-all group hover:scale-[1.02]"
          >
            <span>Explore All 7 Handcrafted Categories</span>
            <ArrowRight className="w-4 h-4 text-[#EBB4BF] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
