import React, { ChangeEvent, PropsWithChildren, useEffect, useState } from 'react';

import { RgbaStringColorPicker } from 'react-colorful';

import { setMLDraftBlockContent } from 'bll/reducers';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftLink, IMLDraftText } from 'common/types/instance';
import { Button } from 'ui/components/elements';

type TMLBaseEditorProps = {
  blockEditor: React.ReactElement;
};

const defaultColors: string[] = ['black', 'red', 'yellow', 'green', 'blue', 'pink'];
const paddings: string[] = ['top', 'right', 'bottom', 'left'];
const margins: string[] = ['top', 'right', 'bottom', 'left'];
const marginArray = [0, 0, 0, 0];

export const MLBaseEditor = ({ blockEditor }: TMLBaseEditorProps) => {
  const { block, order } = blockEditor.props;
  const dispatch = useAppDispatch();
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
    const padding = e.currentTarget.value;
    const title = e.currentTarget.name;

    if (title === 'top') {
      if (isPaddingTopBottom) {
        block.padding[2] = +padding;
      }
      block.padding[0] = +padding;
    }
    if (title === 'right') {
      if (isPaddingLeftRight) {
        block.padding[3] = +padding;
      }
      block.padding[1] = +padding;
    }
    if (title === 'bottom') {
      if (isPaddingTopBottom) {
        block.padding[0] = +padding;
      }
      block.padding[2] = +padding;
    }
    if (title === 'left') {
      if (isPaddingLeftRight) {
        block.padding[1] = +padding;
      }
      block.padding[3] = +padding;
    }
    dispatch(setMLDraftBlockContent(block, order, 'textBlocks'));
  };

  const onMarginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const margin = e.currentTarget.value;
    const title = e.currentTarget.name;

    if (title === 'top') {
      if (isMarginTopBottom) {
        block.margin[2] = +margin;
      }
      block.margin[0] = +margin;
    }
    if (title === 'right') {
      if (isMarginLeftRight) {
        block.margin[3] = +margin;
      }
      block.margin[1] = +margin;
    }
    if (title === 'bottom') {
      if (isMarginTopBottom) {
        block.margin[0] = +margin;
      }
      block.margin[2] = +margin;
    }
    if (title === 'left') {
      if (isMarginLeftRight) {
        block.margin[1] = +margin;
      }
      block.margin[3] = +margin;
    }

    dispatch(setMLDraftBlockContent(block, order, 'textBlocks'));
  };

  return (
    <>
      <div>
        {blockEditor}
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
                <input type="checkbox" onChange={() => setIsPaddingLeftRight(true)} />
              </label>
              <label>
                Top&Bottom
                <input type="checkbox" onChange={() => setIsPaddingTopBottom(true)} />
              </label>
            </div>
          </div>
          <div className="padding_margin">
            {paddings.map((padding, i: number) => (
              <div key={padding}>
                <label>{padding}:</label>
                <input
                  type="range"
                  name={padding}
                  min={4}
                  max={60}
                  step={4}
                  defaultValue={i}
                  value={Array.isArray(block?.padding) ? block?.padding[i] : i}
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
                <input type="checkbox" onChange={() => setIsMarginLeftRight(true)} />
              </label>
              <label>
                Top&Bottom
                <input type="checkbox" onChange={() => setIsMarginTopBottom(true)} />
              </label>
            </div>
          </div>
          <div className="padding_margin">
            {margins.map((margin, i: number) => (
              <div key={margin}>
                <label>{margin}:</label>
                <input
                  type="range"
                  name={margin}
                  min={4}
                  max={60}
                  step={4}
                  defaultValue={i}
                  value={Array.isArray(block?.margin) ? block?.margin[i] : i}
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
