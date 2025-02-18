import {AdvertisementDefault} from 'entities/Advertisement/model/types/advertisement';
import {useTranslation} from 'react-i18next';

import {Input} from '../../../Input';

interface MainStepProps {
  valuesData: AdvertisementDefault;
  handleNameChange: (value: string) => void;
  handleDescriptionChange: (value: string) => void;
  handleLocationChange: (value: string) => void;
}

export const MainStep = ({
  valuesData,
  handleNameChange,
  handleDescriptionChange,
  handleLocationChange,
}: MainStepProps) => {
  const {t} = useTranslation();

  return (
    <>
      <Input
        value={valuesData.name}
        onChange={(e) => handleNameChange(e.target.value)}
        placeholder={t('Название')}
        maxLength={200}
        required
        minLength={3}
        label={t('Название')}
      />
      <Input
        value={valuesData.description}
        onChange={(e) => handleDescriptionChange(e.target.value)}
        placeholder={t('Описание')}
        maxLength={200}
        minLength={3}
        label={t('Описание')}
      />
      <Input
        value={valuesData.location}
        onChange={(e) => handleLocationChange(e.target.value)}
        placeholder={t('Локация')}
        required
        maxLength={50}
        minLength={3}
        label={t('Локация')}
      />
    </>
  );
};
