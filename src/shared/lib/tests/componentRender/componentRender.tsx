import {ReducersMapObject} from '@reduxjs/toolkit';
import {render} from '@testing-library/react';
import {StateScheme, StoreProvider} from 'app/providers/StoreProvider';
import 'app/styles/index.scss';
import {ReactNode} from 'react';
import {I18nextProvider} from 'react-i18next';
import {MemoryRouter} from 'react-router-dom';

import i18nForTests from '../../../config/i18n/i18ForTests';

export interface componentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateScheme>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateScheme>>;
}

interface TestProviderProps {
  children: ReactNode;
  options?: componentRenderOptions;
}

export const TestProvider = ({children, options = {}}: TestProviderProps) => {
  const {route = '/', initialState, asyncReducers} = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider
        asyncReducers={asyncReducers as ReducersMapObject<StateScheme>}
        initialState={initialState as StateScheme}
      >
        <I18nextProvider i18n={i18nForTests}>
          <div className="app">{children}</div>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
};

export const componentRender = (
  component: ReactNode,
  options: componentRenderOptions = {},
) => render(<TestProvider options={options}>{component}</TestProvider>);
