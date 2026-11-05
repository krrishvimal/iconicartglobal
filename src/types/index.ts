// Types for Iconic Art Global

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  materials?: string;
  dimensions?: string;
  colors?: string[];
  sizes?: string[];
  customizable: boolean;
  customizationOptions?: CustomizationOption[];
  inStock: boolean;
  prepTime?: string;
  deliveryTime?: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestseller: boolean;
  isDigital?: boolean;
}

export interface CustomizationOption {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "color" | "checkbox" | "file";
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Workshop {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  shortDescription: string;
  image: string;
  duration: string;
  ageGroup: string;
  format: string;
  materialsIncluded: boolean;
  price?: string;
  highlights: string[];
  featured: boolean;
  disciplineTag?: string;
}

export interface WorkshopCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
}

export interface EventType {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  features: string[];
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location?: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: Record<string, string>;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "workshops" | "events" | "artwork" | "products" | "behind-the-scenes";
  width: number;
  height: number;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
