import {StateScheme} from 'app/providers/StoreProvider';

export const getAuthPassword = (state: StateScheme) =>
  state?.authForm?.password || '';
