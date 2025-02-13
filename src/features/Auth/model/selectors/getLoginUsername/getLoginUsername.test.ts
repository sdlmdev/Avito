import {StateScheme} from 'app/providers/StoreProvider';

import {getLoginUsername} from './getLoginUsername';

describe('Тесты getLoginUsername', () => {
  test('Должен возвращать имя пользователя, если оно установлено в состоянии', () => {
    const state: DeepPartial<StateScheme> = {
      loginForm: {
        username: 'testName',
      },
    };

    expect(getLoginUsername(state as StateScheme)).toEqual('testName');
  });

  test('Должен возвращать пустую строку, если имя пользователя не установлено в состоянии', () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getLoginUsername(state as StateScheme)).toEqual('');
  });
});
