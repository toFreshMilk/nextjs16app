// src/core/utils/object.util.ts
export const isEmpty = (obj: unknown): boolean => {
  if (obj === null || obj === undefined) return true;
  if (typeof obj !== 'object') return true;
  if (Array.isArray(obj)) return obj.length === 0;
  return Object.keys(obj).length === 0;
};

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};
