import {Menu} from '@headlessui/react';
import cn from 'classnames';
import {Fragment, ReactNode} from 'react';

import {DropdownDirection} from '../../../../types/ui';
import {AppLink} from '../../../AppLink/AppLink';
import {mapDirectionClass} from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import styles from './Dropdown.module.scss';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  className?: string;
  items: Array<DropdownItem>;
  direction?: DropdownDirection;
  trigger: ReactNode;
}

export const Dropdown = ({
  className,
  trigger,
  items,
  direction = 'bottom right',
}: DropdownProps) => {
  const menuClasses = [mapDirectionClass[direction], popupCls.menu];

  return (
    <Menu
      as="div"
      className={cn(styles.Dropdown, {}, [className, popupCls.popup])}
    >
      <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={cn(styles.menu, {}, menuClasses)}>
        {items.map((item, index) => {
          const content = ({active}: {active: boolean}) => (
            <button
              type="button"
              disabled={item.disabled}
              onClick={item.onClick}
              className={cn(styles.item, {
                [popupCls.active]: active,
              })}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <Menu.Item
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
                key={`dropdown-key-${index}`}
              >
                {content}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item
              key={`dropdown-key-${index}`}
              as={Fragment}
              disabled={item.disabled}
            >
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
