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
    <Suspense fallback={<PageLoader />}>
      <Navbar />
      <AppRouter />
    </Suspense>
  );
};

export default App;
