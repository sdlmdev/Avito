import cn from 'classnames';
import {AdvertisementType} from 'entities/Advertisement';
import {changeAdvertisementData} from 'entities/Advertisement/model/services/changeAdvertisementData/changeAdvertisementData';
import {fetchAdvertisementById} from 'entities/Advertisement/model/services/fetchAdvertisementById/fetchArticleById';
import {
  Advertisement,
  AdvertisementTypeAutomobile,
  AdvertisementTypeImmovables,
  AdvertisementTypeService,
} from 'entities/Advertisement/model/types/advertisement';
import {ChangeEvent, FormEvent, memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {AppImage} from 'shared/ui/AppImage';
import {Button} from 'shared/ui/Button';
import {Input} from 'shared/ui/Input';
import {Skeleton} from 'shared/ui/Skeleton';
import {Text} from 'shared/ui/Text';

import {
  getAdvertisementDetailsData,
  getAdvertisementDetailsError,
  getAdvertisementDetailsIsLoading,
} from '../../model/selectors/advertisementDetails';
import {advertisementDetailsReducer} from '../../model/slice/advertisementDetailsSlice';
import styles from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  articleDetails: advertisementDetailsReducer,
};

const ArticleDetailsForm = ({
  article,
  onSave,
}: {
  article: Advertisement;
  onSave: (article: Advertisement) => void;
}) => {
  const [formData, setFormData] = useState(article);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({...formData, image: imageFile});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="name" value={formData.name} onChange={handleChange} />
      <Input
        name="location"
        value={formData.location}
        onChange={handleChange}
      />
      <Input type="file" name="image" onChange={handleImageChange} />
      {formData.type === AdvertisementType.IMMOVABLES && (
        <>
          <Input
            name="area"
            value={(formData as AdvertisementTypeImmovables).area}
            onChange={handleChange}
          />
          <Input
            name="rooms"
            value={(formData as AdvertisementTypeImmovables).rooms}
            onChange={handleChange}
          />
          <Input
            name="price"
            value={(formData as AdvertisementTypeImmovables).price}
            onChange={handleChange}
          />
        </>
      )}
      {formData.type === AdvertisementType.AUTOMOBILE && (
        <>
          <Input
            name="brand"
            value={(formData as AdvertisementTypeAutomobile).brand}
            onChange={handleChange}
          />
          <Input
            name="model"
            value={(formData as AdvertisementTypeAutomobile).model}
            onChange={handleChange}
          />
          <Input
            name="year"
            value={(formData as AdvertisementTypeAutomobile).year}
            onChange={handleChange}
          />
          <Input
            name="mileage"
            value={(formData as AdvertisementTypeAutomobile).mileage}
            onChange={handleChange}
          />
        </>
      )}
      {formData.type === AdvertisementType.SERVICE && (
        <>
          <Input
            name="serviceType"
            value={(formData as AdvertisementTypeService).serviceType}
            onChange={handleChange}
          />
          <Input
            name="experience"
            value={(formData as AdvertisementTypeService).experience}
            onChange={handleChange}
          />
          <Input
            name="cost"
            value={(formData as AdvertisementTypeService).cost}
            onChange={handleChange}
          />
          <Input
            name="schedule"
            value={(formData as AdvertisementTypeService).schedule}
            onChange={handleChange}
          />
        </>
      )}
      <Button type="submit">Сохранить</Button>
    </form>
  );
};

const Article = () => {
  const dispatch = useAppDispatch();
  const article = useSelector(getAdvertisementDetailsData);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedArticle: Advertisement) => {
    const res = await dispatch(changeAdvertisementData(updatedArticle));

    if (res.meta.requestStatus === 'fulfilled') {
      console.log('Advertisement updated');
    }

    setIsEditing(false);
  };

  if (!article) {
    return null;
  }

  return (
    <div className={styles.ArticleDetails}>
      {isEditing ? (
        <ArticleDetailsForm article={article} onSave={handleSave} />
      ) : (
        <>
          <Text title={article.name} size="l" bold />
          <Text title={article.location} />
          <AppImage src={article.image as string} className={styles.img} />
          {article.type === AdvertisementType.IMMOVABLES && (
            <>
              <Text
                title={`Property Type: ${(article as AdvertisementTypeImmovables).propertyType}`}
              />
              <Text
                title={`Area: ${(article as AdvertisementTypeImmovables).area} sqm`}
              />
              <Text
                title={`Rooms: ${(article as AdvertisementTypeImmovables).rooms}`}
              />
              <Text
                title={`Price: ${(article as AdvertisementTypeImmovables).price} USD`}
              />
            </>
          )}
          {article.type === AdvertisementType.AUTOMOBILE && (
            <>
              <Text
                title={`Brand: ${(article as AdvertisementTypeAutomobile).brand}`}
              />
              <Text
                title={`Model: ${(article as AdvertisementTypeAutomobile).model}`}
              />
              <Text
                title={`Year: ${(article as AdvertisementTypeAutomobile).year}`}
              />
              <Text
                title={`Mileage: ${(article as AdvertisementTypeAutomobile).mileage} km`}
              />
            </>
          )}
          {article.type === AdvertisementType.SERVICE && (
            <>
              <Text
                title={`Service Type: ${(article as AdvertisementTypeService).serviceType}`}
              />
              <Text
                title={`Experience: ${(article as AdvertisementTypeService).experience} years`}
              />
              <Text
                title={`Cost: ${(article as AdvertisementTypeService).cost} USD`}
              />
              <Text
                title={`Schedule: ${(article as AdvertisementTypeService).schedule}`}
              />
            </>
          )}
          <Button onClick={handleEditClick}>Редактировать</Button>
        </>
      )}
    </div>
  );
};

export const ArticleDetailsSkeleton = () => {
  return (
    <div>
      <Skeleton
        className={styles.avatar}
        width={200}
        height={200}
        border="50%"
      />
      <Skeleton className={styles.title} width={300} height={32} />
      <Skeleton className={styles.skeleton} width={600} height={24} />
      <Skeleton className={styles.skeleton} width="100%" height={200} />
      <Skeleton className={styles.skeleton} width="100%" height={200} />
    </div>
  );
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const {className, id} = props;
  const {t} = useTranslation();
  const isLoading = useSelector(getAdvertisementDetailsIsLoading);
  const error = useSelector(getAdvertisementDetailsError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdvertisementById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = <ArticleDetailsSkeleton />;
  } else if (error) {
    content = (
      <Text align="center" title={t('Произошла ошибка при загрузке статьи.')} />
    );
  } else {
    content = <Article />;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={cn(styles.ArticleDetails, className)}>{content}</div>
    </DynamicModuleLoader>
  );
});

ArticleDetails.displayName = 'ArticleDetails';
