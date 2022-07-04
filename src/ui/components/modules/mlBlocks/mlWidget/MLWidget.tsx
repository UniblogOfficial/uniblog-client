import React from 'react';

import styles from './MLWidget.module.scss';

import { MLDraftWidget } from 'common/types/instance';
import { px } from 'common/utils/ui';

type TMLWidgetProps = {
  id: string;
  block: MLDraftWidget;
  callback?: <T>(payload: T) => void;
};

export const MLWidget = ({ id, block, callback }: TMLWidgetProps) => {
  const className = callback ? `${styles['block']} interactive` : styles['block'];

  return (
    <section className={className} style={{ padding: px(block.padding) ?? '0' }}>
      {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
      <iframe
        src={block.url ?? ''}
        width="300"
        height="300"
        title="widget"
        scrolling="no"
        frameBorder="0"
      />
    </section>
  );
};
