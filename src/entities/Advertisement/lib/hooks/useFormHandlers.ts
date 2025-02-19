import {AdvertisementType, AdvertisementVariant} from 'entities/Advertisement';
import {advertisementDetailsActions} from 'entities/Advertisement/model/slice/advertisementDetailsSlice';
import {ChangeEvent, useCallback, useState} from 'react';

import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

export const useFormHandlers = (initialFormData?: AdvertisementVariant) => {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useAppDispatch();

  const handleNameChange = useCallback(
    (value: string) => {
      if (value.length <= 200) {
        if (initialFormData) {
          setFormData(
            (prevFormData) => prevFormData && {...prevFormData, name: value},
          );
        } else {
          dispatch(advertisementDetailsActions.setName(value));
        }
      }
    },
    [dispatch, initialFormData],
  );

  const handleDescriptionChange = useCallback(
    (value: string) => {
      if (value.length <= 200) {
        if (initialFormData) {
          setFormData(
            (prevFormData) =>
              prevFormData && {
                ...prevFormData,
                description: value,
              },
          );
        } else {
          dispatch(advertisementDetailsActions.setDescription(value));
        }
      }
    },
    [dispatch, initialFormData],
  );

  const handleLocationChange = useCallback(
    (value: string) => {
      if (value.length <= 50) {
        if (initialFormData) {
          setFormData(
            (prevFormData) =>
              prevFormData && {...prevFormData, location: value},
          );
        } else {
          dispatch(advertisementDetailsActions.setLocation(value));
        }
      }
    },
    [dispatch, initialFormData],
  );

  const handleAreaChange = useCallback(
    (value: number | string) => {
      if (value >= 1 && value <= 100000) {
        if (initialFormData) {
          setFormData(
            (prevFormData) => prevFormData && {...prevFormData, area: value},
          );
        } else {
          dispatch(advertisementDetailsActions.setArea(value));
        }
      }
    },
    [dispatch, initialFormData],
  );

  const handleRoomsChange = useCallback(
    (value: number | string) => {
      if (value >= 1 && value <= 50) {
        if (initialFormData) {
          setFormData(
            (prevFormData) => prevFormData && {...prevFormData, rooms: value},
          );
        } else {
          dispatch(advertisementDetailsActions.setRooms(value));
        }
      }
    },
    [dispatch, initialFormData],
  );

  const handlePriceChange = useCallback(
    (value: number | string) => {
      if (value >= 1 && value <= 10 ** 9) {
        if (initialFormData) {
          setFormData(
            (prevFormData) => prevFormData && {...prevFormData, price: value},
          );
        } else {
          dispatch(advertisementDetailsActions.setPrice(value));
        }
      }
    },
    [dispatch, initialFormData],
  );

  const handleBrandChange = useCallback(
    (value: string) => {
      if (value.length <= 30) {
        if (initialFormData) {
          setFormData(
            (prevFormData) => prevFormData && {...prevFormData, brand: value},
          );
        } else {
          dispatch(advertisementDetailsActions.setBrand(value));
        }
      }
    },
    [dispatch, initialFormData],
  );

  const handleModelChange = useCallback(
    (value: string) => {
      if (value.length <= 30) {
        if (initialFormData) {
          setFormData(
            (prevFormData) => prevFormData && {...prevFormData, model: value},
          );
        } else {
          dispatch(advertisementDetailsActions.setModel(value));
        }
      }
    },
    [dispatch, initialFormData],
  );

  const handleYearChange = useCallback(
    (value: number | string) => {
      const currentYear = new Date().getFullYear();

      if (value > 0 && value <= currentYear) {
        if (initialFormData) {
          setFormData(
            (prevFormData) => prevFormData && {...prevFormData, year: value},
          );
        } else {
          dispatch(advertisementDetailsActions.setYear(value));
        }
      }
    },
    [dispatch, initialFormData],
  );

  const handleMileageChange = useCallback(
    (value: number | string) => {
      if (value >= 0 && value <= 10 ** 6) {
        if (initialFormData) {
          setFormData(
            (prevFormData) => prevFormData && {...prevFormData, mileage: value},
          );
        } else {
          dispatch(advertisementDetailsActions.setMileage(value));
        }
      }
    },
    [dispatch, initialFormData],
  );

  const handleExperienceChange = useCallback(
    (value: number | string) => {
      if (value >= 1 && value <= 100) {
        if (initialFormData) {
          setFormData(
            (prevFormData) =>
              prevFormData && {...prevFormData, experience: value},
          );
        } else {
          dispatch(advertisementDetailsActions.setExperience(value));
        }
      }
    },
    [dispatch, initialFormData],
  );

  const handleCostChange = useCallback(
    (value: number | string) => {
      if (value >= 1 && value <= 10 ** 9) {
        if (initialFormData) {
          setFormData(
            (prevFormData) => prevFormData && {...prevFormData, cost: value},
          );
        } else {
          dispatch(advertisementDetailsActions.setCost(value));
        }
      }
    },
    [dispatch, initialFormData],
  );

  const handleScheduleChange = useCallback(
    (value: string) => {
      if (initialFormData) {
        setFormData(
          (prevFormData) => prevFormData && {...prevFormData, schedule: value},
        );
      } else {
        dispatch(advertisementDetailsActions.setSchedule(value));
      }
    },
    [dispatch, initialFormData],
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, setImageFile: (file: File) => void) => {
      if (e.target.files && e.target.files[0]) {
        setImageFile(e.target.files[0]);
      }
    },
    [],
  );

  const handlePropertyTypeChange = useCallback(
    (value: string) => {
      if (initialFormData) {
        setFormData(
          (prevFormData) =>
            prevFormData && {...prevFormData, propertyType: value},
        );
      } else {
        dispatch(advertisementDetailsActions.setPropertyType(value));
      }
    },
    [dispatch, initialFormData],
  );

  const handleServiceTypeChange = useCallback(
    (value: string) => {
      if (initialFormData) {
        setFormData(
          (prevFormData) =>
            prevFormData && {...prevFormData, serviceType: value},
        );
      } else {
        dispatch(advertisementDetailsActions.setServiceType(value));
      }
    },
    [dispatch, initialFormData],
  );

  const handleCategoryChange = useCallback(
    (value: AdvertisementType) => {
      if (initialFormData) {
        setFormData(
          (prevFormData) => prevFormData && {...prevFormData, type: value},
        );
      } else {
        dispatch(advertisementDetailsActions.setCategory(value));
      }
    },
    [dispatch, initialFormData],
  );

  return {
    formData,
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
    handlePropertyTypeChange,
    handleServiceTypeChange,
    handleCategoryChange,
  };
};
