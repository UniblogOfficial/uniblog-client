import React, { ChangeEvent, KeyboardEvent } from 'react';

import { Nullable } from '../../../../../../common/types/instance';
import { Textarea } from '../../../../../components/elements';

type TMLTextareaProps = {
  order: number;
  value: Nullable<string>;
  changeTextBlock: (text: string, order: number) => void;
};

export const MLTextarea = ({ order, value, changeTextBlock }: TMLTextareaProps) => {
  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    changeTextBlock(text, order);
  };

  return (
    <Textarea
      data-value={order}
      value={value ?? ''}
      onChange={onTextareaChange}
      maxLength={1023}
      className="textarea"
    />
  );
};
