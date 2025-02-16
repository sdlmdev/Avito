import {memo, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Page} from 'widgets/Page';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {StickyContentLayout} from 'shared/ui/StickyContentLayout';

import {AdvertisementPaginationList} from 'pages/ArticlesPage/ui/AdvertisementPaginationList/AdvertisementPaginationList';
import {FiltersContainer} from 'pages/ArticlesPage/ui/FiltersContainer/FiltersContainer';
import {ViewSelector} from 'pages/ArticlesPage/ui/ViewSelector/ViewSelectorContainer';

import {initArticlesPage} from '../../model/services/initArticlesPage/initArticlesPage';
import {articlesPageReducer} from '../../model/slices/articlesPageSlice';
import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  advertisementsPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const {className} = props;
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(initArticlesPage(searchParams));
  }, [dispatch, searchParams]);

  const content = (
    <StickyContentLayout
      left={<ViewSelector />}
      right={<FiltersContainer />}
      content={
        <Page testId="ArticlesPage" className={className}>
          <AdvertisementPaginationList className={styles.list} />
        </Page>
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
