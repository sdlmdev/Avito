import cn from 'classnames';
import {ArticleType} from 'entities/Article';
import {memo, useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {TabItem} from 'shared/ui/Tabs';
import {Tabs} from 'shared/ui/Tabs';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const {className, value, onChangeType} = props;
  const {t} = useTranslation();

  const typeTabs = useMemo<Array<TabItem>>(
    () => [
      {
        value: ArticleType.ALL,
        content: t('Все статьи'),
      },
      {
        value: ArticleType.IMMOVABLES,
        content: t('Недвижимость'),
      },
      {
        value: ArticleType.AUTOMOBILE,
        content: t('Авто'),
      },
      {
        value: ArticleType.SERVICE,
        content: t('Услуги'),
      },
    ],
    [t],
  );

  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType],
  );

  return (
    <Tabs
      // direction="column"
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
      className={cn('', {}, [className])}
    />
  );
});

ArticleTypeTabs.displayName = 'ArticleTypeTabs';
