import React from 'react';

import { MLDraftButton } from 'common/types/instance';
import { px } from 'common/utils/ui';
import { getMLBlockTextProperties } from 'common/utils/ui/styleAssemblers';
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
          ...getMLBlockTextProperties(block),
          background: block.background,
          padding: px(block.padding) ?? '0',
          borderRadius: px(block.borderRadius),
        }}>
        {block.title}
      </Button>
    </section>
  );
};
