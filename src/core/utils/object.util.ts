export const isEmpty = (obj: any): boolean => {
  if (obj === null || obj === undefined) return true;
  return Object.keys(obj).length === 0;
};

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};
