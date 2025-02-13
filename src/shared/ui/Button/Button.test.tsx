import {render, screen} from '@testing-library/react';

import {Button} from 'shared/ui/Button/Button';

describe('Тесты кнопки', () => {
  test('Проверка рендера', () => {
    render(<Button>test</Button>);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('Проверка наличия класса', () => {
    render(<Button>test</Button>);
    expect(screen.getByText('test')).toHaveClass('blue');
    screen.debug();
  });
});
