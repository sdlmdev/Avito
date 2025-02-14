import {RouteProps} from 'react-router-dom';

import {AdvertisementPage} from 'pages/AdvertisementPage';
import {MainPage} from 'pages/MainPage';
import {NotFoundPage} from 'pages/NotFoundPage';
import {PlacementFormPage} from 'pages/PlacementFormPage';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
};

export enum AppRoutes {
  MAIN = 'main',
  PLACEMENT_FORM = 'form',
  ADVERTISEMENT = 'item/:id',
  NOT_FOUND = 'not_found',
}

export const routePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PLACEMENT_FORM]: '/form',
  [AppRoutes.ADVERTISEMENT]: '/item/:id',
  [AppRoutes.NOT_FOUND]: '/*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: routePath[AppRoutes.MAIN],
    element: <MainPage />,
  },
  [AppRoutes.PLACEMENT_FORM]: {
    path: routePath[AppRoutes.PLACEMENT_FORM],
    element: <PlacementFormPage />,
    authOnly: true,
  },
  [AppRoutes.ADVERTISEMENT]: {
    path: routePath[AppRoutes.ADVERTISEMENT],
    element: <AdvertisementPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: routePath[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  },
};
