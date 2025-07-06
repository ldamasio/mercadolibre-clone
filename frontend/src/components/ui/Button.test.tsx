import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  it('deve renderizar o texto passado via props', () => {
    render(<Button>Comprar agora</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Comprar agora');
  });
});
