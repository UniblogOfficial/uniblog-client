import React from 'react';

import { MLAllSavedImagesType } from '../../../../common/constants';
import { useAppSelector } from '../../../../common/hooks';

import s from './ImageBackground.module.scss';

type ImageBGType = {
  imagesType: MLAllSavedImagesType;
  setImageHandler: (url: string) => void;
};
const ImageBackground = ({ setImageHandler, imagesType }: ImageBGType) => {
  const images = useAppSelector(state =>
    state.mlDraft.savedImages.filter(img => img.type === imagesType),
  );
  return (
    <div className={s.imgContainer}>
      {images.map(image => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <img
          onClick={() => setImageHandler(image.url)}
          key={image.id}
          className={s.img}
          src={image.thumbUrl}
          alt="#"
        />
      ))}
    </div>
  );
};

export default ImageBackground;
