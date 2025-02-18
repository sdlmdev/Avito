import {useTranslation} from 'react-i18next';

import {Text} from 'shared/ui/Text';

import {AdvertisementTypeImmovables} from '../../../../../model/types/advertisement';

const ImmovablesDetails = ({
  advertisement,
}: {
  advertisement: AdvertisementTypeImmovables;
}) => {
  const {t} = useTranslation();

  return (
    <>
      <Text title={`${t('Тип недвижимости')}: ${advertisement.propertyType}`} />
      <Text title={`${t('Площадь')}: ${advertisement.area} ${t('кв.м')}`} />
      <Text title={`${t('Комнаты')}: ${advertisement.rooms}`} />
      <Text title={`${t('Цена')}: ${advertisement.price} ${t('₽')}`} />
    </>
  );
};

export default ImmovablesDetails;
