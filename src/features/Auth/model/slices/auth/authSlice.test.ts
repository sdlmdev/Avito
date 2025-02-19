import {AuthScheme} from '../../types/authScheme';
import {authActions, authReducer} from './authSlice';

describe('Тесты loginSlice', () => {
  test('Должен установить username', () => {
    const state: DeepPartial<AuthScheme> = {username: '123'};

    expect(
      authReducer(state as AuthScheme, authActions.setUsername('testName')),
    ).toEqual({username: 'testName'});
  });

  test('Должен установить password', () => {
    const state: DeepPartial<AuthScheme> = {password: '123'};

    expect(
      authReducer(state as AuthScheme, authActions.setPassword('testPassword')),
    ).toEqual({password: 'testPassword'});
  });
});
