import React, { useCallback, useState } from 'react';

import { saveImage, setMLDraftBlockContent, setMLDraftBlockContentImage } from 'bll/reducers';
import { ID, MLContentType } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftImage, Nullable, TImageFile, TMLImageContentImage } from 'common/types/instance';
import { Button, Input } from 'ui/components/elements';
import { ImageField } from 'ui/components/modules/imageField/ImageField';

type TMLImageEditorProps = {
  id: string;
  block: Nullable<IMLDraftImage>;
  image: Nullable<TMLImageContentImage<TImageFile>>;
};

export const MLImageEditor = ({ id, block, image }: TMLImageEditorProps) => {
  const dispatch = useAppDispatch();
  const copyBlock = { ...block };

  const onDropZoneChange = useCallback(
    (imageFile: TImageFile) => {
      imageFile.name = 'image-0-0';
      dispatch(saveImage({ imageData: { image: imageFile }, id, type: MLContentType.IMAGE }));
      dispatch(
        setMLDraftBlockContentImage({
          imageData: { image: imageFile },
          id,
          field: 'imageBlocks',
        }),
      );
    },
    [dispatch, image],
  );
  if (!copyBlock) return <p>Error: Block not found</p>;
  const field = image && (
    <div style={{ position: 'relative', height: '150px' }}>
      <ImageField onChange={onDropZoneChange} />
    </div>
  );

  return (
    <div className="ml-image-editor">
      {field}
      <Button>Add element</Button>
    </div>
  );
};
