import React, { FC } from 'react';

import { TImageFile } from '../MLContent';

type TImagePreviewProps = {
  imageFiles: Array<TImageFile>;
};

const ImagePreview: FC<TImagePreviewProps> = ({ imageFiles }) => {
  const mappedPreview = imageFiles.map(({ name, preview, size }) => (
    <div key={name}>
      <div>
        <img src={preview} alt={name} />
      </div>
      <div>
        {name} - {(size / 1024000).toFixed(2)}MB
      </div>
    </div>
  ));
  return <> {mappedPreview} </>;
};

export default ImagePreview;
