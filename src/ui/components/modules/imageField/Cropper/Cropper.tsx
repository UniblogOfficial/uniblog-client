import React, { useState, FC } from 'react';

import Cropper from 'react-cropper';
import { useTranslation } from 'react-i18next';

import 'ui/components/modules/imageField/Cropper/Cropper.scss';
import { TImageFile } from 'common/types/instance';
import { dataUrlToFile } from 'common/utils/state/dataUrlToFile';
import { Button } from 'ui/components/elements/button/Button';

type CropperContainerPropsType = {
  img: string | undefined;
  setCropperMode: (value: boolean) => void;
  setCroppedImage: (file: TImageFile[]) => void;
  onChangeImage: (imageFile: TImageFile, id?: number) => void;
  id?: number;
  mode?: 'circle' | 'square';
};

export const CropperContainer: FC<CropperContainerPropsType> = ({
  img,
  setCropperMode,
  setCroppedImage,
  onChangeImage,
  id,
  mode,
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
    onChangeImage(fileData, id);
  };

  const onBackHandler = () => {
    setCropperMode(false);
    setCroppedImage([]);
  };
  console.log(img);
  return (
    <div
      style={{ position: 'relative', padding: 36, zIndex: 10 }}
      className={`paper containerCropper ${mode === 'circle' ? 'avatarMode' : ''}`}>
      <Cropper
        style={{ minHeight: 500, width: '100%', position: 'relative', marginBottom: 36 }}
        aspectRatio={mode ? 1 : NaN}
        preview=".img-preview"
        src={image}
        viewMode={1}
        minCropBoxHeight={mode === 'circle' ? 50 : 10}
        minCropBoxWidth={mode === 'circle' ? 50 : 10}
        background={false}
        dragMode={mode === 'circle' ? 'move' : 'crop'}
        autoCropArea={1}
        onInitialized={instance => {
          setCropper(instance);
        }}
      />
      <div className="action-buttons">
        <Button value="1" className="button _rounded _shadowed" onClick={onBackHandler}>
          {t('common:buttons.back')}
        </Button>
        <Button value="1" className="button _rounded _shadowed" onClick={getCropData}>
          {t('common:buttons.save')}
        </Button>
      </div>
    </div>
  );
};
