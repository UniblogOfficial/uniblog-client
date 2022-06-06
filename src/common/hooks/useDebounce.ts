import { useEffect, useState } from 'react';

export const useDebounce = <T extends (arg: V) => any, V>(callback: T, delay: number) => {
  const [debounced, setDebounced] = useState<V>();

  useEffect(() => {
    const handler = setTimeout(() => {
      debounced && callback(debounced);
    }, delay);

    return () => clearTimeout(handler);
  }, [callback, debounced, delay]);

  return setDebounced;
};
