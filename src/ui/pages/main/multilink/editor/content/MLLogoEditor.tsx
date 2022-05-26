import React, { useCallback, useState, MouseEvent } from 'react';

import { setMLDraftBlockContent } from '../../../../../../bll/reducers';
import { ID } from '../../../../../../common/constants';
import { useAppDispatch } from '../../../../../../common/hooks';
import { IMLDraftContentLogo, Nullable, TImageFile } from '../../../../../../common/types/instance';
import { Button, Input } from '../../../../../components/elements';
import { DropZoneField } from '../../../../../components/modules/imageForm/DropZoneField';

type TMLLogoEditorProps = {
  order: number;
  block: Nullable<IMLDraftContentLogo>;
};

export const MLLogoEditor = ({ order, block }: TMLLogoEditorProps) => {
  const dispatch = useAppDispatch();
  const onDropZoneChange = useCallback(
    (imageFile: TImageFile, id?: number) => {
      if (block && id !== undefined) {
        if (id === 1) {
          block.image = { ...imageFile, imageData: '', imageType: '' };
        }
        if (id === 2) {
          block.banner = { ...imageFile, src: '' };
        }
        dispatch(setMLDraftBlockContent(block, order, 'logoSet'));
      }
    },
    [block, dispatch, order],
  );
  const onDeleteButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (block && e.currentTarget.value) {
        if (e.currentTarget.value === '1') {
          block.image = null;
        }
        if (e.currentTarget.value === '2') {
          block.banner = null;
        }
        dispatch(setMLDraftBlockContent(block, order, 'logoSet'));
      }
    },
    [block, dispatch, order],
  );

  if (!block) return <p>Error: Block not found</p>;

  return (
    <>
      <div>
        <div style={{ position: 'relative', height: '150px' }}>
          <DropZoneField id={1} onChange={onDropZoneChange} />
        </div>
      </div>
      <div>
        <div style={{ position: 'relative', height: '150px' }}>
          <DropZoneField id={2} onChange={onDropZoneChange} />
        </div>
      </div>
      <Button value={1} onClick={onDeleteButtonClick}>
        Delete logo
      </Button>
      <Button value={2} onClick={onDeleteButtonClick}>
        Delete banner
      </Button>
    </>
  );
};
