import cn from 'classnames';
import {FC, memo} from 'react';
import {Link, LinkProps} from 'react-router-dom';

import styles from './AppLink.module.scss';

export enum AppLinkSize {
  S = 's',
  M = 'm',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  size?: AppLinkSize;
}

export const AppLink: FC<AppLinkProps> = memo(
  ({className, children, to, size = AppLinkSize.S, ...props}: AppLinkProps) => {
    return (
      <Link
        className={cn(styles.AppLink, className, styles[size])}
        to={to}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

AppLink.displayName = 'AppLink';
