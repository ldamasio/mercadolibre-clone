  // frontend/src/types/seller.ts
  export interface Seller {
    id: string;
    nickname: string;
    reputation: SellerReputation;
    tags: string[];
    location: Location;
    experience_years: number;
    leader_status: string;
  }
  
  export interface SellerReputation {
    level: number;
    status: string;
    transactions: TransactionMetrics;
    ratings: RatingMetrics;
  }
  
  export interface TransactionMetrics {
    completed: number;
    canceled: number;
    total: number;
  }
  
  export interface RatingMetrics {
    positive: number;
    neutral: number;
    negative: number;
  }
  
  export interface Location {
    city: string;
    state: string;
    country: string;
  }
  
  export interface Review {
    id: string;
    product_id: string;
    user_id: string;
    username: string;
    rating: number;
    comment: string;
    helpful_count: number;
    created_at: string;
  }
  
  export interface Question {
    id: string;
    product_id: string;
    question: string;
    answer?: string;
    created_at: string;
    answered_at?: string;
  }
  