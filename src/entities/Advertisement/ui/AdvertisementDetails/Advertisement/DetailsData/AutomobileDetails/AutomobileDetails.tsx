import {useTranslation} from 'react-i18next';

import {Text} from 'shared/ui/Text';

import {AdvertisementTypeAutomobile} from '../../../../../model/types/advertisement';

const AutomobileDetails = ({
  advertisement,
}: {
  advertisement: AdvertisementTypeAutomobile;
}) => {
  const {t} = useTranslation();

  return (
    <>
      <Text title={`${t('Марка')}: ${advertisement.brand}`} />
      <Text title={`${t('Модель')}: ${advertisement.model}`} />
      <Text title={`${t('Год')}: ${advertisement.year}`} />
      <Text title={`${t('Пробег')}: ${advertisement.mileage} ${t('км')}`} />
    </>
  );
};

export default AutomobileDetails;
