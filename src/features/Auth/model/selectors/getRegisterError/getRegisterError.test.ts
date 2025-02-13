import {StateScheme} from 'app/providers/StoreProvider';

import {getRegisterError} from './getRegisterError';

describe('Тесты getRegisterError', () => {
  test('Должен возвращать ошибку', () => {
    const state: DeepPartial<StateScheme> = {
      registerForm: {
        error: 'error',
      },
    };

    expect(getRegisterError(state as StateScheme)).toEqual('error');
  });

  test('Должен возвращать undefined, если значение не установлено', () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getRegisterError(state as StateScheme)).toEqual(undefined);
  });
});
