// frontend/src/hooks/useProduct.ts
import { useState, useEffect } from 'react';
import { ProductWithDetails } from '@/types/product';
import { productService } from '@/services/productService';

interface UseProductState {
  product: ProductWithDetails | null;
  loading: boolean;
  error: Error | null;
}

export function useProduct(productId: string) {
  const [state, setState] = useState<UseProductState>({
    product: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const data = await productService.getProductById(productId);
        setState({ product: data, loading: false, error: null });
      } catch (error) {
        setState({ product: null, loading: false, error: error as Error });
      }
    };

    fetchProduct();
  }, [productId]);

  return state;
}
