import React, { useCallback, useState } from 'react';

import { setMLDraftBlockContent, setMLDraftBlockContentImage } from 'bll/reducers';
import { ID } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftImage, Nullable, TImageFile, TMLImageContentImage } from 'common/types/instance';
import { Button, Input } from 'ui/components/elements';
import { ImageField } from 'ui/components/modules/imageField/ImageField';

type TMLImageEditorProps = {
  order: number;
  block: Nullable<IMLDraftImage>;
  images: Nullable<TMLImageContentImage<TImageFile>>;
};

export const MLImageEditor = ({ order, block, images }: TMLImageEditorProps) => {
  const dispatch = useAppDispatch();
  const copyBlock = { ...block };

  const onDropZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      const copyImages = images && { ...images };
      if (copyImages && id !== undefined) {
        copyImages.images[id] = imageFile;
        dispatch(setMLDraftBlockContentImage({ images: copyImages, order, field: 'imageBlocks' }));
      }
    },
    [dispatch, images, order],
  );
  if (!copyBlock) return <p>Error: Block not found</p>;
  const fields =
    copyBlock.images &&
    copyBlock.images.map((image, i) => (
      <li key={ID[i]}>
        <div style={{ position: 'relative', height: '150px' }}>
          <ImageField id={i} onChange={onDropZoneChange} />
        </div>
      </li>
    ));
  return (
    <div className="ml-image-editor">
      <ul>{fields}</ul>
      <Button>Add element</Button>
    </div>
  );
};
