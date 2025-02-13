import {StateScheme} from 'app/providers/StoreProvider';

import {getLoginError} from './getLoginError';

describe('Тесты getLoginError', () => {
  test('Должен возвращать ошибку', () => {
    const state: DeepPartial<StateScheme> = {
      loginForm: {
        error: 'error',
      },
    };

    expect(getLoginError(state as StateScheme)).toEqual('error');
  });

  test('Должен возвращать undefined, если ошибка не установлена в состоянии', () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getLoginError(state as StateScheme)).toEqual(undefined);
  });
});
