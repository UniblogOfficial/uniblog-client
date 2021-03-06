import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { LoginForm } from './LoginForm';
// import css from "./Login.module.scss"
// hello

type TLoginProps = {};

export const Login: FC<TLoginProps> = () => (
  //
  <div className="auth-container">
    <div className="auth-paper login">
      <div className="logo logo__auth">Uniblog</div>
      <h2 className="title__auth">Вход</h2>
      <LoginForm />
      <div className="login__signup">
        <p>У Вас нету аккаунта?</p>
        <a href="http://uniblog.ru/zaglushka.html" role="button" className="button-auth _shadowed">
          Регистрация
        </a>
      </div>
    </div>
  </div>
);
