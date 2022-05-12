import React, { FC } from 'react';

import { Accept, DropzoneInputProps, DropzoneRootProps, useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

type TPlaceholderProps = {
  onDrop: (acceptedFiles: File[]) => void;
};

export const ImagePlaceholder: FC<TPlaceholderProps> = ({ onDrop }) => {
  const { t } = useTranslation(['common']);
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
          <button type="button" className="btn" onClick={open}>
            {t('common:placeholders.clickToSelect')}
          </button>
        </div>
      </section>
    </>
  );
};
