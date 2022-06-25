import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import {
  setMLDraftBlockContent,
  setMLDraftBlockContentImage,
} from '../../../../../../bll/reducers';
import { ID } from '../../../../../../common/constants';
import { useAppDispatch, useThrottle } from '../../../../../../common/hooks';

import { IMLDraftShop, Nullable, TImageFile, TMLImageContentShop } from 'common/types/instance';
import { Button, Input } from 'ui/components/elements';
import { DropZoneField } from 'ui/components/modules/imageForm/DropZoneField/DropZoneField';

type TMLShopEditorProps = {
  order: number;
  block: Nullable<IMLDraftShop>;
  images: Nullable<TMLImageContentShop<TImageFile>>;
};

export const MLShopEditor = ({ order, block, images }: TMLShopEditorProps) => {
  const dispatch = useAppDispatch();
  const dispatchThrottled = useThrottle(dispatch, 200);
  const initialTitles = block?.cells.map(cell => cell.title);
  const initialSubTitles = block?.cells.map(cell => cell.subtitle);
  const [titles, setTitles] = useState(initialTitles ?? []);
  const [subtitles, setSubTitles] = useState(initialSubTitles ?? []);

  const copyBlock = block && { ...block };
  const copyImages = images && { ...images };

  useEffect(() => {
    setTitles(block?.cells.map(cell => cell.title) ?? []);
    setSubTitles(block?.cells.map(cell => cell.subtitle) ?? []);
  }, [block?.cells]);

  const onDropZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      if (copyImages && id !== undefined) {
        copyImages.cells[id] = imageFile;
        // @ts-ignore
        dispatch(setMLDraftBlockContentImage({ images: copyImages, order, field: copyBlock.type }));
      }
    },
    [dispatch, images, order],
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const currentOrder = e.currentTarget.dataset.value;
    if (copyBlock && currentOrder) {
      switch (e.currentTarget.name) {
        case 'title':
          setTitles(
            titles.map((title, index) => (index === +currentOrder ? e.currentTarget.value : title)),
          );
          copyBlock.cells[+currentOrder].title = e.currentTarget.value;
          dispatchThrottled(setMLDraftBlockContent({ content: copyBlock, order }));
          break;
        case 'subtitle':
          setSubTitles(
            subtitles.map((subtitle, index) =>
              index === +currentOrder ? e.currentTarget.value : subtitle,
            ),
          );
          copyBlock.cells[+currentOrder].subtitle = e.currentTarget.value;
          dispatchThrottled(setMLDraftBlockContent({ content: copyBlock, order }));
          break;
        default:
          break;
      }
    }
  };

  if (!copyBlock) return <p>Error: Block not found</p>;
  const fields = copyBlock.cells.map((cell, i) => (
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
          onChange={onChangeInput}
        />
      </div>
      <div className="field__input">
        <Input
          type="text"
          name="subtitle"
          placeholder="Enter subtitle"
          value={subtitles[i]}
          data-value={i}
          onChange={onChangeInput}
        />
      </div>
    </li>
  ));

  return (
    <div className="ml-shop-editor">
      <ul>{fields}</ul>
      <Button>Add element</Button>
    </div>
  );
};
