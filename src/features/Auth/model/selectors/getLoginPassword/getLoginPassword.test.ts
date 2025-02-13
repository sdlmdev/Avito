import {StateScheme} from 'app/providers/StoreProvider';

import {getLoginPassword} from './getLoginPassword';

describe('Тесты getLoginPassword', () => {
  test('Проверка возвращаемого значения', () => {
    const state: DeepPartial<StateScheme> = {
      loginForm: {
        password: 'testPassword',
      },
    };

    expect(getLoginPassword(state as StateScheme)).toEqual('testPassword');
  });

  test('Проверка работоспособности с пустым значением', () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getLoginPassword(state as StateScheme)).toEqual('');
  });
});
