import {useCallback, useState} from 'react';

import {AdvertisementVariant} from '../../model/types/advertisement';

export const useFormHandlers = (initialFormData: AdvertisementVariant) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleNameChange = useCallback((value: string) => {
    setFormData((prevFormData) => ({...prevFormData, name: value}));
  }, []);

  const handleDescriptionChange = useCallback((value: string) => {
    setFormData((prevFormData) => ({...prevFormData, description: value}));
  }, []);

  const handleLocationChange = useCallback((value: string) => {
    setFormData((prevFormData) => ({...prevFormData, location: value}));
  }, []);

  const handlePropertyTypeChange = useCallback((value: string) => {
    setFormData((prevFormData) => ({...prevFormData, propertyType: value}));
  }, []);

  const handleAreaChange = useCallback((value: string | number) => {
    setFormData((prevFormData) => ({...prevFormData, area: value}));
  }, []);

  const handleRoomsChange = useCallback((value: string | number) => {
    setFormData((prevFormData) => ({...prevFormData, rooms: value}));
  }, []);

  const handlePriceChange = useCallback((value: string | number) => {
    setFormData((prevFormData) => ({...prevFormData, price: value}));
  }, []);

  const handleBrandChange = useCallback((value: string) => {
    setFormData((prevFormData) => ({...prevFormData, brand: value}));
  }, []);

  const handleModelChange = useCallback((value: string) => {
    setFormData((prevFormData) => ({...prevFormData, model: value}));
  }, []);

  const handleYearChange = useCallback((value: string | number) => {
    setFormData((prevFormData) => ({...prevFormData, year: value}));
  }, []);

  const handleMileageChange = useCallback((value: string | number) => {
    setFormData((prevFormData) => ({...prevFormData, mileage: value}));
  }, []);

  const handleServiceTypeChange = useCallback((value: string) => {
    setFormData((prevFormData) => ({...prevFormData, serviceType: value}));
  }, []);

  const handleExperienceChange = useCallback((value: string | number) => {
    setFormData((prevFormData) => ({...prevFormData, experience: value}));
  }, []);

  const handleCostChange = useCallback((value: string | number) => {
    setFormData((prevFormData) => ({...prevFormData, cost: value}));
  }, []);

  const handleScheduleChange = useCallback((value: string) => {
    setFormData((prevFormData) => ({...prevFormData, schedule: value}));
  }, []);

  return {
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
  };
};
