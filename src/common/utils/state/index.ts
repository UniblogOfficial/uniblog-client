export { handleServerNetworkError } from './errorHandler';
export { pushMLDraftBlock, pushMLDraftBlockLogo, pushMLDraftBlockSocial } from './pushMLDraftBlock';
// =======================================================================================================
export const getKeys = Object.keys as <T extends Object>(obj: T) => Array<keyof T>;
// =======================================================================================================
export const convertObjToFlags = <T>(obj: T) =>
  getKeys(obj).reduce((flags, key) => {
    flags[key] = false;
    return flags;
  }, {} as { [Key in keyof T]: boolean });
// =======================================================================================================
export const trim = (string: string, char: string) => {
  let start = 0;
  let end = string.length;

  while (start < end && string[start] === char) ++start;

  while (end > start && string[end - 1] === char) --end;

  return start > 0 || end < string.length ? string.substring(start, end) : string;
};
// Usage:
// trim('|hello|world|', '|'); // => 'hello|world'
// =======================================================================================================
export const validateMLRoute = (routes: string[], currentRoute: string) => {
  if (routes.indexOf(`/${currentRoute.split('/')[1]}`) === -1) return true;
  return false;
};
// =======================================================================================================
export const notNull = <T>(argument: T | null): argument is T => argument !== null;

export const isDefined = <T>(argument: T | undefined): argument is T => argument !== undefined;
// =======================================================================================================
