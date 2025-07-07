import React from 'react';

interface CardProps {
  children: React.ReactNode;
  padding?: boolean;
  className?: string;
}

export function Card({ children, padding = true, className = '' }: CardProps) {
  return (
    <div
      className={
        `bg-white border border-gray-200 rounded shadow-sm ${
          padding ? 'p-4' : ''
        } ${className}`.trim()
      }
    >
      {children}
    </div>
  );
}
