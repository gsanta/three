import { useMemo } from "react";
import { MakeObservable } from "./ComponentObserver";

const useObservable = <T, S>(connect: MakeObservable<S> | undefined, getVal: (store: S) => T): T | undefined => {
  const data = useMemo(() => connect?.(getVal), [connect]);

  return data && data.getVal();
}

export default useObservable;
