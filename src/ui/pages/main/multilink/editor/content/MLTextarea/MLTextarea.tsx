import React, { ChangeEvent, useState } from 'react';

import { HexColorPicker } from 'react-colorful';

import { setMLDraftBlockContent } from '../../../../../../../bll/reducers';
import { useAppDispatch } from '../../../../../../../common/hooks';
import { IMLDraftContentText, Nullable } from '../../../../../../../common/types/instance';
import { Icon, Textarea } from '../../../../../../components/elements';
import { Select } from '../../../../../../components/elements/select/Select';

import styles from './MLTextarea.module.scss';

type TMLTextareaProps = {
  order: number;
  block: Nullable<IMLDraftContentText>;
};

type AlignTextType = 'right' | 'left' | 'center' | 'justify';
const colorType: string[] = ['black', 'red', 'yellow', 'green', 'blue', 'pink'];
const fontSizeText: string[] = ['12', '14', '16', '18', '20', '22'];

export const MLTextarea = ({ order, block }: TMLTextareaProps) => {
  const dispatch = useAppDispatch();
  const [color, setColor] = useState<boolean>(false);
  const [backgroundColors, setBackgroundColors] = useState<boolean>(false);
  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (!block) {
      return;
    }
    block.text = text;
    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  };

  const onAlignChange = (align: AlignTextType) => {
    if (!block) {
      return;
    }
    block.align = align;
    dispatch(setMLDraftBlockContent(block, order, 'textSet'));
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
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
  if (!block) return null;

  return (
    <div>
      <div>
        <Textarea
          data-value={order}
          value={block.text ?? ''}
          onChange={onTextareaChange}
          maxLength={1023}
          className="textarea"
        />
        Align & Bolt:
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
          {colorType.map((m, index) => (
            // eslint-disable-next-line react/jsx-key
            <input
              type="button"
              className={styles.circle}
              style={{ backgroundColor: m }}
              onClick={() => onColorChange(m)}
            />
          ))}
          <input type="button" className={styles.circleGradient} onClick={() => setColor(true)} />
          {color && (
            <HexColorPicker
              color={block.color}
              onChange={onColorChange}
              onBlur={() => setColor(false)}
            />
          )}
        </div>
        <div style={{ paddingTop: '15px' }}>
          Background:
          {colorType.map((m, index) => (
            // eslint-disable-next-line react/jsx-key
            <input
              type="button"
              className={styles.circle}
              style={{ backgroundColor: m }}
              onClick={() => onBackgroundColorChange(m)}
            />
          ))}
          <input
            type="button"
            className={styles.circleGradient}
            onClick={() => setBackgroundColors(true)}
          />
          {backgroundColors && (
            <HexColorPicker
              color={block.background}
              onChange={onBackgroundColorChange}
              onBlur={() => setBackgroundColors(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
