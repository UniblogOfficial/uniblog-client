import React, { ReactElement } from 'react';

import style from './DragButton.module.scss';

export const DragButton = (): ReactElement => (
  <div className={style.block_handle}>
    <div className={style.dragIcon}>
      <div className={style.spinner} />
      <div className={style.spinner} />
      <div className={style.spinner} />
      <div className={style.spinner} />
    </div>
  </div>
);
