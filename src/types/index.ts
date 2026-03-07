// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: 'bouquet' | 'planter' | 'gift' | 'vase' | 'candle' | 'wedding' | 'funeral';
  tags: string[];
  inStock: boolean;
  stockCount: number;
  sizes?: Size[];
  colors?: string[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  categoryLabel?: string;
  potType?: 'Metal' | 'Ceramic';
  plantType?: 'Outdoor' | 'Indoor';
}

export interface Size {
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

// Workshop Types
export interface Workshop {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  date: string;
  time: string;
  duration: string;
  price: number;
  maxParticipants: number;
  currentParticipants: number;
  location: string;
  instructor: string;
  includes: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  reviews: Review[];
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  relatedPosts: string[];
}

// Review Types
export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  orders: Order[];
  wishlist: string[];
}

export interface Address {
  street: string;
  city: string;
  postcode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  priceRange?: [number, number];
  colors?: string[];
  sizes?: string[];
  inStock?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
}
