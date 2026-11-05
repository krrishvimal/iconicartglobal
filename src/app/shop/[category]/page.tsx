"use client";

import { use, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  ArrowRight,
  SlidersHorizontal,
  ChevronRight,
  Heart,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";
import { productCategories, products } from "@/lib/constants";
import { useCart } from "@/hooks/useCart";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default function CategoryPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F3ECE0] flex items-center justify-center pt-32 pb-20">
          <div className="w-8 h-8 border-2 border-[#4C1513] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}

function CategoryContent({ params }: PageProps) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.category;
  const { addItem } = useCart();

  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [addedId, setAddedId] = useState<string | null>(null);

  const currentCategory = productCategories.find(
    (c) => c.slug === categorySlug
  ) || {
    name: categorySlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    description: "Explore our collection of handcrafted creations.",
    image: "/images/products/dot_mandala_art.webp",
    productCount: 0,
  };

  const categoryProducts = products.filter(
    (p) => p.categorySlug === categorySlug
  );

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const handleQuickAdd = (product: (typeof products)[0], e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F3ECE0] text-[#2A1817]">
      {/* Category Hero Banner */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-[#EBB4BF]/40">
        <div className="absolute inset-0">
          <Image
            src={currentCategory.image}
            alt={currentCategory.name}
            fill
            unoptimized
            className="object-cover scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#200407] via-[#3E000C]/85 to-[#3E000C]/70" />
        <div className="absolute inset-0 bg-pattern opacity-20 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#EBB4BF] mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/shop" className="hover:text-white transition-colors">
              Art Shop
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#F8DE7E] font-medium">{currentCategory.name}</span>
          </nav>

          <span className="editorial-tag text-[10px] text-[#F8DE7E] tracking-[0.3em] uppercase block mb-3">
            Atelier Collection &bull; Rinki Verma
          </span>

          <h1 className="editorial-title text-3xl sm:text-5xl lg:text-6xl font-bold text-[#F3ECE0] tracking-tight">
            {currentCategory.name}
          </h1>

          <p className="mt-4 text-[#EBB4BF] text-sm sm:text-base max-w-2xl font-light leading-relaxed">
            {currentCategory.description}
          </p>

          <div className="mt-6 flex items-center gap-4 text-xs text-[#F3ECE0]/80">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-[#D4A853]/50">
              {categoryProducts.length} Exclusive Creations
            </span>
            <span className="flex items-center gap-1.5 text-[#F8DE7E]">
              <Sparkles className="w-3.5 h-3.5" />
              Bespoke Customization Available
            </span>
          </div>
        </div>
      </section>

      {/* Sorting & Filter Bar */}
      <section className="bg-white/90 backdrop-blur-md border-b border-[#EBB4BF]/40 py-4 sticky top-[68px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-xs text-[#525050]">
            Showing <strong className="text-[#4C1513]">{sortedProducts.length}</strong> creations
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#525050] hidden sm:inline">Sort Collection:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#EBB4BF] text-xs text-[#4C1513] focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-base text-[#525050]">No creations found in this collection currently.</p>
            <Link
              href="/custom-order"
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4C1513] text-white text-xs font-bold uppercase tracking-widest"
            >
              Request a Bespoke Commission &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
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

                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.customizable && (
                        <span className="sky-badge px-3 py-1 rounded-full text-[9px] shadow">
                          Customizable
                        </span>
                      )}
                    </div>

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

                    <h3 className="font-serif text-xl font-bold text-[#4C1513] group-hover:text-[#702026] transition-colors">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-xs text-[#525050] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-[#EBB4BF]/30 flex items-center justify-between text-[11px] text-[#525050]">
                      <span>Materials: {product.materials}</span>
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
                    <span>View Piece &amp; Personalize</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
