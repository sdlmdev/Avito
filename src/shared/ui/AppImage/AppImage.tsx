import cn from 'classnames';
import {
  ImgHTMLAttributes,
  memo,
  ReactElement,
  useLayoutEffect,
  useState,
} from 'react';

import {DEFAULT_IMG} from '../../constants/consts';
import styles from './AppImage.module.scss';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallback?: ReactElement;
  errorFallback?: ReactElement;
}

export const AppImage = memo(
  ({
    className,
    src,
    alt = 'image',
    errorFallback,
    fallback,
    ...otherProps
  }: AppImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
      const img = new Image();
      img.src = src || '';

      img.onload = () => {
        setIsLoading(false);
      };

      img.onerror = () => {
        setIsLoading(false);
        setHasError(true);
      };
    }, [src]);

    if (isLoading && fallback) {
      return fallback;
    }

    if (hasError && errorFallback) {
      return errorFallback;
    }

    if (hasError) {
      src = DEFAULT_IMG;
    }

    return (
      <img
        className={cn(className, styles.default)}
        src={src}
        alt={alt}
        {...otherProps}
      />
    );
  },
);

AppImage.displayName = 'AppImage';
