import {StateScheme} from 'app/providers/StoreProvider';

import {getLoginIsLoading} from './getLoginIsLoading';

describe('Тесты getLoginIsLoading', () => {
  test('Должен возвращать true, если isLoading установлено в true', () => {
    const state: DeepPartial<StateScheme> = {
      loginForm: {
        isLoading: true,
      },
    };

    expect(getLoginIsLoading(state as StateScheme)).toEqual(true);
  });

  test('Должен возвращать false, если isLoading не установлено', () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getLoginIsLoading(state as StateScheme)).toEqual(false);
  });
});
