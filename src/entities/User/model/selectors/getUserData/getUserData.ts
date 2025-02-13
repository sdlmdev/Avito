import {StateScheme} from 'app/providers/StoreProvider';

export const getUserData = (state: StateScheme) => state.user.authData;
