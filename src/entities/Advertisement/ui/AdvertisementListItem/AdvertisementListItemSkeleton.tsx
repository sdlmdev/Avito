import cn from 'classnames';
import {memo} from 'react';

import {Skeleton} from 'shared/ui/Skeleton';

import {AdvertisementView} from '../../model/consts/advertisementConstants';
import styles from './AdvertisementListItem.module.scss';

interface AdvertisementListItemSkeletonProps {
  className?: string;
  view: AdvertisementView;
}

export const AdvertisementListItemSkeleton = memo(
  ({className, view}: AdvertisementListItemSkeletonProps) => {
    if (view === AdvertisementView.BIG) {
      return (
        <div
          className={cn(styles.AdvertisementListItem, className, styles[view])}
        >
          <article className={styles.card}>
            <Skeleton width="100%" height={250} className={styles.img} />
            <div className={styles.text}>
              <Skeleton width="100%" height={21} className={styles.title} />
              <Skeleton width="100%" height={21} className={styles.skeleton} />
              <Skeleton width="100%" height={21} className={styles.skeleton} />
              <Skeleton width="100%" height={21} className={styles.skeleton} />
              <Skeleton width="100%" height={21} className={styles.skeleton} />
            </div>
          </article>
        </div>
      );
    }

    return (
      <div
        className={cn(styles.AdvertisementListItem, className, styles[view])}
      >
        <article className={styles.card}>
          <Skeleton width={200} height={200} className={styles.img} />
          <div className={styles.text}>
            <Skeleton width={170} height={24} className={styles.title} />
            <Skeleton width={170} height={24} className={styles.skeleton} />
            <Skeleton width={170} height={24} className={styles.skeleton} />
            <Skeleton width={170} height={24} className={styles.skeleton} />
          </div>
        </article>
      </div>
    );
  },
);

AdvertisementListItemSkeleton.displayName = 'AdvertisementListItemSkeleton';
