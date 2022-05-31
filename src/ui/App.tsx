import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { SpritesMap } from './components/modules/iconSpritesMaps/SpritesMap';
import { PurchaseContainer } from './pages/public/PurchaseContainer';
import { Routes } from './Routes';

export const App = () => {
  let a;
  return (
    <>
      <SpritesMap />
      <div className="wrapper">
        {/* {status === 'failed' && <ErrorSnackbar />} */}
        <BrowserRouter>
          <Switch>
            <Route path="/purchase" render={() => <PurchaseContainer />} />
            <Route path="/" render={() => <Routes />} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};
