export const getKeys = Object.keys as <T extends Object>(obj: T) => Array<keyof T>;
// =======================================================================================================
export const convertObjToFlags = <T>(obj: T) =>
  getKeys(obj).reduce((flags, key) => {
    flags[key] = false;
    return flags;
  }, {} as { [Key in keyof T]: boolean });
