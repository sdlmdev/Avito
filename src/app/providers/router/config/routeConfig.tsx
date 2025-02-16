import {RouteProps} from 'react-router-dom';

import {
  getRouteAdvertisement,
  getRouteMain,
  getRouteNotFound,
  getRoutePlacementForm,
} from 'shared/constants/router';

import {AdvertisementPage} from 'pages/AdvertisementPage';
import {ArticlesPage} from 'pages/ArticlesPage';
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

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    // element: <MainPage />,
    element: <ArticlesPage />,
  },
  [AppRoutes.PLACEMENT_FORM]: {
    path: getRoutePlacementForm(),
    element: <PlacementFormPage />,
    authOnly: true,
  },
  [AppRoutes.ADVERTISEMENT]: {
    path: getRouteAdvertisement(':id'),
    element: <AdvertisementPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },
};
