import { useState, useEffect } from 'react';
import type { ProductWithDetails } from '@/types/product';

interface UseProductResult {
  product: ProductWithDetails;
  loading: boolean;
  error: Error | null;
}

export function useProduct(id: string): UseProductResult {
  const [data, setData] = useState<ProductWithDetails>({} as ProductWithDetails);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Dummy data matching ProductWithDetails
        setData({
          product: {
            id,
            title: 'Samsung Galaxy A55 5G Dual SIM 256 GB azul escuro 8 GB RAM',
            price: 439,
            original_price: 499,
            currency: 'USD',
            discount_percentage: 12,
            condition: 'new',
            available_quantity: 150,
            sold_quantity: 500,
            images: [
              '/images/a55-1.jpg',
              '/images/a55-2.jpg',
              '/images/a55-3.jpg',
              '/images/a55-4.jpg',
            ],
            thumbnail: '/images/a55-1.jpg',
            free_shipping: true,
            tags: ['official_store'],
            seller_id: 'seller123',
            category_id: 'cellphones',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          product_detail: {
            id: `${id}-detail`,
            product_id: id,
            description: 'Com seu potente processador e 8 GB de RAM, você terá alto desempenho sem atrasos.',
            features: {
              main: [
                { name: 'Memória RAM', value: '8 GB' },
                { name: 'Memória interna', value: '256 GB' },
                { name: 'Câmera traseira', value: '50 MP' },
                { name: 'Câmera frontal', value: '32 MP' },
              ],
            },
            payment_methods: ['credit_card', 'pix'],
            installments: { quantity: 10, amount: 43.9, rate: 0, currency: 'USD' },
            warranty_months: 12,
            warranty_type: 'Garantia de fábrica',
            shipping: { free_shipping: true, logistic_type: 'drop_off', estimated_delivery: 'em 3 a 5 dias' },
            views_count: 1024,
          },
          seller: {
            id: 'seller123',
            nickname: 'Samsung Official Store',
            reputation: {
              level: 4,
              status: 'green',
              transactions: { completed: 5000, canceled: 50, total: 5050 },
              ratings: { positive: 4800, neutral: 150, negative: 100 },
            },
            tags: ['official_store'],
            location: { city: 'São Paulo', state: 'SP', country: 'BR' },
            experience_years: 5,
            leader_status: 'top_rated',
          },
          questions: [
            { id: 'q1', product_id: id, question: 'Este produto tem garantia adicional?', answer: 'Sim, 12 meses de garantia', created_at: new Date().toISOString() },
          ],
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return { product: data, loading, error };
}
