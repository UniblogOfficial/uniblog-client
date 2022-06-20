import React from 'react';

import { IMLDraftButton, Nullable } from 'common/types/instance';
import { px } from 'common/utils/ui';
import { Button } from 'ui/components/elements';

type TMLButtonProps = {
  block: Nullable<IMLDraftButton>;
  callback?: <T>(payload: T) => void;
};

export const MLButton = ({ block, callback }: TMLButtonProps) => {
  if (!block) return null;
  const className = callback ? 'ml-button interactive' : 'ml-button';
  return (
    <section
      className={className}
      style={{
        margin: px(block.margin) ?? '0',
      }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      <Button
        style={{
          fontSize: block.fontSize,
          background: block.background,
          padding: px(block.padding) ?? '0',
          borderRadius: block.borderRadius,
          color: block.color,
          font: block.font,
          letterSpacing: px(block.letterSpacing),
          textShadow: block.textShadow?.join('px '),
          textAlign: block.align,
        }}>
        {block.title}
      </Button>
    </section>
  );
};
