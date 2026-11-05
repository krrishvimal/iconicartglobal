export interface AdminOrder {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    customizations?: Record<string, string>;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentStatus: string;
  orderStatus: "New" | "In Crafting" | "Ready for Dispatch" | "Shipped" | "Delivered" | "Cancelled";
}

export interface AdminEnquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  type: "Custom Order" | "Workshop Booking" | "Private Event" | "General";
  subject?: string;
  category?: string;
  budget?: string;
  deadline?: string;
  message: string;
  status: "New" | "Contacted" | "Quoted" | "Confirmed" | "Archived";
}

export interface AdminSettings {
  brandName: string;
  founderName: string;
  email: string;
  phone: string;
  instagram: string;
  youtube: string;
  workshopsCount: string;
  communityCount: string;
  freeShippingThreshold: number;
}
