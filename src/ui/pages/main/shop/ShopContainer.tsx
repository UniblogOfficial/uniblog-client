import React from 'react';

import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';

type TShopContainerProps = {};

export const ShopContainer = () => {
  let a;
  return (
    <div className="shop">
      <header className="shop__header page-header">
        <div className="button__goback">
          <NavLink to="/" className="link-nulled">
            <Button variant="regular">Назад</Button>
          </NavLink>
        </div>
        <Breadcrumbs
          path={[{ title: 'Главная', url: '/' }, { title: 'Магазин' }]}
          className="breadcrumbs"
          activeClassName="_active"
        />
      </header>
      <main className="shop__main grid">
        <h1 className="page-title">Магазин</h1>
        <div className="grid__row row-3">
          <section className="r-paper shop-item">11</section>
          <section className="r-paper">12</section>
          <section className="r-paper">13</section>
        </div>
        <div className="grid__row row-3">
          <section className="r-paper shop-item">21</section>
          <section className="r-paper">22</section>
          <section className="r-paper">23</section>
        </div>
        <div className="grid__row row-3">
          <section className="r-paper shop-item">31</section>
          <section className="r-paper">32</section>
          <section className="r-paper">33</section>
        </div>
      </main>
    </div>
  );
};
