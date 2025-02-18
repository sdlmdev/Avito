import {useTranslation} from 'react-i18next';

import {Text} from 'shared/ui/Text';

import {AdvertisementTypeService} from '../../../../../model/types/advertisement';

const ServiceDetails = ({
  advertisement,
}: {
  advertisement: AdvertisementTypeService;
}) => {
  const {t} = useTranslation();

  return (
    <>
      <Text title={`${t('Тип услуги')}: ${advertisement.serviceType}`} />
      <Text title={`${t('Опыт')}: ${advertisement.experience} ${t('лет')}`} />
      <Text title={`${t('Стоимость')}: ${advertisement.cost} ${t('₽')}`} />
      {advertisement.schedule && (
        <Text title={`${t('График')}: ${advertisement.schedule}`} />
      )}
    </>
  );
};

export default ServiceDetails;
