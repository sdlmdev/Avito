import {useTranslation} from 'react-i18next';

const PlacementFormPage = ({}) => {
  const {t} = useTranslation('aboutPage');

  return <div>{t('О сайте')}</div>;
};

export default PlacementFormPage;
