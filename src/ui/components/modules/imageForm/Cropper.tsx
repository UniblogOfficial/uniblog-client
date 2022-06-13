import React, { useState, FC } from 'react';

import Cropper from 'react-cropper';
import './cropper.css';
import { useTranslation } from 'react-i18next';

import { TImageFile } from '../../../../common/types/instance';
import { dataUrlToFile } from '../../../../common/utils/state/dataUrlToFile';
import { Button } from '../../elements/button/Button';

type CropperContainerPropsType = {
  img: string | undefined;
  setCropperMode: (value: boolean) => void;
  setCroppedImage: (file: TImageFile[]) => void;
  onChangeImage: (imageFile: TImageFile, id?: number) => void;
  id?: number;
  avatarMode?: boolean;
};

export const CropperContainer: FC<CropperContainerPropsType> = ({
  img,
  setCropperMode,
  setCroppedImage,
  onChangeImage,
  id,
  avatarMode,
}) => {
  const [image, setImage] = useState(img);
  const [cropper, setCropper] = useState<any>();
  const { t } = useTranslation(['pages', 'common']);

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      handleUpload(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleUpload = async (url: string) => {
    const file = await dataUrlToFile(url, 'output.png');
    const fileData: TImageFile = {
      file,
      name: file.name,
      previewUrl: url,
      size: file.size,
    };

    setCropperMode(false);
    setCroppedImage([fileData]);
    console.log(fileData);
    onChangeImage(fileData, id);
  };

  return (
    <div
      style={{ width: '80%', position: 'relative', zIndex: 10 }}
      className={`paper containerCropper + ${avatarMode ? 'avatarMode' : ''}`}>
      <Cropper
        style={{ minHeight: 500, width: '100%', position: 'relative', marginBottom: 50 }}
        zoomTo={0.5}
        initialAspectRatio={1}
        preview=".img-preview"
        src={image}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive
        // cropBoxResizable={false}
        autoCropArea={1}
        checkOrientation={false}
        onInitialized={instance => {
          setCropper(instance);
        }}
        guides
      />
      <Button value="1" className="button button__right" onClick={getCropData}>
        {t('common:buttons.save')}
      </Button>
      <Button value="1" className="button button__left" onClick={() => setCropperMode(false)}>
        {t('common:buttons.back')}
      </Button>
    </div>
  );
};
