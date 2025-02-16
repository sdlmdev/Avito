import cn from 'classnames';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Page} from 'widgets/Page';

import {Button} from 'shared/ui/Button/Button';

import styles from './ErrorPage.module.scss';

export const ErrorPage = memo(() => {
  const {t} = useTranslation();

  const reloadPage = () => {
    location.reload();
  };

  return (
    <Page testId="ErrorPage" className={styles.ErrorPage}>
      <p>{t('error')}</p>
      <Button onClick={reloadPage} className={cn(styles.reloadBtn)}>
        {t('Обновить страницу')}
      </Button>
    </Page>
  );
});

ErrorPage.displayName = 'ErrorPage';
