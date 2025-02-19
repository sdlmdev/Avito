import {StateScheme} from 'app/providers/StoreProvider';

export const getAuthIsLoading = (state: StateScheme) =>
  state?.authForm?.isLoading || false;
