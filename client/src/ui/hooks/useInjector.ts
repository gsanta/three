import { useForceUpdate } from 'framer-motion';
import { useEffect } from 'react';

const useInjector = <T, K extends keyof T>(prop: K, obj?: T): void => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (!obj) {
      return;
    }

    if (!(obj as any).__injector) {
      (obj as any).__injector = {};
    }

    if (!(obj as any).__injector[prop]) {
      (obj as any).__injector[prop] = [];
    }
    (obj as any).__injector[prop].push(forceUpdate);
  }, [obj, forceUpdate, prop]);
};

export default useInjector;
