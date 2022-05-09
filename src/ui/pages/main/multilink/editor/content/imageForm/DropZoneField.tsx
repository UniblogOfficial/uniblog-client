import React, { FC, DragEvent } from 'react';

import DropZone, { DropEvent } from 'react-dropzone';

import { TImageFile } from '../MLContent';

import ShowError from './FormErrorRepresenter';
import { ImagePlaceholder } from './ImagePlaceholder';
import ImagePreview from './ImagePreview';

type TDropZoneFieldProps = {
  handleOnDrop: (
    e: DropEvent,
    newImageFile: Array<File>,
    onChange: (e: DropEvent, imageFile: TImageFile) => void,
  ) => void;
  onChange: (e: DropEvent, imageFile: TImageFile) => void;
  imageFiles: Array<TImageFile>;
  error?: string;
  touched: boolean;
};

export const DropZoneField: FC<TDropZoneFieldProps> = ({
  handleOnDrop,
  imageFiles,
  onChange,
  error,
  touched,
}) => (
  <div>
    <div>
      <DropZone onDrop={(file, rejected, e) => handleOnDrop(e, file, onChange)} multiple={false}>
        {props =>
          imageFiles && imageFiles.length > 0 ? (
            <ImagePreview imageFiles={imageFiles} />
          ) : (
            <ImagePlaceholder {...props} error={error} touched={touched} />
          )
        }
      </DropZone>
    </div>
    <ShowError error={error} touched={touched} />
  </div>
);
