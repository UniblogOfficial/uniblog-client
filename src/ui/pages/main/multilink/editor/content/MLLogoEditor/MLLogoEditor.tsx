import React, { useCallback, useState, MouseEvent } from 'react';

import { saveImage, setMLDraftBlockContent, setMLDraftBlockContentImage } from 'bll/reducers';
import { MLContentType } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftLogo, Nullable, TImageFile, TMLImageContentLogo } from 'common/types/instance';
import { Button, Input } from 'ui/components/elements';
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

  const onDropZoneChange = useCallback(
    (imageFile: TImageFile, _id?: number) => {
      const imageData = {} as any;
      if (_id !== undefined) {
        if (_id === ImageType.LOGO) {
          imageFile.name = 'logo-0-1';
          imageData.logo = imageFile;
          dispatch(saveImage({ imageData: { logo: imageFile }, id, type: MLContentType.LOGO }));
        }
        if (_id === ImageType.BANNER) {
          imageFile.name = 'logo-0-2';
          imageData.banner = imageFile;
          dispatch(saveImage({ imageData: { banner: imageFile }, id, type: MLContentType.LOGO }));
        }
        dispatch(setMLDraftBlockContentImage({ imageData, id, field: 'logoBlocks' }));
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
          <ImageField id={1} onChange={onDropZoneChange} />
        </div>
      </div>
      <div>
        <div style={{ position: 'relative', height: '150px' }}>
          <ImageField id={2} onChange={onDropZoneChange} />
        </div>
      </div>
      <Button value={1} onClick={onDeleteButtonClick}>
        Delete logo
      </Button>
      <Button value={2} onClick={onDeleteButtonClick}>
        Delete banner
      </Button>
    </div>
  );
};
