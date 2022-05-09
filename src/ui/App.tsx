import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import { SpritesMap } from './components/modules/iconSpritesMaps/SpritesMap';
import { Routes } from './Routes';

export const App = () => {
  let a;
  return (
    <>
      <SpritesMap />
      <div className="wrapper">
        {/* {status === 'failed' && <ErrorSnackbar />} */}
        <BrowserRouter>
          <Route path="/" render={() => <Routes />} />
        </BrowserRouter>
      </div>
    </>
  );
};
