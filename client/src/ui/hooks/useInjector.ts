import { useEffect } from 'react';
import useForceUpdate from './useForceUpdate';

const useInjector = <T, K extends keyof T>(prop: K, obj?: T): void => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const anyObj = obj as any;
    if (!anyObj) {
      return;
    }

    if (!anyObj.__injector) {
      anyObj.__injector = {};
    }

    if (!anyObj.__injector[prop]) {
      anyObj.__injector[prop] = [];
    }
    anyObj.__injector[prop].push(forceUpdate);

    return () => {
      if (anyObj?.__injector?.[prop]) {
        anyObj.__injector[prop] = anyObj.__injector[prop].filter((updater: () => void) => updater !== forceUpdate);
      }
    };
  }, [forceUpdate, obj, prop]);
};

export default useInjector;
