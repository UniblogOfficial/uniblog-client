import React from 'react';

import { NavLink } from 'react-router-dom';

import { Breadcrumbs } from '../../../components/elements/breadcrumbs/Breadcrumbs';
import { Button } from '../../../components/elements/button/Button';

type TChatContainerProps = {};

export const ChatContainer = () => {
  let a;
  return (
    <div className="chat">
      <header className="chat__header page-header">
        <div className="button__goback">
          <NavLink to="/" className="link-nulled">
            <Button variant="regular">Назад</Button>
          </NavLink>
        </div>
        <Breadcrumbs
          path={[{ title: 'Главная', url: '/' }, { title: 'Чат' }]}
          className="breadcrumbs"
          activeClassName="_active"
        />
      </header>
      <main className="chat__main grid">
        <h1 className="page-title">Чат</h1>
        <div className="grid__row">
          <section className="panell chat-grid">
            <Button disabled className="button-fake">
              <strong>Клава</strong> сделала больно
            </Button>
            <Button disabled className="button-fake">
              <strong>Клава</strong> покинула чат
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
};
