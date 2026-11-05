"use client";

import { AdminOrder, AdminEnquiry, AdminSettings } from "@/types/admin";
import { products as initialProducts, workshops as initialWorkshops } from "./constants";
import { Product, Workshop } from "@/types";

const ORDERS_KEY = "iconic_admin_orders";
const ENQUIRIES_KEY = "iconic_admin_enquiries";
const PRODUCTS_KEY = "iconic_admin_products";
const WORKSHOPS_KEY = "iconic_admin_workshops";
const SETTINGS_KEY = "iconic_admin_settings";
const AUTH_KEY = "iconic_admin_auth";

// Initial seed orders
const seedOrders: AdminOrder[] = [
  {
    id: "IAG-894201",
    createdAt: "2026-11-02T14:30:00Z",
    customerName: "Ananya Deshmukh",
    customerEmail: "ananya.d@gmail.com",
    customerPhone: "+91 98201 44552",
    shippingAddress: "Flat 402, Royale Palms, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    items: [
      {
        productName: "Golden Aura Sacred Mandala Canvas",
        quantity: 1,
        price: 3499,
        customizations: {
          "Select Diameter / Size": "16 x 16 inches",
          "Color Palette Style": "Rich Burgundy & Metallic Gold",
          "Center Inscription / Name": "AUM & Shanti",
        },
      },
    ],
    subtotal: 3499,
    shipping: 0,
    total: 3499,
    paymentStatus: "Paid (Razorpay)",
    orderStatus: "In Crafting",
  },
  {
    id: "IAG-772914",
    createdAt: "2026-11-01T11:15:00Z",
    customerName: "Vikram Malhotra",
    customerEmail: "vikram.m@corporatemail.com",
    customerPhone: "+91 99100 88219",
    shippingAddress: "Tower B, DLF Cyber City, Sector 24",
    city: "Gurugram",
    state: "Haryana",
    pincode: "122002",
    items: [
      {
        productName: "Personalized Memory Keepsake Frame",
        quantity: 2,
        price: 1899,
        customizations: {
          "Frame Finish / Wood": "Classic Teak Brown",
          "Engraved Message": "Anniversary Cheers 2026",
        },
      },
      {
        productName: "Forever Bloom Rose Bouquet",
        quantity: 1,
        price: 2199,
        customizations: {
          "Flower Colors": "Blush Candy Pink & Cream",
        },
      },
    ],
    subtotal: 5997,
    shipping: 0,
    total: 5997,
    paymentStatus: "Paid (Razorpay)",
    orderStatus: "Ready for Dispatch",
  },
  {
    id: "IAG-651088",
    createdAt: "2026-10-31T18:40:00Z",
    customerName: "Meera Sen",
    customerEmail: "meera.sen@outlook.com",
    customerPhone: "+91 97482 11094",
    shippingAddress: "14/A Ballygunge Place",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700019",
    items: [
      {
        productName: "Ocean Harmony Seashell Wall Mirror",
        quantity: 1,
        price: 4299,
        customizations: {
          "Mirror Diameter": "18 inches round",
          "Shell Accents": "Cowrie & Pearlized Conches",
        },
      },
    ],
    subtotal: 4299,
    shipping: 250,
    total: 4549,
    paymentStatus: "Paid (Razorpay)",
    orderStatus: "Delivered",
  },
];

// Initial seed enquiries
const seedEnquiries: AdminEnquiry[] = [
  {
    id: "ENQ-104",
    createdAt: "2026-11-02T16:10:00Z",
    name: "Dr. Radhika Nair",
    email: "radhika.nair@apollo.org",
    phone: "+91 98450 77123",
    type: "Workshop Booking",
    subject: "Private Art Healing Workshop for 12 Doctors",
    category: "Adults Offline",
    budget: "₹25,000 - ₹35,000",
    deadline: "15th November 2026",
    message: "Looking for an exclusive offline stress-relief watercolor & fluid art session for our hospital team in Indiranagar.",
    status: "New",
  },
  {
    id: "ENQ-103",
    createdAt: "2026-11-01T20:05:00Z",
    name: "Sanjana & Friends",
    email: "sanjana.kapoor@gmail.com",
    phone: "+91 98112 33490",
    type: "Private Event",
    subject: "Bachelorette Art & Wine Evening 🪩",
    category: "Bachelorette Party",
    budget: "₹20,000",
    deadline: "28th November 2026",
    message: "We want a fun bachelorette party with painting canvases, glitter, cocktails, and music! Can Rinki come host at our Airbnb in Goa?",
    status: "Contacted",
  },
  {
    id: "ENQ-102",
    createdAt: "2026-10-30T10:00:00Z",
    name: "Deloitte People Team",
    email: "events@deloitte-talent.com",
    phone: "+91 99881 22340",
    type: "Private Event",
    subject: "Corporate Team Building Art Session (45 employees)",
    category: "Corporate Events",
    budget: "₹60,000",
    deadline: "5th December 2026",
    message: "End-of-year team celebration and creative collaboration workshop. Hybrid or in-person.",
    status: "Quoted",
  },
];

