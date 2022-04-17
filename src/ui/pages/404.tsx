import React from 'react';

import { useHistory } from 'react-router-dom';

export const NotFound = ({ props }: any) => {
  const history = useHistory();

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
      <h2>PAGE NOT FOUND</h2>
      <p>We&apos;re sorry, but the page you&apos;re looking for is currently unavailable</p>
      <button type="button" onClick={onGotoPreviousClick}>
        {!history || history.length < 2 ? 'go to main' : 'go to previous'}
      </button>
    </div>
  );
};
