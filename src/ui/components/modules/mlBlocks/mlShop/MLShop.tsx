import React from 'react';

import { IMLDraftContentShop, Nullable } from '../../../../../common/types/instance';
import { parseRawImage, px } from '../../../../../common/utils/ui';

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
      <ul className="ml-shop__list" style={{ gridTemplateColumns: block.grid, gap: block.gap }}>
        {block.cells.map((cell, i) => {
          const imgSrc = cell.image && cell.image?.src ? cell.image?.src : cell.image?.previewUrl;
          return (
            <li
              key={cell.order}
              className="ml-shop__item"
              style={{ width: '100%', backgroundColor: cell.background }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <img src={imgSrc} alt="" />
              </div>
              <p
                style={{
                  textAlign: cell.align,
                  fontSize: cell.fontSize ?? undefined,
                  fontWeight: cell.fontWeight ?? undefined,
                  color: cell.color,
                }}>
                {cell.title}
              </p>
              <p
                style={{
                  textAlign: cell.subtitleAlign,
                  fontSize: cell.subtitleFontSize ?? undefined,
                  fontWeight: cell.subtitleFontWeight ?? undefined,
                  color: cell.subtitleColor,
                }}>
                {cell.subtitle}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
