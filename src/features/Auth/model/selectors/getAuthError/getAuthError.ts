import {StateScheme} from 'app/providers/StoreProvider';

export const getAuthError = (state: StateScheme) => state?.authForm?.error;
