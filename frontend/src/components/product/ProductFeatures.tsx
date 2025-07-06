// frontend/src/components/product/ProductFeatures.tsx
import React from 'react';
import { ProductFeatures as ProductFeaturesType } from '@/types/product';

interface ProductFeaturesProps {
  features: ProductFeaturesType;
  description: string;
}

export function ProductFeatures({ features, description }: ProductFeaturesProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Características do produto</h2>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
        {features.main.map((feature, index) => (
          <div key={index} className="flex">
            <span className="font-medium mr-2">{feature.name}:</span>
            <span className="text-gray-700">{feature.value}</span>
          </div>
        ))}
      </div>
      
      {features.screen && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Tela</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <p><span className="font-medium">Tamanho:</span> {features.screen.size}</p>
            <p><span className="font-medium">Resolução:</span> {features.screen.resolution}</p>
            <p><span className="font-medium">Tecnologia:</span> {features.screen.technology}</p>
          </div>
        </div>
      )}
      
      {features.dimensions && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Dimensões</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <p><span className="font-medium">Altura:</span> {features.dimensions.height}</p>
            <p><span className="font-medium">Largura:</span> {features.dimensions.width}</p>
            <p><span className="font-medium">Profundidade:</span> {features.dimensions.depth}</p>
            <p><span className="font-medium">Peso:</span> {features.dimensions.weight}</p>
          </div>
        </div>
      )}
      
      <div>
        <h3 className="font-semibold mb-3">Descrição</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
