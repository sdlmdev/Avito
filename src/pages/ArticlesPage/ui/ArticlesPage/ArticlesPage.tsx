import {memo, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import {Page} from 'widgets/Page';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {StickyContentLayout} from 'shared/ui/StickyContentLayout';

import {initArticlesPage} from '../../model/services/initArticlesPage/initArticlesPage';
import {articlesPageReducer} from '../../model/slices/articlesPageSlice';
import {AdvertisementPaginationList} from '../AdvertisementPaginationList/AdvertisementPaginationList';
import {FiltersContainer} from '../FiltersContainer/FiltersContainer';
import {ViewSelector} from '../ViewSelector/ViewSelectorContainer';
import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  advertisementsPage: articlesPageReducer,
};

const ArticlesPage = ({className}: ArticlesPageProps) => {
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
