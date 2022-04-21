import React, { FC } from 'react';

import styles from './SocialCard.module.scss';

type TSocialCardProps = {
  data: {
    title: string;
    src: string;
  };
  titleChange: string;
  state?: 'checked' | 'unchecked' | 'not available';
  className?: string;
};

export const SocialCard: FC<TSocialCardProps> = ({
  data,
  titleChange,
  state = 'not available',
  className,
}) => {
  const finalClassName = className ? `${styles.socialCard} ${className}` : styles.socialCard;
  return (
    <article className={finalClassName}>
      <div className={styles.imgContainer}>
        <img src={data.src} alt={data.title} />
      </div>
      <div className={styles.title}>
        <h4>{data.title}</h4>
        <a href="/">{titleChange}</a>
      </div>
    </article>
  );
};
