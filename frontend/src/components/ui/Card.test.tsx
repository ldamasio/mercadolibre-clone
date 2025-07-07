// frontend/src/components/ui/Card.test.tsx
// Testa se o componente Card renderiza corretamente, com padding e sem padding, e com uma classe personalizada.
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card component', () => {
  it('should render children and apply padding by default', () => {
    render(<Card>Conteúdo</Card>);
    const cardDiv = screen.getByText('Conteúdo');
    expect(cardDiv).toBeInTheDocument();
    expect(cardDiv).toHaveClass('p-4');
  });

  it('should remove padding when padding={false}', () => {
    render(<Card padding={false}>Sem padding</Card>);
    const cardDiv = screen.getByText('Sem padding');
    expect(cardDiv).not.toHaveClass('p-4');
  });

  it('should accept and apply custom className', () => {
    render(<Card className="my-class">Teste</Card>);
    const cardDiv = screen.getByText('Teste');
    expect(cardDiv).toHaveClass('my-class');
  });
});
