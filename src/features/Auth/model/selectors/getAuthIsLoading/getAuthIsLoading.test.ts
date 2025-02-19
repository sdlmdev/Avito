import {StateScheme} from 'app/providers/StoreProvider';

import {getAuthIsLoading} from './getAuthIsLoading';

describe('Тесты getAuthIsLoading', () => {
  test('Должен возвращать true, если isLoading установлено в true', () => {
    const state: DeepPartial<StateScheme> = {
      authForm: {
        isLoading: true,
      },
    };

    expect(getAuthIsLoading(state as StateScheme)).toEqual(true);
  });

  test('Должен возвращать false, если isLoading не установлено', () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getAuthIsLoading(state as StateScheme)).toEqual(false);
  });
});
