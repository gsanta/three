import { ObserverHandler } from '../models/ObserverHandler';

interface ObservableObject {
  [key: string]: unknown;
  __componentObservers: ObserverHandler<ObservableObject>[];
}

export default ObservableObject;
