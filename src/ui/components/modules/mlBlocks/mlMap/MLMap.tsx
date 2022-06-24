import React from 'react';

import { IMLDraftMap } from 'common/types/instance';
import { px } from 'common/utils/ui';
import { Map } from 'ui/components/modules/map/Map';

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

      <Map />
    </section>
  );
};
