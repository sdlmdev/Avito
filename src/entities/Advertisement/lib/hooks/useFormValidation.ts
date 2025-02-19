import {useCallback, useState} from 'react';

import {AdvertisementType} from '../../model/consts/advertisementConstants';
import {
  AdvertisementTypeAutomobile,
  AdvertisementTypeImmovables,
  AdvertisementTypeService,
  AdvertisementVariant,
} from '../../model/types/advertisement';

export const useFormValidation = (
  advertisement: AdvertisementVariant | undefined,
) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const validateImmovables = useCallback(
    (advertisement: AdvertisementTypeImmovables) => {
      const {area, rooms, price} = advertisement;

      return area !== undefined && rooms !== undefined && price !== undefined;
    },
    [],
  );

  const validateAutomobile = useCallback(
    (advertisement: AdvertisementTypeAutomobile) => {
      const {brand, model, year, mileage} = advertisement;

      return (
        brand?.trim() !== '' &&
        model?.trim() !== '' &&
        year !== undefined &&
        mileage !== undefined
      );
    },
    [],
  );

  const validateServices = useCallback(
    (advertisement: AdvertisementTypeService) => {
      const {experience, cost} = advertisement;

      return experience !== undefined && cost !== undefined;
    },
    [],
  );

  const validateForm = useCallback(() => {
    if (!advertisement) {
      setIsFormValid(false);

      return;
    }

    const {name, location, type, description} = advertisement;

    let isValid =
      name?.trim().length >= 3 &&
      location?.trim().length >= 3 &&
      description?.trim().length >= 3 &&
      type !== undefined;

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
  }, [advertisement, validateImmovables, validateAutomobile, validateServices]);

  return {isFormValid, validateForm};
};
