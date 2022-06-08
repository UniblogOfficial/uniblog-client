import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { RgbaStringColorPicker } from 'react-colorful';

import { setMLDraftBlockContent } from '../../../../../../../bll/reducers';
import { useAppDispatch } from '../../../../../../../common/hooks';
import { useDebounce } from '../../../../../../../common/hooks/useDebounce.';
import { IMLDraftContentText, Nullable } from '../../../../../../../common/types/instance';
import { Button, Icon, Input, Radio, Textarea } from '../../../../../../components/elements';
import { Select } from '../../../../../../components/elements/select/Select';

import styles from './MLTextarea.module.scss';

type TMLTextareaProps = {
  order: number;
  block: Nullable<IMLDraftContentText>;
};

type AlignTextType = 'right' | 'left' | 'center' | 'justify';
const defaultColors: string[] = ['black', 'red', 'yellow', 'green', 'blue', 'pink'];
const fontSizeTexts: string[] = ['12', '14', '16', '18', '20', '22'];
const paddings: string[] = ['top', 'right', 'bottom', 'left'];
const margins: string[] = ['top', 'right', 'bottom', 'left'];
const marginArray = [0, 0, 0, 0];

export const MLTextarea = ({ order, block }: TMLTextareaProps) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState(block?.text ?? '');
  const [isTextColorPickerVisible, setIsTextColorPickerVisible] = useState(false);
  const [isBgColorPickerVisible, setIsBgColorPickerVisible] = useState(false);
  const [isPaddingLeftRight, setIsPaddingLeftRight] = useState(false);
  const [isMarginLeftRight, setIsMarginLeftRight] = useState(false);
  const [isPaddingTopBottom, setIsPaddingTopBottom] = useState(false);
  const [isMarginTopBottom, setIsMarginTopBottom] = useState(false);
  const debouncedValue = useDebounce(text, 500);

  useEffect(() => {
    if (!block) {
      return;
    }
    block.text = debouncedValue;
    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  }, [block, debouncedValue, dispatch, order]);

  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
  };

  const onAlignChange = (align: AlignTextType) => {
    if (!block) {
      return;
    }
    block.align = align;
    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  };

  const onColorChange = (color: string) => {
    if (!block) {
      return;
    }
    block.color = color;
    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  };

  const onBackgroundColorChange = (backgroundColor: string) => {
    if (!block) {
      return;
    }
    block.background = backgroundColor;
    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  };

  const onTextSizeChange = (fontSize: string) => {
    if (!block) {
      return;
    }
    block.fontSize = +fontSize;
    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  };
  const onFontWeightChange = (fontWeight: string) => {
    if (!block) {
      return;
    }
    block.fontWeight = fontWeight;
    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  };

  const onPaddingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const padding = e.currentTarget.value;
    const title = e.currentTarget.name;

    if (!block) {
      return;
    }
    if (Array.isArray(block.padding)) {
      if (block.padding.length < 4) {
        block.padding = [...block.padding, ...block.padding];
      }
      if (title === 'top') {
        if (isPaddingTopBottom) {
          block.padding[0] = +padding;
          block.padding[2] = +padding;
        }
        block.padding[0] = +padding;
      }
      if (title === 'right') {
        if (isPaddingLeftRight) {
          block.padding[1] = +padding;
          block.padding[3] = +padding;
        }
        block.padding[1] = +padding;
      }
      if (title === 'bottom') {
        if (isPaddingTopBottom) {
          block.padding[0] = +padding;
          block.padding[2] = +padding;
        }
        block.padding[2] = +padding;
      }
      if (title === 'left') {
        if (isPaddingLeftRight) {
          block.padding[1] = +padding;
          block.padding[3] = +padding;
        }
        block.padding[3] = +padding;
      }
    }

    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  };

  const onMarginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const margin = e.currentTarget.value;
    const title = e.currentTarget.name;

    if (!block) {
      return;
    }
    block.margin = marginArray;

    if (title === 'top') {
      if (isMarginTopBottom) {
        block.margin[0] = +margin;
        block.margin[2] = +margin;
      }
      block.margin[0] = +margin;
    }
    if (title === 'right') {
      if (isMarginLeftRight) {
        block.margin[1] = +margin;
        block.margin[3] = +margin;
      }
      block.margin[1] = +margin;
    }
    if (title === 'bottom') {
      if (isMarginTopBottom) {
        block.margin[0] = +margin;
        block.margin[2] = +margin;
      }
      block.margin[2] = +margin;
      console.log('margin', +margin);
    }
    if (title === 'left') {
      if (isMarginLeftRight) {
        block.margin[1] = +margin;
        block.margin[3] = +margin;
      }
      block.margin[3] = +margin;
    }

    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  };

  return (
    <>
      <div>
        <Textarea
          data-value={order}
          value={text}
          onChange={onTextareaChange}
          maxLength={1023}
          className="textarea"
        />
        Align & Bold:
        <div className={styles.flex__row3}>
          <Icon
            name="text-align-left"
            containerClassName="draw_text"
            onClick={() => onAlignChange('left')}
          />
          <Icon
            name="text-align-center"
            containerClassName="draw_text"
            onClick={() => onAlignChange('center')}
          />
          <Icon
            name="text-align-right"
            containerClassName="draw_text"
            onClick={() => onAlignChange('right')}
          />
          <Icon
            name="text-align-justify"
            containerClassName="draw_text"
            onClick={() => onAlignChange('justify')}
          />
          <Icon
            name="text-bolt"
            containerClassName="draw_text"
            onClick={() => onFontWeightChange(block?.fontWeight === 'bold' ? 'normal' : 'bold')}
          />
        </div>
        <div className={styles.select}>
          Size:
          <Select options={fontSizeTexts} onChangeOption={onTextSizeChange} />
        </div>
        <div>
          Text Color:
          {defaultColors.map((color, index) => (
            <input
              key={color}
              type="button"
              className={styles.circle}
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
          <input
            type="button"
            className={styles.circleGradient}
            onClick={() => setIsTextColorPickerVisible(true)}
          />
          {isTextColorPickerVisible && (
            <RgbaStringColorPicker
              color={block?.color}
              onChange={onColorChange}
              onBlur={() => setIsTextColorPickerVisible(false)}
            />
          )}
        </div>
        <div style={{ paddingTop: '15px' }}>
          Background:
          {defaultColors.map((color, index) => (
            <input
              key={color}
              type="button"
              className={styles.circle}
              style={{ backgroundColor: color }}
              onClick={() => onBackgroundColorChange(color)}
            />
          ))}
          <input
            type="button"
            className={styles.circleGradient}
            onClick={() => setIsBgColorPickerVisible(true)}
          />
          {isBgColorPickerVisible && (
            <>
              <RgbaStringColorPicker
                color={block?.background ?? '#ffff'}
                onChange={onBackgroundColorChange}
              />
              <Button onClick={() => setIsBgColorPickerVisible(false)} />
            </>
          )}
          <div style={{ marginTop: '15px' }}>Padding:</div>
          <div className={styles.flex__row3}>
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
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
            <label>Left&Right</label>
            <input type="checkbox" onChange={() => setIsPaddingLeftRight(true)} />
            <label>Top&Bottom</label>
            <input type="checkbox" onChange={() => setIsPaddingTopBottom(true)} />
          </div>
          <div style={{ marginTop: '15px' }}>Margin:</div>
          <div className={styles.flex__row3}>
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
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
            <label>Left&Right</label>
            <input type="checkbox" onChange={() => setIsMarginLeftRight(true)} />
            <label>Top&Bottom</label>
            <input type="checkbox" onChange={() => setIsMarginTopBottom(true)} />
          </div>
        </div>
      </div>
    </>
  );
};
