import {StateScheme} from 'app/providers/StoreProvider';

import {getRegisterPassword} from './getRegisterPassword';

describe('Тесты getRegisterPassword', () => {
  test('Должен возвращать пароль, если он установлен в состоянии', () => {
    const state: DeepPartial<StateScheme> = {
      registerForm: {
        password: 'testPassword',
      },
    };

    expect(getRegisterPassword(state as StateScheme)).toEqual('testPassword');
  });

  test('Должен возвращать пустую строку, если пароль не установлен в состоянии', () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getRegisterPassword(state as StateScheme)).toEqual('');
  });
});
