import React, { FC, MouseEvent, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Button, Icon } from '../../elements';
import { Modal } from '../modals/Modal';

import styles from './SocialCard.module.scss';

export enum SocialAccountState {
  NOT_AVAILABLE = 0,
  CHECKED = 1,
  UNCHECKED = 2,
}

type TSocialCardProps = {
  data: {
    title: string;
    src: string;
  };
  actionTitle: string;
  state?: SocialAccountState;
  className?: string;
};

export const SocialCard: FC<TSocialCardProps> = ({
  data,
  actionTitle,
  state = SocialAccountState.NOT_AVAILABLE,
  className,
}) => {
  const { t } = useTranslation(['pages', 'common']);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const host =
    process.env.REACT_APP_MODE === 'production'
      ? process.env.REACT_APP_HOST_PRODUCTION
      : process.env.REACT_APP_HOST_DEVELOPMENT;

  // const cbLink = `${host}/callback/vk`;
  const cbLink = `https://oauth.vk.com/blank.html`;
  const scope = 'offline,groups,audio,video,wall,photos,email';
  const changeLink = `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_VK_CLIENT_ID}&display=page&redirect_uri=${cbLink}&scope=${scope}&response_type=token&v=v=5.85&revoke=1&state=new`;
  const onActionButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsModalVisible(true);
    // window.location.href = `https://oauth.vk.com/authorize?client_id=${process.env.REACT_APP_VK_CLIENT_ID}&display=popup&redirect_uri=${cbLink}&scope=${scope}&response_type=token&v=v=5.85&revoke=1&state=new`;
    // window.open(changeLink, '_blank', 'width=600,height=400');
    // @ts-ignore
    // const authWindow = document.open(changeLink, '_blank', 'width=777,height=666');
  };

  const finalClassName = className ? `${styles.socialCard} ${className}` : styles.socialCard;
  return (
    <>
      <article className={finalClassName}>
        <div className={styles.imgContainer}>
          <img src={data.src} alt={data.title} />
        </div>
        <div className={styles.title}>
          <h4>{data.title}</h4>
          <button type="button" onClick={onActionButtonClick}>
            {actionTitle}
          </button>
        </div>
        <Icon name="circle-add" />
      </article>
      {isModalVisible && (
        <Modal close={() => setIsModalVisible(false)}>
          <div className="paper _with-button-bottom">
            <div className={styles.imgContainer}>
              <img src={data.src} alt={data.title} />
            </div>
            <div className="paper__button-container">
              <Button value="1" className="button _full _paper">
                {t('common:buttons.ok')}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
