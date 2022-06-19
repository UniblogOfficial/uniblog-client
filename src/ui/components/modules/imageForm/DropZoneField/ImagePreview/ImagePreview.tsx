import React, { FC, useState } from 'react';

import { TImageFile, TIncomingImage } from 'common/types/instance';
import { parseRawImage } from 'common/utils/ui';
import styles from 'ui/components/modules/imageForm/DropZoneField/DropZone.module.scss';

type TImagePreviewProps = {
  imageFiles: Array<TImageFile> | string;
};

const ImagePreview: FC<TImagePreviewProps> = ({ imageFiles }) => {
  const preview = () => {
    if (Array.isArray(imageFiles)) {
      return imageFiles.map(({ name, previewUrl, size }) => (
        <div key={name} className={styles['img-container']}>
          <img src={previewUrl} alt={name} />
        </div>
      ));
    }
    return (
      <div className={styles['img-container']}>
        <img src={imageFiles} alt="preview" />
      </div>
    );
  };
  return <> {preview()} </>;
};

export default ImagePreview;
