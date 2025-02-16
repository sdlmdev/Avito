import {AdvertisementList} from 'entities/Advertisement';
import {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {Pagination} from 'features/Pagination/ui/Pagination';

import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {Text} from 'shared/ui/Text';

import {fetchArticlesList} from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';

import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageMaxPage,
  getArticlesPageNum,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import {
  articlesPageActions,
  getArticles,
} from '../../model/slices/articlesPageSlice';
import styles from './AdvertisementPaginationList.module.scss';

interface ArticleInfiniteListProps {
  className?: string;
}

export const AdvertisementPaginationList = memo(
  (props: ArticleInfiniteListProps) => {
    const {className} = props;
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const curPage = useSelector(getArticlesPageNum);
    const maxPage = useSelector(getArticlesPageMaxPage);

    const onChangePage = useCallback(
      (page: number, isPrev: boolean) => {
        dispatch(articlesPageActions.setPage(isPrev ? page - 1 : page + 1));
        dispatch(fetchArticlesList({replace: true}));
      },
      [dispatch],
    );

    const onNextPageClick = useCallback(() => {
      onChangePage(curPage, false);
    }, [curPage, onChangePage]);

    const onPrevPageClick = useCallback(() => {
      onChangePage(curPage, true);
    }, [curPage, onChangePage]);

    const onPageChange = useCallback(
      (page: number) => {
        dispatch(articlesPageActions.setPage(page));
        dispatch(fetchArticlesList({replace: true}));
      },
      [dispatch],
    );

    if (error) {
      return <Text text={t('Ошибка при загрузке статей')} />;
    }

    return (
      <>
        <AdvertisementList
          isLoading={isLoading}
          view={view}
          articles={articles}
          className={className}
        />
        <Pagination
          currentPage={curPage}
          totalPages={maxPage}
          onNextPageClick={onNextPageClick}
          onPrevPageClick={onPrevPageClick}
          onPageChange={onPageChange}
          className={styles.pagination}
        />
      </>
    );
  },
);

AdvertisementPaginationList.displayName = 'AdvertisementPaginationList';
