import { PartialDeep } from 'type-fest';

export type MergeStrategy = 'merge' | 'exclude' | 'replace';

export const mergeArrays = <T>(arr1: T[], arr2: T[] | undefined, mergeStrategy: MergeStrategy) => {
  if (mergeStrategy === 'merge') {
    return [...new Set([...arr1, ...(arr2 || [])])];
  }

  if (mergeStrategy === 'replace') {
    return arr2 || [];
  }

  return arr1.filter((id) => !arr2?.includes(id));
};

const isObject = (item: unknown) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mergeDeepRecursive = <T extends Record<string, any>>(
  target: T,
  source: PartialDeep<T>,
  mergeStrategy: MergeStrategy,
): T => {
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        const newSource = source[key];
        if (newSource) {
          mergeDeepRecursive(
            target[key],
            newSource as PartialDeep<T[Extract<keyof NonNullable<PartialDeep<T>>, string>], object>,
            mergeStrategy,
          );
        }
      } else if (Array.isArray(source[key])) {
        Object.assign(target, { [key]: mergeArrays(target[key], source[key] as unknown[], mergeStrategy) });
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return target;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mergeDeep = <T extends Record<string, any>>(
  target: T,
  source?: PartialDeep<T>,
  mergeStrategy: MergeStrategy = 'replace',
): T => {
  if (!source) {
    return target;
  }
  const clone = JSON.parse(JSON.stringify(target));
  return mergeDeepRecursive(clone, source, mergeStrategy);
};

export default mergeDeep;
