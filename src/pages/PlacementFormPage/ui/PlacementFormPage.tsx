import {
  AdvertisementType,
  AdvertisementVariant,
  getAdvertisementDetailsData,
  getAdvertisementDetailsError,
  getAdvertisementDetailsIsLoading,
} from 'entities/Advertisement';
import {useFormHandlers} from 'entities/Advertisement/lib/hooks/useFormHandlers';
import {useFormValidation} from 'entities/Advertisement/lib/hooks/useFormValidation';
import {addNewAdvertisement} from 'entities/Advertisement/model/services/addNewAdvertisement/addNewAdvertisement';
import {
  advertisementDetailsActions,
  advertisementDetailsReducer,
} from 'entities/Advertisement/model/slice/advertisementDetailsSlice';
import {
  AdvertisementTypeAutomobile,
  AdvertisementTypeImmovables,
  AdvertisementTypeService,
} from 'entities/Advertisement/model/types/advertisement';
import {FormEvent, memo, useState} from 'react';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {Page} from 'widgets/Page';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {Button} from 'shared/ui/Button';
import {MainStep} from 'shared/ui/FieldsLists';
import {StepAutomobile} from 'shared/ui/FieldsLists';
import {StepImmovables} from 'shared/ui/FieldsLists';
import {StepServices} from 'shared/ui/FieldsLists';
import {Input} from 'shared/ui/Input';
import {ListBox} from 'shared/ui/Popups';
import {Text} from 'shared/ui/Text';

import styles from './PlacementFormPage.module.scss';

const reducers: ReducersList = {
  advertisementDetails: advertisementDetailsReducer,
};

const PlacementFormPage = memo(({}) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const advertisement = useSelector(getAdvertisementDetailsData);
  const isLoading = useSelector(getAdvertisementDetailsIsLoading);
  const isError = useSelector(getAdvertisementDetailsError);
  const [isSuccess, setIsSuccess] = useState(false);
  const {isFormValid, validateForm} = useFormValidation(advertisement);

  const {
    handleNameChange,
    handleDescriptionChange,
    handleLocationChange,
    handleAreaChange,
    handleRoomsChange,
    handlePriceChange,
    handleBrandChange,
    handleModelChange,
    handleYearChange,
    handleMileageChange,
    handleExperienceChange,
    handleCostChange,
    handleScheduleChange,
    handleFileChange,
    handleCategoryChange,
  } = useFormHandlers();

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const resetForm = () => {
    dispatch(advertisementDetailsActions.resetAdvertisementForm());
    setStep(1);
    setImageFile(null);
  };

  const handleSubmitForm = async (
    updatedAdvertisement: AdvertisementVariant,
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const res = await dispatch(
      addNewAdvertisement({...updatedAdvertisement, image: imageFile}),
    );

    if (res.meta.requestStatus === 'fulfilled') {
      resetForm();
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    const fileInput = document.getElementById('imageFile') as HTMLInputElement;

    if (imageFile && fileInput) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(imageFile);
      fileInput.files = dataTransfer.files;
    }
  }, [imageFile, step]);

  useEffect(() => {
    validateForm();
  }, [advertisement, validateForm]);

  useEffect(() => {
    dispatch(advertisementDetailsActions.reInitState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page testId="PlacementFormPage" className={styles.PlacementFormPage}>
        <form
          className={styles.formWrapper}
          onSubmit={async (e) =>
            advertisement && handleSubmitForm(advertisement, e)
          }
        >
          {step === 1 && advertisement && (
            <div className={styles.step}>
              <Text title={t('Основной шаг')} size="m" />
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
                onChange={handleCategoryChange}
                label={t('Категория объявления')}
                defaultValue={AdvertisementType.ALL}
                direction="bottom right"
              />
              <MainStep
                valuesData={advertisement}
                handleNameChange={handleNameChange}
                handleDescriptionChange={handleDescriptionChange}
                handleLocationChange={handleLocationChange}
              />
              <Input
                id="imageFile"
                type="file"
                name="image"
                onChange={(e) => handleFileChange(e, setImageFile)}
                label={t('Изображение')}
              />
            </div>
          )}
          {step === 2 &&
            advertisement?.type === AdvertisementType.IMMOVABLES && (
              <div className={styles.step}>
                <Text title={t('Недвижимость')} size="m" />
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
                <StepImmovables
                  valuesData={{
                    area: (advertisement as AdvertisementTypeImmovables).area,
                    rooms: (advertisement as AdvertisementTypeImmovables).rooms,
                    price: (advertisement as AdvertisementTypeImmovables).price,
                  }}
                  handleAreaChange={handleAreaChange}
                  handleRoomsChange={handleRoomsChange}
                  handlePriceChange={handlePriceChange}
                />
              </div>
            )}
          {step === 2 &&
            advertisement?.type === AdvertisementType.AUTOMOBILE && (
              <div className={styles.step}>
                <Text title={t('Авто')} size="m" />
                <StepAutomobile
                  valuesData={{
                    brand: (advertisement as AdvertisementTypeAutomobile).brand,
                    model: (advertisement as AdvertisementTypeAutomobile).model,
                    year: (advertisement as AdvertisementTypeAutomobile).year,
                    mileage: (advertisement as AdvertisementTypeAutomobile)
                      .mileage,
                  }}
                  handleBrandChange={handleBrandChange}
                  handleModelChange={handleModelChange}
                  handleYearChange={handleYearChange}
                  handleMileageChange={handleMileageChange}
                />
              </div>
            )}
          {step === 2 && advertisement?.type === AdvertisementType.SERVICES && (
            <div className={styles.step}>
              <Text title={t('Услуги')} size="m" />
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
              <StepServices
                valuesData={{
                  experience: (advertisement as AdvertisementTypeService)
                    .experience,
                  cost: (advertisement as AdvertisementTypeService).cost,
                  schedule: (advertisement as AdvertisementTypeService)
                    .schedule,
                }}
                handleExperienceChange={handleExperienceChange}
                handleCostChange={handleCostChange}
                handleScheduleChange={handleScheduleChange}
              />
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
                  isLoading={isLoading}
                  disabled={!isFormValid}
                  type="submit"
                >
                  {t('Отправить')}
                </Button>
              </>
            )}
          </div>
          {isError && <Text text={t('Произошла ошибка')} variant="error" />}
          {isSuccess && (
            <Text
              text={t('Объявление успешно добавлено')}
              className={styles.success}
            />
          )}
        </form>
      </Page>
    </DynamicModuleLoader>
  );
});

export default PlacementFormPage;

PlacementFormPage.displayName = 'PlacementFormPage';
