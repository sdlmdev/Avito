import {configureStore, ReducersMapObject} from '@reduxjs/toolkit';
import {StateScheme} from 'app/providers/StoreProvider';
import {ThunkExtraArg} from 'app/providers/StoreProvider/config/stateScheme';
import {userReducer} from 'entities/User';
import {CombinedState, Reducer} from 'redux';

import {$api} from 'shared/api/api';
import {rtkApi} from 'shared/api/rtkApi';

import {createReducerManager} from './reducerManager';

export const createReduxStore = (
  initialState?: StateScheme,
  asyncReducers?: ReducersMapObject<StateScheme>,
) => {
  const rootReducers: ReducersMapObject<StateScheme> = {
    ...asyncReducers,
    user: userReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateScheme>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }).concat(rtkApi.middleware),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
