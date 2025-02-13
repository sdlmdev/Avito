import {DeepPartial, ReducersMapObject} from '@reduxjs/toolkit';
import {StateScheme} from 'app/providers/StoreProvider/config/stateScheme';
import {createReduxStore} from 'app/providers/StoreProvider/config/store';
import {ReactNode} from 'react';
import {Provider} from 'react-redux';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateScheme>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateScheme>>;
}

export const StoreProvider = ({
  children,
  initialState,
  asyncReducers,
}: StoreProviderProps) => {
  const store = createReduxStore(
    initialState as StateScheme,
    asyncReducers as ReducersMapObject<StateScheme>,
  );

  return <Provider store={store}>{children}</Provider>;
};
