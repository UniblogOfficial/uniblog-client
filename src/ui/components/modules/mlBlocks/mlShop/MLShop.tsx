import React, { MouseEvent } from 'react';

import {
  IMLDraftContentShop,
  Nullable,
  TImageFile,
  TMLImageContentShop,
} from '../../../../../common/types/instance';
import { parseRawImage, px } from '../../../../../common/utils/ui';
import imgPlaceholder from '../../../../../img/img-placeholder.png';

type TMLShopProps = {
  block: Nullable<IMLDraftContentShop>;
  images: Nullable<TMLImageContentShop<TImageFile>>;
  isPublic?: boolean;
  callback?: <T>(payload: T) => void;
};

export const MLShop = ({ block, images, isPublic, callback }: TMLShopProps) => {
  if (!block) return null;
  const onShopItemClick = (e: MouseEvent<HTMLInputElement>) => {
    if (isPublic && e.currentTarget.dataset.value) {
      const newWindow = document.open(
        `${e.currentTarget.dataset.value}`,
        '_blank',
        'width=777,height=666',
      );
    }
  };
  const className = callback ? 'ml-shop interactive' : 'ml-shop';
  return (
    <section className={className} style={{ padding: px(block.padding) ?? '0' }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      <ul className="ml-shop__list" style={{ gridTemplateColumns: block.grid, gap: block.gap }}>
        {block.cells.map((cell, i) => {
          const imgSrc = images?.cells[i]
            ? images.cells[i]?.previewUrl
            : cell.image ?? imgPlaceholder;
          return (
            <li
              key={cell.order}
              className="ml-shop__item"
              style={{
                width: '100%',
                backgroundColor: cell.background,
              }}>
              {isPublic && (
                <input
                  data-value={cell.href}
                  className="interactive"
                  type="button"
                  onClick={onShopItemClick}
                />
              )}
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
