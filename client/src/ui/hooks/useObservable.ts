import { useMemo } from "react";
import { MakeObservable } from "./ComponentObserver";

function useObservable<S, A>(connect: MakeObservable<S> | undefined, getVal: (store: S) => A): A | undefined;
function useObservable<S, A, B>(connect: MakeObservable<S> | undefined, getVal1: (store: S) => A, getVal2: (store: S) => B): [A | undefined, B | undefined];
function useObservable<S>(connect: MakeObservable<S> | undefined, ...getVal: ((store: S) => any)[]): any | any[] {
  const getters = useMemo(() => getVal.map((getter) => connect?.(getter)), [connect]);

  if (getters.length === 1) {
    return getters[0]?.getVal();
  }

  return getters.map((getter) => getter?.getVal()); 
}

export default useObservable;
