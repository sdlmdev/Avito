import cn from 'classnames';
import {HTMLAttributeAnchorTarget, memo} from 'react';
import {useTranslation} from 'react-i18next';

import {Text} from 'shared/ui/Text';

import {AdvertisementView} from '../../model/consts/advertisementConstants';
import {AdvertisementVariant} from '../../model/types/advertisement';
import {AdvertisementListItem} from '../AdvertisementListItem/AdvertisementListItem';
import {AdvertisementListItemSkeleton} from '../AdvertisementListItem/AdvertisementListItemSkeleton';
import styles from './AdvertisementList.module.scss';

interface AdvertisementListProps {
  className?: string;
  articles: Array<AdvertisementVariant>;
  isLoading?: boolean;
  target?: HTMLAttributeAnchorTarget;
  view?: AdvertisementView;
}

const getSkeletons = (view: AdvertisementView) =>
  new Array(5)
    .fill(0)
    .map((item, index) => (
      <AdvertisementListItemSkeleton key={index} view={view} />
    ));

export const AdvertisementList = memo(
  ({
    className,
    articles,
    view = AdvertisementView.SMALL,
    isLoading,
    target,
  }: AdvertisementListProps) => {
    const {t} = useTranslation();

    if (!isLoading && !articles.length) {
      return (
        <div
          className={cn(
            styles.AdvertisementList,
            className,
            styles[view],
            styles.empty,
          )}
        >
          <Text size="l" title={t('Объявления не найдены')} />
        </div>
      );
    }

    return (
      <div
        className={cn(styles.AdvertisementList, styles[view])}
        data-testid="AdvertisementList"
      >
        {!isLoading &&
          articles.map((item) => (
            <AdvertisementListItem
              advertisement={item}
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

AdvertisementList.displayName = 'AdvertisementList';
