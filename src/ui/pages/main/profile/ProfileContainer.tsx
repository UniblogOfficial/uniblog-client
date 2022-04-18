import React from 'react';

import { NavLink } from 'react-router-dom';

import { TUserData } from '../../../../bll/reducers';
import { selectUserData } from '../../../../bll/selectors';
import { useAppSelector } from '../../../../common/hooks';
import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';

import { ProfileForm } from './ProfileForm';

type TProfileContainerProps = {};

export const ProfileContainer = () => {
  const userData = useAppSelector<TUserData | null>(selectUserData);
  return (
    <div className="profile">
      <header className="profile__header page-header">
        <div className="button__goback">
          <NavLink to="/" className="link-nulled">
            <Button variant="regular">Назад</Button>
          </NavLink>
        </div>
        <Breadcrumbs
          path={[{ title: 'Главная', url: '/' }, { title: 'Личный кабинет' }]}
          className="breadcrumbs"
          activeClassName="_active"
        />
      </header>
      <main className="profile__main grid">
        <h1 className="page-title">Личный кабинет</h1>
        <section className="profile__card panell">
          <h3 className="profile__title">Профиль</h3>
          <ProfileForm username={userData?.name} email={userData?.email} />
        </section>
      </main>
    </div>
  );
};
