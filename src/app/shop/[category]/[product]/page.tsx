"use client";

import { use, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  ShoppingBag,
  Zap,
  MessageCircle,
  Truck,
  Clock,
  ShieldCheck,
  ChevronRight,
  Heart,
  Share2,
  Check,
  CheckCircle2,
  Award,
} from "lucide-react";
import { products, brandInfo } from "@/lib/constants";
import { useCart } from "@/hooks/useCart";
import { CustomizationOption } from "@/types";

interface PageProps {
  params: Promise<{
    category: string;
    product: string;
  }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F3ECE0] flex items-center justify-center pt-32 pb-20">
          <div className="w-8 h-8 border-2 border-[#4C1513] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductDetailContent params={params} />
    </Suspense>
  );
}

function ProductDetailContent({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addItem } = useCart();

  const product = products.find((p) => p.slug === resolvedParams.product) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customSelections, setCustomSelections] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"description" | "materials" | "dimensions" | "care">("description");
  const [addedToast, setAddedToast] = useState(false);

  const handleCustomChange = (id: string, value: string) => {
    setCustomSelections((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleAddToCart = () => {
    addItem(product, quantity, customSelections);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, customSelections);
    router.push("/checkout");
  };

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 3);

  // VIP WhatsApp inquiry string
  const whatsappEnquiry = encodeURIComponent(
    `⚜️ Atelier Inquiry - Iconic Art Global\n\nHello Rinki! I am admiring "${product.name}" (₹${product.price.toLocaleString(
      "en-IN"
    )}).\n\nCould we consult regarding custom sizing, color palettes, or personal details?`
  );

  return (
    <div className="min-h-screen bg-[#F3ECE0] text-[#2A1817]">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed top-24 right-6 z-50 bg-[#3E000C] text-[#F3ECE0] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#D4A853]/50 animate-fade-in-up">
          <CheckCircle2 className="w-5 h-5 text-[#F8DE7E]" />
          <div>
            <p className="font-bold text-xs uppercase tracking-wider text-[#F8DE7E]">
              Added to Atelier Bag
            </p>
            <p className="text-xs text-[#EBB4BF]">
              {quantity} × {product.name}
            </p>
          </div>
          <Link
            href="/cart"
            className="ml-4 px-3.5 py-1.5 bg-[#FAF7F2] text-[#3E000C] font-bold text-xs rounded-full border border-[#D4A853]/60 hover:bg-white"
          >
            View Bag &rarr;
          </Link>
        </div>
      )}

      {/* Breadcrumbs Navigation */}
      <section className="pt-32 pb-4 bg-white/70 border-b border-[#EBB4BF]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#525050]">
            <Link href="/" className="hover:text-[#4C1513] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-[#D4A853]" />
            <Link href="/shop" className="hover:text-[#4C1513] transition-colors">
              Art Shop
            </Link>
            <ChevronRight className="w-3 h-3 text-[#D4A853]" />
            <Link
              href={`/shop/${product.categorySlug}`}
              className="hover:text-[#4C1513] transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3 text-[#D4A853]" />
            <span className="text-[#4C1513] font-bold truncate max-w-[240px]">
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      {/* Main Product Showcase */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Gallery Column (6 Columns) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-[32px] overflow-hidden bg-[#E6DCCB] border border-[#D4A853]/40 shadow-xl">
                <Image
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />

                {/* Authenticity Badge */}
                <div className="absolute top-5 left-5">
                  <span className="candy-badge px-3.5 py-1 rounded-full text-[10px] shadow">
                    Atelier Piece &bull; Rinki Verma
                  </span>
                </div>

                {product.bestseller && (
                  <div className="absolute top-5 right-5">
                    <span className="butter-badge px-3.5 py-1 rounded-full text-[10px] shadow">
                      Atelier Signature
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? "border-[#4C1513] scale-105 shadow-md"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Atelier Provenance Guarantee Bar */}
              <div className="p-6 rounded-3xl bg-white border border-[#D4A853]/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-6 shadow-sm">
                <div className="p-2">
                  <Clock className="w-5 h-5 text-[#4C1513] mx-auto mb-1.5" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#4C1513]">
                    Crafting Timeline
                  </p>
                  <p className="text-xs text-[#525050] font-medium mt-0.5">
                    {product.prepTime || "5–7 business days"}
                  </p>
                </div>
                <div className="p-2 border-t sm:border-t-0 sm:border-l border-[#EBB4BF]/40">
                  <Truck className="w-5 h-5 text-[#4C1513] mx-auto mb-1.5" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#4C1513]">
                    Archival Dispatch
                  </p>
                  <p className="text-xs text-[#525050] font-medium mt-0.5">
                    {product.deliveryTime || "Safe pan-India delivery"}
                  </p>
                </div>
                <div className="p-2 border-t sm:border-t-0 sm:border-l border-[#EBB4BF]/40">
                  <ShieldCheck className="w-5 h-5 text-[#D4A853] mx-auto mb-1.5" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#4C1513]">
                    Certificate
                  </p>
                  <p className="text-xs text-[#525050] font-medium mt-0.5">
                    Signed by Rinki Verma
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details & Customization (6 Columns) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <span className="editorial-tag text-[10px] text-[#4C1513] font-bold tracking-[0.28em] uppercase block">
                  {product.category}
                </span>
                <h1 className="editorial-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4C1513] mt-1.5">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-[#D4A853]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4A853]" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#4C1513]">
                    {product.rating} / 5.0
                  </span>
                  <span className="text-xs text-[#525050]">
                    ({product.reviewCount} connoisseur reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3E000C]">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-[#525050] font-medium">
                    (Handcrafted archival piece &bull; Taxes included)
                  </span>
                </div>
              </div>

              <p className="text-[#525050] text-sm leading-relaxed border-t border-[#EBB4BF]/40 pt-4">
                {product.description}
              </p>

              {/* Dynamic Personalization Studio */}
              {product.customizable && product.customizationOptions && (
                <div className="p-6 rounded-3xl bg-white border border-[#D4A853]/40 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#EBB4BF]/30 pb-3">
                    <Sparkles className="w-4 h-4 text-[#D4A853]" />
                    <h3 className="font-serif text-base font-bold text-[#4C1513]">
                      Atelier Bespoke Personalization
                    </h3>
                  </div>

                  {product.customizationOptions.map((opt: CustomizationOption) => (
                    <div key={opt.id} className="space-y-1">
                      <label className="editorial-tag text-[10px] text-[#4C1513] block">
                        {opt.label}{" "}
                        {opt.required && <span className="text-[#D64B74]">*</span>}
                      </label>

                      {opt.type === "select" && opt.options && (
                        <select
                          value={customSelections[opt.id] || opt.options[0]}
                          onChange={(e) => handleCustomChange(opt.id, e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs font-medium text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                        >
                          {opt.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}

                      {opt.type === "text" && (
                        <input
                          type="text"
                          value={customSelections[opt.id] || ""}
                          placeholder={opt.placeholder || "Enter details..."}
                          onChange={(e) => handleCustomChange(opt.id, e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                        />
                      )}

                      {opt.type === "textarea" && (
                        <textarea
                          rows={2}
                          value={customSelections[opt.id] || ""}
                          placeholder={opt.placeholder || "Enter personal quote, message or custom notes..."}
                          onChange={(e) => handleCustomChange(opt.id, e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                        />
                      )}

                      {opt.type === "file" && (
                        <div className="border border-dashed border-[#D4A853]/50 rounded-xl p-3 bg-[#FAF7F2] text-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={() => handleCustomChange(opt.id, "Reference Photograph Uploaded ✓")}
                            className="text-xs text-[#525050] cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 pt-2">
                <span className="editorial-tag text-[10px] text-[#4C1513]">Quantity:</span>
                <div className="flex items-center border border-[#EBB4BF] rounded-full bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center font-bold text-[#4C1513] hover:bg-[#FAF7F2] transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-[#4C1513]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center font-bold text-[#4C1513] hover:bg-[#FAF7F2] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="py-4 px-6 rounded-full bg-[#4C1513] hover:bg-[#3E000C] text-white border border-[#D4A853]/40 shadow-lg text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#EBB4BF]" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-4 px-6 rounded-full bg-[#3E000C] hover:bg-[#200407] text-white border border-[#F8DE7E]/40 shadow-lg text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <Zap className="w-4 h-4 text-[#F8DE7E]" />
                    <span>Instant Checkout</span>
                  </button>
                </div>

                {/* VIP Concierge WhatsApp */}
                <a
                  href={`https://wa.me/?text=${whatsappEnquiry}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#D4A853]/60 text-[#4C1513] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Consult Rinki Verma on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Tabbed Specifications */}
          <div className="mt-20 bg-white rounded-3xl border border-[#D4A853]/30 p-8 sm:p-12 shadow-sm">
            <div className="flex border-b border-[#EBB4BF]/40 gap-6 sm:gap-10 overflow-x-auto hide-scrollbar mb-8">
              {(
                [
                  { id: "description", label: "Atelier Description" },
                  { id: "materials", label: "Materials & Provenance" },
                  { id: "dimensions", label: "Dimensions & Sizing" },
                  { id: "care", label: "Archival Care" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 font-serif text-base sm:text-lg font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? "text-[#4C1513]"
                      : "text-[#525050] hover:text-[#4C1513]"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeSpecTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4C1513]"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="text-[#525050] text-sm leading-relaxed max-w-3xl text-left">
              {activeTab === "description" && (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <p>
                    Every creation by Iconic Art Global is designed to become a timeless centerpiece
                    in your living space or a thoughtful, cherished gift. Because every piece is handmade,
                    slight artistic variations may occur — celebrating the authentic soul of human craftsmanship.
                  </p>
                </div>
              )}

              {activeTab === "materials" && (
                <div className="space-y-3">
                  <p>
                    <strong className="text-[#4C1513]">Artisanal Medium:</strong>{" "}
                    {product.materials || "Premium Archival Grade Supplies"}
                  </p>
                  <p>
                    We select only acid-free heavyweight paper, lightfast pigments, and non-toxic
                    protective sealants to ensure your artwork retains its vibrant radiance for generations.
                  </p>
                </div>
              )}

              {activeTab === "dimensions" && (
                <div className="space-y-3">
                  <p>
                    <strong className="text-[#4C1513]">Standard Scale:</strong>{" "}
                    {product.dimensions || "Refer to custom options"}
                  </p>
                  <p>
                    Seeking a bespoke size to fit a specific wall niche or gallery collection?
                    Submit your request via our Custom Order atelier.
                  </p>
                </div>
              )}

              {activeTab === "care" && (
                <div className="space-y-2">
                  <p>&bull; Keep sheltered from direct prolonged water contact and persistent unfiltered ultraviolet sunlight.</p>
                  <p>&bull; For framed works, wipe the exterior glass gently using an optical-grade microfiber cloth.</p>
                  <p>&bull; For seashell decor and 3D textured canvases, gently remove dust with a soft bristle brush.</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Pieces */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <div className="text-center mb-10">
                <span className="editorial-tag text-[10px] text-[#4C1513] tracking-[0.3em] uppercase block mb-1">
                  Atelier Curation
                </span>
                <h2 className="editorial-title text-3xl font-bold text-[#4C1513]">
                  Complementary Creations
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    className="luxury-card rounded-[28px] overflow-hidden flex flex-col justify-between group"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#E6DCCB]">
                      <Image
                        src={rel.images[0]}
                        alt={rel.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between text-left">
                      <div>
                        <span className="editorial-tag text-[9px] text-[#4C1513]">
                          {rel.category}
                        </span>
                        <Link href={`/shop/${rel.categorySlug}/${rel.slug}`}>
                          <h3 className="font-serif text-lg font-bold text-[#4C1513] hover:text-[#702026] transition-colors mt-1">
                            {rel.name}
                          </h3>
                        </Link>
                      </div>
                      <div className="pt-4 mt-4 border-t border-[#EBB4BF]/30 flex items-center justify-between">
                        <span className="font-serif text-xl font-bold text-[#3E000C]">
                          ₹{rel.price.toLocaleString("en-IN")}
                        </span>
                        <Link
                          href={`/shop/${rel.categorySlug}/${rel.slug}`}
                          className="text-xs font-bold uppercase tracking-wider text-[#4C1513] hover:text-[#702026]"
                        >
                          View &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
