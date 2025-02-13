import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {UserScheme} from 'entities/User';

import {LoginScheme, RegisterScheme} from 'features/Auth';

import {rtkApi} from 'shared/api/rtkApi';

export interface StateScheme {
  user: UserScheme;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

  loginForm?: LoginScheme;
  registerForm?: RegisterScheme;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateScheme;
}

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateScheme>;
  reduce: (state: StateScheme, action: AnyAction) => CombinedState<StateScheme>;
  add: (key: StateSchemeKey, reducer: Reducer) => void;
  remove: (key: StateSchemeKey) => void;
  getMountedReducers: () => MountedReducers;
}

export type StateSchemeKey = keyof StateScheme;

export type MountedReducers = OptionalRecord<StateSchemeKey, boolean>;

export interface ReduxStoreWithManager extends EnhancedStore<StateScheme> {
  reducerManager: ReducerManager;
}
