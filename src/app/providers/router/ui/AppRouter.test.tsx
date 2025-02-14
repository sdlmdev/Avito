import {screen} from '@testing-library/react';

import {componentRender} from 'shared/lib/tests/componentRender/componentRender';

import {routePath} from '../config/routeConfig';
import AppRouter from './AppRouter';

describe('Тесты роутера', () => {
  test('Страница должна отрендериться', async () => {
    componentRender(<AppRouter />, {
      route: routePath.main,
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
      route: routePath.form,
    });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  test('Доступ к закрытой страницы для авторизованного пользователя', async () => {
    componentRender(<AppRouter />, {
      route: routePath.form,
      initialState: {
        user: {authData: {}},
      },
    });

    const page = await screen.findByTestId('PlacementFormPage');
    expect(page).toBeInTheDocument();
  });
});
