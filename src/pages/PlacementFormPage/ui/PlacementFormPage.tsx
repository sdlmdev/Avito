import {
  Advertisement,
  AdvertisementType,
  getAdvertisementDetailsData,
} from 'entities/Advertisement';
import {
  advertisementDetailsActions,
  advertisementDetailsReducer,
} from 'entities/Advertisement/model/slice/advertisementDetailsSlice';
import {
  AdvertisementTypeAutomobile,
  AdvertisementTypeImmovables,
  AdvertisementTypeService,
} from 'entities/Advertisement/model/types/advertisement';
import {ChangeEvent, memo, MouseEvent, useCallback, useState} from 'react';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Page} from 'widgets/Page';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {Button} from 'shared/ui/Button/Button';
import {Input} from 'shared/ui/Input/Input';
import {ListBox} from 'shared/ui/Popups/components/ListBox/ListBox';

import {addNewAdvertisement} from '../model/services/addNewAdvertisement/addNewAdvertisement';
import styles from './PlacementFormPage.module.scss';

const reducers: ReducersList = {
  advertisementDetails: advertisementDetailsReducer,
};

const PlacementFormPage = memo(({}) => {
  const {t} = useTranslation('placementFormPage');
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const advertisement = useSelector(getAdvertisementDetailsData);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const resetForm = () => {
    dispatch(advertisementDetailsActions.resetAdvertisementForm());
    setStep(1);
  };

  const handleSubmitForm = async (
    updatedAdvertisement: Advertisement,
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    const res = await dispatch(
      addNewAdvertisement({...updatedAdvertisement, image: imageFile}),
    );

    if (res.meta.requestStatus === 'fulfilled') {
      resetForm();
      setIsSuccess(true);
    } else {
      setIsError(true);
      setIsSuccess(false);
    }
  };

  const handleNameChange = (value: string) => {
    if (value.length <= 200) {
      dispatch(advertisementDetailsActions.setName(value));
      validateForm();
    }
  };

  const handleDescriptionChange = (value: string) => {
    if (value.length <= 200) {
      dispatch(advertisementDetailsActions.setDescription(value));
      validateForm();
    }
  };

  const handleLocationChange = (value: string) => {
    if (value.length <= 50) {
      dispatch(advertisementDetailsActions.setLocation(value));
      validateForm();
    }
  };

  const handleAreaChange = (value: number) => {
    if (value >= 1 && value <= 100000) {
      dispatch(advertisementDetailsActions.setArea(value));
      validateForm();
    }
  };

  const handleRoomsChange = (value: number) => {
    if (value >= 1 && value <= 50) {
      dispatch(advertisementDetailsActions.setRooms(value));
      validateForm();
    }
  };

  const handlePriceChange = (value: number) => {
    if (value >= 1 && value <= 10 ** 9) {
      dispatch(advertisementDetailsActions.setPrice(value));
      validateForm();
    }
  };

  const handleBrandChange = (value: string) => {
    if (value.length >= 1 && value.length <= 30) {
      dispatch(advertisementDetailsActions.setBrand(value));
      validateForm();
    }
  };

  const handleModelChange = (value: string) => {
    if (value.length >= 1 && value.length <= 30) {
      dispatch(advertisementDetailsActions.setModel(value));
      validateForm();
    }
  };

  const handleYearChange = (value: number) => {
    const currentYear = new Date().getFullYear();

    if (value >= 1800 && value <= currentYear) {
      dispatch(advertisementDetailsActions.setYear(value));
      validateForm();
    }
  };

  const handleMileageChange = (value: number) => {
    if (value >= 0 && value <= 10 ** 6) {
      dispatch(advertisementDetailsActions.setMileage(value));
      validateForm();
    }
  };

  const handleExperienceChange = (value: number) => {
    if (value >= 0 && value <= 100) {
      dispatch(advertisementDetailsActions.setExperience(value));
      validateForm();
    }
  };

  const handleCostChange = (value: number) => {
    if (value >= 1 && value <= 10 ** 9) {
      dispatch(advertisementDetailsActions.setCost(value));
      validateForm();
    }
  };

  const handleScheduleChange = (value: string) => {
    dispatch(advertisementDetailsActions.setSchedule(value));
    validateForm();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const validateForm = useCallback(() => {
    const {name, location, type} = advertisement || {};

    const isValid =
      name?.trim() !== '' && location?.trim() !== '' && type !== undefined;

    setIsFormValid(isValid);
  }, [advertisement]);

  useEffect(() => {
    validateForm();
  }, [advertisement, validateForm]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page testId="PlacementFormPage" className={styles.PlacementFormPage}>
        <form className={styles.formWrapper}>
          {step === 1 && advertisement && (
            <div className={styles.step}>
              <h2>{t('Основной шаг')}</h2>
              <ListBox
                items={[
                  {
                    value: AdvertisementType.IMMOVABLES,
                    content: t('Недвижимость'),
                  },
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
                <Input type="file" name="image" onChange={handleFileChange} />
              </label>
            </div>
          )}
          {step === 2 &&
            advertisement?.type === AdvertisementType.IMMOVABLES && (
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
                    (advertisement as AdvertisementTypeImmovables)
                      ?.propertyType || 'Квартира'
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
            )}
          {step === 2 &&
            advertisement?.type === AdvertisementType.AUTOMOBILE && (
              <div className={styles.step}>
                <h2>{t('Авто')}</h2>
                <label className={styles.label}>
                  {t('Марка')}
                  <Input
                    value={(advertisement as AdvertisementTypeAutomobile).brand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    placeholder={t('Марка')}
                    required
                    maxLength={30}
                    minLength={1}
                  />
                </label>
                <label className={styles.label}>
                  {t('Модель')}
                  <Input
                    value={(advertisement as AdvertisementTypeAutomobile).model}
                    onChange={(e) => handleModelChange(e.target.value)}
                    placeholder={t('Модель')}
                    required
                    maxLength={30}
                    minLength={1}
                  />
                </label>
                <label className={styles.label}>
                  {t('Год выпуска')}
                  <Input
                    value={(advertisement as AdvertisementTypeAutomobile).year}
                    onChange={(e) => handleYearChange(Number(e.target.value))}
                    placeholder={t('Год выпуска')}
                    type="number"
                    max={new Date().getFullYear()}
                    required
                    min={1800}
                  />
                </label>
                <label className={styles.label}>
                  {t('Пробег')}
                  <Input
                    value={
                      (advertisement as AdvertisementTypeAutomobile).mileage
                    }
                    onChange={(e) =>
                      handleMileageChange(Number(e.target.value))
                    }
                    placeholder={t('Пробег')}
                    type="number"
                    required
                    max={10 ** 6}
                    min={0}
                  />
                </label>
              </div>
            )}
          {step === 2 && advertisement?.type === AdvertisementType.SERVICES && (
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
                  onChange={(e) =>
                    handleExperienceChange(Number(e.target.value))
                  }
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
          )}
          <div className={styles.buttons}>
            {step === 1 && (
              <Button onClick={handleNextStep}>{t('Далее')}</Button>
            )}
            {step === 2 && advertisement && (
              <>
                <Button onClick={handlePrevStep}>{t('Назад')}</Button>
                <Button
                  onClick={async (e) => handleSubmitForm(advertisement, e)}
                  disabled={!isFormValid}
                >
                  {t('Отправить')}
                </Button>
              </>
            )}
          </div>
          {isError && (
            <div className={styles.error}>{t('Произошла ошибка')}</div>
          )}
          {isSuccess && (
            <div className={styles.success}>
              {t('Объявление успешно добавлено')}
            </div>
          )}
        </form>
      </Page>
    </DynamicModuleLoader>
  );
});

export default PlacementFormPage;

PlacementFormPage.displayName = 'PlacementFormPage';
