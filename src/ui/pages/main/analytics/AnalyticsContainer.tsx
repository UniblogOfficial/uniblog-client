import React from 'react';

import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';

type TAnalyticsContainerProps = {};

export const AnalyticsContainer = () => {
  let a;
  return (
    <div className="analytics">
      <header className="analytics__header page-header">
        <div className="button__goback">
          <NavLink to="/" className="link-nulled">
            <Button variant="regular">Назад</Button>
          </NavLink>
        </div>
        <Breadcrumbs
          path={[{ title: 'Главная', url: '/' }, { title: 'Аналитика' }]}
          className="breadcrumbs"
          activeClassName="_active"
        />
      </header>
      <main className="analytics__main grid">
        <h1 className="page-title">Аналитика</h1>
        <div className="grid__row">
          <section className="r-paper analytics-grid">11</section>
        </div>
      </main>
    </div>
  );
};
