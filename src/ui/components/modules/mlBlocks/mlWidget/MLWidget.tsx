import React from 'react';

import { IMLDraftWidget } from 'common/types/instance';
import { px } from 'common/utils/ui';

type TMLWidgetProps = {
  block: IMLDraftWidget;
  callback?: <T>(payload: T) => void;
};

export const MLWidget = ({ block, callback }: TMLWidgetProps) => {
  const className = callback ? 'ml-widget interactive' : 'ml-widget';

  return (
    <section className={className} style={{ padding: px(block.padding) ?? '0' }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      <iframe
        src={block.url ?? ''}
        width="300"
        height="300"
        title="widget"
        allowTransparency
        scrolling="no"
        frameBorder="0"
      />
    </section>
  );
};
