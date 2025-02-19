import {StateScheme} from 'app/providers/StoreProvider';

import {getAuthUsername} from './getAuthUsername';

describe('Тесты getAuthUsername', () => {
  test('Должен возвращать имя пользователя, если оно установлено в состоянии', () => {
    const state: DeepPartial<StateScheme> = {
      authForm: {
        username: 'testName',
      },
    };

    expect(getAuthUsername(state as StateScheme)).toEqual('testName');
  });

  test('Должен возвращать пустую строку, если имя пользователя не установлено в состоянии', () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getAuthUsername(state as StateScheme)).toEqual('');
  });
});
