import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import {
  setMLDraftBlockContent,
  setMLDraftBlockContentImage,
} from '../../../../../../../bll/reducers';
import { ID } from '../../../../../../../common/constants';
import { useAppDispatch, useThrottle } from '../../../../../../../common/hooks';

import { IMLDraftShop, Nullable, TImageFile, TMLImageContentShop } from 'common/types/instance';
import { Button, Input } from 'ui/components/elements';
import { ImageField } from 'ui/components/modules/imageField/ImageField';

type TMLShopEditorProps = {
  order: number;
  block: IMLDraftShop;
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
    setTitles(block.cells.map(cell => cell.title) ?? []);
    setSubTitles(block.cells.map(cell => cell.subtitle) ?? []);
  }, [block.cells]);

  const onDropZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      if (images && id !== undefined) {
        images.cells[id] = imageFile;
        dispatch(setMLDraftBlockContentImage(images, order, 'shopBlocks'));
      }
    },
    [dispatch, images, order],
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.dataset.value) {
      const currentOrder = +e.currentTarget.dataset.value;
      switch (e.currentTarget.name) {
        case 'title':
          setTitles(
            titles.map((title, index) => (index === currentOrder ? e.currentTarget.value : title)),
          );
          block.cells[currentOrder].title = e.currentTarget.value;
          dispatchThrottled(setMLDraftBlockContent(block, order, 'shopBlocks'));
          break;
        case 'subtitle':
          setSubTitles(
            subtitles.map((subtitle, index) =>
              index === currentOrder ? e.currentTarget.value : subtitle,
            ),
          );
          block.cells[currentOrder].subtitle = e.currentTarget.value;
          dispatchThrottled(setMLDraftBlockContent(block, order, 'shopBlocks'));
          break;
        default:
          break;
      }
    }
  };

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
        <ImageField id={i} onChange={onDropZoneChange} initialImage={cell.image ?? undefined} />
      </div>
      <div className="field__input">
        <Input
          type="text"
          name="title"
          placeholder="Enter title"
          value={titles[i]}
          data-value={i}
          onChange={onInputChange}
        />
      </div>
      <div className="field__input">
        <Input
          type="text"
          name="subtitle"
          placeholder="Enter subtitle"
          value={subtitles[i]}
          data-value={i}
          onChange={onInputChange}
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
