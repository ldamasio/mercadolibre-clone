
// frontend/src/components/product/ProductPrice.tsx
import React from 'react';
import { Product, Installments } from '@/types/product';

interface ProductPriceProps {
  product: Product;
  installments?: Installments;
}

export function ProductPrice({ product, installments }: ProductPriceProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: product.currency,
    }).format(price);
  };

  return (
    <div className="border-2 border-red-500 mb-6">
      {product.original_price && product.original_price > product.price && (
        <p className="text-sm text-gray-500 line-through">
          {formatPrice(product.original_price)}
        </p>
      )}
      
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-light">{formatPrice(product.price)}</span>
        {product.discount_percentage && (
          <span className="text-sm text-green-600 font-semibold">
            {product.discount_percentage}% OFF
          </span>
        )}
      </div>
      
      {installments && (
        <p className="text-sm mt-1">
          em{' '}
          <span className="text-green-600 font-semibold">
            {installments.quantity}x {formatPrice(installments.amount)} sem juros
          </span>
        </p>
      )}
      
      <p className="text-sm text-blue-600 mt-2 cursor-pointer hover:text-blue-800">
        Ver os meios de pagamento
      </p>
    </div>
  );
}
