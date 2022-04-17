import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useAppDispatch } from '../../../../common/hooks';
import { Input } from '../../../components/elements';
import { Button } from '../../../components/elements/button/Button';
import { Icon } from '../../../components/elements/icons/Icon';

export type VerificationFormData = {
  code: string;
};

type TVerificationFormProps = {};

const MIN_SYMBOLS = 5;

const signupSchema = yup.object().shape({
  code: yup.number().required('Code is required'),
});

export const VerificationForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
    reset,
    clearErrors,
  } = useForm<VerificationFormData>({
    mode: 'onChange', // important for dynamical tips
    resolver: yupResolver(signupSchema, { abortEarly: false }),
    criteriaMode: 'all', // important for dynamical tips
  });
  const initialHelperState = {
    code: true,
  };
  const [helperState, setHelperState] = useState(initialHelperState); // errors blocked in
  const [dashed, setDashed] = useState<keyof VerificationFormData | null>(null);
  const [password, setPassword] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const history = useHistory();

  const routeChange = () => {
    const path = `/`;
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
  const changeFocusHandler = (name: keyof VerificationFormData, focus: boolean) => {
    // for first field changing errors won't show
    !dirtyFields[name] && setHelperState(prev => ({ ...prev, [name]: !focus }));
    // since field touched after first blur, all errors will calculated onChange and always show
    dirtyFields[name] && setHelperState(initialHelperState);
    // thick/thin ...might be color customized
    setDashed(focus ? name : null);
  };

  return (
    <form className="login__form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <section className="field field__auth">
        <div className="field__input">
          <Input
            {...register('code', { value: '12345' })}
            type="text"
            name="code"
            placeholder="Введите код подтверждения из E-mail"
            onChangeText={value => setPassword(value)}
            onChangeFocus={state => {
              changeFocusHandler('code', state);
            }}
          />
        </div>
        <div className={`field__dash ${dashed === 'code' && 'thick'}`} />
        <div className="field__error">
          {helperState.code &&
            dirtyFields.code &&
            errors.code &&
            // order of OR statement is important! other errors used for dynamic tips
            (errors.code?.types?.required || errors.code?.types?.min)}
        </div>
      </section>
      <p className="auth-message">
        Нажимая «Регистрация», вы принимаете{' '}
        <a href="/#">пользовательское соглашение и политику конфиденциальности.</a>
      </p>
      <div className="button button-auth">
        <Button type="submit" variant="ok">
          Регистрация
        </Button>
      </div>
    </form>
  );
};
