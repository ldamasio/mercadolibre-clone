
// frontend/src/components/ui/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm ${padding ? 'p-4' : ''} ${className}`}>
      {children}
    </div>
  );
}
