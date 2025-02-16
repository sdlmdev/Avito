import cn from 'classnames';
import {HTMLAttributeAnchorTarget, memo} from 'react';

import {getRouteAdvertisement} from 'shared/constants/router';
import {AppImage} from 'shared/ui/AppImage';
import {AppLink} from 'shared/ui/AppLink';
import {Skeleton} from 'shared/ui/Skeleton';
import {Text} from 'shared/ui/Text';

import {AdvertisementView} from '../../model/consts/advertisementConstants';
import {Advertisement} from '../../model/types/advertisement';
import styles from './ArticleListItem.module.scss';

export interface ArticleListItemProps {
  className?: string;
  article: Advertisement;
  view: AdvertisementView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(
  ({className, article, view, target}: ArticleListItemProps) => {
    const userInfo = <Text bold text={article?.user?.username} />;

    if (view === AdvertisementView.BIG) {
      return (
        <article
          data-testid="ArticleListItem"
          className={cn(styles.ArticleListItem, className, styles[view])}
        >
          <AppImage
            fallback={<Skeleton width="100%" height={250} />}
            src={article.image as string}
            className={styles.img}
            alt={article.name}
          />
          <AppLink
            className={styles.articleData}
            target={target}
            to={getRouteAdvertisement(article.id)}
          >
            {userInfo}
            <Text title={article.name} bold />
            <Text title={article.location} size="s" />
          </AppLink>
        </article>
      );
    }

    return (
      <AppLink
        data-testid="ArticleListItem"
        target={target}
        to={getRouteAdvertisement(article.id)}
        className={cn(styles.ArticleListItem, {}, [className, styles[view]])}
      >
        <div className={styles.card}>
          <AppImage
            fallback={<Skeleton width="100%" height={200} />}
            alt={article.name}
            src={article.image as string}
            className={styles.img}
          />
          <div className={styles.info}>
            <Text title={article.name} className={styles.title} />
            <Text title={article.location} className={styles.location} />
            <Text title={article.type} className={styles.type} />
            <div className={styles.footer}>{userInfo}</div>
          </div>
        </div>
      </AppLink>
    );
  },
);

ArticleListItem.displayName = 'ArticleListItemRedesigned';
