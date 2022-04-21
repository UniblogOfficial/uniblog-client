import React from 'react';

import { TUserData } from '../../../../bll/reducers';
import { selectUserData } from '../../../../bll/selectors';
import { useAppSelector } from '../../../../common/hooks';
import { socials } from '../../../../img';
import { Button } from '../../../components/elements/button/Button';

type THomeContainerProps = {};

export const HomeContainer = () => {
  const userData = useAppSelector<TUserData | null>(selectUserData);
  if (!userData) return null;
  console.log(socials);

  const images = Object.keys(socials).map((name: string) => (
    <li key={socials.name}>
      <img src={socials[name]} alt={name} />
    </li>
  ));
  return (
    <div className="home">
      <header className="home__header">
        <h1 className="page-title home__greeting">Привет, {userData.name}</h1>
        <div className="home__add-new-post">
          <Button>
            Добавить новый пост <strong>+</strong>
          </Button>
        </div>
      </header>
      <main className="grid home__main">
        <div className="grid__row row-2">
          <section className="r-paper chart">11</section>
          <section className="paper socials">
            <h3 className="paper-title">Мои соцсети</h3>
            <ul className="socials__grid">{images}</ul>
          </section>
        </div>
        <div className="grid__row row-3">
          <section className="r-paper coverage">21</section>
          <section className="r-paper">22</section>
          <section className="r-paper">23</section>
        </div>
      </main>
    </div>
  );
};
