import React, { useCallback, useState } from 'react';

import { setMLDraftBlockContent } from '../../../../../../bll/reducers';
import { ID } from '../../../../../../common/constants';
import { useAppDispatch } from '../../../../../../common/hooks';
import {
  IMLDraftContentImage,
  Nullable,
  TImageFile,
} from '../../../../../../common/types/instance';
import { Button, Input } from '../../../../../components/elements';
import { DropZoneField } from '../../../../../components/modules/imageForm/DropZoneField';

type TMLImageEditorProps = {
  order: number;
  block: Nullable<IMLDraftContentImage>;
};

export const MLImageEditor = ({ order, block }: TMLImageEditorProps) => {
  const dispatch = useAppDispatch();
  const [images, setImages] = useState<TImageFile[]>([]);
  const onDropZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      if (block && id !== undefined) {
        block.images[id] = { ...imageFile, src: '' };
        dispatch(setMLDraftBlockContent(block, order, 'imageSet'));
      }
    },
    [block, dispatch, order],
  );
  if (!block) return <p>Error: Block not found</p>;
  const fields = block.images.map((image, i) => (
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
