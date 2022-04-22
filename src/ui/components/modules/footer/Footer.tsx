/* eslint-disable camelcase */
import React from 'react';

import { useTranslation } from 'react-i18next';

export const Footer = React.memo(() => {
  const { t } = useTranslation('pages');
  return (
    <footer className="footer paper">
      <ul className="list">
        <li>{t('footer.contacts')}</li>
        <li>{t('footer.blog')}</li>
        <li>{t('footer.privacy')}</li>
      </ul>
      <p>© 2022 UNIBLOG. All Rights Reserved</p>
    </footer>
  );
});
