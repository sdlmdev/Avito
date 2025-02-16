import {AdvertisementDetails} from 'entities/Advertisement';
import {useParams} from 'react-router-dom';
import {Page} from 'widgets/Page';

import styles from './AdvertisementPage.module.scss';

const AdvertisementPage = ({}) => {
  const {id} = useParams<{id: string}>();

  if (!id) {
    return null;
  }

  return (
    <Page testId="AdvertisementPage" className={styles.AdvertisementPage}>
      <AdvertisementDetails id={id} />
    </Page>
  );
};

export default AdvertisementPage;
