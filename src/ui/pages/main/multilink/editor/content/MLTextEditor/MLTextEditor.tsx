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

  const copyBlock = block && { ...block };

  useEffect(() => {
    setText(block.text ?? '');
  }, [block]);

  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    copyBlock.text = newText;
    dispatchThrottled(setMLDraftBlockContent({ content: copyBlock, order }));
  };

  const onAlignChange = (align: AlignTextType) => {
    copyBlock.align = align;
    dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
  };

  const onColorChange = (color: string) => {
    copyBlock.color = color;
    dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
  };

  const onTextSizeChange = (fontSize: string) => {
    copyBlock.fontSize = +fontSize;
    dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
  };

  const onFontWeightChange = (fontWeight: number) => {
    copyBlock.fontWeight = fontWeight;
    dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
  };

  const onItalicTextChange = (fontStyle: string) => {
    copyBlock.fontStyle = fontStyle;
    dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
  };

  const onLineHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    copyBlock.lineHeight = +e.currentTarget.value;
    dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
  };

  const onFontVariantChange = (fontVariant: string) => {
    copyBlock.fontVariant = fontVariant;
    dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
  };

  const onFontTextsChange = (font: string) => {
    copyBlock.fontFamily = font;
    dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
  };

  const onLetterSpacingChange = (e: ChangeEvent<HTMLInputElement>) => {
    copyBlock.letterSpacing = +e.currentTarget.value;
    dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
  };

  const onTextShadowChange = (e: ChangeEvent<HTMLInputElement>) => {
    const shadow = e.currentTarget.value;
    const shadowName = e.currentTarget.name;
    const currentShadow = copyBlock.textShadow?.length
      ? copyBlock.textShadow[0].split(' ')
      : shadowTextDefault;
    if (copyBlock.textShadow?.length) {
      console.log(copyBlock.textShadow);
    }
    if (shadowName === 'offset-x') {
      currentShadow[0] = `${shadow}px`;
    } else if (shadowName === 'offset-y') {
      currentShadow[1] = `${shadow}px`;
    } else if (shadowName === 'blur-radius') {
      currentShadow[2] = `${shadow}px`;
    }
    copyBlock.textShadow = [currentShadow.join(' ')];
    dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
  };

  const onBackgroundTextShadowChange = (backgroundColor: string) => {
    const currentShadow = copyBlock.textShadow?.length
      ? copyBlock.textShadow[0].split(' ')
      : shadowTextDefault;
    currentShadow[3] = backgroundColor;
    copyBlock.textShadow = [currentShadow.join(' ')];
    dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
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
        <div className={styles.flex_row}>
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
