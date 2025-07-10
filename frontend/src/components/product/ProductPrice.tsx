
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
    <div className="mb-2">
      {/* Preço antigo riscado */}
      {product.original_price && product.original_price > product.price && (
        <span className="text-sm text-gray-500 line-through block mb-0.5">
          {formatPrice(product.original_price)}
        </span>
      )}
      {/* Preço atual e desconto */}
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-light">{formatPrice(product.price)}</span>
        {product.discount_percentage && (
          <span className="text-sm text-green-600 font-semibold ml-2">
            {product.discount_percentage}% OFF
          </span>
        )}
      </div>
      {/* Parcelamento */}
      {installments && (
        <div className="text-sm mb-1 mt-1">
          en <span className="text-green-600 font-semibold">{installments.quantity} cuotas de {formatPrice(installments.amount)} sin interés</span>
        </div>
      )}
      {/* Promoção cartão (simulado) */}
      <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded mb-1 mt-1">
        10% OFF OCA Blue Visa
      </div>
      {/* Link meios de pagamento */}
      <div>
        <a href="#" className="text-blue-600 text-sm hover:underline">Ver medios de pago y promociones</a>
      </div>
    </div>
  );
}
