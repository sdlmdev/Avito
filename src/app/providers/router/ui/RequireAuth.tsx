import {getUserData} from 'entities/User';
import {JSX} from 'react';
import {useSelector} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';

import {routePath} from '../config/routeConfig';

interface RequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth = ({children}: RequireAuthProps) => {
  const auth = useSelector(getUserData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={routePath.main} state={{from: location}} replace />;
  }

  return children;
};
