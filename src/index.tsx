import ErrorBoundary from 'app/providers/ErrorBoundary/ui/ErrorBoundary';
import {StoreProvider} from 'app/providers/StoreProvider';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import {ForceUpdateProvider} from 'shared/lib/render/forceUpdate';

import App from './app/App';
import './app/styles/index.scss';
import './shared/config/i18n/i18n';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);

root.render(
  <StoreProvider>
    <BrowserRouter>
      <ErrorBoundary>
        <ForceUpdateProvider>
          <App />
        </ForceUpdateProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StoreProvider>,
);
