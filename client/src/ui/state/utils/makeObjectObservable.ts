import { ObserverHandler } from '@/ui/state/models/ObserverHandler';
import ObservableObject from '../types/ObservableObject';

const observableHandler = {
  set(obj: ObservableObject, prop: string, value: unknown) {
    obj[prop] = value;

    const observers = obj.__componentObservers as ObserverHandler<unknown>[];

    observers.forEach((observer) => {
      observer.updateState();
    });

    return true;
  },
};

const makeObjectObservable = <T>(obj: T): T => {
  const observable = obj as unknown as ObservableObject;
  observable.__componentObservers = [];

  return new Proxy(observable, observableHandler) as unknown as T;
};

export default makeObjectObservable;
