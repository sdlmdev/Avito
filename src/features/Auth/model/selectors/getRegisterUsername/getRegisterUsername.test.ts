import {StateScheme} from 'app/providers/StoreProvider';

import {getRegisterUsername} from './getRegisterUsername';

describe('Тесты getRegisterUsername', () => {
  test('Должен возвращать имя пользователя, если оно установлено в состоянии', () => {
    const state: DeepPartial<StateScheme> = {
      registerForm: {
        username: 'testName',
      },
    };

    expect(getRegisterUsername(state as StateScheme)).toEqual('testName');
  });

  test('Должен возвращать пустую строку, если имя пользователя не установлено в состоянии', () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getRegisterUsername(state as StateScheme)).toEqual('');
  });
});
