"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, CheckCircle, Sparkles } from "lucide-react";
import { brandInfo } from "@/lib/constants";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="bg-[#FAF7F2] py-20 sm:py-28 relative select-none">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Squircle Invitation Card */}
        <div className="relative overflow-hidden rounded-[36px] bg-[#3E000C] text-white p-8 sm:p-14 lg:p-16 shadow-[0_24px_60px_rgba(40,10,15,0.25)] border border-black/[0.08] text-center">
          
          <div className="relative max-w-2xl mx-auto space-y-4">
            
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#F8DE7E] font-bold">
              STAY CONNECTED &bull; WORKSHOP ALERTS &amp; NEW ART DROPS
            </p>

            <h2 className="font-sans font-black tracking-[-0.04em] text-3xl sm:text-5xl uppercase text-white leading-tight">
              Join Our Art Community
            </h2>

            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed font-normal max-w-lg mx-auto pt-1">
              Be the first to reserve seats for upcoming physical masterclasses, secret one-of-one art drops,
              and private salon dates curated personally by Rinki Verma.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="pt-4 flex flex-col sm:flex-row gap-2.5 max-w-lg mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#F8DE7E] backdrop-blur-md"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-[#FAF7F2] hover:bg-[#F8DE7E] text-[#3E000C] text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {submitted && (
              <p className="pt-2 text-xs font-bold text-[#F8DE7E] flex items-center justify-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#F8DE7E]" />
                <span>Thank you. You have been added to our private atelier registry.</span>
              </p>
            )}

            {/* Direct WhatsApp link */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-3 text-xs text-[#FAF7F2]/80">
              <span>Prefer immediate private dialogue?</span>
              <a
                href="https://wa.me/?text=Hello%20Rinki!%20I'm%20reaching%20out%20from%20Iconic%20Art%20Global."
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#F8DE7E] underline underline-offset-4 hover:text-white flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Rinki Directly</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}