import { Buffer } from 'buffer';

import { CSSProperties } from 'react';

import { isDefined } from '../state';

import { Nullable } from 'common/types/instance';

export const capitalizeFirst = (s: string) =>
  (s && s[0].toUpperCase() + s.slice(1).toLowerCase()) || '';

export const parseRawImage = (rawImage: any) => {
  if (isDefined(rawImage)) {
    return `data:${rawImage.imageType};base64, ${Buffer.from(rawImage.imageData!).toString(
      'base64',
    )}`;
  }
};

export const px = (value?: Nullable<number | number[]>, divider?: number) => {
  // look ui-utils.test to find out what happened
  if (value === undefined || value === null) return undefined;

  if (Array.isArray(value)) {
    if (divider) {
      const divided = value.map(v => v / divider);
      return divided.reduce(
        (string, el, i) => `${string}${el}${el ? 'px' : ''}${i === value.length - 1 ? '' : ' '}`,
        '',
      );
    }
    return value.reduce(
      (string, el, i) => `${string}${el}${el ? 'px' : ''}${i === value.length - 1 ? '' : ' '}`,
      '',
    );
  }
  // if is plain number
  return value ? `${divider ? value / divider : value}px` : '0';
};
