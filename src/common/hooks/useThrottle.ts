import { useEffect, useRef, useState } from 'react';

import { useEffectOnce } from '.';

export const useThrottle = <T extends (arg: V) => any, V>(callback: T, delay: number) => {
  const [throttled, setThrottled] = useState<V>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const nextArgs = useRef<V>();

  useEffect(() => {
    if (!timeout.current) {
      throttled && callback(throttled);
      const timeoutCallback = () => {
        if (nextArgs.current) {
          throttled && callback(throttled);
          nextArgs.current = undefined;
          timeout.current = setTimeout(timeoutCallback, delay);
        } else {
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(timeoutCallback, delay);
    } else {
      nextArgs.current = throttled;
    }
  }, [callback, delay, throttled]);

  // @ts-ignore
  useEffectOnce(() => () => clearTimeout(timeout.current));

  return setThrottled;
};