const seedSettings: AdminSettings = {
  brandName: "Iconic Art Global",
  founderName: "Rinki Verma",
  email: "iconicartglobal@gmail.com",
  phone: "+91 99999 99999",
  instagram: "https://www.instagram.com/iconic.art.global",
  youtube: "https://www.youtube.com/@iconic.art.global",
  workshopsCount: "40+",
  communityCount: "17.1K+",
  freeShippingThreshold: 5000,
};

export const adminStore = {
  // --- Orders ---
  getOrders(): AdminOrder[] {
    if (typeof window === "undefined") return seedOrders;
    const stored = localStorage.getItem(ORDERS_KEY);
    if (!stored) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(seedOrders));
      return seedOrders;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return seedOrders;
    }
  },

  addOrder(order: AdminOrder) {
    const orders = this.getOrders();
    const updated = [order, ...orders];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return updated;
  },

  updateOrderStatus(orderId: string, status: AdminOrder["orderStatus"]) {
    const orders = this.getOrders();
    const updated = orders.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o));
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteOrder(orderId: string) {
    const orders = this.getOrders();
    const updated = orders.filter((o) => o.id !== orderId);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return updated;
  },

  // --- Enquiries ---
  getEnquiries(): AdminEnquiry[] {
    if (typeof window === "undefined") return seedEnquiries;
    const stored = localStorage.getItem(ENQUIRIES_KEY);
    if (!stored) {
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(seedEnquiries));
      return seedEnquiries;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return seedEnquiries;
    }
  },

  addEnquiry(enquiry: AdminEnquiry) {
    const list = this.getEnquiries();
    const updated = [enquiry, ...list];
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated));
    return updated;
  },

  updateEnquiryStatus(id: string, status: AdminEnquiry["status"]) {
    const list = this.getEnquiries();
    const updated = list.map((e) => (e.id === id ? { ...e, status } : e));
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteEnquiry(id: string) {
    const list = this.getEnquiries();
    const updated = list.filter((e) => e.id !== id);
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated));
    return updated;
  },

  // --- Products ---
  getProducts(): Product[] {
    if (typeof window === "undefined") return initialProducts;
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (!stored) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
      return initialProducts;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialProducts;
    }
  },

  saveProducts(prods: Product[]) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(prods));
  },

  addProduct(prod: Product) {
    const prods = this.getProducts();
    const updated = [prod, ...prods];
    this.saveProducts(updated);
    return updated;
  },

  updateProduct(prod: Product) {
    const prods = this.getProducts();
    const updated = prods.map((p) => (p.id === prod.id ? prod : p));
    this.saveProducts(updated);
    return updated;
  },

  deleteProduct(id: string) {
    const prods = this.getProducts();
    const updated = prods.filter((p) => p.id !== id);
    this.saveProducts(updated);
    return updated;
  },

  // --- Workshops ---
  getWorkshops(): Workshop[] {
    if (typeof window === "undefined") return initialWorkshops;
    const stored = localStorage.getItem(WORKSHOPS_KEY);
    if (!stored) {
      localStorage.setItem(WORKSHOPS_KEY, JSON.stringify(initialWorkshops));
      return initialWorkshops;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return initialWorkshops;
    }
  },

  saveWorkshops(shops: Workshop[]) {
    localStorage.setItem(WORKSHOPS_KEY, JSON.stringify(shops));
  },

  addWorkshop(shop: Workshop) {
    const shops = this.getWorkshops();
    const updated = [shop, ...shops];
    this.saveWorkshops(updated);
    return updated;
  },

  updateWorkshop(shop: Workshop) {
    const shops = this.getWorkshops();
    const updated = shops.map((w) => (w.id === shop.id ? shop : w));
    this.saveWorkshops(updated);
    return updated;
  },

  deleteWorkshop(id: string) {
    const shops = this.getWorkshops();
    const updated = shops.filter((w) => w.id !== id);
    this.saveWorkshops(updated);
    return updated;
  },

  // --- Settings ---
  getSettings(): AdminSettings {
    if (typeof window === "undefined") return seedSettings;
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(seedSettings));
      return seedSettings;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return seedSettings;
    }
  },

  saveSettings(settings: AdminSettings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  // --- Auth Session ---
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(AUTH_KEY) === "true";
  },

  login(pin: string): boolean {
    if (pin === "2026" || pin === "iconic" || pin === "admin") {
      localStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_KEY);
    }
  },
};
