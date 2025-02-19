import {AdvertisementDetailsSkeleton} from 'entities/Advertisement/ui/AdvertisementDetails/AdvertisementDetailsSkeleton/AdvertisementDetailsSkeleton';
import {memo, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {Button, ButtonTheme} from 'shared/ui/Button';
import {Text} from 'shared/ui/Text';

import {
  getAdvertisementDetailsError,
  getAdvertisementDetailsIsLoading,
} from '../../model/selectors/advertisementDetails';
import {fetchAdvertisementById} from '../../model/services/fetchAdvertisementById/fetchArticleById';
import {advertisementDetailsReducer} from '../../model/slice/advertisementDetailsSlice';
import {Advertisement} from './Advertisement/Advertisement';
import styles from './AdvertisementDetails.module.scss';

interface AdvertisementDetailsProps {
  id?: string;
}

const reducers: ReducersList = {
  advertisementDetails: advertisementDetailsReducer,
};

export const AdvertisementDetails = memo(({id}: AdvertisementDetailsProps) => {
  const {t} = useTranslation();
  const isLoading = useSelector(getAdvertisementDetailsIsLoading);
  const error = useSelector(getAdvertisementDetailsError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdvertisementById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = <AdvertisementDetailsSkeleton />;
  } else if (error) {
    content = (
      <div className={styles.errorWrapper}>
        <Text
          align="center"
          title={t('Произошла ошибка при загрузке объявления')}
        />
        <Button
          theme={ButtonTheme.BLUE}
          onClick={() => window.location.reload()}
        >
          {t('Обновить страницу')}
        </Button>
      </div>
    );
  } else {
    content = <Advertisement />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      {content}
    </DynamicModuleLoader>
  );
});

AdvertisementDetails.displayName = 'AdvertisementDetails';
