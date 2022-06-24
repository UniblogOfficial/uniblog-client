import React from 'react';

import { IMLDraftMap } from 'common/types/instance';
import { px } from 'common/utils/ui';

type TMLMapProps = {
  block: IMLDraftMap;
  callback?: <T>(payload: T) => void;
};

export const MLMap = ({ block, callback }: TMLMapProps) => {
  const className = callback ? 'interactive' : undefined;

  return (
    <section
      className={className}
      style={{
        padding: px(block.padding) ?? '0',
        margin: px(block.margin) ?? '0',
        background: block.background,
      }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}

      <iframe
        style={{ border: '0', width: '100%', height: '100%' }}
        allowFullScreen
        loading="lazy"
        title="Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={block.url ?? ''}
      />
    </section>
  );
};
