// frontend/src/components/product/ProductGallery.tsx
import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

interface ImageDimensions {
  width: number;
  height: number;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageDimensions, setImageDimensions] = useState<{ [key: number]: ImageDimensions }>({});

  const handleImageLoad = (index: number, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setImageDimensions(prev => ({
      ...prev,
      [index]: {
        width: img.naturalWidth,
        height: img.naturalHeight
      }
    }));
  };

  const getImageStyle = (index: number) => {
    const dimensions = imageDimensions[index];
    if (!dimensions) {
      return { width: '54px', height: '54px' }; // Default while loading
    }

    const isPortrait = dimensions.height > dimensions.width;
    
    if (isPortrait) {
      return { height: '54px', width: 'auto' };
    } else {
      return { width: '54px', height: 'auto' };
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">Sem imagem</span>
      </div>
    );
  }

  return (
    <div className="w-[478px] flex flex-col md:flex-row gap-2 md:gap-4">

      {/* Desktop - Thumbnails */}
      <div className="w-[56px] hidden md:flex flex-col gap-2 mt-6 ml-6">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            onMouseEnter={() => setSelectedImage(index)}
            className={`w-[54px] h-[54px] border-2 rounded overflow-hidden flex items-center justify-center ${selectedImage === index ? 'border-blue-500' : 'border-gray-300'
              }`}
          >
            <img
              src={`http://localhost:3000${image}`}
              alt={`${title} - ${index + 1}`}
              className="object-cover"
              style={getImageStyle(index)}
              onLoad={(e) => handleImageLoad(index, e)}
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="w-[340px]"> {/* Removido text-left */}
        <div className="relative w-full h-80 md:h-[500px] bg-white rounded-lg overflow-hidden">
          <img
            src={`http://localhost:3000${images[selectedImage]}`}
            alt={title}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] object-cover"
          />
        </div>

      </div>
    </div>
  );
}
