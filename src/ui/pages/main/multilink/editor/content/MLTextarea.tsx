import React, { ChangeEvent } from 'react';

import { Nullable } from '../../../../../../common/types/instance';

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
    <textarea
      data-value={order}
      value={value ?? ''}
      onChange={onTextareaChange}
      maxLength={70}
      className="template__textarea"
    />
  );
};
