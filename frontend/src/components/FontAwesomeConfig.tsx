'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// impede a injeção automática de <style> pelo core
config.autoAddCss = false;

// Esse componente não renderiza nada visível,
// mas garante que o CSS esteja carregado
export default function FontAwesomeConfig() {
  return null;
}
