import cn from 'classnames';
import {getUserData, userActions} from 'entities/User';
import React, {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {Avatar} from 'shared/ui/Avatar';
import {Dropdown} from 'shared/ui/Popups';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const {className} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const authData = useSelector(getUserData);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!authData) {
    return null;
  }

  const items = [
    {
      content: t('Выйти'),
      onClick: onLogout,
    },
  ];

  return (
    <Dropdown
      direction="bottom left"
      className={cn(className)}
      items={items}
      trigger={<Avatar username={authData.username} />}
    />
  );
});

AvatarDropdown.displayName = 'AvatarDropdown';
