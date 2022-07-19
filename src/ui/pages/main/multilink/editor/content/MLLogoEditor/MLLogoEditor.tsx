import React, { MouseEvent, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import AllSavedImages from '../../../../../../components/modules/allSavedImages/AllSavedImages';

import { saveImage } from 'bll/reducers';
import { MLAllSavedImagesType, MLContentType, MLFieldSavedImages } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftLogo, Nullable, TImageFile, TMLImageContentLogo } from 'common/types/instance';
import { Button } from 'ui/components/elements';
import { ImageField } from 'ui/components/modules/imageField/ImageField';

type TMLLogoEditorProps = {
  id: string;
  block: IMLDraftLogo;
  images: Nullable<TMLImageContentLogo<TImageFile>>;
};

// private!
enum ImageType {
  LOGO = 1,
  BANNER = 2,
}

export const MLLogoEditor = ({ id, block, images }: TMLLogoEditorProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages']);

  const onDropZoneChange = useCallback(
    (imageFile: TImageFile, _id?: number) => {
      if (_id !== undefined) {
        if (_id === ImageType.LOGO) {
          imageFile.name = 'logo-0-1';
          dispatch(saveImage({ imageData: { logo: imageFile }, id, type: MLContentType.LOGO }));
        }
        if (_id === ImageType.BANNER) {
          imageFile.name = 'logo-0-2';
          dispatch(saveImage({ imageData: { banner: imageFile }, id, type: MLContentType.LOGO }));
        }
      }
    },
    [dispatch, images],
  );
  const onDeleteButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const copyBlock = block && { ...block };
      if (e.currentTarget.value) {
        if (e.currentTarget.value === '1') {
          // block.image = null;
        }
        if (e.currentTarget.value === '2') {
          copyBlock.banner = null;
        }
        // dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
      }
    },
    [block],
  );
  return (
    <div className="ml-logo-editor">
      <div>
        <div style={{ position: 'relative', height: '150px' }}>
          <ImageField id={1} onChange={onDropZoneChange} mode="circle" />
        </div>
      </div>
      <div>
        <div style={{ position: 'relative', height: '150px' }}>
          <ImageField id={2} onChange={onDropZoneChange} />
        </div>
      </div>
      <Button value={1} onClick={onDeleteButtonClick}>
        {t('pages:multilink.creation.editors.logo.deleteLogo')}
      </Button>
      <Button value={2} onClick={onDeleteButtonClick}>
        {t('pages:multilink.creation.editors.logo.deleteBanner')}
      </Button>
      <AllSavedImages
        id={id}
        imagesType={MLAllSavedImagesType.IMAGES_LOGO}
        contentType={MLContentType.LOGO}
        fieldName={MLFieldSavedImages.FIELD_LOGO}
      />
      <AllSavedImages
        id={id}
        imagesType={MLAllSavedImagesType.IMAGES_LOGO}
        contentType={MLContentType.LOGO}
        fieldName={MLFieldSavedImages.FIELD_BANNER}
      />
    </div>
  );
};
