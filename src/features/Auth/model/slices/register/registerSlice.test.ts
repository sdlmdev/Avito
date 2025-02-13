import {RegisterScheme} from 'features/Auth';

import {registerActions, registerReducer} from './registerSlice';

describe('Тесты registerSlice', () => {
  test('Должен установить username', () => {
    const state: DeepPartial<RegisterScheme> = {username: '123'};

    expect(
      registerReducer(
        state as RegisterScheme,
        registerActions.setUsername('testName'),
      ),
    ).toEqual({username: 'testName'});
  });

  test('Должен установить password', () => {
    const state: DeepPartial<RegisterScheme> = {password: '123'};

    expect(
      registerReducer(
        state as RegisterScheme,
        registerActions.setPassword('testPassword'),
      ),
    ).toEqual({password: 'testPassword'});
  });
});
