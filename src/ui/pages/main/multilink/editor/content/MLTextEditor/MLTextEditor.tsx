import React, { ChangeEvent, useEffect, useState } from 'react';

import { HexColorPicker, RgbaStringColorPicker } from 'react-colorful';

import { ID } from '../../../../../../../common/constants';

import styles from './MLTextEditor.module.scss';

import { setMLDraftBlockContent } from 'bll/reducers';
import { useAppDispatch, useDebounce, useThrottle } from 'common/hooks';
import { IMLDraftText } from 'common/types/instance';
import { Button, Icon, Select, Textarea } from 'ui/components/elements';

type TMLTextEditorProps = {
  order: number;
  block: IMLDraftText;
};

type AlignTextType = 'right' | 'left' | 'center' | 'justify';
const defaultColors: string[] = ['black', 'red', 'yellow', 'green', 'blue', 'pink'];
const fontSizeTexts: string[] = ['12', '14', '16', '18', '20', '22'];
const paddings: string[] = ['top', 'right', 'bottom', 'left'];
const margins: string[] = ['top', 'right', 'bottom', 'left'];
const marginArray = [0, 0, 0, 0];
const fontTexts = [
  'Arial, sans-serif',
  'Times, Times New Roman, serif',
  'Andale Mono, monospace',
  'Courier New, monospace',
  'Snell Roundhand, cursive',
  'Trattatello, fantasy',
];
const shadowTextDefault: [number, number, number, string][] = [[0, 0, 0, 'black']];

