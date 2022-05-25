import React, { ChangeEvent, KeyboardEvent } from 'react';

import { setMLDraftTextBlockContent } from '../../../../../../bll/reducers';
import { useAppDispatch } from '../../../../../../common/hooks';
import { IMLDraftContentText, Nullable } from '../../../../../../common/types/instance';
import { Textarea } from '../../../../../components/elements';

type TMLTextareaProps = {
  order: number;
  block: Nullable<IMLDraftContentText>;
};

export const MLTextarea = ({ order, block }: TMLTextareaProps) => {
  const dispatch = useAppDispatch();
  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (!block) {
      return;
    }
    block.text = text;
    dispatch(setMLDraftTextBlockContent(block, order));
  };

  if (!block) return null;

  return (
    <Textarea
      data-value={order}
      value={block.text ?? ''}
      onChange={onTextareaChange}
      maxLength={1023}
      className="textarea"
    />
  );
};
