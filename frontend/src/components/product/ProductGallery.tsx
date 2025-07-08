// frontend/src/components/product/ProductGallery.tsx
import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">Sem imagem</span>
      </div>
    );
  }

  return (
    <div className="border-2 border-orange-500 w-[478px] flex flex-col md:flex-row gap-2 md:gap-4">
      {/* Mobile - Thumbnails as dots */}
      <div className="md:hidden flex justify-center gap-2 order-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-2 h-2 rounded-full ${
              selectedImage === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            aria-label={`Imagem ${index + 1}`}
          />
        ))}
      </div>

      {/* Desktop - Thumbnails */}
      <div className="border-2 border-blue-500 w-[56px] h-[384px] hidden md:flex flex-col gap-2 mt-6 ml-6">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-[54px] h-[54px] border-2 rounded overflow-hidden ${
              selectedImage === index ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            <img
              src={`http://localhost:3000/${image}`}
              alt={`${title} - ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="border-2 border-green-500 w-[340px] flex-1 order-1 md:order-2">
        <div className="relative w-full h-80 md:h-[500px] bg-white rounded-lg overflow-hidden">
          <img
            src={`http://localhost:3000/${images[selectedImage]}`}
            alt={title}
            className="w-full h-full object-contain"
          />
          
          {/* Mobile - Navigation arrows */}
          <div className="md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2">
            <button
              onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
              className="bg-white/80 rounded-full p-2 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
              className="bg-white/80 rounded-full p-2 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
