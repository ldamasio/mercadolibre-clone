// frontend/src/app/products/[id]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductPrice } from '@/components/product/ProductPrice';
import { SellerInfo } from '@/components/product/SellerInfo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useProduct } from '@/hooks/useProduct';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { product: data, loading, error } = useProduct(productId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="px-4 py-8 max-w-7xl mx-auto">
          <Loading />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="px-4 py-8 max-w-7xl mx-auto">
          <ErrorMessage
            message={error?.message || 'Produto não encontrado'}
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  const { product, product_detail, seller } = data;

  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Celulares e Telefones', href: '#' },
    { label: 'Celulares e Smartphones', href: '#' },
    { label: product.title }
  ];

  return (
    <div className="min-h-screen bg-custom-gray">
      <Header />

      <main className="border-2 border-blue-500 w-full flex flex-col items-center">
        <div className="border-2 border-red-500 w-[1184px] mx-auto">
          <div className="mb-4 text-sm w-full">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          <div className="border-3 border-green-500 mb-4 desktop:mb-0 desktop:w-[478px] desktop:mx-auto px-4 py-4 overflow-x-auto">
            <p>
              Volver
            </p>

            {/* Product Details Section Desktop */}
            <div className="border-6 border-purple-500 flex">


            <div className="border-2 border-blue-500 w-[478px] flex flex-col md:flex-row gap-2 md:gap-4">

              <Card padding={false} className="border-6 border-yellow-500 w-[478px] bg-white overflow-x-auto">
                <div className="p-4">
                  <ProductGallery images={product.images} title={product.title} />
                </div>
              </Card>
              </div>





              {/* Main Features */}
              {/* Desktop only - Title here */}
              <div className="flex">
                <div className="border-6 border-orange-500 block max-[720px]:hidden mb-4">
                  <ProductInfo product={product} />
                  <ProductPrice product={product} installments={product_detail.installments} />
                  <Card className="mb-4">
                    <h3 className="text-base font-medium mb-4">Lo que tienes que saber de este producto</h3>
                    <ul className="space-y-2">
                      {product_detail.features.main.slice(0, 6).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-gray-400 mr-2">•</span>
                          <span className="text-sm">{feature.name}: {feature.value}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="text-sm text-blue-600 mt-3 hover:underline">
                      Ver características
                    </button>
                  </Card>
                  </div>

                  {/* Right Column - Purchase Card (Desktop) - Fixed width 309px */}
                  <div className="border-6 border-red-500 w-[325px] float-left block max-[720px]:hidden w-[300px] flex-shrink-0 flex-grow-0">
                    <Card className="sticky top-4 w-[325px]">
                      {/* Price Section */}
                      {/* <ProductPrice product={product} installments={product_detail.installments} /> */}

                      {/* Promo Badge */}
                      <div className="mb-4 text-xs">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          OFERTA DEL DÍA
                        </span>
                      </div>

                      {/* Stock */}
                      <p className="text-sm mb-4">
                        Stock disponible
                      </p>

                      {/* Quantity Selector */}
                      <div className="mb-4">
                        <span className="text-sm">Cantidad: </span>
                        <span className="font-medium">1 unidad</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({product.available_quantity} disponibles)
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 mb-4">
                        <Button variant="primary" size="lg" fullWidth>
                          Comprar ahora
                        </Button>
                        <Button variant="secondary" size="lg" fullWidth>
                          Agregar al carrito
                        </Button>
                      </div>

                      {/* Official Store Badge */}
                      <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded">
                        <span className="text-sm font-medium">Tienda oficial</span>
                        <span className="text-xl font-bold text-blue-600">Samsung</span>
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>

                      {/* Seller Rating */}
                      <div className="text-xs text-gray-600 mb-4">
                        <p>+10mil ventas</p>
                      </div>

                      {/* Benefits */}
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <div>
                            <p className="font-medium">Devolución gratis</p>
                            <p className="text-xs text-gray-600">Tienes 30 días desde que lo recibes</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <div>
                            <p className="font-medium">Compra Protegida</p>
                            <p className="text-xs text-gray-600">recibe el producto que esperabas o te devolvemos tu dinero</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <div>
                            <p className="font-medium">1 año de garantía de fábrica</p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Payment Methods */}
                    <Card className="mt-4">
                      <h3 className="font-medium mb-3">Medios de pago</h3>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-2">Hasta 12 cuotas sin tarjeta</p>
                          <div className="bg-green-600 text-white text-xs px-2 py-1 rounded inline-block">
                            Mercado Crédito
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Tarjetas de crédito</p>
                          <p className="text-xs text-gray-600 mb-2">¡Cuotas sin interés con bancos seleccionados!</p>
                          <div className="flex gap-2">
                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Tarjetas de débito</p>
                          <div className="flex gap-2">
                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Efectivo</p>
                          <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        </div>

                        <a href="#" className="text-sm text-blue-600 hover:underline">
                          Conocer otros medios de pago
                        </a>
                      </div>
                    </Card>
                  </div>

              </div>




              {/* Product Details Section Mobile */}

              {/* Mobile only - Title and Price */}
              <div className="hidden max-[720px]:block mt-4">
                <Card>
                  <ProductInfo product={product} />
                  {/* <ProductPrice product={product} installments={product_detail.installments} /> */}
                </Card>
                {/* Features Column - Fixed width 340px */}
                <div className="border-6 border-black-500 desktop:w-[340px] desktop:flex-col">

                  {/* Color selector (if applicable) */}
                  <Card className="mb-4">
                    <h3 className="text-base font-medium mb-3">Color: Azul oscuro</h3>
                    <div className="flex gap-2">
                      <button className="w-12 h-12 rounded-full bg-blue-900 border-2 border-blue-500"></button>
                      <button className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-300"></button>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Mobile Purchase Section */}
              <div className="hidden max-[720px]:block mt-4 space-y-4">
                <Card>
                  <div className="space-y-2 mb-4">
                    <Button variant="primary" size="lg" fullWidth>
                      Comprar ahora
                    </Button>
                    <Button variant="secondary" size="lg" fullWidth>
                      Agregar al carrito
                    </Button>
                  </div>

                  <SellerInfo seller={seller} />
                </Card>
              </div>
            </div>

          </div>




        </div>

      </main>

      <Footer />
    </div>
  );
}

