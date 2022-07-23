import React, { ChangeEvent } from 'react';

import { setMLDraftBlockContent } from '../../../../../../bll/reducers';
import { useAppDispatch } from '../../../../../../common/hooks';
import { MLDraftSocial } from '../../../../../../common/types/instance';

type MLSocialEditorProps = {
  id: string;
  block: MLDraftSocial;
};

export const MLSocialEditor = ({ id, block }: MLSocialEditorProps) => {
  const dispatch = useAppDispatch();

  const onChangeSize = (e: ChangeEvent<HTMLInputElement>) => {
    const currentSize = +e.currentTarget.value;
    dispatch(setMLDraftBlockContent({ content: { size: currentSize }, id, type: block.type }));
  };

  return (
    <>
      Изменить размер иконки:
      <input
        type="range"
        name="Изменить размер иконки"
        min={40}
        max={80}
        step={5}
        value={block.size}
        onChange={onChangeSize}
      />
    </>
  );
};
