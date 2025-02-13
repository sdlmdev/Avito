import {StateScheme} from 'app/providers/StoreProvider';

export const getRegisterPassword = (state: StateScheme) =>
  state?.registerForm?.password || '';
