import {AdvertisementTypeImmovables} from 'entities/Advertisement/model/types/advertisement';
import {useTranslation} from 'react-i18next';

import {Input} from 'shared/ui/Input';

interface ImmovablesValuesData {
  area: number | string;
  rooms: number | string;
  price: number | string;
}

interface StepImmovablesProps {
  valuesData: ImmovablesValuesData;
  handleAreaChange: (value: number | string) => void;
  handleRoomsChange: (value: number | string) => void;
  handlePriceChange: (value: number | string) => void;
}

export const StepImmovables = ({
  valuesData,
  handleAreaChange,
  handleRoomsChange,
  handlePriceChange,
}: StepImmovablesProps) => {
  const {t} = useTranslation();

  return (
    <>
      <Input
        value={(valuesData as AdvertisementTypeImmovables).area}
        onChange={(e) => handleAreaChange(Number(e.target.value))}
        placeholder={t('Площадь')}
        type="number"
        max={100000}
        required
        min={1}
        label={t('Площадь')}
      />
      <Input
        value={(valuesData as AdvertisementTypeImmovables).rooms}
        onChange={(e) => handleRoomsChange(Number(e.target.value))}
        placeholder={t('Количество комнат')}
        type="number"
        max={50}
        required
        min={1}
        label={t('Количество комнат')}
      />
      <Input
        value={(valuesData as AdvertisementTypeImmovables).price}
        onChange={(e) => handlePriceChange(Number(e.target.value))}
        placeholder={t('Цена')}
        type="number"
        max={10 ** 9}
        required
        min={1}
        label={t('Цена')}
      />
    </>
  );
};
