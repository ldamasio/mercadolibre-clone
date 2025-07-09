import React, { useState } from 'react';
import Image from 'next/image';

interface ProductAvailabilityProps {
  images: string[];
  title: string;
}

export function ProductAvailability({ images, title }: ProductAvailabilityProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="border-2 border-purple-500">
      <h1>Product Availability</h1>
    </div>
  );
}
