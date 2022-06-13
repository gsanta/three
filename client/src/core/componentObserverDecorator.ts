import { ComponentObserver } from "@/ui/hooks/ComponentObserver";

const componentObserver = {
  set(obj: any, prop: string, value: any) {
    obj[prop] = value;

    const observers = obj.__componentObservers as ComponentObserver<unknown>[];

    observers.forEach((observer) => {
      observer.updateState();
    })

    return true;
  },
};

const componentObserverDecorator = <T>(obj: T): T => {
  (obj as any).__componentObservers = [];

  return new Proxy(obj, componentObserver);
}

export default componentObserverDecorator;
