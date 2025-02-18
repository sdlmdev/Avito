import cn from 'classnames';
import {AdvertisementType} from "../../model/consts/advertisementConstants";
import {changeAdvertisementData} from 'pages/AdvertisementPage/model/services/changeAdvertisementData/changeAdvertisementData';
import {fetchAdvertisementById} from 'pages/AdvertisementPage/model/services/fetchAdvertisementById/fetchArticleById';
import {
  Advertisement,
  AdvertisementTypeAutomobile,
  AdvertisementTypeImmovables,
  AdvertisementTypeService,
} from '../../model/types/advertisement';
import {ChangeEvent, FormEvent, memo, useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {AppImage} from 'shared/ui/AppImage';
import {Button} from 'shared/ui/Button';
import {Input} from 'shared/ui/Input';
import {Skeleton} from 'shared/ui/Skeleton';
import {Text} from 'shared/ui/Text';

import {
  getAdvertisementDetailsData,
  getAdvertisementDetailsError,
  getAdvertisementDetailsIsLoading,
} from '../../model/selectors/advertisementDetails';
import {advertisementDetailsReducer} from '../../model/slice/advertisementDetailsSlice';
import styles from './AdvertisementDetails.module.scss';
import {getUserData} from 'entities/User';
import {ListBox} from 'shared/ui/Popups';

interface AdvertisementDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  advertisementDetails: advertisementDetailsReducer,
};

const AdvertisementDetailsForm = ({
  advertisement,
  onSave,
  isError,
}: {
  advertisement: Advertisement;
  onSave: (advertisement: Advertisement) => void;
  isError: boolean;
}) => {
  const [formData, setFormData] = useState(advertisement);
  const {t} = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({...formData, image: imageFile});
  };

  const onPropertyTypeChange = useCallback(
    (value: string) => {
      setFormData({...formData, propertyType: value});
    },
    [formData],
  );

  const onServiceTypeChange = useCallback(
    (value: string) => {
      setFormData({...formData, serviceType: value});
    },
    [formData],
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t('Название')}
          maxLength={200}
          required
          minLength={3}
          label={t('Название')}
        />
        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder={t('Описание')}
          maxLength={200}
          minLength={3}
          required
          label={t('Описание')}
        />
        <Input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder={t('Локация')}
          required
          maxLength={50}
          minLength={3}
          label={t('Локация')}
        />
        <Input
          type="file"
          name="image"
          onChange={handleImageChange}
          label={t('Изображение')}
        />
      {formData.type === AdvertisementType.IMMOVABLES && (
        <>
          <ListBox
            items={[
              {value: 'Квартира', content: t('Квартира')},
              {value: 'Дом', content: t('Дом')},
              {value: 'Земля', content: t('Земля')},
              {value: 'Коммерческая недвижимость', content: t('Коммерческая недвижимость')},
            ]}
            value={(formData as AdvertisementTypeImmovables)?.propertyType}
            onChange={onPropertyTypeChange}
            label={t('Тип недвижимости')}
            defaultValue=""
            className={styles.listBox}
            direction="bottom right"
          />
            <Input
              name="area"
              value={(formData as AdvertisementTypeImmovables).area}
              onChange={handleChange}
              placeholder={t('Площадь')}
              max={10 ** 4}
              required
              minLength={1}
              type="number"
              label={t('Площадь')}
            />
            <Input
              name="rooms"
              value={(formData as AdvertisementTypeImmovables).rooms}
              onChange={handleChange}
              placeholder={t('Количество комнат')}
              type="number"
              max={50}
              required
              min={1}
              label={t('Количество комнат')}
            />
            <Input
              name="price"
              value={(formData as AdvertisementTypeImmovables).price}
              onChange={handleChange}
              placeholder={t('Цена')}
              type="number"
              max={10 ** 9}
              required
              min={1}
              label={t('Цена')}
            />
        </>
      )}
      {formData.type === AdvertisementType.AUTOMOBILE && (
        <>
            <Input
              name="brand"
              value={(formData as AdvertisementTypeAutomobile).brand}
              onChange={handleChange}
              placeholder={t('Марка')}
              required
              maxLength={30}
              minLength={1}
              label={t('Марка')}
            />
            <Input
              name="model"
              value={(formData as AdvertisementTypeAutomobile).model}
              onChange={handleChange}
              placeholder={t('Модель')}
              required
              maxLength={30}
              minLength={1}
              label={t('Модель')}
            />
            <Input
              name="year"
              value={(formData as AdvertisementTypeAutomobile).year}
              onChange={handleChange}
              placeholder={t('Год')}
              type="number"
              max={new Date().getFullYear()}
              required
              min={1800}
              label={t('Год')}
            />
            <Input
              name="mileage"
              value={(formData as AdvertisementTypeAutomobile).mileage}
              onChange={handleChange}
              placeholder={t('Пробег')}
              type="number"
              required
              max={10 ** 6}
              min={0}
              label={t('Пробег')}
            />
        </>
      )}
      {formData.type === AdvertisementType.SERVICES && (
        <>
          <ListBox
            items={[
              {value: 'Консультация', content: t('Консультация')},
              {value: 'Ремонт', content: t('Ремонт')},
              {value: 'Уборка', content: t('Уборка')},
              {value: 'Обучение', content: t('Обучение')},
            ]}
            value={(formData as AdvertisementTypeService)?.serviceType}
            onChange={onServiceTypeChange}
            label={t('Тип услуги')}
            defaultValue=""
            className={styles.listBox}
            direction="bottom right"
          />
            <Input
              name="experience"
              value={(formData as AdvertisementTypeService).experience}
              onChange={handleChange}
              placeholder={t('Опыт')}
              type="number"
              required
              max={100}
              min={0}
              label={t('Опыт')}
            />
            <Input
              name="cost"
              value={(formData as AdvertisementTypeService).cost}
              onChange={handleChange}
              placeholder={t('Стоимость')}
              type="number"
              required
              max={10 ** 9}
              min={1}
              label={t('Стоимость')}
            />
            <Input
              name="schedule"
              value={(formData as AdvertisementTypeService).schedule}
              onChange={handleChange}
              placeholder={t('График')}
              maxLength={30}
              label={t('График')}
            />
        </>
      )}
      <Button className={styles.button} type="submit">{t('Сохранить')}</Button>
      {isError && <Text className={styles.error} title={t('Произошла ошибка при сохранении данных.')} />}
    </form>
  );
};

