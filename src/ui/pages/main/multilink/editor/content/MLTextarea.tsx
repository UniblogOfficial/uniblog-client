import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import { setMLDraftTextBlockContent } from '../../../../../../bll/reducers';
import { useAppDispatch } from '../../../../../../common/hooks';
import { useDebounce } from '../../../../../../common/hooks/useDebounce.';
import { IMLDraftContentText, Nullable } from '../../../../../../common/types/instance';
import { Textarea } from '../../../../../components/elements';

type TMLTextareaProps = {
  order: number;
  block: Nullable<IMLDraftContentText>;
};

export const MLTextarea = ({ order, block }: TMLTextareaProps) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState(block?.text ?? '');
  const debouncedValue = useDebounce(text, 500);
  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (!block) {
      return;
    }
    setText(newText);
  };
  useEffect(() => {
    if (block) {
      block.text = debouncedValue;
      dispatch(setMLDraftTextBlockContent(block, order));
    }
  }, [debouncedValue]);

  if (!block) return null;

  return (
    <Textarea
      data-value={order}
      value={text}
      onChange={onTextareaChange}
      maxLength={1023}
      className="textarea"
    />
  );
};
