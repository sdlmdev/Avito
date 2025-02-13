import cn from 'classnames';

import {Loader} from 'shared/ui/Loader/Loader';

import styles from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({className}: PageLoaderProps) => {
  return <div className={cn(styles.PageLoader, className)}>{<Loader />}</div>;
};
