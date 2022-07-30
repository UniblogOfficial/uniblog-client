import React, { ChangeEvent, useCallback, useState } from 'react';

import {
  MLAllSavedImagesType,
  MLContentType,
  MLFieldSavedImages,
} from '../../../../../../../common/constants';
import { Checkbox } from '../../../../../../components/elements';
import AllSavedImages from '../../../../../../components/modules/allSavedImages/AllSavedImages';
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
import { Button, Input } from 'ui/components/elements';

type TMLCarouselEditorProps = {
  id: string;
  block: IMLDraftCarousel;
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
      const copyBlock = { ...block, images: [...block.images, imageFile.previewUrl] };
      dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: MLContentType.CAROUSEL }));
    },
    [dispatch, image],
  );

  const onDropZoneUpdateImage = useCallback(
    (imageFile: TImageFile, index: number) => {
      const newImages = block?.images.map((img, i) => {
        if (i === index) {
          return imageFile.previewUrl;
        }
        return img;
      });
      const copyBlock = { ...block, images: newImages };
      dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: MLContentType.CAROUSEL }));
    },
    [dispatch, image],
  );

  const onInputChange = (checked: boolean, value: 'dots' | 'arrows' | 'swipe') => {
    const copyBlock = { ...block };
    if (value === 'dots') {
      setDots(checked);
    }
    if (value === 'arrows') {
      setArrows(checked);
    }
    if (value === 'swipe') {
      setSwipe(checked);
    }
    copyBlock[value] = checked;
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: MLContentType.CAROUSEL }));
  };

  const onChangeHandlerInterval = (e: ChangeEvent<HTMLInputElement>) => {
    setInterval(+e.currentTarget.value);
  };

  const addInterval = () => {
    const copyBlock = { ...block, interval };
    dispatch(setMLDraftBlockContent({ content: copyBlock, id, type: MLContentType.CAROUSEL }));
  };

  const onClickHandlerDelete = (index: number) => {
    block?.images.map((el, i) => {
      if (i === index) {
        block?.images.splice(i, 1);
        const { images } = block;
        dispatch(setMLDraftBlockContent({ content: { images }, id, type: MLContentType.CAROUSEL }));
      }
    });
  };

  const fields = block.images.map(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (image, index) =>
      image && (
        <li className={styles.imageContainer}>
          <ImageField
            initialImage={image}
            onChange={imageFile => onDropZoneUpdateImage(imageFile, index)}
          />
          <Button className={styles.buttonDelete} onClick={() => onClickHandlerDelete(index)}>
            x
          </Button>
        </li>
      ),
  );

  return (
    <div className={styles.mlCarouselEditor}>
      <ul className={styles.images}>
        {fields}
        <div className={styles.buttonAdd}>
          <ImageField onChange={onDropZoneChange} />
        </div>
      </ul>
      <AllSavedImages
        id={id}
        imagesType={MLAllSavedImagesType.IMAGES_IMAGE}
        fieldName={MLFieldSavedImages.FIELD_IMAGES}
        contentType={MLContentType.CAROUSEL}
      />
      <div className={styles.controls}>
        <div className={styles.control}>
          <Checkbox name="dots" checked={dots} onChangeChecked={onInputChange} value="dots" />
          Dots
        </div>
        <div className={styles.control}>
          <Checkbox name="arrows" checked={arrows} onChangeChecked={onInputChange} value="arrows" />
          Arrows
        </div>
        <div className={styles.control}>
          <Checkbox name="swipe" checked={swipe} onChangeChecked={onInputChange} value="swipe" />
          Swipe
        </div>
        <Input
          className={styles.intervalInput}
          type="number"
          value={interval}
          onChange={onChangeHandlerInterval}
          onBlur={addInterval}
          placeholder=" interval"
        />
      </div>
    </div>
  );
};
