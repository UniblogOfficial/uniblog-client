import React, { useCallback, useState, MouseEvent } from 'react';

import {
  setMLDraftBlockContent,
  setMLDraftBlockContentImage,
} from '../../../../../../bll/reducers';
import { useAppDispatch } from '../../../../../../common/hooks';
import {
  IMLDraftContentLogo,
  Nullable,
  TImageFile,
  TMLImageContentLogo,
} from '../../../../../../common/types/instance';
import { Button, Input } from '../../../../../components/elements';
import { DropZoneField } from '../../../../../components/modules/imageForm/DropZoneField';

type TMLLogoEditorProps = {
  order: number;
  block: Nullable<IMLDraftContentLogo>;
  images: Nullable<TMLImageContentLogo<TImageFile>>;
};

// private!
enum ImageType {
  LOGO = 1,
  BANNER = 2,
}

export const MLLogoEditor = ({ order, block, images }: TMLLogoEditorProps) => {
  const dispatch = useAppDispatch();
  const onDropZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      if (images && id !== undefined) {
        if (id === ImageType.LOGO) {
          images.logo = imageFile;
        }
        if (id === ImageType.BANNER) {
          images.banner = imageFile;
        }
        dispatch(setMLDraftBlockContentImage(images, order, 'logoSet'));
      }
    },
    [dispatch, images, order],
  );
  const onDeleteButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (block && e.currentTarget.value) {
        if (e.currentTarget.value === '1') {
          // block.image = null;
        }
        if (e.currentTarget.value === '2') {
          block.banner = null;
        }
        dispatch(setMLDraftBlockContent(block, order, 'logoSet'));
      }
    },
    [block, dispatch, order],
  );

  if (!block) return <p>Error: Block not found</p>;

  return (
    <>
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
    </>
  );
};