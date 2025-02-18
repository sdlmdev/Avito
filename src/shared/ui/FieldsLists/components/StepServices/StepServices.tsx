import {AdvertisementTypeService} from 'entities/Advertisement/model/types/advertisement';
import {useTranslation} from 'react-i18next';

import {Input} from 'shared/ui/Input';

interface ServicesValuesData {
  experience: number | string;
  cost: number | string;
  schedule?: string;
}

interface StepServicesProps {
  valuesData: ServicesValuesData;
  handleExperienceChange: (value: number) => void;
  handleCostChange: (value: number) => void;
  handleScheduleChange?: (value: string) => void;
  isSchedule?: boolean;
}

export const StepServices = ({
  valuesData,
  handleExperienceChange,
  handleCostChange,
  handleScheduleChange,
  isSchedule = true,
}: StepServicesProps) => {
  const {t} = useTranslation();

  return (
    <>
      <Input
        value={(valuesData as AdvertisementTypeService).experience}
        onChange={(e) => handleExperienceChange(Number(e.target.value))}
        placeholder={t('Опыт работы')}
        type="number"
        required
        max={100}
        min={0}
        label={t('Опыт работы')}
      />
      <Input
        value={(valuesData as AdvertisementTypeService).cost}
        onChange={(e) => handleCostChange(Number(e.target.value))}
        placeholder={t('Стоимость')}
        type="number"
        required
        max={10 ** 9}
        min={1}
        label={t('Стоимость')}
      />
      {isSchedule && handleScheduleChange && (
        <Input
          value={(valuesData as AdvertisementTypeService).schedule}
          onChange={(e) => handleScheduleChange(e.target.value)}
          placeholder={t('График работы')}
          maxLength={30}
          label={t('График работы')}
        />
      )}
    </>
  );
};
