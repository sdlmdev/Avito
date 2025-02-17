import {Advertisement, AdvertisementType} from 'entities/Advertisement';
import {advertisementDetailsActions} from 'entities/Advertisement/model/slice/advertisementDetailsSlice';
import {ChangeEvent} from 'react';

import {Input} from 'shared/ui/Input';
import {ListBox} from 'shared/ui/Popups';

import styles from '../PlacementFormPage.module.scss';

interface MainStepProps {
  advertisement: Advertisement;
  dispatch: (action: any) => void;
  t: (key: string) => string;
  handleNameChange: (value: string) => void;
  handleDescriptionChange: (value: string) => void;
  handleLocationChange: (value: string) => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const MainStep = ({
  advertisement,
  dispatch,
  t,
  handleNameChange,
  handleDescriptionChange,
  handleLocationChange,
  handleFileChange,
}: MainStepProps) => (
  <div className={styles.step}>
    <h2>{t('Основной шаг')}</h2>
    <ListBox
      items={[
        {value: AdvertisementType.IMMOVABLES, content: t('Недвижимость')},
        {value: AdvertisementType.AUTOMOBILE, content: t('Авто')},
        {value: AdvertisementType.SERVICES, content: t('Услуги')},
      ]}
      value={advertisement?.type || AdvertisementType.IMMOVABLES}
      onChange={(value) =>
        dispatch(advertisementDetailsActions.setCategory(value))
      }
      label={t('Категория объявления')}
      defaultValue={AdvertisementType.ALL}
      className={styles.listBox}
      direction="bottom right"
    />
    <label className={styles.label}>
      {t('Название')}
      <Input
        value={advertisement.name}
        onChange={(e) => handleNameChange(e.target.value)}
        placeholder={t('Название')}
        maxLength={200}
        required
        minLength={3}
      />
    </label>
    <label className={styles.label}>
      {t('Описание')}
      <Input
        value={advertisement.description}
        onChange={(e) => handleDescriptionChange(e.target.value)}
        placeholder={t('Описание')}
        maxLength={200}
        minLength={3}
      />
    </label>
    <label className={styles.label}>
      {t('Локация')}
      <Input
        value={advertisement.location}
        onChange={(e) => handleLocationChange(e.target.value)}
        placeholder={t('Локация')}
        required
        maxLength={50}
        minLength={3}
      />
    </label>
    <label className={styles.label}>
      {t('Изображение')}
      <Input
        id="imageFile"
        type="file"
        name="image"
        onChange={handleFileChange}
      />
    </label>
  </div>
);
