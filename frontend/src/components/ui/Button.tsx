import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses =
    variant === 'primary'
      ? 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400'
      : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-200';
  let sizeClasses: string;
  switch (size) {
    case 'sm':
      sizeClasses = 'px-3 py-1.5 text-sm';
      break;
    case 'lg':
      sizeClasses = 'px-6 py-3 text-lg';
      break;
    default:
      sizeClasses = 'px-4 py-2 text-base';
  }
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      {...props}
      className={[baseClasses, variantClasses, sizeClasses, widthClass, className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
}
