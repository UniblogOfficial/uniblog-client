import React, { ChangeEvent, useState } from 'react';

import { HexColorPicker } from 'react-colorful';

import { setMLDraftBlockContent } from '../../../../../../../bll/reducers';
import { useAppDispatch } from '../../../../../../../common/hooks';
import { IMLDraftContentText, Nullable } from '../../../../../../../common/types/instance';
import { Radio, Textarea } from '../../../../../../components/elements';

import styles from './MLTextarea.module.scss';

type TMLTextareaProps = {
  order: number;
  block: Nullable<IMLDraftContentText>;
};

type AlignTextType = 'right' | 'left' | 'center' | 'justify';
const alignText: Array<AlignTextType> = ['right', 'left', 'center', 'justify'];
const fontSizeText: string[] = ['12', '14', '16', '18', '20', '22'];
const fontWeightText: string[] = ['normal', 'bold', '900'];

export const MLTextarea = ({ order, block }: TMLTextareaProps) => {
  const dispatch = useAppDispatch();
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

  const onColorChange = (color: string) => {
    if (!block) {
      return;
    }
    block.color = color;
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
    <>
      <div>
        <Textarea
          data-value={order}
          value={block.text ?? ''}
          onChange={onTextareaChange}
          maxLength={1023}
          className="textarea"
        />
        <div className={styles.flex__row3}>
          <span className={styles.alignText}>
            Align text:
            <div className={styles.radio}>
              <Radio
                options={alignText}
                onChangeOption={onAlignChange}
                value={block.align}
                className="planner__radio"
              />
            </div>
          </span>
          <span className={styles.alignText}>
            Weight text:
            <div className={styles.radio}>
              <Radio
                options={fontWeightText}
                onChangeOption={onFontWeightChange}
                value={String(block.fontWeight)}
                className="planner__radio"
              />
            </div>
          </span>
          <span className={styles.alignText}>
            Size text:
            <div className={styles.radio}>
              <Radio
                options={fontSizeText}
                onChangeOption={onTextSizeChange}
                value={String(block.fontSize)}
                className="planner__radio"
              />
            </div>
          </span>
        </div>

        <div className={styles.colorText}>
          Color text:
          <div className={styles.color}>
            <HexColorPicker color={block.color} onChange={onColorChange} />
          </div>
        </div>
      </div>
    </>
  );
};
