import React, { FC } from 'react';

import { Icon } from '../../../../components/elements';

type TMLContentProps = {
  template: number[];
  setLink: (link: string) => void;
};

export const MLContent: FC<TMLContentProps> = ({ template, setLink }) => {
  const templateLayout = (
    <ul className="template">
      {template.map((block, j) => (
        <li key={id[j]} style={{ flex: `0 1 ${block}%` }} className="template__block _interactive">
          <button type="button">
            <Icon name="circle-add" />
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <h3 className="paper-title">Add mediacontent</h3>
      <div className="multilink-editor__constructor">{templateLayout}</div>
    </>
  );
};

const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
