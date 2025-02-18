import {advertisementDetailsActions} from 'entities/Advertisement/model/slice/advertisementDetailsSlice';
import {ChangeEvent, useCallback} from 'react';

import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

export const useHandlers = (validateForm: () => void) => {
  const dispatch = useAppDispatch();

  const handleNameChange = useCallback(
    (value: string) => {
      if (value.length <= 200) {
        dispatch(advertisementDetailsActions.setName(value));
        validateForm();
      }
    },
    [dispatch, validateForm],
  );

  const handleDescriptionChange = useCallback(
    (value: string) => {
      if (value.length <= 200) {
        dispatch(advertisementDetailsActions.setDescription(value));
        validateForm();
      }
    },
    [dispatch, validateForm],
  );

  const handleLocationChange = useCallback(
    (value: string) => {
      if (value.length <= 50) {
        dispatch(advertisementDetailsActions.setLocation(value));
        validateForm();
      }
    },
    [dispatch, validateForm],
  );

  const handleAreaChange = useCallback(
    (value: number | string) => {
      if (value >= 1 && value <= 100000) {
        dispatch(advertisementDetailsActions.setArea(value));
        validateForm();
      }
    },
    [dispatch, validateForm],
  );

  const handleRoomsChange = useCallback(
    (value: number | string) => {
      if (value >= 1 && value <= 50) {
        dispatch(advertisementDetailsActions.setRooms(value));
        validateForm();
      }
    },
    [dispatch, validateForm],
  );

  const handlePriceChange = useCallback(
    (value: number | string) => {
      if (value >= 1 && value <= 10 ** 9) {
        dispatch(advertisementDetailsActions.setPrice(value));
        validateForm();
      }
    },
    [dispatch, validateForm],
  );

  const handleBrandChange = useCallback(
    (value: string) => {
      if (value.length <= 30) {
        dispatch(advertisementDetailsActions.setBrand(value));
        validateForm();
      }
    },
    [dispatch, validateForm],
  );

  const handleModelChange = useCallback(
    (value: string) => {
      if (value.length <= 30) {
        dispatch(advertisementDetailsActions.setModel(value));
        validateForm();
      }
    },
    [dispatch, validateForm],
  );

  const handleYearChange = useCallback(
    (value: number | string) => {
      const currentYear = new Date().getFullYear();

      if (value > 0 && value <= currentYear) {
        dispatch(advertisementDetailsActions.setYear(value));
        validateForm();
      }
    },
    [dispatch, validateForm],
  );

  const handleMileageChange = useCallback(
    (value: number | string) => {
      if (value >= 0 && value <= 10 ** 6) {
        dispatch(advertisementDetailsActions.setMileage(value));
        validateForm();
      }
    },
    [dispatch, validateForm],
  );

  const handleExperienceChange = useCallback(
    (value: number | string) => {
      if (value >= 1 && value <= 100) {
        dispatch(advertisementDetailsActions.setExperience(value));
        validateForm();
      }
    },
    [dispatch, validateForm],
  );

  const handleCostChange = useCallback(
    (value: number | string) => {
      if (value >= 1 && value <= 10 ** 9) {
        dispatch(advertisementDetailsActions.setCost(value));
        validateForm();
      }
    },
    [dispatch, validateForm],
  );

  const handleScheduleChange = useCallback(
    (value: string) => {
      dispatch(advertisementDetailsActions.setSchedule(value));
      validateForm();
    },
    [dispatch, validateForm],
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, setImageFile: (file: File) => void) => {
      if (e.target.files && e.target.files[0]) {
        setImageFile(e.target.files[0]);
      }
    },
    [],
  );

  return {
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
  };
};
