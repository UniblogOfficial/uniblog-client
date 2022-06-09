import React, { useCallback, useState } from 'react';

import { setMLDraftBlockContent, setMLDraftBlockContentImage } from 'bll/reducers';
import { ID } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftImage, Nullable, TImageFile, TMLImageContentImage } from 'common/types/instance';
import { Button, Input } from 'ui/components/elements';
import { DropZoneField } from 'ui/components/modules/imageForm/DropZoneField';

type TMLImageEditorProps = {
  order: number;
  block: Nullable<IMLDraftImage>;
  images: Nullable<TMLImageContentImage<TImageFile>>;
};

export const MLImageEditor = ({ order, block, images }: TMLImageEditorProps) => {
  const dispatch = useAppDispatch();
  const onDropZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      if (images && id !== undefined) {
        images.images[id] = imageFile;
        dispatch(setMLDraftBlockContentImage(images, order, 'imageBlocks'));
      }
    },
    [dispatch, images, order],
  );
  if (!block) return <p>Error: Block not found</p>;
  const fields =
    block.images &&
    block.images.map((image, i) => (
      <li key={ID[i]}>
        <div style={{ position: 'relative', height: '150px' }}>
          <DropZoneField id={i} onChange={onDropZoneChange} />
        </div>
      </li>
    ));
  return (
    <>
      <ul>{fields}</ul>
      <Button>Add element</Button>
    </>
  );
};
