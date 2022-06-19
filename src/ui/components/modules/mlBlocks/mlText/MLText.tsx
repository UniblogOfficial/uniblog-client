import React, { MouseEvent } from 'react';

import { IMLDraftText, Nullable } from 'common/types/instance';
import { px } from 'common/utils/ui';

type TMLTextProps = {
  block: Nullable<IMLDraftText>;
  callback?: <T>(payload: T) => void;
};

export const MLText = ({ block, callback }: TMLTextProps) => {
  if (!block) return null;
  const onBlockClick = (e: MouseEvent<HTMLInputElement>) => {
    callback &&
      callback({ type: e.currentTarget.dataset.type, order: +e.currentTarget.dataset.order! });
  };
  const align = block.align ?? undefined;
  const className = callback ? 'interactive' : undefined;
  const TextShadow = block.textShadow?.flat().join('px ');
  return (
    <section
      className={className}
      style={{
        padding: px(block.padding) ?? '0',
        margin: px(block.margin) ?? '0',
        background: block.background,
        justifyContent: align,
        fontSize: block.fontSize,
        fontWeight: block.fontWeight,
        fontStyle: block.fontStyle,
        fontVariant: block.fontVariant,
        lineHeight: block.lineHeight,
        fontFamily: block.fontFamily,
        font: block.font,
        letterSpacing: block.letterSpacing,
        textShadow: TextShadow,
      }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      <div className="ml-text" style={{ color: block.color }}>
        {block &&
          block.text!.split('\n').map((line, i) =>
            line ? (
              // eslint-disable-next-line react/no-array-index-key
              <p key={i} style={{ textAlign: align }}>
                {line.replaceAll('   ', '\u00a0 \u00a0').replaceAll('  ', '\u00a0 ')}
              </p>
            ) : (
              // eslint-disable-next-line react/no-array-index-key
              <br key={i} />
            ),
          )}
      </div>
    </section>
  );
};
