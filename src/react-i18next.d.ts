// import the original type declarations
import 'react-i18next';

import { resources, defaultNS } from './i18n';
// import all namespaces (for the default language, only)
import auth from 'locales/en/auth.json';
import common from 'locales/en/common.json';
import pages from 'locales/en/pages.all.json';

/* declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    //defaultNS: 'common';
    // custom resources type
    resources: {
      auth: typeof auth;
      common: typeof common;
      pages: typeof pages;
    };
  };
}; */

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof resources['en'];
  };
};
