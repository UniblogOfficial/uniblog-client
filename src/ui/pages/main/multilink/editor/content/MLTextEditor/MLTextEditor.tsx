import React, { ChangeEvent, useEffect, useState } from 'react';

import { RgbaStringColorPicker } from 'react-colorful';

import styles from './MLTextEditor.module.scss';

import { setMLDraftBlockContent } from 'bll/reducers';
import { useAppDispatch, useDebounce, useThrottle } from 'common/hooks';
import { IMLDraftContentText } from 'common/types/instance';
import { Icon, Select, Textarea } from 'ui/components/elements';

type TMLTextEditorProps = {
  order: number;
  block: IMLDraftContentText;
};

type AlignTextType = 'right' | 'left' | 'center' | 'justify';
const defaultColors: string[] = ['black', 'red', 'yellow', 'green', 'blue', 'pink'];
const fontSizeText: string[] = ['12', '14', '16', '18', '20', '22'];

export const MLTextEditor = ({ order, block }: TMLTextEditorProps) => {
  const dispatch = useAppDispatch();
  const dispatchDebounced = useDebounce(dispatch, 200);
  const dispatchThrottled = useThrottle(dispatch, 200);
  const [text, setText] = useState(block.text ?? '');
  const [isTextColorPickerVisible, setIsTextColorPickerVisible] = useState<boolean>(false);
  const [isBgColorPickerVisible, setisBgColorPickerVisible] = useState(false);

  useEffect(() => {
    setText(block.text ?? '');
  }, [block]);

  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    block.text = newText;
    dispatchThrottled(setMLDraftBlockContent(block, order, 'textSet'));
  };

  const onAlignChange = (align: AlignTextType) => {
    block.align = align;
    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  };

  const onColorChange = (color: string) => {
    block.color = color;
    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  };

  const onBackgroundColorChange = (backgroundColor: string) => {
    block.background = backgroundColor;
    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  };

  const onTextSizeChange = (fontSize: string) => {
    block.fontSize = +fontSize;
    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  };
  const onFontWeightChange = (fontWeight: string) => {
    block.fontWeight = fontWeight;
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
          <Select options={fontSizeText} onChangeOption={onTextSizeChange} />
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
              color={block.color}
              onChange={onColorChange}
              onBlur={() => setIsTextColorPickerVisible(false)}
            />
          )}
        </div>
        <div style={{ paddingTop: '15px' }}>
          Background:
          {defaultColors.map((color, index) => (
            // eslint-disable-next-line react/jsx-key
            <input
              type="button"
              className={styles.circle}
              style={{ backgroundColor: color }}
              onClick={() => onBackgroundColorChange(color)}
            />
          ))}
          <input
            type="button"
            className={styles.circleGradient}
            onClick={() => setisBgColorPickerVisible(true)}
          />
          {isBgColorPickerVisible && (
            <RgbaStringColorPicker
              color={block.background ?? '#ffff'}
              onChange={onBackgroundColorChange}
              onBlur={() => setisBgColorPickerVisible(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};
