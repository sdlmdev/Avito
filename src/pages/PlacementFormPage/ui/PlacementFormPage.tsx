import {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Page} from 'widgets/Page';

const PlacementFormPage = memo(({}) => {
  const {t} = useTranslation('placementFormPage');

  return <Page testId="PlacementFormPage">{t('Разместить объявление')}</Page>;
});

export default PlacementFormPage;

PlacementFormPage.displayName = 'PlacementFormPage';
