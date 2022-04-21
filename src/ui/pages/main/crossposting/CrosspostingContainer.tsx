import React from 'react';

import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';

type TCrosspostingContainerProps = {};

export const CrosspostingContainer = () => {
  let a;
  return (
    <div className="crossposting">
      <header className="crossposting__header page-header">
        <div className="button__goback">
          <NavLink to="/" className="link-nulled">
            <Button variant="regular">Назад</Button>
          </NavLink>
        </div>
        <Breadcrumbs
          path={[{ title: 'Главная', url: '/' }, { title: 'Кросспостинг' }]}
          className="breadcrumbs"
          activeClassName="_active"
        />
      </header>
      <main className="crossposting__main grid">
        <h1 className="page-title">Кросспостинг</h1>
        <div className="grid__row row-2">
          <section className="paper text-editor">11</section>
          <section className="paper planner">12</section>
        </div>
        <div className="grid__row row-6">
          <section className="r-paper attachment">21</section>
          <section className="r-paper attachment">22</section>
          <section className="r-paper attachment">23</section>
          <section className="r-paper attachment">24</section>
          <section className="r-paper attachment">25</section>
          <section className="r-paper attachment">26</section>
        </div>
      </main>
    </div>
  );
};
