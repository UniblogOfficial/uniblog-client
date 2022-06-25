import React, { useCallback, useState, MouseEvent } from 'react';

import { setMLDraftBlockContent, setMLDraftBlockContentImage } from 'bll/reducers';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftLogo, Nullable, TImageFile, TMLImageContentLogo } from 'common/types/instance';
import { Button, Input } from 'ui/components/elements';
import { DropZoneField } from 'ui/components/modules/imageForm/DropZoneField/DropZoneField';

type TMLLogoEditorProps = {
  order: number;
  block: Nullable<IMLDraftLogo>;
  images: Nullable<TMLImageContentLogo<TImageFile>>;
};

// private!
enum ImageType {
  LOGO = 1,
  BANNER = 2,
}

export const MLLogoEditor = ({ order, block, images }: TMLLogoEditorProps) => {
  const dispatch = useAppDispatch();
  const copyBlock = block && { ...block };
  const copyImages = { ...images };
  const onDropZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      if (copyImages && id !== undefined) {
        if (id === ImageType.LOGO) {
          copyImages.logo = imageFile;
        }
        if (id === ImageType.BANNER) {
          copyImages.banner = imageFile;
        }
        dispatch(setMLDraftBlockContentImage({ images: copyImages, order, field: 'logoBlocks' }));
      }
    },
    [dispatch, images, order],
  );
  const onDeleteButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (copyBlock && e.currentTarget.value) {
        if (e.currentTarget.value === '1') {
          // block.image = null;
        }
        if (e.currentTarget.value === '2') {
          copyBlock.banner = null;
        }
        dispatch(setMLDraftBlockContent({ content: copyBlock, order }));
      }
    },
    [copyBlock, dispatch, order],
  );

  if (!block) return <p>Error: Block not found</p>;

  return (
    <div className="ml-logo-editor">
      <div>
        <div style={{ position: 'relative', height: '150px' }}>
          <DropZoneField id={1} onChange={onDropZoneChange} />
        </div>
      </div>
      <div>
        <div style={{ position: 'relative', height: '150px' }}>
          <DropZoneField id={2} onChange={onDropZoneChange} />
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
