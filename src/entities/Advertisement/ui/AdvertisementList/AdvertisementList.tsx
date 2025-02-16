import cn from 'classnames';
import {Advertisement} from 'entities/Advertisement';
import {HTMLAttributeAnchorTarget, memo} from 'react';
import {useTranslation} from 'react-i18next';

import {Text} from 'shared/ui/Text';

import {AdvertisementView} from '../../model/consts/advertisementConstants';
import {ArticleListItem} from '../ArticleListItem/ArticleListItem';
import {ArticleListItemSkeleton} from '../ArticleListItem/ArticleListItemSkeleton';
import styles from './ArticleList.module.scss';

interface ArticleListProps {
  className?: string;
  articles: Array<Advertisement>;
  isLoading?: boolean;
  target?: HTMLAttributeAnchorTarget;
  view?: AdvertisementView;
}

const getSkeletons = (view: AdvertisementView) =>
  new Array(view === AdvertisementView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton
        className={styles.card}
        key={index}
        view={view}
      />
    ));

export const ArticleList = memo(
  ({
    className,
    articles,
    view = AdvertisementView.SMALL,
    isLoading,
    target,
  }: ArticleListProps) => {
    const {t} = useTranslation();

    if (!isLoading && !articles.length) {
      return (
        <div className={cn(styles.ArticleList, className, styles[view])}>
          <Text size="l" title={t('Статьи не найдены')} />
        </div>
      );
    }

    return (
      <div
        className={cn(styles.ArticleList, styles[view])}
        data-testid="ArticleList"
      >
        {articles.map((item) => (
          <ArticleListItem
            article={item}
            view={view}
            target={target}
            key={item.id}
            className={styles.card}
          />
        ))}
        {isLoading && getSkeletons(view)}
      </div>
    );
  },
);

ArticleList.displayName = 'ArticleList';
