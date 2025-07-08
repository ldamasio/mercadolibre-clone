// frontend/src/components/product/SellerInfo.tsx
import React from 'react';
import { Seller } from '@/types/seller';
import { Card } from '@/components/ui/Card';

interface SellerInfoProps {
  seller: Seller;
}

export function SellerInfo({ seller }: SellerInfoProps) {
  return (
    <Card className="mb-4">
      <h3 className="font-semibold mb-2 desktop:mb-3 text-base desktop:text-lg">Informações sobre o vendedor</h3>
      
      <div className="space-y-2 desktop:space-y-3">
        <div>
          <p className="font-medium text-sm desktop:text-base">{seller.nickname}</p>
          <p className="text-xs desktop:text-sm text-gray-600">{seller.leader_status}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <svg className="w-3 h-3 desktop:w-4 desktop:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-xs desktop:text-sm">{seller.reputation.status}</span>
        </div>
        
        <div className="text-xs desktop:text-sm space-y-1">
          <p>{seller.reputation.transactions.completed} vendas concluídas</p>
          <p className="text-green-600">
            {seller.reputation.ratings.positive}% de avaliações positivas
          </p>
        </div>
        
        <p className="text-xs desktop:text-sm text-gray-600">
          {seller.location.city}, {seller.location.state}
        </p>
      </div>
    </Card>
  );
}
