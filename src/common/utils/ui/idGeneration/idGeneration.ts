import React from 'react';

import { customAlphabet } from 'nanoid';

export const idGeneration = () => {
  const nanoid = customAlphabet(
    '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    10,
  );
  return nanoid();
};
