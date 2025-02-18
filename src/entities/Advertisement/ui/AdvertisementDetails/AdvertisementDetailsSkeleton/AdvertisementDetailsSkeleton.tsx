import {Skeleton} from 'shared/ui/Skeleton';

import styles from '../AdvertisementDetails.module.scss';

export const AdvertisementDetailsSkeleton = () => {
  return (
    <div className={styles.AdvertisementDetails}>
      <Skeleton className={styles.img} width="100%" height={500} />
      <div className={styles.descr}>
        <Skeleton width="100%" height={32} />
        <Skeleton width="100%" height={24} />
        <Skeleton width="100%" height={24} />
        <Skeleton width="100%" height={24} />
        <Skeleton width="100%" height={24} />
        <Skeleton width="100%" height={24} />
        <Skeleton width="100%" height={24} />
      </div>
    </div>
  );
};
