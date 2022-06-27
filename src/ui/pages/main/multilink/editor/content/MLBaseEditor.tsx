import React, { ChangeEvent, FC, PropsWithChildren, useEffect, useState } from 'react';

import { RgbaStringColorPicker } from 'react-colorful';

import { setMLDraftBlockContent } from 'bll/reducers';
import { Direction } from 'common/constants';
import { useAppDispatch, useThrottle } from 'common/hooks';
import { IMLDraftContent, TMLDraftBlocks } from 'common/types/instance/mlDraft';
import { capitalizeFirst } from 'common/utils/ui';
import { Button } from 'ui/components/elements';
import { Checkbox } from 'ui/components/elements/checkbox/Checkbox';

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

  const copyBlock = { ...block };

  const onBackgroundColorChange = (backgroundColor: string) => {
    copyBlock.background = backgroundColor;
    dispatch(
      setMLDraftBlockContent({
        content: copyBlock,
        order,
      }),
    );
  };

  const onBindDirectionsCheck = (checked: boolean, value: string) => {
    switch (value) {
      case 'padding-LR':
        return setIsPaddingLeftRight(checked);
      case 'padding-TB':
        return setIsPaddingTopBottom(checked);
      case 'margin-LR':
        return setIsMarginLeftRight(checked);
      case 'margin-TB':
        return setIsMarginTopBottom(checked);
      default:
    }
  };

  const onPaddingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const padding = +e.currentTarget.value;

    const direction = +e.currentTarget.name;

    if (!copyBlock.padding) {
      copyBlock.padding = [0, 0, 0, 0];
    }

    if (isPaddingTopBottom && isPaddingLeftRight) {
      copyBlock.padding = new Array(4).fill(padding);
      dispatchThrottled(setMLDraftBlockContent({ content: copyBlock, order }));
      return;
    }

    if (direction === Direction.TOP || direction === Direction.BOTTOM) {
      if (isPaddingTopBottom) {
        copyBlock.padding[Direction.TOP] = padding;
        copyBlock.padding[Direction.BOTTOM] = padding;
      } else {
        copyBlock.padding[direction] = padding;
      }
    }
    if (direction === Direction.RIGHT || direction === Direction.LEFT) {
      if (isPaddingLeftRight) {
        copyBlock.padding[Direction.RIGHT] = padding;
        copyBlock.padding[Direction.LEFT] = padding;
      } else {
        copyBlock.padding[direction] = padding;
      }
    }

    dispatchThrottled(setMLDraftBlockContent({ content: copyBlock, order }));
  };

  const onMarginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const margin = +e.currentTarget.value;
    const direction = +e.currentTarget.name as Direction;

    if (!copyBlock.margin) {
      copyBlock.margin = [0, 0, 0, 0];
    }

    if (isMarginTopBottom && isMarginLeftRight) {
      copyBlock.margin = new Array(4).fill(margin);
      dispatchThrottled(setMLDraftBlockContent({ content: copyBlock, order }));
      return;
    }

    if (direction === Direction.TOP || direction === Direction.BOTTOM) {
      if (isMarginTopBottom) {
        copyBlock.margin[Direction.TOP] = margin;
        copyBlock.margin[Direction.BOTTOM] = margin;
      } else {
        copyBlock.margin[direction] = margin;
      }
    }
    if (direction === Direction.RIGHT || direction === Direction.LEFT) {
      if (isMarginLeftRight) {
        copyBlock.margin[Direction.RIGHT] = margin;
        copyBlock.margin[Direction.LEFT] = margin;
      } else {
        copyBlock.margin[direction] = margin;
      }
    }

    dispatchThrottled(setMLDraftBlockContent({ content: copyBlock, order }));
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
              value={undefined}
              style={{ backgroundColor: color }}
              onClick={() => onBackgroundColorChange(color)}
            />
          ))}
          <input
            type="button"
            defaultValue={undefined}
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
              <Checkbox
                value="padding-LR"
                name="padding-LR"
                checked={isPaddingLeftRight}
                onChangeChecked={onBindDirectionsCheck}>
                Left&Right
              </Checkbox>
              <Checkbox
                value="padding-TB"
                name="padding-TB"
                checked={isPaddingTopBottom}
                onChangeChecked={onBindDirectionsCheck}>
                Top&Bottom
              </Checkbox>
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
                  max={80}
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
              <Checkbox
                value="margin-LR"
                name="margin-LR"
                checked={isMarginLeftRight}
                onChangeChecked={onBindDirectionsCheck}>
                Left&Right
              </Checkbox>
              <Checkbox
                value="margin-TB"
                name="margin-TB"
                checked={isMarginTopBottom}
                onChangeChecked={onBindDirectionsCheck}>
                Top&Bottom
              </Checkbox>
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
