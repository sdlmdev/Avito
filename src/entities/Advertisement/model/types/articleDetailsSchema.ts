import {Advertisement} from './article';

export interface ArticleDetailsSchema {
  isLoading: boolean;
  error?: string;
  data?: Advertisement;
}
