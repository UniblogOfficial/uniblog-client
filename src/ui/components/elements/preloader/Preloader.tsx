import React from 'react';

import { Icon } from '../icons/Icon';

import styles from './Preloader.module.scss';

export const Preloader = () => (
  <div className={styles.preloader}>
    <Icon name="arrow-clockwise" containerClassName={styles.preloader} />
  </div>
);
