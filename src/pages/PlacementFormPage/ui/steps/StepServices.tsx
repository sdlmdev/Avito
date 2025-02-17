import {Advertisement} from 'entities/Advertisement';
import {advertisementDetailsActions} from 'entities/Advertisement/model/slice/advertisementDetailsSlice';
import {AdvertisementTypeService} from 'entities/Advertisement/model/types/advertisement';

import {Input} from 'shared/ui/Input';
import {ListBox} from 'shared/ui/Popups';

import styles from '../PlacementFormPage.module.scss';

interface StepServicesProps {
  advertisement: Advertisement;
  dispatch: (action: any) => void;
  t: (key: string) => string;
  handleExperienceChange: (value: number) => void;
  handleCostChange: (value: number) => void;
  handleScheduleChange: (value: string) => void;
}

export const StepServices = ({
  advertisement,
  dispatch,
  t,
  handleExperienceChange,
  handleCostChange,
  handleScheduleChange,
}: StepServicesProps) => (
  <div className={styles.step}>
    <h2>{t('Услуги')}</h2>
    <ListBox
      items={[
        {value: 'Консультация', content: t('Консультация')},
        {value: 'Ремонт', content: t('Ремонт')},
        {value: 'Уборка', content: t('Уборка')},
        {value: 'Обучение', content: t('Обучение')},
      ]}
      value={
        (advertisement as AdvertisementTypeService)?.serviceType ||
        'Консультация'
      }
      onChange={(value) =>
        dispatch(advertisementDetailsActions.setServiceType(value))
      }
      label={t('Тип услуги')}
      defaultValue="Консультация"
      className={styles.listBox}
      direction="bottom right"
    />
    <label className={styles.label}>
      {t('Опыт работы')}
      <Input
        value={(advertisement as AdvertisementTypeService).experience}
        onChange={(e) => handleExperienceChange(Number(e.target.value))}
        placeholder={t('Опыт работы')}
        type="number"
        required
        max={100}
        min={0}
      />
    </label>
    <label className={styles.label}>
      {t('Стоимость')}
      <Input
        value={(advertisement as AdvertisementTypeService).cost}
        onChange={(e) => handleCostChange(Number(e.target.value))}
        placeholder={t('Стоимость')}
        type="number"
        required
        max={10 ** 9}
        min={1}
      />
    </label>
    <label className={styles.label}>
      {t('График работы')}
      <Input
        value={(advertisement as AdvertisementTypeService).schedule}
        onChange={(e) => handleScheduleChange(e.target.value)}
        placeholder={t('График работы')}
        maxLength={30}
      />
    </label>
  </div>
);
