// frontend/src/components/common/Footer.tsx
import React from 'react';

export function Footer() {
  return (
    <footer className="border-3 border-red-300  flex flex-col items-center justify-center bg-white w-full mt-8 desktop:mt-16">
      <div className="border-3 border-blue-300 w-[1184px] h-24 mx-auto flex flex-wrap">
        <div className="px-4 py-6 desktop:py-8 max-w-7xl mx-auto">
          {/* App Promotion */}
          <div className="bg-white py-2 flex justify-center items-center">
            <span className="font-semibold">¡Comprá y vendé con la app!</span>
          </div>


          {/* Links */}
          <div className="flex flex-wrap justify-center text-gray-800 text-xs gap-x-4">
            <a href="#">Trabajá con nosotros</a>
            <a href="#">Términos y condiciones</a>
            <a href="#">Promociones</a>
            <a href="#">Cómo cuidamos tu privacidad</a>
            <a href="#">Accesibilidad</a>
            <a href="#">Información al usuario financiero</a>
            <a href="#">Defensa del Consumidor</a>
            <a href="#">Información sobre seguros</a>
            <a href="#">Blog</a>
            <a href="#">Tendencias</a>
          </div>

          {/* Copyright and Address */}
          <div className="border-t pt-4 flex flex-col text-left">
            <p className="text-xs text-gray-500">
              © 1999-2025 MercadoLibre S.R.L.
            </p>
            <p className="text-xs text-gray-600">
              Av. Caseros 3039, Piso 2, CP 1264, Parque Patricios, CABA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
