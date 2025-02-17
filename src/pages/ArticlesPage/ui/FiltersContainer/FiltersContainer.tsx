import cn from 'classnames';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {Input, InputSize} from 'shared/ui/Input';

import {useArticleFilters} from '../../lib/hooks/useArticleFilters';
import {ArticleFields} from './ArticleFields/ArticleFields';
import {ArticleTypeTabs} from './ArticleTypeTabs/ArticleTypeTabs';
import styles from './FiltersContainer.module.scss';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const {className} = props;

  const {
    onChangeLocation,
    onChangeType,
    type,
    onChangeSearch,
    search,
    location,
  } = useArticleFilters();

  const {t} = useTranslation();

  return (
    <div className={cn(styles.ArticlesFilters, {}, [className])}>
      <ArticleTypeTabs
        value={type}
        onChangeType={onChangeType}
        className={styles.tabs}
      />
      <label className={styles.label}>
        {t('Поиск')}
        <Input
          onChange={(e) => onChangeSearch(e.target.value)}
          value={search}
          inputSize={InputSize.M}
          placeholder={t('Поиск')}
        />
      </label>
      <label className={styles.label}>
        {t('Город')}
        <Input
          onChange={(e) => onChangeLocation(e.target.value)}
          value={location}
          inputSize={InputSize.M}
          placeholder={t('Город')}
        />
      </label>

      <ArticleFields />
    </div>
  );
});

FiltersContainer.displayName = 'FiltersContainer';
