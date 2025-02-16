import {TestAsyncThunk} from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import {login} from './login';

describe('Тесты login', () => {
  test('Должен пройти успешный процесс авторизации', async () => {
    const userValue = {username: 'testName'};

    const thunk = new TestAsyncThunk(login);
    thunk.api.post.mockReturnValue(Promise.resolve({data: userValue}));

    const result = await thunk.callThunk({
      username: 'testName',
      password: 'testPassword',
    });

    // expect(thunk.dispatch).toHaveBeenCalledWith(
    //   userActions.setUserData(userValue),
    // );

    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(userValue);
  });

  test('Процесс авторизации должен пройти с ошибкой', async () => {
    const thunk = new TestAsyncThunk(login);
    thunk.api.post.mockReturnValue(Promise.resolve({status: 403}));

    const result = await thunk.callThunk({
      username: 'testName',
      password: 'testPassword',
    });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
