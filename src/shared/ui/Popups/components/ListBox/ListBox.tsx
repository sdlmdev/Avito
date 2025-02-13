import {Listbox} from '@headlessui/react';
import cn from 'classnames';
import {Fragment, ReactNode, useMemo} from 'react';

import {DropdownDirection} from 'shared/types/ui';

import {Button} from '../../../Button/Button';
import {mapDirectionClass} from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import cls from './ListBox.module.scss';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  items?: Array<ListBoxItem>;
  className?: string;
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export const ListBox = <T extends string>({
  className,
  items,
  value,
  defaultValue,
  onChange,
  readonly,
  direction = 'bottom right',
  label,
}: ListBoxProps<T>) => {
  const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);

  return (
    <div>
      {label && <span>{`${label}>`}</span>}
      <Listbox
        disabled={readonly}
        as="div"
        className={cn(cls.ListBox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >
        <Listbox.Button as={Button} disabled={readonly}>
          {selectedItem?.content ?? defaultValue}
        </Listbox.Button>
        <Listbox.Options className={cn(cls.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <Listbox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({active, selected}) => (
                <li
                  className={cn(cls.item, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
                    [popupCls.selected]: selected,
                  })}
                >
                  {selected}
                  {item.content}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};
