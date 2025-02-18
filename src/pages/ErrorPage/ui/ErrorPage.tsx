import cn from 'classnames';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Page} from 'widgets/Page';

import {Button} from 'shared/ui/Button/Button';
import {Text} from 'shared/ui/Text';

import styles from './ErrorPage.module.scss';

export const ErrorPage = memo(() => {
  const {t} = useTranslation();

  const reloadPage = () => {
    location.reload();
  };

  return (
    <Page testId="ErrorPage" className={styles.ErrorPage}>
      <Text title={t('error')} size="m" />
      <Button onClick={reloadPage} className={cn(styles.reloadBtn)}>
        {t('Обновить страницу')}
      </Button>
    </Page>
  );
});

ErrorPage.displayName = 'ErrorPage';
