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
import {Button} from 'shared/ui/Button/Button';

import {useHandlers} from 'pages/PlacementFormPage/lib/hooks/useHandlers';
import {MainStep} from 'pages/PlacementFormPage/ui/steps/MainStep';
import {StepAutomobile} from 'pages/PlacementFormPage/ui/steps/StepAutomobile';
import {StepImmovables} from 'pages/PlacementFormPage/ui/steps/StepImmovables';
import {StepServices} from 'pages/PlacementFormPage/ui/steps/StepServices';

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
            <MainStep
              advertisement={advertisement}
              handleNameChange={handleNameChange}
              handleDescriptionChange={handleDescriptionChange}
              handleLocationChange={handleLocationChange}
              handleFileChange={(e) => handleFileChange(e, setImageFile)}
              t={t}
              dispatch={dispatch}
            />
          )}
          {step === 2 &&
            advertisement?.type === AdvertisementType.IMMOVABLES && (
              <StepImmovables
                advertisement={advertisement}
                handleAreaChange={handleAreaChange}
                handleRoomsChange={handleRoomsChange}
                handlePriceChange={handlePriceChange}
                t={t}
                dispatch={dispatch}
              />
            )}
          {step === 2 &&
            advertisement?.type === AdvertisementType.AUTOMOBILE && (
              <StepAutomobile
                advertisement={advertisement}
                handleBrandChange={handleBrandChange}
                handleModelChange={handleModelChange}
                handleYearChange={handleYearChange}
                handleMileageChange={handleMileageChange}
                t={t}
              />
            )}
          {step === 2 && advertisement?.type === AdvertisementType.SERVICES && (
            <StepServices
              advertisement={advertisement}
              dispatch={dispatch}
              t={t}
              handleExperienceChange={handleExperienceChange}
              handleCostChange={handleCostChange}
              handleScheduleChange={handleScheduleChange}
            />
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
