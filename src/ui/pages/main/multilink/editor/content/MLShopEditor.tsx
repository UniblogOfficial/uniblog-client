import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import {
  setMLDraftBlockContent,
  setMLDraftBlockContentImage,
} from '../../../../../../bll/reducers';
import { ID } from '../../../../../../common/constants';
import { useAppDispatch, useThrottle } from '../../../../../../common/hooks';
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
  const dispatchThrottled = useThrottle(dispatch, 200);
  const initialTitles = block?.cells.map(cell => cell.title);
  const initialSubTitles = block?.cells.map(cell => cell.subtitle);
  const [titles, setTitles] = useState(initialTitles ?? []);
  const [subtitles, setSubTitles] = useState(initialSubTitles ?? []);

  useEffect(() => {
    setTitles(block?.cells.map(cell => cell.title) ?? []);
    setSubTitles(block?.cells.map(cell => cell.subtitle) ?? []);
  }, [block?.cells]);

  const onDropZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      if (images && id !== undefined) {
        images.cells[id] = imageFile;
        dispatch(setMLDraftBlockContentImage(images, order, 'shopSet'));
      }
    },
    [dispatch, images, order],
  );

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentOrder = e.currentTarget.dataset.value;
    if (block && currentOrder) {
      setTitles(
        titles.map((title, index) => (index === +currentOrder ? e.currentTarget.value : title)),
      );
      block.cells[+currentOrder].title = e.currentTarget.value;
      dispatchThrottled(setMLDraftBlockContent(block, order, 'shopSet'));
    }
  };

  const onSubTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentOrder = e.currentTarget.dataset.value;
    if (block && currentOrder) {
      setSubTitles(
        subtitles.map((subtitle, index) =>
          index === +currentOrder ? e.currentTarget.value : subtitle,
        ),
      );
      block.cells[+currentOrder].subtitle = e.currentTarget.value;
      dispatchThrottled(setMLDraftBlockContent(block, order, 'shopSet'));
    }
  };

  if (!block) return <p>Error: Block not found</p>;
  const fields = block.cells.map((cell, i) => (
    <li key={ID[i]}>
      <div
        style={{
          position: 'relative',
          height: '150px',
          border: '1px solid #e4e5e7',
          marginBottom: '5px',
          borderRadius: '7px',
        }}>
        <DropZoneField id={i} onChange={onDropZoneChange} initialImage={cell.image ?? undefined} />
      </div>
      <div className="field__input">
        <Input
          type="text"
          name="title"
          placeholder="Enter title"
          value={titles[i]}
          data-value={i}
          onChange={onTitleChange}
        />
      </div>
      <div className="field__input">
        <Input
          type="text"
          name="subtitle"
          placeholder="Enter subtitle"
          value={subtitles[i]}
          data-value={i}
          onChange={onSubTitleChange}
        />
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
