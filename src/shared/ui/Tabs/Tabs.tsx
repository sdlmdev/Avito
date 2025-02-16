import cn from 'classnames';
import {memo, ReactNode, useCallback} from 'react';

import {Button, ButtonTheme} from 'shared/ui/Button';

import styles from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: Array<TabItem>;
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: 'row' | 'column';
}

export const Tabs = memo(
  ({className, tabs, onTabClick, value, direction = 'row'}: TabsProps) => {
    const clickHandle = useCallback(
      (tab: TabItem) => () => {
        onTabClick(tab);
      },
      [onTabClick],
    );

    return (
      <div className={cn(styles.Tabs, className, styles[direction])}>
        {tabs.map((tab) => {
          const isSelected = tab.value === value;

          return (
            <Button
              className={cn(styles.tab, {
                [styles.selected]: isSelected,
              })}
              key={tab.value}
              onClick={clickHandle(tab)}
              theme={ButtonTheme.CLEAR}
            >
              {tab.content}
            </Button>
          );
        })}
      </div>
    );
  },
);

Tabs.displayName = 'Tabs';
