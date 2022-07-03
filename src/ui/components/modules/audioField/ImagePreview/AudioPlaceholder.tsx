import React, { FC } from 'react';

import Dropzone, {
  Accept,
  DropEvent,
  DropzoneInputProps,
  DropzoneRootProps,
  FileRejection,
  useDropzone,
} from 'react-dropzone';
import { useTranslation } from 'react-i18next';

import { IconColor } from 'common/constants';
import { Icon } from 'ui/components/elements';
import styles from 'ui/components/modules/imageField/ImageField.module.scss';

type TPlaceholderProps = {
  isFilled: boolean;
  onDrop: (acceptedFiles: File[]) => void;
};

export const AudioPlaceholder: FC<TPlaceholderProps> = ({ isFilled, onDrop }) => {
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
      'audio/*': ['.mp3', '.flac', '.aac'],
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
      <Dropzone {...getRootProps({ isDragAccept, isFocused, isDragReject })}>
        {() => (
          <>
            {!isFilled && (
              <Icon name="arrow" size="reduced" primaryColor="#d4dee8" secondaryColor="#d4dee8" />
            )}
            <input {...getInputProps()} />
            <button type="button" className={styles['button']} onClick={open}>
              {isFilled ? (
                <Icon
                  name="arrows-rotate"
                  size="reduced"
                  className={styles['button__icon']}
                  primaryColor={IconColor.OK}
                  secondaryColor={IconColor.INFO}
                />
              ) : (
                t('common:placeholders.clickToSelect')
              )}
            </button>
          </>
        )}
      </Dropzone>
    </>
  );
};
