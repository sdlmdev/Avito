import {AdvertisementTypeAutomobile} from 'entities/Advertisement/model/types/advertisement';
import {useTranslation} from 'react-i18next';

import {Input} from 'shared/ui/Input';

interface AutomobileValuesData {
  brand: string;
  model: string;
  year: number | string;
  mileage: number | string;
}

interface StepAutomobileProps {
  valuesData: AutomobileValuesData;
  handleBrandChange: (value: string) => void;
  handleModelChange: (value: string) => void;
  handleYearChange: (value: number) => void;
  handleMileageChange: (value: number) => void;
}

export const StepAutomobile = ({
  valuesData,
  handleBrandChange,
  handleModelChange,
  handleYearChange,
  handleMileageChange,
}: StepAutomobileProps) => {
  const {t} = useTranslation();

  return (
    <>
      <Input
        value={(valuesData as AdvertisementTypeAutomobile).brand}
        onChange={(e) => handleBrandChange(e.target.value)}
        placeholder={t('Марка')}
        required
        maxLength={30}
        minLength={1}
        label={t('Марка')}
      />
      <Input
        value={(valuesData as AdvertisementTypeAutomobile).model}
        onChange={(e) => handleModelChange(e.target.value)}
        placeholder={t('Модель')}
        required
        maxLength={30}
        minLength={1}
        label={t('Модель')}
      />
      <Input
        value={(valuesData as AdvertisementTypeAutomobile).year}
        onChange={(e) => handleYearChange(Number(e.target.value))}
        placeholder={t('Год выпуска')}
        type="number"
        max={new Date().getFullYear()}
        required
        min={1}
        label={t('Год выпуска')}
      />
      <Input
        value={(valuesData as AdvertisementTypeAutomobile).mileage}
        onChange={(e) => handleMileageChange(Number(e.target.value))}
        placeholder={t('Пробег')}
        type="number"
        required
        max={10 ** 6}
        min={0}
        label={t('Пробег')}
      />
    </>
  );
};
