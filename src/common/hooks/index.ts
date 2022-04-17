import { useEffect, useRef, useState } from 'react';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppThunkDispatch, TState } from '../../bll/store';

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<TState> = useSelector;

export * from './useWindowSize';

export const useOnMouseDownOutside = (callback: (e: MouseEvent) => void) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef<typeof callback>();
  // set current callback in ref, before second useEffect uses it
  useEffect(() => {
    // useEffect wrapper to be safe for concurrent mode
    callbackRef.current = callback;
  });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        innerRef.current &&
        callbackRef.current &&
        !(innerRef.current! as any).contains(e.target)
      ) {
        callbackRef.current(e);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);

    // read most recent callback and innerRef dom node from refs
  }, []); // no need for callback + innerRef dep

  return innerRef; // return ref; client can omit `useRef`
};
