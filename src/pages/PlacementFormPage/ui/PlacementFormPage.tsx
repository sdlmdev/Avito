import {
  AdvertisementType,
  AdvertisementVariant,
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
import {memo, MouseEvent, useCallback, useState} from 'react';
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

import {useHandlers} from '../lib/hooks/useHandlers';
import {addNewAdvertisement} from '../model/services/addNewAdvertisement/addNewAdvertisement';
import styles from './PlacementFormPage.module.scss';

const reducers: ReducersList = {
  advertisementDetails: advertisementDetailsReducer,
};

const PlacementFormPage = memo(({}) => {
  const {t} = useTranslation();
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
    setImageFile(null);
  };

  const handleSubmitForm = async (
    updatedAdvertisement: AdvertisementVariant,
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    const res = await dispatch(
      addNewAdvertisement({...updatedAdvertisement, image: imageFile}),
    );

    if (res.meta.requestStatus === 'fulfilled') {
      resetForm();
      setIsError(false);
      setIsSuccess(true);
    } else {
      setIsError(true);
      setIsSuccess(false);
    }
  };

  const validateForm = useCallback(() => {
    const {name, location, type} = advertisement || {};

    let isValid =
      name?.trim() !== '' && location?.trim() !== '' && type !== undefined;

    if (type === AdvertisementType.IMMOVABLES) {
      isValid =
        isValid &&
        validateImmovables(advertisement as AdvertisementTypeImmovables);
    } else if (type === AdvertisementType.AUTOMOBILE) {
      isValid =
        isValid &&
        validateAutomobile(advertisement as AdvertisementTypeAutomobile);
    } else if (type === AdvertisementType.SERVICES) {
      isValid =
        isValid && validateServices(advertisement as AdvertisementTypeService);
    }

    setIsFormValid(isValid);
  }, [advertisement]);

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
  } = useHandlers(validateForm);

  const validateImmovables = (advertisement: AdvertisementTypeImmovables) => {
    const {area, rooms, price} = advertisement;

    return area !== undefined && rooms !== undefined && price !== undefined;
  };

  const validateAutomobile = (advertisement: AdvertisementTypeAutomobile) => {
    const {brand, model, year, mileage} = advertisement;

    return (
      brand?.trim() !== '' &&
      model?.trim() !== '' &&
      year !== undefined &&
      mileage !== undefined
    );
  };

  const validateServices = (advertisement: AdvertisementTypeService) => {
    const {experience, cost} = advertisement;

    return experience !== undefined && cost !== undefined;
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

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page testId="PlacementFormPage" className={styles.PlacementFormPage}>
        <form className={styles.formWrapper}>
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
                onChange={(value) =>
                  dispatch(advertisementDetailsActions.setCategory(value))
                }
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
                  onClick={async (e) => handleSubmitForm(advertisement, e)}
                  disabled={!isFormValid}
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
