import {AdvertisementType} from 'entities/Advertisement';
import {ChangeEvent, memo} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {Input} from 'shared/ui/Input';
import {ListBox} from 'shared/ui/Popups';

import {useArticleFilters} from '../../../lib/hooks/useArticleFilters';
import {getArticlesPageType} from '../../../model/selectors/articlesPageSelectors';
import styles from '../FiltersContainer.module.scss';

export const ArticleFields = memo(() => {
  const {t} = useTranslation();
  const type = useSelector(getArticlesPageType);

  const {
    onChangePropertyType,
    onChangeArea,
    onChangeRooms,
    onChangePrice,
    onChangeBrand,
    onChangeModel,
    onChangeYear,
    onChangeMileage,
    onChangeServiceType,
    onChangeExperience,
    onChangeCost,
    propertyType,
    area,
    rooms,
    price,
    brand,
    model,
    year,
    mileage,
    serviceType,
    experience,
    cost,
  } = useArticleFilters();

  const handleChange =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (callback: (value: any) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      const value =
        e.target.type === 'number'
          ? parseFloat(e.target.value)
          : e.target.value;

      callback(value);
    };

  switch (type) {
    case AdvertisementType.IMMOVABLES:
      return (
        <>
          <label className={styles.label}>
            {t('Площадь')}
            <Input
              value={area}
              name="area"
              placeholder={t('Площадь')}
              type="number"
              onChange={handleChange(onChangeArea)}
            />
          </label>
          <label className={styles.label}>
            {t('Количество комнат')}
            <Input
              value={rooms}
              name="rooms"
              placeholder={t('Количество комнат')}
              type="number"
              onChange={handleChange(onChangeRooms)}
            />
          </label>
          <label className={styles.label}>
            {t('Цена')}
            <Input
              value={price}
              name="price"
              placeholder={t('Цена')}
              type="number"
              onChange={handleChange(onChangePrice)}
            />
          </label>
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
            value={propertyType}
            onChange={onChangePropertyType}
            label={t('Тип недвижимости')}
            className={styles.listBox}
            direction="bottom right"
            defaultValue={t('Выберите тип недвижимости')}
          />
        </>
      );

    case AdvertisementType.AUTOMOBILE:
      return (
        <>
          <label className={styles.label}>
            {t('Марка')}
            <Input
              value={brand}
              name="brand"
              placeholder={t('Марка')}
              onChange={handleChange(onChangeBrand)}
            />
          </label>
          <label className={styles.label}>
            {t('Модель')}
            <Input
              value={model}
              name="model"
              placeholder={t('Модель')}
              onChange={handleChange(onChangeModel)}
            />
          </label>
          <label className={styles.label}>
            {t('Год выпуска')}
            <Input
              value={year}
              name="year"
              placeholder={t('Год выпуска')}
              type="number"
              onChange={handleChange(onChangeYear)}
            />
          </label>
          <label className={styles.label}>
            {t('Пробег')}
            <Input
              value={mileage}
              name="mileage"
              placeholder={t('Пробег')}
              type="number"
              onChange={handleChange(onChangeMileage)}
            />
          </label>
        </>
      );

    case AdvertisementType.SERVICES:
      return (
        <>
          <label className={styles.label}>
            {t('Опыт (лет)')}
            <Input
              value={experience}
              name="experience"
              placeholder={t('Опыт (лет)')}
              type="number"
              onChange={handleChange(onChangeExperience)}
            />
          </label>
          <label className={styles.label}>
            {t('Стоимость')}
            <Input
              value={cost}
              name="cost"
              placeholder={t('Стоимость')}
              type="number"
              onChange={handleChange(onChangeCost)}
            />
          </label>
          <ListBox
            items={[
              {value: 'Консультация', content: t('Консультация')},
              {value: 'Ремонт', content: t('Ремонт')},
              {value: 'Уборка', content: t('Уборка')},
              {value: 'Обучение', content: t('Обучение')},
            ]}
            value={serviceType}
            onChange={onChangeServiceType}
            label={t('Тип услуги')}
            defaultValue="Выберите тип услуги"
            className={styles.listBox}
            direction="bottom right"
          />
        </>
      );

    default:
      return null;
  }
});

ArticleFields.displayName = 'ArticleFields';
