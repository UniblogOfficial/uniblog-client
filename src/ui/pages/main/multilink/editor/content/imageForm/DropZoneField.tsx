import React, { FC, DragEvent, useState, useCallback } from 'react';

import DropZone, { DropEvent } from 'react-dropzone';

import { TImageFile } from '../MLContent';

import ShowError from './FormErrorRepresenter';
import { ImagePlaceholder } from './ImagePlaceholder';
import ImagePreview from './ImagePreview';

type TDropZoneFieldProps = {
  onChange: (imageFile: TImageFile, id?: number) => void;
  imageFiles: Array<TImageFile>;
  error?: string;
  touched: boolean;
  id?: number;
};

export const DropZoneField: FC<TDropZoneFieldProps> = ({
  imageFiles,
  onChange,
  error,
  touched,
  id,
}) => {
  const [image, setImage] = useState<TImageFile[]>([]);

  const onDrop = useCallback(
    (file: File[]) => {
      const fileData: TImageFile = {
        file: file[0],
        name: file[0].name,
        previewUrl: URL.createObjectURL(file[0]),
        size: file[0].size,
      };
      setImage([fileData]);
      fileData && onChange(fileData, id);
    },
    [onChange, id],
  );

  return (
    <div className="App">
      {image && image.length > 0 ? (
        <ImagePreview imageFiles={image} />
      ) : (
        <ImagePlaceholder onDrop={onDrop} />
      )}
    </div>
  );
};
