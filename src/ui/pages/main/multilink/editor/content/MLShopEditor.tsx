import React, { useCallback, useState } from 'react';

import {
  setMLDraftBlockContent,
  setMLDraftBlockContentImage,
} from '../../../../../../bll/reducers';
import { ID } from '../../../../../../common/constants';
import { useAppDispatch } from '../../../../../../common/hooks';
import {
  IMLDraftContentShop,
  Nullable,
  TImageFile,
  TMLImageContentShop,
} from '../../../../../../common/types/instance';
import { Button, Input } from '../../../../../components/elements';
import { DropZoneField } from '../../../../../components/modules/imageForm/DropZoneField';

type TMLShopEditorProps = {
  order: number;
  block: Nullable<IMLDraftContentShop>;
  images: Nullable<TMLImageContentShop<TImageFile>>;
};

export const MLShopEditor = ({ order, block, images }: TMLShopEditorProps) => {
  const dispatch = useAppDispatch();
  const onDropZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      if (images && id !== undefined) {
        images.cells[id] = imageFile;
        dispatch(setMLDraftBlockContentImage(images, order, 'shopSet'));
      }
    },
    [dispatch, images, order],
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
