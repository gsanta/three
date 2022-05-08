import useInjector from './useInjector';

const useData = <O, P extends keyof O>(prop: P, obj?: O) => {
  useInjector(prop, obj);

  return obj ? obj[prop] : undefined;
};

export default useData;
