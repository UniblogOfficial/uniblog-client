import React, { useCallback, useState } from 'react';

import { setMLDraftBlockContent, setMLDraftBlockContentImage } from 'bll/reducers';
import { ID } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftImage, Nullable, TImageFile, TMLImageContentImage } from 'common/types/instance';
import { Button, Input } from 'ui/components/elements';
import { ImageField } from 'ui/components/modules/imageField/ImageField';

type TMLImageEditorProps = {
  id: string;
  block: Nullable<IMLDraftImage>;
  images: Nullable<TMLImageContentImage<TImageFile>>;
};

export const MLImageEditor = ({ id, block, images }: TMLImageEditorProps) => {
  const dispatch = useAppDispatch();
  const copyBlock = { ...block };

  const onDropZoneChange = useCallback(
    (imageFile: TImageFile) => {
      dispatch(
        setMLDraftBlockContentImage({
          imageData: { image: imageFile },
          id,
          field: 'imageBlocks',
        }),
      );
    },
    [dispatch, images],
  );
  if (!copyBlock) return <p>Error: Block not found</p>;
  const fields = copyBlock.image && (
    <div style={{ position: 'relative', height: '150px' }}>
      <ImageField onChange={onDropZoneChange} />
    </div>
  );

  return (
    <div className="ml-image-editor">
      <ul>{fields}</ul>
      <Button>Add element</Button>
    </div>
  );
};
