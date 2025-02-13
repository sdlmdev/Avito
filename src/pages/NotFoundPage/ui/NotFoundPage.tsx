import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage = memo(({}) => {
  const {t} = useTranslation('notFoundPage');

  return <div className={styles.NotFoundPage}>{t('Страница не найдена')}</div>;
});

NotFoundPage.displayName = 'NotFoundPage';
