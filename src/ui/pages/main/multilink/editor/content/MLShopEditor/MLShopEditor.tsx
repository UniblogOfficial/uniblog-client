import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import {
  setMLDraftBlockContent,
  setMLDraftBlockContentImage,
} from '../../../../../../../bll/reducers';
import { ID } from '../../../../../../../common/constants';
import { useAppDispatch, useThrottle } from '../../../../../../../common/hooks';

import { MLDraftShop, Nullable, TImageFile, TMLImageContentShop } from 'common/types/instance';
import { Button, Input } from 'ui/components/elements';
import { ImageField } from 'ui/components/modules/imageField/ImageField';

type TMLShopEditorProps = {
  id: string;
  block: MLDraftShop;
  images: Nullable<TMLImageContentShop<TImageFile>>;
};

export const MLShopEditor = ({ id, block, images }: TMLShopEditorProps) => {
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
    (imageFile: TImageFile, _id?: number) => {
      const copyImages = images && { ...images };
      if (copyImages && _id !== undefined) {
        // eslint-disable-next-line no-underscore-dangle
        copyImages.cells[_id] = imageFile;
        dispatch(setMLDraftBlockContentImage({ imageData: copyImages, id, field: block.type }));
      }
    },
    [block.type, dispatch, images],
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const copyBlock = block && { ...block };
    if (e.currentTarget.dataset.value) {
      const currentOrder = +e.currentTarget.dataset.value;
      switch (e.currentTarget.name) {
        case 'title':
          setTitles(
            titles.map((title, index) => (index === currentOrder ? e.currentTarget.value : title)),
          );
          copyBlock.cells[+currentOrder].title = e.currentTarget.value;
          // dispatchThrottled(setMLDraftBlockContent({ content: copyBlock, order }));
          break;
        case 'subtitle':
          setSubTitles(
            subtitles.map((subtitle, index) =>
              index === currentOrder ? e.currentTarget.value : subtitle,
            ),
          );
          copyBlock.cells[+currentOrder].subtitle = e.currentTarget.value;
          // dispatchThrottled(setMLDraftBlockContent({ content: copyBlock, order }));
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
