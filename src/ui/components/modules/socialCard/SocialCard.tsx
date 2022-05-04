import React, { FC, MouseEvent } from 'react';

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
  const host =
    process.env.REACT_APP_MODE === 'production'
      ? process.env.REACT_APP_HOST_PRODUCTION
      : process.env.REACT_APP_HOST_DEVELOPMENT;

  // const cbLink = `${host}/callback/vk`;
  const cbLink = `https://oauth.vk.com/blank.html`;
  const scope = 'offline,groups,audio,video,wall,photos,email';
  const changeLink = `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_VK_CLIENT_ID}&display=page&redirect_uri=${cbLink}&scope=${scope}&response_type=token&v=v=5.85&revoke=1&state=new`;
  const onChangeSocialClick = (e: MouseEvent<HTMLButtonElement>) => {
    // window.location.href = `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_VK_CLIENT_ID}&display=popup&redirect_uri=${cbLink}&scope=${scope}&response_type=token&v=v=5.85&revoke=1&state=new`;
    // window.open(changeLink, '_blank', 'width=600,height=400');
    window.addEventListener('message', ev => {
      console.log(ev.origin);
    });
    // @ts-ignore
    const authWindow = document.open(changeLink, '_blank', 'width=777,height=666');
  };

  const finalClassName = className ? `${styles.socialCard} ${className}` : styles.socialCard;
  return (
    <article className={finalClassName}>
      <div className={styles.imgContainer}>
        <img src={data.src} alt={data.title} />
      </div>
      <div className={styles.title}>
        <h4>{data.title}</h4>
        <button type="button" onClick={onChangeSocialClick}>
          {titleChange}
        </button>
      </div>
    </article>
  );
};
