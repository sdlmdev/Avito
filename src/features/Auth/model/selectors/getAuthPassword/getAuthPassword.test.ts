import {StateScheme} from 'app/providers/StoreProvider';

import {getAuthPassword} from './getAuthPassword';

describe('Тесты getAuthPassword', () => {
  test('Должен возвращать пароль, если он установлен в состоянии', () => {
    const state: DeepPartial<StateScheme> = {
      authForm: {
        password: 'testPassword',
      },
    };

    expect(getAuthPassword(state as StateScheme)).toEqual('testPassword');
  });

  test('Должен возвращать пустую строку, если значение не установлено', () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getAuthPassword(state as StateScheme)).toEqual('');
  });
});
