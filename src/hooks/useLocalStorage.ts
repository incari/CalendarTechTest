import { useState } from "react";

function deserializeJSON<T>(value: string): T | null {
  try {
    return JSON.parse(value);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Could not parse ${value} as JSON.`);
    return null;
  }
}

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key) ?? "null";
    return deserializeJSON(item) ?? initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  const remove = () => {
    localStorage.removeItem(key);
  };

  return [storedValue, setValue, remove] as const;
};
