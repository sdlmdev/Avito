import {useTranslation} from 'react-i18next';

const AdvertisementPage = ({}) => {
  const {t} = useTranslation('advertisementPage');

  return <div>{t('AdvertisementPage')}</div>;
};

export default AdvertisementPage;
