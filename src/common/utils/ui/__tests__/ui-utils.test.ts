/* eslint-disable no-undef */
import { px } from '..';

test('must transform according to CSS rules', () => {
  const toPx1 = 0;
  const toPx2 = [0];
  const toPx3 = [1, 2, 3, 4];
  const toPx4 = [1, 0, 3];
  const toPx5 = 5;

  expect(px(toPx1)).toBe('0');
  expect(px(toPx2)).toBe('0');
  expect(px(toPx3)).toBe('1px 2px 3px 4px');
  expect(px(toPx4)).toBe('1px 0 3px');
  expect(px(toPx5)).toBe('5px');
});
