// frontend/src/types/product.ts
import type { Seller, Review, Question } from '@/types/seller';

export interface Product {
    id: string;
    title: string;
    price: number;
    original_price?: number;
    currency: string;
    discount_percentage?: number;
    condition: string;
    available_quantity: number;
    sold_quantity: number;
    images: string[];
    thumbnail: string;
    free_shipping: boolean;
    tags: string[];
    seller_id: string;
    category_id: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ProductDetail {
    id: string;
    product_id: string;
    description: string;
    features: ProductFeatures;
    payment_methods: string[];
    installments: Installments;
    warranty_months: number;
    warranty_type: string;
    shipping: ShippingInfo;
    views_count: number;
  }
  
  export interface ProductFeatures {
    main: Feature[];
    screen?: ScreenSpecs;
    dimensions?: DimensionSpecs;
  }
  
  export interface Feature {
    name: string;
    value: string;
  }
  
  export interface ScreenSpecs {
    size: string;
    resolution: string;
    technology: string;
  }
  
  export interface DimensionSpecs {
    height: string;
    width: string;
    depth: string;
    weight: string;
  }
  
  export interface Installments {
    quantity: number;
    amount: number;
    rate: number;
    currency: string;
  }
  
  export interface ShippingInfo {
    free_shipping: boolean;
    logistic_type: string;
    estimated_delivery: string;
  }
  
  export interface ProductWithDetails {
    product: Product;
    product_detail: ProductDetail;
    seller: Seller;
    reviews?: Review[];
    questions?: Question[];
  }
  