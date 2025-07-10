// frontend/src/app/products/[id]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
// import { Header } from '@/components/common/Header';
// import { Footer } from '@/components/common/Footer';
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
import { ProductFeatures } from '@/components/product/ProductFeatures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';


export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { product: data, loading, error } = useProduct(productId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* <Header /> */}
        <div className="px-4 py-8 max-w-7xl mx-auto">
          <Loading />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* <Header /> */}
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

  return (
    <div className="min-h-screen bg-custom-gray">
      {/* <Header /> */}

      {/* Main Features */}
      <main className="w-full flex flex-col items-center">

        {/* Desktop only */}
        <div className="block max-[720px]:hidden w-[1184px] mx-auto">
          <div className="!mt-6 !mb-4 text-sm text-bold text-black w-full">
            <span className="text-black !text-bold !mr-2"><strong>También puede interesarte:</strong></span>
            {[
              'celular nfc',
              'samsung a55',
              'samsung argentina',
              'samsung tienda oficial',
              'samsung con nfc',
              'moto g72',
              's21 ultra',
            ].map((item, idx) => (
              <span key={item} className="text-black mr-2">
                {item}
                {idx < 6 && <span className="mx-1 text-gray-400">|</span>}
              </span>
            ))}

          </div>

          <div className="!mb-4 overflow-x-auto">

            <div className="!mb-4">

              <p className="flex items-center gap-x-2">
                <a href="#" className="!text-blue no-underline hover:underline">Volver al listado</a>
                <span className="text-gray-400">{'>'}</span>
                <a href="#" className="!text-blue no-underline hover:underline">Celulares y Teléfonos</a>
                <span className="text-gray-400">{'>'}</span>
                <a href="#" className="!text-blue no-underline hover:underline">Celulares y Smartphones</a>
                <span className="text-gray-400">{'>'}</span>
                <a href="#" className="!text-blue no-underline hover:underline">Samsung</a>
              </p>
            </div>

            {/* Product Details Page Desktop */}
            <div className="flex bg-white border-2 border-gray-200 rounded-lg !p-4">
              <div className="w-[478px]">
                <ProductGallery images={product.images} title={product.title} />
                <ProductFeatures features={product_detail.features} description={product_detail.description} />
              </div>

              {/* Desktop only - Title here */}
              <div className="flex">
                <div className="block max-[720px]:hidden mb-4">
                  <ProductInfo product={product} seller={seller} product_detail={product_detail} />
                </div>

                {/* Right Column - Purchase Card (Desktop) - Fixed width 309px */}
                <div className="w-[325px] float-left block max-[720px]:hidden flex-shrink-0 flex-grow-0">
                  <Card className="!pl-2 !pr-2 !ml-2 !mr-2 !mt-2 !mb-2 top-4 text-sm border-2 border-gray-300">
                    <div className="!mt-4">
                      <span className="text-green-600">Envío gratis</span> a todo el país
                    </div>
                    <div className="text-sm text-gray-400">
                      Conace los termpos y las formas de envio
                    </div>

                    <div className="text-sm text-blue-400">
                      Calcular cuando lega
                    </div>

                    {/* Stock */}
                    <div className="!mt-6 !mb-6">
                      <p className="text-sm font-bold">
                        Stock disponible
                      </p>

                    </div>

                    {/* Quantity Selector */}
                    <div className="mb-4 flex w-full">
                      <span> </span>
                      <span className="text-sm">Cantidad:
                      </span>
                      <span className="font-medium !ml-2">1 unidad</span>
                      <span className="text-xs text-gray-500 !ml-4 !mt-[-4px]">
                        <svg className="w-4 h-4 inline mx-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                      <span className="text-xs text-gray-500 !ml-2">
                        <div>
                          ({product.available_quantity} disponibles)
                        </div>
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 !mb-4 !mt-4">
                      <Button variant="primary" size="lg" fullWidth className="!py-1.5 !px-4">
                        Comprar ahora
                      </Button>
                      <Button variant="secondary" size="lg" fullWidth className="!py-1.5 !px-4 !mt-2">
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
                    <div className="flex">

                      <div>
                        brandlogo
                      </div>
                      <div className="text-xs text-gray-600 mb-4">
                        <p className="text-black font-bold">+10mil ventas</p>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="!mt-6 space-y-3 text-sm">
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

                  <Card className="!pl-4 !pr-4 !pt-4 !ml-2 !mr-2 !mt-8 !mb-2 text-sm border-2 border-gray-300">
                    <h3 className="font-semibold mb-3 text-gray-800">Medios de pago</h3>

                    {/* Banner verde */}
                    <div className="flex items-center bg-green-600 text-white rounded-md !px-2 !py-4 mb-5">
                      <FontAwesomeIcon icon={faCreditCard} className="w-5 h-5 mr-2" />
                      <span className="font-medium text-sm !ml-2">¡Paga en <span className="font-bold">hasta 12 cuotas sin interés</span>!</span>
                    </div>

                    {/* Tarjetas de crédito */}
                    <div className="!mt-4 !mb-4">
                      <p className="text-sm font-semibold !mb-1">Tarjetas de crédito</p>
                      <p className="text-xs text-gray-600 !mb-2">¡Cuotas sin interés con bancos seleccionados!</p>
                      <div className="flex gap-3 items-center">
                        <FontAwesomeIcon icon={faCcMastercard} className="!w-10 !h-6 text-[#eb001b] bg-white rounded p-1" title="Mastercard" />
                        <FontAwesomeIcon icon={faCcVisa} className="!w-10 !h-6 text-[#1a1f71] bg-white rounded p-1" title="Visa" />
                        <FontAwesomeIcon icon={faCcAmex} className="!w-10 !h-6 text-[#2e77bb] bg-white rounded p-1" title="American Express" />
                        <span className="!w-10 !h-6 bg-white rounded flex items-center justify-center p-1"><FontAwesomeIcon icon={faCreditCard} className="w-5 h-5 text-blue-400 mr-1" /><span className="text-xs font-bold text-blue-400">OCA</span></span>
                      </div>
                    </div>

                    {/* Tarjetas de débito */}
                    <div className="!mb-4">
                      <p className="text-sm font-semibold !mb-1">Tarjetas de débito</p>
                      <div className="flex gap-3 items-center">
                        <span className="flex items-center !w-20 !h-6 bg-white rounded p-1"><FontAwesomeIcon icon={faCcVisa} className="w-7 h-5 text-[#1a1f71] mr-1" /></span>
                        <span className="flex items-center !w-20 !h-6 bg-white rounded p-1"><FontAwesomeIcon icon={faCcMastercard} className="w-7 h-5 text-[#eb001b] mr-1" /></span>
                      </div>
                    </div>

                    {/* Efectivo */}
                    <div className="!mb-4">
                      <p className="text-sm font-semibold !mb-1">Efectivo</p>
                      <div className="flex gap-3 items-center">
                        <span className="flex items-center w-20 h-6 bg-white rounded p-1"><FontAwesomeIcon icon={faMoneyBillWave} className="w-6 h-5 text-green-700 mr-1" /><span className="text-xs font-bold text-green-700">Abitab</span></span>
                        <span className="flex items-center w-20 h-6 bg-white rounded p-1"><FontAwesomeIcon icon={faMoneyBillWave} className="w-6 h-5 text-green-800 mr-1" /><span className="text-xs font-bold text-green-800">eBROU</span></span>
                      </div>
                    </div>

                    <a href="#" className="text-xs text-blue-600 hover:underline block !mt-2">
                      Conoce otros medios de pago
                    </a>
                  </Card>
                </div>

              </div>
            </div>
          </div>
        </div>


        {/* Mobile only - Title and Price */}
        {/* Product Details Section Mobile */}
        <div>
          <div className="hidden max-[720px]:block mt-4">
            <Card>
              <ProductInfo product={product} seller={seller} product_detail={product_detail} />
              {/* <ProductPrice product={product} installments={product_detail.installments} /> */}
            </Card>
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

      </main>

      {/* <Footer /> */}
    </div>
  );
}

