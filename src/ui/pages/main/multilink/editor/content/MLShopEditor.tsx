import React, { useCallback, useState } from 'react';

import { setMLDraftBlockContent } from '../../../../../../bll/reducers';
import { ID } from '../../../../../../common/constants';
import { useAppDispatch } from '../../../../../../common/hooks';
import { IMLDraftContentShop, Nullable, TImageFile } from '../../../../../../common/types/instance';
import { Button, Input } from '../../../../../components/elements';
import { DropZoneField } from '../../../../../components/modules/imageForm/DropZoneField';

type TMLShopEditorProps = {
  order: number;
  block: Nullable<IMLDraftContentShop>;
};

export const MLShopEditor = ({ order, block }: TMLShopEditorProps) => {
  const dispatch = useAppDispatch();
  const [images, setImages] = useState<TImageFile[]>([]);
  const onDropZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      if (block && id !== undefined) {
        block.cells[id].image = { ...imageFile, src: '' };
        dispatch(setMLDraftBlockContent(block, order, 'shopSet'));
      }
    },
    [block, dispatch, order],
  );
  if (!block) return <p>Error: Block not found</p>;
  const fields = block.cells.map((cell, i) => (
    <li key={ID[i]}>
      <div style={{ position: 'relative', height: '150px' }}>
        <DropZoneField id={i} onChange={onDropZoneChange} />
      </div>
      <div className="field__input">
        <Input type="text" name="title" placeholder="Enter title" />
      </div>
      <div className="field__input">
        <Input type="text" name="subtitle" placeholder="Enter subtitle" />
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
