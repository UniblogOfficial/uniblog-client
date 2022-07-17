import React from 'react';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

export const NotFound = ({ props }: any) => {
  const history = useHistory();
  const { t } = useTranslation(['pages']);
  const routeChange = () => {
    const path = `/`;
    history.push(path);
  };
  const onGotoPreviousClick = () => {
    routeChange();
    if (!history || history.length < 2) {
      // to main page
      // router.push('/');
    } else {
      // router.push(history[history.length - 2]);
    }
  };
  return (
    <div className="notFound">
      <h2>{t('pages:notFound.title')}</h2>
      <p>{t('pages:notFound.subtitle')}</p>
      <button type="button" onClick={onGotoPreviousClick}>
        {!history || history.length < 2 ? 'go to main' : 'go to previous'}
      </button>
    </div>
  );
};
