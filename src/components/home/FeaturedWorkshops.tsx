"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Users, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { workshops } from "@/lib/constants";

const featuredWorkshops = workshops.filter((w) => w.featured);

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

export default function FeaturedWorkshops() {
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
            Chapter II • Immersive Masterclasses
          </span>
          <h2 className="editorial-title text-3xl sm:text-5xl font-bold text-[#4C1513] tracking-tight">
            Curated Atelier{" "}
            <span className="italic font-serif font-normal text-[#702026]">
              Workshops
            </span>
          </h2>
          <p className="mx-auto mt-4 text-sm sm:text-base text-[#525050] leading-relaxed">
            Intimate, hands-on learning experiences designed for both beginners and experienced
            creatives. Every participant leaves with a finished, museum-grade artwork and lifelong skills.
          </p>
        </motion.div>

        {/* Workshop Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredWorkshops.map((workshop, i) => (
            <motion.div
              key={workshop.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={cardVariants}
              className="group luxury-card rounded-3xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Artwork Window */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F3ECE0]">
                  <Image
                    src={workshop.image}
                    alt={workshop.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3E000C]/70 via-transparent to-transparent pointer-events-none" />

                  {/* Badges */}
                  <span className="absolute top-4 left-4 rounded-full bg-[#EBB4BF] px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4C1513] shadow">
                    {workshop.category}
                  </span>
                  <span className="absolute top-4 right-4 rounded-full bg-[#A2C0DD] px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#1A344E] shadow">
                    {workshop.format}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 text-left">
                  <h3 className="font-serif text-lg font-bold text-[#4C1513] line-clamp-2 leading-snug group-hover:text-[#702026] transition-colors">
                    {workshop.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#525050] line-clamp-2 leading-relaxed">
                    {workshop.shortDescription}
                  </p>

                  {/* Metadata Pills */}
                  <div className="mt-4 pt-4 border-t border-[#EBB4BF]/30 flex items-center justify-between text-[11px] text-[#525050]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#4C1513]" /> {workshop.duration}
                    </span>
                    <span className="font-serif font-bold text-[#4C1513] text-xs">
                      {workshop.price}
                    </span>
                  </div>

                  <div className="mt-3 text-[11px] text-[#525050] flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D8A4E]" />
                    <span>All archival materials provided</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <Link
                  href={`/workshops?category=${workshop.categorySlug}`}
                  className="w-full py-3 rounded-2xl bg-[#F3ECE0] group-hover:bg-[#4C1513] text-[#4C1513] group-hover:text-white border border-[#EBB4BF] text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                >
                  <span>Reserve Atelier Seat</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-[#4C1513] text-[#4C1513] hover:text-white border border-[#D4A853] shadow-md text-xs font-bold uppercase tracking-[0.2em] transition-all group"
          >
            <span>View All 10+ Masterclass Formats</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4A853]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
