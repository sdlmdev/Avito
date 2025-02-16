import {getUserData} from 'entities/User';
import {JSX} from 'react';
import {useSelector} from 'react-redux';
import {Navigate, useLocation} from 'react-router-dom';

import {getRouteMain} from 'shared/constants/router';

interface RequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth = ({children}: RequireAuthProps) => {
  const auth = useSelector(getUserData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={getRouteMain()} state={{from: location}} replace />;
  }

  return children;
};
