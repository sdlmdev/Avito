import {AppRouter} from 'app/providers/router';
import {userActions} from 'entities/User';
import {Suspense, useEffect} from 'react';
import {Navbar} from 'widgets/Navbar';
import {PageLoader} from 'widgets/PageLoader';

import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.checkAuth());
  }, [dispatch]);

  return (
    <div id="app" className="app">
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <main className="content-page">
          <AppRouter />
        </main>
      </Suspense>
    </div>
  );
};

export default App;
