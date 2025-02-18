import {Advertisement} from 'entities/Advertisement';
import {AdvertisementTypeAutomobile} from 'entities/Advertisement/model/types/advertisement';

import {Input} from 'shared/ui/Input';

import styles from '../PlacementFormPage.module.scss';

interface StepAutomobileProps {
  advertisement: Advertisement;
  t: (key: string) => string;
  handleBrandChange: (value: string) => void;
  handleModelChange: (value: string) => void;
  handleYearChange: (value: number) => void;
  handleMileageChange: (value: number) => void;
}

export const StepAutomobile = ({
  advertisement,
  t,
  handleBrandChange,
  handleModelChange,
  handleYearChange,
  handleMileageChange,
}: StepAutomobileProps) => (
  <div className={styles.step}>
    <h2>{t('Авто')}</h2>
    <Input
      value={(advertisement as AdvertisementTypeAutomobile).brand}
      onChange={(e) => handleBrandChange(e.target.value)}
      placeholder={t('Марка')}
      required
      maxLength={30}
      minLength={1}
      label={t('Марка')}
    />
    <Input
      value={(advertisement as AdvertisementTypeAutomobile).model}
      onChange={(e) => handleModelChange(e.target.value)}
      placeholder={t('Модель')}
      required
      maxLength={30}
      minLength={1}
      label={t('Модель')}
    />
    <Input
      value={(advertisement as AdvertisementTypeAutomobile).year}
      onChange={(e) => handleYearChange(Number(e.target.value))}
      placeholder={t('Год выпуска')}
      type="number"
      max={new Date().getFullYear()}
      required
      min={1}
      label={t('Год выпуска')}
    />
    <Input
      value={(advertisement as AdvertisementTypeAutomobile).mileage}
      onChange={(e) => handleMileageChange(Number(e.target.value))}
      placeholder={t('Пробег')}
      type="number"
      required
      max={10 ** 6}
      min={0}
      label={t('Пробег')}
    />
  </div>
);
