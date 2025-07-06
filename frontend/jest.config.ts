import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Aponta para o diretório onde está o next.config.js
  dir: './',
});

// Personalize configurações adicionais aqui:
const customJestConfig: Config = {
  // Reconheça TS/TSX
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Transforme arquivos via ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  // Mapeie paths do tsconfig
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(customJestConfig);
