import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { setMLDraftName } from 'bll/reducers';
import { selectAppStatus } from 'bll/selectors';
import { AppStatus } from 'common/constants';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { parseRawImage } from 'common/utils/ui';
import { Button, Icon, Preloader } from 'ui/components/elements';
import { ImageField } from 'ui/components/modules/imageField/ImageField';
import { Modal } from 'ui/components/modules/modals/Modal';

type TMLPreviewProps = {
  name: string; // multilink name
  username: string;
  publish: () => void;
};

export const MLPreview: FC<TMLPreviewProps> = ({ name, username, publish }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAppStatus);
  const [isValid, setIsValid] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation(['common']);
  const onLinkClick = () => {
    window.open(`${process.env.REACT_APP_HOST_PRODUCTION}/${name || username}`, '_blank');
  };

  const onPublishButtonClick = () => {
    publish();
    openModal();
  };

  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    status === AppStatus.IDLE && isModalVisible && closeModal();
  }, [status, isModalVisible]);

  const onLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    // re for numbers and chars
    const re = /^[a-zA-Z0-9]+$/;
    if (re.test(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    dispatch(setMLDraftName(e.target.value));
  };

  return (
    <>
      <div>
        <div className="paper-link">
          {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
          <span className="paper-link__host" role="link" onClick={onLinkClick}>
            {new URL(process.env.REACT_APP_HOST_PRODUCTION as string).hostname}/
          </span>
          <input
            className="paper-link__input"
            type="text"
            placeholder={username}
            maxLength={65}
            value={name}
            onChange={onLinkChange}
          />
          {/* Ну тут типа будет иконка показывающая валидна ссылка или нет */}
          <div className="paper-link__valid">{isValid ? 'v' : 'x'}</div>
        </div>
      </div>
      <div className="action-buttons">
        <Button onClick={onPublishButtonClick} className="button _rounded">
          {t('common:buttons.ok')}
        </Button>
      </div>
      {isModalVisible && (
        <Modal close={closeModal}>
          <div className="paper" style={{ height: '200px' }}>
            {status !== AppStatus.SUCCEEDED ? (
              <>
                <Preloader />
                {status === AppStatus.USERDATA_FAILED && <div>Ошибка при создании</div>}
              </>
            ) : (
              <a href={`${process.env.REACT_APP_HOST_PRODUCTION}/${name}`}>
                <div>Мультиссылка создана</div>
              </a>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};
