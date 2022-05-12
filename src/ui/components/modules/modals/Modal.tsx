import React, { FC, useCallback, MouseEvent } from 'react';

import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';

type TModalProps = {
  close: () => void;
};

export const Modal: FC<TModalProps> = ({ close, children }) => {
  const onOuterClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!(e.target instanceof HTMLDivElement)) {
        return;
      }
      if (e.target.dataset.value === 'out') {
        close();
      }
    },
    [close],
  );
  const modal = (
    <div className={styles['modal-bed']} data-value="out" role="none" onClick={onOuterClick}>
      {children}
    </div>
  );
  const container = document.getElementById('modal-root');
  return container && ReactDOM.createPortal(modal, container);
};
