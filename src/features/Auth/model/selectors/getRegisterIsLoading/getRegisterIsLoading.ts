import {StateScheme} from 'app/providers/StoreProvider';

export const getRegisterIsLoading = (state: StateScheme) =>
  state?.registerForm?.isLoading || false;
