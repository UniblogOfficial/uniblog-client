import React from 'react';

import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';

type TMultilinkContainerProps = {};

export const MultilinkContainer = () => {
  let a;
  return (
    <div className="multilink">
      <header className="multilink__header page-header">
        <div className="button__goback">
          <NavLink to="/" className="link-nulled">
            <Button variant="regular">Назад</Button>
          </NavLink>
        </div>
        <Breadcrumbs
          path={[{ title: 'Главная', url: '/' }, { title: 'Мультиссылка' }]}
          className="breadcrumbs"
          activeClassName="_active"
        />
      </header>
      <main className="multilink__main grid">
        <h1 className="page-title">Мультиссылка</h1>
        <div className="grid__row">
          <section className="r-paper multilink-grid">11</section>
        </div>
      </main>
    </div>
  );
};
