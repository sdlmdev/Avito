import cn from 'classnames';
import React, {forwardRef} from 'react';
import {ButtonHTMLAttributes, FC, memo} from 'react';

import {Spinner} from '../Spinner';
import styles from './Button.module.scss';

export enum ButtonTheme {
  BLUE = 'blue',
  OUTLINE = 'outline',
  CLEAR = 'clear',
}

export enum ButtonSize {
  S = 's',
  M = 'm',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        className,
        children,
        theme = ButtonTheme.BLUE,
        size = ButtonSize.S,
        disabled = false,
        isLoading = false,
        ...props
      },
      ref,
    ) => {
      return (
        <button
          ref={ref}
          disabled={disabled || isLoading}
          className={cn(styles.Button, className, styles[theme], styles[size], {
            [styles.disabled]: disabled || isLoading,
          })}
          {...props}
        >
          {isLoading ? <Spinner /> : children}
        </button>
      );
    },
  ),
);

Button.displayName = 'Button';
