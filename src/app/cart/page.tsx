"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  MessageCircle,
  Plus,
  Minus,
  Lock,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { brandInfo } from "@/lib/constants";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    shipping,
    total,
  } = useCart();

  return (
    <div className="min-h-screen bg-[#F3ECE0] text-[#2A1817]">
      {/* 1. Haute Cart Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden border-b border-[#EBB4BF]/40">
        <div className="absolute inset-0 bg-rich-burgundy" />
        <div className="absolute inset-0 bg-pattern opacity-20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4A853]/60 backdrop-blur-md text-[10px] uppercase font-bold tracking-[0.25em] text-[#F3ECE0] mb-3">
            <ShoppingBag className="w-3.5 h-3.5 text-[#F8DE7E]" />
            L&apos;Atelier Bag &bull; Curated Creations
          </span>
          <h1 className="editorial-title text-3xl sm:text-5xl font-bold text-[#F3ECE0] tracking-tight">
            Your Creative Selections ({totalItems} {totalItems === 1 ? "creation" : "creations"})
          </h1>
        </div>
      </section>

      {/* 2. Cart Body */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          /* Empty Bag State */
          <div className="bg-white rounded-[32px] border border-[#D4A853]/30 p-12 sm:p-20 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#EBB4BF] flex items-center justify-center mx-auto mb-6 text-[#4C1513]">
              <ShoppingBag className="w-8 h-8 text-[#4C1513]" />
            </div>
            <h2 className="editorial-title text-3xl font-bold text-[#4C1513] mb-3">
              Your Atelier Bag is Empty
            </h2>
            <p className="text-xs sm:text-sm text-[#525050] mb-8 leading-relaxed font-light">
              Explore our permanent collection of sacred mandala art, Lippan mirror masterpieces,
              customized photo frames, and everlasting satin flora.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/shop"
                className="px-8 py-3.5 bg-[#4C1513] hover:bg-[#3E000C] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg transition-all hover:scale-105"
              >
                Explore Art Shop &rarr;
              </Link>
              <Link
                href="/custom-order"
                className="px-8 py-3.5 bg-white border border-[#EBB4BF] text-[#4C1513] text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#FAF7F2] transition-all"
              >
                Bespoke Commission
              </Link>
            </div>
          </div>
        ) : (
          /* Active Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Items Column (8 Columns) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-[32px] border border-[#D4A853]/30 shadow-sm p-6 sm:p-8">
                <div className="flex items-center justify-between pb-6 border-b border-[#EBB4BF]/40">
                  <h2 className="editorial-title text-xl font-bold text-[#4C1513]">
                    Acquired Creations
                  </h2>
                  <button
                    onClick={clearCart}
                    className="editorial-tag text-[10px] text-[#525050] hover:text-[#4C1513] transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-[#EBB4BF]/30">
                  {items.map((item, index) => (
                    <div
                      key={`${item.product.id}-${index}`}
                      className="py-6 flex flex-col sm:flex-row gap-5"
                    >
                      {/* Thumbnail with Museum Mat-Board Styling */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#E6DCCB] shrink-0 border border-[#D4A853]/30">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>

                      {/* Info & Customizations */}
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="editorial-tag text-[9px] text-[#4C1513]">
                                {item.product.category}
                              </span>
                              <h3 className="font-serif text-lg font-bold text-[#4C1513]">
                                {item.product.name}
                              </h3>
                            </div>
                            <span className="font-serif text-lg font-bold text-[#3E000C]">
                              ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                          </div>

                          {/* Customization Details Pills */}
                          {item.customizations &&
                            Object.keys(item.customizations).length > 0 && (
                              <div className="mt-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EBB4BF]/50 text-xs space-y-1">
                                <p className="editorial-tag text-[9px] text-[#4C1513] mb-1">
                                  Bespoke Customization Details:
                                </p>
                                {Object.entries(item.customizations).map(([k, v]) => (
                                  <p key={k} className="text-[#525050] text-xs">
                                    <span className="font-semibold text-[#4C1513] capitalize">
                                      {k}:
                                    </span>{" "}
                                    {v}
                                  </p>
                                ))}
                              </div>
                            )}
                        </div>

                        {/* Controls Row */}
                        <div className="flex items-center justify-between pt-4 mt-2">
                          <div className="flex items-center border border-[#EBB4BF] rounded-full bg-white overflow-hidden shadow-sm">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center font-bold text-[#4C1513] hover:bg-[#FAF7F2] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-[#4C1513]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center font-bold text-[#4C1513] hover:bg-[#FAF7F2] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="inline-flex items-center gap-1.5 text-xs text-[#525050] hover:text-[#702026] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4C1513] hover:text-[#702026] transition-colors"
              >
                &larr; Discover Additional Atelier Pieces
              </Link>
            </div>

            {/* Right Summary Column (4 Columns) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-[32px] border border-[#D4A853]/40 shadow-xl p-6 sm:p-8 sticky top-28 space-y-6 text-left">
                <h3 className="editorial-title text-xl font-bold text-[#4C1513] pb-4 border-b border-[#EBB4BF]/40">
                  Atelier Summary
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between text-[#525050]">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-serif font-bold text-[#4C1513] text-sm">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[#525050]">
                    <span>Archival Pan-India Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-emerald-700 font-bold uppercase text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Complimentary
                        </span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-[11px] text-[#525050] bg-[#FAF7F2] p-3 rounded-2xl border border-[#EBB4BF]/50">
                      ⚜️ Add ₹{(5000 - subtotal).toLocaleString("en-IN")} more to unlock{" "}
                      <strong className="text-[#4C1513]">Complimentary Insured Shipping</strong>.
                    </p>
                  )}

                  <div className="pt-4 border-t border-[#EBB4BF]/40 flex items-baseline justify-between">
                    <span className="font-serif text-lg font-bold text-[#4C1513]">
                      Total Investment
                    </span>
                    <span className="font-serif text-2xl font-extrabold text-[#3E000C]">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 bg-[#4C1513] hover:bg-[#3E000C] text-white border border-[#D4A853]/40 font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <Lock className="w-3.5 h-3.5 text-[#F8DE7E]" />
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#EBB4BF] group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={brandInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#FAF7F2] border border-[#D4A853]/50 text-[#4C1513] font-bold text-xs uppercase tracking-wider rounded-full hover:bg-white transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Discuss Order on WhatsApp</span>
                </a>

                <div className="pt-4 border-t border-[#EBB4BF]/30 space-y-2 text-[10px] text-[#525050]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#D4A853]" />
                    <span>Insured packaging with wooden reinforcement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4A853]" />
                    <span>Signed Certificate of Authenticity by Rinki Verma</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </section>
    </div>
  );
}
