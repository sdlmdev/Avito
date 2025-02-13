import {StateScheme} from 'app/providers/StoreProvider';

import {getLoginError} from './getLoginError';

describe('Тесты getLoginError', () => {
  test('should return error', () => {
    const state: DeepPartial<StateScheme> = {
      loginForm: {
        error: 'error',
      },
    };

    expect(getLoginError(state as StateScheme)).toEqual('error');
  });

  test('Проверка работоспособности с пустым значением', () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getLoginError(state as StateScheme)).toEqual(undefined);
  });
});
