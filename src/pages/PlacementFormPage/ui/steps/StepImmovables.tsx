import {Advertisement} from 'entities/Advertisement';
import {advertisementDetailsActions} from 'entities/Advertisement/model/slice/advertisementDetailsSlice';
import {AdvertisementTypeImmovables} from 'entities/Advertisement/model/types/advertisement';

import {Input} from 'shared/ui/Input';
import {ListBox} from 'shared/ui/Popups';

import styles from '../PlacementFormPage.module.scss';

interface StepImmovablesProps {
  advertisement: Advertisement;
  dispatch: (action: any) => void;
  t: (key: string) => string;
  handleAreaChange: (value: number) => void;
  handleRoomsChange: (value: number) => void;
  handlePriceChange: (value: number) => void;
}

export const StepImmovables = ({
  advertisement,
  dispatch,
  t,
  handleAreaChange,
  handleRoomsChange,
  handlePriceChange,
}: StepImmovablesProps) => (
  <div className={styles.step}>
    <h2>{t('Недвижимость')}</h2>
    <ListBox
      items={[
        {value: 'Квартира', content: t('Квартира')},
        {value: 'Дом', content: t('Дом')},
        {value: 'Земля', content: t('Земля')},
        {
          value: 'Коммерческая недвижимость',
          content: t('Коммерческая недвижимость'),
        },
      ]}
      value={
        (advertisement as AdvertisementTypeImmovables)?.propertyType ||
        'Квартира'
      }
      onChange={(value) =>
        dispatch(advertisementDetailsActions.setPropertyType(value))
      }
      label={t('Тип недвижимости')}
      defaultValue="Квартира"
      className={styles.listBox}
      direction="bottom right"
    />
    <label className={styles.label}>
      {t('Площадь')}
      <Input
        value={(advertisement as AdvertisementTypeImmovables).area}
        onChange={(e) => handleAreaChange(Number(e.target.value))}
        placeholder={t('Площадь')}
        type="number"
        max={100000}
        required
        min={1}
      />
    </label>
    <label className={styles.label}>
      {t('Количество комнат')}
      <Input
        value={(advertisement as AdvertisementTypeImmovables).rooms}
        onChange={(e) => handleRoomsChange(Number(e.target.value))}
        placeholder={t('Количество комнат')}
        type="number"
        max={50}
        required
        min={1}
      />
    </label>
    <label className={styles.label}>
      {t('Цена')}
      <Input
        value={(advertisement as AdvertisementTypeImmovables).price}
        onChange={(e) => handlePriceChange(Number(e.target.value))}
        placeholder={t('Цена')}
        type="number"
        max={10 ** 9}
        required
        min={1}
      />
    </label>
  </div>
);
