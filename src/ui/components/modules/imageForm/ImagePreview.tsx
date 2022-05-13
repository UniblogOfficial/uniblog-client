import React, { FC } from 'react';

import { TImageFile } from '../../../../common/types/instance';

import styles from './ImagePreview.module.scss';

type TImagePreviewProps = {
  imageFiles: Array<TImageFile>;
};

const ImagePreview: FC<TImagePreviewProps> = ({ imageFiles }) => {
  const mappedPreview = imageFiles.map(({ name, previewUrl, size }) => (
    <div key={name} className={styles['img-container']}>
      <img src={previewUrl} alt={name} />
    </div>
  ));
  return <> {mappedPreview} </>;
};

export default ImagePreview;
