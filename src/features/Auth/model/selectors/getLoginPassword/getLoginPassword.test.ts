import {StateScheme} from 'app/providers/StoreProvider';

import {getLoginPassword} from './getLoginPassword';

describe('Тесты getLoginPassword', () => {
  test('Должен возвращать пароль, если он установлен в состоянии', () => {
    const state: DeepPartial<StateScheme> = {
      loginForm: {
        password: 'testPassword',
      },
    };

    expect(getLoginPassword(state as StateScheme)).toEqual('testPassword');
  });

  test('Должен возвращать пустую строку, если значение не установлено', () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getLoginPassword(state as StateScheme)).toEqual('');
  });
});
