// frontend/src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Card } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
import { productService } from '@/services/productService';
import { Product } from '@/types/product';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Produtos em Destaque</h1>
        
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.thumbnail || product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    {product.original_price && product.original_price > product.price && (
                      <p className="text-sm text-gray-500 line-through">
                        {formatPrice(product.original_price, product.currency)}
                      </p>
                    )}
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-normal">
                        {formatPrice(product.price, product.currency)}
                      </span>
                      {product.discount_percentage && (
                        <span className="text-sm text-green-600 font-semibold">
                          {product.discount_percentage}% OFF
                        </span>
                      )}
                    </div>
                    
                    {product.free_shipping && (
                      <p className="text-sm text-green-600 font-semibold">
                        Frete grátis
                      </p>
                    )}
                    
                    <h3 className="text-sm text-gray-700 line-clamp-2">
                      {product.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}