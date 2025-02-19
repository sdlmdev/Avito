import {StateScheme} from 'app/providers/StoreProvider';

export const getAuthUsername = (state: StateScheme) =>
  state?.authForm?.username || '';
