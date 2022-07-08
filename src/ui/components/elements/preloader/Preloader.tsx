import React from 'react';

import { Icon } from '../icons/Icon';

import styles from './Preloader.module.scss';

type TPreloaderProps = {
  className?: string;
};

export const Preloader = ({ className }: TPreloaderProps) => (
  <div className={`${styles.preloader} ${className ?? ''}`}>
    <Icon name="arrow-clockwise" containerClassName={styles.preloader} />
  </div>
);
