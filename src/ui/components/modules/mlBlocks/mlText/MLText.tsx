import React, { MouseEvent } from 'react';

import { MLDraftText } from 'common/types/instance';
import { px } from 'common/utils/ui';

type TMLTextProps = {
  id: string;
  block: MLDraftText;
  callback?: <T>(payload: T) => void;
};

export const MLText = ({ id, block, callback }: TMLTextProps) => {
  const onBlockClick = (e: MouseEvent<HTMLInputElement>) => {
    callback && callback({ type: e.currentTarget.dataset.type, id: e.currentTarget.dataset.id! });
  };
  const textAlign = block.textAlign ?? undefined;
  const className = callback ? 'interactive' : undefined;
  const TextShadow = block.textShadow?.join('px ');
  return (
    <section
      className={className}
      style={{
        padding: px(block.padding) ?? '0',
        margin: px(block.margin) ?? '0',
        background: block.background,
        justifyContent: textAlign,
        fontSize: px(block.fontSize) ?? '18',
        fontWeight: block.fontWeight,
        fontStyle: block.fontStyle,
        fontVariant: block.fontVariant,
        lineHeight: block.lineHeight,
        fontFamily: block.fontFamily,
        font: block.font,
        letterSpacing: block.letterSpacing,
        textShadow: TextShadow,
      }}>
      {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
      <div className="ml-text" style={{ color: block.color }}>
        {block.text &&
          block.text.split('\n').map((line, i) =>
            line ? (
              // eslint-disable-next-line react/no-array-index-key
              <p key={i} style={{ textAlign }}>
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
