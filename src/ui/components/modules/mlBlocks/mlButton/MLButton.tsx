import React from 'react';

import { IMLDraftButton, IMLDraftLink, Nullable } from 'common/types/instance';
import { px } from 'common/utils/ui';

type TMLButtonProps = {
  block: Nullable<IMLDraftButton>;
  callback?: <T>(payload: T) => void;
};

export const MLButton = ({ block, callback }: TMLButtonProps) => {
  if (!block) return null;
  const className = callback ? 'ml-link interactive' : 'ml-link';
  return (
    <section
      className={className}
      style={{
        padding: px(block.padding) ?? '0',
        margin: px(block.margin) ?? '0',
        background: block.background ?? undefined,
      }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      <div style={{ fontSize: block.fontSize ?? undefined }}>{block.title}</div>
    </section>
  );
};
