import React from 'react';

import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';

type TAddonsContainerProps = {};

export const AddonsContainer = () => {
  let a;
  return (
    <div className="addons">
      <header className="addons__header page-header">
        <div className="button__goback">
          <NavLink to="/" className="link-nulled">
            <Button variant="regular">Назад</Button>
          </NavLink>
        </div>
        <Breadcrumbs
          path={[{ title: 'Главная', url: '/' }, { title: 'Дополнительно' }]}
          className="breadcrumbs"
          activeClassName="_active"
        />
      </header>
      <main className="addons__main grid">
        <h1 className="page-title">Дополнительно</h1>
        <div className="grid__row">
          <section className="paper addons-grid">11</section>
        </div>
      </main>
    </div>
  );
};
