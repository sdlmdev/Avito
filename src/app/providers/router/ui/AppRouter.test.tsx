import {screen} from '@testing-library/react';

import {getRouteMain, getRoutePlacementForm} from 'shared/constants/router';
import {componentRender} from 'shared/lib/tests/componentRender/componentRender';

import AppRouter from './AppRouter';

describe('Тесты роутера', () => {
  test('Страница должна отрендериться', async () => {
    componentRender(<AppRouter />, {
      route: getRouteMain(),
    });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  test('Страница не найдена', async () => {
    componentRender(<AppRouter />, {
      route: '/some',
    });

    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });

  test('Редирект неавторизованного пользователя на главную', async () => {
    componentRender(<AppRouter />, {
      route: getRoutePlacementForm(),
    });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  test('Доступ к закрытой страницы для авторизованного пользователя', async () => {
    componentRender(<AppRouter />, {
      route: getRoutePlacementForm(),
      initialState: {
        user: {authData: {}},
      },
    });

    const page = await screen.findByTestId('PlacementFormPage');
    expect(page).toBeInTheDocument();
  });
});
