"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, GlassWater } from "lucide-react";
import { eventTypes } from "@/lib/constants";

export default function EventsSection() {
  const featuredEvents = eventTypes.slice(0, 4);

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
            Chapter IV • Private Soirées &amp; Art Experiences
          </span>
          <h2 className="editorial-title text-3xl sm:text-5xl font-bold text-[#4C1513] tracking-tight">
            Celebrate With{" "}
            <span className="italic font-serif font-normal text-[#702026]">
              Creative Art
            </span>
          </h2>
          <p className="mx-auto mt-4 text-sm sm:text-base text-[#525050] leading-relaxed">
            From chic Bachelorette paint &amp; sip soirées 🪩 to high-society kitty parties and
            impactful corporate retreats. We bring our mobile art atelier directly to your private venue.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link
                href={`/events#${event.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl luxury-card"
              >
                {/* Background Image */}
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />

                {/* Haute Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E000C]/90 via-[#4C1513]/40 to-transparent transition-opacity duration-300" />

                {/* Top Badge */}
                <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold text-[#4C1513] shadow">
                  {event.icon} Private Experience
                </span>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-white text-left">
                  <h3 className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-[#F8DE7E] transition-colors">
                    {event.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#F3ECE0]/90 line-clamp-2 leading-relaxed">
                    {event.shortDescription}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-bold tracking-wider uppercase text-[#EBB4BF]">
                    <span>Inquire Packages</span>
                    <ArrowRight className="w-4 h-4 text-[#F8DE7E] group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Events */}
        <div className="mt-14 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-[#4C1513] text-[#4C1513] hover:text-white border border-[#D4A853] shadow-md text-xs font-bold uppercase tracking-[0.2em] transition-all group"
          >
            <span>Explore All 7 Art Party Experiences</span>
            <ArrowRight className="w-4 h-4 text-[#D4A853] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
