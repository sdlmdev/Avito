import {LoginScheme} from '../types/loginScheme';
import {loginActions, loginReducer} from './loginSlice';

describe('Тесты loginSlice', () => {
  test('Назначение username', () => {
    const state: DeepPartial<LoginScheme> = {username: '123'};

    expect(
      loginReducer(state as LoginScheme, loginActions.setUsername('testName')),
    ).toEqual({username: 'testName'});
  });

  test('Назначение password', () => {
    const state: DeepPartial<LoginScheme> = {password: '123'};

    expect(
      loginReducer(
        state as LoginScheme,
        loginActions.setPassword('testPassword'),
      ),
    ).toEqual({password: 'testPassword'});
  });
});
