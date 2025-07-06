// frontend/src/components/common/Breadcrumb.tsx
import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-xs sm:text-sm overflow-x-auto">
      <ol className="flex items-center space-x-1 sm:space-x-2 whitespace-nowrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {item.href ? (
              <Link href={item.href} className="text-blue-600 hover:text-blue-800 truncate max-w-[120px] sm:max-w-none">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500 truncate max-w-[120px] sm:max-w-none">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
