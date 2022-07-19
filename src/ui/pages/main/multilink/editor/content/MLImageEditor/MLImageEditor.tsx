import React, { useCallback } from 'react';

import AllSavedImages from '../../../../../../components/modules/allSavedImages/AllSavedImages';

import { saveImage, setMLDraftBlockContentImage } from 'bll/reducers';
import { MLAllSavedImagesType, MLContentType, MLFieldSavedImages } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { IMLDraftImage, Nullable, TImageFile, TMLImageContentImage } from 'common/types/instance';
import { Button } from 'ui/components/elements';
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
      <AllSavedImages
        fieldName={MLFieldSavedImages.FIELD_IMAGE}
        id={id}
        imagesType={MLAllSavedImagesType.IMAGES_IMAGE}
        contentType={MLContentType.IMAGE}
      />
    </div>
  );
};
