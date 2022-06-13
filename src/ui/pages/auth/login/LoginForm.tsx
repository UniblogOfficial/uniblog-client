import React, { useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink, useHistory } from 'react-router-dom';

import { requestLogin } from 'bll/reducers';
import { selectAppStatus } from 'bll/selectors';
import { AppStatus } from 'common/constants';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { TLoginDto } from 'common/types/request';
import { LoginFormData, loginValidatorOptions } from 'common/utils/ui/validators';
import { Button, ElementPreloader, Icon, Input } from 'ui/components/elements';

type TLoginFormProps = {};

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAppStatus);
  const loadingStatus = status === AppStatus.AUTH_LOADING;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
    reset,
    clearErrors,
  } = useForm<LoginFormData>(loginValidatorOptions);
  const initialHelperState = {
    email: true,
    password: true,
  };
  const [helperState, setHelperState] = useState(initialHelperState); // errors blocked in
  const [dashed, setDashed] = useState<keyof LoginFormData | null>(null);
  const [password, setPassword] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit: SubmitHandler<LoginFormData> = data => {
    const loginData: TLoginDto = {
      email: data.email,
      password: data.password,
    };
    dispatch(requestLogin(loginData)); // 2
  };

  const changeFocusHandler = (name: keyof LoginFormData, focus: boolean) => {
    // for first field changing errors won't show
    !dirtyFields[name] && setHelperState(prev => ({ ...prev, [name]: !focus }));
    // since field touched after first blur, all errors will calculated onChange and always show
    dirtyFields[name] && setHelperState(initialHelperState);
    // thick/thin ...might be color customized
    setDashed(focus ? name : null);
  };

  return (
    <form className="login__form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <section className="field field-auth">
        <div className="field__input">
          <Input
            {...register('email', { value: 'awesome@email.yo' })}
            onChangeFocus={state => {
              changeFocusHandler('email', state);
            }}
            placeholder="E-mail"
            name="email"
          />
        </div>
        <div className="field__error">
          {helperState.email && dirtyFields.email && errors.email && errors.email.message}
        </div>
      </section>
      <section className="field field-auth">
        <div className="field__input">
          <Input
            {...register('password', { value: 'qwerty123' })}
            type={passwordShown ? 'text' : 'password'}
            name="password"
            placeholder="Пароль"
            onChangeText={value => setPassword(value)}
            onChangeFocus={state => {
              changeFocusHandler('password', state);
            }}
          />
          {passwordShown ? (
            <Icon
              name="eye"
              onClick={togglePasswordVisibility}
              primaryColor="#242D35"
              secondaryColor="#242D35"
              containerClassName="auth-eye"
            />
          ) : (
            <Icon
              name="eye-slash"
              onClick={togglePasswordVisibility}
              primaryColor="#4F5B67"
              secondaryColor="#4F5B67"
              containerClassName="auth-eye"
            />
          )}
        </div>
        <div className="field__error">
          {helperState.password &&
            dirtyFields.password &&
            errors.password &&
            // order of OR statement is important! other errors used for dynamic tips
            (errors.password?.types?.required || errors.password?.types?.min)}
        </div>
      </section>
      <div className="login__forgot">
        <NavLink to="/recovery">Забыли пароль?</NavLink>
      </div>
      <p className="auth-message">
        Нажимая «Вход», вы принимаете{' '}
        <a href="/#">пользовательское соглашение и политику конфиденциальности.</a>
      </p>
      <div className="button button-auth">
        <Button type="submit" variant="ok" disabled={loadingStatus}>
          {!loadingStatus ? 'Вход' : <ElementPreloader />}
        </Button>
      </div>
    </form>
  );
};
