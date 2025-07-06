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

// frontend/src/components/common/Footer.tsx
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white border-t mt-8 md:mt-16">
      <div className="px-4 py-6 md:py-8 max-w-7xl mx-auto">
        {/* Mobile Footer */}
        <div className="md:hidden space-y-4">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Ajuda</h3>
            <div className="space-y-1 text-sm">
              <a href="#" className="block text-gray-600">Comprar</a>
              <a href="#" className="block text-gray-600">Vender</a>
              <a href="#" className="block text-gray-600">Resolução de problemas</a>
            </div>
          </div>
          
          <div className="text-center border-t pt-4">
            <p className="text-xs text-gray-600">
              Copyright © 1999-2024 Ebazar.com.br LTDA.
            </p>
          </div>
        </div>

        {/* Desktop Footer */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Sobre</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Mercado Libre</a></li>
                <li><a href="#" className="hover:text-blue-600">Investor relations</a></li>
                <li><a href="#" className="hover:text-blue-600">Tendências</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Outros sites</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Desenvolvedores</a></li>
                <li><a href="#" className="hover:text-blue-600">Mercado Pago</a></li>
                <li><a href="#" className="hover:text-blue-600">Mercado Shops</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Ajuda</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Comprar</a></li>
                <li><a href="#" className="hover:text-blue-600">Vender</a></li>
                <li><a href="#" className="hover:text-blue-600">Resolução de problemas</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Redes sociais</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-600">Facebook</a></li>
                <li><a href="#" className="hover:text-blue-600">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-4 text-center text-sm text-gray-600">
            <p>Copyright © 1999-2024 Ebazar.com.br LTDA.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
