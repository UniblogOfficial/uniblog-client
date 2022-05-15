import React, { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { logout, requestSaveAvatar, TUserState } from '../../../../bll/reducers';
import { selectUserData } from '../../../../bll/selectors';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { TImageFile, TUser } from '../../../../common/types/instance';
import { PageHeader } from '../../../components/modules/headers/PageHeader';
import { DropZoneField } from '../../../components/modules/imageForm/DropZoneField';

import { ProfileForm } from './ProfileForm';

type TProfileContainerProps = {
  userData: TUser;
};

export const ProfileContainer = ({ userData }: TProfileContainerProps) => {
  const [imageFiles, setImageFiles] = useState<Array<TImageFile>>([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);

  const onLogoutButtonClick = () => {
    dispatch(logout());
  };

  const saveAvatar = useCallback(() => {
    if (imageFiles.length) {
      dispatch(requestSaveAvatar(imageFiles[0]));
    }
  }, [dispatch, imageFiles]);

  const onImageZoneChange = useCallback((imageFile: TImageFile, id?: number) => {
    setImageFiles([imageFile]);
  }, []);

  return (
    <div className="profile">
      <PageHeader pageTitle={t('pages:profile.title')} />
      <main className="profile__main grid">
        <div className="grid__row">
          <h1 className="page-title">{t('pages:profile.title')}</h1>
        </div>
        <section className="profile__card paper">
          <h3 className="paper-title">{t('pages:profile.subtitles.profile')}</h3>
          <div className="profile__avatar">
            <DropZoneField onChange={onImageZoneChange} imageFiles={imageFiles} touched={false} />
          </div>
          <ProfileForm
            username={userData.name}
            email={userData.email}
            onLogout={onLogoutButtonClick}
            onButtonSaveClick={saveAvatar}
          />
        </section>
      </main>
    </div>
  );
};
