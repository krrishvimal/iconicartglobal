"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Brush, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import { brandInfo } from "@/lib/constants";

export default function CustomOrderCTA() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#4C1513] text-white">
      {/* Decorative colored glow spots from reference palette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-[#EBB4BF]/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#A2C0DD]/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#F8DE7E]/10 blur-3xl" />
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(235,180,191,0.08)_1px,transparent_0)] bg-[length:40px_40px]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#3E000C] border-2 border-[#EBB4BF]/40 shadow-xl"
        >
          <Brush className="h-9 w-9 text-[#EBB4BF]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-3"
        >
          <Sparkles className="h-4 w-4 text-[#F8DE7E]" />
          <span className="font-serif text-xs font-bold uppercase tracking-[0.25em] text-[#EBB4BF]">
            Bespoke Creations Atelier
          </span>
          <Sparkles className="h-4 w-4 text-[#F8DE7E]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-serif text-3xl font-extrabold text-[#F3ECE0] sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
        >
          Have a Unique Vision in Mind?
          <span className="block italic font-cursive text-4xl sm:text-5xl md:text-6xl text-[#EBB4BF] mt-2">
            Let Us Handcraft It For You
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-[#F3ECE0]/85 leading-relaxed font-light"
        >
          From bespoke mandala artworks and commissioned portraits to customized
          seashell nameplates and everlasting satin bouquets — we turn your cherished
          memories into one-of-a-kind art pieces.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs"
        >
          <span className="rounded-full bg-[#EBB4BF]/20 border border-[#EBB4BF]/40 px-4 py-2 font-semibold text-[#EBB4BF]">
            Custom Sizes & Frames
          </span>
          <span className="rounded-full bg-[#A2C0DD]/20 border border-[#A2C0DD]/40 px-4 py-2 font-semibold text-[#A2C0DD]">
            Personalized Names & Quotes
          </span>
          <span className="rounded-full bg-[#F8DE7E]/20 border border-[#F8DE7E]/40 px-4 py-2 font-semibold text-[#F8DE7E]">
            Pan-India Safe Delivery
          </span>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/custom-order"
            className="group inline-flex items-center gap-2 rounded-full bg-[#EBB4BF] hover:bg-white px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-[#4C1513] shadow-xl hover:scale-105 transition-all"
          >
            Request Custom Order
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={brandInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#EBB4BF]/60 hover:bg-[#EBB4BF]/20 px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-[#F3ECE0] backdrop-blur-sm transition-all hover:scale-105"
          >
            <MessageCircle className="h-4 w-4 text-[#25D366]" />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
