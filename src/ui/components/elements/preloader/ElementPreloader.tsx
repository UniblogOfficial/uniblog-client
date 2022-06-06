import React from 'react';

import styles from './ElementPreloader.module.scss';

export const ElementPreloader = () => (
  <div className={styles.ballLoader}>
    <div className={`${styles.ballLoaderBall} ${styles.ball1}`}> </div>
    <div className={`${styles.ballLoaderBall} ${styles.ball2}`}> </div>
    <div className={`${styles.ballLoaderBall} ${styles.ball3}`}> </div>
  </div>
);
