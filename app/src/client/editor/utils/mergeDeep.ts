import { PartialDeep } from 'type-fest';

const isObject = (item: unknown) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mergeDeepRecursive = <T extends Record<string, any>>(target: T, ...sources: PartialDeep<T>[]): T => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        const newSource = source[key];
        if (newSource) {
          mergeDeepRecursive(
            target[key],
            newSource as PartialDeep<T[Extract<keyof NonNullable<PartialDeep<T>>, string>], object>,
          );
        }
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeepRecursive(target, ...sources);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mergeDeep = <T extends Record<string, any>>(target: T, ...sources: PartialDeep<T>[]): T => {
  const clone = JSON.parse(JSON.stringify(target));
  return mergeDeepRecursive(clone, ...sources);
};

export default mergeDeep;
