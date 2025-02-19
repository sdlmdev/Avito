import {StateScheme} from 'app/providers/StoreProvider';

import {getAuthError} from './getAuthError';

describe('Тесты getAuthError', () => {
  test('Должен возвращать ошибку', () => {
    const state: DeepPartial<StateScheme> = {
      authForm: {
        error: 'error',
      },
    };

    expect(getAuthError(state as StateScheme)).toEqual('error');
  });

  test('Должен возвращать undefined, если ошибка не установлена в состоянии', () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getAuthError(state as StateScheme)).toEqual(undefined);
  });
});
