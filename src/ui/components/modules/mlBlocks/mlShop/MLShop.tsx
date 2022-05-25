import React from 'react';

import { IMLDraftContentShop, Nullable } from '../../../../../common/types/instance';
import { px } from '../../../../../common/utils/ui';

type TMLShopProps = {
  block: Nullable<IMLDraftContentShop>;
  callback?: <T>(payload: T) => void;
};

export const MLShop = ({ block, callback }: TMLShopProps) => {
  if (!block) return null;
  const className = callback ? 'ml-shop interactive' : 'ml-shop';
  return (
    <section className={className} style={{ padding: px(block.padding) ?? '0' }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      <ul
        className="ml-shop__list"
        style={{ width: '100%', display: 'grid', gridTemplateColumns: block.grid }}>
        {block.cells.map((cell, i) => (
          <li key={cell.order} style={{ width: '100%', backgroundColor: cell.background }}>
            <div style={{ position: 'relative', width: '100%', height: '100px' }}>
              <img src={cell.image?.src} alt="" />
            </div>
            <p>{cell.title}</p>
            <p>{cell.subtitle}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
