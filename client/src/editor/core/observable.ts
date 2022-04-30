import Updater from './Updater';

const interceptor = {
  set: function (target: any, prop: string) {
    target._observerCounter += 1;
    return target[prop];
  },
};

const observable = <T>(obj: T): T => {
  (obj as any)._observerCounter = 0;
  return new Proxy(obj, interceptor);
};
