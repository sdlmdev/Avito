import {StateScheme} from 'app/providers/StoreProvider';

export const getRegisterError = (state: StateScheme) =>
  state?.registerForm?.error;
