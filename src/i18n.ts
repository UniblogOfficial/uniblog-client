/* eslint-disable camelcase */
import i18next, { i18n as i18nInstance } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import auth_en from './ui/locales/en/auth.json';
import common_en from './ui/locales/en/common.json';
import pages_en from './ui/locales/en/pages.all.json';
import auth_ru from './ui/locales/ru/auth.json';
import common_ru from './ui/locales/ru/common.json';
import pages_ru from './ui/locales/ru/pages.all.json';

export const namespaces = {
  pages: {
    all: 'pages.all',
  },
  common: 'common',
  auth: 'auth',
};

export const languages = {
  en: 'en',
  ru: 'ru',
};

export const defaultNS = 'pages';
export const resources = {
  [languages.ru]: {
    auth: auth_ru,
    common: common_ru,
    pages: pages_ru,
  },
  [languages.en]: {
    auth: auth_en,
    common: common_en,
    pages: pages_en,
  },
} as const;

const createI18n = (language: string): i18nInstance => {
  const i18n = i18next.createInstance().use(initReactI18next);
  i18n
    // модуль инициализации
    // .use(HttpApi) // Use backend plugin for translation file download.
    // Автоматическое определение языка
    // .use(LanguageDetector)
    .init({
      lng: language,
      fallbackLng: language,
      resources,
      returnObjects: true,
      debug: true,
      // Распознавание и кэширование языковых кук
      /* detection: {
        order: ['queryString', 'cookie'],
        cache: ['cookie'],
      },
      interpolation: {
        escapeValue: false,
      }, */
    });
  return i18n;
};

export const i18n = createI18n(languages.ru);
