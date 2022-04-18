import React from 'react';

import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';

type TCrosspostingContainerProps = {};

export const CrosspostingContainer = () => {
  let a;
  return (
    <div className="crossposting">
      <header className="crossposting__header page-header">
        <div className="button__goback">
          <Button variant="regular">Назад</Button>
        </div>
        <Breadcrumbs path={['Главная', 'Кросспостинг']} className="breadcrumbs" />
      </header>
      <h1 className="page-title">Кросспостинг</h1>
      <main className="crossposting__main grid">
        <div className="grid__row row-2">
          <section className="panel text-editor">11</section>
          <section className="panel planner">12</section>
        </div>
        <div className="grid__row row-6">
          <section className="panel attachment">21</section>
          <section className="panel attachment">22</section>
          <section className="panel attachment">23</section>
          <section className="panel attachment">24</section>
          <section className="panel attachment">25</section>
          <section className="panel attachment">26</section>
        </div>
      </main>
    </div>
  );
};
