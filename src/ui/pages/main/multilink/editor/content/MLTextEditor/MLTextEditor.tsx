import React, { ChangeEvent, useEffect, useState } from 'react';

import { HexColorPicker, RgbaStringColorPicker } from 'react-colorful';

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
const fontTexts = [
  'Arial, sans-serif',
  'Times, Times New Roman, serif',
  'Andale Mono, monospace',
  'Courier New, monospace',
  'Snell Roundhand, cursive',
  'Trattatello, fantasy',
];
const shadowTextDefault = ['0', '0', '0', '#000'];

export const MLTextEditor = ({ order, block }: TMLTextEditorProps) => {
  const dispatch = useAppDispatch();
  const dispatchDebounced = useDebounce(dispatch, 200);
  const dispatchThrottled = useThrottle(dispatch, 200);
  const [text, setText] = useState(block.text ?? '');
  const [isTextColorPickerVisible, setIsTextColorPickerVisible] = useState<boolean>(false);
  const [isBgColorFontTextVisible, setIsBgColorFontTextVisible] = useState(false);

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
    block.lineHeight = +e.currentTarget.value;
    dispatch(setMLDraftBlockContent(block, order, 'textBlocks'));
  };

  const onFontVariantChange = (fontVariant: string) => {
    block.fontVariant = fontVariant;
    dispatch(setMLDraftBlockContent(block, order, 'textBlocks'));
  };

  const onFontTextsChange = (font: string) => {
    block.fontFamily = font;
    dispatch(setMLDraftBlockContent(block, order, 'textBlocks'));
  };

  const onLetterSpacingChange = (e: ChangeEvent<HTMLInputElement>) => {
    block.letterSpacing = +e.currentTarget.value;
    dispatch(setMLDraftBlockContent(block, order, 'textBlocks'));
  };

  const onTextShadowChange = (e: ChangeEvent<HTMLInputElement>) => {
    const shadow = e.currentTarget.value;
    const shadowName = e.currentTarget.name;
    const currentShadow = block.textShadow?.length
      ? block.textShadow[0].split(' ')
      : shadowTextDefault;
    if (block.textShadow?.length) {
      console.log(block.textShadow);
    }
    if (shadowName === 'offset-x') {
      currentShadow[0] = `${shadow}px`;
    } else if (shadowName === 'offset-y') {
      currentShadow[1] = `${shadow}px`;
    } else if (shadowName === 'blur-radius') {
      currentShadow[2] = `${shadow}px`;
    }
    block.textShadow = [currentShadow.join(' ')];
    dispatch(setMLDraftBlockContent(block, order, 'textBlocks'));
  };

  const onBackgroundTextShadowChange = (backgroundColor: string) => {
    const currentShadow = block.textShadow?.length
      ? block.textShadow[0].split(' ')
      : shadowTextDefault;
    currentShadow[3] = backgroundColor;
    block.textShadow = [currentShadow.join(' ')];
    dispatch(setMLDraftBlockContent(block, order, 'textBlocks'));
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
              className="circle"
              style={{ backgroundColor: color }}
              onClick={() => onColorChange(color)}
            />
          ))}
          <input
            type="button"
            className="circleGradient"
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
        <div className={styles.flex_row2}>
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
              onChange={onLetterSpacingChange}
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
      <div className={styles.font_shadow_select}>
        Font Shadow:
        <label style={{ marginTop: '5px' }}>
          Left or Right
          <input
            type="range"
            name="offset-x"
            min={-5}
            max={10}
            step={1}
            value={block?.textShadow?.length ? block.textShadow[1] : 0}
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
            value={block?.textShadow?.length ? block.textShadow[1] : 0}
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
            value={block?.textShadow?.length ? block.textShadow[2] : 0}
            onChange={onTextShadowChange}
          />
        </label>
      </div>
      <div>
        <input
          type="button"
          className="circleGradient"
          onClick={() => setIsBgColorFontTextVisible(true)}
        />
        {isBgColorFontTextVisible && (
          <>
            <HexColorPicker
              color={Array.isArray(block?.textShadow) ? block.textShadow[3] : 'black'}
              onChange={onBackgroundTextShadowChange}
            />
            <Button className={styles.button} onClick={() => setIsBgColorFontTextVisible(false)}>
              Ok
            </Button>
          </>
        )}
      </div>
    </>
  );
};
