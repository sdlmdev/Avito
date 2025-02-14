import {render, screen} from '@testing-library/react';

import {Button} from 'shared/ui/Button/Button';

describe('Тесты кнопки', () => {
  test('Должен отрендерить кнопку', () => {
    render(<Button>test</Button>);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('Должен присутствовать класс blue', () => {
    render(<Button>test</Button>);
    expect(screen.getByText('test')).toHaveClass('blue');
  });
});
