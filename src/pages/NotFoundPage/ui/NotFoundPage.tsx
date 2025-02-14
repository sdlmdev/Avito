import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Page} from 'widgets/Page';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = memo(({}) => {
  const {t} = useTranslation('notFoundPage');

  return (
    <Page testId="NotFoundPage" className={styles.NotFoundPage}>
      {t('Страница не найдена')}
    </Page>
  );
});

NotFoundPage.displayName = 'NotFoundPage';
