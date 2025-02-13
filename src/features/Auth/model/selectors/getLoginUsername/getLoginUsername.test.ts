import {StateScheme} from 'app/providers/StoreProvider';

import {getLoginUsername} from './getLoginUsername';

describe('Тесты getLoginUsername', () => {
  test('Проверка возвращаемого значения', () => {
    const state: DeepPartial<StateScheme> = {
      loginForm: {
        username: 'testName',
      },
    };

    expect(getLoginUsername(state as StateScheme)).toEqual('testName');
  });

  test('Проверка работоспособности с пустым значением', () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getLoginUsername(state as StateScheme)).toEqual('');
  });
});
