const dataProxyHandler = {
  set(obj: any, prop: string, value: any) {
    // if ('__injector' in obj === false) {
    //   obj.__injector = {};
    // }

    // if (!obj.__injector[prop]) {
    //   obj.__injector[prop] = [];
    // }
    obj[prop] = value;

    if (obj.__injector && obj.__injector[prop]) {
      (obj.__injector[prop] as (() => void)[]).forEach((updater) => updater());
    }

    return true;
  },
};

export default dataProxyHandler;
