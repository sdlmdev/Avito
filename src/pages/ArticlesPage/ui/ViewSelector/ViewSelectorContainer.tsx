import cn from 'classnames';
import {AdvertisementView} from 'entities/Advertisement';
import {memo} from 'react';

import ListIcon from 'shared/assets/icons/burger.svg';
import TiledIcon from 'shared/assets/icons/tile.svg';

import {useArticleFilters} from '../../lib/hooks/useArticleFilters';
import styles from './ViewSelector.module.scss';

interface ViewSelectorProps {
  className?: string;
}

const viewTypes = [
  {
    view: AdvertisementView.SMALL,
    icon: TiledIcon,
  },
  {
    view: AdvertisementView.BIG,
    icon: ListIcon,
  },
];

export const ViewSelector = memo(({className}: ViewSelectorProps) => {
  const {view, onChangeView} = useArticleFilters();

  const onClick = (newView: AdvertisementView) => () => {
    onChangeView(newView);
  };

  return (
    <div className={cn(styles.ViewSelector, className)}>
      {viewTypes.map((viewType) => (
        <viewType.icon
          key={viewType.view}
          onClick={onClick(viewType.view)}
          className={cn(styles.icon, {
            [styles.notSelected]: viewType.view !== view,
          })}
        />
      ))}
    </div>
  );
});

ViewSelector.displayName = 'ViewSelector';
