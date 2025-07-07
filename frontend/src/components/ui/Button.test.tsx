// frontend/src/components/ui/Button.test.tsx
// Testa se o componente Button renderiza corretamente o texto passado via props.
// Testa se o componente Button aplica a classe `w-full` quando fullWidth=true.
// Testa se o componente Button aplica classes de tamanho e variante corretas.
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('deve renderizar o texto passado via props', () => {
    render(<Button>Comprar agora</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Comprar agora');
  });
  it('aplica a classe `w-full` quando fullWidth=true', () => {
    render(<Button fullWidth>Teste</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });
  
  it('aplica classes de tamanho e variante corretas', () => {
    render(<Button variant="secondary" size="sm">Teste</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('px-3 py-1 text-sm');
    expect(btn).toHaveClass('bg-gray-200 text-gray-800');
  });
});
