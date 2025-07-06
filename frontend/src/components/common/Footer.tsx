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
