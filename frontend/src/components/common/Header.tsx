// frontend/src/components/common/Header.tsx
import React, { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-yellow-400 shadow-sm">
      <div className="px-4 max-w-7xl mx-auto">
        {/* Mobile Header */}
        <div className="flex items-center justify-between h-12 md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">ML</span>
          </Link>
          
          <button className="p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between h-12">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">Mercado</span>
            <span className="text-2xl font-bold text-gray-700">Libre</span>
          </Link>
          
          <div className="flex-1 max-w-xl mx-8">
            <input
              type="search"
              placeholder="Buscar produtos, marcas e muito mais..."
              className="w-full px-4 py-2 rounded-sm border-0 focus:outline-none"
            />
          </div>
          
          <nav className="flex items-center space-x-4">
            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
              Crie sua conta
            </Link>
            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
              Entre
            </Link>
            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
              Compras
            </Link>
          </nav>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-2">
          <input
            type="search"
            placeholder="Buscar..."
            className="w-full px-3 py-1.5 rounded-sm border-0 focus:outline-none text-sm"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-4 py-3 space-y-3">
            <Link href="#" className="block text-gray-700 text-sm">
              Crie sua conta
            </Link>
            <Link href="#" className="block text-gray-700 text-sm">
              Entre
            </Link>
            <Link href="#" className="block text-gray-700 text-sm">
              Compras
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