export const MLTextEditor = ({ order, block }: TMLTextEditorProps) => {
  const dispatch = useAppDispatch();
  const dispatchDebounced = useDebounce(dispatch, 200);
  const dispatchThrottled = useThrottle(dispatch, 200);
  const [text, setText] = useState(block.text ?? '');
  const [isTextColorPickerVisible, setIsTextColorPickerVisible] = useState<boolean>(false);
  const [isBgColorPickerVisible, setIsBgColorPickerVisible] = useState(false);
  const [isBgColorFontTextVisible, setIsBgColorFontTextVisible] = useState(false);
  const [isPaddingLeftRight, setIsPaddingLeftRight] = useState(false);
  const [isMarginLeftRight, setIsMarginLeftRight] = useState(false);
  const [isPaddingTopBottom, setIsPaddingTopBottom] = useState(false);
  const [isMarginTopBottom, setIsMarginTopBottom] = useState(false);

  useEffect(() => {
    setText(block.text ?? '');
  }, [block]);

  const newBlock = { ...block };

  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    newBlock.text = newText;
    dispatchThrottled(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
  };

  const onAlignChange = (align: AlignTextType) => {
    newBlock.align = align;
    dispatch(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
  };

  const onColorChange = (color: string) => {
    newBlock.color = color;
    dispatch(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
  };

  const onBackgroundColorChange = (backgroundColor: string) => {
    newBlock.background = backgroundColor;
    dispatch(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
  };

  const onTextSizeChange = (fontSize: string) => {
    newBlock.fontSize = +fontSize;
    dispatch(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
  };

  const onFontWeightChange = (fontWeight: number) => {
    newBlock.fontWeight = fontWeight;
    dispatch(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
  };

  const onItalicTextChange = (fontStyle: string) => {
    newBlock.fontStyle = fontStyle;
    dispatch(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
  };

  const onPaddingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const padding = e.currentTarget.value;
    const title = e.currentTarget.name;

    if (Array.isArray(newBlock.padding)) {
      if (newBlock.padding.length < 4) {
        newBlock.padding = [...newBlock.padding, ...newBlock.padding];
      }
      if (title === 'top') {
        if (isPaddingTopBottom) {
          newBlock.padding[0] = +padding;
          newBlock.padding[2] = +padding;
        }
        newBlock.padding[0] = +padding;
      }
      if (title === 'right') {
        if (isPaddingLeftRight) {
          newBlock.padding[1] = +padding;
          newBlock.padding[3] = +padding;
        }
        newBlock.padding[1] = +padding;
      }
      if (title === 'bottom') {
        if (isPaddingTopBottom) {
          newBlock.padding[0] = +padding;
          newBlock.padding[2] = +padding;
        }
        newBlock.padding[2] = +padding;
      }
      if (title === 'left') {
        if (isPaddingLeftRight) {
          newBlock.padding[1] = +padding;
          newBlock.padding[3] = +padding;
        }
        newBlock.padding[3] = +padding;
      }
    }

    dispatch(setMLDraftBlockContent({ content: block, order, field: 'textBlocks' }));
  };

  const onMarginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const margin = e.currentTarget.value;
    const title = e.currentTarget.name;

    newBlock.margin = marginArray;

    if (title === 'top') {
      if (isMarginTopBottom) {
        newBlock.margin[0] = +margin;
        newBlock.margin[2] = +margin;
      }
      newBlock.margin[0] = +margin;
    }
    if (title === 'right') {
      if (isMarginLeftRight) {
        newBlock.margin[1] = +margin;
        newBlock.margin[3] = +margin;
      }
      newBlock.margin[1] = +margin;
    }
    if (title === 'bottom') {
      if (isMarginTopBottom) {
        newBlock.margin[0] = +margin;
        newBlock.margin[2] = +margin;
      }
      newBlock.margin[2] = +margin;
      console.log('margin', +margin);
    }
    if (title === 'left') {
      if (isMarginLeftRight) {
        newBlock.margin[1] = +margin;
        newBlock.margin[3] = +margin;
      }
      newBlock.margin[3] = +margin;
    }

    dispatch(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
  };

  const onLineHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    newBlock.lineHeight = +e.currentTarget.value;
    dispatch(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
  };

  const onFontVariantChange = (fontVariant: string) => {
    newBlock.fontVariant = fontVariant;
    dispatch(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
  };

  const onFontTextsChange = (font: string) => {
    newBlock.fontFamily = font;
    dispatch(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
  };

  const onLitterSpacingChange = (e: ChangeEvent<HTMLInputElement>) => {
    newBlock.letterSpacing = +e.currentTarget.value;
    dispatch(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
  };

  const onTextShadowChange = (e: ChangeEvent<HTMLInputElement>) => {
    const shadow = e.currentTarget.value;
    const shadowName = e.currentTarget.name;
    if (Array.isArray(newBlock.textShadow)) {
      if (shadowName === 'offset-x') {
        newBlock.textShadow[0][0] = +shadow;
      } else if (shadowName === 'offset-y') {
        newBlock.textShadow[0][1] = +shadow;
      } else if (shadowName === 'blur-radius') {
        newBlock.textShadow[0][2] = +shadow;
      }
    } else {
      if (shadowName === 'offset-x') {
        shadowTextDefault[0][0] = +shadow;
      } else if (shadowName === 'offset-y') {
        shadowTextDefault[0][1] = +shadow;
      } else if (shadowName === 'blur-radius') {
        shadowTextDefault[0][2] = +shadow;
      }
      newBlock.textShadow = shadowTextDefault;
    }
    dispatch(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
  };

  const onBackgroundTextShadowChange = (backgroundColor: string) => {
    if (Array.isArray(newBlock.textShadow)) {
      newBlock.textShadow[0][3] = backgroundColor;
    } else {
      shadowTextDefault[0][3] = backgroundColor;
      newBlock.textShadow = shadowTextDefault;
    }
    dispatch(setMLDraftBlockContent({ content: newBlock, order, field: 'textBlocks' }));
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
            onClick={() => onFontWeightChange(block?.fontWeight === 400 ? 700 : 400)}
          />
          <Icon
            name="text-italic"
            containerClassName="draw_text"
            onClick={() => onItalicTextChange(block.fontStyle === 'italic' ? 'normal' : 'italic')}
          />
        </div>
        <div className={styles.select}>
          <label>
            Size:
            <Select options={fontSizeTexts} onChangeOption={onTextSizeChange} />
          </label>
          <label>
            Font Text:
            <Select options={fontTexts} onChangeOption={onFontTextsChange} />
          </label>
        </div>
        <div style={{ marginTop: '10px' }}>
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
            <>
              <RgbaStringColorPicker color={block.color} onChange={onColorChange} />
              <Button className={styles.button} onClick={() => setIsTextColorPickerVisible(false)}>
                Ok
              </Button>
            </>
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
                color={block.background ?? '#ffff'}
                onChange={onBackgroundColorChange}
              />
              <Button className={styles.button} onClick={() => setIsBgColorPickerVisible(false)}>
                Ok
              </Button>
            </>
          )}
          <div>
            Padding:
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '15px',
                justifyContent: 'space-around',
              }}>
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
          <div>
            {' '}
            Margin:
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '15px',
                justifyContent: 'space-around',
              }}>
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: '15px',
              justifyContent: 'space-around',
            }}>
            <label>
              Line Height:
              <input
                type="range"
                name="Line Height"
                min={1}
                max={2.5}
                step={0.1}
                value={block.lineHeight ?? 1}
                onChange={onLineHeightChange}
              />
            </label>
            <label>
              Letter Spacing:
              <input
                type="range"
                name="Letter Spacing"
                min={-2}
                max={10}
                step={0.1}
                value={block.letterSpacing ?? 0.3}
                onChange={onLitterSpacingChange}
              />
            </label>
            <label>
              Variant
              <input
                type="checkbox"
                onChange={() =>
                  onFontVariantChange(block.fontVariant === 'small-caps' ? 'normal' : 'small-caps')
                }
              />
            </label>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '15px',
            width: '150px',
            justifyContent: 'center',
          }}>
          Font Shadow:
          <label style={{ marginTop: '5px' }}>
            Left or Right
            <input
              type="range"
              name="offset-x"
              min={-5}
              max={10}
              step={1}
              value={Array.isArray(block?.textShadow) ? block.textShadow[0][0] : 0}
              onChange={onTextShadowChange}
            />
          </label>
          <label>
            Top or Bottom
            <input
              type="range"
              name="offset-y"
              min={-5}
              max={10}
              step={1}
              value={Array.isArray(block?.textShadow) ? block.textShadow[0][1] : 0}
              onChange={onTextShadowChange}
            />
          </label>
          <label>
            Blur radius
            <input
              type="range"
              name="blur-radius"
              min={0}
              max={10}
              step={1}
              value={Array.isArray(block?.textShadow) ? block.textShadow[0][2] : 0}
              onChange={onTextShadowChange}
            />
          </label>
        </div>
        <div>
          <input
            type="button"
            className={styles.circleGradient}
            onClick={() => setIsBgColorFontTextVisible(true)}
          />

          {isBgColorFontTextVisible && (
            <>
              <HexColorPicker
                color={Array.isArray(block?.textShadow) ? block.textShadow[0][3] : 'black'}
                onChange={onBackgroundTextShadowChange}
              />
              <Button className={styles.button} onClick={() => setIsBgColorFontTextVisible(false)}>
                Ok
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
