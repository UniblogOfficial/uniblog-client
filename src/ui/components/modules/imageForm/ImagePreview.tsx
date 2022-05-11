import React, { FC } from 'react';

import { TImageFile } from '../../../../common/types/instance';

type TImagePreviewProps = {
  imageFiles: Array<TImageFile>;
};

const ImagePreview: FC<TImagePreviewProps> = ({ imageFiles }) => {
  const mappedPreview = imageFiles.map(({ name, previewUrl, size }) => (
    <div key={name}>
      <div>
        <img src={previewUrl} alt={name} />
      </div>
    </div>
  ));
  return <> {mappedPreview} </>;
};

export default ImagePreview;
