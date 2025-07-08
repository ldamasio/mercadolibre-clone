// frontend/src/components/product/ProductFeatures.tsx
import React from 'react';
import { ProductFeatures as ProductFeaturesType } from '@/types/product';

interface ProductFeaturesProps {
  features: ProductFeaturesType;
  description: string;
}

export function ProductFeatures({ features, description }: ProductFeaturesProps) {
  return (
    <div className="bg-white rounded-lg p-4 desktop:p-6">
      <h2 className="text-lg desktop:text-2xl font-semibold mb-4 desktop:mb-6">Características do produto</h2>
      
      <div className="grid grid-cols-1 desktop:grid-cols-2 gap-2 desktop:gap-x-8 desktop:gap-y-4 mb-6 desktop:mb-8">
        {features.main.map((feature, index) => (
          <div key={index} className="flex flex-col desktop:flex-row">
            <span className="font-medium text-sm desktop:text-base desktop:mr-2">{feature.name}:</span>
            <span className="text-gray-700 text-sm desktop:text-base">{feature.value}</span>
          </div>
        ))}
      </div>
      
      {features.screen && (
        <div className="mb-4 desktop:mb-6">
          <h3 className="font-semibold mb-2 desktop:mb-3 text-base desktop:text-lg">Tela</h3>
          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-1 desktop:gap-x-8 desktop:gap-y-2">
            <p className="text-sm desktop:text-base"><span className="font-medium">Tamanho:</span> {features.screen.size}</p>
            <p className="text-sm desktop:text-base"><span className="font-medium">Resolução:</span> {features.screen.resolution}</p>
            <p className="text-sm desktop:text-base"><span className="font-medium">Tecnologia:</span> {features.screen.technology}</p>
          </div>
        </div>
      )}
      
      {features.dimensions && (
        <div className="mb-4 desktop:mb-6">
          <h3 className="font-semibold mb-2 desktop:mb-3 text-base desktop:text-lg">Dimensões</h3>
          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-1 desktop:gap-x-8 desktop:gap-y-2">
            <p className="text-sm desktop:text-base"><span className="font-medium">Altura:</span> {features.dimensions.height}</p>
            <p className="text-sm desktop:text-base"><span className="font-medium">Largura:</span> {features.dimensions.width}</p>
            <p className="text-sm desktop:text-base"><span className="font-medium">Profundidade:</span> {features.dimensions.depth}</p>
            <p className="text-sm desktop:text-base"><span className="font-medium">Peso:</span> {features.dimensions.weight}</p>
          </div>
        </div>
      )}
      
      <div>
        <h3 className="font-semibold mb-2 desktop:mb-3 text-base desktop:text-lg">Descrição</h3>
        <p className="text-gray-700 leading-relaxed text-sm desktop:text-base">{description}</p>
      </div>
    </div>
  );
}
