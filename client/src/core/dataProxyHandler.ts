const dataProxyHandler = {
  set(obj: any, prop: string, value: any) {
    obj[prop] = value;

    if (obj.__injector && obj.__injector[prop]) {
      (obj.__injector[prop] as (() => void)[]).forEach((updater) => updater());
    }

    return true;
  },
};

export default dataProxyHandler;
