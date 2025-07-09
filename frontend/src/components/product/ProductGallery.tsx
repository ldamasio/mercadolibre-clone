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

      {/* Desktop - Thumbnails */}
      <div className="border-2 border-blue-500 w-[56px] hidden md:flex flex-col gap-2 mt-6 ml-6">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-[54px] h-[54px] border-2 rounded overflow-hidden ${selectedImage === index ? 'border-blue-500' : 'border-gray-300'
              }`}
          >
            <img
              src={`http://localhost:3000${image}`}
              alt={`${title} - ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="border-2 border-green-500 w-[340px]"> {/* Removido text-left */}
        <div className="relative w-full h-80 md:h-[500px] bg-white rounded-lg overflow-hidden">
          <img
            src={`http://localhost:3000${images[selectedImage]}`}
            alt={title}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] object-cover"
          />
        </div>

      </div>
    </div>
  );
}
