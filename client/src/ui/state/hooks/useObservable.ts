import { useMemo } from 'react';
import MakeValueObservable from '../types/MakeValueObservable';

function useObservable<S, A>(connect: MakeValueObservable<S> | undefined, getVal: (store: S) => A): A | undefined;
function useObservable<S, A, B>(
  connect: MakeValueObservable<S> | undefined,
  getVal1: (store: S) => A,
  getVal2: (store: S) => B,
): [A | undefined, B | undefined];
function useObservable<S>(connect: MakeValueObservable<S> | undefined, ...getVal: ((store: S) => any)[]): any | any[] {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getters = useMemo(() => getVal.map((getter) => connect?.(getter)), [connect]);

  if (getters.length === 1) {
    return getters[0]?.getVal();
  }

  return getters.map((getter) => getter?.getVal());
}

export default useObservable;
