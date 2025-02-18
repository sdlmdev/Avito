import 'entities/Advertisement';
import {ChangeEvent, FormEvent, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {Button} from 'shared/ui/Button';
import {
  MainStep,
  StepAutomobile,
  StepImmovables,
  StepServices,
} from 'shared/ui/FieldsLists';
import {Input} from 'shared/ui/Input';
import {ListBox} from 'shared/ui/Popups';
import {Text} from 'shared/ui/Text';

import {useFormHandlers} from '../../../lib/hooks/useFormHandlers';
import {AdvertisementType} from '../../../model/consts/advertisementConstants';
import {
  AdvertisementTypeAutomobile,
  AdvertisementTypeImmovables,
  AdvertisementTypeService,
  AdvertisementVariant,
} from '../../../model/types/advertisement';
import styles from '../../AdvertisementDetails/AdvertisementDetails.module.scss';

export const AdvertisementDetailsForm = ({
  advertisement,
  onSave,
  isError,
}: {
  advertisement: AdvertisementVariant;
  onSave: (advertisement: AdvertisementVariant) => void;
  isError: boolean;
}) => {
  const {t} = useTranslation();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    formData,
    handleNameChange,
    handleDescriptionChange,
    handleLocationChange,
    handlePropertyTypeChange,
    handleAreaChange,
    handleRoomsChange,
    handlePriceChange,
    handleBrandChange,
    handleModelChange,
    handleYearChange,
    handleMileageChange,
    handleServiceTypeChange,
    handleExperienceChange,
    handleCostChange,
    handleScheduleChange,
  } = useFormHandlers(advertisement);

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({...formData, image: imageFile});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <MainStep
        valuesData={formData}
        handleNameChange={handleNameChange}
        handleDescriptionChange={handleDescriptionChange}
        handleLocationChange={handleLocationChange}
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
              {
                value: 'Коммерческая недвижимость',
                content: t('Коммерческая недвижимость'),
              },
            ]}
            value={(formData as AdvertisementTypeImmovables)?.propertyType}
            onChange={handlePropertyTypeChange}
            label={t('Тип недвижимости')}
            defaultValue=""
            className={styles.listBox}
            direction="bottom right"
          />
          <StepImmovables
            valuesData={formData as AdvertisementTypeImmovables}
            handleAreaChange={handleAreaChange}
            handleRoomsChange={handleRoomsChange}
            handlePriceChange={handlePriceChange}
          />
        </>
      )}
      {formData.type === AdvertisementType.AUTOMOBILE && (
        <StepAutomobile
          valuesData={formData as AdvertisementTypeAutomobile}
          handleBrandChange={handleBrandChange}
          handleModelChange={handleModelChange}
          handleYearChange={handleYearChange}
          handleMileageChange={handleMileageChange}
        />
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
            onChange={handleServiceTypeChange}
            label={t('Тип услуги')}
            defaultValue=""
            className={styles.listBox}
            direction="bottom right"
          />
          <StepServices
            valuesData={formData as AdvertisementTypeService}
            handleExperienceChange={handleExperienceChange}
            handleCostChange={handleCostChange}
            handleScheduleChange={handleScheduleChange}
          />
        </>
      )}
      <Button className={styles.button} type="submit">
        {t('Сохранить')}
      </Button>
      {isError && (
        <Text
          className={styles.error}
          title={t('Произошла ошибка при сохранении данных.')}
        />
      )}
    </form>
  );
};
