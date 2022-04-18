import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useAppDispatch } from '../../../../common/hooks';
import { Input } from '../../../components/elements';
import { Button } from '../../../components/elements/button/Button';
import { Icon } from '../../../components/elements/icons/Icon';

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
  passConfirmed: string;
};

type TSignupFormProps = {};

const MIN_SYMBOLS = 8;

const signupSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(MIN_SYMBOLS, `Password must be at least ${MIN_SYMBOLS} symbols`),
  passConfirmed: yup.string().notRequired(),
});

export const SignupForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
    reset,
    clearErrors,
  } = useForm<SignupFormData>({
    mode: 'onChange', // important for dynamical tips
    resolver: yupResolver(signupSchema, { abortEarly: false }),
    criteriaMode: 'all', // important for dynamical tips
  });
  const initialHelperState = {
    name: true,
    email: true,
    password: true,
    passConfirmed: true,
  };
  const [helperState, setHelperState] = useState(initialHelperState); // errors blocked in
  const [dashed, setDashed] = useState<keyof SignupFormData | null>(null);
  const [password, setPassword] = useState('');
  const [passConfirmed, setPassConfirmed] = useState('');
  const [passOptionals, setPassOptionals] = useState<Array<string> | null>(null);
  const [passConfirmationMessage, setPassConfirmationMessage] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const history = useHistory();

  const routeChange = () => {
    const path = `/verification`;
    history.push(path);
  };
  const onSubmit = () => {
    routeChange();
  };

  /* const onSubmit: SubmitHandler<SignupFormData> = data => {
    const signupData: TSignupData = {
      email: data.email,
      password: data.password,
    };
    const isPassConfirmed = data.password === data.passConfirmed; // Order is important!
    // dispatch(setIsSignupPassConfirmed(data.password === data.passConfirmed)); // 1
    dispatch(setSignupUserData(signupData)); // 2
    if (isPassConfirmed) {
      dispatch(signup());
    } else {
      revealModal('signupPassUnconfirmed');
    }
  }; */
  const changeFocusHandler = (name: keyof SignupFormData, focus: boolean) => {
    // for first field changing errors won't show
    !dirtyFields[name] && setHelperState(prev => ({ ...prev, [name]: !focus }));
    // since field touched after first blur, all errors will calculated onChange and always show
    dirtyFields[name] && setHelperState(initialHelperState);
    // thick/thin ...might be color customized
    setDashed(focus ? name : null);
  };
  const checkPassComplexity = (condition: string) => {
    if (!errors.password && dirtyFields.password && passOptionals) {
      return passOptionals.some(c => c === condition);
    }
    if (!passOptionals) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const optionals: Array<string> = [];
    !/[a-z]/.test(password) && optionals.push('lowercase');
    !/[A-Z]/.test(password) && optionals.push('uppercase');
    !/[0-9]/.test(password) && optionals.push('number');
    !/[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(password) && optionals.push('special');
    setPassOptionals(optionals.length > 0 ? optionals : null);
  }, [password]);
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
        <div className={`field__dash ${dashed === 'name' && 'thick'}`} />
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
        <div className={`field__dash ${dashed === 'email' && 'thick'}`} />
        <div className="field__error">
          {helperState.email && dirtyFields.email && errors.email && errors.email.message}
        </div>
      </section>
      <section className="field field-auth iconized__R">
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
              size="full"
              primaryColor="#242D35"
              secondaryColor="#242D35"
              primaryOpacity="1"
              secondaryOpacity="1"
            />
          ) : (
            <Icon
              name="eye-slash"
              onClick={togglePasswordVisibility}
              side="right"
              size="full"
              primaryColor="#4F5B67"
              secondaryColor="#4F5B67"
              primaryOpacity="1"
              secondaryOpacity="1"
            />
          )}
        </div>
        <div className={`field__dash ${dashed === 'password' && 'thick'}`} />
        <div className="field__error">
          {helperState.password &&
            dirtyFields.password &&
            errors.password &&
            // order of OR statement is important! other errors used for dynamic tips
            (errors.password?.types?.required || errors.password?.types?.min)}
        </div>
      </section>
      <section className="field field-auth iconized__R">
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
        <div className={`field__dash ${dashed === 'passConfirmed' && 'thick'}`} />
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
