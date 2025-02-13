import {routeConfig} from 'app/providers/router/config/routeConfig';
import {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {PageLoader} from 'widgets/PageLoader';

import styles from './AppRouter.module.scss';

const AppRouter = () => {
  return (
    <Routes>
      {Object.values(routeConfig).map(({path, element}) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<PageLoader />}>
              <div className={styles.pageWrapper}>{element}</div>
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default AppRouter;
