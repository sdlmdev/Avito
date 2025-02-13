import {StateScheme} from 'app/providers/StoreProvider';

export const getRegisterUsername = (state: StateScheme) =>
  state?.registerForm?.username || '';
