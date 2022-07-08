import React, { useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { requestRegister } from 'bll/reducers';
import { useAppDispatch } from 'common/hooks';
import { TRegisterDto } from 'common/types/request';
import { SignupFormData, signupValidatorOptions } from 'common/utils/ui/validators';
import { Button, Icon, Input } from 'ui/components/elements';

type TSignupFormProps = {};

export const SignupForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
    reset,
    clearErrors,
  } = useForm<SignupFormData>(signupValidatorOptions);
  const initialHelperState = {
    name: true,
    email: true,
    password: true,
    passConfirmed: true,
  };
  const [helperState, setHelperState] = useState(initialHelperState); // errors blocked in
  const [password, setPassword] = useState('');
  const [passConfirmed, setPassConfirmed] = useState('');
  const [passConfirmationMessage, setPassConfirmationMessage] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit: SubmitHandler<SignupFormData> = data => {
    const signupData: TRegisterDto = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    dispatch(requestRegister(signupData));
  };
  const changeFocusHandler = (name: keyof SignupFormData, focus: boolean) => {
    // for first field changing errors won't show
    !dirtyFields[name] && setHelperState(prev => ({ ...prev, [name]: !focus }));
    // since field touched after first blur, all errors will calculated onChange and always show
    dirtyFields[name] && setHelperState(initialHelperState);
  };

  useEffect(() => {
    const passwordValue = getValues('password');
    if (passwordValue) {
      const passConfirmedValue = getValues('passConfirmed');
      if (passConfirmedValue) {
        setPassConfirmationMessage(
          passwordValue === passConfirmedValue ? '' : 'You entered two different passwords',
        );
      }
      if (!passConfirmedValue && dirtyFields.passConfirmed) {
        setPassConfirmationMessage('Password not confirmed');
      }
    }
  }, [password, passConfirmed, dirtyFields.passConfirmed, getValues]);

  return (
    <form className="signup__form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <section className="field field-auth">
        <div className="field__input">
          <Input
            {...register('name', { value: '' })}
            onChangeFocus={state => {
              changeFocusHandler('name', state);
            }}
            placeholder="Имя"
            name="name"
          />
        </div>
        <div className="field__error">
          {helperState.name && dirtyFields.name && errors.name && errors.name.message}
        </div>
      </section>
      <section className="field field-auth">
        <div className="field__input">
          <Input
            {...register('email', { value: '' })}
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
            {...register('password', { value: '' })}
            type={passwordShown ? 'text' : 'password'}
            name="password"
            placeholder="Придумайте пароль"
            onChangeText={value => setPassword(value)}
            onChangeFocus={state => {
              changeFocusHandler('password', state);
            }}
          />
          {passwordShown ? (
            <Icon
              name="eye"
              onClick={togglePasswordVisibility}
              side="right"
              primaryColor="#242D35"
              secondaryColor="#242D35"
              containerClassName="auth-eye"
            />
          ) : (
            <Icon
              name="eye-slash"
              onClick={togglePasswordVisibility}
              side="right"
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
      <section className="field field-auth">
        <div className="field__input">
          <Input
            {...register('passConfirmed', { required: false })}
            type="password"
            name="passConfirmed"
            placeholder="Повторите пароль"
            onChangeText={value => setPassConfirmed(value)}
            onChangeFocus={state => {
              changeFocusHandler('passConfirmed', state);
            }}
          />
        </div>
        <div className="field__error">
          {helperState.passConfirmed &&
            dirtyFields.passConfirmed &&
            passConfirmationMessage &&
            passConfirmationMessage}
        </div>
      </section>
      <p className="auth-message">
        Нажимая «Получить код подтверждения», вы принимаете{' '}
        <a href="/#">пользовательское соглашение и политику конфиденциальности.</a>
      </p>
      <div className="button button-auth">
        <Button type="submit" variant="ok">
          Получить код подтверждения
        </Button>
      </div>
    </form>
  );
};
