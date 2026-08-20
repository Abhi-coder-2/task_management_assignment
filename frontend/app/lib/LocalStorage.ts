// src/lib/localStorage.ts

export const setLocalStorage = (key: string, value: unknown) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = <T>(key: string): T | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value) as T;
};

export const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};