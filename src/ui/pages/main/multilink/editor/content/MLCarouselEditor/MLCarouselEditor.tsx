import React, { ChangeEvent, useCallback, useState } from 'react';

import { MLContentType } from '../../../../../../../common/constants';
import { CarouselField } from '../../../../../../components/modules/carouselField/CarouselField';

import { setMLDraftBlockContent, setMLDraftBlockContentImage } from 'bll/reducers';
import { useAppDispatch } from 'common/hooks';
import {
  IMLDraftCarousel,
  Nullable,
  TImageFile,
  TMLImageContentCarousel,
} from 'common/types/instance';
import { Button } from 'ui/components/elements';

type TMLCarouselEditorProps = {
  id: string;
  block: Nullable<IMLDraftCarousel>;
  image: Nullable<TMLImageContentCarousel<TImageFile>>;
};

export const MLCarouselEditor = ({ id, block, image }: TMLCarouselEditorProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrl2, setImageUrl2] = useState<Array<string>>([]);
  const dispatch = useAppDispatch();
  const copyBlock = { ...block };
  const setUrlAudioFile = (url: string) => {
    setImageUrl2([...imageUrl2, url]);
    dispatch(
      setMLDraftBlockContent({
        content: { images: imageUrl2 },
        id,
        type: MLContentType.CAROUSEL,
      }),
    );
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.currentTarget.value);
  };
  const onDropZoneChange = useCallback(
    (imageFile: TImageFile) => {
      dispatch(
        setMLDraftBlockContentImage({
          imageData: { image: imageFile },
          id,
          field: 'carouselBlocks',
        }),
      );
    },
    [dispatch, image],
  );
  if (!copyBlock) return <p>Error: Block not found</p>;
  const field = image && (
    <div style={{ position: 'relative', height: '150px' }}>
      <CarouselField onChange={onDropZoneChange} />
    </div>
  );
  return (
    <div className="ml-image-editor">
      {field}
      <input
        style={{ width: '100%', height: '50px', backgroundColor: 'red' }}
        placeholder="Please, enter audio url"
        onChange={onChangeHandler}
      />
      <Button onClick={() => setUrlAudioFile(imageUrl)}>Add element</Button>
    </div>
  );
};
