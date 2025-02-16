import {StateScheme} from 'app/providers/StoreProvider';
import {useSelector} from 'react-redux';

type Selector<T, Args extends Array<any>> = (
  state: StateScheme,
  ...args: Args
) => T;
type Hook<T, Args extends Array<any>> = (...args: Args) => T;
type Result<T, Args extends Array<any>> = [Hook<T, Args>, Selector<T, Args>];

export function buildSelector<T, Args extends Array<any>>(
  selector: Selector<T, Args>,
): Result<T, Args> {
  const useSelectorHook: Hook<T, Args> = (...args: Args) => {
    return useSelector((state: StateScheme) => selector(state, ...args));
  };

  return [useSelectorHook, selector];
}
