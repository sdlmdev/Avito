import {useTranslation} from 'react-i18next';
import {Page} from 'widgets/Page';

const AdvertisementPage = ({}) => {
  const {t} = useTranslation('advertisementPage');

  return <Page testId="AdvertisementPage">{t('AdvertisementPage')}</Page>;
};

export default AdvertisementPage;
