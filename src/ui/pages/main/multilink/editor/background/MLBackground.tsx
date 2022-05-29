/* eslint-disable dot-notation */
import React, { CSSProperties, FC, useCallback, useMemo, MouseEvent, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { setMLDraftBackground, setMLDraftBackgroundImage } from '../../../../../../bll/reducers';
import { ID } from '../../../../../../common/constants';
import { useAppDispatch } from '../../../../../../common/hooks';
import { TImageFile } from '../../../../../../common/types/instance';
import { Button } from '../../../../../components/elements';
import { DropZoneField } from '../../../../../components/modules/imageForm/DropZoneField';

import styles from './MLBackground.module.scss';

type TMLBackgroundProps = {};

export const MLBackground = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);
  const [imageFiles, setImageFiles] = useState<Array<TImageFile>>([]);

  const onSnippetClick = useCallback(
    (e: MouseEvent<HTMLInputElement>) => {
      dispatch(setMLDraftBackground(e.currentTarget.style.background));
    },
    [dispatch],
  );

  const onImageZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      dispatch(setMLDraftBackgroundImage(imageFile));
      setImageFiles([imageFile]);
    },
    [dispatch],
  );

  const snippets = useMemo(
    () =>
      bgs.map((props, i) => (
        <li key={ID[i]} className={`${styles['bg']}`}>
          <input onClick={onSnippetClick} style={props} type="button" />
          <div />
        </li>
      )),
    [onSnippetClick],
  );

  return (
    <>
      <ul className="grid bg-menu-grid">
        <li className={`${styles['dropbox']}`}>
          <DropZoneField onChange={onImageZoneChange} touched={false} />
        </li>
        {snippets}
      </ul>
    </>
  );
};

const bgs: CSSProperties[] = [
  {
    background: '#fff',
  },
  {
    background: 'linear-gradient(90deg, #E1EEC3 0%, #F05053 100%)',
  },
  {
    background: 'linear-gradient(180deg, #76B852 0%, #8DC26F 100%)',
  },
  {
    background: 'linear-gradient(135deg, #1C92D2 0%, #F2FCFE 100%)',
  },
  {
    background: 'linear-gradient(180deg, #4E54C8 0%, #8F94FB 100%)',
  },
  {
    background: 'linear-gradient(180deg, #FBD3E9 0%, #BB377D 100%)',
  },
  {
    background: 'linear-gradient(180deg, #e8f71f 0%, #8F94FB 100%)',
  },
  {
    background: 'linear-gradient(180deg, #f71f1f 0%, #8F94FB 100%)',
  },
  {
    background: 'linear-gradient(180deg, #f71fec 0%, #8F94FB 100%)',
  },
  {
    background:
      'url(https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
  },
  {
    background:
      'url(https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
  },
  {
    background:
      'url(https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
  },
  {
    background:
      'url(https://images.pexels.com/photos/459277/pexels-photo-459277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
  },
  {
    background:
      'url(https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
  },
  {
    background:
      'url(https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
  },
];
