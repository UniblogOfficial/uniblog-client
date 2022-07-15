import React, { ChangeEvent, useEffect, useState } from 'react';

import { HexColorPicker, RgbaStringColorPicker } from 'react-colorful';

import styles from './MLTextEditor.module.scss';

import { setMLDraftBlockContent } from 'bll/reducers';
import { useAppDispatch, useDebounce, useThrottle } from 'common/hooks';
import { MLDraftText } from 'common/types/instance';
import { Button, Icon, Select, Textarea, Toggle } from 'ui/components/elements';

type TMLTextEditorProps = {
  id: string;
  block: MLDraftText;
};

type AlignTextType = 'right' | 'left' | 'center' | 'justify';
const defaultColors: string[] = ['black', 'red', 'yellow', 'green', 'blue', 'pink'];
const fontSizeTexts: string[] = ['12', '14', '16', '18', '20', '22', '24', '26', '28', '30'];
const fontTexts: string[] = [
  'Inter',
  'Alegreya',
  'B612',
  'Caveat',
  'Mulish',
  'Titillium Web',
  'Varela',
  'Vollkorn',
  'IBM Plex Sans',
  'Crimson Text',
  'Cairo',
  'BioRhyme',
  'Karla',
  'Lora',
  'Frank Ruhl Libre',
  'Playfair Display',
  'Archivo',
  'Spectral',
  'Fjalla One',
  'Roboto',
  'Montserrat',
  'Rubik',
  'Source Sans Pro',
  'Cardo',
  'Cormorant',
];
const shadowTextDefault = ['0', '0', '0', '#000'];

export const MLTextEditor = ({ id, block }: TMLTextEditorProps) => {
  const dispatch = useAppDispatch();
  const dispatchThrottled = useThrottle(dispatch, 200);
  const [text, setText] = useState(block.text ?? '');
  const [isTextColorPickerVisible, setIsTextColorPickerVisible] = useState<boolean>(false);
  const [isBgColorFontTextVisible, setIsBgColorFontTextVisible] = useState(false);

  useEffect(() => {
    setText(block.text ?? '');
  }, [block]);

  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    dispatchThrottled(setMLDraftBlockContent({ content: { text: newText }, id, type: block.type }));
  };

  const onAlignChange = (align: AlignTextType) => {
    const copyBlock = new MLDraftText(block);
    copyBlock.textAlign = align;
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: block.type }));
  };

  const onColorChange = (color: string) => {
    const copyBlock = new MLDraftText(block);
    copyBlock.color = color;
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: block.type }));
  };

  const onTextSizeChange = (fontSize: string) => {
    const copyBlock = new MLDraftText(block);
    copyBlock.fontSize = +fontSize;
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: block.type }));
  };

  const onFontWeightChange = (fontWeight: number) => {
    const copyBlock = new MLDraftText(block);
    copyBlock.fontWeight = fontWeight;
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: block.type }));
  };

  const onItalicTextChange = (fontStyle: string) => {
    const copyBlock = new MLDraftText(block);
    copyBlock.fontStyle = fontStyle;
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: block.type }));
  };

  const onLineHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const copyBlock = new MLDraftText(block);
    copyBlock.lineHeight = +e.currentTarget.value;
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: block.type }));
  };

  const onFontVariantChange = (fontVariant: string) => {
    const copyBlock = new MLDraftText(block);
    copyBlock.fontVariant = fontVariant;
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: block.type }));
  };

  const onFontTextsChange = (font: string) => {
    dispatch(
      setMLDraftBlockContent({
        content: { fontFamily: `${font}` },
        id,
        type: block.type,
      }),
    );
  };

  const onLetterSpacingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const copyBlock = new MLDraftText(block);
    copyBlock.letterSpacing = +e.currentTarget.value;
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: block.type }));
  };

  const onTextShadowChange = (e: ChangeEvent<HTMLInputElement>) => {
    const copyBlock = new MLDraftText(block);
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
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: block.type }));
  };

  const onBackgroundTextShadowChange = (backgroundColor: string) => {
    const copyBlock = new MLDraftText(block);
    const currentShadow = copyBlock.textShadow?.length
      ? copyBlock.textShadow[0].split(' ')
      : shadowTextDefault;
    currentShadow[3] = backgroundColor;
    copyBlock.textShadow = [currentShadow.join(' ')];
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: block.type }));
  };

  return (
    <>
      <div>
        <Textarea
          data-value={id}
          value={text}
          onChange={onTextareaChange}
          maxLength={1023}
          className="textarea"
        />
        Align & Bold:
        <div className={styles.flex_row}>
          <Toggle
            options={['left', 'center', 'right', 'justify']}
            value={block.textAlign ?? 'left'}
            className={styles['toggle']}
            frameClassName={styles['toggle-frame__layout']}
            onChangeOption={onAlignChange}
            titles={[
              <Icon key={1} name="text-align-left" containerClassName={styles['text-align']} />,
              <Icon key={2} name="text-align-center" containerClassName={styles['text-align']} />,
              <Icon key={3} name="text-align-right" containerClassName={styles['text-align']} />,
              <Icon key={4} name="text-align-justify" containerClassName={styles['text-align']} />,
            ]}
          />

          <Icon
            name="text-bolt"
            containerClassName={styles['text-draw']}
            onClick={() => onFontWeightChange(block?.fontWeight === 400 ? 700 : 400)}
          />
          <Icon
            name="text-italic"
            containerClassName={styles['text-draw']}
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
            <Select
              options={fontTexts}
              onChangeOption={onFontTextsChange}
              selectedValue={block.fontFamily ?? 'Inter'}
            />
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
