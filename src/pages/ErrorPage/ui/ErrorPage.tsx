import cn from 'classnames';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';

import {Button} from 'shared/ui/Button/Button';

import styles from './ErrorPage.module.scss';

export const ErrorPage = memo(() => {
  const {t} = useTranslation('errorPage');

  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={styles.ErrorPage}>
      <p>{t('error')}</p>
      <Button onClick={reloadPage} className={cn(styles.reloadBtn)}>
        {t('Обновить страницу')}
      </Button>
    </div>
  );
});

ErrorPage.displayName = 'ErrorPage';
