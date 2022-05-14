import React, { ChangeEvent } from 'react';

type TMLTextareaProps = {
  order: number;
  value: string;
  changeTextBlock: (text: string, order: number) => void;
};

export const MLTextarea = ({ order, value, changeTextBlock }: TMLTextareaProps) => {
  const onTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    // const order = +e.currentTarget.dataset.value! as number;
    changeTextBlock(text, order);
  };
  return (
    <textarea
      data-value={order}
      value={value}
      onChange={onTextareaChange}
      maxLength={70}
      className="template__block__textarea"
    />
  );
};
