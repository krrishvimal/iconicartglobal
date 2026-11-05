"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Sparkles,
  ShoppingBag,
  Calendar,
  Users,
  Inbox,
  Settings,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  ExternalLink,
  Lock,
  LogOut,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  MessageCircle,
  ChevronRight,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { adminStore } from "@/lib/adminStore";
import { AdminOrder, AdminEnquiry, AdminSettings } from "@/types/admin";
import { Product, Workshop } from "@/types";
import { productCategories, workshopCategories } from "@/lib/constants";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "workshops" | "orders" | "enquiries" | "gallery" | "settings"
  >("overview");

  // Live state from adminStore
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [enquiries, setEnquiries] = useState<AdminEnquiry[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [workshopsList, setWorkshopsList] = useState<Workshop[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(adminStore.getSettings());

  // Search & Filter state
  const [productSearch, setProductSearch] = useState("");
  const [selectedProductCategory, setSelectedProductCategory] = useState("all");
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [enquiryFilter, setEnquiryFilter] = useState<string>("all");

  // Modals state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddWorkshopModal, setShowAddWorkshopModal] = useState(false);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<AdminOrder | null>(null);

  // New product form
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Mandala Art",
    price: 1999,
    originalPrice: 2499,
    shortDescription: "",
    description: "",
    materials: "Premium Archival Canvas, Acrylic Inks",
    dimensions: "12 × 12 inches",
    prepTime: "2-4 business days",
    image: "/images/products/dot_mandala_art.webp",
    customizable: true,
  });

  // New workshop form
  const [newWorkshop, setNewWorkshop] = useState({
    title: "",
    category: "Adults",
    categorySlug: "adults",
    format: "Offline",
    duration: "2-3 hours",
    ageGroup: "16+",
    price: "Starting from ₹1,800",
    description: "",
    image: "/images/instagram/upits_exhibition.jpg",
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(adminStore.isAuthenticated());
      loadData();
    }
  }, []);

  const loadData = () => {
    setOrders(adminStore.getOrders());
    setEnquiries(adminStore.getEnquiries());
    setProductsList(adminStore.getProducts());
    setWorkshopsList(adminStore.getWorkshops());
    setSettings(adminStore.getSettings());
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (adminStore.login(pinInput)) {
      setIsAuthenticated(true);
      setLoginError("");
      loadData();
    } else {
      setLoginError("Invalid Studio PIN. Try 2026 or iconic.");
    }
  };

  const handleQuickDemoLogin = () => {
    adminStore.login("2026");
    setIsAuthenticated(true);
    setLoginError("");
    loadData();
  };

  const handleLogout = () => {
    adminStore.logout();
    setIsAuthenticated(false);
  };

  // --- Handlers for Order Status ---
  const handleUpdateOrderStatus = (orderId: string, newStatus: AdminOrder["orderStatus"]) => {
    const updated = adminStore.updateOrderStatus(orderId, newStatus);
    setOrders(updated);
    showToast(`Order ${orderId} marked as ${newStatus}`);
  };

  // --- Handlers for Enquiry Status ---
  const handleUpdateEnquiryStatus = (id: string, newStatus: AdminEnquiry["status"]) => {
    const updated = adminStore.updateEnquiryStatus(id, newStatus);
    setEnquiries(updated);
    showToast(`Inquiry status updated to ${newStatus}`);
  };

  // --- Product CRUD ---
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const catSlug = newProduct.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      slug,
      category: newProduct.category,
      categorySlug: catSlug,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice),
      shortDescription: newProduct.shortDescription || newProduct.name,
      description: newProduct.description || newProduct.name,
      materials: newProduct.materials,
      dimensions: newProduct.dimensions,
      prepTime: newProduct.prepTime,
      images: [newProduct.image],
      customizable: newProduct.customizable,
      inStock: true,
      rating: 5.0,
      reviewCount: 1,
      featured: true,
      bestseller: false,
    };

    const updated = adminStore.addProduct(created);
    setProductsList(updated);
    setShowAddProductModal(false);
    showToast(`New artwork "${newProduct.name}" published!`);
    setNewProduct({
      name: "",
      category: "Mandala Art",
      price: 1999,
      originalPrice: 2499,
      shortDescription: "",
      description: "",
      materials: "Premium Archival Canvas, Acrylic Inks",
      dimensions: "12 × 12 inches",
      prepTime: "2-4 business days",
      image: "/images/products/dot_mandala_art.webp",
      customizable: true,
    });
  };

  const handleToggleProductStock = (prod: Product) => {
    const updated = adminStore.updateProduct({ ...prod, inStock: !prod.inStock });
    setProductsList(updated);
    showToast(`${prod.name} marked as ${!prod.inStock ? "In Stock" : "Sold Out"}`);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      const updated = adminStore.deleteProduct(id);
      setProductsList(updated);
      showToast(`Artwork deleted.`);
    }
  };

  // --- Workshop CRUD ---
  const handleCreateWorkshop = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newWorkshop.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const created: Workshop = {
      id: `ws-${Date.now()}`,
      title: newWorkshop.title,
      slug,
      category: newWorkshop.category,
      categorySlug: newWorkshop.categorySlug,
      description: newWorkshop.description || newWorkshop.title,
      shortDescription: newWorkshop.description || newWorkshop.title,
      image: newWorkshop.image,
      duration: newWorkshop.duration,
      ageGroup: newWorkshop.ageGroup,
      format: newWorkshop.format,
      materialsIncluded: true,
      price: newWorkshop.price,
      highlights: ["Expert Guided", "All Materials Provided", "Take Artwork Home"],
      featured: true,
    };

    const updated = adminStore.addWorkshop(created);
    setWorkshopsList(updated);
    setShowAddWorkshopModal(false);
    showToast(`Workshop "${newWorkshop.title}" added to schedule!`);
  };

  const handleDeleteWorkshop = (id: string, title: string) => {
    if (confirm(`Remove workshop "${title}" from schedule?`)) {
      const updated = adminStore.deleteWorkshop(id);
      setWorkshopsList(updated);
      showToast(`Workshop removed.`);
    }
  };

  // --- Save Settings ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.saveSettings(settings);
    showToast("Brand settings updated successfully!");
  };

  // Calculation metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter((o) => o.orderStatus !== "Delivered" && o.orderStatus !== "Cancelled");
  const newEnquiries = enquiries.filter((e) => e.status === "New");

  // Filtered lists
  const filteredProducts = productsList.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchCategory =
      selectedProductCategory === "all" || p.categorySlug === selectedProductCategory;
    return matchSearch && matchCategory;
  });

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === "all") return true;
    return o.orderStatus.toLowerCase() === orderFilter.toLowerCase();
  });

  const filteredEnquiries = enquiries.filter((e) => {
    if (enquiryFilter === "all") return true;
    return e.status.toLowerCase() === enquiryFilter.toLowerCase();
  });

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl border border-candy/40 shadow-2xl p-8 sm:p-10 text-center"
        >
          {/* Brand Seal */}
          <div className="w-20 h-20 rounded-full bg-rich-burgundy text-white flex items-center justify-center mx-auto mb-6 shadow-lg border-2 border-candy">
            <Palette className="w-10 h-10 text-candy" />
          </div>

          <span className="candy-badge px-4 py-1 rounded-full text-xs font-bold inline-block mb-3">
            Studio Management Portal
          </span>
          <h1 className="editorial-title text-3xl font-bold text-burgundy mb-2">
            Iconic Art Global
          </h1>
          <p className="text-slate text-sm mb-8 leading-relaxed">
            Welcome back, Rinki! Enter your Studio PIN to manage workshops,
            products, and orders.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (e.g. 2026)"
                className="w-full text-center tracking-widest text-lg font-bold px-4 py-3.5 rounded-2xl border-2 border-candy/50 focus:border-burgundy focus:outline-none transition-all"
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-xs font-bold text-red-600">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-rich-burgundy hover:bg-burgundy-dark text-white rounded-2xl font-bold text-sm tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-candy" />
              Access Studio Command
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-candy/30">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 bg-candy/20 hover:bg-candy/40 text-burgundy rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              ⚡ Instant 1-Click Demo Login (PIN: 2026)
            </button>
          </div>

          <div className="mt-6">
            <Link
              href="/"
              className="text-xs font-bold text-burgundy hover:underline flex items-center justify-center gap-1"
            >
              ← Back to Public Website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-beige flex flex-col">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-rich-burgundy text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-candy/40 flex items-center gap-3 text-sm font-bold"
          >
            <CheckCircle2 className="w-5 h-5 text-candy" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar */}
      <header className="bg-rich-burgundy text-white sticky top-0 z-40 border-b border-candy/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-candy text-burgundy flex items-center justify-center font-serif font-black text-lg shadow-inner">
              IA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-tight">
                  Iconic Art Global
                </span>
                <span className="candy-badge px-2.5 py-0.5 rounded-full text-[10px]">
                  Studio Admin
                </span>
              </div>
              <p className="text-[11px] text-candy/80 hidden sm:block">
                Founder Portal — Rinki Verma
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-candy" />
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-candy hover:text-white transition-all"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Secondary Bar with Studio Tabs */}
      <div className="bg-white border-b border-candy/30 shadow-sm sticky top-[61px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 hide-scrollbar">
            {[
              { id: "overview", label: "Dashboard", icon: TrendingUp },
              {
                id: "orders",
                label: "Orders",
                icon: ShoppingBag,
                count: activeOrders.length,
              },
              {
                id: "enquiries",
                label: "Commissions & Inquiries",
                icon: Inbox,
                count: newEnquiries.length,
              },
              {
                id: "products",
                label: "Artwork & Products",
                icon: Palette,
                count: productsList.length,
              },
              {
                id: "workshops",
                label: "Workshops",
                icon: Calendar,
                count: workshopsList.length,
              },
              { id: "gallery", label: "Gallery Media", icon: ImageIcon },
              { id: "settings", label: "Brand Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-rich-burgundy text-white shadow-sm"
                      : "text-burgundy hover:bg-candy/20"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? "text-candy" : "text-burgundy"
                    }`}
                  />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                        isActive
                          ? "bg-candy text-burgundy"
                          : "bg-candy/40 text-burgundy"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {/* ========================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Welcome banner */}
            <div className="rounded-3xl bg-rich-burgundy text-white p-6 sm:p-8 relative overflow-hidden border border-candy/30 shadow-lg">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-pattern" />
              <div className="relative z-10 max-w-2xl">
                <span className="candy-badge px-3 py-1 rounded-full text-[10px] font-bold inline-block mb-3">
                  Creative Director Overview
                </span>
                <h2 className="editorial-title text-2xl sm:text-3xl font-bold mb-2">
                  Welcome to Iconic Art Global Studio
                </h2>
                <p className="text-candy-light text-xs sm:text-sm leading-relaxed mb-6">
                  You have <span className="font-bold text-candy">{activeOrders.length} orders</span> needing
                  crafting or dispatch, and <span className="font-bold text-candy">{newEnquiries.length} new bespoke inquiries</span> awaiting consultation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowAddProductModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-candy hover:bg-white text-burgundy text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload New Artwork</span>
                  </button>
                  <button
                    onClick={() => setShowAddWorkshopModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-candy/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-candy" />
                    <span>Schedule Workshop</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-candy/30 shadow-sm">
                <span className="text-xs font-bold text-slate uppercase tracking-wider block mb-1">
                  Gross Sales
                </span>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-burgundy">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </p>
                <span className="text-[11px] text-green-700 font-bold flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3.5 h-3.5" /> Simulated Live Store
                </span>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-candy/30 shadow-sm">
                <span className="text-xs font-bold text-slate uppercase tracking-wider block mb-1">
                  Active Orders
                </span>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-burgundy">
                  {activeOrders.length}
                </p>
                <span className="text-[11px] text-slate font-bold block mt-2">
                  Total logged: {orders.length}
                </span>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-candy/30 shadow-sm">
                <span className="text-xs font-bold text-slate uppercase tracking-wider block mb-1">
                  Client Inquiries
                </span>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-burgundy">
                  {enquiries.length}
                </p>
                <span className="text-[11px] text-candy-dark font-bold block mt-2">
                  {newEnquiries.length} need reply
                </span>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-candy/30 shadow-sm">
                <span className="text-xs font-bold text-slate uppercase tracking-wider block mb-1">
                  Workshops Hosted
                </span>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-burgundy">
                  {settings.workshopsCount}
                </p>
                <span className="text-[11px] text-slate font-bold block mt-2">
                  Community: {settings.communityCount}
                </span>
              </div>
            </div>

            {/* Recent Orders & Recent Enquiries Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Orders Mini Table */}
              <div className="bg-white rounded-3xl border border-candy/30 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-bold text-burgundy">
                    Recent Customer Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-bold text-burgundy hover:text-candy-dark flex items-center gap-1"
                  >
                    View All ({orders.length}) <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 3).map((o) => (
                    <div
                      key={o.id}
                      className="p-4 rounded-2xl bg-beige/40 border border-candy/20 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-burgundy">
                            {o.id}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-candy/40 text-burgundy">
                            {o.orderStatus}
                          </span>
                        </div>
                        <p className="font-bold text-sm text-charcoal mt-1">
                          {o.customerName}
                        </p>
                        <p className="text-xs text-slate">
                          {o.items.length} item(s) • ₹{o.total.toLocaleString("en-IN")}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedOrderForDetail(o)}
                        className="px-3 py-1.5 rounded-xl bg-white border border-candy/40 text-xs font-bold text-burgundy hover:bg-candy/20"
                      >
                        Inspect
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiries Mini Table */}
              <div className="bg-white rounded-3xl border border-candy/30 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-bold text-burgundy">
                    Recent Commission Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab("enquiries")}
                    className="text-xs font-bold text-burgundy hover:text-candy-dark flex items-center gap-1"
                  >
                    View All ({enquiries.length}) <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {enquiries.slice(0, 3).map((e) => (
                    <div
                      key={e.id}
                      className="p-4 rounded-2xl bg-beige/40 border border-candy/20 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-sky/40 text-slate">
                            {e.type}
                          </span>
                          <span className="text-[10px] font-bold text-slate">
                            {e.id}
                          </span>
                        </div>
                        <p className="font-bold text-sm text-charcoal mt-1">
                          {e.name}
                        </p>
                        <p className="text-xs text-slate truncate max-w-xs">
                          {e.subject || e.message}
                        </p>
                      </div>

                      <a
                        href={`https://wa.me/${e.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hi ${e.name}! Rinki from Iconic Art Global here regarding your inquiry: ${e.subject || "Custom Art"}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ORDERS MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="editorial-title text-2xl font-bold text-burgundy">
                  Customer Orders & Personalization
                </h2>
                <p className="text-slate text-xs">
                  Review incoming artwork orders, custom personalization details, and update shipping progress.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate">Filter:</span>
                <select
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-candy/50 text-xs font-bold text-burgundy bg-white focus:outline-none"
                >
                  <option value="all">All Orders ({orders.length})</option>
                  <option value="new">New</option>
                  <option value="in crafting">In Crafting</option>
                  <option value="ready for dispatch">Ready for Dispatch</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-candy/30 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-rich-burgundy text-white uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Order ID</th>
                      <th className="py-3.5 px-4 font-bold">Customer</th>
                      <th className="py-3.5 px-4 font-bold">Items & Customization</th>
                      <th className="py-3.5 px-4 font-bold">Total</th>
                      <th className="py-3.5 px-4 font-bold">Status</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-candy/20">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-slate text-sm">
                          No orders found matching this filter.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-candy/5 transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-burgundy">
                            {o.id}
                            <span className="block text-[10px] text-slate font-sans">
                              {new Date(o.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-bold text-charcoal">{o.customerName}</p>
                            <p className="text-[11px] text-slate">{o.customerPhone}</p>
                            <p className="text-[11px] text-slate">{o.city}, {o.state}</p>
                          </td>
                          <td className="py-4 px-4 max-w-xs">
                            {o.items.map((it, idx) => (
                              <div key={idx} className="mb-1.5 last:mb-0">
                                <span className="font-bold text-charcoal">
                                  {it.quantity}x {it.productName}
                                </span>
                                {it.customizations && (
                                  <div className="bg-beige/60 p-1.5 rounded-lg text-[10px] text-burgundy mt-1">
                                    {Object.entries(it.customizations).map(([k, v]) => (
                                      <div key={k}>
                                        <span className="font-bold">{k}:</span> {v}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </td>
                          <td className="py-4 px-4 font-serif font-bold text-sm text-burgundy">
                            ₹{o.total.toLocaleString("en-IN")}
                            <span className="block text-[10px] text-green-700 font-sans font-normal">
                              {o.paymentStatus}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={o.orderStatus}
                              onChange={(e) =>
                                handleUpdateOrderStatus(o.id, e.target.value as any)
                              }
                              className="px-2.5 py-1 rounded-lg text-[11px] font-bold border border-candy/50 bg-candy/20 text-burgundy focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="In Crafting">In Crafting</option>
                              <option value="Ready for Dispatch">Ready for Dispatch</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedOrderForDetail(o)}
                                className="p-2 rounded-xl bg-candy/20 hover:bg-candy/40 text-burgundy"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <a
                                href={`https://wa.me/${o.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                  `Hi ${o.customerName}! Your Iconic Art Global order ${o.id} is now ${o.orderStatus}. Thank you for supporting handmade art!`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-700"
                                title="Notify on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: COMMISSIONS & INQUIRIES */}
        {/* ========================================================= */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="editorial-title text-2xl font-bold text-burgundy">
                  Bespoke Commissions & Event Inquiries
                </h2>
                <p className="text-slate text-xs">
                  Requests submitted from the Custom Order brief builder, workshop registrations, and contact forms.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate">Filter:</span>
                <select
                  value={enquiryFilter}
                  onChange={(e) => setEnquiryFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-candy/50 text-xs font-bold text-burgundy bg-white focus:outline-none"
                >
                  <option value="all">All Inquiries ({enquiries.length})</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="bg-white rounded-3xl border border-candy/30 p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-candy/30 text-burgundy uppercase">
                        {enq.type}
                      </span>
                      <span className="font-mono text-[10px] text-slate font-bold">
                        {enq.id}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-burgundy mb-1">
                      {enq.name}
                    </h3>
                    <p className="text-xs text-slate mb-3">
                      📞 {enq.phone} • ✉️ {enq.email}
                    </p>

                    {enq.subject && (
                      <div className="mb-2">
                        <span className="text-[10px] font-bold text-slate uppercase block">
                          Requirement:
                        </span>
                        <p className="text-xs font-bold text-charcoal">
                          {enq.subject}
                        </p>
                      </div>
                    )}

                    {enq.budget && (
                      <div className="flex items-center justify-between text-xs py-1.5 border-y border-candy/20 my-2">
                        <span className="text-slate font-bold">Budget:</span>
                        <span className="font-bold text-burgundy">{enq.budget}</span>
                      </div>
                    )}

                    {enq.deadline && (
                      <div className="flex items-center justify-between text-xs py-1">
                        <span className="text-slate font-bold">Target Date:</span>
                        <span className="font-bold text-charcoal">{enq.deadline}</span>
                      </div>
                    )}

                    <div className="mt-3 bg-beige/50 p-3 rounded-2xl text-xs text-charcoal/90 leading-relaxed italic border border-candy/20">
                      &quot;{enq.message}&quot;
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-candy/20 flex items-center justify-between gap-2">
                    <select
                      value={enq.status}
                      onChange={(e) =>
                        handleUpdateEnquiryStatus(enq.id, e.target.value as any)
                      }
                      className="px-2.5 py-1 rounded-lg text-xs font-bold border border-candy/50 bg-candy/20 text-burgundy focus:outline-none"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Quoted">Quoted</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Archived">Archived</option>
                    </select>

                    <a
                      href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hi ${enq.name}! Rinki Verma from Iconic Art Global here. I received your inquiry about "${enq.subject || enq.type}" and would love to discuss your artistic requirements!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold border border-green-200 flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: ARTWORK & PRODUCTS CATALOG */}
        {/* ========================================================= */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="editorial-title text-2xl font-bold text-burgundy">
                  Art Creations & Product Inventory
                </h2>
                <p className="text-slate text-xs">
                  Manage all 7 handcrafted categories, pricing, stock availability, and upload new pieces.
                </p>
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-5 py-2.5 rounded-2xl bg-rich-burgundy hover:bg-burgundy-dark text-white text-xs font-bold uppercase tracking-wider shadow transition-all flex items-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-candy" />
                <span>Upload New Artwork</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-3xl border border-candy/30 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search artwork by title, medium, category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-beige/40 border border-candy/30 text-xs text-charcoal focus:outline-none focus:border-burgundy"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-slate shrink-0">Category:</span>
                <select
                  value={selectedProductCategory}
                  onChange={(e) => setSelectedProductCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-beige/40 border border-candy/30 text-xs font-bold text-burgundy focus:outline-none w-full sm:w-auto"
                >
                  <option value="all">All Categories ({productsList.length})</option>
                  {productCategories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-candy/30 overflow-hidden shadow-sm flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 w-full bg-cream overflow-hidden">
                      <Image
                        src={p.images[0] || "/images/products/dot_mandala_art.webp"}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 candy-badge px-2.5 py-0.5 rounded-full text-[10px]">
                        {p.category}
                      </span>
                      <button
                        onClick={() => handleToggleProductStock(p)}
                        className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.inStock
                            ? "bg-green-100 text-green-800 border border-green-300"
                            : "bg-red-100 text-red-800 border border-red-300"
                        }`}
                      >
                        {p.inStock ? "In Stock" : "Sold Out"}
                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="font-serif text-base font-bold text-burgundy line-clamp-1 mb-1">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate line-clamp-2 mb-3">
                        {p.shortDescription || p.description}
                      </p>

                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-serif text-lg font-bold text-burgundy">
                          ₹{p.price.toLocaleString("en-IN")}
                        </span>
                        {p.originalPrice && (
                          <span className="text-xs text-slate line-through">
                            ₹{p.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate space-y-0.5">
                        <p>📏 {p.dimensions || "Custom Size"}</p>
                        <p>✨ {p.customizable ? "Customizable with name/colors" : "Standard Art"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-candy/20 flex items-center justify-between gap-2 mt-2">
                    <Link
                      href={`/shop/${p.categorySlug}/${p.slug}`}
                      target="_blank"
                      className="text-xs font-bold text-burgundy hover:text-candy-dark flex items-center gap-1"
                    >
                      <span>Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleProductStock(p)}
                        className="p-2 rounded-xl bg-candy/20 hover:bg-candy/40 text-burgundy"
                        title="Toggle Stock Status"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: WORKSHOPS MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === "workshops" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="editorial-title text-2xl font-bold text-burgundy">
                  Art Workshops & Masterclasses
                </h2>
                <p className="text-slate text-xs">
                  Manage Kids, Adults, Online, Offline, 1-on-1, and Private creative sessions.
                </p>
              </div>

              <button
                onClick={() => setShowAddWorkshopModal(true)}
                className="px-5 py-2.5 rounded-2xl bg-rich-burgundy hover:bg-burgundy-dark text-white text-xs font-bold uppercase tracking-wider shadow transition-all flex items-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-candy" />
                <span>Schedule New Workshop</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshopsList.map((ws) => (
                <div
                  key={ws.id}
                  className="bg-white rounded-3xl border border-candy/30 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-cream">
                      <Image
                        src={ws.image}
                        alt={ws.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="candy-badge px-2.5 py-0.5 rounded-full text-[10px]">
                          {ws.category}
                        </span>
                        <span className="sky-badge px-2.5 py-0.5 rounded-full text-[10px]">
                          {ws.format}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-serif text-lg font-bold text-burgundy mb-1">
                        {ws.title}
                      </h3>
                      <p className="text-xs text-slate line-clamp-2 mb-4">
                        {ws.shortDescription || ws.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate bg-beige/50 p-3 rounded-2xl mb-4">
                        <p>⏱️ {ws.duration}</p>
                        <p>👥 {ws.ageGroup}</p>
                        <p>🎨 Materials: {ws.materialsIncluded ? "Included" : "BYO"}</p>
                        <p className="font-bold text-burgundy">💰 {ws.price || "Custom"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-candy/20 flex items-center justify-between gap-2 mt-2">
                    <Link
                      href="/workshops"
                      target="_blank"
                      className="text-xs font-bold text-burgundy hover:text-candy-dark flex items-center gap-1"
                    >
                      <span>View on Storefront</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <button
                      onClick={() => handleDeleteWorkshop(ws.id, ws.title)}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600"
                      title="Remove Workshop"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: GALLERY MEDIA */}
        {/* ========================================================= */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="editorial-title text-2xl font-bold text-burgundy">
                  Portfolio & Workshop Gallery Media
                </h2>
                <p className="text-slate text-xs">
                  Glimpses of 40+ hosted workshops, private parties, and custom artwork creations.
                </p>
              </div>

              <Link
                href="/gallery"
                target="_blank"
                className="px-4 py-2 rounded-xl bg-rich-burgundy text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Open Public Masonry Gallery</span>
                <ExternalLink className="w-3.5 h-3.5 text-candy" />
              </Link>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-candy/30 text-center">
              <ImageIcon className="w-12 h-12 text-candy-dark mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-burgundy mb-2">
                Instagram & Media Integration Active
              </h3>
              <p className="text-xs text-slate max-w-md mx-auto mb-6">
                All workshop, event, and artwork images render dynamically with responsive masonry layout and full-screen lightbox at <code className="bg-candy/20 px-2 py-0.5 rounded text-burgundy">/gallery</code>.
              </p>
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rich-burgundy text-white text-xs font-bold uppercase tracking-wider"
              >
                <span>View @iconic.art.global on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 text-candy" />
              </a>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: BRAND SETTINGS */}
        {/* ========================================================= */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="editorial-title text-2xl font-bold text-burgundy">
                Brand & Studio Settings
              </h2>
              <p className="text-slate text-xs">
                Update business contact details, social links, and live achievement counters.
              </p>
            </div>

            <form
              onSubmit={handleSaveSettings}
              className="bg-white rounded-3xl border border-candy/30 p-8 shadow-sm space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={settings.brandName}
                    onChange={(e) =>
                      setSettings({ ...settings, brandName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-candy/40 bg-beige/40 text-xs text-charcoal focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                    Founder / Lead Artist
                  </label>
                  <input
                    type="text"
                    value={settings.founderName}
                    onChange={(e) =>
                      setSettings({ ...settings, founderName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-candy/40 bg-beige/40 text-xs text-charcoal focus:outline-none focus:border-burgundy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-candy/40 bg-beige/40 text-xs text-charcoal focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                    WhatsApp Hotline
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) =>
                      setSettings({ ...settings, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-candy/40 bg-beige/40 text-xs text-charcoal focus:outline-none focus:border-burgundy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                    Workshops Milestone Counter
                  </label>
                  <input
                    type="text"
                    value={settings.workshopsCount}
                    onChange={(e) =>
                      setSettings({ ...settings, workshopsCount: e.target.value })
                    }
                    placeholder="e.g. 40+"
                    className="w-full px-4 py-3 rounded-xl border border-candy/40 bg-beige/40 text-xs text-charcoal focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                    Community Followers Counter
                  </label>
                  <input
                    type="text"
                    value={settings.communityCount}
                    onChange={(e) =>
                      setSettings({ ...settings, communityCount: e.target.value })
                    }
                    placeholder="e.g. 17.1K+"
                    className="w-full px-4 py-3 rounded-xl border border-candy/40 bg-beige/40 text-xs text-charcoal focus:outline-none focus:border-burgundy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={settings.instagram}
                    onChange={(e) =>
                      setSettings({ ...settings, instagram: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-candy/40 bg-beige/40 text-xs text-charcoal focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={settings.youtube}
                    onChange={(e) =>
                      setSettings({ ...settings, youtube: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-candy/40 bg-beige/40 text-xs text-charcoal focus:outline-none focus:border-burgundy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                  Free Shipping Minimum (₹)
                </label>
                <input
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      freeShippingThreshold: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-candy/40 bg-beige/40 text-xs text-charcoal focus:outline-none focus:border-burgundy"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-rich-burgundy hover:bg-burgundy-dark text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow transition-all"
              >
                Save Studio Settings
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODAL: ADD NEW ARTWORK / PRODUCT */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showAddProductModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-8 border border-candy/40 shadow-2xl relative my-8"
            >
              <button
                onClick={() => setShowAddProductModal(false)}
                className="absolute top-5 right-5 text-slate hover:text-burgundy text-xl font-bold"
              >
                ✕
              </button>

              <span className="candy-badge px-3 py-1 rounded-full text-[10px] inline-block mb-2">
                Inventory Catalog
              </span>
              <h3 className="editorial-title text-2xl font-bold text-burgundy mb-4">
                Upload New Artwork
              </h3>

              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                    Artwork Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    placeholder="e.g. Crimson Bloom Sacred Mandala"
                    className="w-full px-4 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                      Category *
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, category: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs font-bold text-burgundy focus:outline-none"
                    >
                      {productCategories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: Number(e.target.value) })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs focus:outline-none focus:border-burgundy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                      Dimensions / Sizes
                    </label>
                    <input
                      type="text"
                      value={newProduct.dimensions}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, dimensions: e.target.value })
                      }
                      placeholder="12 × 12 inches"
                      className="w-full px-4 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs focus:outline-none focus:border-burgundy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                      Materials Used
                    </label>
                    <input
                      type="text"
                      value={newProduct.materials}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, materials: e.target.value })
                      }
                      placeholder="Archival Canvas, Acrylic Inks"
                      className="w-full px-4 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs focus:outline-none focus:border-burgundy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                    Artwork Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={newProduct.image}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, image: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                    Artistic Description
                  </label>
                  <textarea
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, description: e.target.value })
                    }
                    placeholder="Describe the aesthetic, symbolism, techniques and occasion..."
                    className="w-full px-4 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="customCheck"
                    checked={newProduct.customizable}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, customizable: e.target.checked })
                    }
                    className="w-4 h-4 accent-burgundy"
                  />
                  <label htmlFor="customCheck" className="text-xs font-bold text-charcoal">
                    Allow Personalized Customizations (Name, Colors, Message)
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="flex-1 py-3 rounded-2xl bg-slate/10 hover:bg-slate/20 text-slate text-xs font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-2xl bg-rich-burgundy hover:bg-burgundy-dark text-white text-xs font-bold uppercase tracking-wider shadow"
                  >
                    Publish Artwork
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: ADD NEW WORKSHOP */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showAddWorkshopModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-8 border border-candy/40 shadow-2xl relative my-8"
            >
              <button
                onClick={() => setShowAddWorkshopModal(false)}
                className="absolute top-5 right-5 text-slate hover:text-burgundy text-xl font-bold"
              >
                ✕
              </button>

              <span className="candy-badge px-3 py-1 rounded-full text-[10px] inline-block mb-2">
                Workshop Scheduler
              </span>
              <h3 className="editorial-title text-2xl font-bold text-burgundy mb-4">
                Schedule New Workshop
              </h3>

              <form onSubmit={handleCreateWorkshop} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                    Workshop Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newWorkshop.title}
                    onChange={(e) =>
                      setNewWorkshop({ ...newWorkshop, title: e.target.value })
                    }
                    placeholder="e.g. Masterclass: Metallic Mandala & Gold Leaf"
                    className="w-full px-4 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                      Audience Category
                    </label>
                    <select
                      value={newWorkshop.category}
                      onChange={(e) =>
                        setNewWorkshop({
                          ...newWorkshop,
                          category: e.target.value,
                          categorySlug: e.target.value.toLowerCase(),
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs font-bold text-burgundy focus:outline-none"
                    >
                      <option value="Adults">Adults</option>
                      <option value="Kids">Kids</option>
                      <option value="Private">Private / 1-on-1</option>
                      <option value="Online">Online Zoom</option>
                      <option value="Corporate">Corporate Group</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                      Format
                    </label>
                    <select
                      value={newWorkshop.format}
                      onChange={(e) =>
                        setNewWorkshop({ ...newWorkshop, format: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs font-bold text-burgundy focus:outline-none"
                    >
                      <option value="Offline Studio">Offline Studio</option>
                      <option value="Online Zoom">Online Zoom</option>
                      <option value="Private Venue">Private Venue</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={newWorkshop.duration}
                      onChange={(e) =>
                        setNewWorkshop({ ...newWorkshop, duration: e.target.value })
                      }
                      placeholder="e.g. 2.5 hours"
                      className="w-full px-4 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs focus:outline-none focus:border-burgundy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                      Price / Fee
                    </label>
                    <input
                      type="text"
                      value={newWorkshop.price}
                      onChange={(e) =>
                        setNewWorkshop({ ...newWorkshop, price: e.target.value })
                      }
                      placeholder="e.g. Starting from ₹2,200"
                      className="w-full px-4 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs focus:outline-none focus:border-burgundy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={newWorkshop.image}
                    onChange={(e) =>
                      setNewWorkshop({ ...newWorkshop, image: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">
                    Session Description & Curriculum
                  </label>
                  <textarea
                    rows={3}
                    value={newWorkshop.description}
                    onChange={(e) =>
                      setNewWorkshop({ ...newWorkshop, description: e.target.value })
                    }
                    placeholder="What will participants learn and take home?"
                    className="w-full px-4 py-2.5 rounded-xl border border-candy/40 bg-beige/30 text-xs focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddWorkshopModal(false)}
                    className="flex-1 py-3 rounded-2xl bg-slate/10 hover:bg-slate/20 text-slate text-xs font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-2xl bg-rich-burgundy hover:bg-burgundy-dark text-white text-xs font-bold uppercase tracking-wider shadow"
                  >
                    Add to Schedule
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: ORDER DETAIL INSPECTOR */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedOrderForDetail && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 border border-candy/40 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedOrderForDetail(null)}
                className="absolute top-5 right-5 text-slate hover:text-burgundy text-xl font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-burgundy">
                  {selectedOrderForDetail.id}
                </span>
                <span className="candy-badge px-2 py-0.5 rounded-full text-[10px]">
                  {selectedOrderForDetail.orderStatus}
                </span>
              </div>

              <h3 className="editorial-title text-2xl font-bold text-burgundy mb-4">
                Order Specification
              </h3>

              <div className="space-y-4 text-xs">
                <div className="bg-beige/50 p-4 rounded-2xl border border-candy/20">
                  <p className="font-bold text-burgundy uppercase text-[10px] tracking-wider mb-1">
                    Customer Information
                  </p>
                  <p className="font-bold text-charcoal text-sm">
                    {selectedOrderForDetail.customerName}
                  </p>
                  <p className="text-slate">✉️ {selectedOrderForDetail.customerEmail}</p>
                  <p className="text-slate">📞 {selectedOrderForDetail.customerPhone}</p>
                  <p className="text-slate mt-2">
                    📍 {selectedOrderForDetail.shippingAddress}, {selectedOrderForDetail.city},{" "}
                    {selectedOrderForDetail.state} - {selectedOrderForDetail.pincode}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-burgundy uppercase text-[10px] tracking-wider mb-2">
                    Items & Bespoke Personalization
                  </p>
                  <div className="space-y-2">
                    {selectedOrderForDetail.items.map((it, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white border border-candy/30 rounded-xl"
                      >
                        <div className="flex justify-between font-bold text-charcoal">
                          <span>
                            {it.quantity}x {it.productName}
                          </span>
                          <span className="text-burgundy">
                            ₹{(it.price * it.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                        {it.customizations && (
                          <div className="mt-2 text-[11px] bg-candy/10 p-2 rounded-lg text-burgundy space-y-0.5">
                            {Object.entries(it.customizations).map(([k, v]) => (
                              <p key={k}>
                                <span className="font-bold">{k}:</span> {v}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between text-sm font-bold text-burgundy pt-2 border-t border-candy/20">
                  <span>Total Amount ({selectedOrderForDetail.paymentStatus}):</span>
                  <span>₹{selectedOrderForDetail.total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={`https://wa.me/${selectedOrderForDetail.customerPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hi ${selectedOrderForDetail.customerName}! Regarding your Iconic Art Global order ${selectedOrderForDetail.id}: We are preparing your artwork with love and care!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message Customer on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
