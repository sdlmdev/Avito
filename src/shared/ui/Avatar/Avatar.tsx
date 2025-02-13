import cn from 'classnames';
import {memo} from 'react';

import styles from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  username?: string;
}

export const Avatar = memo(({className, username}: AvatarProps) => {
  return (
    <div className={cn(styles.Avatar, className)}>
      {username ? username[0].toUpperCase() : ''}
    </div>
  );
});

Avatar.displayName = 'Avatar';
