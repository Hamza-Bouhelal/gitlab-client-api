/* eslint @typescript-eslint/no-explicit-any : 0 */

export function getOptions<T extends { [key: string]: any }>(
  options: Partial<T>,
  defaults: T
): Required<T> {
  return Object.keys(defaults).reduce(
    (acc, key) => ({
      ...acc,
      [key]: options[key] || defaults[key],
    }),
    {} as Required<T>
  );
}

export function removeUndefinedKeys(obj: { [key: string]: any }) {
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  return obj;
}

export function removeKey<T extends object, K extends keyof T>(
  obj: T,
  key: K
): Omit<T, K> {
  const { [key]: _, ...rest } = obj;
  _;
  return rest;
}
