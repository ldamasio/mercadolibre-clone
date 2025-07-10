// frontend/src/components/product/ProductInfo.tsx
import React, { useState } from 'react';
import { Product } from '@/types/product';
import { Seller } from '@/types/seller';
import { faCheckCircle, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductPrice } from './ProductPrice';
import { ProductDetail } from '@/types/product';
interface ProductInfoProps {
  product: Product;
  seller: Seller;
  product_detail: ProductDetail;
}

export function ProductInfo({ product, seller, product_detail }: ProductInfoProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div>
      {/* Topo: Loja oficial, status, selo, favorito */}
      <div className="mb-2">


        {/* Header ProductInfo */}
        <div className="w-full">
          <a
            href="#"
            className="text-blue-700 text-sm font-medium flex items-center gap-1 hover:underline"
          >
            Visita la Tienda oficial de {seller.nickname}
            <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 w-4 h-4 ml-1" />
          </a>
        </div>

        <div className="!mt-2 w-full flex items-center justify-between">
          {/* Status e vendidos */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-400 font-semibold">
              {product.condition === 'new' ? 'Nuevo' : 'Usado'}
            </span>
            <span className="text-gray-400 mx-1">|</span>
            <span className="text-xs text-gray-400">{product.sold_quantity} vendidos</span>
          </div>
          {/* Ícone de favorito (coração contorno/filled) */}
          <button
            className="ml-2 p-1 rounded-full transition-colors cursor-pointer"
            onClick={() => setIsFavorite((fav) => !fav)}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <FontAwesomeIcon
              icon={isFavorite ? faHeartSolid : faHeartRegular}
              className="text-blue-600 w-10 h-10"
            />
          </button>
        </div>
        <div className="!mt-3 !mb-2 flex items-center gap-2">
          {/* Selo 'MÁS VENDIDO' */}
          <span className="!p-1 bg-[#f67851] text-white text-xs font-bold px-2 py-1 rounded ml-2">MÁS VENDIDO</span>
          {/* Ranking na categoria (simulado) */}
          <div className="text-xs text-blue-400 font-medium mb-2">8° en Celulares y Smartphones</div>
        </div>
      </div>

      {/* Body ProductInfo */}
      {/* Título do produto */}
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      {/* Avaliação: estrelas e número de avaliações */}
      <div className="flex items-center gap-1 mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 text-blue-500 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-2">(1709)</span>
      </div>
      {/* Preço, desconto, parcelamento, meios de pagamento: agora via ProductPrice */}
      <ProductPrice product={product} />


      {/* FOoter ProductInfo */}
      {/* Cor do produto */}
      <div className="mt-4 flex items-center gap-2 flex-col items-start">
        <span className="text-sm font-medium">Color:</span>
        <span className="font-bold text-sm">Azul oscuro</span>
        {/* Miniatura da cor */}
        <span className="w-6 h-6 rounded border border-gray-300 inline-block mt-1" style={{ background: '#1a2236' }} />
      </div>

      <div>

        <h3 className="text-base font-medium !mb-1 !mt-2"><strong>Lo que tienes que saber de este producto</strong></h3>
        <ul className="space-y-2">
          {product_detail.features.main.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gray-400 mr-2">•</span>
              <span className="text-sm">{feature.name}: {feature.value}</span>
            </li>
          ))}
        </ul>
        <button className="text-sm text-blue-600 mt-3 hover:underline">
          Ver características
        </button>
      </div>
      <div className="!mt-2 !mb-2 ">
      <span className="text-sm font-medium mt-3">Opciones de compra:</span>
        <button className="text-sm text-blue-600 mt-3 hover:underline">
          3 productos nuevos a partir de {product.price}
        </button>
      </div>
    </div>
  );
}