const Advertisement = () => {
  const dispatch = useAppDispatch();
  const advertisement = useSelector(getAdvertisementDetailsData);
  const [isEditing, setIsEditing] = useState(false);
  const {t} = useTranslation();
  const [isError, setIsError] = useState(false);
  const auth = useSelector(getUserData);
  const {user} = advertisement || {};

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedAdvertisement: Advertisement) => {
    const res = await dispatch(changeAdvertisementData(updatedAdvertisement));

    if (res.meta.requestStatus !== 'fulfilled') {
      setIsError(true);
    } else {
      setIsError(false);
      setIsEditing(false);
    }
  };

  if (!advertisement) {
    return null;
  }

  return (
    <div className={cn(styles.AdvertisementDetails, {[styles.editing]: isEditing})}>
      {isEditing ? (
        <>
          <AdvertisementDetailsForm isError={isError} advertisement={advertisement} onSave={handleSave} />
          <Button className={styles.btnBack} onClick={() => setIsEditing(false)}>
            {t('Назад')}
          </Button>
        </>
      ) : (
        <>
          <AppImage src={advertisement.image as string} className={styles.img} />

          <div className={styles.descr}>
            <Text title={`${t('Название')}: ${advertisement.name}`} size="l" bold />
            <Text title={`${t('Локация')}: ${advertisement.location}`} />
            <Text title={`${t('Описание')}: ${advertisement.description}`} />
            {advertisement.type === AdvertisementType.IMMOVABLES && (
              <>
                <Text
                  title={`${t('Тип недвижимости')}: ${(advertisement as AdvertisementTypeImmovables).propertyType}`}
                />
                <Text
                  title={`${t('Площадь')}: ${(advertisement as AdvertisementTypeImmovables).area} ${t('кв.м')}`}
                />
                <Text
                  title={`${t('Комнаты')}: ${(advertisement as AdvertisementTypeImmovables).rooms}`}
                />
                <Text
                  title={`${t('Цена')}: ${(advertisement as AdvertisementTypeImmovables).price} ${t('₽')}`}
                />
              </>
            )}
            {advertisement.type === AdvertisementType.AUTOMOBILE && (
              <>
                <Text
                  title={`${t('Марка')}: ${(advertisement as AdvertisementTypeAutomobile).brand}`}
                />
                <Text
                  title={`${t('Модель')}: ${(advertisement as AdvertisementTypeAutomobile).model}`}
                />
                <Text
                  title={`${t('Год')}: ${(advertisement as AdvertisementTypeAutomobile).year}`}
                />
                <Text
                  title={`${t('Пробег')}: ${(advertisement as AdvertisementTypeAutomobile).mileage} ${t('км')}`}
                />
              </>
            )}
            {advertisement.type === AdvertisementType.SERVICES && (
              <>
                <Text
                  title={`${t('Тип услуги')}: ${(advertisement as AdvertisementTypeService).serviceType}`}
                />
                <Text
                  title={`${t('Опыт')}: ${(advertisement as AdvertisementTypeService).experience} ${t('лет')}`}
                />
                <Text
                  title={`${t('Стоимость')}: ${(advertisement as AdvertisementTypeService).cost} ${t('₽')}`}
                />
                {(advertisement as AdvertisementTypeService)?.schedule && (
                  <Text
                    title={`${t('График')}: ${(advertisement as AdvertisementTypeService).schedule}`}
                  />
                )}
              </>
            )}
            {user?.id == auth?.id && (
              <Button
                className={styles.button}
                onClick={handleEditClick}
              >
                {t('Редактировать')}
              </Button>)
            }
          </div>
        </>
      )}
    </div>
  );
};

export const AdvertisementDetailsSkeleton = () => {
  return (
    <div className={styles.AdvertisementDetails}>
      <Skeleton className={styles.img} width="100%" height={500} />
      <div className={styles.descr}>
        <Skeleton width="100%" className={styles.title} height={32} />
        <Skeleton width="100%" className={styles.skeleton} height={24} />
        <Skeleton width="100%" className={styles.skeleton} height={24} />
        <Skeleton width="100%" className={styles.skeleton} height={24} />
        <Skeleton width="100%" className={styles.skeleton} height={24} />
        <Skeleton width="100%" className={styles.skeleton} height={24} />
        <Skeleton width="100%" className={styles.skeleton} height={24} />
      </div>
    </div>
  );
};

export const AdvertisementDetails = memo(({className, id}: AdvertisementDetailsProps) => {
  const {t} = useTranslation();
  const isLoading = useSelector(getAdvertisementDetailsIsLoading);
  const error = useSelector(getAdvertisementDetailsError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdvertisementById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = <AdvertisementDetailsSkeleton />;
  } else if (error) {
    content = (
      <Text align="center" title={t('Произошла ошибка при загрузке объявления')} />
    );
  } else {
    content = <Advertisement />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      {content}
    </DynamicModuleLoader>
  );
});

AdvertisementDetails.displayName = 'AdvertisementDetails';
