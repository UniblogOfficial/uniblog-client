import React, { FC, useCallback, useEffect, useState } from 'react';

import { TImageFile } from 'common/types/instance';
import { CropperContainer } from 'ui/components/modules/imageField/Cropper/Cropper';
import { ImagePlaceholder } from 'ui/components/modules/imageField/ImagePreview/ImagePlaceholder';
import ImagePreview from 'ui/components/modules/imageField/ImagePreview/ImagePreview';
import { Modal } from 'ui/components/modules/modals/Modal';

type TDropZoneFieldProps = {
  onChange: (imageFile: TImageFile, id?: number) => void;
  initialImage?: string;
  // error?: string;
  touched?: boolean;
  id?: number;
  setCroppedImage?: (file: TImageFile[]) => void;
  mode?: 'circle' | 'square';
};

export const ImageField: FC<TDropZoneFieldProps> = ({
  initialImage,
  onChange,
  // error,
  touched,
  id,
  setCroppedImage,
  mode,
}) => {
  const [image, setImage] = useState<TImageFile[]>([]);
  const [error, setError] = useState<string>('');
  const [openedModalCropper, setOpenedModalCropper] = useState(true);

  const onDrop = useCallback(
    (file: File[]) => {
      const fileData: TImageFile = {
        file: file[0],
        name: file[0].name,
        previewUrl: URL.createObjectURL(file[0]),
        size: file[0].size,
      };
      if (fileData.size <= 1024 * 1024 * 5) {
        setImage([fileData]);
        // fileData && onChange(fileData, id);
        setError('');
      } else setError('Файл больше 5 мб');
      setOpenedModalCropper(true);
    },
    [onChange, id],
  );
  const closeModalCropperContainer = () => {
    setOpenedModalCropper(false);
  };

  useEffect(() => {
    setCroppedImage && setCroppedImage(image);
  }, [image, setCroppedImage]);

  return (
    <>
      <div className="dropbox">
        {image.length > 0 && (
          <>
            {initialImage && <ImagePreview imageFiles={image} />}
            {openedModalCropper && (
              <Modal close={closeModalCropperContainer}>
                <CropperContainer
                  img={image[0].previewUrl}
                  setCropperMode={setOpenedModalCropper}
                  setCroppedImage={setImage}
                  onChangeImage={onChange}
                  id={id}
                  mode={mode}
                />
              </Modal>
            )}
          </>
        )}
        {image.length === 0 && initialImage && <ImagePreview imageFiles={initialImage} />}
        <ImagePlaceholder isFilled={!!initialImage} onDrop={onDrop} />
      </div>
      {error && <p className="field__error">{error}</p>}
    </>
  );
};
