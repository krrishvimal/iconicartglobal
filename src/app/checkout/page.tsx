"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  MessageCircle,
  Crown,
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { brandInfo } from "@/lib/constants";
import { adminStore } from "@/lib/adminStore";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, subtotal, shipping, total, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Delhi",
    pincode: "",
    notes: "",
    paymentMethod: "upi",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate Razorpay payment processing
    setTimeout(() => {
      const generatedId = `IAG-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      
      // Persist to Admin Orders
      adminStore.addOrder({
        id: generatedId,
        createdAt: new Date().toISOString(),
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        shippingAddress: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        items: items.map((item) => ({
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          customizations: item.customizations,
        })),
        subtotal,
        shipping,
        total,
        paymentStatus: "Paid (Simulated Razorpay)",
        orderStatus: "New",
      });

      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#F3ECE0] pt-36 pb-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[32px] border border-[#D4A853]/40 shadow-2xl p-8 sm:p-14 max-w-xl w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#D4A853] text-[#4C1513] flex items-center justify-center mx-auto mb-6 shadow">
            <CheckCircle2 className="w-10 h-10 text-[#D4A853]" />
          </div>

          <span className="editorial-tag text-[10px] text-[#4C1513] font-bold tracking-[0.3em] uppercase block mb-1">
            Order Confirmed &bull; Atelier Registry
          </span>
          <h1 className="editorial-title text-3xl font-bold text-[#4C1513] mb-2">
            Thank You, {formData.name}!
          </h1>
          <p className="text-xs font-semibold text-[#525050] uppercase tracking-wider mb-4">
            Atelier Reference:{" "}
            <span className="text-[#3E000C] font-mono font-bold">{orderId}</span>
          </p>

          <p className="text-[#525050] text-sm leading-relaxed mb-6 font-light">
            We have registered your order and personal crafting specifications.
            Founder Rinki Verma will personally review your piece before beginning production.
          </p>

          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EBB4BF]/50 text-left text-xs space-y-2 mb-8">
            <p className="editorial-tag text-[9px] text-[#4C1513]">
              Archival Delivery Destination:
            </p>
            <p className="text-[#4C1513] font-medium">
              {formData.address}, {formData.city}, {formData.state} – {formData.pincode}
            </p>
            <p className="text-[#525050] text-[11px]">
              Insured Transit Time: 5–7 business days pan-India
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#4C1513] hover:bg-[#3E000C] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg transition-all"
            >
              Return to Atelier
            </Link>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Hello Rinki! I just placed order ${orderId} on Iconic Art Global. Excited to see the handcrafted piece!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#D4A853]/60 text-[#4C1513] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#FAF7F2] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Notify on WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F3ECE0] pt-36 pb-20 flex items-center justify-center text-center px-4">
        <div className="p-10 max-w-md w-full bg-white rounded-[32px] border border-[#D4A853]/30 shadow-md">
          <ShoppingBag className="w-12 h-12 text-[#4C1513] mx-auto mb-4" />
          <h2 className="editorial-title text-2xl font-bold text-[#4C1513] mb-2">
            No Creations in Checkout
          </h2>
          <p className="text-xs text-[#525050] mb-6">
            Please add an artwork or handmade item to your cart before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="px-8 py-3.5 bg-[#4C1513] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-md inline-block"
          >
            Go to Art Shop &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3ECE0] text-[#2A1817]">
      {/* Checkout Header */}
      <section className="relative pt-36 pb-12 bg-white/70 border-b border-[#EBB4BF]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="editorial-tag text-[10px] text-[#4C1513] tracking-[0.3em] uppercase block mb-1">
                Secure Archival Checkout
              </span>
              <h1 className="editorial-title text-3xl font-bold text-[#4C1513]">
                Acquire Your Handcrafted Order
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#525050]">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>256-Bit Encrypted Atelier Checkout</span>
            </div>
          </div>

          {/* Stepper Bar */}
          <div className="flex items-center gap-3 sm:gap-6 mt-8">
            {[
              { num: 1, label: "Client Info" },
              { num: 2, label: "Archival Delivery" },
              { num: 3, label: "Payment & Review" },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step >= s.num
                      ? "bg-[#4C1513] text-white"
                      : "bg-[#FAF7F2] text-[#525050] border border-[#EBB4BF]"
                  }`}
                >
                  {s.num}
                </div>
                <span
                  className={`editorial-tag text-[10px] hidden sm:inline ${
                    step >= s.num ? "text-[#4C1513]" : "text-[#525050]"
                  }`}
                >
                  {s.label}
                </span>
                {s.num < 3 && (
                  <div className="w-8 sm:w-16 h-0.5 bg-[#EBB4BF]/50 mx-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form & Summary Container */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form Steps Column (7 Columns) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[32px] border border-[#D4A853]/30 shadow-sm p-8 sm:p-10 text-left">
                {step === 1 && (
                  <form onSubmit={handleNext} className="space-y-6">
                    <div>
                      <h2 className="editorial-title text-2xl font-bold text-[#4C1513]">
                        Step 1: Your Contact Information
                      </h2>
                      <p className="text-[#525050] text-xs mt-1">
                        We will transmit crafting progress updates and courier tracking directly to this address.
                      </p>
                    </div>

                    <div>
                      <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                        Client Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="priya@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                        />
                      </div>

                      <div>
                        <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                          WhatsApp Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#4C1513] hover:bg-[#3E000C] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <span>Continue to Delivery Destination</span>
                      <ArrowRight className="w-4 h-4 text-[#EBB4BF]" />
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleNext} className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="editorial-title text-2xl font-bold text-[#4C1513]">
                        Step 2: Shipping Destination
                      </h2>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="editorial-tag text-[10px] text-[#525050] hover:text-[#4C1513] flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>
                    </div>

                    <div>
                      <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                        Flat / House No., Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g. Flat 402, Lotus Court, MG Road"
                        className="w-full px-4 py-3 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. New Delhi"
                          className="w-full px-4 py-3 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                        />
                      </div>

                      <div>
                        <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                          State *
                        </label>
                        <select
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                        >
                          <option>Delhi</option>
                          <option>Maharashtra</option>
                          <option>Karnataka</option>
                          <option>Uttar Pradesh</option>
                          <option>Haryana</option>
                          <option>Tamil Nadu</option>
                          <option>Gujarat</option>
                          <option>Rajasthan</option>
                          <option>West Bengal</option>
                          <option>Punjab</option>
                          <option>Other State</option>
                        </select>
                      </div>

                      <div>
                        <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          placeholder="110001"
                          className="w-full px-4 py-3 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="editorial-tag text-[10px] text-[#4C1513] block mb-1.5">
                        Archival Packaging or Delivery Notes (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="e.g. Gift wrap with personalized note, leave with reception, etc."
                        className="w-full px-4 py-3 rounded-xl border border-[#EBB4BF]/70 bg-[#FAF7F2] text-xs text-[#4C1513] focus:outline-none focus:border-[#4C1513]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#4C1513] hover:bg-[#3E000C] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <span>Continue to Payment &amp; Review</span>
                      <ArrowRight className="w-4 h-4 text-[#EBB4BF]" />
                    </button>
                  </form>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="editorial-title text-2xl font-bold text-[#4C1513]">
                        Step 3: Review &amp; Payment
                      </h2>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="editorial-tag text-[10px] text-[#525050] hover:text-[#4C1513] flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EBB4BF]/50 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="editorial-tag text-[9px] text-[#4C1513]">Client:</span>
                        <span className="text-[#4C1513] font-medium">
                          {formData.name} ({formData.phone})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="editorial-tag text-[9px] text-[#4C1513]">Ship To:</span>
                        <span className="text-right text-[#4C1513]">
                          {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="editorial-tag text-[10px] text-[#4C1513] block mb-3">
                        Choose Payment Protocol
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-4 rounded-2xl border-2 border-[#4C1513] bg-[#FAF7F2] cursor-pointer">
                          <input
                            type="radio"
                            name="payment"
                            defaultChecked
                            className="accent-[#4C1513]"
                          />
                          <div className="flex-1">
                            <p className="text-xs font-bold text-[#4C1513]">
                              Razorpay (UPI, Google Pay, PhonePe, Cards)
                            </p>
                            <p className="text-[10px] text-[#525050]">
                              Instant pan-India payment gateway support
                            </p>
                          </div>
                          <span className="butter-badge px-2.5 py-0.5 rounded-full text-[9px]">
                            Recommended
                          </span>
                        </label>

                        <label className="flex items-center gap-3 p-4 rounded-2xl border border-[#EBB4BF] hover:bg-[#FAF7F2] cursor-pointer">
                          <input
                            type="radio"
                            name="payment"
                            className="accent-[#4C1513]"
                          />
                          <div className="flex-1">
                            <p className="text-xs font-bold text-[#4C1513]">
                              Direct Atelier Bank Transfer / NEFT
                            </p>
                            <p className="text-[10px] text-[#525050]">
                              Share transfer receipt directly with studio on WhatsApp
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full py-4 bg-[#4C1513] hover:bg-[#3E000C] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-full shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing Razorpay Transaction...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-[#F8DE7E]" />
                          <span>Pay ₹{total.toLocaleString("en-IN")} &bull; Complete Acquisition</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Summary Column (5 Columns) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-[32px] border border-[#D4A853]/40 shadow-xl p-6 sm:p-8 sticky top-28 space-y-6 text-left">
                <h3 className="editorial-title text-xl font-bold text-[#4C1513] pb-4 border-b border-[#EBB4BF]/40">
                  Acquisition Breakdown ({totalItems} items)
                </h3>

                <div className="divide-y divide-[#EBB4BF]/30 max-h-72 overflow-y-auto pr-2">
                  {items.map((item, idx) => (
                    <div key={idx} className="py-3 flex gap-3">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#E6DCCB] shrink-0 border border-[#D4A853]/30">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-xs">
                        <p className="font-bold text-[#4C1513]">{item.product.name}</p>
                        <p className="text-[#525050]">Qty: {item.quantity}</p>
                        {item.customizations &&
                          Object.keys(item.customizations).length > 0 && (
                            <p className="text-[10px] text-[#702026] italic">
                              Bespoke Personalized ✓
                            </p>
                          )}
                        <p className="font-serif font-bold text-[#3E000C] mt-0.5">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs pt-4 border-t border-[#EBB4BF]/40">
                  <div className="flex justify-between text-[#525050]">
                    <span>Items Subtotal:</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[#525050]">
                    <span>Archival Shipping:</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#4C1513] pt-3 border-t border-[#EBB4BF]/40">
                    <span>Total Investment:</span>
                    <span className="font-serif text-xl font-extrabold text-[#3E000C]">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
