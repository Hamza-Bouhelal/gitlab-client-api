/* eslint @typescript-eslint/no-explicit-any : 0 */
import { UserInfo } from "../Gitlab";

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

export function addUserSearchParams(
  isUser: boolean,
  getUserInfo: () => Promise<UserInfo>
) {
  return isUser
    ? {
        membership: true,
        min_access_level: 10,
        owned: true,
        user_id: getUserInfo().then((userInfo) => userInfo.id),
      }
    : {};
}
