import React from 'react';

import { ID } from '../../../../../../common/constants';
import { IMLDraftContentShop, Nullable } from '../../../../../../common/types/instance';
import { Button, Input } from '../../../../../components/elements';
import { DropZoneField } from '../../../../../components/modules/imageForm/DropZoneField';

type TMLShopEditorProps = {
  order: number;
  block: Nullable<IMLDraftContentShop>;
};

export const MLShopEditor = ({ order, block }: TMLShopEditorProps) => {
  if (!block) return <p>Error: Block not found</p>;
  const fields = block.cells.map((cell, i) => (
    <li key={ID[i]}>
      {/* <DropZoneField /> */}
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
