import {AdvertisementType} from 'entities/Advertisement';
import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {
  StepAutomobile,
  StepImmovables,
  StepServices,
} from 'shared/ui/FieldsLists';
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

  switch (type) {
    case AdvertisementType.IMMOVABLES:
      return (
        <>
          <StepImmovables
            valuesData={{
              area,
              rooms,
              price,
            }}
            handleAreaChange={onChangeArea}
            handleRoomsChange={onChangeRooms}
            handlePriceChange={onChangePrice}
          />
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
        <StepAutomobile
          valuesData={{
            brand,
            model,
            year,
            mileage,
          }}
          handleBrandChange={onChangeBrand}
          handleModelChange={onChangeModel}
          handleYearChange={onChangeYear}
          handleMileageChange={onChangeMileage}
        />
      );

    case AdvertisementType.SERVICES:
      return (
        <>
          <StepServices
            valuesData={{
              experience,
              cost,
            }}
            handleExperienceChange={onChangeExperience}
            handleCostChange={onChangeCost}
            isSchedule={false}
          />
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
