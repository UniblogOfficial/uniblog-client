import React, { FC } from 'react';

import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

import upload from '../../../../../../../img/temp1.png';

type TPlaceholderProps = {
  error: any;
  touched: boolean;
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
};
// className={cn(classes.placeholderPreview, { [classes.hasError]: error && touched })}>
export const ImagePlaceholder: FC<TPlaceholderProps> = ({
  getInputProps,
  getRootProps,
  error,
  touched,
}) => (
  <div {...getRootProps()}>
    <input {...getInputProps()} />
    <img src={upload} style={{ height: 100, paddingTop: 85 }} alt="upload" />
    <p>Click or drag image file to this area to upload.</p>
  </div>
);
