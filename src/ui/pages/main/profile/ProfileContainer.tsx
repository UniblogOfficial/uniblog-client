import React from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { TUserData } from '../../../../bll/reducers';
import { selectUserData } from '../../../../bll/selectors';
import { useAppSelector } from '../../../../common/hooks';
import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';
import { PageHeader } from '../../../components/modules/headers/PageHeader';

import { ProfileForm } from './ProfileForm';

type TProfileContainerProps = {};

export const ProfileContainer = () => {
  const userData = useAppSelector<TUserData | null>(selectUserData);
  const { t } = useTranslation(['pages', 'common']);
  return (
    <div className="profile">
      <PageHeader pageTitle={t('pages:profile.title')} />
      <main className="profile__main grid">
        <div className="grid__row">
          <h1 className="page-title">{t('pages:profile.title')}</h1>
        </div>
        <section className="profile__card paper">
          <h3 className="paper-title">{t('pages:profile.subtitles.profile')}</h3>
          <ProfileForm username={userData?.name} email={userData?.email} />
        </section>
      </main>
    </div>
  );
};
