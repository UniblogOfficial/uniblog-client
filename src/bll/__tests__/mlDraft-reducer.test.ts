import { nanoid } from '@reduxjs/toolkit';

/* eslint-disable prefer-template */
/* eslint-disable no-undef */
import { pushMLDraftBlock } from '../../common/utils/state/pushMLDraftBlock';
import { addMLDraftBlock, mlDraftReducer } from '../reducers/mlDraft';

import { TMLDraftState } from 'bll/reducers';
import { MLConstructorStage, MLContentType } from 'common/constants';
import { getKeys, getValues } from 'common/utils/state';

const initialState: TMLDraftState = {
  name: '',
  background: '#fff',
  outerBackground: '#0000',
  maxWidth: 480,
  contentMap: [],
  blocks: {},

  images: {
    background: null,
    outerBackground: null,
    blocks: {},
  },

  isTouched: false,
  currentStage: MLConstructorStage.TEMPLATE,
};

// DESCRIPTION
// this test puts pushBlock action creators for each ML block type;
// all arrays in state must be incremented;
// last element of array of current block type must be defined;
// if current block have image data, then last element of array of current block image data must be defined;
// last elements of arrays of blocks with other types must be null

const previousLength = initialState.contentMap.length;
const allBlockTypes = getValues(MLContentType);
const blockTypesWithImageData = getKeys(initialState.images.blocks);
describe('arrays consistency check', () => {
  describe.each(allBlockTypes.map(type => [type]))('all arrays must be incremented %#', type => {
    const blockType = type.replace('Blocks', '');
    const action = addMLDraftBlock({ type, id: nanoid() });
    const endState = mlDraftReducer(initialState, action);

    getKeys(endState.blocks).forEach(key => {
      test(`pushing ${blockType}, array ${key}`, () => {
        expect(endState.blocks[key].length).toBe(previousLength + 1);
      });
    });
    blockTypesWithImageData.forEach(key => {
      test(`pushing ${blockType}, array images.${key}`, () => {
        expect(endState.images.blocks[key].length).toBe(previousLength + 1);
      });
    });
  });
});

describe('new block definition', () => {
  allBlockTypes.forEach(blockType => {
    const action = addMLDraftBlock(blockType);
    const endState = mlDraftReducer(initialState, action);
    describe('pushing', () => {
      getKeys(endState.blocks).forEach(key => {
        testIf(key === blockType, key + '(added block) is defined', () => {
          expect(endState.blocks[key][previousLength]).toBeDefined();
          expect(endState.blocks[key][previousLength]?.order).toBe(previousLength);
        });
        testIf(key !== blockType, key + '(other block) is null', () => {
          expect(endState.blocks[key][previousLength]).toBeNull();
        });
      });
      blockTypesWithImageData.forEach(key => {
        testIf(key === blockType, key + '(image data, added block) is defined', () => {
          expect(endState.images.blocks[key][previousLength]).toBeDefined();
          expect(endState.images.blocks[key][previousLength]?.order).toBe(previousLength);
        });
        testIf(key !== blockType, key + '(image data, other block) is null', () => {
          expect(endState.images.blocks[key][previousLength]).toBeNull();
        });
      });
    });
  });
});

function testIf(condition: boolean, ...args: any) {
  return condition
    ? it(...(args as [string, () => void]))
    : it.skip(...(args as [string, () => void]));
}
