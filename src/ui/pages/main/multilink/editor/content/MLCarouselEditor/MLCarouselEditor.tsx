import React, { ChangeEvent, useCallback, useState } from 'react';

import { MLContentType } from '../../../../../../../common/constants';
import { ImageField } from '../../../../../../components/modules/imageField/ImageField';

import styles from './MLCarouselEditor.module.scss';

import { setMLDraftBlockContent } from 'bll/reducers';
import { useAppDispatch } from 'common/hooks';
import {
  IMLDraftCarousel,
  Nullable,
  TImageFile,
  TMLImageContentCarousel,
} from 'common/types/instance';
import { Button } from 'ui/components/elements';

type TMLCarouselEditorProps = {
  id: string;
  block: Nullable<IMLDraftCarousel>;
  image: Nullable<TMLImageContentCarousel<TImageFile>>;
};

export const MLCarouselEditor = ({ id, block, image }: TMLCarouselEditorProps) => {
  const [dots, setDots] = useState(block?.dots);
  const [arrows, setArrows] = useState(block?.arrows);
  const [swipe, setSwipe] = useState(block?.swipe);
  const [interval, setInterval] = useState(block?.interval);

  const dispatch = useAppDispatch();

  const onDropZoneChange = useCallback(
    (imageFile: TImageFile) => {
      // @ts-ignore
      const copyBlock = { ...block, images: [...block.images, imageFile.previewUrl] };
      dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: MLContentType.CAROUSEL }));
    },
    [dispatch, image],
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const copyBlock = { ...block };
    if (e.currentTarget.name === 'dots') {
      setDots(e.currentTarget.checked);
      copyBlock.dots = e.currentTarget.checked;
    }
    if (e.currentTarget.name === 'arrows') {
      setArrows(e.currentTarget.checked);
      copyBlock.arrows = e.currentTarget.checked;
    }
    if (e.currentTarget.name === 'swipe') {
      setSwipe(e.currentTarget.checked);
      copyBlock.swipe = e.currentTarget.checked;
    }
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: MLContentType.CAROUSEL }));
  };

  const onChangeHandlerInterval = (e: ChangeEvent<HTMLInputElement>) => {
    setInterval(+e.currentTarget.value);
  };

  const onBlurHandler = () => {
    const copyBlock = { ...block, interval };
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: MLContentType.CAROUSEL }));
  };

  return (
    <div className={styles.mlCarouselEditor}>
      <div className={styles.imageField}>
        <ImageField onChange={onDropZoneChange} />
      </div>
      <div className={styles.buttonsGroup}>
        <Button className={styles.button}>Add</Button>
        <Button className={styles.button}>Delete</Button>
      </div>

      <div
        className={styles.controls}
        style={{ display: 'flex', padding: '10px', justifyContent: 'space-around' }}>
        <div className={styles.control}>
          <input type="checkbox" name="dots" checked={dots} onChange={onInputChange} />
          Dots
        </div>
        <div className={styles.control}>
          <input type="checkbox" name="arrows" checked={arrows} onChange={onInputChange} />
          Arrows
        </div>
        <div className={styles.control}>
          <input type="checkbox" name="swipe" checked={swipe} onChange={onInputChange} />
          Swipe
        </div>
        <input
          className={styles.intervalInput}
          type="number"
          value={interval}
          onChange={onChangeHandlerInterval}
          onBlur={onBlurHandler}
          placeholder=" interval"
        />
      </div>
    </div>
  );
};
