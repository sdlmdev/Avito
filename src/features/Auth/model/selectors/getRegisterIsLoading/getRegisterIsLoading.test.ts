import {StateScheme} from 'app/providers/StoreProvider';

import {getRegisterIsLoading} from './getRegisterIsLoading';

describe('Тесты getRegisterIsLoading', () => {
  test('Должен возвращать true, если isLoading установлен в состоянии', () => {
    const state: DeepPartial<StateScheme> = {
      registerForm: {
        isLoading: true,
      },
    };

    expect(getRegisterIsLoading(state as StateScheme)).toEqual(true);
  });

  test('Должен возвращать false, если isLoading не установлен в состоянии', () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getRegisterIsLoading(state as StateScheme)).toEqual(false);
  });
});
