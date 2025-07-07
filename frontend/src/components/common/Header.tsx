// frontend/src/components/common/Header.tsx
import React, { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [technologyOpen, setTechnologyOpen] = useState(false);

  const categories = [
    'Vehículos',
    'Inmuebles',
    'Supermercado',
    'Tecnología',
    'Compra Internacional',
    'Hogar y Muebles',
    'Electrodomésticos',
    'Herramientas',
    'Construcción',
    'Deportes y Fitness',
    'Accesorios para Vehículos',
    'Para tu Negocio',
    'Mascotas',
    'Moda',
    'Juegos y Juguetes',
    'Bebés',
    'Belleza y Cuidado Personal',
    'Salud y Equipamiento Médico',
    'Industrias y Oficinas',
    'Agro',
    'Productos Sustentables',
    'Servicios',
    'Más vendidos',
    'Tiendas oficiales',
    'Ver más categorías'
  ];

  const technologySubcategories = [
    'Celulares y Teléfonos',
    'Computación',
    'Cámaras y Accesorios',
    'Electrónica, Audio y Video'
  ];

  return (
    <header className="bg-yellow-300 shadow-sm w-full flex flex-col items-center">
      {/* Mobile Header */}
      {/* <div className="flex items-center justify-between md:hidden">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-blue-600">ML</span>
        </Link>

        <div className="flex-1 max-w-xl mx-8">
          <input
            type="search"
            placeholder="Buscar productos, marcas y más..."
            className="w-full px-4 py-2 mx-4 border-0 focus:outline-none bg-white text-gray-700"
          />

        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <button className="p-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div> */}

      {/* Desktop Header */}
      <div className="border-b border-gray-300 hidden md:flex w-[1184px] h-24 mx-auto flex flex-wrap">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-gray-700 block">mercado</span>
          <span className="text-2xl font-bold text-gray-700 block">libre</span>
        </Link>

        <div className="w-[580px] h-[40px] mx-[163px] flex items-center bg-white rounded-sm">
          {/* campo de busca */}
          <input
            type="search"
            placeholder="Buscar productos, marcas y más..."
            className="flex-1 h-full px-3 placeholder-gray-400 text-gray-700 border-none focus:outline-none"
          />

          {/* divisória vertical */}
          <div className="w-px h-1/2 bg-gray-300 mx-2" />

          {/* ícone de lupa (Heroicon outline) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-400 mx-[15px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.6-6.15a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Linha de baixo */}
        <div className="border-2 border-green-500 w-[1184px] h-[40px] mx-auto flex flex-wrap">

        <nav className="flex items-center space-x-4 relative">
          <div
            className="relative"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => {
              setCategoriesOpen(false);
              setTechnologyOpen(false);
            }}
          >
            <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
              Categorías
            </Link>

            {categoriesOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="py-2">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="relative"
                      onMouseEnter={() => category === 'Tecnología' && setTechnologyOpen(true)}
                      onMouseLeave={() => category === 'Tecnología' && setTechnologyOpen(false)}
                    >
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {category}
                      </Link>

                      {category === 'Tecnología' && technologyOpen && (
                        <div className="absolute top-0 left-full ml-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
                          <div className="py-2">
                            {technologySubcategories.map((subcategory, subIndex) => (
                              <Link
                                key={subIndex}
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {subcategory}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
            Ofertas
          </Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
            Cupones
          </Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
            Supermercado
          </Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
            Vender
          </Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900 text-sm">
            Ayuda
          </Link>
        </nav>
          
          
        </div>
        

      </div>
    </header>
  );
}
