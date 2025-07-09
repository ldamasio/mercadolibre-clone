// frontend/src/components/product/ProductFeatures.tsx
import React from 'react';
import { ProductFeatures as ProductFeaturesType } from '@/types/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faMemory, faCamera, faCameraRetro, faWeight, faRulerCombined, faFingerprint, faWifi, faSimCard, faMicrochip, faExpandArrowsAlt, faBarcode, faBatteryFull, faCheckCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

interface ProductFeaturesProps {
  features: ProductFeaturesType;
  description: string;
}

// Mapeamento de ícones para nomes de características comuns
const featureIconMap: Record<string, any> = {
  'Tamaño de la pantalla': faMobileAlt,
  'Memoria interna': faMemory,
  'Cámara trasera principal': faCamera,
  'Cámara frontal principal': faCameraRetro,
  'Peso': faWeight,
  'Altura': faRulerCombined,
  'Largura': faRulerCombined,
  'Profundidade': faRulerCombined,
  'Huella dactilar': faFingerprint,
  'Con NFC': faWifi,
};

function getFeatureIcon(name: string) {
  return featureIconMap[name] || faQuestionCircle;
}

export function ProductFeatures({ features, description }: ProductFeaturesProps) {
  // Agrupa as features principais e de tela/dimensões em uma lista única para exibição
  const mainFeatures = [
    ...(features.main || []),
    ...(features.screen
      ? [
        { name: 'Tamaño de la pantalla', value: features.screen.size },
        { name: 'Resolución', value: features.screen.resolution },
        { name: 'Tecnología', value: features.screen.technology },
      ]
      : []),
    ...(features.dimensions
      ? [
        { name: 'Altura', value: features.dimensions.height },
        { name: 'Largura', value: features.dimensions.width },
        { name: 'Profundidade', value: features.dimensions.depth },
        { name: 'Peso', value: features.dimensions.weight },
      ]
      : []),
  ];

  // Exemplo: encontrar a feature de tamanho de tela para barra de progresso
  const screenSize = features.screen?.size || mainFeatures.find(f => f.name.toLowerCase().includes('tamaño'))?.value;
  // Extrai o valor numérico do tamanho da tela (ex: '6.6 "' => 6.6)
  const screenSizeValue = screenSize ? parseFloat(screenSize.replace(/[^\d.]/g, '')) : null;
  // Para barra de progresso: range 4.5" (pequeno) a 7.0" (grande)
  const minScreen = 4.5, maxScreen = 7.0;
  const progress = screenSizeValue ? Math.min(1, Math.max(0, (screenSizeValue - minScreen) / (maxScreen - minScreen))) : 0.5;

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-none">

      {/* HEADER: Tamanho da tela e dimensões */}
      <h2 className="text-xl font-semibold !mb-6">Características del producto</h2>

      
      {screenSizeValue && (
        <div className="mb-4 flex flex-col gap-1">
          <div className="flex items-center mb-0">
            <FontAwesomeIcon icon={faMobileAlt} className="text-gray-500 mr-2" />
            <span className="font-medium text-sm mr-2">Tamaño de la pantalla:</span>
            <span className="font-bold text-sm">{screenSize}</span>
          </div>
          {/* Dimensões embaixo do tamanho da tela */}
          {features.dimensions?.height && features.dimensions?.width && features.dimensions?.depth && (
            <div className="text-xs text-gray-500 ml-7 mt-0.5">
              ({features.dimensions.height} cm x {features.dimensions.width} cm x {features.dimensions.depth} mm)
            </div>
          )}
          {/* Blocos de progresso e rótulos */}
          <div className="flex flex-col mt-1 ml-7 max-w-[220px]">
            {/* 5 blocos largos e finos */}
            <div className="flex items-center w-full gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                // Cálculo do índice do bloco azul
                // minScreen = 4.5, maxScreen = 7.0
                // 5 blocos: 1 = menor, 5 = maior
                const minScreen = 4.5, maxScreen = 7.0;
                const step = (maxScreen - minScreen) / 4;
                const activeIndex = Math.max(0, Math.min(4, Math.round((screenSizeValue - minScreen) / step)));
                return (
                  <div
                    key={i}
                    className={`h-2 rounded-md transition-colors duration-200 ${i === activeIndex ? 'bg-blue-500' : 'bg-gray-200'}`}
                    style={{ flex: 1 }}
                  />
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-0.5">
              <span>PEQUEÑO</span>
              <span>GRANDE</span>
            </div>
          </div>
        </div>
      )}

      {/* BODY: Grid 2 colunas, alinhamento customizado */}
      <div className="h-60 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-6">
        {/* Lado esquerdo */}
        <div className="border-4 border-blue-300 flex flex-col gap-4">
          {/* Cada feature em sua própria linha */}
          {features.main?.find(f => f.name.toLowerCase().includes('memoria interna')) && (
            <div className="flex flex-row items-center w-full">
              <FontAwesomeIcon icon={getFeatureIcon('Memoria interna')} className="text-gray-500 mr-3 w-5 h-5" />
              <span className="text-sm text-gray-700"><span className="font-medium">Memoria interna:</span> <span className="font-bold">{features.main.find(f => f.name.toLowerCase().includes('memoria interna'))?.value}</span></span>
            </div>
          )}
          {features.main?.find(f => f.name.toLowerCase().includes('cámara trasera')) && (
            <div className="flex flex-row items-center w-full">
              <FontAwesomeIcon icon={getFeatureIcon('Cámara trasera principal')} className="text-gray-500 mr-3 w-5 h-5" />
              <span className="text-sm text-gray-700"><span className="font-medium">Cámara trasera principal:</span> <span className="font-bold">{features.main.find(f => f.name.toLowerCase().includes('cámara trasera'))?.value}</span></span>
            </div>
          )}
          {features.main?.find(f => f.name.toLowerCase().includes('nfc')) && (
            <div className="flex flex-row items-center w-full">
              <FontAwesomeIcon icon={getFeatureIcon('Con NFC')} className="text-gray-500 mr-3 w-5 h-5" />
              <span className="text-sm text-gray-700"><span className="font-medium">Con NFC:</span> <span className="font-bold">{features.main.find(f => f.name.toLowerCase().includes('nfc'))?.value}</span></span>
            </div>
          )}
        </div>

        {/* Lado direito */}
        <div className="border-4 border-red-300 pl-4 flex flex-col gap-4">
          {features.main?.find(f => f.name.toLowerCase().includes('cámara frontal')) && (
            <div className="flex items-center">
              <FontAwesomeIcon icon={getFeatureIcon('Cámara frontal principal')} className="text-gray-500 mr-3 w-5 h-5" />
              <span className="text-sm text-gray-700"><span className="font-medium">Cámara frontal principal:</span> <span className="font-bold">{features.main.find(f => f.name.toLowerCase().includes('cámara frontal'))?.value}</span></span>
            </div>
          )}
          {(features.main?.find(f => f.name.toLowerCase().includes('huella dactilar')) || features.main?.find(f => f.name.toLowerCase().includes('reconocimiento facial'))) && (
            <div className="flex items-center">
              <FontAwesomeIcon icon={getFeatureIcon('Huella dactilar')} className="text-gray-500 mr-3 w-5 h-5" />
              <span className="text-sm text-gray-700"><span className="font-medium">Desbloqueo:</span> <span className="font-bold">{features.main.find(f => f.name.toLowerCase().includes('huella dactilar'))?.value || features.main.find(f => f.name.toLowerCase().includes('reconocimiento facial'))?.value}</span></span>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER: Link para ver todas as características */}
      <div className="!mt-4 flex items-center gap-2 cursor-pointer text-blue-600 text-sm hover:underline w-fit">
        <span>Ver todas las características</span>
        <svg className="w-4 h-4 inline mx-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Add uma linha cinza fina aqui */}
      <div className="w-full !mt-8 h-px border-1 border-gray-300 my-6" />

      {/* Descrição do produto */}
      <div
        className="mt-6 pl-24 pr-24 text-left"
        style={{ width: 800, maxWidth: '851px', direction: 'ltr' }}
      >
        <h3 className="font-semibold mb-2 text-base">Descripción</h3>
        <p className="text-gray-700 leading-relaxed text-sm" style={{ whiteSpace: 'pre-line' }}>
          {description}
        </p>
      </div>
    </div>
  );
}
