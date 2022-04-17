import React, { FC } from 'react';

import { NavLink, Redirect } from 'react-router-dom';

import { SignupForm } from './SignupForm';
// import css from "./Signup.module.scss"

type TSignupProps = {};

export const Signup: FC<TSignupProps> = () => {
  const onLoginButtonClick = () => <Redirect to="/login" />;
  return (
    <div className="auth-container">
      <div className="auth-paper signup">
        <div className="logo logo__auth">Uniblog</div>
        <h2 className="title__auth">Регистрация</h2>
        <SignupForm />
        <div className="signup__login">
          <p>Уже есть аккаунт?</p>
          <NavLink to="/login" className="button-auth _shadowed">
            Вход
          </NavLink>
        </div>
      </div>
    </div>
  );
};
