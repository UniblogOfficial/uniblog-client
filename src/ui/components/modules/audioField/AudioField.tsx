import React, { FC, useCallback, useEffect, useState } from 'react';

import { TAudioFile } from '../../../../common/types/instance/audio';
import ImagePreview from '../imageField/ImagePreview/ImagePreview';
import { Modal } from '../modals/Modal';

import { CropperContainerAudio } from './Cropper/Cropper';
import { AudioPlaceholder } from './ImagePreview/AudioPlaceholder';
import AudioPreview from './ImagePreview/AudioPreview';

import { TImageFile } from 'common/types/instance';

type TDropZoneFieldProps = {
  onChange: (imageFile: TImageFile, id?: number) => void;
  initialAudio?: string;
  // error?: string;
  touched?: boolean;
  id?: number;
  avatarMode?: boolean;
  setCroppedAudio?: (file: TAudioFile[]) => void;
};

export const AudioField: FC<TDropZoneFieldProps> = ({
  onChange,
  // error,
  id,
  setCroppedAudio,
}) => {
  const [audio, setAudio] = useState<TAudioFile[]>([]);
  const [error, setError] = useState<string>('');
  const [openedModalCropper, setOpenedModalCropper] = useState(true);
  const onDrop = useCallback(
    (file: File[]) => {
      const fileData: TAudioFile = {
        file: file[0],
        name: file[0].name,
        previewUrl: URL.createObjectURL(file[0]),
        size: file[0].size,
      };
      if (fileData.size <= 20480 * 20480) {
        setAudio([fileData]);
        fileData && onChange(fileData, id);
        setError('');
      } else setError('Файл больше 20 мб');
    },
    [onChange, id],
  );
  useEffect(() => {
    setCroppedAudio && setCroppedAudio(audio);
  }, [audio, setCroppedAudio]);
  return (
    <>
      <div className="dropbox">
        <AudioPlaceholder isFilled={audio.length > 0} onDrop={onDrop} />
      </div>
      {error && <p className="field__error">{error}</p>}
    </>
  );
};
