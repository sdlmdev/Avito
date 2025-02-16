import cn from 'classnames';
import {HTMLAttributeAnchorTarget, memo} from 'react';

import {getRouteAdvertisement} from 'shared/constants/router';
import {AppImage} from 'shared/ui/AppImage';
import {AppLink} from 'shared/ui/AppLink';
import {Skeleton} from 'shared/ui/Skeleton';
import {Text} from 'shared/ui/Text';

import {AdvertisementView} from '../../model/consts/advertisementConstants';
import {Advertisement} from '../../model/types/advertisement';
import styles from './AdvertisementListItem.module.scss';

export interface AdvertisementListItemProps {
  className?: string;
  advertisement: Advertisement;
  view: AdvertisementView;
  target?: HTMLAttributeAnchorTarget;
}

export const AdvertisementListItem = memo(
  ({className, advertisement, view, target}: AdvertisementListItemProps) => {
    return (
      <AppLink
        data-testid="AdvertisementListItem"
        target={target}
        to={getRouteAdvertisement(advertisement.id)}
        className={cn(styles.AdvertisementListItem, className, styles[view])}
      >
        <article className={styles.card}>
          <AppImage
            fallback={<Skeleton width={200} height={200} />}
            alt={advertisement.name}
            src={advertisement.image as string}
            className={styles.img}
          />
          <div className={styles.text}>
            <Text title={advertisement.name} className={styles.title} />
            <Text title={advertisement.location} className={styles.location} />
            <Text title={advertisement.type} className={styles.type} />
          </div>
        </article>
      </AppLink>
    );
  },
);

AdvertisementListItem.displayName = 'AdvertisementListItemRedesigned';
