import React from 'react';

import { MLDraftButton } from 'common/types/instance';
import { px } from 'common/utils/ui';
import { Button } from 'ui/components/elements';

type TMLButtonProps = {
  id: string;
  block: MLDraftButton;
  callback?: <T>(payload: T) => void;
};

export const MLButton = ({ id, block, callback }: TMLButtonProps) => {
  if (!block) return null;
  const className = callback ? 'ml-button interactive' : 'ml-button';
  return (
    <section
      className={className}
      style={{
        margin: px(block.margin) ?? '0',
      }}>
      {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
      <Button
        style={{
          fontSize: block.fontSize,
          fontWeight: block.fontWeight,
          fontFamily: block.fontFamily,
          background: block.background,
          padding: px(block.padding) ?? '0',
          borderRadius: px(block.borderRadius),
          color: block.color,
          letterSpacing: px(block.letterSpacing),
          textShadow: block.textShadow?.join('px '),
          textAlign: block.textAlign,
        }}>
        {block.title}
      </Button>
    </section>
  );
};
