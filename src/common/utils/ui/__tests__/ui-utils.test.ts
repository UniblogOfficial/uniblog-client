/* eslint-disable no-undef */
import { px } from '..';
import { getMLBlockTextProperties } from '../styleAssemblers';

import { MLDraftText } from 'common/types/instance';

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

test('incoming textShadow prop must transform to comma separated string', () => {
  const block0 = new MLDraftText({ isFilled: false, text: 'Yo' });
  const block1 = new MLDraftText({ isFilled: false, text: 'Yo', textShadow: [] });
  const block2 = new MLDraftText({
    isFilled: false,
    text: 'Yo',
    textShadow: ['2px 1px 2px #0007'],
  });
  const block3 = new MLDraftText({
    isFilled: false,
    text: 'Yo',
    textShadow: ['2px 1px 2px #0007', '5px 5px 5px #0007'],
  });
  const block4 = new MLDraftText({
    isFilled: false,
    text: 'Yo',
    textShadow: ['2px 1px 2px #0001', '5px 5px 5px #0002', '15px 15px 5px #0003'],
  });
  expect(getMLBlockTextProperties(block0).textShadow).toBeUndefined();
  expect(getMLBlockTextProperties(block1).textShadow).toBeUndefined();
  expect(getMLBlockTextProperties(block2).textShadow).toBe('2px 1px 2px #0007');
  expect(getMLBlockTextProperties(block3).textShadow).toBe('2px 1px 2px #0007, 5px 5px 5px #0007');
  expect(getMLBlockTextProperties(block4).textShadow).toBe(
    '2px 1px 2px #0001, 5px 5px 5px #0002, 15px 15px 5px #0003',
  );
});
