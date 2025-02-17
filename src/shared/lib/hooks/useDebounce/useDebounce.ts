import {MutableRefObject, useCallback, useRef} from 'react';

export const useDebounce = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: Array<any>) => void,
  delay: number,
) => {
  const timer = useRef() as MutableRefObject<any>;

  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: Array<any>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};
