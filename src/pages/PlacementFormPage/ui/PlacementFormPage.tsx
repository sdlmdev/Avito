import {memo} from 'react';
import {useTranslation} from 'react-i18next';

const PlacementFormPage = memo(({}) => {
  const {t} = useTranslation('placementFormPage');

  return <div>{t('Разместить объявление')}</div>;
});

export default PlacementFormPage;

PlacementFormPage.displayName = 'PlacementFormPage';
