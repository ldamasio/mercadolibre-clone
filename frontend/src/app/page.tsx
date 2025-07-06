import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="text-2xl font-bold text-center mt-5">
        MercadoLibre Clone
      </h1>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/2 h-1/2 bg-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-bold">
            Bem-vindo ao MercadoLibre Clone
          </h2>
          <p className="text-sm text-gray-600">
            Este é um clone do MercadoLibre, uma plataforma de comércio eletrônico.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/2 h-1/2 bg-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-bold">
            Detalhe do produto
          </h2>
          <p className="text-sm text-gray-600">
            <button>
              <Link href="/products/MLB123456789">
                Ver detalhes do produto
              </Link>
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}

