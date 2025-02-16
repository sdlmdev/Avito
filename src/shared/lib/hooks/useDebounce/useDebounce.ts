import {MutableRefObject, useCallback, useRef} from 'react';

/**
 * Хук, который позволяет отменять предыдущий вызов функции пока не истечет delay
 * @param callback
 * @param delay - задержка в мс
 */
export function useDebounce(
  callback: (...args: Array<any>) => void,
  delay: number,
) {
  const timer = useRef() as MutableRefObject<any>;

  return useCallback(
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
}
