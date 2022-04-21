import React from 'react';

import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';

type TPriceContainerProps = {};

export const PriceContainer = () => {
  let a;
  return (
    <div className="price">
      <header className="price__header page-header">
        <div className="button__goback">
          <NavLink to="/" className="link-nulled">
            <Button variant="regular">Назад</Button>
          </NavLink>
        </div>
        <Breadcrumbs
          path={[{ title: 'Главная', url: '/' }, { title: 'Тарифы' }]}
          className="breadcrumbs"
          activeClassName="_active"
        />
      </header>
      <main className="price__main grid">
        <h1 className="page-title">Тарифы</h1>
        <div className="grid__row">
          <section className="paper promo">11</section>
        </div>
        <div className="grid__row">
          <section className="r-paper price-grid">21</section>
        </div>
      </main>
    </div>
  );
};
