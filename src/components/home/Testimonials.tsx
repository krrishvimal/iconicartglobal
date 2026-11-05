"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { testimonials } from "@/lib/constants";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const testimonial = testimonials[current];

  return (
    <section className="bg-[#FAF7F2] py-20 sm:py-28 border-b border-black/[0.06] relative select-none">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. TOP META & MONUMENTAL SPENCER GABOR-STYLE HEADER
            ========================================================================= */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4A853] font-bold">
            COMMUNITY REVIEWS &bull; 500+ HAPPY PARTICIPANTS
          </p>

          <h2 className="font-sans font-black tracking-[-0.015em] text-4xl sm:text-6xl md:text-7xl uppercase text-[#3E000C] leading-[1.05] mt-2">
            Reviews <span className="inline-block mx-1 sm:mx-2 font-medium">&amp;</span> Experiences
          </h2>
        </div>

        {/* =========================================================================
            2. SPENCER GABOR-STYLE SQUIRCLE REVIEW PLACARD
            ========================================================================= */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#3E000C] border border-black/[0.08] shadow-md transition-all hover:bg-[#3E000C] hover:text-[#F8DE7E] cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-3 sm:translate-x-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#3E000C] border border-black/[0.08] shadow-md transition-all hover:bg-[#3E000C] hover:text-[#F8DE7E] cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Testimonial Card */}
          <div className="mx-auto max-w-3xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="rounded-[36px] bg-white p-8 sm:p-14 border border-black/[0.04] shadow-[0_16px_40px_rgba(40,10,15,0.08)] text-center relative"
              >
                {/* 5-Star Rating */}
                <div className="flex items-center justify-center gap-1.5 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#F8DE7E] text-[#D4A853]"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-serif text-lg sm:text-2xl text-[#3E000C] font-bold leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author Info */}
                <div className="mt-8 pt-6 border-t border-black/[0.06] flex flex-col items-center justify-center">
                  <h4 className="font-serif text-base font-bold text-[#3E000C]">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-[#525050] font-mono tracking-wider uppercase mt-0.5">
                    {testimonial.role}{testimonial.location ? ` \u2022 ${testimonial.location}` : ""}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  current === i ? "w-8 bg-[#3E000C]" : "w-2 bg-black/15 hover:bg-black/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}