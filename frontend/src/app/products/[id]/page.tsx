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
import { ProductFeatures } from '@/components/product/ProductFeatures';
import Button from '@/components/ui/Button';
// import { Card } from '@/components/ui/Card';
// import { Loading } from '@/components/ui/Loading';
// import { ErrorMessage } from '@/components/ui/ErrorMessage';
// import { useProduct } from '@/hooks/useProduct';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  // const { product: data, loading, error } = useProduct(productId);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-100">
  //       <Header />
  //       <div className="px-4 py-8 max-w-7xl mx-auto">
  //         <Loading />
  //       </div>
  //     </div>
  //   );
  // }

  <Header />

  // if (error || !data) {
  //   return (
  //     <div className="min-h-screen bg-gray-100">
  //       <Header />
  //       <div className="px-4 py-8 max-w-7xl mx-auto">
  //         <ErrorMessage 
  //           message={error?.message || 'Produto não encontrado'} 
  //           onRetry={() => window.location.reload()}
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  const { product, product_detail, seller } = data;

  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Celulares e Telefones', href: '#' },
    { label: 'Celulares e Smartphones', href: '#' },
    { label: product.title }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="px-4 py-4 max-w-7xl mx-auto">
        {/* Breadcrumb - Hidden on mobile */}
        <div className="hidden md:block mb-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        {/* Mobile Layout */}
        <div className="block lg:hidden space-y-4">
          {/* Product Title - Mobile */}
          {/* <Card>
            <ProductInfo product={product} />
          </Card> */}
          
          {/* Gallery - Mobile */}
          <Card padding={false}>
            <div className="p-4">
              <ProductGallery images={product.images} title={product.title} />
            </div>
          </Card>
          
          {/* Price and Actions - Mobile */}
          <Card>
            <ProductPrice product={product} installments={product_detail.installments} />
            
            {/* Shipping */}
            <div className="mb-4">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-semibold">
                    Chegará grátis {product_detail.shipping.estimated_delivery}
                  </p>
                  <p className="text-xs text-gray-600">Benefício Mercado Pontos</p>
                </div>
              </div>
            </div>
            
            {/* Stock - Mobile */}
            <div className="mb-4">
              <p className="text-sm mb-2 font-semibold">Estoque disponível</p>
              <p className="text-xs text-gray-500">
                ({product.available_quantity} disponíveis)
              </p>
            </div>
            
            {/* Actions - Mobile */}
            <div className="space-y-2">
              <Button variant="primary" size="md" fullWidth>
                Comprar agora
              </Button>
              <Button variant="secondary" size="md" fullWidth>
                Adicionar ao carrinho
              </Button>
            </div>
          </Card>
          
          {/* Seller - Mobile */}
          <SellerInfo seller={seller} />
          
          {/* Features - Mobile */}
          <ProductFeatures 
            features={product_detail.features} 
            description={product_detail.description}
          />
          
          {/* Payment Methods - Mobile */}
          <Card>
            <h3 className="font-semibold mb-3 text-lg">Meios de pagamento</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Cartões de crédito</p>
                <p className="text-xs text-gray-600">Em até 12x</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Pix</p>
                <p className="text-xs text-gray-600">À vista</p>
              </div>
              <a href="#" className="text-sm text-blue-600">
                Ver todos os meios de pagamento
              </a>
            </div>
          </Card>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left column - Gallery and Features */}
          <div className="lg:col-span-2 space-y-8">
            <Card padding={false}>
              <div className="p-6">
                <ProductGallery images={product.images} title={product.title} />
              </div>
            </Card>
            
            <ProductFeatures 
              features={product_detail.features} 
              description={product_detail.description}
            />
          </div>
          
          {/* Right column - Product Info */}
          <div className="space-y-4">
            <Card>
              <ProductInfo product={product} />
              <ProductPrice product={product} installments={product_detail.installments} />
              
              {/* Shipping */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Chegará grátis {product_detail.shipping.estimated_delivery}</h3>
                <div className="flex items-start gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-sm">Frete grátis em milhares de produtos</p>
                    <p className="text-xs text-gray-600">Benefício Mercado Pontos</p>
                  </div>
                </div>
              </div>
              
              {/* Stock */}
              <div className="mb-6">
                <p className="text-sm mb-2">
                  <span className="font-semibold">Estoque disponível</span>
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm">Quantidade:</span>
                  <select className="border rounded px-2 py-1 text-sm">
                    <option>1 unidade</option>
                    <option>2 unidades</option>
                    <option>3 unidades</option>
                    <option>4 unidades</option>
                    <option>5 unidades</option>
                  </select>
                  <span className="text-xs text-gray-500">
                    ({product.available_quantity} disponíveis)
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="space-y-3">
                <Button variant="primary" size="lg" fullWidth>
                  Comprar agora
                </Button>
                <Button variant="secondary" size="lg" fullWidth>
                  Adicionar ao carrinho
                </Button>
              </div>
              
              {/* Benefits */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm">Compra Garantida</p>
                    <p className="text-xs text-gray-600">receba o produto que está esperando ou devolvemos o dinheiro.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm">Mercado Pontos</p>
                    <p className="text-xs text-gray-600">Você acumula {Math.floor(product.price * 2)} pontos.</p>
                  </div>
                </div>
                
                {product_detail.warranty_months > 0 && (
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <p className="text-sm">{product_detail.warranty_months} meses de garantia</p>
                      <p className="text-xs text-gray-600">{product_detail.warranty_type}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            <SellerInfo seller={seller} />
            
            {/* Payment Methods */}
            <Card>
              <h3 className="font-semibold mb-4">Meios de pagamento</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-2">Até 12x sem cartão de crédito</p>
                  <img src="/mercadopago.png" alt="Mercado Pago" className="h-8" />
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Cartões de crédito</p>
                  <p className="text-xs text-gray-600 mb-2">Pague em até 12x!</p>
                  <div className="flex gap-2">
                    <img src="/visa.png" alt="Visa" className="h-6" />
                    <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                    <img src="/amex.png" alt="American Express" className="h-6" />
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Cartões de débito</p>
                  <div className="flex gap-2">
                    <img src="/visa.png" alt="Visa" className="h-6" />
                    <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Pix</p>
                  <img src="/pix.png" alt="Pix" className="h-6" />
                </div>
                
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Conheça outros meios de pagamento
                </a>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Questions Section - Both Mobile and Desktop */}
        {data.questions && data.questions.length > 0 && (
          <Card className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Perguntas e respostas</h2>
            <div className="space-y-4">
              {data.questions.map(question => (
                <div key={question.id} className="border-b pb-4">
                  <p className="font-medium text-sm md:text-base">{question.question}</p>
                  {question.answer && (
                    <p className="text-gray-600 mt-2 ml-4 text-sm">{question.answer}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Faça uma pergunta</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Escreva sua pergunta..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <Button className="w-full sm:w-auto">Perguntar</Button>
              </div>
            </div>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
