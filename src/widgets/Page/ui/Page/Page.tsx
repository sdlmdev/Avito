import cn from 'classnames';
import {memo, ReactNode} from 'react';

import styles from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode;
  testId: string;
}

export const Page = memo(({className, children, testId}: PageProps) => {
  return (
    <main className={cn(styles.Page, className)} data-testid={testId}>
      {children}
    </main>
  );
});

Page.displayName = 'Page';
