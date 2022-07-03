import React, { FC, memo } from 'react';

import styles from './Carousel.module.scss';

type DotProps = {
  id: number;
  value: number;
  onStageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean | undefined;
};

export const Dot: FC<DotProps> = memo(({ id, value, onStageChange, checked }) => (
  <li key={Math.floor(id)} value={value}>
    <input
      id={String(Math.floor(id))}
      value={value}
      type="radio"
      onChange={onStageChange}
      checked={checked}
      className={styles.controls__input}
    />
    <label htmlFor={String(Math.floor(id))}>
      <div className={styles.controls__dot} />
    </label>
  </li>
));
