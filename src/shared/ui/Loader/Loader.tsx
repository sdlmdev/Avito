import cn from 'classnames';

import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

export const Loader = ({className}: LoaderProps) => {
  return (
    <div className={cn(styles['lds-ellipsis'], className)}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
