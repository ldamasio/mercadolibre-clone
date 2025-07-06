# Configuração de Testes com Jest em Next.js 14

Este guia descreve as mudanças necessárias para configurar e corrigir o ambiente de testes usando Jest e React Testing Library em um projeto Next.js 14 com TypeScript.

---

## 1. Instalação de Dependências

Execute no root do projeto:

```bash
npm install --save-dev \
  jest \
  jest-environment-jsdom \
  ts-jest \
  ts-node \
  @types/jest \
  @testing-library/react \
  @testing-library/jest-dom
```

* `jest`, `jest-environment-jsdom`: framework de testes e ambiente de navegador simulado.
* `ts-jest`, `ts-node`: suportam TypeScript diretamente no Jest.
* `@types/jest`: definições de tipo para Jest.
* `@testing-library/react`, `@testing-library/jest-dom`: utilitários e matchers para testes de componentes React.

---

## 2. Arquivo de Setup do Jest

Crie `jest.setup.ts` na raiz (ao lado de `jest.config.ts`):

```ts
// jest.setup.ts
import '@testing-library/jest-dom';
```

Esse import garante acesso a matchers como `toHaveTextContent()` e `toBeInTheDocument()` antes de cada suíte de testes.

---

## 3. Configuração do `jest.config.ts`

Ajuste o arquivo para carregar o setup e mapear paths:

```ts
import nextJest from 'next/jest';
import type { Config } from 'jest';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(customJestConfig);
```

---

## 4. Componente de Exemplo e Teste

### `src/components/ui/Button.tsx`

```tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded ${className}`}
    >
      {children}
    </button>
  );
}
```

### `src/components/ui/Button.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('deve renderizar o texto passado via props', () => {
    render(<Button>Comprar agora</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Comprar agora');
  });
});
```

---

## 5. Scripts no `package.json`

Adicione no bloco de scripts:

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "jest",
  "test:watch": "jest --watch"
}
```

* `npm test`: executa todos os testes uma vez.
* `npm run test:watch`: modo interativo.

---

## 6. Resultado Final

* O arquivo de setup (`jest.setup.ts`) carrega corretamente os matchers do Testing Library.
* O `jest.config.ts` está configurado para TypeScript, paths e ambiente JS-DOM.
* O componente `Button` e seu teste são encontrados pelo Jest, garantindo que `npm test` passe sem erros.

Com estas configurações, seu projeto Next.js 14 estará pronto para escrever e executar testes unitários com Jest e React Testing Library.
