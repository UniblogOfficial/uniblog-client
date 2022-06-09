import React, { FC, DragEvent, useState, useCallback } from 'react';

import DropZone, { DropEvent } from 'react-dropzone';
import { string } from 'yup';

import ShowError from './FormErrorRepresenter';
import { ImagePlaceholder } from './ImagePlaceholder';
import ImagePreview from './ImagePreview';

import { TImageFile, TIncomingImage } from 'common/types/instance';

type TDropZoneFieldProps = {
  onChange: (imageFile: TImageFile, id?: number) => void;
  initialImage?: string;
  // error?: string;
  touched?: boolean;
  id?: number;
};

export const DropZoneField: FC<TDropZoneFieldProps> = ({
  initialImage,
  onChange,
  // error,
  touched,
  id,
}) => {
  const [image, setImage] = useState<TImageFile[]>([]);
  const [error, setError] = useState<string>('');

  const onDrop = useCallback(
    (file: File[]) => {
      const fileData: TImageFile = {
        file: file[0],
        name: file[0].name,
        previewUrl: URL.createObjectURL(file[0]),
        size: file[0].size,
      };
      if (fileData.size <= 1024 * 1024) {
        setImage([fileData]);
        fileData && onChange(fileData, id);
        setError('');
      } else setError('Файл больше 1 мб');
    },
    [onChange, id],
  );

  return (
    <>
      <div className="dropbox">
        {image.length > 0 && <ImagePreview imageFiles={image} />}
        {image.length === 0 && initialImage && <ImagePreview imageFiles={initialImage} />}
        <ImagePlaceholder isFilled={image.length > 0} onDrop={onDrop} />
      </div>
      {error && <p className="field__error">{error}</p>}
    </>
  );
};
