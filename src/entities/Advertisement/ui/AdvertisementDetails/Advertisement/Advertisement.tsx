import cn from 'classnames';
import {getUserData} from 'entities/User';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {AppImage} from 'shared/ui/AppImage';
import {Button} from 'shared/ui/Button';
import {Text} from 'shared/ui/Text';

import {AdvertisementType} from '../../../model/consts/advertisementConstants';
import {getAdvertisementDetailsData} from '../../../model/selectors/advertisementDetails';
import {changeAdvertisementData} from '../../../model/services/changeAdvertisementData/changeAdvertisementData';
import {
  AdvertisementTypeAutomobile,
  AdvertisementTypeImmovables,
  AdvertisementTypeService,
} from '../../../model/types/advertisement';
import {AdvertisementVariant} from '../../../model/types/advertisement';
import styles from '../../AdvertisementDetails/AdvertisementDetails.module.scss';
import {AdvertisementDetailsForm} from '../AdvertisementDetailsForm/AdvertisementDetailsForm';
import AutomobileDetails from './DetailsData/AutomobileDetails/AutomobileDetails';
import ImmovablesDetails from './DetailsData/ImmovablesDetails/ImmovablesDetails';
import ServiceDetails from './DetailsData/ServiceDetails/ServiceDetails';

export const Advertisement = () => {
  const dispatch = useAppDispatch();
  const advertisement = useSelector(getAdvertisementDetailsData);
  const [isEditing, setIsEditing] = useState(false);
  const {t} = useTranslation();
  const [isError, setIsError] = useState(false);
  const auth = useSelector(getUserData);
  const {user} = advertisement || {};

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedAdvertisement: AdvertisementVariant) => {
    const res = await dispatch(changeAdvertisementData(updatedAdvertisement));

    if (res.meta.requestStatus !== 'fulfilled') {
      setIsError(true);
    } else {
      setIsError(false);
      setIsEditing(false);
    }
  };

  if (!advertisement) {
    return <Text title={t('Что-то пошло не так')} />;
  }

  return (
    <div
      className={cn(styles.AdvertisementDetails, {[styles.editing]: isEditing})}
    >
      {isEditing ? (
        <>
          <AdvertisementDetailsForm
            isError={isError}
            advertisement={advertisement}
            onSave={handleSave}
          />
          <Button
            className={styles.btnBack}
            onClick={() => setIsEditing(false)}
          >
            {t('Назад')}
          </Button>
        </>
      ) : (
        <>
          <AppImage
            src={advertisement.image as string}
            className={styles.img}
          />

          <div className={styles.descr}>
            <Text
              title={`${t('Название')}: ${advertisement.name}`}
              size="l"
              bold
            />
            <Text title={`${t('Локация')}: ${advertisement.location}`} />
            <Text title={`${t('Описание')}: ${advertisement.description}`} />
            {advertisement.type === AdvertisementType.IMMOVABLES && (
              <ImmovablesDetails
                advertisement={advertisement as AdvertisementTypeImmovables}
              />
            )}
            {advertisement.type === AdvertisementType.AUTOMOBILE && (
              <AutomobileDetails
                advertisement={advertisement as AdvertisementTypeAutomobile}
              />
            )}
            {advertisement.type === AdvertisementType.SERVICES && (
              <ServiceDetails
                advertisement={advertisement as AdvertisementTypeService}
              />
            )}
            {Number(user?.id) === Number(auth?.id) && (
              <Button className={styles.button} onClick={handleEditClick}>
                {t('Редактировать')}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
