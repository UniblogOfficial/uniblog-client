import { yupResolver } from '@hookform/resolvers/yup';
import { UseFormProps } from 'react-hook-form';
import * as yup from 'yup';

export type LoginFormData = {
  email: string;
  password: string;
};

const MIN_SYMBOLS_PASS = 8;
const MAX_SYMBOLS_PASS = 64;

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(MIN_SYMBOLS_PASS, `Password must be at least ${MIN_SYMBOLS_PASS} symbols`),
});

export const loginValidatorOptions: UseFormProps<LoginFormData, any> = {
  mode: 'onChange', // important for dynamical tips
  resolver: yupResolver(loginSchema, { abortEarly: false }),
  criteriaMode: 'all', // important for dynamical tips
};

// =======================================================================================================

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
  passConfirmed: string;
};

const MIN_SYMBOLS_NAME = 3;
const MAX_SYMBOLS_NAME = 64;

const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z0-9_-]/i, 'Invalid symbol (A-z, 0-9, -, _)')
    // TODO: blacklist
    .min(MIN_SYMBOLS_NAME, `Name must be at least ${MIN_SYMBOLS_NAME} symbols`)
    .max(MAX_SYMBOLS_NAME, `Name cannot be more than ${MAX_SYMBOLS_NAME} symbols`),
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(MIN_SYMBOLS_PASS, `Password must be at least ${MIN_SYMBOLS_PASS} symbols`)
    .max(MAX_SYMBOLS_PASS, `Password cannot be more than ${MAX_SYMBOLS_PASS} symbols`),
  passConfirmed: yup.string().notRequired(),
});

export const signupValidatorOptions: UseFormProps<SignupFormData, any> = {
  mode: 'onChange', // important for dynamical tips
  resolver: yupResolver(signupSchema, { abortEarly: false }),
  criteriaMode: 'all', // important for dynamical tips
};

// =======================================================================================================
