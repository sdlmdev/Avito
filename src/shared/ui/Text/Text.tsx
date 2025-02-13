import cn from 'classnames';
import {memo} from 'react';

import styles from './Text.module.scss';

export type TextVariant = 'primary' | 'error';
export type TextAlign = 'right' | 'left' | 'center';
export type TextSize = 's' | 'm' | 'l';
type HeaderTagType = 'h1' | 'h2' | 'h3';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};

export const Text = memo(
  ({
    className,
    text,
    title,
    variant = 'primary',
    align = 'left',
    size = 's',
    bold,
  }: TextProps) => {
    const HeaderTag = mapSizeToHeaderTag[size];

    return (
      <div
        className={cn(
          styles.Text,
          {[styles.bold]: bold},
          styles[variant],
          className,
          styles[align],
          styles[size],
        )}
      >
        {title && <HeaderTag className={styles.title}>{title}</HeaderTag>}
        {text && <p className={styles.text}>{text}</p>}
      </div>
    );
  },
);

Text.displayName = 'Text';
