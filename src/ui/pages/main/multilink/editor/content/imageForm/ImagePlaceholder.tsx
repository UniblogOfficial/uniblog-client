import React, { FC } from 'react';

import { Accept, DropzoneInputProps, DropzoneRootProps, useDropzone } from 'react-dropzone';

import upload from '../../../../../../../img/temp1.png';

type TPlaceholderProps = {
  onDrop: (acceptedFiles: File[]) => void;
};
// className={cn(classes.placeholderPreview, { [classes.hasError]: error && touched })}>
export const ImagePlaceholder: FC<TPlaceholderProps> = ({ onDrop }) => {
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpeg', '.jpg'],
      'image/gif': ['.gif'],
      'image/bmp': ['.bmp'],
    },
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const lists = acceptedFiles.map(list => (
    <li key={list.name}>
      {list.name} - {list.size} bytes
    </li>
  ));

  return (
    <>
      {' '}
      <section className="dropbox">
        <div className="dropbox" {...getRootProps({ isDragAccept, isFocused, isDragReject })}>
          <input {...getInputProps()} />
          <p>Drag n drop some files here</p>
          <button type="button" className="btn" onClick={open}>
            Click to select file
          </button>
        </div>
      </section>
      <aside>
        <h4>List</h4>
        <p>{lists}</p>
      </aside>
    </>
  );
};
