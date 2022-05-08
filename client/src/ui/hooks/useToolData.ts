import Tool from '@/core/tool/Tool';
import useInjector from './useInjector';

const useToolData = <T extends Tool, K extends keyof T>(prop: K, tool?: T): T[K] => {
  useInjector(prop, tool);

  return tool?.[prop] as T[K];
};

export default useToolData;
