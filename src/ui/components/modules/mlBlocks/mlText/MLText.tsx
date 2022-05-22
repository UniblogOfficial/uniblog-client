import React, { MouseEvent } from 'react';

import { IMLDraftContentText, Nullable } from '../../../../../common/types/instance';
import { px } from '../../../../../common/utils/ui';

type TMLTextProps = {
  block: Nullable<IMLDraftContentText>;
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
  return (
    <section
      className={className}
      style={{
        padding: px(block.padding) ?? '0',
        background: block.background ?? undefined,
        justifyContent: align,
        fontSize: block.fontSize ?? undefined,
        fontWeight: block.fontWeight ?? undefined,
      }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      <div className="ml-text">
        {block &&
          block.text!.split('\n').map(line =>
            line ? (
              <p key={line} style={{ textAlign: align }}>
                {line.replaceAll('   ', '\u00a0 \u00a0').replaceAll('  ', '\u00a0 ')}
              </p>
            ) : (
              <br />
            ),
          )}
      </div>
    </section>
  );
};
