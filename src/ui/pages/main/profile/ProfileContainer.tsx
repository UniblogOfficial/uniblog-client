import React, { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { logout, requestSaveAvatar } from '../../../../bll/reducers';
import { useAppDispatch } from '../../../../common/hooks';
import { TImageFile, TUser } from '../../../../common/types/instance';
import { Button, Icon } from '../../../components/elements';
import { PageHeader } from '../../../components/modules/headers/PageHeader';
import { DropZoneField } from '../../../components/modules/imageForm/DropZoneField';
import { Modal } from '../../../components/modules/modals/Modal';

import { ProfileForm } from './ProfileForm';

type TProfileContainerProps = {
  userData: TUser;
};

export const ProfileContainer = ({ userData }: TProfileContainerProps) => {
  const { name, avatar, email } = userData;
  const [imageFiles, setImageFiles] = useState<Array<TImageFile>>([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const openEditAvatarModal = () => {
    console.log('open');
    setIsModalVisible(true);
  };
  const closeEditAvatarModal = () => {
    console.log(`close`);
    setIsModalVisible(false);
  };

  const onLogoutButtonClick = () => {
    dispatch(logout());
  };

  const saveAvatar = useCallback(() => {
    if (imageFiles.length) {
      console.log(imageFiles[0]);
      dispatch(requestSaveAvatar(imageFiles[0]));
    }
    closeEditAvatarModal();
  }, [dispatch, imageFiles]);

  const onImageZoneChange = useCallback((imageFile: TImageFile, id?: number) => {
    if (imageFile.size <= 1024 * 1024) {
      console.log('Файл подходит');
      setImageFiles([imageFile]);
    } else console.log('Файл больше 1 мб');
  }, []);
  const avatarSrc = avatar
    ? `data:${avatar.imageType};base64, ${Buffer.from(avatar.imageData!).toString('base64')}`
    : undefined;

  return (
    <div className="profile">
      <PageHeader pageTitle={t('pages:profile.title')} />
      <main className="profile__main grid">
        <div className="grid__row">
          <h1 className="page-title">{t('pages:profile.title')}</h1>
        </div>
        <h3 className="paper-title">{t('pages:profile.subtitles.profile')}</h3>
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        <div className="profile__avatar">
          {avatarSrc ? (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
              src={avatarSrc}
              alt="avatar"
              className="img-default"
              onClick={openEditAvatarModal}
            />
          ) : (
            <Icon name="user" onClick={openEditAvatarModal} />
          )}
        </div>
        <div>
          {isModalVisible && (
            <Modal close={closeEditAvatarModal}>
              <div className="paper">
                <div className="profile__avatar">
                  <DropZoneField
                    onChange={onImageZoneChange}
                    touched={false}
                    initialImage={avatar ?? undefined}
                    avatarMode
                  />
                </div>
                <div className="paper__button-container">
                  <Button value="1" className="button button__right" onClick={saveAvatar}>
                    {t('common:buttons.save')}
                  </Button>
                  <Button value="1" className="button button__left" onClick={closeEditAvatarModal}>
                    {t('common:buttons.back')}
                  </Button>
                </div>
              </div>
            </Modal>
          )}
        </div>
        <ProfileForm
          username={name}
          email={email}
          onLogout={onLogoutButtonClick}
          onButtonSaveClick={saveAvatar}
        />
      </main>
    </div>
  );
};
