import { Dirent } from 'fs';

import React, { ChangeEvent, FC, PropsWithChildren, useEffect, useState } from 'react';

import { RgbaStringColorPicker } from 'react-colorful';

import { setMLDraftBlockContent } from 'bll/reducers';
import { Direction } from 'common/constants';
import { useAppDispatch, useThrottle } from 'common/hooks';
import { IMLDraftContent } from 'common/types/instance/mlDraft';
import { getKeys, getValues } from 'common/utils/state';
import { capitalizeFirst } from 'common/utils/ui';
import { Button } from 'ui/components/elements';

export type TMLBaseEditorProps<T> = {
  order: number;
  block: IMLDraftContent<T>;
};

const defaultColors: string[] = ['black', 'red', 'yellow', 'green', 'blue', 'pink'];
const paddings = Object.entries(Direction).reduce(
  (acc, el, i, arr) => (i >= arr.length / 2 ? [...acc, el as [string, string]] : acc),
  [] as [string, string][],
);
const margins = paddings;

export const MLBaseEditor = <T extends {}>(props: PropsWithChildren<TMLBaseEditorProps<T>>) => {
  const { order, block, children } = props;
  const dispatch = useAppDispatch();
  const dispatchThrottled = useThrottle(dispatch, 50);
  const [isBgColorPickerVisible, setIsBgColorPickerVisible] = useState(false);
  const [isPaddingLeftRight, setIsPaddingLeftRight] = useState(false);
  const [isMarginLeftRight, setIsMarginLeftRight] = useState(false);
  const [isPaddingTopBottom, setIsPaddingTopBottom] = useState(false);
  const [isMarginTopBottom, setIsMarginTopBottom] = useState(false);

  const onBackgroundColorChange = (backgroundColor: string) => {
    block.background = backgroundColor;
    dispatch(setMLDraftBlockContent(block, order, 'textBlocks'));
  };
  const onPaddingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const padding = +e.currentTarget.value;
    const direction = +e.currentTarget.name;

    if (!block.padding) {
      block.padding = [0, 0, 0, 0];
    }

    if (isPaddingTopBottom && isPaddingLeftRight) {
      block.padding.fill(padding);
      dispatchThrottled(setMLDraftBlockContent(block, order, 'textBlocks'));
      return;
    }

    if (direction === Direction.TOP || direction === Direction.BOTTOM) {
      if (isPaddingTopBottom) {
        block.padding[Direction.TOP] = padding;
        block.padding[Direction.BOTTOM] = padding;
      } else {
        block.padding[direction] = padding;
      }
    }
    if (direction === Direction.RIGHT || direction === Direction.LEFT) {
      if (isPaddingLeftRight) {
        block.padding[Direction.RIGHT] = padding;
        block.padding[Direction.LEFT] = padding;
      } else {
        block.padding[direction] = padding;
      }
    }

    dispatchThrottled(setMLDraftBlockContent(block, order, 'textBlocks'));
  };

  const onMarginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const margin = +e.currentTarget.value;
    const direction = +e.currentTarget.name as Direction;

    if (!block.margin) {
      block.margin = [0, 0, 0, 0];
    }

    if (isMarginTopBottom && isMarginLeftRight) {
      block.margin.fill(margin);
      dispatchThrottled(setMLDraftBlockContent(block, order, 'textBlocks'));
      return;
    }

    if (direction === Direction.TOP || direction === Direction.BOTTOM) {
      if (isMarginTopBottom) {
        block.margin[Direction.TOP] = margin;
        block.margin[Direction.BOTTOM] = margin;
      } else {
        block.margin[direction] = margin;
      }
    }
    if (direction === Direction.RIGHT || direction === Direction.LEFT) {
      if (isMarginLeftRight) {
        block.margin[Direction.RIGHT] = margin;
        block.margin[Direction.LEFT] = margin;
      } else {
        block.margin[direction] = margin;
      }
    }

    dispatchThrottled(setMLDraftBlockContent(block, order, 'textBlocks'));
  };

  return (
    <>
      <div>
        {children}
        <div style={{ paddingTop: '15px' }}>
          Background:
          {defaultColors.map((color, index) => (
            <input
              key={color}
              type="button"
              className="circle"
              style={{ backgroundColor: color }}
              onClick={() => onBackgroundColorChange(color)}
            />
          ))}
          <input
            type="button"
            className="circleGradient"
            onClick={() => setIsBgColorPickerVisible(true)}
          />
          {isBgColorPickerVisible && (
            <>
              <RgbaStringColorPicker
                style={{ marginTop: '10px' }}
                color={block.background ?? '#ffff'}
                onChange={onBackgroundColorChange}
              />
              <Button
                style={{ marginTop: '10px', width: '110px', height: '30px', borderRadius: '7px' }}
                onClick={() => setIsBgColorPickerVisible(false)}>
                Ok
              </Button>
            </>
          )}
          <div style={{ marginTop: '10px' }}>
            Padding:
            <div className="padding_margin">
              <label>
                Left&Right
                <input
                  type="checkbox"
                  onChange={() => setIsPaddingLeftRight(!isPaddingLeftRight)}
                />
              </label>
              <label>
                Top&Bottom
                <input
                  type="checkbox"
                  onChange={() => setIsPaddingTopBottom(!isPaddingTopBottom)}
                />
              </label>
            </div>
          </div>
          <div className="padding_margin">
            {paddings.map((padding, i) => (
              <div key={padding[0]}>
                <label>{capitalizeFirst(padding[0])}:</label>
                <input
                  type="range"
                  name={padding[1]}
                  min={0}
                  max={60}
                  step={4}
                  value={block.padding && block.padding[i] ? block.padding[i] : 0}
                  onChange={onPaddingChange}
                />
              </div>
            ))}
          </div>
          <div>
            Margin:
            <div className="padding_margin">
              <label>
                Left&Right
                <input type="checkbox" onChange={() => setIsMarginLeftRight(!isMarginLeftRight)} />
              </label>
              <label>
                Top&Bottom
                <input type="checkbox" onChange={() => setIsMarginTopBottom(!isMarginTopBottom)} />
              </label>
            </div>
          </div>
          <div className="padding_margin">
            {margins.map((margin, i) => (
              <div key={margin[0]}>
                <label>{capitalizeFirst(margin[0])}:</label>
                <input
                  type="range"
                  name={margin[1]}
                  min={0}
                  max={100}
                  step={4}
                  value={block.margin && block.margin[i] ? block.margin[i] : 0}
                  onChange={onMarginChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
