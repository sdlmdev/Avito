import {AdvertisementType} from 'entities/Advertisement';
import {memo, useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {TabItem} from 'shared/ui/Tabs';
import {Tabs} from 'shared/ui/Tabs';

interface ArticleTypeTabsProps {
  className?: string;
  value: AdvertisementType;
  onChangeType: (type: AdvertisementType) => void;
}

export const ArticleTypeTabs = memo(
  ({className, value, onChangeType}: ArticleTypeTabsProps) => {
    const {t} = useTranslation();

    const typeTabs = useMemo<Array<TabItem>>(
      () => [
        {
          value: AdvertisementType.ALL,
          content: t('Все'),
        },
        {
          value: AdvertisementType.IMMOVABLES,
          content: t('Недвижимость'),
        },
        {
          value: AdvertisementType.AUTOMOBILE,
          content: t('Авто'),
        },
        {
          value: AdvertisementType.SERVICES,
          content: t('Услуги'),
        },
      ],
      [t],
    );

    const onTabClick = useCallback(
      (tab: TabItem) => {
        onChangeType(tab.value as AdvertisementType);
      },
      [onChangeType],
    );

    return (
      <Tabs
        tabs={typeTabs}
        value={value}
        onTabClick={onTabClick}
        className={className}
      />
    );
  },
);

ArticleTypeTabs.displayName = 'ArticleTypeTabs';
