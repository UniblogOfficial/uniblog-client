import React, { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { logout, TUserData } from '../../../../bll/reducers';
import { selectUserData } from '../../../../bll/selectors';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { TImageFile } from '../../../../common/types/instance';
import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';
import { PageHeader } from '../../../components/modules/headers/PageHeader';
import { DropZoneField } from '../../../components/modules/imageForm/DropZoneField';

import { ProfileForm } from './ProfileForm';

type TProfileContainerProps = {};

export const ProfileContainer = () => {
  const [imageFiles, setImageFiles] = useState<Array<TImageFile>>([]);
  const dispatch = useAppDispatch();
  const userData = useAppSelector<TUserData | null>(selectUserData);
  const { t } = useTranslation(['pages', 'common']);

  const onLogoutButtonClick = () => {
    dispatch(logout());
  };

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
            username={userData?.name}
            email={userData?.email}
            onLogout={onLogoutButtonClick}
          />
        </section>
      </main>
    </div>
  );
};
