import React from 'react';

import { TUserData } from '../../../../bll/reducers';
import { selectUserData } from '../../../../bll/selectors';
import { useAppSelector } from '../../../../common/hooks';
import { Button } from '../../../components/elements/button/Button';

type THomeContainerProps = {};

export const HomeContainer = () => {
  const userData = useAppSelector<TUserData | null>(selectUserData);
  if (!userData) return null;
  let a;
  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__greeting page-title">Привет, {userData.name}</h1>
        <div className="home__add-new-post">
          <Button>
            Добавить новый пост <strong>+</strong>
          </Button>
        </div>
      </header>
      <main className="home__main grid">
        <div className="grid__row row-2">
          <section className="panel chart">11</section>
          <section className="panel socials">12</section>
        </div>
        <div className="grid__row row-3">
          <section className="panel coverage">21</section>
          <section className="panel">22</section>
          <section className="panel">23</section>
        </div>
      </main>
    </div>
  );
};
