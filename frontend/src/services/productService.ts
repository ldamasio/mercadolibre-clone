// frontend/src/services/productService.ts
import { api } from './api';
import { Product, ProductWithDetails } from '@/types/product';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const { data } = await api.get<Product[]>('/products');
    return data;
  },

  async getProductById(id: string): Promise<ProductWithDetails> {
    const { data } = await api.get<ProductWithDetails>(`/products/${id}`);
    return data;
  },

  async getRelatedProducts(id: string, limit: number = 10): Promise<Product[]> {
    const { data } = await api.get<Product[]>(`/products/${id}/related?limit=${limit}`);
    return data;
  },

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const { data } = await api.get<Product[]>(`/categories/${categoryId}/products`);
    return data;
  },
};
