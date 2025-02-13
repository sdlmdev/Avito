import {StateScheme} from 'app/providers/StoreProvider';

import {getLoginIsLoading} from './getLoginIsLoading';

describe('Тесты getLoginIsLoading', () => {
  test('should return true', () => {
    const state: DeepPartial<StateScheme> = {
      loginForm: {
        isLoading: true,
      },
    };

    expect(getLoginIsLoading(state as StateScheme)).toEqual(true);
  });

  test('Проверка работоспособности с пустым значением', () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getLoginIsLoading(state as StateScheme)).toEqual(false);
  });
});
